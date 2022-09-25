import { Color, DirectionalLight, HemisphereLight, Scene } from "three";
// import { Cube } from "../object/Cube";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Scene1 extends Scene {
  constructor() {
    super();
    this.background = new Color("skyblue").convertSRGBToLinear();
    this.create();
    this.loadedModel = null;
  }

  create() {
    const glftLoader = new GLTFLoader();
    glftLoader.load(
      "./src/assets/shiba/scene.gltf",
      (gltfScene) => {
        this.loadedModel = gltfScene;
        gltfScene.scene.scale.set(5, 5, 5);
        this.add(gltfScene.scene);
        console.log(gltfScene);
      },
      undefined,
      (error) => {
        console.log(error);
      }
    );
    // this.brick = new Cube(2, new Color('rgb(255,0,0)'));
    // this.add(this.brick);
    // const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
    // const light = new DirectionalLight(0xffffff, 1.0);
    // this.add(light, ambientLight);
  }

  update() {
    if(this.loadedModel){
      this.loadedModel.scene.rotation.x += 0.01;
      this.loadedModel.scene.rotation.y += 0.01;
      this.loadedModel.scene.rotation.z += 0.01;
    }
  }
}
