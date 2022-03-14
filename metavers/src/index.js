//* Import
import Movements from "./movements.js";
import blockchain from "./Web.js";
import abi from "./abi/abi.json" assert { type: "json" };

// * Declaración de la scena de threjs
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

//* Camara y configuración de rederización
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//* Configuración de luces
const ambient_light = new THREE.AmbientLight(0x404040);
const directional_Light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(directional_Light);
scene.add(ambient_light);

//* Espacion plano
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({ color: 0xffffff });
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

// //* Cubo
// const geometry = new THREE.BoxGeometry();
// //? Su material del cubo basico
// // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// //? Su material del cubo para luces
// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// //? Justamos
// const cube = new THREE.Mesh(geometry, material);
// //? Se añade el cubo
// scene.add(cube);

// //* Cubo
// const geometry_cone = new THREE.ConeGeometry(5, 20, 32);
// const material_cone = new THREE.MeshPhongMaterial({ color: 0xbcdecc });
// const cone = new THREE.Mesh(geometry_cone, material_cone);
// cone.position.set(-10, 5, 0);
// scene.add(cone);

//* Poscion de la camara
camera.position.set(10, 5, 40);

//? Animate render --- Bucle constante
function animate() {
  // cube.rotation.x += 0.04;
  // cube.rotation.y += 0.04;
  // cone.rotation.z += 0.04;
  // cone.rotation.y += 0.04;

  //* movimiento
  //* Izquierda
  if (Movements.isPressed(37)) {
    camera.position.x -= 0.5;
  }
  //* Derecha
  if (Movements.isPressed(39)) {
    camera.position.x += 0.5;
  }
  //* Abajo
  if (Movements.isPressed(40)) {
    camera.position.y -= 0.5;
  }
  //* Arriba
  if (Movements.isPressed(38)) {
    camera.position.y += 0.5;
  }

  //* Mira hacia
  camera.lookAt(space.position);
  //* Para la animación del frame
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

const mintNTF = () => {
  // Variables
  let ntf_name = document.getElementById("nameNTF").value;
  let ntf_width = document.getElementById("width").value;
  let ntf_height = document.getElementById("height").value;
  let ntf_depth = document.getElementById("depth").value;
  let ntf_position_x = document.getElementById("positionX").value;
  let ntf_position_y = document.getElementById("positionY").value;
  let ntf_position_z = document.getElementById("positionZ").value;

  if (typeof window.ethereum === "undefined") {
    rej("Necesitas installar MetaMask to use it!");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0xBA9d56AB1799F549D08A33d9954aac122514AD7B"
  );

  web3.eth.getAccounts().then((accounts) => {
    contract.methods
      .mint(
        ntf_name,
        ntf_width,
        ntf_height,
        ntf_depth,
        ntf_position_x,
        ntf_position_y,
        ntf_position_z
      )
      .send({ from: accounts[0] })
      .then((data) => {
        console.log("NTF Available in the metaverse");
      });
  });
};

// New ntf
const buttonNTF = document.getElementById("mint");
buttonNTF.addEventListener("click", mintNTF);

// Web3 connection to the data generated in the blockchain to be
// represent
blockchain.then((result) => {
  // Pagado en contrusciontion pagadas en metavers
  // console.log(result);
  result.buildings.forEach((building, index) => {
    if (index <= parseInt(result.supply)) {
      // reprensetar tokens of ntf tokens as boxes
      const boxGeometry = new THREE.BoxGeometry(
        building.w,
        building.h,
        building.d
      );
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const ntf = new THREE.Mesh(boxGeometry, boxMaterial);
      ntf.position.set(building.x, building.y, building.z);
      scene.add(ntf);
    }
  });
});
