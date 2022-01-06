import { Vector3, LoadingManager, AmbientLight, DirectionalLight, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private mesh: Mesh;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private controls: OrbitControls
  private light1: DirectionalLight
  private light2: DirectionalLight

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor(id: string) {
    this.dom = document.getElementById(id)
    this.camera = new PerspectiveCamera(34, this.dom.offsetWidth / this.dom.offsetHeight);

    this.scene = new Scene();
    this.scene.translateY(-0.8)

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    
    const loader = new GLTFLoader(manager);
    loader.load('/media/Lemon_mecho.glb', (gltf) => {
      this.scene.add(gltf.scene)
    });
    loader.load('/media/turel.glb', (gltf) => {
      const weapon = gltf.scene
      weapon.position.set(1.05, 0.95, 0);
      this.scene.add(weapon)
    });
    loader.load('/media/turel.glb', (gltf) => {
      const weapon = gltf.scene
      weapon.scale.multiply(new Vector3(-1, 1, 1))
      weapon.position.set(-1.05, 0.95, 0);
      this.scene.add(weapon)
    });


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


    const camPos = this.camera.position
    this.light1 = new DirectionalLight(0xFFFFBE, 3);
    this.light1.position.set(camPos.x, -1, camPos.z);
    this.scene.add(this.light1);
    this.light2 = new DirectionalLight(0xFFFFBE, 3);
    this.light2.position.set(camPos.x, 6, camPos.z);
    this.scene.add(this.light2);

    manager.onLoad = () => {
      this.dom.appendChild(this.renderer.domElement);
      document.getElementById('loader').style.display = 'none';
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      this.animate();
    };

  }

  private onWindowResize(): void {
    this.camera.aspect = this.dom.offsetWidth / this.dom.offsetHeight;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.light1.position.setX(this.camera.position.x);
    this.light1.position.setZ(this.camera.position.z);
    this.light2.position.setX(this.camera.position.x);
    this.light2.position.setZ(this.camera.position.z);
    this.renderer.render(this.scene, this.camera);
  }
}