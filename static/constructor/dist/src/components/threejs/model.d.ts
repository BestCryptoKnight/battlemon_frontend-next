import { Group } from "three";
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { LemonSettings } from './lemons';
export declare class Model {
    private camera;
    private scene;
    private renderer;
    private dom;
    private controls;
    private loader;
    private isAnimating;
    private lemonSettings;
    private isArena;
    private mixer;
    private animatedObjects;
    private sceneObjects;
    private sceneLights;
    scale: number;
    weaponCoord: [number, number, number];
    light: number;
    /**
     * Based off the three.js docs: https://threejs.org/examples/?q=cube#webgl_geometry_cube
     */
    constructor({ dom, rightWeapon, leftWeapon, translateY, cam, arenaBg, globalScale, lemonSettings, background, rotate, callback }: {
        dom: string;
        rightWeapon: string;
        leftWeapon: string;
        cam: number;
        translateY: number;
        arenaBg?: boolean;
        globalScale: number;
        lemonSettings: LemonSettings;
        background?: string;
        rotate?: boolean;
        callback?: () => void;
    });
    changeLemon(lemonSettings: LemonSettings): Promise<void>;
    screenShot(name: any): void;
    addObject(gltf: GLTF, name: string): void;
    setObjectSettings(object: Group): void;
    setLightSettings(): void;
    changeEquipment(name: string, item: {
        image: string;
        model: string;
        scale: number;
    }): Promise<void>;
    private onWindowResize;
    private animate;
}
