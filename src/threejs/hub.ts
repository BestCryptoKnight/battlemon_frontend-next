import { TextureLoader, LoadingManager, CubeTextureLoader, sRGBEncoding, Group, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, AnimationObjectGroup, Raycaster, Vector2, Vector3, Object3D, Quaternion } from "three"
import { LoopOnce } from 'three/src/constants.js'
import type { AnimationAction } from 'three/src/animation/AnimationAction'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { LemonNFT } from '$src/utils/types'
import { assetsTimestamp } from "$src/utils/helpers"
import { modelUrl, wearLemonModel } from '$src/threejs/lemon'
import { nftMintFull } from '$src/utils/near'
import { InteractionManager } from "three.interactive";

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
  private interactionManager!: InteractionManager
  private mixers: {
    [name: string]: AnimationMixer
  }
  private animations: Animations
  private pointerOver: string
  private activePlatform: number
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
    this.mixers = {}
    this.animations = {}
    this.light = 3.8
    this.pointerOver = ''
    this.activePlatform = 1

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
    
    this.loader.load(`/models/BTLMN_LemonPlatforms.glb?${assetsTimestamp}`, (gltf) => {
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

      this.mixers.platforms = mixer
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
      this.controls.enableRotate = false

      this.scene.scale.set(globalScale, globalScale, globalScale);
      this.sceneLights.light1 = new DirectionalLight(0xFFFFFF);
      this.sceneLights.light2 = new DirectionalLight(0xFFFFFF);
      this.setLightSettings()
      this.scene.add(this.sceneLights.light1);
      this.scene.add(this.sceneLights.light2);

      const Platforms = [
        this.scene.getObjectByName("LemonPos_1"),
        this.scene.getObjectByName("LemonPos_2"),
        this.scene.getObjectByName("LemonPos_3")
      ]
      const Pluses = [
        this.scene.getObjectByName("Plus_1"),
        this.scene.getObjectByName("Plus_2"),
        this.scene.getObjectByName("Plus_3")
      ]
      const PlusesStroke = [
        this.scene.getObjectByName("Plus_1_Stroke"),
        this.scene.getObjectByName("Plus_2_Stroke"),
        this.scene.getObjectByName("Plus_3_Stroke")
      ]
      PlusesStroke.forEach(stroke => {
        if (stroke) stroke.visible = false
      })
      const Colliders = [
        this.scene.getObjectByName("collider1"),
        this.scene.getObjectByName("collider2"),
        this.scene.getObjectByName("collider3")
      ]
      
      lemons.slice(-3).reverse().forEach((lemon, index) => {
        const clonedLemon = SkeletonUtils.clone(this.lemonModel.scene);
        wearLemonModel(clonedLemon, lemon);
        clonedLemon.name = `Lemon${index + 1}`
        Platforms[index]!.add(clonedLemon)
        Pluses[index]!.visible = false
        
        const mixer = new AnimationMixer( clonedLemon )
        const action = mixer.clipAction( this.lemonModel.animations[ 0 ] );
        action.play();
        this.mixers[`lemon${index + 1}`] = mixer
      })

      this.interactionManager = new InteractionManager(
        this.renderer,
        this.camera,
        this.renderer.domElement,
        true
      );

      Colliders.forEach((collider, index) => {
        if (collider) {
          this.interactionManager.add(collider)
          collider.addEventListener("mouseenter", (event) => {
            document.body.style.cursor = 'pointer';
            if (PlusesStroke[index]) PlusesStroke[index]!.visible = true
          })
          collider.addEventListener("mouseleave", (event) => {
            if (PlusesStroke[index]) PlusesStroke[index]!.visible = false
          })
        }
      })

      Colliders[0]?.addEventListener("mousedown", (event) => {
        if (Pluses[0]?.visible) {
          nftMintFull()
          return
        }
        if (this.activePlatform == 2) {
          this.mixers.platforms.stopAllAction()
          this.animations['Backward3'].play()
        }
        if (this.activePlatform == 3) {
          this.mixers.platforms.stopAllAction()
          this.animations['Forward3'].play()
        }
        this.activePlatform = 1
      });
      
      Colliders[1]?.addEventListener("mousedown", (event) => {
        if (Pluses[1]?.visible) {
          nftMintFull()
          return
        }
        if (this.activePlatform == 1) {
          this.mixers.platforms.stopAllAction()
          this.animations['Forward1'].play()
        }
        if (this.activePlatform == 3) {
          this.mixers.platforms.stopAllAction()
          this.animations['Backward2'].play()
        }
        this.activePlatform = 2
      });

      Colliders[2]?.addEventListener("mousedown", (event) => {
        if (Pluses[2]?.visible) {
          nftMintFull()
          return
        }
        if (this.activePlatform == 1) {
          this.mixers.platforms.stopAllAction()
          this.animations['Backward1'].play()
        }
        if (this.activePlatform == 2) {
          this.mixers.platforms.stopAllAction()
          this.animations['Forward2'].play()
        }
        this.activePlatform = 3
      });


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
    Object.values(this.mixers).forEach(mixer => mixer.update(delta))
    this.controls.update();
    this.sceneLights.light1.position.set(this.camera.position.x, this.camera.position.y + 50, this.camera.position.z);
    this.sceneLights.light2.position.set(this.camera.position.x, this.camera.position.y - 10, this.camera.position.z);
    
    this.scene.getObjectByName("Lemon1")?.lookAt(this.camera.position)
    this.scene.getObjectByName("Lemon2")?.lookAt(this.camera.position)
    this.scene.getObjectByName("Lemon3")?.lookAt(this.camera.position)
    this.scene.getObjectByName("Plus_1")?.lookAt(this.camera.position)
    this.scene.getObjectByName("Plus_2")?.lookAt(this.camera.position)
    this.scene.getObjectByName("Plus_3")?.lookAt(this.camera.position)

    this.interactionManager.update();
    this.renderer.render(this.scene, this.camera);
  }
}