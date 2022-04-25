import { LoadingManager, DirectionalLight, PerspectiveCamera, LinearEncoding, Scene, WebGLRenderer } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private light: DirectionalLight
  private loader: GLTFLoader
  private isAnimating: boolean

  constructor({ dom, model }: { dom: string, model: string }) {
    this.dom = document.getElementById(dom)!
    this.isAnimating = false;
    this.camera = new PerspectiveCamera(30, 1);
    this.camera.position.set(0,0,30)

    this.scene = new Scene();

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    this.loader = new GLTFLoader(manager);
    this.loader.load(model, (gltf) => {
      const cooler1 = gltf.scene
      const cooler2 = gltf.scene.clone()

      cooler1.name = 'cooler1'
      cooler1.position.set(3.33, 2.66, 0)
      cooler1.rotateY(-0.2)
      const cooler1scale = 0.52
      cooler1.scale.set(cooler1scale, cooler1scale, cooler1scale)
      this.scene.add(cooler1)

      cooler2.name = 'cooler2'
      cooler2.position.set(1.80, 5.67, 0)
      cooler2.rotateY(-0.2)
      const cooler2scale = 0.54
      cooler2.scale.set(cooler2scale, cooler2scale, cooler2scale)
      this.scene.add(cooler2)
    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.outputEncoding = LinearEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.toneMappingExposure = 100
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetWidth);

    this.light = new DirectionalLight(0xFFFFFF, 8.2);
    this.light.position.set(1, 5, 50);
    this.scene.add(this.light);

    manager.onLoad = () => {
      this.dom.appendChild(this.renderer.domElement);
      const loader = document.getElementById('loader')
      loader ? loader.style.opacity = '0' : null
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
    this.scene.getObjectByName('cooler1')!.rotation.z -= 0.012;
    this.scene.getObjectByName('cooler2')!.rotation.z -= 0.010;
    this.renderer.render(this.scene, this.camera);
  }
}