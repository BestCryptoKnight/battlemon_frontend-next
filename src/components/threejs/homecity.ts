import { LoadingManager, sRGBEncoding, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, Mesh, Material, FrontSide, Raycaster, Vector2 } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { clientLink } from '$src/utils/helpers'
import { goto } from '$app/navigation';

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private controls: OrbitControls
  private light: DirectionalLight
  private loader: GLTFLoader
  private isAnimating: boolean
  private mixer: AnimationMixer
  private clock: Clock
  private raycaster: Raycaster
  private pointer: Vector2
  private pointerOver: string
  private pointerLeave: string

  constructor({ dom, arena, cam, camPos }: { dom: string, arena: string, cam: number, camPos: number[] }) {
    this.dom = document.getElementById(dom)!
    this.isAnimating = false;
    this.camera = new PerspectiveCamera(cam, 1);

    this.scene = new Scene();
    this.mixer = new AnimationMixer( this.scene )
    this.clock = new Clock()
    this.raycaster = new Raycaster()
    this.pointer = new Vector2()
    this.pointerOver = '';
    this.pointerLeave = '';
    this.scene.translateY(14.6)

    var rect = this.dom.getBoundingClientRect();
    const onPointerMove = (event: MouseEvent) => {
      this.pointer.x = ( (event.clientX - rect.left) / this.dom.offsetWidth ) * 2 - 1;
      this.pointer.y = - ( (event.clientY - rect.top) / this.dom.offsetWidth ) * 2 + 1;
    }

    window.addEventListener( 'pointermove', onPointerMove );

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
    };

    this.loader = new GLTFLoader(manager);
    this.loader.load(arena, (gltf) => {
      gltf.scene.name = 'arena'
      //gltf.scene.rotateY(0.05)
      gltf.scene.rotateX(0.31)
      // gltf.scene.rotateZ(0.2)
      this.scene.add(gltf.scene)

      gltf.animations.forEach(anim => {
        var action = this.mixer.clipAction( anim );
        action.play();
      })

      gltf.scene.getObjectByName('factory_stroke')!.visible = false

    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetWidth);

    this.controls = new OrbitControls(this.camera, this.dom)
    this.camera.position.set(camPos[0], camPos[1], camPos[2]);
    this.controls.update();
    const polarAngle = Math.PI / 1.8
    this.controls.minPolarAngle = polarAngle;
    this.controls.maxPolarAngle = polarAngle;
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    this.light = new DirectionalLight(0xCCCCCC, 9.5);
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.scene.add(this.light);

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

  private onWindowResize(): void {
    this.camera.aspect = 1;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetWidth);
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
        if (object.name.indexOf('factory_') >= 0) {
          hovered = 'factory'
          break;
        }
        if (object.name.indexOf('craft_') >= 0) {
          hovered = 'craft'
          break;
        }
        if (object.name.indexOf('stake_') >= 0) {
          hovered = 'stake'
          break;
        }
        if (object.name.indexOf('shop_') >= 0) {
          hovered = 'shop'
          break;
        }
        if (object.name.indexOf('arena_') >= 0) {
          hovered = 'arena'
          break;
        }
        if (object.name.indexOf('car_mesh') >= 0) {
          hovered = 'car_mesh'
          break;
        }
      }

      // if (hovered.length && hovered != this.pointerOver) {
      //   this.pointerOver = hovered
      //   this.pointerLeave = ''
      //   console.log(this.pointerOver)
      // } 
      // console.log(hovered)
      // if (!hovered.length && !this.pointerLeave.length) {
      //   this.pointerLeave = 'leave'
      //   this.pointerOver = ''
      //   console.log('leave')
      // }

      // if (intersects.find(i => i.object.name.includes('factory_') && this.pointerOver != 'factory')) {
      //   this.pointerOver = 'factory'
      //   console.log(this.pointerOver)
      // } else if (intersects.find(i => i.object.name.includes('craft_') && this.pointerOver != 'craft')) {
      //   this.pointerOver = 'craft'
      //   console.log(this.pointerOver)
      // } else if (!['factory','craft','other'].includes(this.pointerOver)) {
      //   this.pointerOver = 'other'
      //   console.log(this.pointerOver)
      // }
    }

    if (this.pointerOver != hovered) {
      if (hovered == 'none') {
        document.onclick = () => {}
        document.body.style.cursor = 'default';
        this.scene.getObjectByName('factory_stroke')!.visible = false
        this.scene.getObjectByName('craft_stroke')!.visible = false
        this.scene.getObjectByName('stake_stroke')!.visible = false
        this.scene.getObjectByName('shop_stroke')!.visible = false
        this.scene.getObjectByName('arena_stroke')!.visible = false
      } else {
        document.body.style.cursor = 'pointer';
      }
      if (hovered == 'factory') {
        this.scene.getObjectByName('factory_stroke')!.visible = true
      }
      if (hovered == 'craft') {
        this.scene.getObjectByName('craft_stroke')!.visible = true
      }
      if (hovered == 'stake') {
        this.scene.getObjectByName('stake_stroke')!.visible = true
      }
      if (hovered == 'shop') {
        this.scene.getObjectByName('shop_stroke')!.visible = true
        document.onclick = () => goto('/shop')
      }
      if (hovered == 'arena') {
        this.scene.getObjectByName('arena_stroke')!.visible = true
        document.onclick = () => goto('/arena')
      }
      if (hovered == 'car_mesh') {
        document.onclick = () => {
          location.href = clientLink()
        }
        //document.body.style.cursor = 'pointer';
      }
    } 
    
    
    this.pointerOver = hovered


    // if (this.pointerOver.length > 0) {
    //   this.pointerOver = ''
    //   console.log('leave')
    // }


    this.renderer.render(this.scene, this.camera);
  }
}