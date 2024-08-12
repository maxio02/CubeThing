import { Quat } from "../node_modules/ts-gl-matrix/dist/src/quat";
import { Vec2 } from "../node_modules/ts-gl-matrix/dist/src/vec2";
import { Vec3 } from "../node_modules/ts-gl-matrix/dist/src/vec3";


let isDragging = false;
export let rotVelocity: Quat = Quat.create();
const webglCanvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;

webglCanvas.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    // rotVelocity.rotateX(-event.movementY / 200);
    // rotVelocity.rotateY();

    const quatX = Quat.setAxisAngle(Quat.create(), Vec3.fromValues(1, 0, 0), -event.movementY / 200);
    const quatY = Quat.setAxisAngle(Quat.create(), Vec3.fromValues(0, 1, 0), -event.movementX / 200);
    
    Quat.multiply(rotVelocity, quatX, rotVelocity);
    Quat.multiply(rotVelocity, quatY, rotVelocity);
});


webglCanvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    
});


webglCanvas.addEventListener('mouseup', (event) => {
    isDragging = false;
    

});