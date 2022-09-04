import { TextureLoader, LoadingManager, CubeTextureLoader, sRGBEncoding, Group, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, AnimationObjectGroup } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import type { LemonNFT } from './lemon'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private clock: Clock
  private controls: OrbitControls
  private loader: GLTFLoader
  private isAnimating: boolean
  private mixer: AnimationMixer
  private animatedObjects: AnimationObjectGroup
  private sceneLights: {
    [key: string]: DirectionalLight
  }
  light: number

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor({ dom, translateY, cam, globalScale, lemons }: { dom: string, cam: number, translateY: number, globalScale: number, lemons: LemonNFT[] }) {
    this.dom = document.getElementById(dom)!
    this.camera = new PerspectiveCamera(cam, this.dom.offsetWidth / this.dom.offsetHeight);
    this.sceneLights = {};
    this.isAnimating = false;
    this.clock = new Clock()
    this.scene = new Scene();
    this.scene.translateY(translateY);
    
    this.mixer = new AnimationMixer( this.scene )

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

    this.loader.load(`/models/BTLMN_Outfits_Tier1_MP.glb?020620220003`, (gltf) => {
      gltf.scene.name = 'lemon'
      gltf.scene.position.setY(0)
      gltf.scene.scale.set(0.018, 0.018, 0.018)      

      // это косяки
        // тут аутфит лежит не в папке Armature, и вообще в папке armature есть еще кости
        const FireArms_Assault_Rifle_AA01 = gltf.scene.getObjectByName('FireArms_Assault_Rifle_AA01')
        if (FireArms_Assault_Rifle_AA01) {
          FireArms_Assault_Rifle_AA01.removeFromParent()
          gltf.scene.getObjectByName('Armature')?.add(FireArms_Assault_Rifle_AA01)
        }
        
        // тут неправильно указан Exo_Snowwhite
        const Exo_Snowwhite_AA02 = gltf.scene.getObjectByName('Exo_Snowwhite_AA02')
        if (Exo_Snowwhite_AA02) {
          Exo_Snowwhite_AA02.name = 'Exo_Snowwhite_Exoskeleton_AA02'
        }

        // в аутфитах вообще нет головы
        lemons.forEach(lemon => lemon.model.head = 'Head_Fresh_Lemon_AA01')
      // !

      if (!lemons?.length) return;
      const lemon = lemons[lemons.length - 1]

      const outstaffList = Object.entries(lemon.model).map(([key, outfit]) => {
        if (!outfit || key === "kind" || key === "cold_arm") return
        if (typeof outfit === 'object') {
          return outfit.flavour
        } else if (typeof outfit === 'string') {
          return outfit
        }
      }).filter(o => o)

      const outstaff = gltf.scene.getObjectByName('Armature')?.children
      outstaff?.forEach(os => {
        if (os.type == 'Bone') return;
        if (outstaffList.includes(os.name)) return
        os.visible = false;
      })

      this.scene.add(gltf.scene)
      var action = this.mixer.clipAction( gltf.animations[ 0 ] );
      action.play();
    });

    
    this.loader.load('/models/platform_big.glb?020620220003', (gltf) => {
      if (!lemons?.length) return;
      gltf.scene.name = 'postament'
      gltf.scene.position.setY(0.25)
      gltf.scene.scale.set(0.7, 0.7, 0.7)
      this.scene.add(gltf.scene)
    });


    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true  });

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.toneMappingExposure = 0.5
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);

    this.controls = new OrbitControls(this.camera, this.dom)
    this.camera.position.set(0, 5, 28);
    this.controls.update();
    this.controls.enablePan = false;

    this.controls.minDistance = 28;
    this.controls.maxDistance = 28;

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

    this.controls.maxPolarAngle = Math.PI / 1.7;

    this.scene.scale.set(globalScale, globalScale, globalScale);
    this.sceneLights.light1 = new DirectionalLight(0xFFFFFF);
    this.sceneLights.light2 = new DirectionalLight(0xFFFFFF);
    this.setLightSettings()
    this.scene.add(this.sceneLights.light1);
    this.scene.add(this.sceneLights.light2);

    manager.onLoad = () => {
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
    this.mixer.update(delta)
    this.controls.update();
    this.sceneLights.light1.position.set(this.camera.position.x, this.camera.position.y + 50, this.camera.position.z);
    this.sceneLights.light2.position.set(this.camera.position.x, this.camera.position.y - 10, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}