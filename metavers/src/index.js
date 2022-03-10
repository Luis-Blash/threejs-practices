// * Declaración de la scena de threjs
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)

//* Camara y configuración de rederización
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//* Cubo
const geometry = new THREE.BoxGeometry();
//* Su material del cubo
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//* Justamos
const cube = new THREE.Mesh( geometry, material );
//* Se añade el cubo
scene.add( cube );
//* Desde la posición de la camara
camera.position.z = 5;



//? Animate render --- Bucle constante
function animate() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    
    //* Para la animación del frame
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();