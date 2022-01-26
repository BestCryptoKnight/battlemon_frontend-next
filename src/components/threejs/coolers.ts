import { LoadingManager, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, Vector3 } from "three"
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
    this.dom = document.getElementById(dom)
    this.camera = new PerspectiveCamera(30, this.dom.offsetWidth / this.dom.offsetHeight);
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
      const cooler3 = gltf.scene.clone()

      cooler1.name = 'cooler1'
      cooler1.position.set(0, -0.76, 0)
      cooler1.rotateY(0.58)
      cooler1.rotation.z = 1.296;
      const cooler1scale = 0.72
      cooler1.scale.set(cooler1scale, cooler1scale, cooler1scale)
      this.scene.add(cooler1)

      cooler2.name = 'cooler2'
      cooler2.position.set(1.09, -0.91, 0)
      cooler2.rotateY(0.55)
      const cooler2scale = 0.63
      cooler2.scale.set(cooler2scale, cooler2scale, cooler2scale)
      this.scene.add(cooler2)

      cooler3.name = 'cooler3'
      cooler3.position.set(-1.47, 1.21, 0)
      cooler1.rotation.z = 0.78;
      cooler3.rotateY(0.49)
      const cooler3scale = 0.71
      cooler3.scale.set(cooler3scale, cooler3scale, cooler3scale)
      this.scene.add(cooler3)
    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);

    this.light = new DirectionalLight(0xFFFFFF, 1.2);
    this.light.position.set(10, 5, 30);
    this.scene.add(this.light);

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

  private onWindowResize(): void {
    this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.scene.getObjectByName('cooler1').rotation.z -= 0.012;
    this.scene.getObjectByName('cooler2').rotation.z -= 0.015;
    this.scene.getObjectByName('cooler3').rotation.z -= 0.008;
    this.renderer.render(this.scene, this.camera);
  }
}