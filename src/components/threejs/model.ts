import { Vector3, LoadingManager, CubeTextureLoader, sRGBEncoding, DirectionalLight, Mesh, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export class Model {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private mesh: Mesh;
  private renderer: WebGLRenderer;
  private dom: HTMLElement
  private controls: OrbitControls
  private light1: DirectionalLight
  private loader: GLTFLoader
  private isAnimating: boolean
  private weaponCoord: number[]
  private isArena: boolean

  /**
   * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
   */
  constructor({ dom, lemon, rightWeapon, leftWeapon, cam, scale, weaponCoord, translateY, arenaBg, globalScale }: { dom: string, lemon: string, rightWeapon: string, leftWeapon: string, cam: number, scale: number, weaponCoord: number[], translateY: number, arenaBg?: boolean, globalScale: number}) {
    this.dom = document.getElementById(dom)
    this.camera = new PerspectiveCamera(cam, this.dom.offsetWidth / this.dom.offsetHeight);
    this.weaponCoord = weaponCoord
    this.isArena = arenaBg
    this.scene = new Scene();
    this.scene.translateY(translateY)

    const manager = new LoadingManager();
    manager.onProgress = function (item, loaded, total) {
      const percents = (loaded / total * 100) + '%';
      console.log(percents)
    };

    
    this.loader = new GLTFLoader(manager);
    this.loader.load(lemon, (gltf) => {
      gltf.scene.name = 'lemon'
      gltf.scene.scale.set(scale, scale, scale)
      this.scene.add(gltf.scene)
    });
    this.loader.load(leftWeapon, (gltf) => {
      this.addEquipment(gltf, 'leftWeapon')
    });
    this.loader.load(rightWeapon, (gltf) => {
      this.addEquipment(gltf, 'rightWeapon')
    });

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights = true
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);

    this.controls = new OrbitControls(this.camera, this.dom)
    this.camera.position.set(0, 0, 25);
    this.controls.update();

    if (arenaBg) {
      this.controls.minDistance = 20;
      this.controls.maxDistance = 32;

      this.scene.background = new CubeTextureLoader()
        .setPath('/img/arena/')
        .load([
          'fantasy-px_1024.jpg',
          'fantasy-nx_1024.jpg',
          'fantasy-py_1024.jpg',
          'fantasy-ny_1024.jpg',
          'fantasy-pz_1024.jpg',
          'fantasy-nz_1024.jpg'
        ]);

      this.loader.load('/media/postament.glb', (gltf) => {
        gltf.scene.name = 'postament'
        gltf.scene.position.setY(0.5)
        gltf.scene.scale.set(1, 1, 1)
        this.scene.add(gltf.scene)
      });

      const light2 = new DirectionalLight(0xFFFFFF, 2);
      light2.position.set(0, 100, 0);
      this.scene.add(light2);

      this.controls.maxPolarAngle = Math.PI / 1.7;

    } else {
      this.controls.minPolarAngle = Math.PI / 2;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.autoRotate = true;
    }


    const camPos = this.camera.position
    this.light1 = new DirectionalLight(0xFFFFFF, 3.5);
    this.light1.position.set(camPos.x, 0, camPos.z);
    this.scene.add(this.light1);
    this.scene.scale.set(globalScale, globalScale, globalScale);

    manager.onLoad = () => {
      this.dom.appendChild(this.renderer.domElement);
      document.getElementById('loader').style.display = 'none';
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      if (!this.isAnimating) {
        this.animate();
        this.isAnimating = true
      }
    };

  }

  addEquipment(gltf: GLTF, name: string): void {
    const object = gltf.scene
    object.name = name
    if (name == 'leftWeapon') {
      object.position.set(this.weaponCoord[0], this.weaponCoord[1], this.weaponCoord[2]);
    }
    if (name == 'rightWeapon') {
      object.scale.multiply(new Vector3(-1, 1, 1))
      object.position.set(this.weaponCoord[0]*-1, this.weaponCoord[1], this.weaponCoord[2]);
    }
    this.scene.add(object)
  }

  async changeEquipment(name: string, model: string): Promise<void> {
    document.getElementById('loader').style.display = 'block';
    return new Promise((resolve, reject) => {
      const objectToRemove = this.scene.getObjectByName(name);
      this.loader.load(model, (gltf) => {
        this.scene.remove(objectToRemove);
        this.addEquipment(gltf, name)
        resolve()
      });
    });
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
    this.light1.position.setY(this.camera.position.y);
    this.renderer.render(this.scene, this.camera);
  }
}