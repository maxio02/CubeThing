
import cubeFragmentShader from "./shaders/cubeFragmentShader.frag";
import cubeVertexShader from "./shaders/cubeVertexShader.vert";
import { createProgram, createShader, resizeCanvasToDisplaySize } from "./shaderHelper";
import { Mat4 } from "../node_modules/ts-gl-matrix/dist/src/mat4";
import { Vec3 } from "../node_modules/ts-gl-matrix/dist/src/vec3";
import { Vec4 } from "../node_modules/ts-gl-matrix/dist/src/vec4";
import { Quat } from "../node_modules/ts-gl-matrix/dist/src/quat";
import { rotVelocity } from "./mouseListener";

const vertexBufferData = new Float32Array([
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    -1.0, -1.0, -1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
]);

const colorBufferData = new Float32Array([

    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,

    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,

    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,

    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,



]);

var webglCanvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
var gl = webglCanvas.getContext("webgl2")!;
webglCanvas!.width = webglCanvas.getBoundingClientRect().width;
webglCanvas!.height = webglCanvas.getBoundingClientRect().height;


if (!gl) {
    console.error("Unable to initialize WebGL. Your browser may not support it.");
}

//enalbing blending for proper alpha 
// gl.enable(gl.BLEND);
// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

//proper depth then drawing the cube
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LESS);



//compiling the shaders with a helper function
var vertexShader = createShader(gl, gl.VERTEX_SHADER, cubeVertexShader);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, cubeFragmentShader);

if (!vertexShader || !fragmentShader) {
    throw new Error("Shader creation failed");
}

//creating a WebGL program and attaching the shaders to it with a helper function
var program = createProgram(gl, vertexShader, fragmentShader);

if (!program) {
    throw new Error("Program creation failed");
}


var vertexBuffer = gl.createBuffer();
var colorBuffer = gl.createBuffer();

const mvpUniformLocation = gl.getUniformLocation(program, "u_MVP");

// vert positions
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);
// vert colors
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorBufferData, gl.STATIC_DRAW);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(1);

function createMVPMatrix(scale: Vec3, rot: Quat): Mat4 {
    let MVPMatrix = Mat4.create();
    Mat4.fromQuat(MVPMatrix, rot);
    MVPMatrix.scale(scale);

    return MVPMatrix;

  }

function drawCube(rot: Quat) {

    const mvpMatrix = createMVPMatrix(Vec3.fromValues(0.5, 0.5, 0.5), rot)

    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0); // Clear to transparent black
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(mvpUniformLocation, false, mvpMatrix);
    // Tell it to use program (pair of shaders)
    gl.useProgram(program);

    gl.drawArrays(gl.TRIANGLES, 0, 12 * 3);
    // gl.disableVertexAttribArray(0);
    // gl.disableVertexAttribArray(1);
    // console.log('hello')
    requestAnimationFrame(() => {
        drawCube(rotVelocity);
    });
}

drawCube(rotVelocity);