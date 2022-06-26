import { LoadingManager, sRGBEncoding, DirectionalLight, EquirectangularReflectionMapping,PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, Mesh, Material, FrontSide, Raycaster, Vector2, AmbientLight, CubeTextureLoader } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { clientLink } from '$src/utils/helpers'
import { goto } from '$app/navigation';

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
    this.scene.translateY(-4.6)

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
      gltf.scene.rotateX(0.16)
      // gltf.scene.rotateZ(0.2)
      this.scene.add(gltf.scene)

      // gltf.animations.forEach(anim => {
      //   var action = this.mixer.clipAction( anim );
      //   action.play();
      // })
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
      .setPath('/img/arena/')
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
        this.camera.updateProjectionMatrix();
        if (!this.isAnimating) {
          this.animate();
          this.isAnimating = true
        }
      };

    });


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
    // this.scene.getObjectByName('factory_stroke')!.visible = hovered == 'factory'
    // this.scene.getObjectByName('craft_stroke')!.visible = hovered == 'craft'
    // this.scene.getObjectByName('craft_manipulator_stroke')!.visible = hovered == 'craft'
    // this.scene.getObjectByName('craft_manipulator7_stroke')!.visible = hovered == 'craft'
    // this.scene.getObjectByName('craft_manipulator8_stroke')!.visible = hovered == 'craft'
    // this.scene.getObjectByName('stake_stroke')!.visible = hovered == 'stake'
    // this.scene.getObjectByName('stake_coin_stroke')!.visible = hovered == 'stake'
    // this.scene.getObjectByName('shop_stroke')!.visible = hovered == 'shop'
    // this.scene.getObjectByName('windmill_stroke_01')!.visible = hovered == 'shop'
    // this.scene.getObjectByName('windmill_stroke_02')!.visible = hovered == 'shop'
    // this.scene.getObjectByName('arena_stroke')!.visible = hovered == 'arena'
    // this.scene.getObjectByName('arena_rotator_a_stroke')!.visible = hovered == 'arena'
    // this.scene.getObjectByName('download_client_car_stroke')!.visible = hovered == 'download_client'
    // this.scene.getObjectByName('download_client_car_adv_stroke')!.visible = hovered == 'download_client'
    // this.scene.getObjectByName('lemterprise_stroke')!.visible = hovered == 'lemterprise'
    // this.scene.getObjectByName('engines_stroke')!.visible = hovered == 'lemterprise'
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
        } else
        if (object.name.indexOf('craft_') >= 0) {
          hovered = 'craft'
          break;
        } else
        if (object.name.indexOf('stake_') >= 0) {
          hovered = 'stake'
          break;
        } else
        if (object.name.indexOf('shop_') >= 0) {
          hovered = 'shop'
          break;
        } else
        if (object.name.indexOf('arena_') >= 0) {
          hovered = 'arena'
          break;
        } else
        if (object.name.indexOf('lemterprise_') >= 0 || object.name.indexOf('engines_') >= 0 ) {
          hovered = 'lemterprise'
          break;
        } else
        if (object.name.indexOf('download_client') >= 0) {
          hovered = 'download_client'
          break;
        }
      }
    }

    if (this.pointerOver != hovered) {
      if (hovered == 'none') {
        document.onclick = () => {}
        document.body.style.cursor = 'default';
        this.hoverLayers();
      } else {
        document.body.style.cursor = 'pointer';
      }
      
      this.hoverLayers(hovered);
      if (hovered == 'shop') document.onclick = () => goto('/shop')
      if (hovered == 'arena') document.onclick = () => goto('/arena')
      if (hovered == 'download_client') document.onclick = () => location.href = clientLink()
    } 
    
    
    this.pointerOver = hovered
    this.renderer.render(this.scene, this.camera);
  }
}