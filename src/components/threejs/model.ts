import { TextureLoader, LoadingManager, CubeTextureLoader, sRGBEncoding, Group, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, AnimationObjectGroup } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { LemonSettings } from './lemons'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private domThreejs: HTMLElement
  private domLoader: HTMLElement
  private clock: Clock
  private controls: OrbitControls
  private loader: GLTFLoader
  private isAnimating: boolean
  private lemonSettings: LemonSettings
  private isArena: boolean
  private mixer: AnimationMixer
  private animatedObjects: AnimationObjectGroup
  private sceneObjects: {
    [key: string]: Group
  }
  private sceneLights: {
    [key: string]: DirectionalLight
  }
  scale: number
  weaponCoord: [number, number, number]
  light: number

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor({ dom, loader, rightWeapon, leftWeapon, translateY, cam, arenaBg, globalScale, lemonSettings, background, rotate = true, callback }: { dom: HTMLElement, loader: HTMLElement, rightWeapon: string, leftWeapon: string, cam: number, translateY: number, arenaBg?: boolean, globalScale: number, lemonSettings: LemonSettings, background?: string, rotate?: boolean, callback?: () => void}) {
    this.domThreejs = dom
    this.camera = new PerspectiveCamera(cam, this.domThreejs.offsetWidth / this.domThreejs.offsetHeight);
    this.domLoader = loader
    this.sceneObjects = {};
    this.sceneLights = {};
    this.isAnimating = false;
    this.lemonSettings = lemonSettings
    this.isArena = arenaBg;
    this.clock = new Clock()
    this.scene = new Scene();
    this.scene.translateY(translateY)
    
    this.mixer = new AnimationMixer( this.scene )

    this.scale = 0.020
    this.weaponCoord = [101.12, 101.05, 0]
    this.light = 3.8

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    
    this.loader = new GLTFLoader(manager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/draco/' );
    this.loader.setDRACOLoader( dracoLoader );

    this.animatedObjects = new AnimationObjectGroup()

    // this.loader.load(`/constructor/assets/lemons/anim/ThirdPersonIdle1.glb`, (anim) => {
    //   animation = anim


      Object.entries(this.lemonSettings.model).forEach(([key,model]) => {
        this.loader.load(`/constructor/assets/lemons/${key}/${model}.glb`, (gltf) => {

          this.addObject(gltf, key)

          var action = this.mixer.clipAction( gltf.animations[ 0 ] );
          action.play();

          // const animationAction = this.mixer.clipAction(gltf.animations[0], gltf.scene)
          // animationAction.play();


        });
        
      })
       
    //   this.addObject(anim, 'anim')

    // });

    


    // this.loader.load(leftWeapon, (gltf) => {
    //   this.addObject(gltf, 'leftWeapon')
    // });
    // this.loader.load(rightWeapon, (gltf) => {
    //   gltf.scene.scale.multiply(new Vector3(-1, 1, 1))
    //   this.addObject(gltf, 'rightWeapon')
    // });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true  });

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.toneMappingExposure = 0.5
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.domThreejs.offsetWidth, this.domThreejs.offsetHeight);

    this.controls = new OrbitControls(this.camera, this.domThreejs)
    this.camera.position.set(0, 0, 25);
    this.controls.update();
    this.controls.enablePan = false;

    if (this.isArena) {
      this.controls.minDistance = 25;
      this.controls.maxDistance = 35;
      //this.camera.setViewOffset(this.dom.offsetWidth, this.dom.offsetHeight, this.dom.offsetWidth / 7, 0, this.dom.offsetWidth, this.dom.offsetHeight)

      this.scene.background = new CubeTextureLoader()
        .setPath('/img/hub/')
        .load([
          'px.png',
          'nx.png',
          'py.png',
          'ny.png',
          'pz.png',
          'nz.png'
        ]);
      
      this.loader.load('/constructor/assets/models/platform_big.glb', (gltf) => {
        gltf.scene.name = 'postament'
        gltf.scene.position.setY(0.25)
        gltf.scene.scale.set(0.7, 0.7, 0.7)
        this.scene.add(gltf.scene)
      });


      this.controls.maxPolarAngle = Math.PI / 1.7;

    } else {
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.maxPolarAngle = Math.PI / 2;
      if (!rotate) {
        this.controls.minAzimuthAngle = 0
        this.controls.maxAzimuthAngle = 0
      }
      this.controls.enableZoom = false;
      //this.controls.autoRotate = true;
    }

    if (background) {
      const map = new TextureLoader(manager).load(background);
      this.scene.background = map;
    }

    this.scene.scale.set(globalScale, globalScale, globalScale);
    this.sceneLights.light1 = new DirectionalLight(0xFFFFFF);
    this.sceneLights.light2 = new DirectionalLight(0xFFFFFF);
    this.setLightSettings()
    this.scene.add(this.sceneLights.light1);
    this.scene.add(this.sceneLights.light2);

    manager.onLoad = () => {
      this.domThreejs.appendChild(this.renderer.domElement);
      this.domLoader.style.opacity = '0';
      if (callback) callback()
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      if (!this.isAnimating) {
        this.animate();
        this.isAnimating = true
      }
    };

  }

  async changeLemon(lemonSettings: LemonSettings): Promise<void> {
    this.domLoader.style.opacity = '1';
    this.lemonSettings = lemonSettings;
    return new Promise((resolve) => {
      Object.entries(lemonSettings.model).forEach(([key,model]) => {
        this.scene.remove(this.sceneObjects[key]);
        this.loader.load(`/constructor/assets/lemons/${key}/${model}.glb`, (gltf) => {
          //this.animatedObjects.add(gltf.scene)
          this.addObject(gltf, key)
          resolve()
        });
      })
    });
  }

  screenShot(name) {
    setTimeout(() => {
      const imgData = this.renderer.domElement.toDataURL("image/png");
      //window.location.href = imgData.replace("image/png", "image/octet-stream")
      const link = document.createElement('a')
      link.download = `${name}.png`
      link.href = imgData
      link.click()
      link.remove()
    }, 200)
  }

  addObject(gltf: GLTF, name: string): void {
    const object = gltf.scene
    this.sceneObjects[name] = object
    object.name = name
    this.setObjectSettings(object)
    this.scene.add(object)
  }

  setObjectSettings(object: Group): void {
    if (object.name == 'leftWeapon') {
      object.position.set(this.weaponCoord[0],this.weaponCoord[1],this.weaponCoord[2])
    } else if (object.name == 'rightWeapon') {
      object.position.set(this.weaponCoord[0]*-1,this.weaponCoord[1],this.weaponCoord[2])
    } else {
      object.scale.set(this.scale,this.scale,this.scale)
    }
  }

  setLightSettings(): void {
    const camPos = this.camera.position
    this.sceneLights.light1.position.set(camPos.x, camPos.y + 50, camPos.z);
    this.sceneLights.light2.position.set(camPos.x, camPos.y + -10, camPos.z);
    this.sceneLights.light1.intensity = this.light
    this.sceneLights.light2.intensity = this.light - 1.5
  }

  async changeEquipment(name: string, item: { image: string, model: string, scale: number }): Promise<void> {
    this.domLoader.style.opacity = '1';
    return new Promise((resolve) => {
      const objectToRemove = this.scene.getObjectByName(name);
      this.loader.load(item.model, (gltf) => {
        gltf.scene.scale.set(item.scale,item.scale,item.scale)
        this.scene.remove(objectToRemove);
        this.addObject(gltf, name)
        resolve()
      });
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = this.domThreejs.offsetWidth / this.domThreejs.offsetHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.domThreejs.offsetWidth, this.domThreejs.offsetHeight);
  }


  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    const delta = this.clock.getDelta();
    this.mixer.update(delta)
    this.controls.update();
    this.sceneLights.light1.position.set(this.camera.position.x, this.camera.position.y + 50, this.camera.position.z);
    this.sceneLights.light2.position.set(this.camera.position.x, this.camera.position.y - 10, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}