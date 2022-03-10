// * Declaración de la scena de threjs
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)

//* Camara y configuración de rederización
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//* Animate render
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();