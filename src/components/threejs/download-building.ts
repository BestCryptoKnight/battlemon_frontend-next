import { LoadingManager, BackSide, Material, Mesh, sRGBEncoding, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, FrontSide } from "three"
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
  private turnAnimation: boolean;

  constructor({ dom, arena, cam, camPos }: { dom: string, arena: string, cam: number, camPos: number[] }) {
    this.dom = document.getElementById(dom)!
    this.camera = new PerspectiveCamera(cam, 1);
    this.isAnimating = false;
    this.turnAnimation = false;

    this.scene = new Scene();
    this.scene.translateY(-0.9)

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    this.loader = new GLTFLoader(manager);
    this.loader.load(arena, (gltf) => {
      const border = gltf.scene.getObjectByName('border') as Mesh
      const material = border.material as Material
      material.side = FrontSide
      //border.visible = false
      gltf.scene.name = 'building'
      gltf.scene.scale.set(0.45,0.45,0.45)
      gltf.scene.translateY(0)
      gltf.scene.rotateY(-0.05)
      gltf.scene.rotateX(-0.2)
      gltf.scene.rotateZ(0.2)
      this.scene.add(gltf.scene)
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
    // this.controls.autoRotate = true;
    // this.controls.autoRotateSpeed = 11.3;

    this.light = new DirectionalLight(0xFFFFFF, 22.5);
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.scene.add(this.light);

    manager.onLoad = () => {
      this.dom.appendChild(this.renderer.domElement);
      const loader = document.getElementById('loader')
      if (loader) loader.style.opacity = '0';
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
    
    this.controls.update()
    // const angle = this.controls.getAzimuthalAngle();
    // if (!this.turnAnimation && angle > 0 && angle < 2) {
    //   this.controls.autoRotateSpeed = -1 * this.controls.autoRotateSpeed;
    //   this.turnAnimation = true;
    // }
    // if (this.turnAnimation && angle < 0 && angle > -2) {
    //   this.controls.autoRotateSpeed = -1 * this.controls.autoRotateSpeed;
    //   this.turnAnimation = false;
    // }
    // console.log(angle)
    this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}