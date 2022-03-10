// * Declaración de la scena de threjs
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)

//* Camara y configuración de rederización
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//* Configuración de luces
const ambient_light = new THREE.AmbientLight( 0x404040 )
const directional_Light = new THREE.DirectionalLight( 0xffffff, 1 );
ambient_light.add(directional_Light);
scene.add(ambient_light);


//* Espacion plano 
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const space = new THREE.Mesh( geometry_space, material_space );
scene.add( space );

//* Cubo
const geometry = new THREE.BoxGeometry();
//? Su material del cubo basico
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//? Su material del cubo para luces
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
//? Justamos
const cube = new THREE.Mesh( geometry, material );
//? Se añade el cubo
scene.add( cube );


//* Cubo
const geometry_cone = new THREE.ConeGeometry(5,20,32);
const material_cone = new THREE.MeshPhongMaterial( { color: 0xbcdecc } );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10, 5, 0);
scene.add( cone );

//* Poscion de la camara
camera.position.set(10, 5, 40)

//? Animate render --- Bucle constante
function animate() {
    cube.rotation.x += 0.04
    cube.rotation.y += 0.04
    cone.rotation.z += 0.04
    cone.rotation.y += 0.04

    //* Para la animación del frame
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();