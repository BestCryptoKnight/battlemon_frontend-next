import { DirectionalLight, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private mesh: Mesh;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private controls: OrbitControls

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor(id: string) {
    this.dom = document.getElementById(id)
    this.camera = new PerspectiveCamera(50, this.dom.offsetWidth / this.dom.offsetHeight);

    this.scene = new Scene();
    this.scene.translateY(-0.8)

    const loader = new GLTFLoader();
    loader.load('/media/Lemon_meho.glb', (gltf) => {
      this.scene.add(gltf.scene)
    });
    loader.load('/media/turel.glb', (gltf) => {
      const weapon = gltf.scene
      weapon.position.set(1, 1, 0);
      this.scene.add(weapon)
    });
    loader.load('/media/turel.glb', (gltf) => {
      const weapon = gltf.scene
      weapon.position.set(-1, 1, 0);
      this.scene.add(weapon)
    });

    const light1 = new DirectionalLight(0xffffff, 3);
    light1.position.set(0, 5, 7);
    this.scene.add(light1);
    const light2 = new DirectionalLight(0xffffff, 3);
    light2.position.set(0, 5, -7);
    this.scene.add(light2);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);

    this.controls = new OrbitControls(this.camera, this.dom)
    this.camera.position.set(0, 0, 8);
    this.controls.update();
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.enableZoom = false;
    this.controls.autoRotate = true;

    this.dom.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    this.animate();
  }

  private onWindowResize(): void {
    this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}