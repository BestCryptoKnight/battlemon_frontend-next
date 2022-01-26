import { Vector3, LoadingManager, CubeTextureLoader, LinearEncoding, Group, sRGBEncoding, DirectionalLight, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import type { LemonSettings } from './lemons'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private mesh: Mesh;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private controls: OrbitControls
  private light1: DirectionalLight
  private light2: DirectionalLight
  private loader: GLTFLoader
  private isAnimating: boolean
  private lemonSettings: LemonSettings
  private isArena: boolean
  private sceneObjects: {
    [key: string]: Group
  }
  private sceneLights: {
    [key: string]: DirectionalLight
  }

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor({ dom, rightWeapon, leftWeapon, translateY, cam, arenaBg, globalScale, lemonSettings }: { dom: string, rightWeapon: string, leftWeapon: string, cam: number, translateY: number, arenaBg?: boolean, globalScale: number, lemonSettings: LemonSettings}) {
    this.dom = document.getElementById(dom)
    this.camera = new PerspectiveCamera(cam, this.dom.offsetWidth / this.dom.offsetHeight);
    this.sceneObjects = {};
    this.sceneLights = {};
    this.lemonSettings = lemonSettings
    this.isArena = arenaBg
    this.scene = new Scene();
    this.scene.translateY(translateY)

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    
    this.loader = new GLTFLoader(manager);
    this.loader.load(this.lemonSettings.model, (gltf) => {
      this.addObject(gltf, 'hero')
    });
    this.loader.load(leftWeapon, (gltf) => {
      this.addObject(gltf, 'leftWeapon')
    });
    this.loader.load(rightWeapon, (gltf) => {
      gltf.scene.scale.multiply(new Vector3(-1, 1, 1))
      this.addObject(gltf, 'rightWeapon')
    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.outputEncoding = LinearEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);

    this.controls = new OrbitControls(this.camera, this.dom)
    this.camera.position.set(0, 0, 25);
    this.controls.update();

    if (this.isArena) {
      this.controls.minDistance = 25;
      this.controls.maxDistance = 35;
      //this.camera.setViewOffset(this.dom.offsetWidth, this.dom.offsetHeight, this.dom.offsetWidth / 7, 0, this.dom.offsetWidth, this.dom.offsetHeight)

      this.scene.background = new CubeTextureLoader()
        .setPath('/img/arena/')
        .load([
          'px.png',
          'nx.png',
          'py.png',
          'ny.png',
          'pz.png',
          'nz.png'
        ]);
      
      this.loader.load('/media/postament60.glb', (gltf) => {
        gltf.scene.name = 'postament'
        gltf.scene.position.setY(0.5)
        gltf.scene.scale.set(1, 1, 1)
        this.scene.add(gltf.scene)
      });


      this.controls.maxPolarAngle = Math.PI / 1.7;

    } else {
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.autoRotate = true;
    }

    this.scene.scale.set(globalScale, globalScale, globalScale);
    this.sceneLights.light1 = new DirectionalLight(0xFFFFFF);
    this.sceneLights.light2 = new DirectionalLight(0xFFFFFF);
    this.setLightSettings()
    this.scene.add(this.sceneLights.light1);
    this.scene.add(this.sceneLights.light2);

    manager.onLoad = () => {
      this.dom.appendChild(this.renderer.domElement);
      document.getElementById('loader').style.opacity = '0';
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      if (!this.isAnimating) {
        this.animate();
        this.isAnimating = true
      }
    };

  }

  async changeLemon(lemonSettings: LemonSettings): Promise<void> {
    document.getElementById('loader').style.opacity = '1';
    this.lemonSettings = lemonSettings;
    return new Promise((resolve) => {
      this.loader.load(lemonSettings.model, (gltf) => {
        this.scene.remove(this.sceneObjects.hero);
        this.addObject(gltf, 'hero')
        this.setObjectSettings(this.sceneObjects.leftWeapon)
        this.setObjectSettings(this.sceneObjects.rightWeapon)
        this.setLightSettings()
        resolve()
      });
    });
  }

  addObject(gltf: GLTF, name: string): void {
    const object = gltf.scene
    this.sceneObjects[name] = object
    object.name = name
    this.setObjectSettings(object)
    this.scene.add(object)
  }

  setObjectSettings(object: Group): void {
    if (object.name == 'hero') {
      object.scale.set(this.lemonSettings.scale,this.lemonSettings.scale,this.lemonSettings.scale)
    }
    if (object.name == 'leftWeapon') {
      object.position.set(this.lemonSettings.weaponCoord[0],this.lemonSettings.weaponCoord[1],this.lemonSettings.weaponCoord[2])
    }
    if (object.name == 'rightWeapon') {
      object.position.set(this.lemonSettings.weaponCoord[0]*-1,this.lemonSettings.weaponCoord[1],this.lemonSettings.weaponCoord[2])
    }
  }

  setLightSettings(): void {
    const camPos = this.camera.position
    this.sceneLights.light1.position.set(camPos.x, camPos.y + 50, camPos.z);
    this.sceneLights.light2.position.set(camPos.x, camPos.y + -10, camPos.z);
    this.sceneLights.light1.intensity = this.lemonSettings.light
    this.sceneLights.light2.intensity = this.lemonSettings.light - 1.5
  }

  async changeEquipment(name: string, model: string): Promise<void> {
    document.getElementById('loader').style.opacity = '1';
    return new Promise((resolve) => {
      const objectToRemove = this.scene.getObjectByName(name);
      this.loader.load(model, (gltf) => {
        this.scene.remove(objectToRemove);
        this.addObject(gltf, name)
        resolve()
      });
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.sceneLights.light1.position.set(this.camera.position.x, this.camera.position.y + 50, this.camera.position.z);
    this.sceneLights.light2.position.set(this.camera.position.x, this.camera.position.y - 10, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}