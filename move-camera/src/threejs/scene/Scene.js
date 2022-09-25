import {
  Color,
  DirectionalLight,
  HemisphereLight,
  LoadingManager,
  Scene,
} from "three";
// import { Cube } from "../object/Cube";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Scene1 extends Scene {
  constructor(
    objects = [],
    progress = {
      container: null,
      progress: null,
    }
  ) {
    super();
    this.background = new Color("skyblue").convertSRGBToLinear();
    this.glftLoader = null;
    this.loadedModel = null;
    this.managerLoader(objects, progress);
  }

  managerLoader(
    objects = [],
    progress = {
      container: null,
      progress: null,
    }
  ) {
    if (objects.length > 0) {
      const loadingManager = new LoadingManager();

      loadingManager.onLoad = () => {
        progress.container.style.display = "none";
      };

      loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
        progress.progress.value = (itemsLoaded / itemsTotal) * 100;
      };

      loadingManager.onError = (url) => {
        console.log("There was an error loading " + url);
      };

      const glftLoader = new GLTFLoader(loadingManager);
      objects.map((object) => {
        let path = "./src/assets/models/";
        path += object.path;
        glftLoader.load(
          path,
          (gltfScene) => {
            gltfScene.scene.scale.set(2, 2, 2);
            gltfScene.scene.position.x = object.x;
            this.add(gltfScene.scene);
            // console.log(gltfScene);
          },
          undefined,
          (error) => {
            console.log(error);
          }
        );
      });
    }
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
