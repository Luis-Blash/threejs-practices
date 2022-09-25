import { PerspectiveCamera, sRGBEncoding, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene1 } from "./scene/Scene";
import { models } from "./type_models";

export class App {
  constructor(
    container,
    progress = {
      container: null,
      progress: null,
    }
  ) {
    this.container = container;
    this.scene = new Scene1(models, progress);
    //* Camara
    this.camera = new PerspectiveCamera(
      35,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      10000
    );
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    //* Renderer's config
    this.renderer = new WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // sRGBEncoding
    this.renderer.outputEncoding = sRGBEncoding;

    //* Light's config
    this.renderer.physicallyCorrectLights = true;
    this.container.appendChild(this.renderer.domElement);
    this.controllerManager()
    this.onResize();
    this.render();
  }

  controllerManager() {
    this.controller = new OrbitControls(this.camera, this.renderer.domElement)
  }

  onResize() {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    // Updates here
    this.scene.update();
    this.renderer.setAnimationLoop(() => this.render());
  }
}
