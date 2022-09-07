import { TextureLoader, LoadingManager, CubeTextureLoader, sRGBEncoding, Group, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, AnimationObjectGroup, Raycaster, Vector2 } from "three"
import { LoopOnce } from 'three/src/constants.js'
import type { AnimationAction } from 'three/src/animation/AnimationAction'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { LemonNFT } from '$src/utils/types'
import { assetsTimestamp } from "$src/utils/helpers"
import { modelUrl, wearLemonModel } from '$src/threejs/lemon'

interface Animations {
  [name: string]: AnimationAction
}

export class Model {
  private camera!: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private clock: Clock
  private controls!: OrbitControls
  private loader: GLTFLoader
  private lemonModel!: GLTF
  private isAnimating: boolean
  private raycaster: Raycaster
  private pointer: Vector2
  private mixers: AnimationMixer[]
  private animations: Animations
  private pointerOver: string
  private sceneLights: {
    [key: string]: DirectionalLight
  }
  light: number

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor({ dom, translateY, cam, globalScale, lemons }: { dom: string, cam: number, translateY: number, globalScale: number, lemons: LemonNFT[] }) {
    this.dom = document.getElementById(dom)!
    this.sceneLights = {};
    this.isAnimating = false;
    this.clock = new Clock()
    this.scene = new Scene();
    this.scene.translateY(translateY);
    this.raycaster = new Raycaster()
    this.pointer = new Vector2()
    this.mixers = []
    this.animations = {}
    this.light = 3.8
    this.pointerOver = ''

    var rect = this.dom.getBoundingClientRect();
    window.addEventListener( 'pointermove', (event: MouseEvent) => {
      this.pointer.x = ( (event.clientX - rect.left) / this.dom.offsetWidth ) * 2 - 1;
      this.pointer.y = - ( (event.clientY - rect.top) / this.dom.offsetHeight ) * 2 + 1;
    });

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    
    this.loader = new GLTFLoader(manager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/draco/' );
    this.loader.setDRACOLoader( dracoLoader );

    this.loader.load(`${modelUrl}?${assetsTimestamp}`, (gltf) => {
      this.lemonModel = gltf
    });
    
    this.loader.load(`/models/BTLMN_LemonPlatfroems_A.glb?${assetsTimestamp}`, (gltf) => {
      gltf.scene.name = 'postament'
      gltf.scene.position.setY(0.25)
      gltf.scene.scale.set(1, 1, 1)
      this.scene.add(gltf.scene)

      const mixer = new AnimationMixer( gltf.scene );

      ['Forward1', 'Forward2', 'Forward3', 'Backward1', 'Backward2', 'Backward3'].forEach(anim => {
        const action = mixer.clipAction( gltf.animations.find(a => a.name == anim)! )
        action.loop = LoopOnce
        //action.repetitions = 1
        action.clampWhenFinished = true
        this.animations[anim] = action
      })

      this.mixers.push(mixer)
    });


    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true  });

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.toneMappingExposure = 0.5
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);


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


    manager.onLoad = () => {
      this.camera = this.scene.getObjectByName("Camera1") as PerspectiveCamera
      this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.controls = new OrbitControls(this.camera, this.dom)
      this.controls.update();
      this.controls.enablePan = false;
      // this.controls.minDistance = 28;
      // this.controls.maxDistance = 28;
      // this.controls.maxPolarAngle = Math.PI / 1.7;

      this.scene.scale.set(globalScale, globalScale, globalScale);
      this.sceneLights.light1 = new DirectionalLight(0xFFFFFF);
      this.sceneLights.light2 = new DirectionalLight(0xFFFFFF);
      this.setLightSettings()
      this.scene.add(this.sceneLights.light1);
      this.scene.add(this.sceneLights.light2);

      const Platforms = [
        this.scene.getObjectByName("LemonPos_3"),
        this.scene.getObjectByName("LemonPos_2"),
        this.scene.getObjectByName("LemonPos_1")
      ]
      const Pluses = [
        this.scene.getObjectByName("Plus_3"),
        this.scene.getObjectByName("Plus_2"),
        this.scene.getObjectByName("Plus_1")
      ]
      
      lemons.slice(-3).forEach((lemon, index) => {
        const clonedLemon = SkeletonUtils.clone(this.lemonModel.scene);
        wearLemonModel(clonedLemon, lemon);
        clonedLemon.rotateY(Math.PI)
        Platforms[index]!.add(clonedLemon)
        Pluses[index]!.visible = false
        
        const mixer = new AnimationMixer( clonedLemon )
        const action = mixer.clipAction( this.lemonModel.animations[ 0 ] );
        action.play();
        this.mixers.push(mixer)
      })

      this.dom.appendChild(this.renderer.domElement);
      document.getElementById('loader')!.style.opacity = '0';
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      if (!this.isAnimating) {
        this.animate();
        this.isAnimating = true
      }
    };

  }

  setLightSettings(): void {
    const camPos = this.camera.position
    this.sceneLights.light1.position.set(camPos.x, camPos.y + 50, camPos.z);
    this.sceneLights.light2.position.set(camPos.x, camPos.y + -10, camPos.z);
    this.sceneLights.light1.intensity = this.light
    this.sceneLights.light2.intensity = this.light - 1.5
  }

  private onWindowResize(): void {
    this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
  }


  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    const delta = this.clock.getDelta();
    this.mixers.forEach(mixer => mixer.update(delta))
    this.controls.update();
    this.sceneLights.light1.position.set(this.camera.position.x, this.camera.position.y + 50, this.camera.position.z);
    this.sceneLights.light2.position.set(this.camera.position.x, this.camera.position.y - 10, this.camera.position.z);


    this.raycaster.setFromCamera( this.pointer, this.camera );
    let intersects = this.raycaster.intersectObjects(this.scene.children, true);
    let hovered = 'none'

    if (intersects.length > 0) {
      for (let { object } of intersects) {
        if (object.name.indexOf('Cylinder002_1') >= 0) {
          hovered = 'Platform_1'
          break;
        } else
        if (object.name.indexOf('Cylinder_1') >= 0) {
          hovered = 'Platform_2'
          break;
        } else 
        if (object.name.indexOf('Cylinder001_1') >= 0) {
          hovered = 'Platform_3'
          break;
        }
      }
    }

    if (this.pointerOver != hovered) {
      if (hovered == 'none') {
        document.onclick = () => {}
        document.body.style.cursor = 'default';
      } else {
        document.body.style.cursor = 'pointer';
      }
      
      if (hovered == 'Platform_1') document.onclick = () => {
        //this.animations['Backward1'].play()
      }
      if (hovered == 'Platform_2') document.onclick = () => {
        this.animations['Backward3'].play()
      }
      if (hovered == 'Platform_3') document.onclick = () => {
        this.animations['Backward2'].play()
      }
    } 
    this.pointerOver = hovered


    this.renderer.render(this.scene, this.camera);
  }
}