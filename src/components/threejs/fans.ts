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
      const cooler3 = gltf.scene.clone()

      cooler1.name = 'cooler1'
      cooler1.position.set(-4.65, 2.39, 0)
      cooler1.rotateY(0.75)
      const cooler1scale = 0.32
      cooler1.scale.set(cooler1scale, cooler1scale, cooler1scale)
      this.scene.add(cooler1)

      cooler2.name = 'cooler2'
      cooler2.position.set(-5.39, 2.41, 0)
      cooler2.rotateY(0.75)
      const cooler2scale = 0.33
      cooler2.scale.set(cooler2scale, cooler2scale, cooler2scale)
      this.scene.add(cooler2)

      cooler3.name = 'cooler3'
      cooler3.position.set(-6.18, 3.75, 0)
      cooler3.rotateY(0.7)
      const cooler3scale = 0.37
      cooler3.scale.set(cooler3scale, cooler3scale, cooler3scale)
      this.scene.add(cooler3)
    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetWidth);

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
    this.camera.aspect = 1;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetWidth);
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.scene.getObjectByName('cooler1').rotation.z -= 0.012;
    this.scene.getObjectByName('cooler2').rotation.z -= 0.015;
    this.scene.getObjectByName('cooler3').rotation.z -= 0.008;
    this.renderer.render(this.scene, this.camera);
  }
}