const container = document.querySelector('#game-container');

// escena

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// camara
const camera = new THREE.PerspectiveCamera(
    35, // grado de vision
    container.clientWidth/container.clientHeight, // aspec ratio
    0.1, // que tan cerca se renderizar
    1000 // que tan lejos se van a renderizar 1 => 1m, si se pasan ya no se van a renderizar
);
camera.position.set(0, 0, 15);
;
// Mesh
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 'teal'} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const update = () => {
    cube.rotateX(0.01);
    cube.rotateY(0.01);
    renderer.render(scene, camera)
    renderer.setAnimationLoop(() => update() );
}

update();
