const container = document.querySelector('#game-container');

// escena
const scene = new THREE.Scene();
//scene.background = new THREE.Color('skyblue');

// Cámara
const camera = new THREE.PerspectiveCamera(
    35, // fov, campo de vision (1 a 179)
    container.clientWidth / container.clientHeight, // aspect, siempre mantener el cuadro
    0.1, //near, que tan cerca esta del objeto
    1000 // far, que tan lejos esta
);
camera.position.set(0, 0, 15);
// camera.zoom = 2;
// camera.updateProjectionMatrix()

// Mesh
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: 'teal'
});
const box_mesh = new THREE.Mesh(geometry, material);
scene.add(box_mesh);

// camera.lookAt(box_mesh.position);

// Render
const renderer = new THREE.WebGLRenderer(
    {
        antialias: true, // le quita el borde
        alpha: true // puedes ver el fondo de la escena si no tiene color
    }
);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const update = () => {
    box_mesh.rotateX(0.01);
    box_mesh.rotateY(0.01);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(() => update());
}
update();
