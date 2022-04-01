const container = document.querySelector('#game-container');

// escena

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// camara
const camera = new THREE.PerspectiveCamera(
    35, // grado de vision - Fov
    container.clientWidth/container.clientHeight, // aspec ratio
    0.1, // que tan cerca se renderizar - near
    1000 // que tan lejos se van a renderizar 1 => 1m, si se pasan ya no se van a renderizar - Far
);
camera.position.set(0, 0, 15);

// puedes darle valores a camara
// camera.zoom = 2;
// camera.updateProjectionMatrix();
/*
Perpective
https://codepen.io/gammafp/full/OJMbXzX
orthografic
https://codepen.io/gammafp/full/NWxbrLg
 */


// Mesh
const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 ); // que es mejor dado que guarda cache
const material = new THREE.MeshBasicMaterial( {
    color: 'teal'
} );
const cube = new THREE.Mesh( geometry, material );
// const cube = new THREE.Mesh( geometry ); // le pasamos a los hijos la materia
scene.add( cube );
// scene.overrideMaterial = material // le pasamos a los hijos la materia

// setTimeout(() => {
//     scene.remove( cube ); //eliminar de la escena
// }, 2000);

// Render
const renderer = new THREE.WebGLRenderer({
    antialias: true, //simular dientes
    // alpha: true, // hace que sea fondo tranparente
    canvas: container, // de esta manera le pasas el canvas
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// container.appendChild(renderer.domElement);

const update = () => {
    cube.rotateX(0.01);
    cube.rotateY(0.01);
    renderer.render(scene, camera)
    renderer.setAnimationLoop(() => update() );
}

update();
