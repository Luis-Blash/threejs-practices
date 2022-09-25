import { Mesh, BoxBufferGeometry, MeshStandardMaterial, Color } from "three";

export class Cube extends Mesh {
	constructor(size) {
		super();

		this.geometry = new BoxBufferGeometry(size, size, size);
		this.material = new MeshStandardMaterial({
			color: new Color('orangered').convertSRGBToLinear(),
			flatShading: true,
			roughness: .5
		});
	}
}
