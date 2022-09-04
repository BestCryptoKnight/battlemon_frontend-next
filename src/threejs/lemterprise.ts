import { LoadingManager, sRGBEncoding, DirectionalLight, EquirectangularReflectionMapping,PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, Mesh, Material, FrontSide, Raycaster, Vector2, AmbientLight, CubeTextureLoader, AnimationClip, LoopOnce } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


import { writable } from "svelte/store";

export const actions = writable<Actions>({
  isBackVisible: false,
  activateBack: false,
  activateCapsule: undefined,
  currentCapsule: undefined
})


export interface Actions {
  isBackVisible: boolean,
  activateBack: boolean,
  activateCapsule: string | undefined,
  currentCapsule: string | undefined
}

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private controls: OrbitControls
  private light: DirectionalLight | AmbientLight
  private loader: GLTFLoader
  private isAnimating: boolean
  private mixer: AnimationMixer
  private clock: Clock
  private raycaster: Raycaster
  private pointer: Vector2
  private pointerOver: string
  private pointerLeave: string
  private animations: AnimationClip[]
  private currentPoint: string | undefined
  constructor({ dom, arena, cam, camPos }: { dom: string, arena: string, cam: number, camPos: number[] }) {
    this.dom = document.getElementById(dom)!
    this.isAnimating = false;
    
    const {aspect, fov} = this.cameraParams()
    this.camera = new PerspectiveCamera(fov, aspect);

    this.scene = new Scene();
    this.mixer = new AnimationMixer( this.scene )
    this.clock = new Clock()
    this.raycaster = new Raycaster()
    this.pointer = new Vector2()
    this.pointerOver = '';
    this.pointerLeave = '';
    this.animations = []

    var rect = this.dom.getBoundingClientRect();
    const onPointerMove = (event: MouseEvent) => {
      this.pointer.x = ( (event.clientX - rect.left) / this.dom.offsetWidth ) * 2 - 1;
      this.pointer.y = - ( (event.clientY - rect.top) / this.dom.offsetHeight ) * 2 + 1;
    }

    window.addEventListener( 'pointermove', onPointerMove );

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
    };


    this.loader = new GLTFLoader(manager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/draco/' );
    this.loader.setDRACOLoader( dracoLoader );

    this.loader.load(arena, (gltf) => {
      gltf.scene.name = 'arena'
      //gltf.scene.rotateY(0.05)
      this.scene.add(gltf.scene)
      this.animations = gltf.animations

      let initAnimation = gltf.animations.find(anim => anim.name == "zoom_initial");
      let action = this.mixer.clipAction( initAnimation! );
      action.setLoop(LoopOnce, 1)
      action.clampWhenFinished = true;
      action.play();

      let finishedEvent = this.mixer.addEventListener( 'finished', ( e ) => {
        this.scene.getObjectByName('lemterprise_dissolve_a')!.visible = false
        this.scene.getObjectByName('lemterprise_dissolve_b')!.visible = false
        this.scene.getObjectByName('lemterprise_dissolve_c')!.visible = false
        this.scene.getObjectByName('lemterprise_dissolve_d')!.visible = false
        this.scene.getObjectByName('lemterprise_dissolve_e')!.visible = false
        finished()
      } );
      
      const finished = () => {
        this.mixer.removeEventListener('finished', finishedEvent!)
      }
    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);

    this.controls = new OrbitControls(this.camera, this.dom)
    this.camera.position.set(camPos[0], camPos[1], camPos[2]);
    this.controls.update();
    const polarAngle = Math.PI / 1.8
    this.controls.minPolarAngle = polarAngle;
    this.controls.maxPolarAngle = polarAngle;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    

    this.light = new DirectionalLight(0xFFFFFF, 0.1);
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.scene.add(this.light);




    new RGBELoader()
      .setPath( '/models/' )
      .load( 'venice_sunset_1k.hdr', ( texture ) => {

      texture.mapping = EquirectangularReflectionMapping;

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
      this.scene.environment = texture;


      manager.onLoad = () => {
        this.dom.appendChild(this.renderer.domElement);
        document.getElementById('loader')!.style.opacity = '0';
        window.addEventListener("resize", this.onWindowResize.bind(this), false);
        this.camera = this.scene.getObjectByName('lemterprise_camera_Orientation') as PerspectiveCamera
        this.camera.aspect = aspect;
        this.camera.fov = fov;
        this.camera.setViewOffset(this.dom.offsetWidth, this.dom.offsetHeight, this.dom.offsetWidth / 7, 0, this.dom.offsetWidth, this.dom.offsetHeight)
        this.camera.updateProjectionMatrix();
        if (!this.isAnimating) {
          this.animate();
          this.isAnimating = true
        }
      };

      actions.subscribe(acts => {
        if (acts.activateBack) {
          document.onclick = () => {}
          this.goBack()
          actions.update(acts => ({...acts, activateBack: false, isBackVisible: false}))
        }
        if (acts.activateCapsule) {
          document.onclick = () => {}
          this.goCapsule(acts.activateCapsule)
          actions.update(acts => ({...acts, activateCapsule: undefined}))
        }
      });
    });


  }

  private goCapsule(capsule: string): void {
    this.playAnimation(capsule);
  }

  private goBack(): void {
    this.playAnimation(this.currentPoint!, true);
  }

  private cameraParams(): { aspect: number, fov: number } {
    const width = this.dom.offsetWidth
    const aspect = width / this.dom.offsetHeight;
    let fov = 42;

    return {
      aspect,
      fov
    }
  }

  private onWindowResize(): void {
    const {aspect, fov} = this.cameraParams()
    this.camera.aspect = aspect;
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
  }

  private hoverLayers(hovered?: string): void {
    this.scene.getObjectByName('lemterprise_dissolve_a')!.visible = !(hovered == 'lemterprise_dissolve_a')
    this.scene.getObjectByName('lemterprise_dissolve_b')!.visible = !(hovered == 'lemterprise_dissolve_b')
    this.scene.getObjectByName('lemterprise_dissolve_c')!.visible = !(hovered == 'lemterprise_dissolve_c')
    this.scene.getObjectByName('lemterprise_dissolve_d')!.visible = !(hovered == 'lemterprise_dissolve_d')
    this.scene.getObjectByName('lemterprise_dissolve_e')!.visible = !(hovered == 'lemterprise_dissolve_e')
  }

  private playAnimation(point: string, out: boolean = false) {
    if (!this.currentPoint && !point) return
    if (this.currentPoint && this.currentPoint == point && !out) return

    let anim: AnimationClip | undefined;
    actions.update(acts => ({...acts, isBackVisible: true}))
    this.mixer.stopAllAction();

    if (this.currentPoint) {
      if (out) {
        anim = this.animations.find(anim => anim.name == `zoom_${this.currentPoint}_out`)
      } else {
        anim = this.animations.find(anim => anim.name == `zoom_${this.currentPoint}${point}`)
      }
    } else {
      anim = this.animations.find(anim => anim.name == `zoom_${point}`)
    }
    let action = this.mixer.clipAction( anim! );
    action.setLoop(LoopOnce, 1)
    action.clampWhenFinished = true;
    action.play();
    
    this.currentPoint = out ? undefined : point

    actions.update(acts => ({...acts, currentCapsule: this.currentPoint}))
    return action;
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    const delta = this.clock.getDelta();
    this.mixer.update(delta)
    this.controls.update();
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);

    this.raycaster.setFromCamera( this.pointer, this.camera );

    let intersects = this.raycaster.intersectObjects(this.scene.children, true);
    let hovered = 'none'

    if (intersects.length > 0) {
      for (let { object } of intersects) {
        if (object.parent!.name.indexOf('lemterprise_dissolve_a') >= 0) {
          hovered = 'lemterprise_dissolve_a'
          break;
        } else
        if (object.parent!.name.indexOf('lemterprise_dissolve_b') >= 0) {
          hovered = 'lemterprise_dissolve_b'
          break;
        } else
        if (object.parent!.name.indexOf('lemterprise_dissolve_c') >= 0) {
          hovered = 'lemterprise_dissolve_c'
          break;
        } else
        if (object.parent!.name.indexOf('lemterprise_dissolve_d') >= 0) {
          hovered = 'lemterprise_dissolve_d'
          break;
        } 
        else
        if (object.parent!.name.indexOf('lemterprise_dissolve_e') >= 0) {
          hovered = 'lemterprise_dissolve_e'
          break;
        }
      }
    }

    if (this.pointerOver != hovered) {
      if (hovered == 'none') {
        document.onclick = () => {}
        document.body.style.cursor = 'default';
        //this.hoverLayers();
      } else {
        document.body.style.cursor = 'pointer';
      }
      
      //this.hoverLayers(hovered);
      if (hovered == 'lemterprise_dissolve_a') document.onclick = () => {
        this.playAnimation('a');
      }
      if (hovered == 'lemterprise_dissolve_b') document.onclick = () => {
        this.playAnimation('b')
      }
      if (hovered == 'lemterprise_dissolve_c') document.onclick = () => {
        this.playAnimation('c')
      }
      if (hovered == 'lemterprise_dissolve_d') document.onclick = () => {
        this.playAnimation('d')
      }
      if (hovered == 'lemterprise_dissolve_e') document.onclick = () => {
        this.playAnimation('e')
      }
    } 
    
    
    this.pointerOver = hovered
    this.renderer.render(this.scene, this.camera);
  }
}