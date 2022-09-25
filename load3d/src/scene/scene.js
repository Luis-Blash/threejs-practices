import { Cube } from "../object/cube.js";

export class Scene extends THREE.Scene {
	constructor() {
		super();
		this.background = new THREE.Color('skyblue').convertSRGBToLinear();
		this.create();
	}

	create() {
        this.brick = new Cube(2, new THREE.Color('rgb(255,0,0)'));
		this.add(this.brick);

		const ambientLight = new THREE.HemisphereLight(0xffffbb, 0x080820, .5);
		const light = new THREE.DirectionalLight(0xffffff, 1.0);
		this.add(light, ambientLight);
	}

	update() {

	}
}
