import { LoadingManager, sRGBEncoding, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, Mesh, Material, FrontSide, Raycaster } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

  constructor({ dom, arena, cam, camPos }: { dom: string, arena: string, cam: number, camPos: number[] }) {
    this.dom = document.getElementById(dom)!
    this.isAnimating = false;
    this.camera = new PerspectiveCamera(cam, 1);

    this.scene = new Scene();
    this.mixer = new AnimationMixer( this.scene )
    this.clock = new Clock()
    this.raycaster = new Raycaster()
    //this.scene.translateY(-9.6)

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    this.loader = new GLTFLoader(manager);
    this.loader.load(arena, (gltf) => {
      gltf.scene.name = 'arena'
      gltf.scene.translateY(18)
      //gltf.scene.rotateY(0.05)
      gltf.scene.rotateX(0.29)
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

    this.light = new DirectionalLight(0xCCCCCC, 8.5);
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

    var intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) { // check the array
        console.log(intersects)
        if (intersects[0].object.name.includes('factory_')) {
            console.log('Mouse is over')
        } else {
            console.log('Mouse is off')
        }
    }


    this.renderer.render(this.scene, this.camera);
  }
}