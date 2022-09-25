import { App } from "./app.js";

const container = document.querySelector('#game-container')

const app = new App(container)

window.addEventListener('resize', () => {
	app.onResize();
});
