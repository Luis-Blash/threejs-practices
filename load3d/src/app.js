
import {Scene} from './scene/scene.js';

export class App {
  constructor(container) {
    this.container = container;

    this.scene = new Scene();
    //* Camara
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      10000
    );
    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    //* Renderer's config
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // sRGBEncoding
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    //* Light's config
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);
    this.onResize();
    this.render();
  }
  onResize() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    // Updates here
		this.scene.update();
    this.renderer.setAnimationLoop(() => this.render());
  }
}