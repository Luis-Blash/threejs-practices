import { Color, DirectionalLight, HemisphereLight, Scene } from "three";
// import { Cube } from "../object/Cube";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Scene1 extends Scene {
  constructor(objects = []) {
    super();
    this.background = new Color("skyblue").convertSRGBToLinear();
    this.glftLoader = null;
    this.loadedModel = null;
    // this.object3d(objects);
    this.managerLoader(objects);
  }

  create() {
    // this.brick = new Cube(2, new Color('rgb(255,0,0)'));
    // this.add(this.brick);
    // const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
    // const light = new DirectionalLight(0xffffff, 1.0);
    // this.add(light, ambientLight);
  }

  managerLoader(object = []){

  }

  object3d(objects = []) {
    if (objects.length > 0) {
      objects.map((object) => {
        let path = "./src/assets/models/";
        let glftLoader = new GLTFLoader();
        path += object.path;
        glftLoader.load(
          path,
          (gltfScene) => {
            gltfScene.scene.scale.set(2, 2, 2);
            gltfScene.scene.position.x = object.x;
            this.add(gltfScene.scene);
            // console.log(gltfScene);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {
            console.log(error);
          }
        );
      });
    }
  }

  update() {
    // if (this.loadedModel) {
    //   this.loadedModel.scene.rotation.x += 0.01;
    //   this.loadedModel.scene.rotation.y += 0.01;
    //   this.loadedModel.scene.rotation.z += 0.01;
    // }
  }
}
