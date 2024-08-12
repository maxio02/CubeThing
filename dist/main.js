/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shaderHelper.ts":
/*!*****************************!*\
  !*** ./src/shaderHelper.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProgram: () => (/* binding */ createProgram),
/* harmony export */   createShader: () => (/* binding */ createShader),
/* harmony export */   resizeCanvasToDisplaySize: () => (/* binding */ resizeCanvasToDisplaySize)
/* harmony export */ });
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader) {
        console.error('Error creating shader.');
        return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
}
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    if (!program) {
        console.error('Error creating program.');
        return null;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
}
function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    // Check if the canvas is not the same size.
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
    return needResize;
}


/***/ }),

/***/ "./src/shaders/cubeFragmentShader.frag":
/*!*********************************************!*\
  !*** ./src/shaders/cubeFragmentShader.frag ***!
  \*********************************************/
/***/ ((module) => {

module.exports = "#version 300 es\r\n\r\nprecision mediump float;\r\n\r\nout vec4 color;\r\n\r\nvoid main(){\r\n    // Output color = color specified in the vertex shader,\r\n    // interpolated between all 3 surrounding vertices\r\n    color = vec4(1.);\r\n}";

/***/ }),

/***/ "./src/shaders/cubeVertexShader.vert":
/*!*******************************************!*\
  !*** ./src/shaders/cubeVertexShader.vert ***!
  \*******************************************/
/***/ ((module) => {

module.exports = "#version 300 es\r\n\r\nprecision mediump float;\r\n\r\nlayout(location = 0) in vec3 vertexPosition_modelspace;\r\n\r\nuniform mat4 MVP;\r\n\r\n\r\nvoid main(){ \r\n  gl_Position =  MVP * vec4(vertexPosition_modelspace,1);\r\n}";

/***/ }),

/***/ "./node_modules/ts-gl-matrix/dist/src/common.js":
/*!******************************************************!*\
  !*** ./node_modules/ts-gl-matrix/dist/src/common.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EPSILON: () => (/* binding */ EPSILON)
/* harmony export */ });
const EPSILON = 0.000001;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/ts-gl-matrix/dist/src/mat3.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-gl-matrix/dist/src/mat3.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mat3: () => (/* binding */ Mat3),
/* harmony export */   mat3: () => (/* binding */ mat3)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/ts-gl-matrix/dist/src/common.js");

const IDENTITY_3X3 = new Float32Array([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
]);
/**
 * A 3x3 Matrix
 */
class Mat3 extends Float32Array {
    /**
     * The number of bytes in a {@link Mat3}.
     */
    static BYTE_LENGTH = 9 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Mat3}.
     */
    constructor(...values) {
        switch (values.length) {
            case 9:
                super(values);
                break;
            case 2:
                super(values[0], values[1], 9);
                break;
            case 1:
                const v = values[0];
                if (typeof v === 'number') {
                    super([
                        v, v, v,
                        v, v, v,
                        v, v, v
                    ]);
                }
                else {
                    super(v, 0, 9);
                }
                break;
            default:
                super(IDENTITY_3X3);
                break;
        }
    }
    //============
    // Attributes
    //============
    /**
     * A string representation of `this`
     * Equivalent to `Mat3.str(this);`
     */
    get str() {
        return Mat3.str(this);
    }
    //===================
    // Instance methods
    //===================
    /**
     * Copy the values from another {@link Mat3} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
        this.set(a);
        return this;
    }
    /**
     * Set `this` to the identity matrix
     * Equivalent to Mat3.identity(this)
     *
     * @returns `this`
     */
    identity() {
        this.set(IDENTITY_3X3);
        return this;
    }
    /**
     * Multiplies this {@link Mat3} against another one
     * Equivalent to `Mat3.multiply(this, this, b);`
     *
     * @param out - The receiving Matrix
     * @param a - The first operand
     * @param b - The second operand
     * @returns `this`
     */
    multiply(b) {
        return Mat3.multiply(this, this, b);
    }
    /**
     * Alias for {@link Mat3.multiply}
     */
    mul(b) { return this; }
    /**
     * Transpose this {@link Mat3}
     * Equivalent to `Mat3.transpose(this, this);`
     *
     * @returns `this`
     */
    transpose() {
        return Mat3.transpose(this, this);
    }
    /**
     * Inverts this {@link Mat3}
     * Equivalent to `Mat4.invert(this, this);`
     *
     * @returns `this`
     */
    invert() {
        return Mat3.invert(this, this);
    }
    /**
     * Translate this {@link Mat3} by the given vector
     * Equivalent to `Mat3.translate(this, this, v);`
     *
     * @param v - The {@link Vec2} to translate by
     * @returns `this`
     */
    translate(v) {
        return Mat3.translate(this, this, v);
    }
    /**
     * Rotates this {@link Mat3} by the given angle around the given axis
     * Equivalent to `Mat3.rotate(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    rotate(rad) {
        return Mat3.rotate(this, this, rad);
    }
    /**
     * Scales this {@link Mat3} by the dimensions in the given vec3 not using vectorization
     * Equivalent to `Mat3.scale(this, this, v);`
     *
     * @param v - The {@link Vec2} to scale the matrix by
     * @returns `this`
     */
    scale(v) {
        return Mat3.scale(this, this, v);
    }
    //================
    // Static methods
    //================
    /**
     * Creates a new, identity {@link Mat3}
     * @category Static
     *
     * @returns A new {@link Mat3}
     */
    static create() {
        return new Mat3();
    }
    /**
     * Creates a new {@link Mat3} initialized with values from an existing matrix
     * @category Static
     *
     * @param a - Matrix to clone
     * @returns A new {@link Mat3}
     */
    static clone(a) {
        return new Mat3(a);
    }
    /**
     * Copy the values from one {@link Mat3} to another
     * @category Static
     *
     * @param out - The receiving Matrix
     * @param a - Matrix to copy
     * @returns `out`
     */
    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
    }
    /**
     * Create a new {@link Mat3} with the given values
     * @category Static
     *
     * @param values - Matrix components
     * @returns A new {@link Mat3}
     */
    static fromValues(...values) {
        return new Mat3(...values);
    }
    /**
     * Set the components of a {@link Mat3} to the given values
     * @category Static
     *
     * @param out - The receiving matrix
     * @param values - Matrix components
     * @returns `out`
     */
    static set(out, ...values) {
        out[0] = values[0];
        out[1] = values[1];
        out[2] = values[2];
        out[3] = values[3];
        out[4] = values[4];
        out[5] = values[5];
        out[6] = values[6];
        out[7] = values[7];
        out[8] = values[8];
        return out;
    }
    /**
     * Set a {@link Mat3} to the identity matrix
     * @category Static
     *
     * @param out - The receiving matrix
     * @returns `out`
     */
    static identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }
    /**
     * Transpose the values of a {@link Mat3}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static transpose(out, a) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (out === a) {
            const a01 = a[1], a02 = a[2], a12 = a[5];
            out[1] = a[3];
            out[2] = a[6];
            out[3] = a01;
            out[5] = a[7];
            out[6] = a02;
            out[7] = a12;
        }
        else {
            out[0] = a[0];
            out[1] = a[3];
            out[2] = a[6];
            out[3] = a[1];
            out[4] = a[4];
            out[5] = a[7];
            out[6] = a[2];
            out[7] = a[5];
            out[8] = a[8];
        }
        return out;
    }
    /**
     * Inverts a {@link Mat3}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static invert(out, a) {
        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;
        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
    }
    /**
     * Calculates the adjugate of a {@link Mat3}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static adjoint(out, a) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        out[0] = a11 * a22 - a12 * a21;
        out[1] = a02 * a21 - a01 * a22;
        out[2] = a01 * a12 - a02 * a11;
        out[3] = a12 * a20 - a10 * a22;
        out[4] = a00 * a22 - a02 * a20;
        out[5] = a02 * a10 - a00 * a12;
        out[6] = a10 * a21 - a11 * a20;
        out[7] = a01 * a20 - a00 * a21;
        out[8] = a00 * a11 - a01 * a10;
        return out;
    }
    /**
     * Calculates the determinant of a {@link Mat3}
     * @category Static
     *
     * @param a - the source matrix
     * @returns determinant of a
     */
    static determinant(a) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        return (a00 * (a22 * a11 - a12 * a21) +
            a01 * (-a22 * a10 + a12 * a20) +
            a02 * (a21 * a10 - a11 * a20));
    }
    /**
     * Adds two {@link Mat3}'s
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        out[4] = a[4] + b[4];
        out[5] = a[5] + b[5];
        out[6] = a[6] + b[6];
        out[7] = a[7] + b[7];
        out[8] = a[8] + b[8];
        return out;
    }
    /**
     * Subtracts matrix b from matrix a
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        out[4] = a[4] - b[4];
        out[5] = a[5] - b[5];
        out[6] = a[6] - b[6];
        out[7] = a[7] - b[7];
        out[8] = a[8] - b[8];
        return out;
    }
    /**
     * Alias for {@link Mat3.subtract}
     * @category Static
     */
    static sub(out, a, b) { return out; }
    /**
     * Multiplies two {@link Mat3}s
     * @category Static
     *
     * @param out - The receiving Matrix
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        let b0 = b[0];
        let b1 = b[1];
        let b2 = b[2];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22;
        b0 = b[3];
        b1 = b[4];
        b2 = b[5];
        out[3] = b0 * a00 + b1 * a10 + b2 * a20;
        out[4] = b0 * a01 + b1 * a11 + b2 * a21;
        out[5] = b0 * a02 + b1 * a12 + b2 * a22;
        b0 = b[6];
        b1 = b[7];
        b2 = b[8];
        out[6] = b0 * a00 + b1 * a10 + b2 * a20;
        out[7] = b0 * a01 + b1 * a11 + b2 * a21;
        out[8] = b0 * a02 + b1 * a12 + b2 * a22;
        return out;
    }
    /**
     * Alias for {@link Mat3.multiply}
     * @category Static
     */
    static mul(out, a, b) { return out; }
    /**
     * Translate a {@link Mat3} by the given vector
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to translate
     * @param v - vector to translate by
     * @returns `out`
     */
    static translate(out, a, v) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        const x = v[0];
        const y = v[1];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a10;
        out[4] = a11;
        out[5] = a12;
        out[6] = x * a00 + y * a10 + a20;
        out[7] = x * a01 + y * a11 + a21;
        out[8] = x * a02 + y * a12 + a22;
        return out;
    }
    /**
     * Rotates a {@link Mat3} by the given angle
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotate(out, a, rad) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] = c * a00 + s * a10;
        out[1] = c * a01 + s * a11;
        out[2] = c * a02 + s * a12;
        out[3] = c * a10 - s * a00;
        out[4] = c * a11 - s * a01;
        out[5] = c * a12 - s * a02;
        out[6] = a20;
        out[7] = a21;
        out[8] = a22;
        return out;
    }
    /**
     * Scales the {@link Mat3} by the dimensions in the given {@link Vec2}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to scale
     * @param v - the {@link Vec2} to scale the matrix by
     * @returns `out`
     **/
    static scale(out, a, v) {
        const x = v[0];
        const y = v[1];
        out[0] = x * a[0];
        out[1] = x * a[1];
        out[2] = x * a[2];
        out[3] = y * a[3];
        out[4] = y * a[4];
        out[5] = y * a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
    }
    /**
     * Creates a {@link Mat3} from a vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat3.identity(dest);
     *     mat3.translate(dest, dest, vec);
     * @category Static
     *
     * @param out - {@link Mat3} receiving operation result
     * @param v - Translation vector
     * @returns `out`
     */
    static fromTranslation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = v[0];
        out[7] = v[1];
        out[8] = 1;
        return out;
    }
    /**
     * Creates a {@link Mat3} from a given angle around a given axis
     * This is equivalent to (but much faster than):
     *
     *     mat3.identity(dest);
     *     mat3.rotate(dest, dest, rad);
     * @category Static
     *
     * @param out - {@link Mat3} receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out[0] = c;
        out[1] = s;
        out[2] = 0;
        out[3] = -s;
        out[4] = c;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }
    /**
     * Creates a {@link Mat3} from a vector scaling
     * This is equivalent to (but much faster than):
     *
     *     mat3.identity(dest);
     *     mat3.scale(dest, dest, vec);
     * @category Static
     *
     * @param out - {@link Mat3} receiving operation result
     * @param v - Scaling vector
     * @returns `out`
     */
    static fromScaling(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = v[1];
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }
    /**
     * Copies the upper-left 3x3 values of a {@link Mat2d} into the given
     * {@link Mat3}.
     * @category Static
     *
     * @param out - the receiving 3x3 matrix
     * @param a - the source 2x3 matrix
     * @returns `out`
     */
    static fromMat2d(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = 0;
        out[3] = a[2];
        out[4] = a[3];
        out[5] = 0;
        out[6] = a[4];
        out[7] = a[5];
        out[8] = 1;
        return out;
    }
    /**
     * Calculates a {@link Mat3} from the given quaternion
     *
     * @param out - {@link Mat3} receiving operation result
     * @param q - {@link Quat} to create matrix from
     * @returns `out`
     */
    static fromQuat(out, q) {
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        out[0] = 1 - yy - zz;
        out[3] = yx - wz;
        out[6] = zx + wy;
        out[1] = yx + wz;
        out[4] = 1 - xx - zz;
        out[7] = zy - wx;
        out[2] = zx - wy;
        out[5] = zy + wx;
        out[8] = 1 - xx - yy;
        return out;
    }
    /**
     * Copies the upper-left 3x3 values of a {@link Mat4} into the given
     * {@link Mat3}.
     * @category Static
     *
     * @param out - the receiving 3x3 matrix
     * @param a - the source 4x4 matrix
     * @returns `out`
     */
    static fromMat4(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[4];
        out[4] = a[5];
        out[5] = a[6];
        out[6] = a[8];
        out[7] = a[9];
        out[8] = a[10];
        return out;
    }
    /**
     * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
     * @category Static
     *
     * @param {mat3} out mat3 receiving operation result
     * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
     * @returns `out`
     */
    static normalFromMat4(out, a) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4];
        const a11 = a[5];
        const a12 = a[6];
        const a13 = a[7];
        const a20 = a[8];
        const a21 = a[9];
        const a22 = a[10];
        const a23 = a[11];
        const a30 = a[12];
        const a31 = a[13];
        const a32 = a[14];
        const a33 = a[15];
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        return out;
    }
    /**
     * Generates a 2D projection matrix with the given bounds
     * @category Static
     *
     * @param out mat3 frustum matrix will be written into
     * @param width Width of your gl context
     * @param height Height of gl context
     * @returns `out`
     */
    static projection(out, width, height) {
        out[0] = 2 / width;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = -2 / height;
        out[5] = 0;
        out[6] = -1;
        out[7] = 1;
        out[8] = 1;
        return out;
    }
    /**
     * Returns Frobenius norm of a {@link Mat3}
     * @category Static
     *
     * @param a - the matrix to calculate Frobenius norm of
     * @returns Frobenius norm
     */
    static frob(a) {
        return Math.sqrt(a[0] * a[0] +
            a[1] * a[1] +
            a[2] * a[2] +
            a[3] * a[3] +
            a[4] * a[4] +
            a[5] * a[5] +
            a[6] * a[6] +
            a[7] * a[7] +
            a[8] * a[8]);
    }
    /**
     * Multiply each element of a {@link Mat3} by a scalar.
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to scale
     * @param b - amount to scale the matrix's elements by
     * @returns `out`
     */
    static multiplyScalar(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        out[4] = a[4] * b;
        out[5] = a[5] * b;
        out[6] = a[6] * b;
        out[7] = a[7] * b;
        out[8] = a[8] * b;
        return out;
    }
    /**
     * Adds two {@link Mat3}'s after multiplying each element of the second operand by a scalar value.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b's elements by before adding
     * @returns `out`
     */
    static multiplyScalarAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        out[3] = a[3] + b[3] * scale;
        out[4] = a[4] + b[4] * scale;
        out[5] = a[5] + b[5] * scale;
        out[6] = a[6] + b[6] * scale;
        out[7] = a[7] + b[7] * scale;
        out[8] = a[8] + b[8] * scale;
        return out;
    }
    /**
     * Returns whether or not two {@link Mat3}s have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @returns True if the matrices are equal, false otherwise.
     */
    static exactEquals(a, b) {
        return (a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[3] === b[3] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[7] === b[7] &&
            a[8] === b[8]);
    }
    /**
     * Returns whether or not two {@link Mat3}s have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @returns True if the matrices are equal, false otherwise.
     */
    static equals(a, b) {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const a3 = a[3];
        const a4 = a[4];
        const a5 = a[5];
        const a6 = a[6];
        const a7 = a[7];
        const a8 = a[8];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        const b3 = b[3];
        const b4 = b[4];
        const b5 = b[5];
        const b6 = b[6];
        const b7 = b[7];
        const b8 = b[8];
        return (Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)));
    }
    /**
     * Returns a string representation of a {@link Mat3}
     * @category Static
     *
     * @param a - matrix to represent as a string
     * @returns string representation of the matrix
     */
    static str(a) {
        return `Mat3(${a.join(', ')})`;
    }
}
// Instance method alias assignments
Mat3.prototype.mul = Mat3.prototype.multiply;
// Static method alias assignments
Mat3.mul = Mat3.multiply;
Mat3.sub = Mat3.subtract;
/**
 * {@link Mat3} alias for backwards compatibility
 */
const mat3 = Mat3;
//# sourceMappingURL=mat3.js.map

/***/ }),

/***/ "./node_modules/ts-gl-matrix/dist/src/mat4.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-gl-matrix/dist/src/mat4.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mat4: () => (/* binding */ Mat4),
/* harmony export */   mat4: () => (/* binding */ mat4)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/ts-gl-matrix/dist/src/common.js");
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vec3.js */ "./node_modules/ts-gl-matrix/dist/src/vec3.js");


const IDENTITY_4X4 = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
]);
/**
 * A 4x4 Matrix
 */
class Mat4 extends Float32Array {
    /**
     * The number of bytes in a {@link Mat4}.
     */
    static BYTE_LENGTH = 16 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Mat4}.
     */
    constructor(...values) {
        switch (values.length) {
            case 16:
                super(values);
                break;
            case 2:
                super(values[0], values[1], 16);
                break;
            case 1:
                const v = values[0];
                if (typeof v === 'number') {
                    super([
                        v, v, v, v,
                        v, v, v, v,
                        v, v, v, v,
                        v, v, v, v
                    ]);
                }
                else {
                    super(v, 0, 16);
                }
                break;
            default:
                super(IDENTITY_4X4);
                break;
        }
    }
    //============
    // Attributes
    //============
    /**
     * A string representation of `this`
     * Equivalent to `Mat4.str(this);`
     */
    get str() {
        return Mat4.str(this);
    }
    //===================
    // Instance methods
    //===================
    /**
     * Copy the values from another {@link Mat4} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
        this.set(a);
        return this;
    }
    /**
     * Set `this` to the identity matrix
     * Equivalent to Mat4.identity(this)
     *
     * @returns `this`
     */
    identity() {
        this.set(IDENTITY_4X4);
        return this;
    }
    /**
     * Multiplies this {@link Mat4} against another one
     * Equivalent to `Mat4.multiply(this, this, b);`
     *
     * @param out - The receiving Matrix
     * @param a - The first operand
     * @param b - The second operand
     * @returns `this`
     */
    multiply(b) {
        return Mat4.multiply(this, this, b);
    }
    /**
     * Alias for {@link Mat4.multiply}
     */
    mul(b) { return this; }
    /**
     * Transpose this {@link Mat4}
     * Equivalent to `Mat4.transpose(this, this);`
     *
     * @returns `this`
     */
    transpose() {
        return Mat4.transpose(this, this);
    }
    /**
     * Inverts this {@link Mat4}
     * Equivalent to `Mat4.invert(this, this);`
     *
     * @returns `this`
     */
    invert() {
        return Mat4.invert(this, this);
    }
    /**
     * Translate this {@link Mat4} by the given vector
     * Equivalent to `Mat4.translate(this, this, v);`
     *
     * @param v - The {@link Vec3} to translate by
     * @returns `this`
     */
    translate(v) {
        return Mat4.translate(this, this, v);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the given axis
     * Equivalent to `Mat4.rotate(this, this, rad, axis);`
     *
     * @param rad - the angle to rotate the matrix by
     * @param axis - the axis to rotate around
     * @returns `out`
     */
    rotate(rad, axis) {
        return Mat4.rotate(this, this, rad, axis);
    }
    /**
     * Scales this {@link Mat4} by the dimensions in the given vec3 not using vectorization
     * Equivalent to `Mat4.scale(this, this, v);`
     *
     * @param v - The {@link Vec3} to scale the matrix by
     * @returns `this`
     */
    scale(v) {
        return Mat4.scale(this, this, v);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the X axis
     * Equivalent to `Mat4.rotateX(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `this`
     */
    rotateX(rad) {
        return Mat4.rotateX(this, this, rad);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the Y axis
     * Equivalent to `Mat4.rotateY(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `this`
     */
    rotateY(rad) {
        return Mat4.rotateY(this, this, rad);
    }
    /**
     * Rotates this {@link Mat4} by the given angle around the Z axis
     * Equivalent to `Mat4.rotateZ(this, this, rad);`
     *
     * @param rad - the angle to rotate the matrix by
     * @returns `this`
     */
    rotateZ(rad) {
        return Mat4.rotateZ(this, this, rad);
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * Equivalent to `Mat4.perspectiveNO(this, fovy, aspect, near, far);`
     *
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `this`
     */
    perspectiveNO(fovy, aspect, near, far) {
        return Mat4.perspectiveNO(this, fovy, aspect, near, far);
    }
    /**
     * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * Equivalent to `Mat4.perspectiveZO(this, fovy, aspect, near, far);`
     *
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `this`
     */
    perspectiveZO(fovy, aspect, near, far) {
        return Mat4.perspectiveZO(this, fovy, aspect, near, far);
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Equivalent to `Mat4.orthoNO(this, left, right, bottom, top, near, far);`
     *
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `this`
     */
    orthoNO(left, right, bottom, top, near, far) {
        return Mat4.orthoNO(this, left, right, bottom, top, near, far);
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Equivalent to `Mat4.orthoZO(this, left, right, bottom, top, near, far);`
     *
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `this`
     */
    orthoZO(left, right, bottom, top, near, far) {
        return Mat4.orthoZO(this, left, right, bottom, top, near, far);
    }
    //================
    // Static methods
    //================
    /**
     * Creates a new, identity {@link Mat4}
     * @category Static
     *
     * @returns A new {@link Mat4}
     */
    static create() {
        return new Mat4();
    }
    /**
     * Creates a new {@link Mat4} initialized with values from an existing matrix
     * @category Static
     *
     * @param a - Matrix to clone
     * @returns A new {@link Mat4}
     */
    static clone(a) {
        return new Mat4(a);
    }
    /**
     * Copy the values from one {@link Mat4} to another
     * @category Static
     *
     * @param out - The receiving Matrix
     * @param a - Matrix to copy
     * @returns `out`
     */
    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
    }
    /**
     * Create a new mat4 with the given values
     * @category Static
     *
     * @param values - Matrix components
     * @returns A new {@link Mat4}
     */
    static fromValues(...values) {
        return new Mat4(...values);
    }
    /**
     * Set the components of a mat4 to the given values
     * @category Static
     *
     * @param out - The receiving matrix
     * @param values - Matrix components
     * @returns `out`
     */
    static set(out, ...values) {
        out[0] = values[0];
        out[1] = values[1];
        out[2] = values[2];
        out[3] = values[3];
        out[4] = values[4];
        out[5] = values[5];
        out[6] = values[6];
        out[7] = values[7];
        out[8] = values[8];
        out[9] = values[9];
        out[10] = values[10];
        out[11] = values[11];
        out[12] = values[12];
        out[13] = values[13];
        out[14] = values[14];
        out[15] = values[15];
        return out;
    }
    /**
     * Set a {@link Mat4} to the identity matrix
     * @category Static
     *
     * @param out - The receiving Matrix
     * @returns `out`
     */
    static identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Transpose the values of a {@link Mat4}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static transpose(out, a) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (out === a) {
            const a01 = a[1], a02 = a[2], a03 = a[3];
            const a12 = a[6], a13 = a[7];
            const a23 = a[11];
            out[1] = a[4];
            out[2] = a[8];
            out[3] = a[12];
            out[4] = a01;
            out[6] = a[9];
            out[7] = a[13];
            out[8] = a02;
            out[9] = a12;
            out[11] = a[14];
            out[12] = a03;
            out[13] = a13;
            out[14] = a23;
        }
        else {
            out[0] = a[0];
            out[1] = a[4];
            out[2] = a[8];
            out[3] = a[12];
            out[4] = a[1];
            out[5] = a[5];
            out[6] = a[9];
            out[7] = a[13];
            out[8] = a[2];
            out[9] = a[6];
            out[10] = a[10];
            out[11] = a[14];
            out[12] = a[3];
            out[13] = a[7];
            out[14] = a[11];
            out[15] = a[15];
        }
        return out;
    }
    /**
     * Inverts a {@link Mat4}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static invert(out, a) {
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
    }
    /**
     * Calculates the adjugate of a {@link Mat4}
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the source matrix
     * @returns `out`
     */
    static adjoint(out, a) {
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        out[0] = a11 * b11 - a12 * b10 + a13 * b09;
        out[1] = a02 * b10 - a01 * b11 - a03 * b09;
        out[2] = a31 * b05 - a32 * b04 + a33 * b03;
        out[3] = a22 * b04 - a21 * b05 - a23 * b03;
        out[4] = a12 * b08 - a10 * b11 - a13 * b07;
        out[5] = a00 * b11 - a02 * b08 + a03 * b07;
        out[6] = a32 * b02 - a30 * b05 - a33 * b01;
        out[7] = a20 * b05 - a22 * b02 + a23 * b01;
        out[8] = a10 * b10 - a11 * b08 + a13 * b06;
        out[9] = a01 * b08 - a00 * b10 - a03 * b06;
        out[10] = a30 * b04 - a31 * b02 + a33 * b00;
        out[11] = a21 * b02 - a20 * b04 - a23 * b00;
        out[12] = a11 * b07 - a10 * b09 - a12 * b06;
        out[13] = a00 * b09 - a01 * b07 + a02 * b06;
        out[14] = a31 * b01 - a30 * b03 - a32 * b00;
        out[15] = a20 * b03 - a21 * b01 + a22 * b00;
        return out;
    }
    /**
     * Calculates the determinant of a {@link Mat4}
     * @category Static
     *
     * @param a - the source matrix
     * @returns determinant of a
     */
    static determinant(a) {
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b0 = a00 * a11 - a01 * a10;
        const b1 = a00 * a12 - a02 * a10;
        const b2 = a01 * a12 - a02 * a11;
        const b3 = a20 * a31 - a21 * a30;
        const b4 = a20 * a32 - a22 * a30;
        const b5 = a21 * a32 - a22 * a31;
        const b6 = a00 * b5 - a01 * b4 + a02 * b3;
        const b7 = a10 * b5 - a11 * b4 + a12 * b3;
        const b8 = a20 * b2 - a21 * b1 + a22 * b0;
        const b9 = a30 * b2 - a31 * b1 + a32 * b0;
        // Calculate the determinant
        return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
    }
    /**
     * Multiplies two {@link Mat4}s
     * @category Static
     *
     * @param out - The receiving Matrix
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4];
        const a11 = a[5];
        const a12 = a[6];
        const a13 = a[7];
        const a20 = a[8];
        const a21 = a[9];
        const a22 = a[10];
        const a23 = a[11];
        const a30 = a[12];
        const a31 = a[13];
        const a32 = a[14];
        const a33 = a[15];
        // Cache only the current line of the second matrix
        let b0 = b[0];
        let b1 = b[1];
        let b2 = b[2];
        let b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }
    /**
     * Alias for {@link Mat4.multiply}
     * @category Static
     */
    static mul(out, a, b) { return out; }
    /**
     * Translate a {@link Mat4} by the given vector
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to translate
     * @param v - vector to translate by
     * @returns `out`
     */
    static translate(out, a, v) {
        const x = v[0];
        const y = v[1];
        const z = v[2];
        if (a === out) {
            out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
            out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
            out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
            out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        }
        else {
            const a00 = a[0];
            const a01 = a[1];
            const a02 = a[2];
            const a03 = a[3];
            const a10 = a[4];
            const a11 = a[5];
            const a12 = a[6];
            const a13 = a[7];
            const a20 = a[8];
            const a21 = a[9];
            const a22 = a[10];
            const a23 = a[11];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a03;
            out[4] = a10;
            out[5] = a11;
            out[6] = a12;
            out[7] = a13;
            out[8] = a20;
            out[9] = a21;
            out[10] = a22;
            out[11] = a23;
            out[12] = a00 * x + a10 * y + a20 * z + a[12];
            out[13] = a01 * x + a11 * y + a21 * z + a[13];
            out[14] = a02 * x + a12 * y + a22 * z + a[14];
            out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }
        return out;
    }
    /**
     * Scales the {@link Mat4} by the dimensions in the given {@link Vec3} not using vectorization
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to scale
     * @param v - the {@link Vec3} to scale the matrix by
     * @returns `out`
     **/
    static scale(out, a, v) {
        const x = v[0];
        const y = v[1];
        const z = v[2];
        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
    }
    /**
     * Rotates a {@link Mat4} by the given angle around the given axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @param axis - the axis to rotate around
     * @returns `out`
     */
    static rotate(out, a, rad, axis) {
        let x = axis[0];
        let y = axis[1];
        let z = axis[2];
        let len = Math.sqrt(x * x + y * y + z * z);
        if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4];
        const a11 = a[5];
        const a12 = a[6];
        const a13 = a[7];
        const a20 = a[8];
        const a21 = a[9];
        const a22 = a[10];
        const a23 = a[11];
        // Construct the elements of the rotation matrix
        const b00 = x * x * t + c;
        const b01 = y * x * t + z * s;
        const b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s;
        const b11 = y * y * t + c;
        const b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s;
        const b21 = y * z * t - x * s;
        const b22 = z * z * t + c;
        // Perform rotation-specific matrix multiplication
        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out[11] = a03 * b20 + a13 * b21 + a23 * b22;
        if (a !== out) {
            // If the source and destination differ, copy the unchanged last row
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        return out;
    }
    /**
     * Rotates a matrix by the given angle around the X axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotateX(out, a, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a10 = a[4];
        let a11 = a[5];
        let a12 = a[6];
        let a13 = a[7];
        let a20 = a[8];
        let a21 = a[9];
        let a22 = a[10];
        let a23 = a[11];
        if (a !== out) {
            // If the source and destination differ, copy the unchanged rows
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        // Perform axis-specific matrix multiplication
        out[4] = a10 * c + a20 * s;
        out[5] = a11 * c + a21 * s;
        out[6] = a12 * c + a22 * s;
        out[7] = a13 * c + a23 * s;
        out[8] = a20 * c - a10 * s;
        out[9] = a21 * c - a11 * s;
        out[10] = a22 * c - a12 * s;
        out[11] = a23 * c - a13 * s;
        return out;
    }
    /**
     * Rotates a matrix by the given angle around the Y axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotateY(out, a, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a00 = a[0];
        let a01 = a[1];
        let a02 = a[2];
        let a03 = a[3];
        let a20 = a[8];
        let a21 = a[9];
        let a22 = a[10];
        let a23 = a[11];
        if (a !== out) {
            // If the source and destination differ, copy the unchanged rows
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        // Perform axis-specific matrix multiplication
        out[0] = a00 * c - a20 * s;
        out[1] = a01 * c - a21 * s;
        out[2] = a02 * c - a22 * s;
        out[3] = a03 * c - a23 * s;
        out[8] = a00 * s + a20 * c;
        out[9] = a01 * s + a21 * c;
        out[10] = a02 * s + a22 * c;
        out[11] = a03 * s + a23 * c;
        return out;
    }
    /**
     * Rotates a matrix by the given angle around the Z axis
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to rotate
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static rotateZ(out, a, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        let a00 = a[0];
        let a01 = a[1];
        let a02 = a[2];
        let a03 = a[3];
        let a10 = a[4];
        let a11 = a[5];
        let a12 = a[6];
        let a13 = a[7];
        if (a !== out) {
            // If the source and destination differ, copy the unchanged last row
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        // Perform axis-specific matrix multiplication
        out[0] = a00 * c + a10 * s;
        out[1] = a01 * c + a11 * s;
        out[2] = a02 * c + a12 * s;
        out[3] = a03 * c + a13 * s;
        out[4] = a10 * c - a00 * s;
        out[5] = a11 * c - a01 * s;
        out[6] = a12 * c - a02 * s;
        out[7] = a13 * c - a03 * s;
        return out;
    }
    /**
     * Creates a {@link Mat4} from a vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, dest, vec);
     * @category Static
     *
     * @param out - {@link Mat4} receiving operation result
     * @param v - Translation vector
     * @returns `out`
     */
    static fromTranslation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    }
    /**
     * Creates a {@link Mat4} from a vector scaling
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.scale(dest, dest, vec);
     * @category Static
     *
     * @param out - {@link Mat4} receiving operation result
     * @param v - Scaling vector
     * @returns `out`
     */
    static fromScaling(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = v[1];
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = v[2];
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Creates a {@link Mat4} from a given angle around a given axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotate(dest, dest, rad, axis);
     * @category Static
     *
     * @param out - {@link Mat4} receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @param axis - the axis to rotate around
     * @returns `out`
     */
    static fromRotation(out, rad, axis) {
        let x = axis[0];
        let y = axis[1];
        let z = axis[2];
        let len = Math.sqrt(x * x + y * y + z * z);
        if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;
        // Perform rotation-specific matrix multiplication
        out[0] = x * x * t + c;
        out[1] = y * x * t + z * s;
        out[2] = z * x * t - y * s;
        out[3] = 0;
        out[4] = x * y * t - z * s;
        out[5] = y * y * t + c;
        out[6] = z * y * t + x * s;
        out[7] = 0;
        out[8] = x * z * t + y * s;
        out[9] = y * z * t - x * s;
        out[10] = z * z * t + c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Creates a matrix from the given angle around the X axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateX(dest, dest, rad);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromXRotation(out, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = c;
        out[6] = s;
        out[7] = 0;
        out[8] = 0;
        out[9] = -s;
        out[10] = c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Creates a matrix from the given angle around the Y axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateY(dest, dest, rad);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromYRotation(out, rad) {
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out[0] = c;
        out[1] = 0;
        out[2] = -s;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = s;
        out[9] = 0;
        out[10] = c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Creates a matrix from the given angle around the Z axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateZ(dest, dest, rad);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param rad - the angle to rotate the matrix by
     * @returns `out`
     */
    static fromZRotation(out, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        // Perform axis-specific matrix multiplication
        out[0] = c;
        out[1] = s;
        out[2] = 0;
        out[3] = 0;
        out[4] = -s;
        out[5] = c;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Creates a matrix from a quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Rotation quaternion
     * @param v - Translation vector
     * @returns `out`
     */
    static fromRotationTranslation(out, q, v) {
        // Quaternion math
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        out[0] = 1 - (yy + zz);
        out[1] = xy + wz;
        out[2] = xz - wy;
        out[3] = 0;
        out[4] = xy - wz;
        out[5] = 1 - (xx + zz);
        out[6] = yz + wx;
        out[7] = 0;
        out[8] = xz + wy;
        out[9] = yz - wx;
        out[10] = 1 - (xx + yy);
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    }
    /**
     * Sets a {@link Mat4} from a {@link Quat2}.
     * @category Static
     *
     * @param out - Matrix
     * @param a - Dual Quaternion
     * @returns `out`
     */
    static fromQuat2(out, a) {
        let translation = new _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
        const bx = -a[0];
        const by = -a[1];
        const bz = -a[2];
        const bw = a[3];
        const ax = a[4];
        const ay = a[5];
        const az = a[6];
        const aw = a[7];
        let magnitude = bx * bx + by * by + bz * bz + bw * bw;
        //Only scale if it makes sense
        if (magnitude > 0) {
            translation[0] = ((ax * bw + aw * bx + ay * bz - az * by) * 2) / magnitude;
            translation[1] = ((ay * bw + aw * by + az * bx - ax * bz) * 2) / magnitude;
            translation[2] = ((az * bw + aw * bz + ax * by - ay * bx) * 2) / magnitude;
        }
        else {
            translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
            translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
            translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
        }
        Mat4.fromRotationTranslation(out, a, translation);
        return out;
    }
    /**
     * Returns the translation vector component of a transformation
     * matrix. If a matrix is built with fromRotationTranslation,
     * the returned vector will be the same as the translation vector
     * originally supplied.
     * @category Static
     *
     * @param  {vec3} out Vector to receive translation component
     * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {vec3} out
     */
    static getTranslation(out, mat) {
        out[0] = mat[12];
        out[1] = mat[13];
        out[2] = mat[14];
        return out;
    }
    /**
     * Returns the scaling factor component of a transformation
     * matrix. If a matrix is built with fromRotationTranslationScale
     * with a normalized Quaternion paramter, the returned vector will be
     * the same as the scaling vector
     * originally supplied.
     * @category Static
     *
     * @param  {vec3} out Vector to receive scaling factor component
     * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {vec3} out
     */
    static getScaling(out, mat) {
        const m11 = mat[0];
        const m12 = mat[1];
        const m13 = mat[2];
        const m21 = mat[4];
        const m22 = mat[5];
        const m23 = mat[6];
        const m31 = mat[8];
        const m32 = mat[9];
        const m33 = mat[10];
        out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
        out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
        out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
        return out;
    }
    /**
     * Returns a quaternion representing the rotational component
     * of a transformation matrix. If a matrix is built with
     * fromRotationTranslation, the returned quaternion will be the
     * same as the quaternion originally supplied.
     * @category Static
     *
     * @param out - Quaternion to receive the rotation component
     * @param mat - Matrix to be decomposed (input)
     * @return `out`
     */
    static getRotation(out, mat) {
        Mat4.getScaling(tmpVec3, mat);
        const is1 = 1 / tmpVec3[0];
        const is2 = 1 / tmpVec3[1];
        const is3 = 1 / tmpVec3[2];
        const sm11 = mat[0] * is1;
        const sm12 = mat[1] * is2;
        const sm13 = mat[2] * is3;
        const sm21 = mat[4] * is1;
        const sm22 = mat[5] * is2;
        const sm23 = mat[6] * is3;
        const sm31 = mat[8] * is1;
        const sm32 = mat[9] * is2;
        const sm33 = mat[10] * is3;
        const trace = sm11 + sm22 + sm33;
        let S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out[3] = 0.25 * S;
            out[0] = (sm23 - sm32) / S;
            out[1] = (sm31 - sm13) / S;
            out[2] = (sm12 - sm21) / S;
        }
        else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            out[3] = (sm23 - sm32) / S;
            out[0] = 0.25 * S;
            out[1] = (sm12 + sm21) / S;
            out[2] = (sm31 + sm13) / S;
        }
        else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            out[3] = (sm31 - sm13) / S;
            out[0] = (sm12 + sm21) / S;
            out[1] = 0.25 * S;
            out[2] = (sm23 + sm32) / S;
        }
        else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            out[3] = (sm12 - sm21) / S;
            out[0] = (sm31 + sm13) / S;
            out[1] = (sm23 + sm32) / S;
            out[2] = 0.25 * S;
        }
        return out;
    }
    /**
     * Decomposes a transformation matrix into its rotation, translation
     * and scale components. Returns only the rotation component
     * @category Static
     *
     * @param out_r - Quaternion to receive the rotation component
     * @param out_t - Vector to receive the translation vector
     * @param out_s - Vector to receive the scaling factor
     * @param mat - Matrix to be decomposed (input)
     * @returns `out_r`
     */
    static decompose(out_r, out_t, out_s, mat) {
        out_t[0] = mat[12];
        out_t[1] = mat[13];
        out_t[2] = mat[14];
        const m11 = mat[0];
        const m12 = mat[1];
        const m13 = mat[2];
        const m21 = mat[4];
        const m22 = mat[5];
        const m23 = mat[6];
        const m31 = mat[8];
        const m32 = mat[9];
        const m33 = mat[10];
        out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
        out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
        out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
        const is1 = 1 / out_s[0];
        const is2 = 1 / out_s[1];
        const is3 = 1 / out_s[2];
        const sm11 = m11 * is1;
        const sm12 = m12 * is2;
        const sm13 = m13 * is3;
        const sm21 = m21 * is1;
        const sm22 = m22 * is2;
        const sm23 = m23 * is3;
        const sm31 = m31 * is1;
        const sm32 = m32 * is2;
        const sm33 = m33 * is3;
        const trace = sm11 + sm22 + sm33;
        let S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out_r[3] = 0.25 * S;
            out_r[0] = (sm23 - sm32) / S;
            out_r[1] = (sm31 - sm13) / S;
            out_r[2] = (sm12 - sm21) / S;
        }
        else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            out_r[3] = (sm23 - sm32) / S;
            out_r[0] = 0.25 * S;
            out_r[1] = (sm12 + sm21) / S;
            out_r[2] = (sm31 + sm13) / S;
        }
        else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            out_r[3] = (sm31 - sm13) / S;
            out_r[0] = (sm12 + sm21) / S;
            out_r[1] = 0.25 * S;
            out_r[2] = (sm23 + sm32) / S;
        }
        else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            out_r[3] = (sm12 - sm21) / S;
            out_r[0] = (sm31 + sm13) / S;
            out_r[1] = (sm23 + sm32) / S;
            out_r[2] = 0.25 * S;
        }
        return out_r;
    }
    /**
     * Creates a matrix from a quaternion rotation, vector translation and vector scale
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Rotation quaternion
     * @param v - Translation vector
     * @param s - Scaling vector
     * @returns `out`
     */
    static fromRotationTranslationScale(out, q, v, s) {
        // Quaternion math
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = s[0];
        const sy = s[1];
        const sz = s[2];
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    }
    /**
     * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     mat4.translate(dest, origin);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale)
     *     mat4.translate(dest, negativeOrigin);
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Rotation quaternion
     * @param v - Translation vector
     * @param s - Scaling vector
     * @param o - The origin vector around which to scale and rotate
     * @returns `out`
     */
    static fromRotationTranslationScaleOrigin(out, q, v, s, o) {
        // Quaternion math
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = s[0];
        const sy = s[1];
        const sz = s[2];
        const ox = o[0];
        const oy = o[1];
        const oz = o[2];
        const out0 = (1 - (yy + zz)) * sx;
        const out1 = (xy + wz) * sx;
        const out2 = (xz - wy) * sx;
        const out4 = (xy - wz) * sy;
        const out5 = (1 - (xx + zz)) * sy;
        const out6 = (yz + wx) * sy;
        const out8 = (xz + wy) * sz;
        const out9 = (yz - wx) * sz;
        const out10 = (1 - (xx + yy)) * sz;
        out[0] = out0;
        out[1] = out1;
        out[2] = out2;
        out[3] = 0;
        out[4] = out4;
        out[5] = out5;
        out[6] = out6;
        out[7] = 0;
        out[8] = out8;
        out[9] = out9;
        out[10] = out10;
        out[11] = 0;
        out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
        out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
        out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
        out[15] = 1;
        return out;
    }
    /**
     * Calculates a 4x4 matrix from the given quaternion
     * @category Static
     *
     * @param out - mat4 receiving operation result
     * @param q - Quaternion to create matrix from
     * @returns `out`
     */
    static fromQuat(out, q) {
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        out[0] = 1 - yy - zz;
        out[1] = yx + wz;
        out[2] = zx - wy;
        out[3] = 0;
        out[4] = yx - wz;
        out[5] = 1 - xx - zz;
        out[6] = zy + wx;
        out[7] = 0;
        out[8] = zx + wy;
        out[9] = zy - wx;
        out[10] = 1 - xx - yy;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
    }
    /**
     * Generates a frustum matrix with the given bounds
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     */
    static frustum(out, left, right, bottom, top, near, far) {
        const rl = 1 / (right - left);
        const tb = 1 / (top - bottom);
        const nf = 1 / (near - far);
        out[0] = near * 2 * rl;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = near * 2 * tb;
        out[6] = 0;
        out[7] = 0;
        out[8] = (right + left) * rl;
        out[9] = (top + bottom) * tb;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = far * near * 2 * nf;
        out[15] = 0;
        return out;
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `out`
     */
    static perspectiveNO(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
            const nf = 1 / (near - far);
            out[10] = (far + near) * nf;
            out[14] = 2 * far * near * nf;
        }
        else {
            out[10] = -1;
            out[14] = -2 * near;
        }
        return out;
    }
    /**
     * Alias for {@link Mat4.perspectiveNO}
     * @category Static
     * @deprecated Use {@link Mat4.perspectiveNO} or {@link Mat4.perspectiveZO} explicitly
     */
    static perspective(out, fovy, aspect, near, far) { return out; }
    /**
     * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param fovy - Vertical field of view in radians
     * @param aspect - Aspect ratio. typically viewport width/height
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum, can be null or Infinity
     * @returns `out`
     */
    static perspectiveZO(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
            const nf = 1 / (near - far);
            out[10] = far * nf;
            out[14] = far * near * nf;
        }
        else {
            out[10] = -1;
            out[14] = -near;
        }
        return out;
    }
    /**
     * Generates a perspective projection matrix with the given field of view.
     * This is primarily useful for generating projection matrices to be used
     * with the still experiemental WebVR API.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param fov - Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     * @deprecated
     */
    static perspectiveFromFieldOfView(out, fov, near, far) {
        const upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
        const downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
        const leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
        const rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);
        const xScale = 2.0 / (leftTan + rightTan);
        const yScale = 2.0 / (upTan + downTan);
        out[0] = xScale;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        out[4] = 0.0;
        out[5] = yScale;
        out[6] = 0.0;
        out[7] = 0.0;
        out[8] = -((leftTan - rightTan) * xScale * 0.5);
        out[9] = (upTan - downTan) * yScale * 0.5;
        out[10] = far / (near - far);
        out[11] = -1.0;
        out[12] = 0.0;
        out[13] = 0.0;
        out[14] = (far * near) / (near - far);
        out[15] = 0.0;
        return out;
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     */
    static orthoNO(out, left, right, bottom, top, near, far) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1;
        return out;
    }
    /**
     * Alias for {@link Mat4.orthoNO}
     * @category Static
     * @deprecated Use {@link Mat4.orthoNO} or {@link Mat4.orthoZO} explicitly
     */
    static ortho(out, left, right, bottom, top, near, far) { return out; }
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
     * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param left - Left bound of the frustum
     * @param right - Right bound of the frustum
     * @param bottom - Bottom bound of the frustum
     * @param top - Top bound of the frustum
     * @param near - Near bound of the frustum
     * @param far - Far bound of the frustum
     * @returns `out`
     */
    static orthoZO(out, left, right, bottom, top, near, far) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = near * nf;
        out[15] = 1;
        return out;
    }
    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis.
     * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param eye - Position of the viewer
     * @param center - Point the viewer is looking at
     * @param up - vec3 pointing up
     * @returns `out`
     */
    static lookAt(out, eye, center, up) {
        const eyex = eye[0];
        const eyey = eye[1];
        const eyez = eye[2];
        const upx = up[0];
        const upy = up[1];
        const upz = up[2];
        const centerx = center[0];
        const centery = center[1];
        const centerz = center[2];
        if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON &&
            Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON &&
            Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
            return Mat4.identity(out);
        }
        let z0 = eyex - centerx;
        let z1 = eyey - centery;
        let z2 = eyez - centerz;
        let len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        let x0 = upy * z2 - upz * z1;
        let x1 = upz * z0 - upx * z2;
        let x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        }
        else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        let y0 = z1 * x2 - z2 * x1;
        let y1 = z2 * x0 - z0 * x2;
        let y2 = z0 * x1 - z1 * x0;
        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        }
        else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }
        out[0] = x0;
        out[1] = y0;
        out[2] = z0;
        out[3] = 0;
        out[4] = x1;
        out[5] = y1;
        out[6] = z1;
        out[7] = 0;
        out[8] = x2;
        out[9] = y2;
        out[10] = z2;
        out[11] = 0;
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1;
        return out;
    }
    /**
     * Generates a matrix that makes something look at something else.
     * @category Static
     *
     * @param out - mat4 frustum matrix will be written into
     * @param eye - Position of the viewer
     * @param target - Point the viewer is looking at
     * @param up - vec3 pointing up
     * @returns `out`
     */
    static targetTo(out, eye, target, up) {
        const eyex = eye[0];
        const eyey = eye[1];
        const eyez = eye[2];
        const upx = up[0];
        const upy = up[1];
        const upz = up[2];
        let z0 = eyex - target[0];
        let z1 = eyey - target[1];
        let z2 = eyez - target[2];
        let len = z0 * z0 + z1 * z1 + z2 * z2;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            z0 *= len;
            z1 *= len;
            z2 *= len;
        }
        let x0 = upy * z2 - upz * z1;
        let x1 = upz * z0 - upx * z2;
        let x2 = upx * z1 - upy * z0;
        len = x0 * x0 + x1 * x1 + x2 * x2;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }
        out[0] = x0;
        out[1] = x1;
        out[2] = x2;
        out[3] = 0;
        out[4] = z1 * x2 - z2 * x1;
        out[5] = z2 * x0 - z0 * x2;
        out[6] = z0 * x1 - z1 * x0;
        out[7] = 0;
        out[8] = z0;
        out[9] = z1;
        out[10] = z2;
        out[11] = 0;
        out[12] = eyex;
        out[13] = eyey;
        out[14] = eyez;
        out[15] = 1;
        return out;
    }
    /**
     * Returns Frobenius norm of a {@link Mat4}
     * @category Static
     *
     * @param a - the matrix to calculate Frobenius norm of
     * @returns Frobenius norm
     */
    static frob(a) {
        return Math.sqrt(a[0] * a[0] +
            a[1] * a[1] +
            a[2] * a[2] +
            a[3] * a[3] +
            a[4] * a[4] +
            a[5] * a[5] +
            a[6] * a[6] +
            a[7] * a[7] +
            a[8] * a[8] +
            a[9] * a[9] +
            a[10] * a[10] +
            a[11] * a[11] +
            a[12] * a[12] +
            a[13] * a[13] +
            a[14] * a[14] +
            a[15] * a[15]);
    }
    /**
     * Adds two {@link Mat4}'s
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        out[4] = a[4] + b[4];
        out[5] = a[5] + b[5];
        out[6] = a[6] + b[6];
        out[7] = a[7] + b[7];
        out[8] = a[8] + b[8];
        out[9] = a[9] + b[9];
        out[10] = a[10] + b[10];
        out[11] = a[11] + b[11];
        out[12] = a[12] + b[12];
        out[13] = a[13] + b[13];
        out[14] = a[14] + b[14];
        out[15] = a[15] + b[15];
        return out;
    }
    /**
     * Subtracts matrix b from matrix a
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        out[4] = a[4] - b[4];
        out[5] = a[5] - b[5];
        out[6] = a[6] - b[6];
        out[7] = a[7] - b[7];
        out[8] = a[8] - b[8];
        out[9] = a[9] - b[9];
        out[10] = a[10] - b[10];
        out[11] = a[11] - b[11];
        out[12] = a[12] - b[12];
        out[13] = a[13] - b[13];
        out[14] = a[14] - b[14];
        out[15] = a[15] - b[15];
        return out;
    }
    /**
     * Alias for {@link Mat4.subtract}
     * @category Static
     */
    static sub(out, a, b) { return out; }
    /**
     * Multiply each element of the matrix by a scalar.
     * @category Static
     *
     * @param out - the receiving matrix
     * @param a - the matrix to scale
     * @param b - amount to scale the matrix's elements by
     * @returns `out`
     */
    static multiplyScalar(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        out[4] = a[4] * b;
        out[5] = a[5] * b;
        out[6] = a[6] * b;
        out[7] = a[7] * b;
        out[8] = a[8] * b;
        out[9] = a[9] * b;
        out[10] = a[10] * b;
        out[11] = a[11] * b;
        out[12] = a[12] * b;
        out[13] = a[13] * b;
        out[14] = a[14] * b;
        out[15] = a[15] * b;
        return out;
    }
    /**
     * Adds two mat4's after multiplying each element of the second operand by a scalar value.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b's elements by before adding
     * @returns `out`
     */
    static multiplyScalarAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        out[3] = a[3] + b[3] * scale;
        out[4] = a[4] + b[4] * scale;
        out[5] = a[5] + b[5] * scale;
        out[6] = a[6] + b[6] * scale;
        out[7] = a[7] + b[7] * scale;
        out[8] = a[8] + b[8] * scale;
        out[9] = a[9] + b[9] * scale;
        out[10] = a[10] + b[10] * scale;
        out[11] = a[11] + b[11] * scale;
        out[12] = a[12] + b[12] * scale;
        out[13] = a[13] + b[13] * scale;
        out[14] = a[14] + b[14] * scale;
        out[15] = a[15] + b[15] * scale;
        return out;
    }
    /**
     * Returns whether or not two {@link Mat4}s have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @returns True if the matrices are equal, false otherwise.
     */
    static exactEquals(a, b) {
        return (a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[3] === b[3] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[7] === b[7] &&
            a[8] === b[8] &&
            a[9] === b[9] &&
            a[10] === b[10] &&
            a[11] === b[11] &&
            a[12] === b[12] &&
            a[13] === b[13] &&
            a[14] === b[14] &&
            a[15] === b[15]);
    }
    /**
     * Returns whether or not two {@link Mat4}s have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @returns True if the matrices are equal, false otherwise.
     */
    static equals(a, b) {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const a3 = a[3];
        const a4 = a[4];
        const a5 = a[5];
        const a6 = a[6];
        const a7 = a[7];
        const a8 = a[8];
        const a9 = a[9];
        const a10 = a[10];
        const a11 = a[11];
        const a12 = a[12];
        const a13 = a[13];
        const a14 = a[14];
        const a15 = a[15];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        const b3 = b[3];
        const b4 = b[4];
        const b5 = b[5];
        const b6 = b[6];
        const b7 = b[7];
        const b8 = b[8];
        const b9 = b[9];
        const b10 = b[10];
        const b11 = b[11];
        const b12 = b[12];
        const b13 = b[13];
        const b14 = b[14];
        const b15 = b[15];
        return (Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15)));
    }
    /**
     * Returns a string representation of a {@link Mat4}
     * @category Static
     *
     * @param a - matrix to represent as a string
     * @returns string representation of the matrix
     */
    static str(a) {
        return `Mat4(${a.join(', ')})`;
    }
}
// Temporary variables to prevent repeated allocations in the algorithms above.
const tmpVec3 = new _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
// Instance method alias assignments
Mat4.prototype.mul = Mat4.prototype.multiply;
// Static method alias assignments
Mat4.sub = Mat4.subtract;
Mat4.mul = Mat4.multiply;
Mat4.perspective = Mat4.perspectiveNO;
Mat4.ortho = Mat4.orthoNO;
/**
 * Mat4 alias for backwards compatibility
 */
const mat4 = Mat4;
//# sourceMappingURL=mat4.js.map

/***/ }),

/***/ "./node_modules/ts-gl-matrix/dist/src/quat.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-gl-matrix/dist/src/quat.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Quat: () => (/* binding */ Quat),
/* harmony export */   quat: () => (/* binding */ quat)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/ts-gl-matrix/dist/src/common.js");
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat3.js */ "./node_modules/ts-gl-matrix/dist/src/mat3.js");
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vec3.js */ "./node_modules/ts-gl-matrix/dist/src/vec3.js");
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vec4.js */ "./node_modules/ts-gl-matrix/dist/src/vec4.js");




/**
 * Quaternion
 */
class Quat extends Float32Array {
    /**
     * The number of bytes in a {@link Quat}.
     */
    static BYTE_LENGTH = 4 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Quat}.
     */
    constructor(...values) {
        switch (values.length) {
            case 4:
                super(values);
                break;
            case 2:
                super(values[0], values[1], 4);
                break;
            case 1: {
                const v = values[0];
                if (typeof v === 'number') {
                    super([v, v, v, v]);
                }
                else {
                    super(v, 0, 4);
                }
                break;
            }
            default:
                super(4);
                this[3] = 1;
                break;
        }
    }
    //============
    // Attributes
    //============
    // Getters and setters to make component access read better.
    // These are likely to be a little bit slower than direct array access.
    /**
     * The x component of the quaternion. Equivalent to `this[0];`
     * @category Quaternion components
     */
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    /**
     * The y component of the quaternion. Equivalent to `this[1];`
     * @category Quaternion components
     */
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    /**
     * The z component of the quaternion. Equivalent to `this[2];`
     * @category Quaternion components
     */
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
    /**
     * The w component of the quaternion. Equivalent to `this[3];`
     * @category Quaternion components
     */
    get w() { return this[3]; }
    set w(value) { this[3] = value; }
    /**
     * The magnitude (length) of this.
     * Equivalent to `Quat.magnitude(this);`
     *
     * Magnitude is used because the `length` attribute is already defined by
     * `Float32Array` to mean the number of elements in the array.
     */
    get magnitude() {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const w = this[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Alias for {@link Quat.magnitude}
     */
    get mag() { return this.magnitude; }
    /**
     * A string representation of `this`
     * Equivalent to `Quat.str(this);`
     */
    get str() {
        return Quat.str(this);
    }
    //===================
    // Instances methods
    //===================
    /**
     * Copy the values from another {@link Quat} into `this`.
     *
     * @param a the source quaternion
     * @returns `this`
     */
    copy(a) {
        super.set(a);
        return this;
    }
    /**
     * Set `this` to the identity quaternion
     * Equivalent to Quat.identity(this)
     *
     * @returns `this`
     */
    identity() {
        this[0] = 0;
        this[1] = 0;
        this[2] = 0;
        this[3] = 1;
        return this;
    }
    /**
     * Multiplies `this` by a {@link Quat}.
     * Equivalent to `Quat.multiply(this, this, b);`
     *
     * @param b - The vector to multiply `this` by
     * @returns `this`
     */
    multiply(b) {
        return Quat.multiply(this, this, b);
    }
    /**
     * Alias for {@link Quat.multiply}
     */
    mul(b) { return this; }
    /**
     * Rotates `this` by the given angle about the X axis
     * Equivalent to `Quat.rotateX(this, this, rad);`
     *
     * @param rad - angle (in radians) to rotate
     * @returns `this`
     */
    rotateX(rad) {
        return Quat.rotateX(this, this, rad);
    }
    /**
     * Rotates `this` by the given angle about the Y axis
     * Equivalent to `Quat.rotateY(this, this, rad);`
     *
     * @param rad - angle (in radians) to rotate
     * @returns `this`
     */
    rotateY(rad) {
        return Quat.rotateY(this, this, rad);
    }
    /**
     * Rotates `this` by the given angle about the Z axis
     * Equivalent to `Quat.rotateZ(this, this, rad);`
     *
     * @param rad - angle (in radians) to rotate
     * @returns `this`
     */
    rotateZ(rad) {
        return Quat.rotateZ(this, this, rad);
    }
    /**
     * Inverts `this`
     * Equivalent to `Quat.invert(this, this);`
     *
     * @returns `this`
     */
    invert() {
        return Quat.invert(this, this);
    }
    /**
     * Scales `this` by a scalar number
     * Equivalent to `Quat.scale(this, this, scale);`
     *
     * @param out - the receiving vector
     * @param a - the vector to scale
     * @param scale - amount to scale the vector by
     * @returns `this`
     */
    scale(scale) {
        this[0] *= scale;
        this[1] *= scale;
        this[2] *= scale;
        this[3] *= scale;
        return this;
    }
    /**
     * Calculates the dot product of `this` and another {@link Quat}
     * Equivalent to `Quat.dot(this, b);`
     *
     * @param b - the second operand
     * @returns dot product of `this` and b
     */
    dot(b) {
        return Quat.dot(this, b);
    }
    //===================
    // Static methods
    //===================
    /**
     * Creates a new identity quat
     * @category Static
     *
     * @returns a new quaternion
     */
    static create() {
        return new Quat();
    }
    /**
     * Set a quat to the identity quaternion
     * @category Static
     *
     * @param out - the receiving quaternion
     * @returns `out`
     */
    static identity(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
    }
    /**
     * Sets a quat from the given angle and rotation axis,
     * then returns it.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param axis - the axis around which to rotate
     * @param rad - the angle in radians
     * @returns `out`
     **/
    static setAxisAngle(out, axis, rad) {
        rad = rad * 0.5;
        const s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
    }
    /**
     * Gets the rotation axis and angle for a given
     *  quaternion. If a quaternion is created with
     *  setAxisAngle, this method will return the same
     *  values as providied in the original parameter list
     *  OR functionally equivalent values.
     * Example: The quaternion formed by axis [0, 0, 1] and
     *  angle -90 is the same as the quaternion formed by
     *  [0, 0, 1] and 270. This method favors the latter.
     * @category Static
     *
     * @param out_axis - Vector receiving the axis of rotation
     * @param q - Quaternion to be decomposed
     * @return Angle, in radians, of the rotation
     */
    static getAxisAngle(out_axis, q) {
        const rad = Math.acos(q[3]) * 2.0;
        const s = Math.sin(rad / 2.0);
        if (s > _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
            out_axis[0] = q[0] / s;
            out_axis[1] = q[1] / s;
            out_axis[2] = q[2] / s;
        }
        else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            out_axis[0] = 1;
            out_axis[1] = 0;
            out_axis[2] = 0;
        }
        return rad;
    }
    /**
     * Gets the angular distance between two unit quaternions
     * @category Static
     *
     * @param  {ReadonlyQuat} a     Origin unit quaternion
     * @param  {ReadonlyQuat} b     Destination unit quaternion
     * @return {Number}     Angle, in radians, between the two quaternions
     */
    static getAngle(a, b) {
        const dotproduct = Quat.dot(a, b);
        return Math.acos(2 * dotproduct * dotproduct - 1);
    }
    /**
     * Multiplies two quat's
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        const bx = b[0];
        const by = b[1];
        const bz = b[2];
        const bw = b[3];
        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }
    /**
     * Rotates a quaternion by the given angle about the X axis
     * @category Static
     *
     * @param out - quat receiving operation result
     * @param a - quat to rotate
     * @param rad - angle (in radians) to rotate
     * @returns `out`
     */
    static rotateX(out, a, rad) {
        rad *= 0.5;
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        const bx = Math.sin(rad);
        const bw = Math.cos(rad);
        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
    }
    /**
     * Rotates a quaternion by the given angle about the Y axis
     * @category Static
     *
     * @param out - quat receiving operation result
     * @param a - quat to rotate
     * @param rad - angle (in radians) to rotate
     * @returns `out`
     */
    static rotateY(out, a, rad) {
        rad *= 0.5;
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        const by = Math.sin(rad);
        const bw = Math.cos(rad);
        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
    }
    /**
     * Rotates a quaternion by the given angle about the Z axis
     * @category Static
     *
     * @param out - quat receiving operation result
     * @param a - quat to rotate
     * @param rad - angle (in radians) to rotate
     * @returns `out`
     */
    static rotateZ(out, a, rad) {
        rad *= 0.5;
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        const bz = Math.sin(rad);
        const bw = Math.cos(rad);
        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
    }
    /**
     * Calculates the W component of a quat from the X, Y, and Z components.
     * Assumes that quaternion is 1 unit in length.
     * Any existing W component will be ignored.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quat to calculate W component of
     * @returns `out`
     */
    static calculateW(out, a) {
        const x = a[0], y = a[1], z = a[2];
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return out;
    }
    /**
     * Calculate the exponential of a unit quaternion.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quat to calculate the exponential of
     * @returns `out`
     */
    static exp(out, a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        const r = Math.sqrt(x * x + y * y + z * z);
        const et = Math.exp(w);
        const s = r > 0 ? (et * Math.sin(r)) / r : 0;
        out[0] = x * s;
        out[1] = y * s;
        out[2] = z * s;
        out[3] = et * Math.cos(r);
        return out;
    }
    /**
     * Calculate the natural logarithm of a unit quaternion.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quat to calculate the exponential of
     * @returns `out`
     */
    static ln(out, a) {
        const x = a[0], y = a[1], z = a[2], w = a[3];
        const r = Math.sqrt(x * x + y * y + z * z);
        const t = r > 0 ? Math.atan2(r, w) / r : 0;
        out[0] = x * t;
        out[1] = y * t;
        out[2] = z * t;
        out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
        return out;
    }
    /**
     * Calculate the scalar power of a unit quaternion.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quat to calculate the exponential of
     * @param b - amount to scale the quaternion by
     * @returns `out`
     */
    static pow(out, a, b) {
        Quat.ln(out, a);
        Quat.scale(out, out, b);
        Quat.exp(out, out);
        return out;
    }
    /**
     * Performs a spherical linear interpolation between two quat
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static slerp(out, a, b, t) {
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations
        const ax = a[0], ay = a[1], az = a[2], aw = a[3];
        let bx = b[0], by = b[1], bz = b[2], bw = b[3];
        let scale0;
        let scale1;
        // calc cosine
        let cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
            // standard case (slerp)
            const omega = Math.acos(cosom);
            const sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // "from" and "to" quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
    }
    /**
     * Generates a random unit quaternion
     * @category Static
     *
     * @param out - the receiving quaternion
     * @returns `out`
     */
    /*static random(out: QuatLike): QuatLike {
      // Implementation of http://planning.cs.uiuc.edu/node198.html
      // TODO: Calling random 3 times is probably not the fastest solution
      let u1 = glMatrix.RANDOM();
      let u2 = glMatrix.RANDOM();
      let u3 = glMatrix.RANDOM();
  
      let sqrt1MinusU1 = Math.sqrt(1 - u1);
      let sqrtU1 = Math.sqrt(u1);
  
      out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
      out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
      out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
      out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
      return out;
    }*/
    /**
     * Calculates the inverse of a quat
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quat to calculate inverse of
     * @returns `out`
     */
    static invert(out, a) {
        const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
        const dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
        const invDot = dot ? 1.0 / dot : 0;
        // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
    }
    /**
     * Calculates the conjugate of a quat
     * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quat to calculate conjugate of
     * @returns `out`
     */
    static conjugate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        return out;
    }
    /**
     * Creates a quaternion from the given 3x3 rotation matrix.
     *
     * NOTE: The resultant quaternion is not normalized, so you should be sure
     * to renormalize the quaternion yourself where necessary.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param m - rotation matrix
     * @returns `out`
     */
    static fromMat3(out, m) {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        const fTrace = m[0] + m[4] + m[8];
        let fRoot;
        if (fTrace > 0.0) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0); // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot; // 1/(4w)
            out[0] = (m[5] - m[7]) * fRoot;
            out[1] = (m[6] - m[2]) * fRoot;
            out[2] = (m[1] - m[3]) * fRoot;
        }
        else {
            // |w| <= 1/2
            let i = 0;
            if (m[4] > m[0])
                i = 1;
            if (m[8] > m[i * 3 + i])
                i = 2;
            let j = (i + 1) % 3;
            let k = (i + 2) % 3;
            fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
            out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
            out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
        }
        return out;
    }
    /**
     * Creates a quaternion from the given euler angle x, y, z.
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param x - Angle to rotate around X axis in degrees.
     * @param y - Angle to rotate around Y axis in degrees.
     * @param z - Angle to rotate around Z axis in degrees.
     * @returns `out`
     */
    static fromEuler(out, x, y, z) {
        let halfToRad = (0.5 * Math.PI) / 180.0;
        x *= halfToRad;
        y *= halfToRad;
        z *= halfToRad;
        let sx = Math.sin(x);
        let cx = Math.cos(x);
        let sy = Math.sin(y);
        let cy = Math.cos(y);
        let sz = Math.sin(z);
        let cz = Math.cos(z);
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        return out;
    }
    /**
     * Returns a string representation of a quatenion
     * @category Static
     *
     * @param a - vector to represent as a string
     * @returns string representation of the vector
     */
    static str(a) {
        return `Quat(${a.join(', ')})`;
    }
    /**
     * Creates a new quat initialized with values from an existing quaternion
     * @category Static
     *
     * @param a - quaternion to clone
     * @returns a new quaternion
     */
    static clone(a) {
        return new Quat(a);
    }
    /**
     * Creates a new quat initialized with the given values
     * @category Static
     *
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @param w - W component
     * @returns a new quaternion
     */
    static fromValues(x, y, z, w) {
        return new Quat(x, y, z, w);
    }
    /**
     * Copy the values from one quat to another
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - the source quaternion
     * @returns `out`
     */
    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }
    /**
     * Set the components of a {@link Quat} to the given values
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @param w - W component
     * @returns `out`
     */
    static set(out, x, y, z, w) { return out; }
    /**
     * Adds two {@link Quat}'s
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static add(out, a, b) { return out; }
    /**
     * Alias for {@link Quat.multiply}
     * @category Static
     */
    static mul(out, a, b) { return out; }
    /**
     * Scales a quat by a scalar number
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to scale
     * @param b - amount to scale the vector by
     * @returns `out`
     */
    static scale(out, a, scale) {
        out[0] = a[0] * scale;
        out[1] = a[1] * scale;
        out[2] = a[2] * scale;
        out[3] = a[3] * scale;
        return out;
    }
    /**
     * Calculates the dot product of two quat's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns dot product of a and b
     */
    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    /**
     * Performs a linear interpolation between two quat's
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static lerp(out, a, b, t) { return out; }
    /**
     * Calculates the magnitude (length) of a {@link Quat}
     * @category Static
     *
     * @param a - quaternion to calculate length of
     * @returns length of `a`
     */
    static magnitude(a) { return 0; }
    /**
     * Alias for {@link Quat.magnitude}
     * @category Static
     */
    static mag(a) { return 0; }
    /**
     * Alias for {@link Quat.magnitude}
     * @category Static
     * @deprecated Use {@link Quat.magnitude} to avoid conflicts with builtin `length` methods/attribs
     */
    // @ts-ignore: Length conflicts with Function.length
    static length(a) { return 0; }
    /**
     * Alias for {@link Quat.magnitude}
     * @category Static
     * @deprecated Use {@link Quat.mag}
     */
    static len(a) { return 0; }
    /**
     * Calculates the squared length of a {@link Quat}
     * @category Static
     *
     * @param a - quaternion to calculate squared length of
     * @returns squared length of a
     */
    static squaredLength(a) { return 0; }
    /**
     * Alias for {@link Quat.squaredLength}
     * @category Static
     */
    static sqrLen(a) { return 0; }
    /**
     * Normalize a {@link Quat}
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - quaternion to normalize
     * @returns `out`
     */
    static normalize(out, a) { return out; }
    /**
     * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first quaternion.
     * @param b - The second quaternion.
     * @returns True if the vectors are equal, false otherwise.
     */
    static exactEquals(a, b) { return false; }
    /**
     * Returns whether or not the quaternions have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static equals(a, b) { return false; }
    /**
     * Sets a quaternion to represent the shortest rotation from one
     * vector to another.
     *
     * Both vectors are assumed to be unit length.
     * @category Static
     *
     * @param out - the receiving quaternion.
     * @param a - the initial vector
     * @param b - the destination vector
     * @returns `out`
     */
    static rotationTo(out, a, b) {
        let dot = _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3.dot(a, b);
        if (dot < -0.999999) {
            _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3.cross(tmpVec3, xUnitVec3, a);
            if (_vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3.len(tmpVec3) < 0.000001)
                _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3.cross(tmpVec3, yUnitVec3, a);
            _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3.normalize(tmpVec3, tmpVec3);
            Quat.setAxisAngle(out, tmpVec3, Math.PI);
            return out;
        }
        else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        }
        else {
            _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3.cross(tmpVec3, a, b);
            out[0] = tmpVec3[0];
            out[1] = tmpVec3[1];
            out[2] = tmpVec3[2];
            out[3] = 1 + dot;
            return Quat.normalize(out, out);
        }
    }
    /**
     * Performs a spherical linear interpolation with two control points
     * @category Static
     *
     * @param out - the receiving quaternion
     * @param a - the first operand
     * @param b - the second operand
     * @param c - the third operand
     * @param d - the fourth operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static sqlerp(out, a, b, c, d, t) {
        Quat.slerp(temp1, a, d, t);
        Quat.slerp(temp2, b, c, t);
        Quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
    }
    /**
     * Sets the specified quaternion with values corresponding to the given
     * axes. Each axis is a vec3 and is expected to be unit length and
     * perpendicular to all other specified axes.
     * @category Static
     *
     * @param out - The receiving quaternion
     * @param view - the vector representing the viewing direction
     * @param right - the vector representing the local "right" direction
     * @param up - the vector representing the local "up" direction
     * @returns `out`
     */
    static setAxes(out, view, right, up) {
        tempMat3[0] = right[0];
        tempMat3[3] = right[1];
        tempMat3[6] = right[2];
        tempMat3[1] = up[0];
        tempMat3[4] = up[1];
        tempMat3[7] = up[2];
        tempMat3[2] = -view[0];
        tempMat3[5] = -view[1];
        tempMat3[8] = -view[2];
        return Quat.normalize(out, Quat.fromMat3(out, tempMat3));
    }
}
// Temporary variables to prevent repeated allocations in the algorithms above.
const temp1 = new Quat();
const temp2 = new Quat();
const tempMat3 = new _mat3_js__WEBPACK_IMPORTED_MODULE_2__.Mat3();
const tmpVec3 = new _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3();
const xUnitVec3 = new _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(1, 0, 0);
const yUnitVec3 = new _vec3_js__WEBPACK_IMPORTED_MODULE_1__.Vec3(0, 1, 0);
// Methods which re-use the Vec4 implementation
Quat.set = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.set;
Quat.add = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.add;
Quat.lerp = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.lerp;
Quat.normalize = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.normalize;
Quat.squaredLength = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.squaredLength;
Quat.sqrLen = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.squaredLength;
Quat.exactEquals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.exactEquals;
Quat.equals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.equals;
Quat.magnitude = _vec4_js__WEBPACK_IMPORTED_MODULE_3__.Vec4.magnitude;
// Instance method alias assignments
Quat.prototype.mul = Quat.prototype.multiply;
// Static method alias assignments
Quat.mul = Quat.multiply;
Quat.mag = Quat.magnitude;
Quat.length = Quat.magnitude;
Quat.len = Quat.magnitude;
/**
 * Quat alias for backwards compatibility
 */
const quat = Quat;
//# sourceMappingURL=quat.js.map

/***/ }),

/***/ "./node_modules/ts-gl-matrix/dist/src/vec3.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-gl-matrix/dist/src/vec3.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vec3: () => (/* binding */ Vec3),
/* harmony export */   vec3: () => (/* binding */ vec3)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/ts-gl-matrix/dist/src/common.js");

/**
 * 3 Dimensional Vector
 */
class Vec3 extends Float32Array {
    /**
    * The number of bytes in a {@link Vec3}.
    */
    static BYTE_LENGTH = 3 * Float32Array.BYTES_PER_ELEMENT;
    /**
    * Create a {@link Vec3}.
    */
    constructor(...values) {
        switch (values.length) {
            case 3:
                super(values);
                break;
            case 2:
                super(values[0], values[1], 3);
                break;
            case 1: {
                const v = values[0];
                if (typeof v === 'number') {
                    super([v, v, v]);
                }
                else {
                    super(v, 0, 3);
                }
                break;
            }
            default:
                super(3);
                break;
        }
    }
    //============
    // Attributes
    //============
    // Getters and setters to make component access read better.
    // These are likely to be a little bit slower than direct array access.
    /**
     * The x component of the vector. Equivalent to `this[0];`
     * @category Vector components
     */
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    /**
     * The y component of the vector. Equivalent to `this[1];`
     * @category Vector components
     */
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    /**
     * The z component of the vector. Equivalent to `this[2];`
     * @category Vector components
     */
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
    // Alternate set of getters and setters in case this is being used to define
    // a color.
    /**
     * The r component of the vector. Equivalent to `this[0];`
     * @category Color components
     */
    get r() { return this[0]; }
    set r(value) { this[0] = value; }
    /**
     * The g component of the vector. Equivalent to `this[1];`
     * @category Color components
     */
    get g() { return this[1]; }
    set g(value) { this[1] = value; }
    /**
     * The b component of the vector. Equivalent to `this[2];`
     * @category Color components
     */
    get b() { return this[2]; }
    set b(value) { this[2] = value; }
    /**
     * The magnitude (length) of this.
     * Equivalent to `Vec3.magnitude(this);`
     *
     * Magnitude is used because the `length` attribute is already defined by
     * `Float32Array` to mean the number of elements in the array.
     */
    get magnitude() {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Alias for {@link Vec3.magnitude}
     */
    get mag() { return this.magnitude; }
    /**
     * The squared magnitude (length) of `this`.
     * Equivalent to `Vec3.squaredMagnitude(this);`
     */
    get squaredMagnitude() {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        return x * x + y * y + z * z;
    }
    /**
     * Alias for {@link Vec3.squaredMagnitude}
     */
    get sqrMag() { return this.squaredMagnitude; }
    /**
     * A string representation of `this`
     * Equivalent to `Vec3.str(this);`
     */
    get str() {
        return Vec3.str(this);
    }
    //===================
    // Instances methods
    //===================
    /**
     * Copy the values from another {@link Vec3} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
        this.set(a);
        return this;
    }
    /**
     * Adds a {@link Vec3} to `this`.
     * Equivalent to `Vec3.add(this, this, b);`
     *
     * @param b - The vector to add to `this`
     * @returns `this`
     */
    add(b) {
        this[0] += b[0];
        this[1] += b[1];
        this[2] += b[2];
        return this;
    }
    /**
     * Subtracts a {@link Vec3} from `this`.
     * Equivalent to `Vec3.subtract(this, this, b);`
     *
     * @param b - The vector to subtract from `this`
     * @returns `this`
     */
    subtract(b) {
        this[0] -= b[0];
        this[1] -= b[1];
        this[2] -= b[2];
        return this;
    }
    /**
     * Alias for {@link Vec3.subtract}
     */
    sub(b) { return this; }
    /**
     * Multiplies `this` by a {@link Vec3}.
     * Equivalent to `Vec3.multiply(this, this, b);`
     *
     * @param b - The vector to multiply `this` by
     * @returns `this`
     */
    multiply(b) {
        this[0] *= b[0];
        this[1] *= b[1];
        this[2] *= b[2];
        return this;
    }
    /**
     * Alias for {@link Vec3.multiply}
     */
    mul(b) { return this; }
    /**
     * Divides `this` by a {@link Vec3}.
     * Equivalent to `Vec3.divide(this, this, b);`
     *
     * @param b - The vector to divide `this` by
     * @returns `this`
     */
    divide(b) {
        this[0] /= b[0];
        this[1] /= b[1];
        this[2] /= b[2];
        return this;
    }
    /**
     * Alias for {@link Vec3.divide}
     */
    div(b) { return this; }
    /**
     * Scales `this` by a scalar number.
     * Equivalent to `Vec3.scale(this, this, b);`
     *
     * @param b - Amount to scale `this` by
     * @returns `this`
     */
    scale(b) {
        this[0] *= b;
        this[1] *= b;
        this[2] *= b;
        return this;
    }
    /**
     * Calculates `this` scaled by a scalar value then adds the result to `this`.
     * Equivalent to `Vec3.scaleAndAdd(this, this, b, scale);`
     *
     * @param b - The vector to add to `this`
     * @param scale - The amount to scale `b` by before adding
     * @returns `this`
     */
    scaleAndAdd(b, scale) {
        this[0] += b[0] * scale;
        this[1] += b[1] * scale;
        this[2] += b[2] * scale;
        return this;
    }
    /**
     * Calculates the euclidian distance between another {@link Vec3} and `this`.
     * Equivalent to `Vec3.distance(this, b);`
     *
     * @param b - The vector to calculate the distance to
     * @returns Distance between `this` and `b`
     */
    distance(b) {
        return Vec3.distance(this, b);
    }
    /**
     * Alias for {@link Vec3.distance}
     */
    dist(b) { return 0; }
    /**
     * Calculates the squared euclidian distance between another {@link Vec3} and `this`.
     * Equivalent to `Vec3.squaredDistance(this, b);`
     *
     * @param b The vector to calculate the squared distance to
     * @returns Squared distance between `this` and `b`
     */
    squaredDistance(b) {
        return Vec3.squaredDistance(this, b);
    }
    /**
     * Alias for {@link Vec3.squaredDistance}
     */
    sqrDist(b) { return 0; }
    /**
     * Negates the components of `this`.
     * Equivalent to `Vec3.negate(this, this);`
     *
     * @returns `this`
     */
    negate() {
        this[0] *= -1;
        this[1] *= -1;
        this[2] *= -1;
        return this;
    }
    /**
     * Inverts the components of `this`.
     * Equivalent to `Vec3.inverse(this, this);`
     *
     * @returns `this`
     */
    invert() {
        this[0] = 1.0 / this[0];
        this[1] = 1.0 / this[1];
        this[2] = 1.0 / this[2];
        return this;
    }
    /**
     * Calculates the dot product of this and another {@link Vec3}.
     * Equivalent to `Vec3.dot(this, b);`
     *
     * @param b - The second operand
     * @returns Dot product of `this` and `b`
     */
    dot(b) {
        return this[0] * b[0] + this[1] * b[1] + this[2] * b[2];
    }
    /**
     * Normalize `this`.
     * Equivalent to `Vec3.normalize(this, this);`
     *
     * @returns `this`
     */
    normalize() {
        return Vec3.normalize(this, this);
    }
    //================
    // Static methods
    //================
    /**
     * Creates a new, empty vec3
     * @category Static
     *
     * @returns a new 3D vector
     */
    static create() {
        return new Vec3();
    }
    /**
     * Creates a new vec3 initialized with values from an existing vector
     * @category Static
     *
     * @param a - vector to clone
     * @returns a new 3D vector
     */
    static clone(a) {
        return new Vec3(a);
    }
    /**
     * Calculates the magnitude (length) of a {@link Vec3}
     * @category Static
     *
     * @param a - Vector to calculate magnitude of
     * @returns Magnitude of a
     */
    static magnitude(a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Alias for {@link Vec3.magnitude}
     * @category Static
     */
    static mag(a) { return 0; }
    /**
     * Alias for {@link Vec3.magnitude}
     * @category Static
     * @deprecated Use {@link Vec3.magnitude} to avoid conflicts with builtin `length` methods/attribs
     *
     * @param a - vector to calculate length of
     * @returns length of a
     */
    // @ts-ignore: Length conflicts with Function.length
    static length(a) { return 0; }
    /**
     * Alias for {@link Vec3.magnitude}
     * @category Static
     * @deprecated Use {@link Vec3.mag}
     */
    static len(a) { return 0; }
    /**
     * Creates a new vec3 initialized with the given values
     * @category Static
     *
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @returns a new 3D vector
     */
    static fromValues(x, y, z) {
        return new Vec3(x, y, z);
    }
    /**
     * Copy the values from one vec3 to another
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the source vector
     * @returns `out`
     */
    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
    }
    /**
     * Set the components of a vec3 to the given values
     * @category Static
     *
     * @param out - the receiving vector
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @returns `out`
     */
    static set(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
    }
    /**
     * Adds two {@link Vec3}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
    }
    /**
     * Subtracts vector b from vector a
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
    }
    /**
     * Alias for {@link Vec3.subtract}
     * @category Static
     */
    static sub(out, a, b) { return [0, 0, 0]; }
    ;
    /**
     * Multiplies two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
    }
    /**
     * Alias for {@link Vec3.multiply}
     * @category Static
     */
    static mul(out, a, b) { return [0, 0, 0]; }
    /**
     * Divides two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
    }
    /**
     * Alias for {@link Vec3.divide}
     * @category Static
     */
    static div(out, a, b) { return [0, 0, 0]; }
    ;
    /**
     * Math.ceil the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to ceil
     * @returns `out`
     */
    static ceil(out, a) {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        out[2] = Math.ceil(a[2]);
        return out;
    }
    /**
     * Math.floor the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to floor
     * @returns `out`
     */
    static floor(out, a) {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        out[2] = Math.floor(a[2]);
        return out;
    }
    /**
     * Returns the minimum of two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static min(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        return out;
    }
    /**
     * Returns the maximum of two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static max(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        return out;
    }
    /**
     * symmetric round the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to round
     * @returns `out`
     */
    /*static round(out: Vec3Like, a: Readonly<Vec3Like>): Vec3Like {
      out[0] = glMatrix.round(a[0]);
      out[1] = glMatrix.round(a[1]);
      out[2] = glMatrix.round(a[2]);
      return out;
    }*/
    /**
     * Scales a vec3 by a scalar number
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to scale
     * @param scale - amount to scale the vector by
     * @returns `out`
     */
    static scale(out, a, scale) {
        out[0] = a[0] * scale;
        out[1] = a[1] * scale;
        out[2] = a[2] * scale;
        return out;
    }
    /**
     * Adds two vec3's after scaling the second operand by a scalar value
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b by before adding
     * @returns `out`
     */
    static scaleAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        return out;
    }
    /**
     * Calculates the euclidian distance between two vec3's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns distance between a and b
     */
    static distance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Alias for {@link Vec3.distance}
     */
    static dist(a, b) { return 0; }
    /**
     * Calculates the squared euclidian distance between two vec3's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns squared distance between a and b
     */
    static squaredDistance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return x * x + y * y + z * z;
    }
    /**
     * Alias for {@link Vec3.squaredDistance}
     */
    static sqrDist(a, b) { return 0; }
    /**
     * Calculates the squared length of a vec3
     * @category Static
     *
     * @param a - vector to calculate squared length of
     * @returns squared length of a
     */
    static squaredLength(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return x * x + y * y + z * z;
    }
    /**
     * Alias for {@link Vec3.squaredLength}
     */
    static sqrLen(a, b) { return 0; }
    /**
     * Negates the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to negate
     * @returns `out`
     */
    static negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
    }
    /**
     * Returns the inverse of the components of a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to invert
     * @returns `out`
     */
    static inverse(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        return out;
    }
    /**
     * Normalize a vec3
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to normalize
     * @returns `out`
     */
    static normalize(out, a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        let len = x * x + y * y + z * z;
        if (len > 0) {
            //TODO: evaluate use of glm_invsqrt here?
            len = 1 / Math.sqrt(len);
        }
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        return out;
    }
    /**
     * Calculates the dot product of two vec3's
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns dot product of a and b
     */
    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    /**
     * Computes the cross product of two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static cross(out, a, b) {
        const ax = a[0], ay = a[1], az = a[2];
        const bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }
    /**
     * Performs a linear interpolation between two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static lerp(out, a, b, t) {
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        return out;
    }
    /**
     * Performs a spherical linear interpolation between two vec3's
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static slerp(out, a, b, t) {
        const angle = Math.acos(Math.min(Math.max(Vec3.dot(a, b), -1), 1));
        const sinTotal = Math.sin(angle);
        const ratioA = Math.sin((1 - t) * angle) / sinTotal;
        const ratioB = Math.sin(t * angle) / sinTotal;
        out[0] = ratioA * a[0] + ratioB * b[0];
        out[1] = ratioA * a[1] + ratioB * b[1];
        out[2] = ratioA * a[2] + ratioB * b[2];
        return out;
    }
    /**
     * Performs a hermite interpolation with two control points
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param c - the third operand
     * @param d - the fourth operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static hermite(out, a, b, c, d, t) {
        const factorTimes2 = t * t;
        const factor1 = factorTimes2 * (2 * t - 3) + 1;
        const factor2 = factorTimes2 * (t - 2) + t;
        const factor3 = factorTimes2 * (t - 1);
        const factor4 = factorTimes2 * (3 - 2 * t);
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
    }
    /**
     * Performs a bezier interpolation with two control points
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param c - the third operand
     * @param d - the fourth operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static bezier(out, a, b, c, d, t) {
        const inverseFactor = 1 - t;
        const inverseFactorTimesTwo = inverseFactor * inverseFactor;
        const factorTimes2 = t * t;
        const factor1 = inverseFactorTimesTwo * inverseFactor;
        const factor2 = 3 * t * inverseFactorTimesTwo;
        const factor3 = 3 * factorTimes2 * inverseFactor;
        const factor4 = factorTimes2 * t;
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
    }
    /**
     * Generates a random vector with the given scale
     * @category Static
     *
     * @param out - the receiving vector
     * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
     * @returns `out`
     */
    /*static random(out: Vec3Like, scale) {
      scale = scale === undefined ? 1.0 : scale;
  
      let r = glMatrix.RANDOM() * 2.0 * Math.PI;
      let z = glMatrix.RANDOM() * 2.0 - 1.0;
      let zScale = Math.sqrt(1.0 - z * z) * scale;
  
      out[0] = Math.cos(r) * zScale;
      out[1] = Math.sin(r) * zScale;
      out[2] = z * scale;
      return out;
    }*/
    /**
     * Transforms the vec3 with a mat4.
     * 4th vector component is implicitly '1'
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param m - matrix to transform with
     * @returns `out`
     */
    static transformMat4(out, a, m) {
        const x = a[0], y = a[1], z = a[2];
        const w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1.0;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
    }
    /**
     * Transforms the vec3 with a mat3.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param m - the 3x3 matrix to transform with
     * @returns `out`
     */
    static transformMat3(out, a, m) {
        let x = a[0], y = a[1], z = a[2];
        out[0] = x * m[0] + y * m[3] + z * m[6];
        out[1] = x * m[1] + y * m[4] + z * m[7];
        out[2] = x * m[2] + y * m[5] + z * m[8];
        return out;
    }
    /**
     * Transforms the vec3 with a quat
     * Can also be used for dual quaternions. (Multiply it with the real part)
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param q - quaternion to transform with
     * @returns `out`
     */
    static transformQuat(out, a, q) {
        // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const w2 = q[3] * 2;
        const x = a[0];
        const y = a[1];
        const z = a[2];
        // var qvec = [qx, qy, qz];
        // var uv = vec3.cross([], qvec, a);
        const uvx = (qy * z - qz * y);
        const uvy = (qz * x - qx * z);
        const uvz = (qx * y - qy * x);
        // var uuv = vec3.cross([], qvec, uv);
        // vec3.scale(uuv, uuv, 2);
        const uuvx = (qy * uvz - qz * uvy) * 2;
        const uuvy = (qz * uvx - qx * uvz) * 2;
        const uuvz = (qx * uvy - qy * uvx) * 2;
        // vec3.scale(uv, uv, 2 * w);
        // return vec3.add(out, a, vec3.add(out, uv, uuv));
        out[0] = x + (uvx * w2) + uuvx;
        out[1] = y + (uvy * w2) + uuvy;
        out[2] = z + (uvz * w2) + uuvz;
        return out;
    }
    /**
     * Rotate a 3D vector around the x-axis
     * @param out - The receiving vec3
     * @param a - The vec3 point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotateX(out, a, b, rad) {
        const by = b[1];
        const bz = b[2];
        //Translate point to the origin
        const py = a[1] - by;
        const pz = a[2] - bz;
        //perform rotation
        //translate to correct position
        out[0] = a[0];
        out[1] = (py * Math.cos(rad) - pz * Math.sin(rad)) + by;
        out[2] = (py * Math.sin(rad) + pz * Math.cos(rad)) + bz;
        return out;
    }
    /**
     * Rotate a 3D vector around the y-axis
     * @param out - The receiving vec3
     * @param a - The vec3 point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotateY(out, a, b, rad) {
        const bx = b[0];
        const bz = b[2];
        //Translate point to the origin
        const px = a[0] - bx;
        const pz = a[2] - bz;
        //perform rotation
        //translate to correct position
        out[0] = (pz * Math.sin(rad) + px * Math.cos(rad)) + bx;
        out[1] = a[1];
        out[2] = (pz * Math.cos(rad) - px * Math.sin(rad)) + bz;
        return out;
    }
    /**
     * Rotate a 3D vector around the z-axis
     * @param out - The receiving vec3
     * @param a - The vec3 point to rotate
     * @param b - The origin of the rotation
     * @param rad - The angle of rotation in radians
     * @returns `out`
     */
    static rotateZ(out, a, b, rad) {
        const bx = b[0];
        const by = b[1];
        //Translate point to the origin
        const px = a[0] - bx;
        const py = a[1] - by;
        //perform rotation
        //translate to correct position
        out[0] = (px * Math.cos(rad) - py * Math.sin(rad)) + bx;
        out[1] = (px * Math.sin(rad) + py * Math.cos(rad)) + by;
        out[2] = b[2];
        return out;
    }
    /**
     * Get the angle between two 3D vectors
     * @param a - The first operand
     * @param b - The second operand
     * @returns The angle in radians
     */
    static angle(a, b) {
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const bx = b[0];
        const by = b[1];
        const bz = b[2];
        const mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz));
        const cosine = mag && Vec3.dot(a, b) / mag;
        return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    /**
     * Set the components of a vec3 to zero
     * @category Static
     *
     * @param out - the receiving vector
     * @returns `out`
     */
    static zero(out) {
        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        return out;
    }
    /**
     * Returns a string representation of a vector
     * @category Static
     *
     * @param a - vector to represent as a string
     * @returns string representation of the vector
     */
    static str(a) {
        return `Vec3(${a.join(', ')})`;
    }
    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static equals(a, b) {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        return (Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)));
    }
}
// Instance method alias assignments
Vec3.prototype.sub = Vec3.prototype.subtract;
Vec3.prototype.mul = Vec3.prototype.multiply;
Vec3.prototype.div = Vec3.prototype.divide;
Vec3.prototype.dist = Vec3.prototype.distance;
Vec3.prototype.sqrDist = Vec3.prototype.squaredDistance;
// Static method alias assignments
Vec3.sub = Vec3.subtract;
Vec3.mul = Vec3.multiply;
Vec3.div = Vec3.divide;
Vec3.dist = Vec3.distance;
Vec3.sqrDist = Vec3.squaredDistance;
Vec3.sqrLen = Vec3.squaredLength;
Vec3.mag = Vec3.magnitude;
Vec3.length = Vec3.magnitude;
Vec3.len = Vec3.magnitude;
/**
 * Vec3 alias for backwards compatibility
 */
const vec3 = Vec3;
//# sourceMappingURL=vec3.js.map

/***/ }),

/***/ "./node_modules/ts-gl-matrix/dist/src/vec4.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-gl-matrix/dist/src/vec4.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vec4: () => (/* binding */ Vec4),
/* harmony export */   vec4: () => (/* binding */ vec4)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/ts-gl-matrix/dist/src/common.js");

/**
 * 4 Dimensional Vector
 */
class Vec4 extends Float32Array {
    /**
     * The number of bytes in a {@link Vec4}.
     */
    static BYTE_LENGTH = 4 * Float32Array.BYTES_PER_ELEMENT;
    /**
     * Create a {@link Vec4}.
     */
    constructor(...values) {
        switch (values.length) {
            case 4:
                super(values);
                break;
            case 2:
                super(values[0], values[1], 4);
                break;
            case 1: {
                const v = values[0];
                if (typeof v === 'number') {
                    super([v, v, v, v]);
                }
                else {
                    super(v, 0, 4);
                }
                break;
            }
            default:
                super(4);
                break;
        }
    }
    //============
    // Attributes
    //============
    // Getters and setters to make component access read better.
    // These are likely to be a little bit slower than direct array access.
    /**
     * The x component of the vector. Equivalent to `this[0];`
     * @category Vector components
     */
    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    /**
     * The y component of the vector. Equivalent to `this[1];`
     * @category Vector components
     */
    get y() { return this[1]; }
    set y(value) { this[1] = value; }
    /**
     * The z component of the vector. Equivalent to `this[2];`
     * @category Vector components
     */
    get z() { return this[2]; }
    set z(value) { this[2] = value; }
    /**
     * The w component of the vector. Equivalent to `this[3];`
     * @category Vector components
     */
    get w() { return this[3]; }
    set w(value) { this[3] = value; }
    // Alternate set of getters and setters in case this is being used to define
    // a color.
    /**
     * The r component of the vector. Equivalent to `this[0];`
     * @category Color components
     */
    get r() { return this[0]; }
    set r(value) { this[0] = value; }
    /**
     * The g component of the vector. Equivalent to `this[1];`
     * @category Color components
     */
    get g() { return this[1]; }
    set g(value) { this[1] = value; }
    /**
     * The b component of the vector. Equivalent to `this[2];`
     * @category Color components
     */
    get b() { return this[2]; }
    set b(value) { this[2] = value; }
    /**
     * The a component of the vector. Equivalent to `this[3];`
     * @category Color components
     */
    get a() { return this[3]; }
    set a(value) { this[3] = value; }
    /**
     * The magnitude (length) of this.
     * Equivalent to `Vec4.magnitude(this);`
     *
     * Magnitude is used because the `length` attribute is already defined by
     * `Float32Array` to mean the number of elements in the array.
     */
    get magnitude() {
        const x = this[0];
        const y = this[1];
        const z = this[2];
        const w = this[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Alias for {@link Vec4.magnitude}
     */
    get mag() { return this.magnitude; }
    /**
     * A string representation of `this`
     * Equivalent to `Vec4.str(this);`
     */
    get str() {
        return Vec4.str(this);
    }
    //===================
    // Instances methods
    //===================
    /**
     * Copy the values from another {@link Vec4} into `this`.
     *
     * @param a the source vector
     * @returns `this`
     */
    copy(a) {
        super.set(a);
        return this;
    }
    /**
     * Adds a {@link Vec4} to `this`.
     * Equivalent to `Vec4.add(this, this, b);`
     *
     * @param b - The vector to add to `this`
     * @returns `this`
     */
    add(b) {
        this[0] += b[0];
        this[1] += b[1];
        this[2] += b[2];
        this[3] += b[3];
        return this;
    }
    /**
     * Subtracts a {@link Vec4} from `this`.
     * Equivalent to `Vec4.subtract(this, this, b);`
     *
     * @param b - The vector to subtract from `this`
     * @returns `this`
     */
    subtract(b) {
        this[0] -= b[0];
        this[1] -= b[1];
        this[2] -= b[2];
        this[3] -= b[3];
        return this;
    }
    /**
     * Alias for {@link Vec4.subtract}
     */
    sub(b) { return this; }
    /**
     * Multiplies `this` by a {@link Vec4}.
     * Equivalent to `Vec4.multiply(this, this, b);`
     *
     * @param b - The vector to multiply `this` by
     * @returns `this`
     */
    multiply(b) {
        this[0] *= b[0];
        this[1] *= b[1];
        this[2] *= b[2];
        this[3] *= b[3];
        return this;
    }
    /**
     * Alias for {@link Vec4.multiply}
     */
    mul(b) { return this; }
    /**
     * Divides `this` by a {@link Vec4}.
     * Equivalent to `Vec4.divide(this, this, b);`
     *
     * @param b - The vector to divide `this` by
     * @returns `this`
     */
    divide(b) {
        this[0] /= b[0];
        this[1] /= b[1];
        this[2] /= b[2];
        this[3] /= b[3];
        return this;
    }
    /**
     * Alias for {@link Vec4.divide}
     */
    div(b) { return this; }
    /**
     * Scales `this` by a scalar number.
     * Equivalent to `Vec4.scale(this, this, b);`
     *
     * @param b - Amount to scale `this` by
     * @returns `this`
     */
    scale(b) {
        this[0] *= b;
        this[1] *= b;
        this[2] *= b;
        this[3] *= b;
        return this;
    }
    /**
     * Calculates `this` scaled by a scalar value then adds the result to `this`.
     * Equivalent to `Vec4.scaleAndAdd(this, this, b, scale);`
     *
     * @param b - The vector to add to `this`
     * @param scale - The amount to scale `b` by before adding
     * @returns `this`
     */
    scaleAndAdd(b, scale) {
        this[0] += b[0] * scale;
        this[1] += b[1] * scale;
        this[2] += b[2] * scale;
        this[3] += b[3] * scale;
        return this;
    }
    /**
     * Calculates the euclidian distance between another {@link Vec4} and `this`.
     * Equivalent to `Vec4.distance(this, b);`
     *
     * @param b - The vector to calculate the distance to
     * @returns Distance between `this` and `b`
     */
    distance(b) {
        return Vec4.distance(this, b);
    }
    /**
     * Alias for {@link Vec4.distance}
     */
    dist(b) { return 0; }
    /**
     * Calculates the squared euclidian distance between another {@link Vec4} and `this`.
     * Equivalent to `Vec4.squaredDistance(this, b);`
     *
     * @param b The vector to calculate the squared distance to
     * @returns Squared distance between `this` and `b`
     */
    squaredDistance(b) {
        return Vec4.squaredDistance(this, b);
    }
    /**
     * Alias for {@link Vec4.squaredDistance}
     */
    sqrDist(b) { return 0; }
    /**
     * Negates the components of `this`.
     * Equivalent to `Vec4.negate(this, this);`
     *
     * @returns `this`
     */
    negate() {
        this[0] *= -1;
        this[1] *= -1;
        this[2] *= -1;
        this[3] *= -1;
        return this;
    }
    /**
     * Inverts the components of `this`.
     * Equivalent to `Vec4.inverse(this, this);`
     *
     * @returns `this`
     */
    invert() {
        this[0] = 1.0 / this[0];
        this[1] = 1.0 / this[1];
        this[2] = 1.0 / this[2];
        this[3] = 1.0 / this[3];
        return this;
    }
    /**
     * Calculates the dot product of this and another {@link Vec4}.
     * Equivalent to `Vec4.dot(this, b);`
     *
     * @param b - The second operand
     * @returns Dot product of `this` and `b`
     */
    dot(b) {
        return this[0] * b[0] + this[1] * b[1] + this[2] * b[2] + this[3] * b[3];
    }
    /**
     * Normalize `this`.
     * Equivalent to `Vec4.normalize(this, this);`
     *
     * @returns `this`
     */
    normalize() {
        return Vec4.normalize(this, this);
    }
    //===================
    // Static methods
    //===================
    /**
     * Creates a new, empty {@link Vec4}
     * @category Static
     *
     * @returns a new 4D vector
     */
    static create() {
        return new Vec4();
    }
    /**
     * Creates a new {@link Vec4} initialized with values from an existing vector
     * @category Static
     *
     * @param a - vector to clone
     * @returns a new 4D vector
     */
    static clone(a) {
        return new Vec4(a);
    }
    /**
     * Creates a new {@link Vec4} initialized with the given values
     * @category Static
     *
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @param w - W component
     * @returns a new 4D vector
     */
    static fromValues(x, y, z, w) {
        return new Vec4(x, y, z, w);
    }
    /**
     * Copy the values from one {@link Vec4} to another
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the source vector
     * @returns `out`
     */
    static copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }
    /**
     * Set the components of a {@link Vec4} to the given values
     * @category Static
     *
     * @param out - the receiving vector
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     * @param w - W component
     * @returns `out`
     */
    static set(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }
    /**
     * Adds two {@link Vec4}s
     * @category Static
     *
     * @param out - The receiving vector
     * @param a - The first operand
     * @param b - The second operand
     * @returns `out`
     */
    static add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
    }
    /**
     * Subtracts vector b from vector a
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        return out;
    }
    /**
     * Alias for {@link Vec4.subtract}
     * @category Static
     */
    static sub(out, a, b) { return out; }
    /**
     * Multiplies two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static multiply(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        out[3] = a[3] * b[3];
        return out;
    }
    /**
     * Alias for {@link Vec4.multiply}
     * @category Static
     */
    static mul(out, a, b) { return out; }
    /**
     * Divides two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        out[3] = a[3] / b[3];
        return out;
    }
    /**
     * Alias for {@link Vec4.divide}
     * @category Static
     */
    static div(out, a, b) { return out; }
    /**
     * Math.ceil the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to ceil
     * @returns `out`
     */
    static ceil(out, a) {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        out[2] = Math.ceil(a[2]);
        out[3] = Math.ceil(a[3]);
        return out;
    }
    /**
     * Math.floor the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to floor
     * @returns `out`
     */
    static floor(out, a) {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        out[2] = Math.floor(a[2]);
        out[3] = Math.floor(a[3]);
        return out;
    }
    /**
     * Returns the minimum of two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static min(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        out[3] = Math.min(a[3], b[3]);
        return out;
    }
    /**
     * Returns the maximum of two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @returns `out`
     */
    static max(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        out[3] = Math.max(a[3], b[3]);
        return out;
    }
    /**
     * Math.round the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to round
     * @returns `out`
     */
    static round(out, a) {
        out[0] = Math.round(a[0]);
        out[1] = Math.round(a[1]);
        out[2] = Math.round(a[2]);
        out[3] = Math.round(a[3]);
        return out;
    }
    /**
     * Scales a {@link Vec4} by a scalar number
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to scale
     * @param scale - amount to scale the vector by
     * @returns `out`
     */
    static scale(out, a, scale) {
        out[0] = a[0] * scale;
        out[1] = a[1] * scale;
        out[2] = a[2] * scale;
        out[3] = a[3] * scale;
        return out;
    }
    /**
     * Adds two {@link Vec4}'s after scaling the second operand by a scalar value
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param scale - the amount to scale b by before adding
     * @returns `out`
     */
    static scaleAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        out[3] = a[3] + b[3] * scale;
        return out;
    }
    /**
     * Calculates the euclidian distance between two {@link Vec4}'s
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns distance between a and b
     */
    static distance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return Math.hypot(x, y, z, w);
    }
    /**
     * Alias for {@link Vec4.distance}
     * @category Static
     */
    static dist(a, b) { return 0; }
    /**
     * Calculates the squared euclidian distance between two {@link Vec4}'s
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns squared distance between a and b
     */
    static squaredDistance(a, b) {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return x * x + y * y + z * z + w * w;
    }
    /**
     * Alias for {@link Vec4.squaredDistance}
     * @category Static
     */
    static sqrDist(a, b) { return 0; }
    /**
     * Calculates the magnitude (length) of a {@link Vec4}
     * @category Static
     *
     * @param a - vector to calculate length of
     * @returns length of `a`
     */
    static magnitude(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Alias for {@link Vec4.magnitude}
     * @category Static
     */
    static mag(a) { return 0; }
    /**
     * Alias for {@link Vec4.magnitude}
     * @category Static
     * @deprecated Use {@link Vec4.magnitude} to avoid conflicts with builtin `length` methods/attribs
     */
    // @ts-ignore: Length conflicts with Function.length
    static length(a) { return 0; }
    /**
     * Alias for {@link Vec4.magnitude}
     * @category Static
     * @deprecated Use {@link Vec4.mag}
     */
    static len(a) { return 0; }
    /**
     * Calculates the squared length of a {@link Vec4}
     * @category Static
     *
     * @param a - vector to calculate squared length of
     * @returns squared length of a
     */
    static squaredLength(a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        return x * x + y * y + z * z + w * w;
    }
    /**
     * Alias for {@link Vec4.squaredLength}
     * @category Static
     */
    static sqrLen(a) { return 0; }
    /**
     * Negates the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to negate
     * @returns `out`
     */
    static negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = -a[3];
        return out;
    }
    /**
     * Returns the inverse of the components of a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to invert
     * @returns `out`
     */
    static inverse(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        out[3] = 1.0 / a[3];
        return out;
    }
    /**
     * Normalize a {@link Vec4}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - vector to normalize
     * @returns `out`
     */
    static normalize(out, a) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        let len = x * x + y * y + z * z + w * w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
        return out;
    }
    /**
     * Calculates the dot product of two {@link Vec4}'s
     * @category Static
     *
     * @param a - the first operand
     * @param b - the second operand
     * @returns dot product of a and b
     */
    static dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    /**
     * Returns the cross-product of three vectors in a 4-dimensional space
     * @category Static
     *
     * @param out the receiving vector
     * @param u - the first vector
     * @param v - the second vector
     * @param w - the third vector
     * @returns result
     */
    static cross(out, u, v, w) {
        const a = v[0] * w[1] - v[1] * w[0];
        const b = v[0] * w[2] - v[2] * w[0];
        const c = v[0] * w[3] - v[3] * w[0];
        const d = v[1] * w[2] - v[2] * w[1];
        const e = v[1] * w[3] - v[3] * w[1];
        const f = v[2] * w[3] - v[3] * w[2];
        const g = u[0];
        const h = u[1];
        const i = u[2];
        const j = u[3];
        out[0] = h * f - i * e + j * d;
        out[1] = -(g * f) + i * c - j * b;
        out[2] = g * e - h * c + j * a;
        out[3] = -(g * d) + h * b - i * a;
        return out;
    }
    /**
     * Performs a linear interpolation between two {@link Vec4}'s
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     * @returns `out`
     */
    static lerp(out, a, b, t) {
        const ax = a[0];
        const ay = a[1];
        const az = a[2];
        const aw = a[3];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        out[3] = aw + t * (b[3] - aw);
        return out;
    }
    /**
     * Generates a random vector with the given scale
     * @category Static
     *
     * @param out - the receiving vector
     * @param [scale] - Length of the resulting vector. If ommitted, a unit vector will be returned
     * @returns `out`
     */
    /*static random(out: Vec4Like, scale): Vec4Like {
      scale = scale || 1.0;
  
      // Marsaglia, George. Choosing a Point from the Surface of a
      // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
      // http://projecteuclid.org/euclid.aoms/1177692644;
      var v1, v2, v3, v4;
      var s1, s2;
      do {
        v1 = glMatrix.RANDOM() * 2 - 1;
        v2 = glMatrix.RANDOM() * 2 - 1;
        s1 = v1 * v1 + v2 * v2;
      } while (s1 >= 1);
      do {
        v3 = glMatrix.RANDOM() * 2 - 1;
        v4 = glMatrix.RANDOM() * 2 - 1;
        s2 = v3 * v3 + v4 * v4;
      } while (s2 >= 1);
  
      var d = Math.sqrt((1 - s1) / s2);
      out[0] = scale * v1;
      out[1] = scale * v2;
      out[2] = scale * v3 * d;
      out[3] = scale * v4 * d;
      return out;
    }*/
    /**
     * Transforms the {@link Vec4} with a {@link Mat4}.
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param m - matrix to transform with
     * @returns `out`
     */
    static transformMat4(out, a, m) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
    }
    /**
     * Transforms the {@link Vec4} with a {@link Quat}
     * @category Static
     *
     * @param out - the receiving vector
     * @param a - the vector to transform
     * @param q - quaternion to transform with
     * @returns `out`
     */
    static transformQuat(out, a, q) {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const qw = q[3];
        // calculate quat * vec
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        out[3] = a[3];
        return out;
    }
    /**
     * Set the components of a {@link Vec4} to zero
     * @category Static
     *
     * @param out - the receiving vector
     * @returns `out`
     */
    static zero(out) {
        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        return out;
    }
    /**
     * Returns a string representation of a {@link Vec4}
     * @category Static
     *
     * @param a - vector to represent as a string
     * @returns string representation of the vector
     */
    static str(a) {
        return `Vec4(${a.join(', ')})`;
    }
    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     * @category Static
     *
     * @param a - The first vector.
     * @param b - The second vector.
     * @returns True if the vectors are equal, false otherwise.
     */
    static equals(a, b) {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const a3 = a[3];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        const b3 = b[3];
        return (Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
    }
}
// Instance method alias assignments
Vec4.prototype.sub = Vec4.prototype.subtract;
Vec4.prototype.mul = Vec4.prototype.multiply;
Vec4.prototype.div = Vec4.prototype.divide;
Vec4.prototype.dist = Vec4.prototype.distance;
Vec4.prototype.sqrDist = Vec4.prototype.squaredDistance;
// Static method alias assignments
Vec4.sub = Vec4.subtract;
Vec4.mul = Vec4.multiply;
Vec4.div = Vec4.divide;
Vec4.dist = Vec4.distance;
Vec4.sqrDist = Vec4.squaredDistance;
Vec4.sqrLen = Vec4.squaredLength;
Vec4.mag = Vec4.magnitude;
Vec4.length = Vec4.magnitude;
Vec4.len = Vec4.magnitude;
/**
 * Vec4 alias for backwards compatibility
 */
const vec4 = Vec4;
//# sourceMappingURL=vec4.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawCube: () => (/* binding */ drawCube)
/* harmony export */ });
/* harmony import */ var _shaders_cubeFragmentShader_frag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaders/cubeFragmentShader.frag */ "./src/shaders/cubeFragmentShader.frag");
/* harmony import */ var _shaders_cubeVertexShader_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/cubeVertexShader.vert */ "./src/shaders/cubeVertexShader.vert");
/* harmony import */ var _shaderHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaderHelper */ "./src/shaderHelper.ts");
/* harmony import */ var _node_modules_ts_gl_matrix_dist_src_mat4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node_modules/ts-gl-matrix/dist/src/mat4 */ "./node_modules/ts-gl-matrix/dist/src/mat4.js");
/* harmony import */ var _node_modules_ts_gl_matrix_dist_src_vec3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/ts-gl-matrix/dist/src/vec3 */ "./node_modules/ts-gl-matrix/dist/src/vec3.js");
/* harmony import */ var _node_modules_ts_gl_matrix_dist_src_quat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../node_modules/ts-gl-matrix/dist/src/quat */ "./node_modules/ts-gl-matrix/dist/src/quat.js");






const vertexBufferData = new Float32Array([
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
]);
var webglCanvas = document.getElementById('webgl-canvas');
var gl = webglCanvas.getContext("webgl2");
webglCanvas.width = webglCanvas.getBoundingClientRect().width;
webglCanvas.height = webglCanvas.getBoundingClientRect().height;
if (!gl) {
    console.error("Unable to initialize WebGL. Your browser may not support it.");
}
//enalbing blending for proper alpha 
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
//proper depth then drawing the cube
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LESS);
//compiling the shaders with a helper function
var vertexShader = (0,_shaderHelper__WEBPACK_IMPORTED_MODULE_2__.createShader)(gl, gl.VERTEX_SHADER, _shaders_cubeVertexShader_vert__WEBPACK_IMPORTED_MODULE_1__);
var fragmentShader = (0,_shaderHelper__WEBPACK_IMPORTED_MODULE_2__.createShader)(gl, gl.FRAGMENT_SHADER, _shaders_cubeFragmentShader_frag__WEBPACK_IMPORTED_MODULE_0__);
if (!vertexShader || !fragmentShader) {
    throw new Error("Shader creation failed");
}
//creating a WebGL program and attaching the shaders to it with a helper function
var program = (0,_shaderHelper__WEBPACK_IMPORTED_MODULE_2__.createProgram)(gl, vertexShader, fragmentShader);
if (!program) {
    throw new Error("Program creation failed");
}
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.STATIC_DRAW);
const mvpUniformLocation = gl.getUniformLocation(program, 'MVP');
drawCube(_node_modules_ts_gl_matrix_dist_src_vec3__WEBPACK_IMPORTED_MODULE_3__.Vec3.fromValues(0.3, 0.3, 0.3));
function createMVPMatrix(scale, rot) {
    let MVPMatrix = _node_modules_ts_gl_matrix_dist_src_mat4__WEBPACK_IMPORTED_MODULE_4__.Mat4.create();
    _node_modules_ts_gl_matrix_dist_src_mat4__WEBPACK_IMPORTED_MODULE_4__.Mat4.fromQuat(MVPMatrix, _node_modules_ts_gl_matrix_dist_src_quat__WEBPACK_IMPORTED_MODULE_5__.Quat.fromEuler(_node_modules_ts_gl_matrix_dist_src_quat__WEBPACK_IMPORTED_MODULE_5__.Quat.create(), rot.x, rot.y, rot.z));
    MVPMatrix.scale(scale);
    return MVPMatrix;
}
function drawCube(rot) {
    const rotation = _node_modules_ts_gl_matrix_dist_src_vec3__WEBPACK_IMPORTED_MODULE_3__.Vec3.fromValues(performance.now() / 1000.0, // Rotation around X
    performance.now() / 2000.0, // Rotation around Y
    performance.now() / 3000.0 // Rotation around Z
    );
    const mvpMatrix = createMVPMatrix(_node_modules_ts_gl_matrix_dist_src_vec3__WEBPACK_IMPORTED_MODULE_3__.Vec3.fromValues(0.3, 0.3, 0.3), rotation);
    (0,_shaderHelper__WEBPACK_IMPORTED_MODULE_2__.resizeCanvasToDisplaySize)(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0); // Clear to transparent black
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enableVertexAttribArray(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(mvpUniformLocation, false, mvpMatrix);
    // Tell it to use program (pair of shaders)
    gl.useProgram(program);
    console.log("hello");
    gl.drawArrays(gl.TRIANGLES, 0, 12 * 3);
    gl.disableVertexAttribArray(0);
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsV0FBVztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSx1QkFBdUIsV0FBVztBQUNsQztBQUNB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LHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsWUFBWTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZLGdDQUFnQyxZQUFZO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwrQ0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixZQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwrQ0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVksUUFBUSxZQUFZO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBDQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCLGdCQUFnQixjQUFjO0FBQzlCLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCLGdCQUFnQixjQUFjO0FBQzlCLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLHdCQUF3QiwwQkFBMEIsSUFBSSwwQkFBMEI7QUFDaEY7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCLG9CQUFvQixJQUFJLG9CQUFvQjtBQUNwRTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywrQ0FBTztBQUM5Qyx1Q0FBdUMsK0NBQU87QUFDOUMsdUNBQXVDLCtDQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFdBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrQ0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixjQUFjO0FBQzlCLGdCQUFnQixjQUFjO0FBQzlCLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLCtDQUFPO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBDQUFJO0FBQ3RCO0FBQ0EsWUFBWSwwQ0FBSTtBQUNoQixnQkFBZ0IsMENBQUk7QUFDcEIsZ0JBQWdCLDBDQUFJO0FBQ3BCLFlBQVksMENBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMENBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQ0FBSTtBQUN6QixvQkFBb0IsMENBQUk7QUFDeEIsc0JBQXNCLDBDQUFJO0FBQzFCLHNCQUFzQiwwQ0FBSTtBQUMxQjtBQUNBLFdBQVcsMENBQUk7QUFDZixXQUFXLDBDQUFJO0FBQ2YsWUFBWSwwQ0FBSTtBQUNoQixpQkFBaUIsMENBQUk7QUFDckIscUJBQXFCLDBDQUFJO0FBQ3pCLGNBQWMsMENBQUk7QUFDbEIsbUJBQW1CLDBDQUFJO0FBQ3ZCLGNBQWMsMENBQUk7QUFDbEIsaUJBQWlCLDBDQUFJO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDs7Ozs7Ozs7Ozs7Ozs7OztBQ2o1QnNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxnQ0FBZ0MsV0FBVztBQUMzQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkI7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkI7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBLGNBQWM7QUFDZCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsbUJBQW1CO0FBQ25CO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsbUJBQW1CO0FBQ25CO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFlBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEMsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQkFBK0IsV0FBVztBQUMxQyxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGFBQWE7QUFDYjtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxZQUFZO0FBQ3RFLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsY0FBYztBQUNkO0FBQ0Esa0VBQWtFLFlBQVk7QUFDOUUsb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFdBQVc7QUFDbEUsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFdBQVc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQywrQ0FBTztBQUM1QyxpQ0FBaUMsK0NBQU87QUFDeEMsaUNBQWlDLCtDQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Z0NzQztB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QUFDQTtBQUNBO0FBQ0EsY0FBYyw0REFBYTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsMEVBQUk7QUFDYjtBQUNBLG9CQUFvQiwwRUFBSTtBQUN4QixJQUFJLDBFQUFJLHFCQUFxQiwwRUFBSSxXQUFXLDBFQUFJO0FBQ2hEO0FBQ0E7QUFDQTtBQUNPO0FBQ1AscUJBQXFCLDBFQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywwRUFBSTtBQUMxQyxJQUFJLHdFQUF5QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jdWJldGhpbmcvLi9zcmMvc2hhZGVySGVscGVyLnRzIiwid2VicGFjazovL2N1YmV0aGluZy8uL25vZGVfbW9kdWxlcy90cy1nbC1tYXRyaXgvZGlzdC9zcmMvY29tbW9uLmpzIiwid2VicGFjazovL2N1YmV0aGluZy8uL25vZGVfbW9kdWxlcy90cy1nbC1tYXRyaXgvZGlzdC9zcmMvbWF0My5qcyIsIndlYnBhY2s6Ly9jdWJldGhpbmcvLi9ub2RlX21vZHVsZXMvdHMtZ2wtbWF0cml4L2Rpc3Qvc3JjL21hdDQuanMiLCJ3ZWJwYWNrOi8vY3ViZXRoaW5nLy4vbm9kZV9tb2R1bGVzL3RzLWdsLW1hdHJpeC9kaXN0L3NyYy9xdWF0LmpzIiwid2VicGFjazovL2N1YmV0aGluZy8uL25vZGVfbW9kdWxlcy90cy1nbC1tYXRyaXgvZGlzdC9zcmMvdmVjMy5qcyIsIndlYnBhY2s6Ly9jdWJldGhpbmcvLi9ub2RlX21vZHVsZXMvdHMtZ2wtbWF0cml4L2Rpc3Qvc3JjL3ZlYzQuanMiLCJ3ZWJwYWNrOi8vY3ViZXRoaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2N1YmV0aGluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY3ViZXRoaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3ViZXRoaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY3ViZXRoaW5nLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaGFkZXIoZ2wsIHR5cGUsIHNvdXJjZSkge1xuICAgIHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgaWYgKCFzaGFkZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgc2hhZGVyLicpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gICAgdmFyIHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIHNoYWRlcjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSB7XG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIHByb2dyYW0uJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICBnbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemUoY2FudmFzKSB7XG4gICAgLy8gTG9va3VwIHRoZSBzaXplIHRoZSBicm93c2VyIGlzIGRpc3BsYXlpbmcgdGhlIGNhbnZhcyBpbiBDU1MgcGl4ZWxzLlxuICAgIGNvbnN0IGRpc3BsYXlXaWR0aCA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBjb25zdCBkaXNwbGF5SGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICAvLyBDaGVjayBpZiB0aGUgY2FudmFzIGlzIG5vdCB0aGUgc2FtZSBzaXplLlxuICAgIGNvbnN0IG5lZWRSZXNpemUgPSBjYW52YXMud2lkdGggIT09IGRpc3BsYXlXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBkaXNwbGF5SGVpZ2h0O1xuICAgIGlmIChuZWVkUmVzaXplKSB7XG4gICAgICAgIC8vIE1ha2UgdGhlIGNhbnZhcyB0aGUgc2FtZSBzaXplXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGRpc3BsYXlXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGRpc3BsYXlIZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBuZWVkUmVzaXplO1xufVxuIiwiZXhwb3J0IGNvbnN0IEVQU0lMT04gPSAwLjAwMDAwMTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1vbi5qcy5tYXAiLCJpbXBvcnQgeyBFUFNJTE9OIH0gZnJvbSAnLi9jb21tb24uanMnO1xuY29uc3QgSURFTlRJVFlfM1gzID0gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgMSwgMCwgMCxcbiAgICAwLCAxLCAwLFxuICAgIDAsIDAsIDEsXG5dKTtcbi8qKlxuICogQSAzeDMgTWF0cml4XG4gKi9cbmV4cG9ydCBjbGFzcyBNYXQzIGV4dGVuZHMgRmxvYXQzMkFycmF5IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIGJ5dGVzIGluIGEge0BsaW5rIE1hdDN9LlxuICAgICAqL1xuICAgIHN0YXRpYyBCWVRFX0xFTkdUSCA9IDkgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEge0BsaW5rIE1hdDN9LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLnZhbHVlcykge1xuICAgICAgICBzd2l0Y2ggKHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBzdXBlcih2YWx1ZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHN1cGVyKHZhbHVlc1swXSwgdmFsdWVzWzFdLCA5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBjb25zdCB2ID0gdmFsdWVzWzBdO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoW1xuICAgICAgICAgICAgICAgICAgICAgICAgdiwgdiwgdixcbiAgICAgICAgICAgICAgICAgICAgICAgIHYsIHYsIHYsXG4gICAgICAgICAgICAgICAgICAgICAgICB2LCB2LCB2XG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIodiwgMCwgOSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzdXBlcihJREVOVElUWV8zWDMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vPT09PT09PT09PT09XG4gICAgLy8gQXR0cmlidXRlc1xuICAgIC8vPT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYHRoaXNgXG4gICAgICogRXF1aXZhbGVudCB0byBgTWF0My5zdHIodGhpcyk7YFxuICAgICAqL1xuICAgIGdldCBzdHIoKSB7XG4gICAgICAgIHJldHVybiBNYXQzLnN0cih0aGlzKTtcbiAgICB9XG4gICAgLy89PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSW5zdGFuY2UgbWV0aG9kc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIGFub3RoZXIge0BsaW5rIE1hdDN9IGludG8gYHRoaXNgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBjb3B5KGEpIHtcbiAgICAgICAgdGhpcy5zZXQoYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgYHRoaXNgIHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgKiBFcXVpdmFsZW50IHRvIE1hdDMuaWRlbnRpdHkodGhpcylcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIGlkZW50aXR5KCkge1xuICAgICAgICB0aGlzLnNldChJREVOVElUWV8zWDMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyB0aGlzIHtAbGluayBNYXQzfSBhZ2FpbnN0IGFub3RoZXIgb25lXG4gICAgICogRXF1aXZhbGVudCB0byBgTWF0My5tdWx0aXBseSh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyBNYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBtdWx0aXBseShiKSB7XG4gICAgICAgIHJldHVybiBNYXQzLm11bHRpcGx5KHRoaXMsIHRoaXMsIGIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIE1hdDMubXVsdGlwbHl9XG4gICAgICovXG4gICAgbXVsKGIpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3Bvc2UgdGhpcyB7QGxpbmsgTWF0M31cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQzLnRyYW5zcG9zZSh0aGlzLCB0aGlzKTtgXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICB0cmFuc3Bvc2UoKSB7XG4gICAgICAgIHJldHVybiBNYXQzLnRyYW5zcG9zZSh0aGlzLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52ZXJ0cyB0aGlzIHtAbGluayBNYXQzfVxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQuaW52ZXJ0KHRoaXMsIHRoaXMpO2BcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIGludmVydCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdDMuaW52ZXJ0KHRoaXMsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgdGhpcyB7QGxpbmsgTWF0M30gYnkgdGhlIGdpdmVuIHZlY3RvclxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDMudHJhbnNsYXRlKHRoaXMsIHRoaXMsIHYpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2IC0gVGhlIHtAbGluayBWZWMyfSB0byB0cmFuc2xhdGUgYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICB0cmFuc2xhdGUodikge1xuICAgICAgICByZXR1cm4gTWF0My50cmFuc2xhdGUodGhpcywgdGhpcywgdik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgdGhpcyB7QGxpbmsgTWF0M30gYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgZ2l2ZW4gYXhpc1xuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDMucm90YXRlKHRoaXMsIHRoaXMsIHJhZCk7YFxuICAgICAqXG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgcm90YXRlKHJhZCkge1xuICAgICAgICByZXR1cm4gTWF0My5yb3RhdGUodGhpcywgdGhpcywgcmFkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NhbGVzIHRoaXMge0BsaW5rIE1hdDN9IGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMzIG5vdCB1c2luZyB2ZWN0b3JpemF0aW9uXG4gICAgICogRXF1aXZhbGVudCB0byBgTWF0My5zY2FsZSh0aGlzLCB0aGlzLCB2KTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdiAtIFRoZSB7QGxpbmsgVmVjMn0gdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIHNjYWxlKHYpIHtcbiAgICAgICAgcmV0dXJuIE1hdDMuc2NhbGUodGhpcywgdGhpcywgdik7XG4gICAgfVxuICAgIC8vPT09PT09PT09PT09PT09PVxuICAgIC8vIFN0YXRpYyBtZXRob2RzXG4gICAgLy89PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldywgaWRlbnRpdHkge0BsaW5rIE1hdDN9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIE1hdDN9XG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXQzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIE1hdDN9IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSBNYXRyaXggdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgTWF0M31cbiAgICAgKi9cbiAgICBzdGF0aWMgY2xvbmUoYSkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDMoYSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB7QGxpbmsgTWF0M30gdG8gYW5vdGhlclxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSBUaGUgcmVjZWl2aW5nIE1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gTWF0cml4IHRvIGNvcHlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBjb3B5KG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdO1xuICAgICAgICBvdXRbMl0gPSBhWzJdO1xuICAgICAgICBvdXRbM10gPSBhWzNdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzZdO1xuICAgICAgICBvdXRbN10gPSBhWzddO1xuICAgICAgICBvdXRbOF0gPSBhWzhdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcge0BsaW5rIE1hdDN9IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBNYXRyaXggY29tcG9uZW50c1xuICAgICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBNYXQzfVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVmFsdWVzKC4uLnZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDMoLi4udmFsdWVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEge0BsaW5rIE1hdDN9IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gdmFsdWVzIC0gTWF0cml4IGNvbXBvbmVudHNcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQob3V0LCAuLi52YWx1ZXMpIHtcbiAgICAgICAgb3V0WzBdID0gdmFsdWVzWzBdO1xuICAgICAgICBvdXRbMV0gPSB2YWx1ZXNbMV07XG4gICAgICAgIG91dFsyXSA9IHZhbHVlc1syXTtcbiAgICAgICAgb3V0WzNdID0gdmFsdWVzWzNdO1xuICAgICAgICBvdXRbNF0gPSB2YWx1ZXNbNF07XG4gICAgICAgIG91dFs1XSA9IHZhbHVlc1s1XTtcbiAgICAgICAgb3V0WzZdID0gdmFsdWVzWzZdO1xuICAgICAgICBvdXRbN10gPSB2YWx1ZXNbN107XG4gICAgICAgIG91dFs4XSA9IHZhbHVlc1s4XTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEge0BsaW5rIE1hdDN9IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBpZGVudGl0eShvdXQpIHtcbiAgICAgICAgb3V0WzBdID0gMTtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMTtcbiAgICAgICAgb3V0WzVdID0gMDtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSB7QGxpbmsgTWF0M31cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBzb3VyY2UgbWF0cml4XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNwb3NlKG91dCwgYSkge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGExMiA9IGFbNV07XG4gICAgICAgICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgICAgICAgIG91dFszXSA9IGEwMTtcbiAgICAgICAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICAgICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICAgICAgICBvdXRbN10gPSBhMTI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgICAgICAgIG91dFsyXSA9IGFbNl07XG4gICAgICAgICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgICAgICAgb3V0WzRdID0gYVs0XTtcbiAgICAgICAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICAgICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgICAgICAgb3V0WzddID0gYVs1XTtcbiAgICAgICAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52ZXJ0cyBhIHtAbGluayBNYXQzfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHNvdXJjZSBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBpbnZlcnQob3V0LCBhKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMF0sIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV07XG4gICAgICAgIGNvbnN0IGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XG4gICAgICAgIGNvbnN0IGIwMSA9IGEyMiAqIGExMSAtIGExMiAqIGEyMTtcbiAgICAgICAgY29uc3QgYjExID0gLWEyMiAqIGExMCArIGExMiAqIGEyMDtcbiAgICAgICAgY29uc3QgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwO1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIGxldCBkZXQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjE7XG4gICAgICAgIGlmICghZGV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICAgICAgb3V0WzFdID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xuICAgICAgICBvdXRbMl0gPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcbiAgICAgICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgICAgICBvdXRbNF0gPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcbiAgICAgICAgb3V0WzVdID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xuICAgICAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgICAgIG91dFs3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcbiAgICAgICAgb3V0WzhdID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEge0BsaW5rIE1hdDN9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIGEgLSB0aGUgc291cmNlIG1hdHJpeFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGFkam9pbnQob3V0LCBhKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGExMCA9IGFbM107XG4gICAgICAgIGNvbnN0IGExMSA9IGFbNF07XG4gICAgICAgIGNvbnN0IGExMiA9IGFbNV07XG4gICAgICAgIGNvbnN0IGEyMCA9IGFbNl07XG4gICAgICAgIGNvbnN0IGEyMSA9IGFbN107XG4gICAgICAgIGNvbnN0IGEyMiA9IGFbOF07XG4gICAgICAgIG91dFswXSA9IGExMSAqIGEyMiAtIGExMiAqIGEyMTtcbiAgICAgICAgb3V0WzFdID0gYTAyICogYTIxIC0gYTAxICogYTIyO1xuICAgICAgICBvdXRbMl0gPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgICAgIG91dFszXSA9IGExMiAqIGEyMCAtIGExMCAqIGEyMjtcbiAgICAgICAgb3V0WzRdID0gYTAwICogYTIyIC0gYTAyICogYTIwO1xuICAgICAgICBvdXRbNV0gPSBhMDIgKiBhMTAgLSBhMDAgKiBhMTI7XG4gICAgICAgIG91dFs2XSA9IGExMCAqIGEyMSAtIGExMSAqIGEyMDtcbiAgICAgICAgb3V0WzddID0gYTAxICogYTIwIC0gYTAwICogYTIxO1xuICAgICAgICBvdXRbOF0gPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEge0BsaW5rIE1hdDN9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSB0aGUgc291cmNlIG1hdHJpeFxuICAgICAqIEByZXR1cm5zIGRldGVybWluYW50IG9mIGFcbiAgICAgKi9cbiAgICBzdGF0aWMgZGV0ZXJtaW5hbnQoYSkge1xuICAgICAgICBjb25zdCBhMDAgPSBhWzBdO1xuICAgICAgICBjb25zdCBhMDEgPSBhWzFdO1xuICAgICAgICBjb25zdCBhMDIgPSBhWzJdO1xuICAgICAgICBjb25zdCBhMTAgPSBhWzNdO1xuICAgICAgICBjb25zdCBhMTEgPSBhWzRdO1xuICAgICAgICBjb25zdCBhMTIgPSBhWzVdO1xuICAgICAgICBjb25zdCBhMjAgPSBhWzZdO1xuICAgICAgICBjb25zdCBhMjEgPSBhWzddO1xuICAgICAgICBjb25zdCBhMjIgPSBhWzhdO1xuICAgICAgICByZXR1cm4gKGEwMCAqIChhMjIgKiBhMTEgLSBhMTIgKiBhMjEpICtcbiAgICAgICAgICAgIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArXG4gICAgICAgICAgICBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgdHdvIHtAbGluayBNYXQzfSdzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkKG91dCwgYSwgYikge1xuICAgICAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgICAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICAgICAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gICAgICAgIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICAgICAgb3V0WzddID0gYVs3XSArIGJbN107XG4gICAgICAgIG91dFs4XSA9IGFbOF0gKyBiWzhdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICAgICAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgICAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICAgICAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gICAgICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzZdIC0gYls2XTtcbiAgICAgICAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gICAgICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIE1hdDMuc3VidHJhY3R9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzdWIob3V0LCBhLCBiKSB7IHJldHVybiBvdXQ7IH1cbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIHR3byB7QGxpbmsgTWF0M31zXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIFRoZSByZWNlaXZpbmcgTWF0cml4XG4gICAgICogQHBhcmFtIGEgLSBUaGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGExMCA9IGFbM107XG4gICAgICAgIGNvbnN0IGExMSA9IGFbNF07XG4gICAgICAgIGNvbnN0IGExMiA9IGFbNV07XG4gICAgICAgIGNvbnN0IGEyMCA9IGFbNl07XG4gICAgICAgIGNvbnN0IGEyMSA9IGFbN107XG4gICAgICAgIGNvbnN0IGEyMiA9IGFbOF07XG4gICAgICAgIGxldCBiMCA9IGJbMF07XG4gICAgICAgIGxldCBiMSA9IGJbMV07XG4gICAgICAgIGxldCBiMiA9IGJbMl07XG4gICAgICAgIG91dFswXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMDtcbiAgICAgICAgb3V0WzFdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxO1xuICAgICAgICBvdXRbMl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjI7XG4gICAgICAgIGIwID0gYlszXTtcbiAgICAgICAgYjEgPSBiWzRdO1xuICAgICAgICBiMiA9IGJbNV07XG4gICAgICAgIG91dFszXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMDtcbiAgICAgICAgb3V0WzRdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxO1xuICAgICAgICBvdXRbNV0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjI7XG4gICAgICAgIGIwID0gYls2XTtcbiAgICAgICAgYjEgPSBiWzddO1xuICAgICAgICBiMiA9IGJbOF07XG4gICAgICAgIG91dFs2XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMDtcbiAgICAgICAgb3V0WzddID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxO1xuICAgICAgICBvdXRbOF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgTWF0My5tdWx0aXBseX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG11bChvdXQsIGEsIGIpIHsgcmV0dXJuIG91dDsgfVxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZSBhIHtAbGluayBNYXQzfSBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIGEgLSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICAgICAqIEBwYXJhbSB2IC0gdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYVswXTtcbiAgICAgICAgY29uc3QgYTAxID0gYVsxXTtcbiAgICAgICAgY29uc3QgYTAyID0gYVsyXTtcbiAgICAgICAgY29uc3QgYTEwID0gYVszXTtcbiAgICAgICAgY29uc3QgYTExID0gYVs0XTtcbiAgICAgICAgY29uc3QgYTEyID0gYVs1XTtcbiAgICAgICAgY29uc3QgYTIwID0gYVs2XTtcbiAgICAgICAgY29uc3QgYTIxID0gYVs3XTtcbiAgICAgICAgY29uc3QgYTIyID0gYVs4XTtcbiAgICAgICAgY29uc3QgeCA9IHZbMF07XG4gICAgICAgIGNvbnN0IHkgPSB2WzFdO1xuICAgICAgICBvdXRbMF0gPSBhMDA7XG4gICAgICAgIG91dFsxXSA9IGEwMTtcbiAgICAgICAgb3V0WzJdID0gYTAyO1xuICAgICAgICBvdXRbM10gPSBhMTA7XG4gICAgICAgIG91dFs0XSA9IGExMTtcbiAgICAgICAgb3V0WzVdID0gYTEyO1xuICAgICAgICBvdXRbNl0gPSB4ICogYTAwICsgeSAqIGExMCArIGEyMDtcbiAgICAgICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgICAgIG91dFs4XSA9IHggKiBhMDIgKyB5ICogYTEyICsgYTIyO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEge0BsaW5rIE1hdDN9IGJ5IHRoZSBnaXZlbiBhbmdsZVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICAgKiBAcGFyYW0gcmFkIC0gdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlKG91dCwgYSwgcmFkKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGExMCA9IGFbM107XG4gICAgICAgIGNvbnN0IGExMSA9IGFbNF07XG4gICAgICAgIGNvbnN0IGExMiA9IGFbNV07XG4gICAgICAgIGNvbnN0IGEyMCA9IGFbNl07XG4gICAgICAgIGNvbnN0IGEyMSA9IGFbN107XG4gICAgICAgIGNvbnN0IGEyMiA9IGFbOF07XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgb3V0WzBdID0gYyAqIGEwMCArIHMgKiBhMTA7XG4gICAgICAgIG91dFsxXSA9IGMgKiBhMDEgKyBzICogYTExO1xuICAgICAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcbiAgICAgICAgb3V0WzNdID0gYyAqIGExMCAtIHMgKiBhMDA7XG4gICAgICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgICAgICBvdXRbNV0gPSBjICogYTEyIC0gcyAqIGEwMjtcbiAgICAgICAgb3V0WzZdID0gYTIwO1xuICAgICAgICBvdXRbN10gPSBhMjE7XG4gICAgICAgIG91dFs4XSA9IGEyMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NhbGVzIHRoZSB7QGxpbmsgTWF0M30gYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHtAbGluayBWZWMyfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIG1hdHJpeCB0byBzY2FsZVxuICAgICAqIEBwYXJhbSB2IC0gdGhlIHtAbGluayBWZWMyfSB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKiovXG4gICAgc3RhdGljIHNjYWxlKG91dCwgYSwgdikge1xuICAgICAgICBjb25zdCB4ID0gdlswXTtcbiAgICAgICAgY29uc3QgeSA9IHZbMV07XG4gICAgICAgIG91dFswXSA9IHggKiBhWzBdO1xuICAgICAgICBvdXRbMV0gPSB4ICogYVsxXTtcbiAgICAgICAgb3V0WzJdID0geCAqIGFbMl07XG4gICAgICAgIG91dFszXSA9IHkgKiBhWzNdO1xuICAgICAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICAgICAgb3V0WzVdID0geSAqIGFbNV07XG4gICAgICAgIG91dFs2XSA9IGFbNl07XG4gICAgICAgIG91dFs3XSA9IGFbN107XG4gICAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgTWF0M30gZnJvbSBhIHZlY3RvciB0cmFuc2xhdGlvblxuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDMudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHtAbGluayBNYXQzfSByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgICAqIEBwYXJhbSB2IC0gVHJhbnNsYXRpb24gdmVjdG9yXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVRyYW5zbGF0aW9uKG91dCwgdikge1xuICAgICAgICBvdXRbMF0gPSAxO1xuICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSAxO1xuICAgICAgICBvdXRbNV0gPSAwO1xuICAgICAgICBvdXRbNl0gPSB2WzBdO1xuICAgICAgICBvdXRbN10gPSB2WzFdO1xuICAgICAgICBvdXRbOF0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIE1hdDN9IGZyb20gYSBnaXZlbiBhbmdsZSBhcm91bmQgYSBnaXZlbiBheGlzXG4gICAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAgICpcbiAgICAgKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcbiAgICAgKiAgICAgbWF0My5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0ge0BsaW5rIE1hdDN9IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZyb21Sb3RhdGlvbihvdXQsIHJhZCkge1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIG91dFswXSA9IGM7XG4gICAgICAgIG91dFsxXSA9IHM7XG4gICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgIG91dFszXSA9IC1zO1xuICAgICAgICBvdXRbNF0gPSBjO1xuICAgICAgICBvdXRbNV0gPSAwO1xuICAgICAgICBvdXRbNl0gPSAwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIE1hdDN9IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDMuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0ge0BsaW5rIE1hdDN9IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAgICogQHBhcmFtIHYgLSBTY2FsaW5nIHZlY3RvclxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZyb21TY2FsaW5nKG91dCwgdikge1xuICAgICAgICBvdXRbMF0gPSB2WzBdO1xuICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSB2WzFdO1xuICAgICAgICBvdXRbNV0gPSAwO1xuICAgICAgICBvdXRbNl0gPSAwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBvZiBhIHtAbGluayBNYXQyZH0gaW50byB0aGUgZ2l2ZW5cbiAgICAgKiB7QGxpbmsgTWF0M30uXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgM3gzIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHNvdXJjZSAyeDMgbWF0cml4XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbU1hdDJkKG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdO1xuICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICBvdXRbM10gPSBhWzJdO1xuICAgICAgICBvdXRbNF0gPSBhWzNdO1xuICAgICAgICBvdXRbNV0gPSAwO1xuICAgICAgICBvdXRbNl0gPSBhWzRdO1xuICAgICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgICBvdXRbOF0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGEge0BsaW5rIE1hdDN9IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB7QGxpbmsgTWF0M30gcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gcSAtIHtAbGluayBRdWF0fSB0byBjcmVhdGUgbWF0cml4IGZyb21cbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICAgICAgY29uc3QgeCA9IHFbMF07XG4gICAgICAgIGNvbnN0IHkgPSBxWzFdO1xuICAgICAgICBjb25zdCB6ID0gcVsyXTtcbiAgICAgICAgY29uc3QgdyA9IHFbM107XG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XG4gICAgICAgIGNvbnN0IHoyID0geiArIHo7XG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB5eCA9IHkgKiB4MjtcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XG4gICAgICAgIGNvbnN0IHp4ID0geiAqIHgyO1xuICAgICAgICBjb25zdCB6eSA9IHogKiB5MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG4gICAgICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgICAgICBvdXRbM10gPSB5eCAtIHd6O1xuICAgICAgICBvdXRbNl0gPSB6eCArIHd5O1xuICAgICAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgICAgICBvdXRbNF0gPSAxIC0geHggLSB6ejtcbiAgICAgICAgb3V0WzddID0genkgLSB3eDtcbiAgICAgICAgb3V0WzJdID0genggLSB3eTtcbiAgICAgICAgb3V0WzVdID0genkgKyB3eDtcbiAgICAgICAgb3V0WzhdID0gMSAtIHh4IC0geXk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvcGllcyB0aGUgdXBwZXItbGVmdCAzeDMgdmFsdWVzIG9mIGEge0BsaW5rIE1hdDR9IGludG8gdGhlIGdpdmVuXG4gICAgICoge0BsaW5rIE1hdDN9LlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIDN4MyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBzb3VyY2UgNHg0IG1hdHJpeFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZyb21NYXQ0KG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdO1xuICAgICAgICBvdXRbMl0gPSBhWzJdO1xuICAgICAgICBvdXRbM10gPSBhWzRdO1xuICAgICAgICBvdXRbNF0gPSBhWzVdO1xuICAgICAgICBvdXRbNV0gPSBhWzZdO1xuICAgICAgICBvdXRbNl0gPSBhWzhdO1xuICAgICAgICBvdXRbN10gPSBhWzldO1xuICAgICAgICBvdXRbOF0gPSBhWzEwXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBhIDN4MyBub3JtYWwgbWF0cml4ICh0cmFuc3Bvc2UgaW52ZXJzZSkgZnJvbSB0aGUgNHg0IG1hdHJpeFxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBNYXQ0IHRvIGRlcml2ZSB0aGUgbm9ybWFsIG1hdHJpeCBmcm9tXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbm9ybWFsRnJvbU1hdDQob3V0LCBhKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGEwMyA9IGFbM107XG4gICAgICAgIGNvbnN0IGExMCA9IGFbNF07XG4gICAgICAgIGNvbnN0IGExMSA9IGFbNV07XG4gICAgICAgIGNvbnN0IGExMiA9IGFbNl07XG4gICAgICAgIGNvbnN0IGExMyA9IGFbN107XG4gICAgICAgIGNvbnN0IGEyMCA9IGFbOF07XG4gICAgICAgIGNvbnN0IGEyMSA9IGFbOV07XG4gICAgICAgIGNvbnN0IGEyMiA9IGFbMTBdO1xuICAgICAgICBjb25zdCBhMjMgPSBhWzExXTtcbiAgICAgICAgY29uc3QgYTMwID0gYVsxMl07XG4gICAgICAgIGNvbnN0IGEzMSA9IGFbMTNdO1xuICAgICAgICBjb25zdCBhMzIgPSBhWzE0XTtcbiAgICAgICAgY29uc3QgYTMzID0gYVsxNV07XG4gICAgICAgIGNvbnN0IGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICAgICAgY29uc3QgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgICAgICBjb25zdCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICAgICAgY29uc3QgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICAgICAgICBjb25zdCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgICAgIGNvbnN0IGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgICAgICBjb25zdCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICAgICAgY29uc3QgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICAgICAgICBjb25zdCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbiAgICAgICAgaWYgKCFkZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcbiAgICAgICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIG91dFsxXSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXRbMl0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICAgICAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIG91dFs0XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICAgICAgb3V0WzZdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgICAgIG91dFs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgICAgICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgMkQgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCBtYXQzIGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAgICogQHBhcmFtIHdpZHRoIFdpZHRoIG9mIHlvdXIgZ2wgY29udGV4dFxuICAgICAqIEBwYXJhbSBoZWlnaHQgSGVpZ2h0IG9mIGdsIGNvbnRleHRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBwcm9qZWN0aW9uKG91dCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBvdXRbMF0gPSAyIC8gd2lkdGg7XG4gICAgICAgIG91dFsxXSA9IDA7XG4gICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgIG91dFszXSA9IDA7XG4gICAgICAgIG91dFs0XSA9IC0yIC8gaGVpZ2h0O1xuICAgICAgICBvdXRbNV0gPSAwO1xuICAgICAgICBvdXRbNl0gPSAtMTtcbiAgICAgICAgb3V0WzddID0gMTtcbiAgICAgICAgb3V0WzhdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIHtAbGluayBNYXQzfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAgICAgKiBAcmV0dXJucyBGcm9iZW5pdXMgbm9ybVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9iKGEpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhWzBdICogYVswXSArXG4gICAgICAgICAgICBhWzFdICogYVsxXSArXG4gICAgICAgICAgICBhWzJdICogYVsyXSArXG4gICAgICAgICAgICBhWzNdICogYVszXSArXG4gICAgICAgICAgICBhWzRdICogYVs0XSArXG4gICAgICAgICAgICBhWzVdICogYVs1XSArXG4gICAgICAgICAgICBhWzZdICogYVs2XSArXG4gICAgICAgICAgICBhWzddICogYVs3XSArXG4gICAgICAgICAgICBhWzhdICogYVs4XSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiBhIHtAbGluayBNYXQzfSBieSBhIHNjYWxhci5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAgICAgKiBAcGFyYW0gYiAtIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhcihvdXQsIGEsIGIpIHtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICAgICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgICAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICAgICAgb3V0WzZdID0gYVs2XSAqIGI7XG4gICAgICAgIG91dFs3XSA9IGFbN10gKiBiO1xuICAgICAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0d28ge0BsaW5rIE1hdDN9J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gc2NhbGUgLSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXJBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgICAgICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICAgICAgICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICAgICAgICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICAgICAgICBvdXRbNl0gPSBhWzZdICsgYls2XSAqIHNjYWxlO1xuICAgICAgICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICAgICAgICBvdXRbOF0gPSBhWzhdICsgYls4XSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHR3byB7QGxpbmsgTWF0M31zIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBtYXRyaXguXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZXhhY3RFcXVhbHMoYSwgYikge1xuICAgICAgICByZXR1cm4gKGFbMF0gPT09IGJbMF0gJiZcbiAgICAgICAgICAgIGFbMV0gPT09IGJbMV0gJiZcbiAgICAgICAgICAgIGFbMl0gPT09IGJbMl0gJiZcbiAgICAgICAgICAgIGFbM10gPT09IGJbM10gJiZcbiAgICAgICAgICAgIGFbNF0gPT09IGJbNF0gJiZcbiAgICAgICAgICAgIGFbNV0gPT09IGJbNV0gJiZcbiAgICAgICAgICAgIGFbNl0gPT09IGJbNl0gJiZcbiAgICAgICAgICAgIGFbN10gPT09IGJbN10gJiZcbiAgICAgICAgICAgIGFbOF0gPT09IGJbOF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHR3byB7QGxpbmsgTWF0M31zIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBtYXRyaXguXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICAgICAgY29uc3QgYTAgPSBhWzBdO1xuICAgICAgICBjb25zdCBhMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEyID0gYVsyXTtcbiAgICAgICAgY29uc3QgYTMgPSBhWzNdO1xuICAgICAgICBjb25zdCBhNCA9IGFbNF07XG4gICAgICAgIGNvbnN0IGE1ID0gYVs1XTtcbiAgICAgICAgY29uc3QgYTYgPSBhWzZdO1xuICAgICAgICBjb25zdCBhNyA9IGFbN107XG4gICAgICAgIGNvbnN0IGE4ID0gYVs4XTtcbiAgICAgICAgY29uc3QgYjAgPSBiWzBdO1xuICAgICAgICBjb25zdCBiMSA9IGJbMV07XG4gICAgICAgIGNvbnN0IGIyID0gYlsyXTtcbiAgICAgICAgY29uc3QgYjMgPSBiWzNdO1xuICAgICAgICBjb25zdCBiNCA9IGJbNF07XG4gICAgICAgIGNvbnN0IGI1ID0gYls1XTtcbiAgICAgICAgY29uc3QgYjYgPSBiWzZdO1xuICAgICAgICBjb25zdCBiNyA9IGJbN107XG4gICAgICAgIGNvbnN0IGI4ID0gYls4XTtcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMyAtIGIzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhNCAtIGI0KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTQpLCBNYXRoLmFicyhiNCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhNSAtIGI1KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhNiAtIGI2KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTYpLCBNYXRoLmFicyhiNikpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhNyAtIGI3KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTcpLCBNYXRoLmFicyhiNykpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhOCAtIGI4KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHtAbGluayBNYXQzfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gICAgICovXG4gICAgc3RhdGljIHN0cihhKSB7XG4gICAgICAgIHJldHVybiBgTWF0Mygke2Euam9pbignLCAnKX0pYDtcbiAgICB9XG59XG4vLyBJbnN0YW5jZSBtZXRob2QgYWxpYXMgYXNzaWdubWVudHNcbk1hdDMucHJvdG90eXBlLm11bCA9IE1hdDMucHJvdG90eXBlLm11bHRpcGx5O1xuLy8gU3RhdGljIG1ldGhvZCBhbGlhcyBhc3NpZ25tZW50c1xuTWF0My5tdWwgPSBNYXQzLm11bHRpcGx5O1xuTWF0My5zdWIgPSBNYXQzLnN1YnRyYWN0O1xuLyoqXG4gKiB7QGxpbmsgTWF0M30gYWxpYXMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKi9cbmV4cG9ydCBjb25zdCBtYXQzID0gTWF0Mztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdDMuanMubWFwIiwiaW1wb3J0IHsgRVBTSUxPTiB9IGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCB7IFZlYzMgfSBmcm9tICcuL3ZlYzMuanMnO1xuY29uc3QgSURFTlRJVFlfNFg0ID0gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgMSwgMCwgMCwgMCxcbiAgICAwLCAxLCAwLCAwLFxuICAgIDAsIDAsIDEsIDAsXG4gICAgMCwgMCwgMCwgMSxcbl0pO1xuLyoqXG4gKiBBIDR4NCBNYXRyaXhcbiAqL1xuZXhwb3J0IGNsYXNzIE1hdDQgZXh0ZW5kcyBGbG9hdDMyQXJyYXkge1xuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgYnl0ZXMgaW4gYSB7QGxpbmsgTWF0NH0uXG4gICAgICovXG4gICAgc3RhdGljIEJZVEVfTEVOR1RIID0gMTYgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQ7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEge0BsaW5rIE1hdDR9LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLnZhbHVlcykge1xuICAgICAgICBzd2l0Y2ggKHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgICAgc3VwZXIodmFsdWVzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzdXBlcih2YWx1ZXNbMF0sIHZhbHVlc1sxXSwgMTYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSB2YWx1ZXNbMF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzdXBlcihbXG4gICAgICAgICAgICAgICAgICAgICAgICB2LCB2LCB2LCB2LFxuICAgICAgICAgICAgICAgICAgICAgICAgdiwgdiwgdiwgdixcbiAgICAgICAgICAgICAgICAgICAgICAgIHYsIHYsIHYsIHYsXG4gICAgICAgICAgICAgICAgICAgICAgICB2LCB2LCB2LCB2XG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIodiwgMCwgMTYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc3VwZXIoSURFTlRJVFlfNFg0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLz09PT09PT09PT09PVxuICAgIC8vIEF0dHJpYnV0ZXNcbiAgICAvLz09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGB0aGlzYFxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQuc3RyKHRoaXMpO2BcbiAgICAgKi9cbiAgICBnZXQgc3RyKCkge1xuICAgICAgICByZXR1cm4gTWF0NC5zdHIodGhpcyk7XG4gICAgfVxuICAgIC8vPT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEluc3RhbmNlIG1ldGhvZHNcbiAgICAvLz09PT09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBhbm90aGVyIHtAbGluayBNYXQ0fSBpbnRvIGB0aGlzYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgY29weShhKSB7XG4gICAgICAgIHRoaXMuc2V0KGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGB0aGlzYCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAgICogRXF1aXZhbGVudCB0byBNYXQ0LmlkZW50aXR5KHRoaXMpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgdGhpcy5zZXQoSURFTlRJVFlfNFg0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgdGhpcyB7QGxpbmsgTWF0NH0gYWdhaW5zdCBhbm90aGVyIG9uZVxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQubXVsdGlwbHkodGhpcywgdGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIFRoZSByZWNlaXZpbmcgTWF0cml4XG4gICAgICogQHBhcmFtIGEgLSBUaGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgbXVsdGlwbHkoYikge1xuICAgICAgICByZXR1cm4gTWF0NC5tdWx0aXBseSh0aGlzLCB0aGlzLCBiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBNYXQ0Lm11bHRpcGx5fVxuICAgICAqL1xuICAgIG11bChiKSB7IHJldHVybiB0aGlzOyB9XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3NlIHRoaXMge0BsaW5rIE1hdDR9XG4gICAgICogRXF1aXZhbGVudCB0byBgTWF0NC50cmFuc3Bvc2UodGhpcywgdGhpcyk7YFxuICAgICAqXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgdHJhbnNwb3NlKCkge1xuICAgICAgICByZXR1cm4gTWF0NC50cmFuc3Bvc2UodGhpcywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludmVydHMgdGhpcyB7QGxpbmsgTWF0NH1cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQ0LmludmVydCh0aGlzLCB0aGlzKTtgXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBpbnZlcnQoKSB7XG4gICAgICAgIHJldHVybiBNYXQ0LmludmVydCh0aGlzLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlIHRoaXMge0BsaW5rIE1hdDR9IGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQ0LnRyYW5zbGF0ZSh0aGlzLCB0aGlzLCB2KTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdiAtIFRoZSB7QGxpbmsgVmVjM30gdG8gdHJhbnNsYXRlIGJ5XG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgdHJhbnNsYXRlKHYpIHtcbiAgICAgICAgcmV0dXJuIE1hdDQudHJhbnNsYXRlKHRoaXMsIHRoaXMsIHYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoaXMge0BsaW5rIE1hdDR9IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQ0LnJvdGF0ZSh0aGlzLCB0aGlzLCByYWQsIGF4aXMpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSByYWQgLSB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICAgKiBAcGFyYW0gYXhpcyAtIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHJvdGF0ZShyYWQsIGF4aXMpIHtcbiAgICAgICAgcmV0dXJuIE1hdDQucm90YXRlKHRoaXMsIHRoaXMsIHJhZCwgYXhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjYWxlcyB0aGlzIHtAbGluayBNYXQ0fSBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMyBub3QgdXNpbmcgdmVjdG9yaXphdGlvblxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQuc2NhbGUodGhpcywgdGhpcywgdik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIHYgLSBUaGUge0BsaW5rIFZlYzN9IHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBzY2FsZSh2KSB7XG4gICAgICAgIHJldHVybiBNYXQ0LnNjYWxlKHRoaXMsIHRoaXMsIHYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIHRoaXMge0BsaW5rIE1hdDR9IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQucm90YXRlWCh0aGlzLCB0aGlzLCByYWQpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSByYWQgLSB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICByb3RhdGVYKHJhZCkge1xuICAgICAgICByZXR1cm4gTWF0NC5yb3RhdGVYKHRoaXMsIHRoaXMsIHJhZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgdGhpcyB7QGxpbmsgTWF0NH0gYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gICAgICogRXF1aXZhbGVudCB0byBgTWF0NC5yb3RhdGVZKHRoaXMsIHRoaXMsIHJhZCk7YFxuICAgICAqXG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIHJvdGF0ZVkocmFkKSB7XG4gICAgICAgIHJldHVybiBNYXQ0LnJvdGF0ZVkodGhpcywgdGhpcywgcmFkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm90YXRlcyB0aGlzIHtAbGluayBNYXQ0fSBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQ0LnJvdGF0ZVoodGhpcywgdGhpcywgcmFkKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmFkIC0gdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcm90YXRlWihyYWQpIHtcbiAgICAgICAgcmV0dXJuIE1hdDQucm90YXRlWih0aGlzLCB0aGlzLCByYWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gICAgICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWy0xLCAxXSxcbiAgICAgKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICAgICAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQucGVyc3BlY3RpdmVOTyh0aGlzLCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGZvdnkgLSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAgICAgKiBAcGFyYW0gYXNwZWN0IC0gQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gICAgICogQHBhcmFtIG5lYXIgLSBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIGZhciAtIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bSwgY2FuIGJlIG51bGwgb3IgSW5maW5pdHlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBwZXJzcGVjdGl2ZU5PKGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgICAgIHJldHVybiBNYXQ0LnBlcnNwZWN0aXZlTk8odGhpcywgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCBzdWl0YWJsZSBmb3IgV2ViR1BVIHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAgICAgKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbMCwgMV0sXG4gICAgICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAgICAgKiBQYXNzaW5nIG51bGwvdW5kZWZpbmVkL25vIHZhbHVlIGZvciBmYXIgd2lsbCBnZW5lcmF0ZSBpbmZpbml0ZSBwcm9qZWN0aW9uIG1hdHJpeC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQ0LnBlcnNwZWN0aXZlWk8odGhpcywgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBmb3Z5IC0gVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gICAgICogQHBhcmFtIGFzcGVjdCAtIEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICAgICAqIEBwYXJhbSBuZWFyIC0gTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSBmYXIgLSBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW0sIGNhbiBiZSBudWxsIG9yIEluZmluaXR5XG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcGVyc3BlY3RpdmVaTyhmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgICAgICByZXR1cm4gTWF0NC5wZXJzcGVjdGl2ZVpPKHRoaXMsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gICAgICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWy0xLCAxXSxcbiAgICAgKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYE1hdDQub3J0aG9OTyh0aGlzLCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGxlZnQgLSBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIHJpZ2h0IC0gUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gYm90dG9tIC0gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIHRvcCAtIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSBuZWFyIC0gTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSBmYXIgLSBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBvcnRob05PKGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgICAgIHJldHVybiBNYXQ0Lm9ydGhvTk8odGhpcywgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAgICAgKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbMCwgMV0sXG4gICAgICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBNYXQ0Lm9ydGhvWk8odGhpcywgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsZWZ0IC0gTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSByaWdodCAtIFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIGJvdHRvbSAtIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSB0b3AgLSBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gbmVhciAtIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gZmFyIC0gRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgb3J0aG9aTyhsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgICAgICByZXR1cm4gTWF0NC5vcnRob1pPKHRoaXMsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKTtcbiAgICB9XG4gICAgLy89PT09PT09PT09PT09PT09XG4gICAgLy8gU3RhdGljIG1ldGhvZHNcbiAgICAvLz09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3LCBpZGVudGl0eSB7QGxpbmsgTWF0NH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgTWF0NH1cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgTWF0NH0gaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIE1hdHJpeCB0byBjbG9uZVxuICAgICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBNYXQ0fVxuICAgICAqL1xuICAgIHN0YXRpYyBjbG9uZShhKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWF0NChhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHtAbGluayBNYXQ0fSB0byBhbm90aGVyXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIFRoZSByZWNlaXZpbmcgTWF0cml4XG4gICAgICogQHBhcmFtIGEgLSBNYXRyaXggdG8gY29weVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGNvcHkob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgICAgIG91dFs0XSA9IGFbNF07XG4gICAgICAgIG91dFs1XSA9IGFbNV07XG4gICAgICAgIG91dFs2XSA9IGFbNl07XG4gICAgICAgIG91dFs3XSA9IGFbN107XG4gICAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgICAgIG91dFs5XSA9IGFbOV07XG4gICAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBtYXQ0IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBNYXRyaXggY29tcG9uZW50c1xuICAgICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBNYXQ0fVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVmFsdWVzKC4uLnZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDQoLi4udmFsdWVzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgbWF0NCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIFRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIHZhbHVlcyAtIE1hdHJpeCBjb21wb25lbnRzXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0KG91dCwgLi4udmFsdWVzKSB7XG4gICAgICAgIG91dFswXSA9IHZhbHVlc1swXTtcbiAgICAgICAgb3V0WzFdID0gdmFsdWVzWzFdO1xuICAgICAgICBvdXRbMl0gPSB2YWx1ZXNbMl07XG4gICAgICAgIG91dFszXSA9IHZhbHVlc1szXTtcbiAgICAgICAgb3V0WzRdID0gdmFsdWVzWzRdO1xuICAgICAgICBvdXRbNV0gPSB2YWx1ZXNbNV07XG4gICAgICAgIG91dFs2XSA9IHZhbHVlc1s2XTtcbiAgICAgICAgb3V0WzddID0gdmFsdWVzWzddO1xuICAgICAgICBvdXRbOF0gPSB2YWx1ZXNbOF07XG4gICAgICAgIG91dFs5XSA9IHZhbHVlc1s5XTtcbiAgICAgICAgb3V0WzEwXSA9IHZhbHVlc1sxMF07XG4gICAgICAgIG91dFsxMV0gPSB2YWx1ZXNbMTFdO1xuICAgICAgICBvdXRbMTJdID0gdmFsdWVzWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IHZhbHVlc1sxM107XG4gICAgICAgIG91dFsxNF0gPSB2YWx1ZXNbMTRdO1xuICAgICAgICBvdXRbMTVdID0gdmFsdWVzWzE1XTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEge0BsaW5rIE1hdDR9IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyBNYXRyaXhcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBpZGVudGl0eShvdXQpIHtcbiAgICAgICAgb3V0WzBdID0gMTtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMDtcbiAgICAgICAgb3V0WzVdID0gMTtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gMDtcbiAgICAgICAgb3V0WzldID0gMDtcbiAgICAgICAgb3V0WzEwXSA9IDE7XG4gICAgICAgIG91dFsxMV0gPSAwO1xuICAgICAgICBvdXRbMTJdID0gMDtcbiAgICAgICAgb3V0WzEzXSA9IDA7XG4gICAgICAgIG91dFsxNF0gPSAwO1xuICAgICAgICBvdXRbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSB7QGxpbmsgTWF0NH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBzb3VyY2UgbWF0cml4XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNwb3NlKG91dCwgYSkge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM107XG4gICAgICAgICAgICBjb25zdCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddO1xuICAgICAgICAgICAgY29uc3QgYTIzID0gYVsxMV07XG4gICAgICAgICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgICAgICAgb3V0WzRdID0gYTAxO1xuICAgICAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICAgICAgb3V0WzhdID0gYTAyO1xuICAgICAgICAgICAgb3V0WzldID0gYTEyO1xuICAgICAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICAgICAgb3V0WzEyXSA9IGEwMztcbiAgICAgICAgICAgIG91dFsxM10gPSBhMTM7XG4gICAgICAgICAgICBvdXRbMTRdID0gYTIzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICAgICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgICAgICBvdXRbNF0gPSBhWzFdO1xuICAgICAgICAgICAgb3V0WzVdID0gYVs1XTtcbiAgICAgICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgICAgICBvdXRbN10gPSBhWzEzXTtcbiAgICAgICAgICAgIG91dFs4XSA9IGFbMl07XG4gICAgICAgICAgICBvdXRbOV0gPSBhWzZdO1xuICAgICAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgICAgICAgb3V0WzEyXSA9IGFbM107XG4gICAgICAgICAgICBvdXRbMTNdID0gYVs3XTtcbiAgICAgICAgICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICAgICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZlcnRzIGEge0BsaW5rIE1hdDR9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIGEgLSB0aGUgc291cmNlIG1hdHJpeFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGludmVydChvdXQsIGEpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXTtcbiAgICAgICAgY29uc3QgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XTtcbiAgICAgICAgY29uc3QgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdO1xuICAgICAgICBjb25zdCBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgICAgICBjb25zdCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgICAgICBjb25zdCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgICAgIGNvbnN0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgICAgICBjb25zdCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgICAgICBjb25zdCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgICAgIGNvbnN0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBsZXQgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuICAgICAgICBpZiAoIWRldCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xuICAgICAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICAgICAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgICAgICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgICAgICAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICAgICAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgICAgIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICAgICAgICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICAgICAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgICAgICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgICAgICAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgICAgICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSB7QGxpbmsgTWF0NH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBzb3VyY2UgbWF0cml4XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRqb2ludChvdXQsIGEpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXTtcbiAgICAgICAgY29uc3QgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XTtcbiAgICAgICAgY29uc3QgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdO1xuICAgICAgICBjb25zdCBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcbiAgICAgICAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgICAgICBjb25zdCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICAgICAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgICAgICBjb25zdCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgICAgIGNvbnN0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgICAgICBjb25zdCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgICAgIGNvbnN0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgICAgICBjb25zdCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgICAgIGNvbnN0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICAgICAgb3V0WzBdID0gYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5O1xuICAgICAgICBvdXRbMV0gPSBhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDk7XG4gICAgICAgIG91dFsyXSA9IGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMztcbiAgICAgICAgb3V0WzNdID0gYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzO1xuICAgICAgICBvdXRbNF0gPSBhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDc7XG4gICAgICAgIG91dFs1XSA9IGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNztcbiAgICAgICAgb3V0WzZdID0gYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxO1xuICAgICAgICBvdXRbN10gPSBhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDE7XG4gICAgICAgIG91dFs4XSA9IGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNjtcbiAgICAgICAgb3V0WzldID0gYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2O1xuICAgICAgICBvdXRbMTBdID0gYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwO1xuICAgICAgICBvdXRbMTFdID0gYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwO1xuICAgICAgICBvdXRbMTJdID0gYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2O1xuICAgICAgICBvdXRbMTNdID0gYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2O1xuICAgICAgICBvdXRbMTRdID0gYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwO1xuICAgICAgICBvdXRbMTVdID0gYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIHtAbGluayBNYXQ0fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHNvdXJjZSBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyBkZXRlcm1pbmFudCBvZiBhXG4gICAgICovXG4gICAgc3RhdGljIGRldGVybWluYW50KGEpIHtcbiAgICAgICAgY29uc3QgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXTtcbiAgICAgICAgY29uc3QgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XTtcbiAgICAgICAgY29uc3QgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdO1xuICAgICAgICBjb25zdCBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcbiAgICAgICAgY29uc3QgYjAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgICAgIGNvbnN0IGIxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgICAgICBjb25zdCBiMiA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICAgICAgY29uc3QgYjMgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgICAgIGNvbnN0IGI0ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgICAgICBjb25zdCBiNSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICAgICAgY29uc3QgYjYgPSBhMDAgKiBiNSAtIGEwMSAqIGI0ICsgYTAyICogYjM7XG4gICAgICAgIGNvbnN0IGI3ID0gYTEwICogYjUgLSBhMTEgKiBiNCArIGExMiAqIGIzO1xuICAgICAgICBjb25zdCBiOCA9IGEyMCAqIGIyIC0gYTIxICogYjEgKyBhMjIgKiBiMDtcbiAgICAgICAgY29uc3QgYjkgPSBhMzAgKiBiMiAtIGEzMSAqIGIxICsgYTMyICogYjA7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgcmV0dXJuIGExMyAqIGI2IC0gYTAzICogYjcgKyBhMzMgKiBiOCAtIGEyMyAqIGI5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIHR3byB7QGxpbmsgTWF0NH1zXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIFRoZSByZWNlaXZpbmcgTWF0cml4XG4gICAgICogQHBhcmFtIGEgLSBUaGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gICAgICAgIGNvbnN0IGEwMCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGEwMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEwMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGEwMyA9IGFbM107XG4gICAgICAgIGNvbnN0IGExMCA9IGFbNF07XG4gICAgICAgIGNvbnN0IGExMSA9IGFbNV07XG4gICAgICAgIGNvbnN0IGExMiA9IGFbNl07XG4gICAgICAgIGNvbnN0IGExMyA9IGFbN107XG4gICAgICAgIGNvbnN0IGEyMCA9IGFbOF07XG4gICAgICAgIGNvbnN0IGEyMSA9IGFbOV07XG4gICAgICAgIGNvbnN0IGEyMiA9IGFbMTBdO1xuICAgICAgICBjb25zdCBhMjMgPSBhWzExXTtcbiAgICAgICAgY29uc3QgYTMwID0gYVsxMl07XG4gICAgICAgIGNvbnN0IGEzMSA9IGFbMTNdO1xuICAgICAgICBjb25zdCBhMzIgPSBhWzE0XTtcbiAgICAgICAgY29uc3QgYTMzID0gYVsxNV07XG4gICAgICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgICAgICBsZXQgYjAgPSBiWzBdO1xuICAgICAgICBsZXQgYjEgPSBiWzFdO1xuICAgICAgICBsZXQgYjIgPSBiWzJdO1xuICAgICAgICBsZXQgYjMgPSBiWzNdO1xuICAgICAgICBvdXRbMF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICAgICAgb3V0WzFdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgICAgIG91dFsyXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgICAgICBvdXRbM10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgICAgICAgYjAgPSBiWzRdO1xuICAgICAgICBiMSA9IGJbNV07XG4gICAgICAgIGIyID0gYls2XTtcbiAgICAgICAgYjMgPSBiWzddO1xuICAgICAgICBvdXRbNF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICAgICAgb3V0WzVdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgICAgIG91dFs2XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgICAgICBvdXRbN10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgICAgICAgYjAgPSBiWzhdO1xuICAgICAgICBiMSA9IGJbOV07XG4gICAgICAgIGIyID0gYlsxMF07XG4gICAgICAgIGIzID0gYlsxMV07XG4gICAgICAgIG91dFs4XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgICAgICBvdXRbOV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICAgICAgb3V0WzEwXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgICAgICBvdXRbMTFdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gICAgICAgIGIwID0gYlsxMl07XG4gICAgICAgIGIxID0gYlsxM107XG4gICAgICAgIGIyID0gYlsxNF07XG4gICAgICAgIGIzID0gYlsxNV07XG4gICAgICAgIG91dFsxMl0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICAgICAgb3V0WzEzXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgICAgICBvdXRbMTRdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgICAgIG91dFsxNV0gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBNYXQ0Lm11bHRpcGx5fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsKG91dCwgYSwgYikgeyByZXR1cm4gb3V0OyB9XG4gICAgLyoqXG4gICAgICogVHJhbnNsYXRlIGEge0BsaW5rIE1hdDR9IGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNsYXRlKG91dCwgYSwgdikge1xuICAgICAgICBjb25zdCB4ID0gdlswXTtcbiAgICAgICAgY29uc3QgeSA9IHZbMV07XG4gICAgICAgIGNvbnN0IHogPSB2WzJdO1xuICAgICAgICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgICAgICAgICBvdXRbMTJdID0gYVswXSAqIHggKyBhWzRdICogeSArIGFbOF0gKiB6ICsgYVsxMl07XG4gICAgICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgICAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgICAgICAgICAgb3V0WzE1XSA9IGFbM10gKiB4ICsgYVs3XSAqIHkgKyBhWzExXSAqIHogKyBhWzE1XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGEwMCA9IGFbMF07XG4gICAgICAgICAgICBjb25zdCBhMDEgPSBhWzFdO1xuICAgICAgICAgICAgY29uc3QgYTAyID0gYVsyXTtcbiAgICAgICAgICAgIGNvbnN0IGEwMyA9IGFbM107XG4gICAgICAgICAgICBjb25zdCBhMTAgPSBhWzRdO1xuICAgICAgICAgICAgY29uc3QgYTExID0gYVs1XTtcbiAgICAgICAgICAgIGNvbnN0IGExMiA9IGFbNl07XG4gICAgICAgICAgICBjb25zdCBhMTMgPSBhWzddO1xuICAgICAgICAgICAgY29uc3QgYTIwID0gYVs4XTtcbiAgICAgICAgICAgIGNvbnN0IGEyMSA9IGFbOV07XG4gICAgICAgICAgICBjb25zdCBhMjIgPSBhWzEwXTtcbiAgICAgICAgICAgIGNvbnN0IGEyMyA9IGFbMTFdO1xuICAgICAgICAgICAgb3V0WzBdID0gYTAwO1xuICAgICAgICAgICAgb3V0WzFdID0gYTAxO1xuICAgICAgICAgICAgb3V0WzJdID0gYTAyO1xuICAgICAgICAgICAgb3V0WzNdID0gYTAzO1xuICAgICAgICAgICAgb3V0WzRdID0gYTEwO1xuICAgICAgICAgICAgb3V0WzVdID0gYTExO1xuICAgICAgICAgICAgb3V0WzZdID0gYTEyO1xuICAgICAgICAgICAgb3V0WzddID0gYTEzO1xuICAgICAgICAgICAgb3V0WzhdID0gYTIwO1xuICAgICAgICAgICAgb3V0WzldID0gYTIxO1xuICAgICAgICAgICAgb3V0WzEwXSA9IGEyMjtcbiAgICAgICAgICAgIG91dFsxMV0gPSBhMjM7XG4gICAgICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgICAgICBvdXRbMTNdID0gYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgYVsxM107XG4gICAgICAgICAgICBvdXRbMTRdID0gYTAyICogeCArIGExMiAqIHkgKyBhMjIgKiB6ICsgYVsxNF07XG4gICAgICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NhbGVzIHRoZSB7QGxpbmsgTWF0NH0gYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHtAbGluayBWZWMzfSBub3QgdXNpbmcgdmVjdG9yaXphdGlvblxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIG1hdHJpeCB0byBzY2FsZVxuICAgICAqIEBwYXJhbSB2IC0gdGhlIHtAbGluayBWZWMzfSB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKiovXG4gICAgc3RhdGljIHNjYWxlKG91dCwgYSwgdikge1xuICAgICAgICBjb25zdCB4ID0gdlswXTtcbiAgICAgICAgY29uc3QgeSA9IHZbMV07XG4gICAgICAgIGNvbnN0IHogPSB2WzJdO1xuICAgICAgICBvdXRbMF0gPSBhWzBdICogeDtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIHg7XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgICAgICBvdXRbM10gPSBhWzNdICogeDtcbiAgICAgICAgb3V0WzRdID0gYVs0XSAqIHk7XG4gICAgICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgICAgICBvdXRbNl0gPSBhWzZdICogeTtcbiAgICAgICAgb3V0WzddID0gYVs3XSAqIHk7XG4gICAgICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgICAgICBvdXRbOV0gPSBhWzldICogejtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdICogejtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEge0BsaW5rIE1hdDR9IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEBwYXJhbSBheGlzIC0gdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgICAgICBsZXQgeCA9IGF4aXNbMF07XG4gICAgICAgIGxldCB5ID0gYXhpc1sxXTtcbiAgICAgICAgbGV0IHogPSBheGlzWzJdO1xuICAgICAgICBsZXQgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG4gICAgICAgIGlmIChsZW4gPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB4ICo9IGxlbjtcbiAgICAgICAgeSAqPSBsZW47XG4gICAgICAgIHogKj0gbGVuO1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IHQgPSAxIC0gYztcbiAgICAgICAgY29uc3QgYTAwID0gYVswXTtcbiAgICAgICAgY29uc3QgYTAxID0gYVsxXTtcbiAgICAgICAgY29uc3QgYTAyID0gYVsyXTtcbiAgICAgICAgY29uc3QgYTAzID0gYVszXTtcbiAgICAgICAgY29uc3QgYTEwID0gYVs0XTtcbiAgICAgICAgY29uc3QgYTExID0gYVs1XTtcbiAgICAgICAgY29uc3QgYTEyID0gYVs2XTtcbiAgICAgICAgY29uc3QgYTEzID0gYVs3XTtcbiAgICAgICAgY29uc3QgYTIwID0gYVs4XTtcbiAgICAgICAgY29uc3QgYTIxID0gYVs5XTtcbiAgICAgICAgY29uc3QgYTIyID0gYVsxMF07XG4gICAgICAgIGNvbnN0IGEyMyA9IGFbMTFdO1xuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcbiAgICAgICAgY29uc3QgYjAwID0geCAqIHggKiB0ICsgYztcbiAgICAgICAgY29uc3QgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgICAgIGNvbnN0IGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICAgICAgICBjb25zdCBiMTAgPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICAgICAgY29uc3QgYjExID0geSAqIHkgKiB0ICsgYztcbiAgICAgICAgY29uc3QgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgICAgIGNvbnN0IGIyMCA9IHggKiB6ICogdCArIHkgKiBzO1xuICAgICAgICBjb25zdCBiMjEgPSB5ICogeiAqIHQgLSB4ICogcztcbiAgICAgICAgY29uc3QgYjIyID0geiAqIHogKiB0ICsgYztcbiAgICAgICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICAgICAgICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gICAgICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICAgICAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICAgICAgICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gICAgICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICAgICAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICAgICAgICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gICAgICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICAgICAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICAgICAgICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICAgICAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIGEgLSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICAgICAqIEBwYXJhbSByYWQgLSB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVYKG91dCwgYSwgcmFkKSB7XG4gICAgICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBsZXQgYTEwID0gYVs0XTtcbiAgICAgICAgbGV0IGExMSA9IGFbNV07XG4gICAgICAgIGxldCBhMTIgPSBhWzZdO1xuICAgICAgICBsZXQgYTEzID0gYVs3XTtcbiAgICAgICAgbGV0IGEyMCA9IGFbOF07XG4gICAgICAgIGxldCBhMjEgPSBhWzldO1xuICAgICAgICBsZXQgYTIyID0gYVsxMF07XG4gICAgICAgIGxldCBhMjMgPSBhWzExXTtcbiAgICAgICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgICAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgICAgIG91dFsxXSA9IGFbMV07XG4gICAgICAgICAgICBvdXRbMl0gPSBhWzJdO1xuICAgICAgICAgICAgb3V0WzNdID0gYVszXTtcbiAgICAgICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgICAgICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgICAgICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgICAgIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgICAgICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgICAgICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgICAgIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgICAgICAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICAgKiBAcGFyYW0gcmFkIC0gdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWShvdXQsIGEsIHJhZCkge1xuICAgICAgICBsZXQgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgbGV0IGEwMCA9IGFbMF07XG4gICAgICAgIGxldCBhMDEgPSBhWzFdO1xuICAgICAgICBsZXQgYTAyID0gYVsyXTtcbiAgICAgICAgbGV0IGEwMyA9IGFbM107XG4gICAgICAgIGxldCBhMjAgPSBhWzhdO1xuICAgICAgICBsZXQgYTIxID0gYVs5XTtcbiAgICAgICAgbGV0IGEyMiA9IGFbMTBdO1xuICAgICAgICBsZXQgYTIzID0gYVsxMV07XG4gICAgICAgIGlmIChhICE9PSBvdXQpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgICAgIG91dFs0XSA9IGFbNF07XG4gICAgICAgICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgICAgICAgb3V0WzZdID0gYVs2XTtcbiAgICAgICAgICAgIG91dFs3XSA9IGFbN107XG4gICAgICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgICAgICBvdXRbMF0gPSBhMDAgKiBjIC0gYTIwICogcztcbiAgICAgICAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gICAgICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgICAgICBvdXRbM10gPSBhMDMgKiBjIC0gYTIzICogcztcbiAgICAgICAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gICAgICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgICAgICBvdXRbMTBdID0gYTAyICogcyArIGEyMiAqIGM7XG4gICAgICAgIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVoob3V0LCBhLCByYWQpIHtcbiAgICAgICAgbGV0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIGxldCBhMDAgPSBhWzBdO1xuICAgICAgICBsZXQgYTAxID0gYVsxXTtcbiAgICAgICAgbGV0IGEwMiA9IGFbMl07XG4gICAgICAgIGxldCBhMDMgPSBhWzNdO1xuICAgICAgICBsZXQgYTEwID0gYVs0XTtcbiAgICAgICAgbGV0IGExMSA9IGFbNV07XG4gICAgICAgIGxldCBhMTIgPSBhWzZdO1xuICAgICAgICBsZXQgYTEzID0gYVs3XTtcbiAgICAgICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgICAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgICAgICAgICBvdXRbOV0gPSBhWzldO1xuICAgICAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgICAgIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICAgICAgICBvdXRbMl0gPSBhMDIgKiBjICsgYTEyICogcztcbiAgICAgICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgICAgIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICAgICAgICBvdXRbNV0gPSBhMTEgKiBjIC0gYTAxICogcztcbiAgICAgICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgICAgIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIE1hdDR9IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICAgKlxuICAgICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBkZXN0LCB2ZWMpO1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB7QGxpbmsgTWF0NH0gcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gdiAtIFRyYW5zbGF0aW9uIHZlY3RvclxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZyb21UcmFuc2xhdGlvbihvdXQsIHYpIHtcbiAgICAgICAgb3V0WzBdID0gMTtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMDtcbiAgICAgICAgb3V0WzVdID0gMTtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gMDtcbiAgICAgICAgb3V0WzldID0gMDtcbiAgICAgICAgb3V0WzEwXSA9IDE7XG4gICAgICAgIG91dFsxMV0gPSAwO1xuICAgICAgICBvdXRbMTJdID0gdlswXTtcbiAgICAgICAgb3V0WzEzXSA9IHZbMV07XG4gICAgICAgIG91dFsxNF0gPSB2WzJdO1xuICAgICAgICBvdXRbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBNYXQ0fSBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICAgKlxuICAgICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgICAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHtAbGluayBNYXQ0fSByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgICAqIEBwYXJhbSB2IC0gU2NhbGluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tU2NhbGluZyhvdXQsIHYpIHtcbiAgICAgICAgb3V0WzBdID0gdlswXTtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMDtcbiAgICAgICAgb3V0WzVdID0gdlsxXTtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gMDtcbiAgICAgICAgb3V0WzldID0gMDtcbiAgICAgICAgb3V0WzEwXSA9IHZbMl07XG4gICAgICAgIG91dFsxMV0gPSAwO1xuICAgICAgICBvdXRbMTJdID0gMDtcbiAgICAgICAgb3V0WzEzXSA9IDA7XG4gICAgICAgIG91dFsxNF0gPSAwO1xuICAgICAgICBvdXRbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHtAbGluayBNYXQ0fSBmcm9tIGEgZ2l2ZW4gYW5nbGUgYXJvdW5kIGEgZ2l2ZW4gYXhpc1xuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDQucm90YXRlKGRlc3QsIGRlc3QsIHJhZCwgYXhpcyk7XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHtAbGluayBNYXQ0fSByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgICAqIEBwYXJhbSByYWQgLSB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICAgKiBAcGFyYW0gYXhpcyAtIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUm90YXRpb24ob3V0LCByYWQsIGF4aXMpIHtcbiAgICAgICAgbGV0IHggPSBheGlzWzBdO1xuICAgICAgICBsZXQgeSA9IGF4aXNbMV07XG4gICAgICAgIGxldCB6ID0gYXhpc1syXTtcbiAgICAgICAgbGV0IGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuICAgICAgICBpZiAobGVuIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeCAqPSBsZW47XG4gICAgICAgIHkgKj0gbGVuO1xuICAgICAgICB6ICo9IGxlbjtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBjb25zdCB0ID0gMSAtIGM7XG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dFswXSA9IHggKiB4ICogdCArIGM7XG4gICAgICAgIG91dFsxXSA9IHkgKiB4ICogdCArIHogKiBzO1xuICAgICAgICBvdXRbMl0gPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0geCAqIHkgKiB0IC0geiAqIHM7XG4gICAgICAgIG91dFs1XSA9IHkgKiB5ICogdCArIGM7XG4gICAgICAgIG91dFs2XSA9IHogKiB5ICogdCArIHggKiBzO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSB4ICogeiAqIHQgKyB5ICogcztcbiAgICAgICAgb3V0WzldID0geSAqIHogKiB0IC0geCAqIHM7XG4gICAgICAgIG91dFsxMF0gPSB6ICogeiAqIHQgKyBjO1xuICAgICAgICBvdXRbMTFdID0gMDtcbiAgICAgICAgb3V0WzEyXSA9IDA7XG4gICAgICAgIG91dFsxM10gPSAwO1xuICAgICAgICBvdXRbMTRdID0gMDtcbiAgICAgICAgb3V0WzE1XSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXNcbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICAgKlxuICAgICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgICAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgICAqIEBwYXJhbSByYWQgLSB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tWFJvdGF0aW9uKG91dCwgcmFkKSB7XG4gICAgICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgbGV0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dFswXSA9IDE7XG4gICAgICAgIG91dFsxXSA9IDA7XG4gICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgIG91dFszXSA9IDA7XG4gICAgICAgIG91dFs0XSA9IDA7XG4gICAgICAgIG91dFs1XSA9IGM7XG4gICAgICAgIG91dFs2XSA9IHM7XG4gICAgICAgIG91dFs3XSA9IDA7XG4gICAgICAgIG91dFs4XSA9IDA7XG4gICAgICAgIG91dFs5XSA9IC1zO1xuICAgICAgICBvdXRbMTBdID0gYztcbiAgICAgICAgb3V0WzExXSA9IDA7XG4gICAgICAgIG91dFsxMl0gPSAwO1xuICAgICAgICBvdXRbMTNdID0gMDtcbiAgICAgICAgb3V0WzE0XSA9IDA7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gICAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAgICpcbiAgICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICAgKiAgICAgbWF0NC5yb3RhdGVZKGRlc3QsIGRlc3QsIHJhZCk7XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gcmFkIC0gdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVlSb3RhdGlvbihvdXQsIHJhZCkge1xuICAgICAgICBsZXQgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgICAgICBvdXRbMF0gPSBjO1xuICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICBvdXRbMl0gPSAtcztcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMDtcbiAgICAgICAgb3V0WzVdID0gMTtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gcztcbiAgICAgICAgb3V0WzldID0gMDtcbiAgICAgICAgb3V0WzEwXSA9IGM7XG4gICAgICAgIG91dFsxMV0gPSAwO1xuICAgICAgICBvdXRbMTJdID0gMDtcbiAgICAgICAgb3V0WzEzXSA9IDA7XG4gICAgICAgIG91dFsxNF0gPSAwO1xuICAgICAgICBvdXRbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDQucm90YXRlWihkZXN0LCBkZXN0LCByYWQpO1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZyb21aUm90YXRpb24ob3V0LCByYWQpIHtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG91dFswXSA9IGM7XG4gICAgICAgIG91dFsxXSA9IHM7XG4gICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgIG91dFszXSA9IDA7XG4gICAgICAgIG91dFs0XSA9IC1zO1xuICAgICAgICBvdXRbNV0gPSBjO1xuICAgICAgICBvdXRbNl0gPSAwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSAwO1xuICAgICAgICBvdXRbOV0gPSAwO1xuICAgICAgICBvdXRbMTBdID0gMTtcbiAgICAgICAgb3V0WzExXSA9IDA7XG4gICAgICAgIG91dFsxMl0gPSAwO1xuICAgICAgICBvdXRbMTNdID0gMDtcbiAgICAgICAgb3V0WzE0XSA9IDA7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICAgKlxuICAgICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICAgICAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gICAgICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAgICAgKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgICAqIEBwYXJhbSBxIC0gUm90YXRpb24gcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSB2IC0gVHJhbnNsYXRpb24gdmVjdG9yXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBxLCB2KSB7XG4gICAgICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgICAgICBjb25zdCB4ID0gcVswXTtcbiAgICAgICAgY29uc3QgeSA9IHFbMV07XG4gICAgICAgIGNvbnN0IHogPSBxWzJdO1xuICAgICAgICBjb25zdCB3ID0gcVszXTtcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcbiAgICAgICAgY29uc3QgeHggPSB4ICogeDI7XG4gICAgICAgIGNvbnN0IHh5ID0geCAqIHkyO1xuICAgICAgICBjb25zdCB4eiA9IHggKiB6MjtcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XG4gICAgICAgIGNvbnN0IHl6ID0geSAqIHoyO1xuICAgICAgICBjb25zdCB6eiA9IHogKiB6MjtcbiAgICAgICAgY29uc3Qgd3ggPSB3ICogeDI7XG4gICAgICAgIGNvbnN0IHd5ID0gdyAqIHkyO1xuICAgICAgICBjb25zdCB3eiA9IHcgKiB6MjtcbiAgICAgICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICAgICAgb3V0WzFdID0geHkgKyB3ejtcbiAgICAgICAgb3V0WzJdID0geHogLSB3eTtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0geHkgLSB3ejtcbiAgICAgICAgb3V0WzVdID0gMSAtICh4eCArIHp6KTtcbiAgICAgICAgb3V0WzZdID0geXogKyB3eDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0geHogKyB3eTtcbiAgICAgICAgb3V0WzldID0geXogLSB3eDtcbiAgICAgICAgb3V0WzEwXSA9IDEgLSAoeHggKyB5eSk7XG4gICAgICAgIG91dFsxMV0gPSAwO1xuICAgICAgICBvdXRbMTJdID0gdlswXTtcbiAgICAgICAgb3V0WzEzXSA9IHZbMV07XG4gICAgICAgIG91dFsxNF0gPSB2WzJdO1xuICAgICAgICBvdXRbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIHtAbGluayBNYXQ0fSBmcm9tIGEge0BsaW5rIFF1YXQyfS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gTWF0cml4XG4gICAgICogQHBhcmFtIGEgLSBEdWFsIFF1YXRlcm5pb25cbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUXVhdDIob3V0LCBhKSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IG5ldyBWZWMzKCk7XG4gICAgICAgIGNvbnN0IGJ4ID0gLWFbMF07XG4gICAgICAgIGNvbnN0IGJ5ID0gLWFbMV07XG4gICAgICAgIGNvbnN0IGJ6ID0gLWFbMl07XG4gICAgICAgIGNvbnN0IGJ3ID0gYVszXTtcbiAgICAgICAgY29uc3QgYXggPSBhWzRdO1xuICAgICAgICBjb25zdCBheSA9IGFbNV07XG4gICAgICAgIGNvbnN0IGF6ID0gYVs2XTtcbiAgICAgICAgY29uc3QgYXcgPSBhWzddO1xuICAgICAgICBsZXQgbWFnbml0dWRlID0gYnggKiBieCArIGJ5ICogYnkgKyBieiAqIGJ6ICsgYncgKiBidztcbiAgICAgICAgLy9Pbmx5IHNjYWxlIGlmIGl0IG1ha2VzIHNlbnNlXG4gICAgICAgIGlmIChtYWduaXR1ZGUgPiAwKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9ICgoYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSkgKiAyKSAvIG1hZ25pdHVkZTtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzFdID0gKChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDIpIC8gbWFnbml0dWRlO1xuICAgICAgICAgICAgdHJhbnNsYXRpb25bMl0gPSAoKGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngpICogMikgLyBtYWduaXR1ZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSA9IChheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5KSAqIDI7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDI7XG4gICAgICAgICAgICB0cmFuc2xhdGlvblsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDI7XG4gICAgICAgIH1cbiAgICAgICAgTWF0NC5mcm9tUm90YXRpb25UcmFuc2xhdGlvbihvdXQsIGEsIHRyYW5zbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXG4gICAgICogbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLFxuICAgICAqIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yXG4gICAgICogb3JpZ2luYWxseSBzdXBwbGllZC5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50XG4gICAgICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICAgICAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRUcmFuc2xhdGlvbihvdXQsIG1hdCkge1xuICAgICAgICBvdXRbMF0gPSBtYXRbMTJdO1xuICAgICAgICBvdXRbMV0gPSBtYXRbMTNdO1xuICAgICAgICBvdXRbMl0gPSBtYXRbMTRdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzY2FsaW5nIGZhY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICAgICAqIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlXG4gICAgICogd2l0aCBhIG5vcm1hbGl6ZWQgUXVhdGVybmlvbiBwYXJhbXRlciwgdGhlIHJldHVybmVkIHZlY3RvciB3aWxsIGJlXG4gICAgICogdGhlIHNhbWUgYXMgdGhlIHNjYWxpbmcgdmVjdG9yXG4gICAgICogb3JpZ2luYWxseSBzdXBwbGllZC5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50XG4gICAgICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICAgICAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRTY2FsaW5nKG91dCwgbWF0KSB7XG4gICAgICAgIGNvbnN0IG0xMSA9IG1hdFswXTtcbiAgICAgICAgY29uc3QgbTEyID0gbWF0WzFdO1xuICAgICAgICBjb25zdCBtMTMgPSBtYXRbMl07XG4gICAgICAgIGNvbnN0IG0yMSA9IG1hdFs0XTtcbiAgICAgICAgY29uc3QgbTIyID0gbWF0WzVdO1xuICAgICAgICBjb25zdCBtMjMgPSBtYXRbNl07XG4gICAgICAgIGNvbnN0IG0zMSA9IG1hdFs4XTtcbiAgICAgICAgY29uc3QgbTMyID0gbWF0WzldO1xuICAgICAgICBjb25zdCBtMzMgPSBtYXRbMTBdO1xuICAgICAgICBvdXRbMF0gPSBNYXRoLnNxcnQobTExICogbTExICsgbTEyICogbTEyICsgbTEzICogbTEzKTtcbiAgICAgICAgb3V0WzFdID0gTWF0aC5zcXJ0KG0yMSAqIG0yMSArIG0yMiAqIG0yMiArIG0yMyAqIG0yMyk7XG4gICAgICAgIG91dFsyXSA9IE1hdGguc3FydChtMzEgKiBtMzEgKyBtMzIgKiBtMzIgKyBtMzMgKiBtMzMpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJvdGF0aW9uYWwgY29tcG9uZW50XG4gICAgICogb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGhcbiAgICAgKiBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiwgdGhlIHJldHVybmVkIHF1YXRlcm5pb24gd2lsbCBiZSB0aGVcbiAgICAgKiBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIFF1YXRlcm5pb24gdG8gcmVjZWl2ZSB0aGUgcm90YXRpb24gY29tcG9uZW50XG4gICAgICogQHBhcmFtIG1hdCAtIE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcbiAgICAgKiBAcmV0dXJuIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGdldFJvdGF0aW9uKG91dCwgbWF0KSB7XG4gICAgICAgIE1hdDQuZ2V0U2NhbGluZyh0bXBWZWMzLCBtYXQpO1xuICAgICAgICBjb25zdCBpczEgPSAxIC8gdG1wVmVjM1swXTtcbiAgICAgICAgY29uc3QgaXMyID0gMSAvIHRtcFZlYzNbMV07XG4gICAgICAgIGNvbnN0IGlzMyA9IDEgLyB0bXBWZWMzWzJdO1xuICAgICAgICBjb25zdCBzbTExID0gbWF0WzBdICogaXMxO1xuICAgICAgICBjb25zdCBzbTEyID0gbWF0WzFdICogaXMyO1xuICAgICAgICBjb25zdCBzbTEzID0gbWF0WzJdICogaXMzO1xuICAgICAgICBjb25zdCBzbTIxID0gbWF0WzRdICogaXMxO1xuICAgICAgICBjb25zdCBzbTIyID0gbWF0WzVdICogaXMyO1xuICAgICAgICBjb25zdCBzbTIzID0gbWF0WzZdICogaXMzO1xuICAgICAgICBjb25zdCBzbTMxID0gbWF0WzhdICogaXMxO1xuICAgICAgICBjb25zdCBzbTMyID0gbWF0WzldICogaXMyO1xuICAgICAgICBjb25zdCBzbTMzID0gbWF0WzEwXSAqIGlzMztcbiAgICAgICAgY29uc3QgdHJhY2UgPSBzbTExICsgc20yMiArIHNtMzM7XG4gICAgICAgIGxldCBTID0gMDtcbiAgICAgICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgICAgICAgICAgb3V0WzNdID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXRbMF0gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgICAgICAgIG91dFsxXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgICAgICAgb3V0WzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgICAgICAgICBvdXRbM10gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgICAgICAgIG91dFswXSA9IDAuMjUgKiBTO1xuICAgICAgICAgICAgb3V0WzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICAgICAgICBvdXRbMl0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzbTIyID4gc20zMykge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTIyIC0gc20xMSAtIHNtMzMpICogMjtcbiAgICAgICAgICAgIG91dFszXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgICAgICAgb3V0WzBdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICAgICAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICAgICAgICAgIG91dFsyXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTMzIC0gc20xMSAtIHNtMjIpICogMjtcbiAgICAgICAgICAgIG91dFszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgICAgICAgICAgb3V0WzBdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gICAgICAgICAgICBvdXRbMV0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICAgICAgICAgIG91dFsyXSA9IDAuMjUgKiBTO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29tcG9zZXMgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggaW50byBpdHMgcm90YXRpb24sIHRyYW5zbGF0aW9uXG4gICAgICogYW5kIHNjYWxlIGNvbXBvbmVudHMuIFJldHVybnMgb25seSB0aGUgcm90YXRpb24gY29tcG9uZW50XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dF9yIC0gUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0gb3V0X3QgLSBWZWN0b3IgdG8gcmVjZWl2ZSB0aGUgdHJhbnNsYXRpb24gdmVjdG9yXG4gICAgICogQHBhcmFtIG91dF9zIC0gVmVjdG9yIHRvIHJlY2VpdmUgdGhlIHNjYWxpbmcgZmFjdG9yXG4gICAgICogQHBhcmFtIG1hdCAtIE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcbiAgICAgKiBAcmV0dXJucyBgb3V0X3JgXG4gICAgICovXG4gICAgc3RhdGljIGRlY29tcG9zZShvdXRfciwgb3V0X3QsIG91dF9zLCBtYXQpIHtcbiAgICAgICAgb3V0X3RbMF0gPSBtYXRbMTJdO1xuICAgICAgICBvdXRfdFsxXSA9IG1hdFsxM107XG4gICAgICAgIG91dF90WzJdID0gbWF0WzE0XTtcbiAgICAgICAgY29uc3QgbTExID0gbWF0WzBdO1xuICAgICAgICBjb25zdCBtMTIgPSBtYXRbMV07XG4gICAgICAgIGNvbnN0IG0xMyA9IG1hdFsyXTtcbiAgICAgICAgY29uc3QgbTIxID0gbWF0WzRdO1xuICAgICAgICBjb25zdCBtMjIgPSBtYXRbNV07XG4gICAgICAgIGNvbnN0IG0yMyA9IG1hdFs2XTtcbiAgICAgICAgY29uc3QgbTMxID0gbWF0WzhdO1xuICAgICAgICBjb25zdCBtMzIgPSBtYXRbOV07XG4gICAgICAgIGNvbnN0IG0zMyA9IG1hdFsxMF07XG4gICAgICAgIG91dF9zWzBdID0gTWF0aC5zcXJ0KG0xMSAqIG0xMSArIG0xMiAqIG0xMiArIG0xMyAqIG0xMyk7XG4gICAgICAgIG91dF9zWzFdID0gTWF0aC5zcXJ0KG0yMSAqIG0yMSArIG0yMiAqIG0yMiArIG0yMyAqIG0yMyk7XG4gICAgICAgIG91dF9zWzJdID0gTWF0aC5zcXJ0KG0zMSAqIG0zMSArIG0zMiAqIG0zMiArIG0zMyAqIG0zMyk7XG4gICAgICAgIGNvbnN0IGlzMSA9IDEgLyBvdXRfc1swXTtcbiAgICAgICAgY29uc3QgaXMyID0gMSAvIG91dF9zWzFdO1xuICAgICAgICBjb25zdCBpczMgPSAxIC8gb3V0X3NbMl07XG4gICAgICAgIGNvbnN0IHNtMTEgPSBtMTEgKiBpczE7XG4gICAgICAgIGNvbnN0IHNtMTIgPSBtMTIgKiBpczI7XG4gICAgICAgIGNvbnN0IHNtMTMgPSBtMTMgKiBpczM7XG4gICAgICAgIGNvbnN0IHNtMjEgPSBtMjEgKiBpczE7XG4gICAgICAgIGNvbnN0IHNtMjIgPSBtMjIgKiBpczI7XG4gICAgICAgIGNvbnN0IHNtMjMgPSBtMjMgKiBpczM7XG4gICAgICAgIGNvbnN0IHNtMzEgPSBtMzEgKiBpczE7XG4gICAgICAgIGNvbnN0IHNtMzIgPSBtMzIgKiBpczI7XG4gICAgICAgIGNvbnN0IHNtMzMgPSBtMzMgKiBpczM7XG4gICAgICAgIGNvbnN0IHRyYWNlID0gc20xMSArIHNtMjIgKyBzbTMzO1xuICAgICAgICBsZXQgUyA9IDA7XG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcbiAgICAgICAgICAgIG91dF9yWzNdID0gMC4yNSAqIFM7XG4gICAgICAgICAgICBvdXRfclswXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgICAgICAgICAgb3V0X3JbMV0gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICAgICAgICAgIG91dF9yWzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgICAgICAgICBvdXRfclszXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgICAgICAgICAgb3V0X3JbMF0gPSAwLjI1ICogUztcbiAgICAgICAgICAgIG91dF9yWzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICAgICAgICBvdXRfclsyXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNtMjIgPiBzbTMzKSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMjIgLSBzbTExIC0gc20zMykgKiAyO1xuICAgICAgICAgICAgb3V0X3JbM10gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICAgICAgICAgIG91dF9yWzBdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICAgICAgICBvdXRfclsxXSA9IDAuMjUgKiBTO1xuICAgICAgICAgICAgb3V0X3JbMl0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20zMyAtIHNtMTEgLSBzbTIyKSAqIDI7XG4gICAgICAgICAgICBvdXRfclszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgICAgICAgICAgb3V0X3JbMF0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgICAgICAgICAgIG91dF9yWzFdID0gKHNtMjMgKyBzbTMyKSAvIFM7XG4gICAgICAgICAgICBvdXRfclsyXSA9IDAuMjUgKiBTO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRfcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGVcbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICAgKlxuICAgICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICAgICAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gICAgICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAgICAgKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAgICAgKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSk7XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gcSAtIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gdiAtIFRyYW5zbGF0aW9uIHZlY3RvclxuICAgICAqIEBwYXJhbSBzIC0gU2NhbGluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlKG91dCwgcSwgdiwgcykge1xuICAgICAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICAgICAgY29uc3QgeCA9IHFbMF07XG4gICAgICAgIGNvbnN0IHkgPSBxWzFdO1xuICAgICAgICBjb25zdCB6ID0gcVsyXTtcbiAgICAgICAgY29uc3QgdyA9IHFbM107XG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XG4gICAgICAgIGNvbnN0IHoyID0geiArIHo7XG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG4gICAgICAgIGNvbnN0IHN4ID0gc1swXTtcbiAgICAgICAgY29uc3Qgc3kgPSBzWzFdO1xuICAgICAgICBjb25zdCBzeiA9IHNbMl07XG4gICAgICAgIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICAgICAgICBvdXRbMV0gPSAoeHkgKyB3eikgKiBzeDtcbiAgICAgICAgb3V0WzJdID0gKHh6IC0gd3kpICogc3g7XG4gICAgICAgIG91dFszXSA9IDA7XG4gICAgICAgIG91dFs0XSA9ICh4eSAtIHd6KSAqIHN5O1xuICAgICAgICBvdXRbNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgICAgICAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gICAgICAgIG91dFs3XSA9IDA7XG4gICAgICAgIG91dFs4XSA9ICh4eiArIHd5KSAqIHN6O1xuICAgICAgICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICAgICAgb3V0WzEwXSA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICAgICAgICBvdXRbMTFdID0gMDtcbiAgICAgICAgb3V0WzEyXSA9IHZbMF07XG4gICAgICAgIG91dFsxM10gPSB2WzFdO1xuICAgICAgICBvdXRbMTRdID0gdlsyXTtcbiAgICAgICAgb3V0WzE1XSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlLCByb3RhdGluZyBhbmQgc2NhbGluZyBhcm91bmQgdGhlIGdpdmVuIG9yaWdpblxuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gICAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG9yaWdpbik7XG4gICAgICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAgICAgKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICAgICAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICAgICAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxuICAgICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBuZWdhdGl2ZU9yaWdpbik7XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gcSAtIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gdiAtIFRyYW5zbGF0aW9uIHZlY3RvclxuICAgICAqIEBwYXJhbSBzIC0gU2NhbGluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gbyAtIFRoZSBvcmlnaW4gdmVjdG9yIGFyb3VuZCB3aGljaCB0byBzY2FsZSBhbmQgcm90YXRlXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbihvdXQsIHEsIHYsIHMsIG8pIHtcbiAgICAgICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgICAgIGNvbnN0IHggPSBxWzBdO1xuICAgICAgICBjb25zdCB5ID0gcVsxXTtcbiAgICAgICAgY29uc3QgeiA9IHFbMl07XG4gICAgICAgIGNvbnN0IHcgPSBxWzNdO1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XG4gICAgICAgIGNvbnN0IHh6ID0geCAqIHoyO1xuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuICAgICAgICBjb25zdCBzeCA9IHNbMF07XG4gICAgICAgIGNvbnN0IHN5ID0gc1sxXTtcbiAgICAgICAgY29uc3Qgc3ogPSBzWzJdO1xuICAgICAgICBjb25zdCBveCA9IG9bMF07XG4gICAgICAgIGNvbnN0IG95ID0gb1sxXTtcbiAgICAgICAgY29uc3Qgb3ogPSBvWzJdO1xuICAgICAgICBjb25zdCBvdXQwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gICAgICAgIGNvbnN0IG91dDEgPSAoeHkgKyB3eikgKiBzeDtcbiAgICAgICAgY29uc3Qgb3V0MiA9ICh4eiAtIHd5KSAqIHN4O1xuICAgICAgICBjb25zdCBvdXQ0ID0gKHh5IC0gd3opICogc3k7XG4gICAgICAgIGNvbnN0IG91dDUgPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgICAgICAgY29uc3Qgb3V0NiA9ICh5eiArIHd4KSAqIHN5O1xuICAgICAgICBjb25zdCBvdXQ4ID0gKHh6ICsgd3kpICogc3o7XG4gICAgICAgIGNvbnN0IG91dDkgPSAoeXogLSB3eCkgKiBzejtcbiAgICAgICAgY29uc3Qgb3V0MTAgPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgICAgICAgb3V0WzBdID0gb3V0MDtcbiAgICAgICAgb3V0WzFdID0gb3V0MTtcbiAgICAgICAgb3V0WzJdID0gb3V0MjtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gb3V0NDtcbiAgICAgICAgb3V0WzVdID0gb3V0NTtcbiAgICAgICAgb3V0WzZdID0gb3V0NjtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gb3V0ODtcbiAgICAgICAgb3V0WzldID0gb3V0OTtcbiAgICAgICAgb3V0WzEwXSA9IG91dDEwO1xuICAgICAgICBvdXRbMTFdID0gMDtcbiAgICAgICAgb3V0WzEyXSA9IHZbMF0gKyBveCAtIChvdXQwICogb3ggKyBvdXQ0ICogb3kgKyBvdXQ4ICogb3opO1xuICAgICAgICBvdXRbMTNdID0gdlsxXSArIG95IC0gKG91dDEgKiBveCArIG91dDUgKiBveSArIG91dDkgKiBveik7XG4gICAgICAgIG91dFsxNF0gPSB2WzJdICsgb3ogLSAob3V0MiAqIG94ICsgb3V0NiAqIG95ICsgb3V0MTAgKiBveik7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGEgNHg0IG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gcSAtIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgICAgIGNvbnN0IHggPSBxWzBdO1xuICAgICAgICBjb25zdCB5ID0gcVsxXTtcbiAgICAgICAgY29uc3QgeiA9IHFbMl07XG4gICAgICAgIGNvbnN0IHcgPSBxWzNdO1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeXggPSB5ICogeDI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB6eCA9IHogKiB4MjtcbiAgICAgICAgY29uc3QgenkgPSB6ICogeTI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuICAgICAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICAgICAgb3V0WzFdID0geXggKyB3ejtcbiAgICAgICAgb3V0WzJdID0genggLSB3eTtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0geXggLSB3ejtcbiAgICAgICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgICAgIG91dFs2XSA9IHp5ICsgd3g7XG4gICAgICAgIG91dFs3XSA9IDA7XG4gICAgICAgIG91dFs4XSA9IHp4ICsgd3k7XG4gICAgICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICAgICAgb3V0WzExXSA9IDA7XG4gICAgICAgIG91dFsxMl0gPSAwO1xuICAgICAgICBvdXRbMTNdID0gMDtcbiAgICAgICAgb3V0WzE0XSA9IDA7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgICAqIEBwYXJhbSBsZWZ0IC0gTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSByaWdodCAtIFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIGJvdHRvbSAtIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSB0b3AgLSBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gbmVhciAtIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gZmFyIC0gRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJ1c3R1bShvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgICAgIGNvbnN0IHJsID0gMSAvIChyaWdodCAtIGxlZnQpO1xuICAgICAgICBjb25zdCB0YiA9IDEgLyAodG9wIC0gYm90dG9tKTtcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgICBvdXRbMF0gPSBuZWFyICogMiAqIHJsO1xuICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSAwO1xuICAgICAgICBvdXRbNV0gPSBuZWFyICogMiAqIHRiO1xuICAgICAgICBvdXRbNl0gPSAwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICAgICAgICBvdXRbOV0gPSAodG9wICsgYm90dG9tKSAqIHRiO1xuICAgICAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgICAgIG91dFsxMV0gPSAtMTtcbiAgICAgICAgb3V0WzEyXSA9IDA7XG4gICAgICAgIG91dFsxM10gPSAwO1xuICAgICAgICBvdXRbMTRdID0gZmFyICogbmVhciAqIDIgKiBuZjtcbiAgICAgICAgb3V0WzE1XSA9IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAgICAgKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbLTEsIDFdLFxuICAgICAqIHdoaWNoIG1hdGNoZXMgV2ViR0wvT3BlbkdMJ3MgY2xpcCB2b2x1bWUuXG4gICAgICogUGFzc2luZyBudWxsL3VuZGVmaW5lZC9ubyB2YWx1ZSBmb3IgZmFyIHdpbGwgZ2VuZXJhdGUgaW5maW5pdGUgcHJvamVjdGlvbiBtYXRyaXguXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICAgKiBAcGFyYW0gZm92eSAtIFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICAgICAqIEBwYXJhbSBhc3BlY3QgLSBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAgICAgKiBAcGFyYW0gbmVhciAtIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gZmFyIC0gRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHBlcnNwZWN0aXZlTk8ob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgICAgICBjb25zdCBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpO1xuICAgICAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSAwO1xuICAgICAgICBvdXRbNV0gPSBmO1xuICAgICAgICBvdXRbNl0gPSAwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSAwO1xuICAgICAgICBvdXRbOV0gPSAwO1xuICAgICAgICBvdXRbMTFdID0gLTE7XG4gICAgICAgIG91dFsxMl0gPSAwO1xuICAgICAgICBvdXRbMTNdID0gMDtcbiAgICAgICAgb3V0WzE1XSA9IDA7XG4gICAgICAgIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgICAgICAgICBjb25zdCBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgICAgICAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgICAgICAgICBvdXRbMTRdID0gMiAqIGZhciAqIG5lYXIgKiBuZjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG91dFsxMF0gPSAtMTtcbiAgICAgICAgICAgIG91dFsxNF0gPSAtMiAqIG5lYXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBNYXQ0LnBlcnNwZWN0aXZlTk99XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgTWF0NC5wZXJzcGVjdGl2ZU5PfSBvciB7QGxpbmsgTWF0NC5wZXJzcGVjdGl2ZVpPfSBleHBsaWNpdGx5XG4gICAgICovXG4gICAgc3RhdGljIHBlcnNwZWN0aXZlKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHsgcmV0dXJuIG91dDsgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHN1aXRhYmxlIGZvciBXZWJHUFUgd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICAgICAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFswLCAxXSxcbiAgICAgKiB3aGljaCBtYXRjaGVzIFdlYkdQVS9WdWxrYW4vRGlyZWN0WC9NZXRhbCdzIGNsaXAgdm9sdW1lLlxuICAgICAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAgICogQHBhcmFtIGZvdnkgLSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAgICAgKiBAcGFyYW0gYXNwZWN0IC0gQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gICAgICogQHBhcmFtIG5lYXIgLSBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIGZhciAtIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bSwgY2FuIGJlIG51bGwgb3IgSW5maW5pdHlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBwZXJzcGVjdGl2ZVpPKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgICAgICAgY29uc3QgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKTtcbiAgICAgICAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMDtcbiAgICAgICAgb3V0WzVdID0gZjtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gMDtcbiAgICAgICAgb3V0WzldID0gMDtcbiAgICAgICAgb3V0WzExXSA9IC0xO1xuICAgICAgICBvdXRbMTJdID0gMDtcbiAgICAgICAgb3V0WzEzXSA9IDA7XG4gICAgICAgIG91dFsxNV0gPSAwO1xuICAgICAgICBpZiAoZmFyICE9IG51bGwgJiYgZmFyICE9PSBJbmZpbml0eSkge1xuICAgICAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgICAgICAgb3V0WzEwXSA9IGZhciAqIG5mO1xuICAgICAgICAgICAgb3V0WzE0XSA9IGZhciAqIG5lYXIgKiBuZjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG91dFsxMF0gPSAtMTtcbiAgICAgICAgICAgIG91dFsxNF0gPSAtbmVhcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBmaWVsZCBvZiB2aWV3LlxuICAgICAqIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBwcm9qZWN0aW9uIG1hdHJpY2VzIHRvIGJlIHVzZWRcbiAgICAgKiB3aXRoIHRoZSBzdGlsbCBleHBlcmllbWVudGFsIFdlYlZSIEFQSS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgICAqIEBwYXJhbSBmb3YgLSBPYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHZhbHVlczogdXBEZWdyZWVzLCBkb3duRGVncmVlcywgbGVmdERlZ3JlZXMsIHJpZ2h0RGVncmVlc1xuICAgICAqIEBwYXJhbSBuZWFyIC0gTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSBmYXIgLSBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgc3RhdGljIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3KG91dCwgZm92LCBuZWFyLCBmYXIpIHtcbiAgICAgICAgY29uc3QgdXBUYW4gPSBNYXRoLnRhbigoZm92LnVwRGVncmVlcyAqIE1hdGguUEkpIC8gMTgwLjApO1xuICAgICAgICBjb25zdCBkb3duVGFuID0gTWF0aC50YW4oKGZvdi5kb3duRGVncmVlcyAqIE1hdGguUEkpIC8gMTgwLjApO1xuICAgICAgICBjb25zdCBsZWZ0VGFuID0gTWF0aC50YW4oKGZvdi5sZWZ0RGVncmVlcyAqIE1hdGguUEkpIC8gMTgwLjApO1xuICAgICAgICBjb25zdCByaWdodFRhbiA9IE1hdGgudGFuKChmb3YucmlnaHREZWdyZWVzICogTWF0aC5QSSkgLyAxODAuMCk7XG4gICAgICAgIGNvbnN0IHhTY2FsZSA9IDIuMCAvIChsZWZ0VGFuICsgcmlnaHRUYW4pO1xuICAgICAgICBjb25zdCB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcbiAgICAgICAgb3V0WzBdID0geFNjYWxlO1xuICAgICAgICBvdXRbMV0gPSAwLjA7XG4gICAgICAgIG91dFsyXSA9IDAuMDtcbiAgICAgICAgb3V0WzNdID0gMC4wO1xuICAgICAgICBvdXRbNF0gPSAwLjA7XG4gICAgICAgIG91dFs1XSA9IHlTY2FsZTtcbiAgICAgICAgb3V0WzZdID0gMC4wO1xuICAgICAgICBvdXRbN10gPSAwLjA7XG4gICAgICAgIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICAgICAgICBvdXRbOV0gPSAodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNTtcbiAgICAgICAgb3V0WzEwXSA9IGZhciAvIChuZWFyIC0gZmFyKTtcbiAgICAgICAgb3V0WzExXSA9IC0xLjA7XG4gICAgICAgIG91dFsxMl0gPSAwLjA7XG4gICAgICAgIG91dFsxM10gPSAwLjA7XG4gICAgICAgIG91dFsxNF0gPSAoZmFyICogbmVhcikgLyAobmVhciAtIGZhcik7XG4gICAgICAgIG91dFsxNV0gPSAwLjA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICAgICAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFstMSwgMV0sXG4gICAgICogd2hpY2ggbWF0Y2hlcyBXZWJHTC9PcGVuR0wncyBjbGlwIHZvbHVtZS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgICAqIEBwYXJhbSBsZWZ0IC0gTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSByaWdodCAtIFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIGJvdHRvbSAtIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSB0b3AgLSBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gbmVhciAtIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gZmFyIC0gRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgb3J0aG9OTyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgICAgIGNvbnN0IGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xuICAgICAgICBjb25zdCBidCA9IDEgLyAoYm90dG9tIC0gdG9wKTtcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgICBvdXRbMF0gPSAtMiAqIGxyO1xuICAgICAgICBvdXRbMV0gPSAwO1xuICAgICAgICBvdXRbMl0gPSAwO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSAwO1xuICAgICAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgICAgICBvdXRbNl0gPSAwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSAwO1xuICAgICAgICBvdXRbOV0gPSAwO1xuICAgICAgICBvdXRbMTBdID0gMiAqIG5mO1xuICAgICAgICBvdXRbMTFdID0gMDtcbiAgICAgICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgICAgIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICAgICAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIE1hdDQub3J0aG9OT31cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBNYXQ0Lm9ydGhvTk99IG9yIHtAbGluayBNYXQ0Lm9ydGhvWk99IGV4cGxpY2l0bHlcbiAgICAgKi9cbiAgICBzdGF0aWMgb3J0aG8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikgeyByZXR1cm4gb3V0OyB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gICAgICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICAgICAqIHdoaWNoIG1hdGNoZXMgV2ViR1BVL1Z1bGthbi9EaXJlY3RYL01ldGFsJ3MgY2xpcCB2b2x1bWUuXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICAgKiBAcGFyYW0gbGVmdCAtIExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gcmlnaHQgLSBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEBwYXJhbSBib3R0b20gLSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICAgKiBAcGFyYW0gdG9wIC0gVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIG5lYXIgLSBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAgICogQHBhcmFtIGZhciAtIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIG9ydGhvWk8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgICAgICBjb25zdCBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgICAgICAgY29uc3QgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gICAgICAgIGNvbnN0IG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICAgICAgb3V0WzBdID0gLTIgKiBscjtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMDtcbiAgICAgICAgb3V0WzRdID0gMDtcbiAgICAgICAgb3V0WzVdID0gLTIgKiBidDtcbiAgICAgICAgb3V0WzZdID0gMDtcbiAgICAgICAgb3V0WzddID0gMDtcbiAgICAgICAgb3V0WzhdID0gMDtcbiAgICAgICAgb3V0WzldID0gMDtcbiAgICAgICAgb3V0WzEwXSA9IG5mO1xuICAgICAgICBvdXRbMTFdID0gMDtcbiAgICAgICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgICAgIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICAgICAgICBvdXRbMTRdID0gbmVhciAqIG5mO1xuICAgICAgICBvdXRbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgbG9vay1hdCBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZXllIHBvc2l0aW9uLCBmb2NhbCBwb2ludCwgYW5kIHVwIGF4aXMuXG4gICAgICogSWYgeW91IHdhbnQgYSBtYXRyaXggdGhhdCBhY3R1YWxseSBtYWtlcyBhbiBvYmplY3QgbG9vayBhdCBhbm90aGVyIG9iamVjdCwgeW91IHNob3VsZCB1c2UgdGFyZ2V0VG8gaW5zdGVhZC5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgICAqIEBwYXJhbSBleWUgLSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gICAgICogQHBhcmFtIGNlbnRlciAtIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICAgICAqIEBwYXJhbSB1cCAtIHZlYzMgcG9pbnRpbmcgdXBcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBsb29rQXQob3V0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgICAgICAgY29uc3QgZXlleCA9IGV5ZVswXTtcbiAgICAgICAgY29uc3QgZXlleSA9IGV5ZVsxXTtcbiAgICAgICAgY29uc3QgZXlleiA9IGV5ZVsyXTtcbiAgICAgICAgY29uc3QgdXB4ID0gdXBbMF07XG4gICAgICAgIGNvbnN0IHVweSA9IHVwWzFdO1xuICAgICAgICBjb25zdCB1cHogPSB1cFsyXTtcbiAgICAgICAgY29uc3QgY2VudGVyeCA9IGNlbnRlclswXTtcbiAgICAgICAgY29uc3QgY2VudGVyeSA9IGNlbnRlclsxXTtcbiAgICAgICAgY29uc3QgY2VudGVyeiA9IGNlbnRlclsyXTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGV5ZXggLSBjZW50ZXJ4KSA8IEVQU0lMT04gJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGV5ZXkgLSBjZW50ZXJ5KSA8IEVQU0lMT04gJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIHJldHVybiBNYXQ0LmlkZW50aXR5KG91dCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHowID0gZXlleCAtIGNlbnRlcng7XG4gICAgICAgIGxldCB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICAgICAgICBsZXQgejIgPSBleWV6IC0gY2VudGVyejtcbiAgICAgICAgbGV0IGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICAgICAgejAgKj0gbGVuO1xuICAgICAgICB6MSAqPSBsZW47XG4gICAgICAgIHoyICo9IGxlbjtcbiAgICAgICAgbGV0IHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICAgICAgbGV0IHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgICAgICAgbGV0IHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgICAgICAgbGVuID0gTWF0aC5zcXJ0KHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4Mik7XG4gICAgICAgIGlmICghbGVuKSB7XG4gICAgICAgICAgICB4MCA9IDA7XG4gICAgICAgICAgICB4MSA9IDA7XG4gICAgICAgICAgICB4MiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICAgICAgeDEgKj0gbGVuO1xuICAgICAgICAgICAgeDIgKj0gbGVuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgICAgICBsZXQgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICAgICAgbGV0IHkyID0gejAgKiB4MSAtIHoxICogeDA7XG4gICAgICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgICAgICBpZiAoIWxlbikge1xuICAgICAgICAgICAgeTAgPSAwO1xuICAgICAgICAgICAgeTEgPSAwO1xuICAgICAgICAgICAgeTIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgICAgIHkwICo9IGxlbjtcbiAgICAgICAgICAgIHkxICo9IGxlbjtcbiAgICAgICAgICAgIHkyICo9IGxlbjtcbiAgICAgICAgfVxuICAgICAgICBvdXRbMF0gPSB4MDtcbiAgICAgICAgb3V0WzFdID0geTA7XG4gICAgICAgIG91dFsyXSA9IHowO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSB4MTtcbiAgICAgICAgb3V0WzVdID0geTE7XG4gICAgICAgIG91dFs2XSA9IHoxO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSB4MjtcbiAgICAgICAgb3V0WzldID0geTI7XG4gICAgICAgIG91dFsxMF0gPSB6MjtcbiAgICAgICAgb3V0WzExXSA9IDA7XG4gICAgICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgICAgIG91dFsxM10gPSAtKHkwICogZXlleCArIHkxICogZXlleSArIHkyICogZXlleik7XG4gICAgICAgIG91dFsxNF0gPSAtKHowICogZXlleCArIHoxICogZXlleSArIHoyICogZXlleik7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBtYXRyaXggdGhhdCBtYWtlcyBzb21ldGhpbmcgbG9vayBhdCBzb21ldGhpbmcgZWxzZS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgICAqIEBwYXJhbSBleWUgLSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gICAgICogQHBhcmFtIHRhcmdldCAtIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICAgICAqIEBwYXJhbSB1cCAtIHZlYzMgcG9pbnRpbmcgdXBcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyB0YXJnZXRUbyhvdXQsIGV5ZSwgdGFyZ2V0LCB1cCkge1xuICAgICAgICBjb25zdCBleWV4ID0gZXllWzBdO1xuICAgICAgICBjb25zdCBleWV5ID0gZXllWzFdO1xuICAgICAgICBjb25zdCBleWV6ID0gZXllWzJdO1xuICAgICAgICBjb25zdCB1cHggPSB1cFswXTtcbiAgICAgICAgY29uc3QgdXB5ID0gdXBbMV07XG4gICAgICAgIGNvbnN0IHVweiA9IHVwWzJdO1xuICAgICAgICBsZXQgejAgPSBleWV4IC0gdGFyZ2V0WzBdO1xuICAgICAgICBsZXQgejEgPSBleWV5IC0gdGFyZ2V0WzFdO1xuICAgICAgICBsZXQgejIgPSBleWV6IC0gdGFyZ2V0WzJdO1xuICAgICAgICBsZXQgbGVuID0gejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyO1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICAgICAgejAgKj0gbGVuO1xuICAgICAgICAgICAgejEgKj0gbGVuO1xuICAgICAgICAgICAgejIgKj0gbGVuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XG4gICAgICAgIGxldCB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgICAgIGxldCB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gICAgICAgIGxlbiA9IHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4MjtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgICAgIHgwICo9IGxlbjtcbiAgICAgICAgICAgIHgxICo9IGxlbjtcbiAgICAgICAgICAgIHgyICo9IGxlbjtcbiAgICAgICAgfVxuICAgICAgICBvdXRbMF0gPSB4MDtcbiAgICAgICAgb3V0WzFdID0geDE7XG4gICAgICAgIG91dFsyXSA9IHgyO1xuICAgICAgICBvdXRbM10gPSAwO1xuICAgICAgICBvdXRbNF0gPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICAgICAgb3V0WzVdID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgICAgIG91dFs2XSA9IHowICogeDEgLSB6MSAqIHgwO1xuICAgICAgICBvdXRbN10gPSAwO1xuICAgICAgICBvdXRbOF0gPSB6MDtcbiAgICAgICAgb3V0WzldID0gejE7XG4gICAgICAgIG91dFsxMF0gPSB6MjtcbiAgICAgICAgb3V0WzExXSA9IDA7XG4gICAgICAgIG91dFsxMl0gPSBleWV4O1xuICAgICAgICBvdXRbMTNdID0gZXlleTtcbiAgICAgICAgb3V0WzE0XSA9IGV5ZXo7XG4gICAgICAgIG91dFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEge0BsaW5rIE1hdDR9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICAgICAqIEByZXR1cm5zIEZyb2Jlbml1cyBub3JtXG4gICAgICovXG4gICAgc3RhdGljIGZyb2IoYSkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGFbMF0gKiBhWzBdICtcbiAgICAgICAgICAgIGFbMV0gKiBhWzFdICtcbiAgICAgICAgICAgIGFbMl0gKiBhWzJdICtcbiAgICAgICAgICAgIGFbM10gKiBhWzNdICtcbiAgICAgICAgICAgIGFbNF0gKiBhWzRdICtcbiAgICAgICAgICAgIGFbNV0gKiBhWzVdICtcbiAgICAgICAgICAgIGFbNl0gKiBhWzZdICtcbiAgICAgICAgICAgIGFbN10gKiBhWzddICtcbiAgICAgICAgICAgIGFbOF0gKiBhWzhdICtcbiAgICAgICAgICAgIGFbOV0gKiBhWzldICtcbiAgICAgICAgICAgIGFbMTBdICogYVsxMF0gK1xuICAgICAgICAgICAgYVsxMV0gKiBhWzExXSArXG4gICAgICAgICAgICBhWzEyXSAqIGFbMTJdICtcbiAgICAgICAgICAgIGFbMTNdICogYVsxM10gK1xuICAgICAgICAgICAgYVsxNF0gKiBhWzE0XSArXG4gICAgICAgICAgICBhWzE1XSAqIGFbMTVdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0d28ge0BsaW5rIE1hdDR9J3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGQob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICAgICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgICAgIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICAgICAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICAgICAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gICAgICAgIG91dFs2XSA9IGFbNl0gKyBiWzZdO1xuICAgICAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICAgICAgb3V0WzhdID0gYVs4XSArIGJbOF07XG4gICAgICAgIG91dFs5XSA9IGFbOV0gKyBiWzldO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgICAgICAgb3V0WzExXSA9IGFbMTFdICsgYlsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXSArIGJbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdICsgYlsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XSArIGJbMTVdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICAgICAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgICAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICAgICAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gICAgICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgICAgICBvdXRbNl0gPSBhWzZdIC0gYls2XTtcbiAgICAgICAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gICAgICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgICAgICBvdXRbOV0gPSBhWzldIC0gYls5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdIC0gYlsxMF07XG4gICAgICAgIG91dFsxMV0gPSBhWzExXSAtIGJbMTFdO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl0gLSBiWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdIC0gYlsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzE0XSAtIGJbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV0gLSBiWzE1XTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBNYXQ0LnN1YnRyYWN0fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc3ViKG91dCwgYSwgYikgeyByZXR1cm4gb3V0OyB9XG4gICAgLyoqXG4gICAgICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAgICogQHBhcmFtIGEgLSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gICAgICogQHBhcmFtIGIgLSBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXIob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgICAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICAgICAgb3V0WzVdID0gYVs1XSAqIGI7XG4gICAgICAgIG91dFs2XSA9IGFbNl0gKiBiO1xuICAgICAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICAgICAgb3V0WzhdID0gYVs4XSAqIGI7XG4gICAgICAgIG91dFs5XSA9IGFbOV0gKiBiO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF0gKiBiO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV0gKiBiO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl0gKiBiO1xuICAgICAgICBvdXRbMTNdID0gYVsxM10gKiBiO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF0gKiBiO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV0gKiBiO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHR3byBtYXQ0J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gc2NhbGUgLSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXJBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgICAgICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICAgICAgICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICAgICAgICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICAgICAgICBvdXRbNl0gPSBhWzZdICsgYls2XSAqIHNjYWxlO1xuICAgICAgICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICAgICAgICBvdXRbOF0gPSBhWzhdICsgYls4XSAqIHNjYWxlO1xuICAgICAgICBvdXRbOV0gPSBhWzldICsgYls5XSAqIHNjYWxlO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XSAqIHNjYWxlO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHR3byB7QGxpbmsgTWF0NH1zIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBtYXRyaXguXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZXhhY3RFcXVhbHMoYSwgYikge1xuICAgICAgICByZXR1cm4gKGFbMF0gPT09IGJbMF0gJiZcbiAgICAgICAgICAgIGFbMV0gPT09IGJbMV0gJiZcbiAgICAgICAgICAgIGFbMl0gPT09IGJbMl0gJiZcbiAgICAgICAgICAgIGFbM10gPT09IGJbM10gJiZcbiAgICAgICAgICAgIGFbNF0gPT09IGJbNF0gJiZcbiAgICAgICAgICAgIGFbNV0gPT09IGJbNV0gJiZcbiAgICAgICAgICAgIGFbNl0gPT09IGJbNl0gJiZcbiAgICAgICAgICAgIGFbN10gPT09IGJbN10gJiZcbiAgICAgICAgICAgIGFbOF0gPT09IGJbOF0gJiZcbiAgICAgICAgICAgIGFbOV0gPT09IGJbOV0gJiZcbiAgICAgICAgICAgIGFbMTBdID09PSBiWzEwXSAmJlxuICAgICAgICAgICAgYVsxMV0gPT09IGJbMTFdICYmXG4gICAgICAgICAgICBhWzEyXSA9PT0gYlsxMl0gJiZcbiAgICAgICAgICAgIGFbMTNdID09PSBiWzEzXSAmJlxuICAgICAgICAgICAgYVsxNF0gPT09IGJbMTRdICYmXG4gICAgICAgICAgICBhWzE1XSA9PT0gYlsxNV0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHR3byB7QGxpbmsgTWF0NH1zIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBtYXRyaXguXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICAgICAgY29uc3QgYTAgPSBhWzBdO1xuICAgICAgICBjb25zdCBhMSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGEyID0gYVsyXTtcbiAgICAgICAgY29uc3QgYTMgPSBhWzNdO1xuICAgICAgICBjb25zdCBhNCA9IGFbNF07XG4gICAgICAgIGNvbnN0IGE1ID0gYVs1XTtcbiAgICAgICAgY29uc3QgYTYgPSBhWzZdO1xuICAgICAgICBjb25zdCBhNyA9IGFbN107XG4gICAgICAgIGNvbnN0IGE4ID0gYVs4XTtcbiAgICAgICAgY29uc3QgYTkgPSBhWzldO1xuICAgICAgICBjb25zdCBhMTAgPSBhWzEwXTtcbiAgICAgICAgY29uc3QgYTExID0gYVsxMV07XG4gICAgICAgIGNvbnN0IGExMiA9IGFbMTJdO1xuICAgICAgICBjb25zdCBhMTMgPSBhWzEzXTtcbiAgICAgICAgY29uc3QgYTE0ID0gYVsxNF07XG4gICAgICAgIGNvbnN0IGExNSA9IGFbMTVdO1xuICAgICAgICBjb25zdCBiMCA9IGJbMF07XG4gICAgICAgIGNvbnN0IGIxID0gYlsxXTtcbiAgICAgICAgY29uc3QgYjIgPSBiWzJdO1xuICAgICAgICBjb25zdCBiMyA9IGJbM107XG4gICAgICAgIGNvbnN0IGI0ID0gYls0XTtcbiAgICAgICAgY29uc3QgYjUgPSBiWzVdO1xuICAgICAgICBjb25zdCBiNiA9IGJbNl07XG4gICAgICAgIGNvbnN0IGI3ID0gYls3XTtcbiAgICAgICAgY29uc3QgYjggPSBiWzhdO1xuICAgICAgICBjb25zdCBiOSA9IGJbOV07XG4gICAgICAgIGNvbnN0IGIxMCA9IGJbMTBdO1xuICAgICAgICBjb25zdCBiMTEgPSBiWzExXTtcbiAgICAgICAgY29uc3QgYjEyID0gYlsxMl07XG4gICAgICAgIGNvbnN0IGIxMyA9IGJbMTNdO1xuICAgICAgICBjb25zdCBiMTQgPSBiWzE0XTtcbiAgICAgICAgY29uc3QgYjE1ID0gYlsxNV07XG4gICAgICAgIHJldHVybiAoTWF0aC5hYnMoYTAgLSBiMCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTMgLSBiMykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTQgLSBiNCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTUgLSBiNSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTYgLSBiNikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTcgLSBiNykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGE3KSwgTWF0aC5hYnMoYjcpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTggLSBiOCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTkgLSBiOSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEwIC0gYjEwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTEwKSwgTWF0aC5hYnMoYjEwKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGExMSksIE1hdGguYWJzKGIxMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMTIgLSBiMTIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEzIC0gYjEzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMSwgTWF0aC5hYnMoYTEzKSwgTWF0aC5hYnMoYjEzKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEsIE1hdGguYWJzKGExNCksIE1hdGguYWJzKGIxNCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMTUgLSBiMTUpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB7QGxpbmsgTWF0NH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICAgICAqL1xuICAgIHN0YXRpYyBzdHIoYSkge1xuICAgICAgICByZXR1cm4gYE1hdDQoJHthLmpvaW4oJywgJyl9KWA7XG4gICAgfVxufVxuLy8gVGVtcG9yYXJ5IHZhcmlhYmxlcyB0byBwcmV2ZW50IHJlcGVhdGVkIGFsbG9jYXRpb25zIGluIHRoZSBhbGdvcml0aG1zIGFib3ZlLlxuY29uc3QgdG1wVmVjMyA9IG5ldyBWZWMzKCk7XG4vLyBJbnN0YW5jZSBtZXRob2QgYWxpYXMgYXNzaWdubWVudHNcbk1hdDQucHJvdG90eXBlLm11bCA9IE1hdDQucHJvdG90eXBlLm11bHRpcGx5O1xuLy8gU3RhdGljIG1ldGhvZCBhbGlhcyBhc3NpZ25tZW50c1xuTWF0NC5zdWIgPSBNYXQ0LnN1YnRyYWN0O1xuTWF0NC5tdWwgPSBNYXQ0Lm11bHRpcGx5O1xuTWF0NC5wZXJzcGVjdGl2ZSA9IE1hdDQucGVyc3BlY3RpdmVOTztcbk1hdDQub3J0aG8gPSBNYXQ0Lm9ydGhvTk87XG4vKipcbiAqIE1hdDQgYWxpYXMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKi9cbmV4cG9ydCBjb25zdCBtYXQ0ID0gTWF0NDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdDQuanMubWFwIiwiaW1wb3J0IHsgRVBTSUxPTiB9IGZyb20gJy4vY29tbW9uLmpzJztcbmltcG9ydCB7IE1hdDMgfSBmcm9tICcuL21hdDMuanMnO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4vdmVjMy5qcyc7XG5pbXBvcnQgeyBWZWM0IH0gZnJvbSAnLi92ZWM0LmpzJztcbi8qKlxuICogUXVhdGVybmlvblxuICovXG5leHBvcnQgY2xhc3MgUXVhdCBleHRlbmRzIEZsb2F0MzJBcnJheSB7XG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBieXRlcyBpbiBhIHtAbGluayBRdWF0fS5cbiAgICAgKi9cbiAgICBzdGF0aWMgQllURV9MRU5HVEggPSA0ICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHtAbGluayBRdWF0fS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciguLi52YWx1ZXMpIHtcbiAgICAgICAgc3dpdGNoICh2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgc3VwZXIodmFsdWVzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBzdXBlcih2YWx1ZXNbMF0sIHZhbHVlc1sxXSwgNCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2ID0gdmFsdWVzWzBdO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIoW3YsIHYsIHYsIHZdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKHYsIDAsIDQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgc3VwZXIoNCk7XG4gICAgICAgICAgICAgICAgdGhpc1szXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy89PT09PT09PT09PT1cbiAgICAvLyBBdHRyaWJ1dGVzXG4gICAgLy89PT09PT09PT09PT1cbiAgICAvLyBHZXR0ZXJzIGFuZCBzZXR0ZXJzIHRvIG1ha2UgY29tcG9uZW50IGFjY2VzcyByZWFkIGJldHRlci5cbiAgICAvLyBUaGVzZSBhcmUgbGlrZWx5IHRvIGJlIGEgbGl0dGxlIGJpdCBzbG93ZXIgdGhhbiBkaXJlY3QgYXJyYXkgYWNjZXNzLlxuICAgIC8qKlxuICAgICAqIFRoZSB4IGNvbXBvbmVudCBvZiB0aGUgcXVhdGVybmlvbi4gRXF1aXZhbGVudCB0byBgdGhpc1swXTtgXG4gICAgICogQGNhdGVnb3J5IFF1YXRlcm5pb24gY29tcG9uZW50c1xuICAgICAqL1xuICAgIGdldCB4KCkgeyByZXR1cm4gdGhpc1swXTsgfVxuICAgIHNldCB4KHZhbHVlKSB7IHRoaXNbMF0gPSB2YWx1ZTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgcXVhdGVybmlvbi4gRXF1aXZhbGVudCB0byBgdGhpc1sxXTtgXG4gICAgICogQGNhdGVnb3J5IFF1YXRlcm5pb24gY29tcG9uZW50c1xuICAgICAqL1xuICAgIGdldCB5KCkgeyByZXR1cm4gdGhpc1sxXTsgfVxuICAgIHNldCB5KHZhbHVlKSB7IHRoaXNbMV0gPSB2YWx1ZTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSB6IGNvbXBvbmVudCBvZiB0aGUgcXVhdGVybmlvbi4gRXF1aXZhbGVudCB0byBgdGhpc1syXTtgXG4gICAgICogQGNhdGVnb3J5IFF1YXRlcm5pb24gY29tcG9uZW50c1xuICAgICAqL1xuICAgIGdldCB6KCkgeyByZXR1cm4gdGhpc1syXTsgfVxuICAgIHNldCB6KHZhbHVlKSB7IHRoaXNbMl0gPSB2YWx1ZTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSB3IGNvbXBvbmVudCBvZiB0aGUgcXVhdGVybmlvbi4gRXF1aXZhbGVudCB0byBgdGhpc1szXTtgXG4gICAgICogQGNhdGVnb3J5IFF1YXRlcm5pb24gY29tcG9uZW50c1xuICAgICAqL1xuICAgIGdldCB3KCkgeyByZXR1cm4gdGhpc1szXTsgfVxuICAgIHNldCB3KHZhbHVlKSB7IHRoaXNbM10gPSB2YWx1ZTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSBtYWduaXR1ZGUgKGxlbmd0aCkgb2YgdGhpcy5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBRdWF0Lm1hZ25pdHVkZSh0aGlzKTtgXG4gICAgICpcbiAgICAgKiBNYWduaXR1ZGUgaXMgdXNlZCBiZWNhdXNlIHRoZSBgbGVuZ3RoYCBhdHRyaWJ1dGUgaXMgYWxyZWFkeSBkZWZpbmVkIGJ5XG4gICAgICogYEZsb2F0MzJBcnJheWAgdG8gbWVhbiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBhcnJheS5cbiAgICAgKi9cbiAgICBnZXQgbWFnbml0dWRlKCkge1xuICAgICAgICBjb25zdCB4ID0gdGhpc1swXTtcbiAgICAgICAgY29uc3QgeSA9IHRoaXNbMV07XG4gICAgICAgIGNvbnN0IHogPSB0aGlzWzJdO1xuICAgICAgICBjb25zdCB3ID0gdGhpc1szXTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgUXVhdC5tYWduaXR1ZGV9XG4gICAgICovXG4gICAgZ2V0IG1hZygpIHsgcmV0dXJuIHRoaXMubWFnbml0dWRlOyB9XG4gICAgLyoqXG4gICAgICogQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYHRoaXNgXG4gICAgICogRXF1aXZhbGVudCB0byBgUXVhdC5zdHIodGhpcyk7YFxuICAgICAqL1xuICAgIGdldCBzdHIoKSB7XG4gICAgICAgIHJldHVybiBRdWF0LnN0cih0aGlzKTtcbiAgICB9XG4gICAgLy89PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSW5zdGFuY2VzIG1ldGhvZHNcbiAgICAvLz09PT09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBhbm90aGVyIHtAbGluayBRdWF0fSBpbnRvIGB0aGlzYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIHRoZSBzb3VyY2UgcXVhdGVybmlvblxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIGNvcHkoYSkge1xuICAgICAgICBzdXBlci5zZXQoYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgYHRoaXNgIHRvIHRoZSBpZGVudGl0eSBxdWF0ZXJuaW9uXG4gICAgICogRXF1aXZhbGVudCB0byBRdWF0LmlkZW50aXR5KHRoaXMpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgdGhpc1swXSA9IDA7XG4gICAgICAgIHRoaXNbMV0gPSAwO1xuICAgICAgICB0aGlzWzJdID0gMDtcbiAgICAgICAgdGhpc1szXSA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGB0aGlzYCBieSBhIHtAbGluayBRdWF0fS5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBRdWF0Lm11bHRpcGx5KHRoaXMsIHRoaXMsIGIpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHZlY3RvciB0byBtdWx0aXBseSBgdGhpc2AgYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBtdWx0aXBseShiKSB7XG4gICAgICAgIHJldHVybiBRdWF0Lm11bHRpcGx5KHRoaXMsIHRoaXMsIGIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFF1YXQubXVsdGlwbHl9XG4gICAgICovXG4gICAgbXVsKGIpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGB0aGlzYCBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFggYXhpc1xuICAgICAqIEVxdWl2YWxlbnQgdG8gYFF1YXQucm90YXRlWCh0aGlzLCB0aGlzLCByYWQpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSByYWQgLSBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcm90YXRlWChyYWQpIHtcbiAgICAgICAgcmV0dXJuIFF1YXQucm90YXRlWCh0aGlzLCB0aGlzLCByYWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGB0aGlzYCBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFkgYXhpc1xuICAgICAqIEVxdWl2YWxlbnQgdG8gYFF1YXQucm90YXRlWSh0aGlzLCB0aGlzLCByYWQpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSByYWQgLSBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcm90YXRlWShyYWQpIHtcbiAgICAgICAgcmV0dXJuIFF1YXQucm90YXRlWSh0aGlzLCB0aGlzLCByYWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGB0aGlzYCBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFogYXhpc1xuICAgICAqIEVxdWl2YWxlbnQgdG8gYFF1YXQucm90YXRlWih0aGlzLCB0aGlzLCByYWQpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSByYWQgLSBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgcm90YXRlWihyYWQpIHtcbiAgICAgICAgcmV0dXJuIFF1YXQucm90YXRlWih0aGlzLCB0aGlzLCByYWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZlcnRzIGB0aGlzYFxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFF1YXQuaW52ZXJ0KHRoaXMsIHRoaXMpO2BcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIGludmVydCgpIHtcbiAgICAgICAgcmV0dXJuIFF1YXQuaW52ZXJ0KHRoaXMsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2FsZXMgYHRoaXNgIGJ5IGEgc2NhbGFyIG51bWJlclxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFF1YXQuc2NhbGUodGhpcywgdGhpcywgc2NhbGUpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHZlY3RvciB0byBzY2FsZVxuICAgICAqIEBwYXJhbSBzY2FsZSAtIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgc2NhbGUoc2NhbGUpIHtcbiAgICAgICAgdGhpc1swXSAqPSBzY2FsZTtcbiAgICAgICAgdGhpc1sxXSAqPSBzY2FsZTtcbiAgICAgICAgdGhpc1syXSAqPSBzY2FsZTtcbiAgICAgICAgdGhpc1szXSAqPSBzY2FsZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIGB0aGlzYCBhbmQgYW5vdGhlciB7QGxpbmsgUXVhdH1cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBRdWF0LmRvdCh0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGRvdCBwcm9kdWN0IG9mIGB0aGlzYCBhbmQgYlxuICAgICAqL1xuICAgIGRvdChiKSB7XG4gICAgICAgIHJldHVybiBRdWF0LmRvdCh0aGlzLCBiKTtcbiAgICB9XG4gICAgLy89PT09PT09PT09PT09PT09PT09XG4gICAgLy8gU3RhdGljIG1ldGhvZHNcbiAgICAvLz09PT09PT09PT09PT09PT09PT1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IHF1YXRcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIG5ldyBxdWF0ZXJuaW9uXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIHF1YXQgdG8gdGhlIGlkZW50aXR5IHF1YXRlcm5pb25cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgaWRlbnRpdHkob3V0KSB7XG4gICAgICAgIG91dFswXSA9IDA7XG4gICAgICAgIG91dFsxXSA9IDA7XG4gICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgIG91dFszXSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBxdWF0IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFuZCByb3RhdGlvbiBheGlzLFxuICAgICAqIHRoZW4gcmV0dXJucyBpdC5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIGF4aXMgLSB0aGUgYXhpcyBhcm91bmQgd2hpY2ggdG8gcm90YXRlXG4gICAgICogQHBhcmFtIHJhZCAtIHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKiovXG4gICAgc3RhdGljIHNldEF4aXNBbmdsZShvdXQsIGF4aXMsIHJhZCkge1xuICAgICAgICByYWQgPSByYWQgKiAwLjU7XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBvdXRbMF0gPSBzICogYXhpc1swXTtcbiAgICAgICAgb3V0WzFdID0gcyAqIGF4aXNbMV07XG4gICAgICAgIG91dFsyXSA9IHMgKiBheGlzWzJdO1xuICAgICAgICBvdXRbM10gPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByb3RhdGlvbiBheGlzIGFuZCBhbmdsZSBmb3IgYSBnaXZlblxuICAgICAqICBxdWF0ZXJuaW9uLiBJZiBhIHF1YXRlcm5pb24gaXMgY3JlYXRlZCB3aXRoXG4gICAgICogIHNldEF4aXNBbmdsZSwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWVcbiAgICAgKiAgdmFsdWVzIGFzIHByb3ZpZGllZCBpbiB0aGUgb3JpZ2luYWwgcGFyYW1ldGVyIGxpc3RcbiAgICAgKiAgT1IgZnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdmFsdWVzLlxuICAgICAqIEV4YW1wbGU6IFRoZSBxdWF0ZXJuaW9uIGZvcm1lZCBieSBheGlzIFswLCAwLCAxXSBhbmRcbiAgICAgKiAgYW5nbGUgLTkwIGlzIHRoZSBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIGZvcm1lZCBieVxuICAgICAqICBbMCwgMCwgMV0gYW5kIDI3MC4gVGhpcyBtZXRob2QgZmF2b3JzIHRoZSBsYXR0ZXIuXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dF9heGlzIC0gVmVjdG9yIHJlY2VpdmluZyB0aGUgYXhpcyBvZiByb3RhdGlvblxuICAgICAqIEBwYXJhbSBxIC0gUXVhdGVybmlvbiB0byBiZSBkZWNvbXBvc2VkXG4gICAgICogQHJldHVybiBBbmdsZSwgaW4gcmFkaWFucywgb2YgdGhlIHJvdGF0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGdldEF4aXNBbmdsZShvdXRfYXhpcywgcSkge1xuICAgICAgICBjb25zdCByYWQgPSBNYXRoLmFjb3MocVszXSkgKiAyLjA7XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQgLyAyLjApO1xuICAgICAgICBpZiAocyA+IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dF9heGlzWzBdID0gcVswXSAvIHM7XG4gICAgICAgICAgICBvdXRfYXhpc1sxXSA9IHFbMV0gLyBzO1xuICAgICAgICAgICAgb3V0X2F4aXNbMl0gPSBxWzJdIC8gcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHMgaXMgemVybywgcmV0dXJuIGFueSBheGlzIChubyByb3RhdGlvbiAtIGF4aXMgZG9lcyBub3QgbWF0dGVyKVxuICAgICAgICAgICAgb3V0X2F4aXNbMF0gPSAxO1xuICAgICAgICAgICAgb3V0X2F4aXNbMV0gPSAwO1xuICAgICAgICAgICAgb3V0X2F4aXNbMl0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFuZ3VsYXIgZGlzdGFuY2UgYmV0d2VlbiB0d28gdW5pdCBxdWF0ZXJuaW9uc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdH0gYSAgICAgT3JpZ2luIHVuaXQgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdH0gYiAgICAgRGVzdGluYXRpb24gdW5pdCBxdWF0ZXJuaW9uXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAgICAgQW5nbGUsIGluIHJhZGlhbnMsIGJldHdlZW4gdGhlIHR3byBxdWF0ZXJuaW9uc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBbmdsZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IGRvdHByb2R1Y3QgPSBRdWF0LmRvdChhLCBiKTtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcygyICogZG90cHJvZHVjdCAqIGRvdHByb2R1Y3QgLSAxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyB0d28gcXVhdCdzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgICAgICBjb25zdCBheCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGF5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgYXogPSBhWzJdO1xuICAgICAgICBjb25zdCBhdyA9IGFbM107XG4gICAgICAgIGNvbnN0IGJ4ID0gYlswXTtcbiAgICAgICAgY29uc3QgYnkgPSBiWzFdO1xuICAgICAgICBjb25zdCBieiA9IGJbMl07XG4gICAgICAgIGNvbnN0IGJ3ID0gYlszXTtcbiAgICAgICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieTtcbiAgICAgICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICAgICAgb3V0WzJdID0gYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICAgICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBYIGF4aXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgICAqIEBwYXJhbSBhIC0gcXVhdCB0byByb3RhdGVcbiAgICAgKiBAcGFyYW0gcmFkIC0gYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICAgICAgcmFkICo9IDAuNTtcbiAgICAgICAgY29uc3QgYXggPSBhWzBdO1xuICAgICAgICBjb25zdCBheSA9IGFbMV07XG4gICAgICAgIGNvbnN0IGF6ID0gYVsyXTtcbiAgICAgICAgY29uc3QgYXcgPSBhWzNdO1xuICAgICAgICBjb25zdCBieCA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGJ3ID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgb3V0WzBdID0gYXggKiBidyArIGF3ICogYng7XG4gICAgICAgIG91dFsxXSA9IGF5ICogYncgKyBheiAqIGJ4O1xuICAgICAgICBvdXRbMl0gPSBheiAqIGJ3IC0gYXkgKiBieDtcbiAgICAgICAgb3V0WzNdID0gYXcgKiBidyAtIGF4ICogYng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWSBheGlzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICAgKiBAcGFyYW0gYSAtIHF1YXQgdG8gcm90YXRlXG4gICAgICogQHBhcmFtIHJhZCAtIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gICAgICAgIHJhZCAqPSAwLjU7XG4gICAgICAgIGNvbnN0IGF4ID0gYVswXTtcbiAgICAgICAgY29uc3QgYXkgPSBhWzFdO1xuICAgICAgICBjb25zdCBheiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGF3ID0gYVszXTtcbiAgICAgICAgY29uc3QgYnkgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBjb25zdCBidyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIG91dFswXSA9IGF4ICogYncgLSBheiAqIGJ5O1xuICAgICAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieTtcbiAgICAgICAgb3V0WzJdID0gYXogKiBidyArIGF4ICogYnk7XG4gICAgICAgIG91dFszXSA9IGF3ICogYncgLSBheSAqIGJ5O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFogYXhpc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAgICogQHBhcmFtIGEgLSBxdWF0IHRvIHJvdGF0ZVxuICAgICAqIEBwYXJhbSByYWQgLSBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICAgICAgICByYWQgKj0gMC41O1xuICAgICAgICBjb25zdCBheCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGF5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgYXogPSBhWzJdO1xuICAgICAgICBjb25zdCBhdyA9IGFbM107XG4gICAgICAgIGNvbnN0IGJ6ID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYncgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXkgKiBiejtcbiAgICAgICAgb3V0WzFdID0gYXkgKiBidyAtIGF4ICogYno7XG4gICAgICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6O1xuICAgICAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXogKiBiejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgVyBjb21wb25lbnQgb2YgYSBxdWF0IGZyb20gdGhlIFgsIFksIGFuZCBaIGNvbXBvbmVudHMuXG4gICAgICogQXNzdW1lcyB0aGF0IHF1YXRlcm5pb24gaXMgMSB1bml0IGluIGxlbmd0aC5cbiAgICAgKiBBbnkgZXhpc3RpbmcgVyBjb21wb25lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gYSAtIHF1YXQgdG8gY2FsY3VsYXRlIFcgY29tcG9uZW50IG9mXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgY2FsY3VsYXRlVyhvdXQsIGEpIHtcbiAgICAgICAgY29uc3QgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXTtcbiAgICAgICAgb3V0WzBdID0geDtcbiAgICAgICAgb3V0WzFdID0geTtcbiAgICAgICAgb3V0WzJdID0gejtcbiAgICAgICAgb3V0WzNdID0gTWF0aC5zcXJ0KE1hdGguYWJzKDEuMCAtIHggKiB4IC0geSAqIHkgLSB6ICogeikpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mIGEgdW5pdCBxdWF0ZXJuaW9uLlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gYSAtIHF1YXQgdG8gY2FsY3VsYXRlIHRoZSBleHBvbmVudGlhbCBvZlxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGV4cChvdXQsIGEpIHtcbiAgICAgICAgY29uc3QgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSwgdyA9IGFbM107XG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcbiAgICAgICAgY29uc3QgZXQgPSBNYXRoLmV4cCh3KTtcbiAgICAgICAgY29uc3QgcyA9IHIgPiAwID8gKGV0ICogTWF0aC5zaW4ocikpIC8gciA6IDA7XG4gICAgICAgIG91dFswXSA9IHggKiBzO1xuICAgICAgICBvdXRbMV0gPSB5ICogcztcbiAgICAgICAgb3V0WzJdID0geiAqIHM7XG4gICAgICAgIG91dFszXSA9IGV0ICogTWF0aC5jb3Mocik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgYSB1bml0IHF1YXRlcm5pb24uXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSBhIC0gcXVhdCB0byBjYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbG4ob3V0LCBhKSB7XG4gICAgICAgIGNvbnN0IHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdO1xuICAgICAgICBjb25zdCByID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG4gICAgICAgIGNvbnN0IHQgPSByID4gMCA/IE1hdGguYXRhbjIociwgdykgLyByIDogMDtcbiAgICAgICAgb3V0WzBdID0geCAqIHQ7XG4gICAgICAgIG91dFsxXSA9IHkgKiB0O1xuICAgICAgICBvdXRbMl0gPSB6ICogdDtcbiAgICAgICAgb3V0WzNdID0gMC41ICogTWF0aC5sb2coeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGUgdGhlIHNjYWxhciBwb3dlciBvZiBhIHVuaXQgcXVhdGVybmlvbi5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIGEgLSBxdWF0IHRvIGNhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgb2ZcbiAgICAgKiBAcGFyYW0gYiAtIGFtb3VudCB0byBzY2FsZSB0aGUgcXVhdGVybmlvbiBieVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHBvdyhvdXQsIGEsIGIpIHtcbiAgICAgICAgUXVhdC5sbihvdXQsIGEpO1xuICAgICAgICBRdWF0LnNjYWxlKG91dCwgb3V0LCBiKTtcbiAgICAgICAgUXVhdC5leHAob3V0LCBvdXQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHNwaGVyaWNhbCBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBxdWF0XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEBwYXJhbSB0IC0gaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHNsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgICAgICAvLyBiZW5jaG1hcmtzOlxuICAgICAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xuICAgICAgICBjb25zdCBheCA9IGFbMF0sIGF5ID0gYVsxXSwgYXogPSBhWzJdLCBhdyA9IGFbM107XG4gICAgICAgIGxldCBieCA9IGJbMF0sIGJ5ID0gYlsxXSwgYnogPSBiWzJdLCBidyA9IGJbM107XG4gICAgICAgIGxldCBzY2FsZTA7XG4gICAgICAgIGxldCBzY2FsZTE7XG4gICAgICAgIC8vIGNhbGMgY29zaW5lXG4gICAgICAgIGxldCBjb3NvbSA9IGF4ICogYnggKyBheSAqIGJ5ICsgYXogKiBieiArIGF3ICogYnc7XG4gICAgICAgIC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxuICAgICAgICBpZiAoY29zb20gPCAwLjApIHtcbiAgICAgICAgICAgIGNvc29tID0gLWNvc29tO1xuICAgICAgICAgICAgYnggPSAtYng7XG4gICAgICAgICAgICBieSA9IC1ieTtcbiAgICAgICAgICAgIGJ6ID0gLWJ6O1xuICAgICAgICAgICAgYncgPSAtYnc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsY3VsYXRlIGNvZWZmaWNpZW50c1xuICAgICAgICBpZiAoMS4wIC0gY29zb20gPiBFUFNJTE9OKSB7XG4gICAgICAgICAgICAvLyBzdGFuZGFyZCBjYXNlIChzbGVycClcbiAgICAgICAgICAgIGNvbnN0IG9tZWdhID0gTWF0aC5hY29zKGNvc29tKTtcbiAgICAgICAgICAgIGNvbnN0IHNpbm9tID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgICAgICAgc2NhbGUwID0gTWF0aC5zaW4oKDEuMCAtIHQpICogb21lZ2EpIC8gc2lub207XG4gICAgICAgICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlXG4gICAgICAgICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICAgICAgICBzY2FsZTAgPSAxLjAgLSB0O1xuICAgICAgICAgICAgc2NhbGUxID0gdDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxjdWxhdGUgZmluYWwgdmFsdWVzXG4gICAgICAgIG91dFswXSA9IHNjYWxlMCAqIGF4ICsgc2NhbGUxICogYng7XG4gICAgICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgICAgIG91dFsyXSA9IHNjYWxlMCAqIGF6ICsgc2NhbGUxICogYno7XG4gICAgICAgIG91dFszXSA9IHNjYWxlMCAqIGF3ICsgc2NhbGUxICogYnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHJhbmRvbSB1bml0IHF1YXRlcm5pb25cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICAvKnN0YXRpYyByYW5kb20ob3V0OiBRdWF0TGlrZSk6IFF1YXRMaWtlIHtcbiAgICAgIC8vIEltcGxlbWVudGF0aW9uIG9mIGh0dHA6Ly9wbGFubmluZy5jcy51aXVjLmVkdS9ub2RlMTk4Lmh0bWxcbiAgICAgIC8vIFRPRE86IENhbGxpbmcgcmFuZG9tIDMgdGltZXMgaXMgcHJvYmFibHkgbm90IHRoZSBmYXN0ZXN0IHNvbHV0aW9uXG4gICAgICBsZXQgdTEgPSBnbE1hdHJpeC5SQU5ET00oKTtcbiAgICAgIGxldCB1MiA9IGdsTWF0cml4LlJBTkRPTSgpO1xuICAgICAgbGV0IHUzID0gZ2xNYXRyaXguUkFORE9NKCk7XG4gIFxuICAgICAgbGV0IHNxcnQxTWludXNVMSA9IE1hdGguc3FydCgxIC0gdTEpO1xuICAgICAgbGV0IHNxcnRVMSA9IE1hdGguc3FydCh1MSk7XG4gIFxuICAgICAgb3V0WzBdID0gc3FydDFNaW51c1UxICogTWF0aC5zaW4oMi4wICogTWF0aC5QSSAqIHUyKTtcbiAgICAgIG91dFsxXSA9IHNxcnQxTWludXNVMSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB1Mik7XG4gICAgICBvdXRbMl0gPSBzcXJ0VTEgKiBNYXRoLnNpbigyLjAgKiBNYXRoLlBJICogdTMpO1xuICAgICAgb3V0WzNdID0gc3FydFUxICogTWF0aC5jb3MoMi4wICogTWF0aC5QSSAqIHUzKTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfSovXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBvZiBhIHF1YXRcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIGEgLSBxdWF0IHRvIGNhbGN1bGF0ZSBpbnZlcnNlIG9mXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgaW52ZXJ0KG91dCwgYSkge1xuICAgICAgICBjb25zdCBhMCA9IGFbMF0sIGExID0gYVsxXSwgYTIgPSBhWzJdLCBhMyA9IGFbM107XG4gICAgICAgIGNvbnN0IGRvdCA9IGEwICogYTAgKyBhMSAqIGExICsgYTIgKiBhMiArIGEzICogYTM7XG4gICAgICAgIGNvbnN0IGludkRvdCA9IGRvdCA/IDEuMCAvIGRvdCA6IDA7XG4gICAgICAgIC8vIFRPRE86IFdvdWxkIGJlIGZhc3RlciB0byByZXR1cm4gWzAsMCwwLDBdIGltbWVkaWF0ZWx5IGlmIGRvdCA9PSAwXG4gICAgICAgIG91dFswXSA9IC1hMCAqIGludkRvdDtcbiAgICAgICAgb3V0WzFdID0gLWExICogaW52RG90O1xuICAgICAgICBvdXRbMl0gPSAtYTIgKiBpbnZEb3Q7XG4gICAgICAgIG91dFszXSA9IGEzICogaW52RG90O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBjb25qdWdhdGUgb2YgYSBxdWF0XG4gICAgICogSWYgdGhlIHF1YXRlcm5pb24gaXMgbm9ybWFsaXplZCwgdGhpcyBmdW5jdGlvbiBpcyBmYXN0ZXIgdGhhbiBxdWF0LmludmVyc2UgYW5kIHByb2R1Y2VzIHRoZSBzYW1lIHJlc3VsdC5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIGEgLSBxdWF0IHRvIGNhbGN1bGF0ZSBjb25qdWdhdGUgb2ZcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBjb25qdWdhdGUob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IC1hWzBdO1xuICAgICAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICAgICAgb3V0WzJdID0gLWFbMl07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIDN4MyByb3RhdGlvbiBtYXRyaXguXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGUgcmVzdWx0YW50IHF1YXRlcm5pb24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIHlvdSBzaG91bGQgYmUgc3VyZVxuICAgICAqIHRvIHJlbm9ybWFsaXplIHRoZSBxdWF0ZXJuaW9uIHlvdXJzZWxmIHdoZXJlIG5lY2Vzc2FyeS5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIG0gLSByb3RhdGlvbiBtYXRyaXhcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tTWF0MyhvdXQsIG0pIHtcbiAgICAgICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAgICAgLy8gYXJ0aWNsZSBcIlF1YXRlcm5pb24gQ2FsY3VsdXMgYW5kIEZhc3QgQW5pbWF0aW9uXCIuXG4gICAgICAgIGNvbnN0IGZUcmFjZSA9IG1bMF0gKyBtWzRdICsgbVs4XTtcbiAgICAgICAgbGV0IGZSb290O1xuICAgICAgICBpZiAoZlRyYWNlID4gMC4wKSB7XG4gICAgICAgICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICAgICAgICBmUm9vdCA9IE1hdGguc3FydChmVHJhY2UgKyAxLjApOyAvLyAyd1xuICAgICAgICAgICAgb3V0WzNdID0gMC41ICogZlJvb3Q7XG4gICAgICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290OyAvLyAxLyg0dylcbiAgICAgICAgICAgIG91dFswXSA9IChtWzVdIC0gbVs3XSkgKiBmUm9vdDtcbiAgICAgICAgICAgIG91dFsxXSA9IChtWzZdIC0gbVsyXSkgKiBmUm9vdDtcbiAgICAgICAgICAgIG91dFsyXSA9IChtWzFdIC0gbVszXSkgKiBmUm9vdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHx3fCA8PSAxLzJcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGlmIChtWzRdID4gbVswXSlcbiAgICAgICAgICAgICAgICBpID0gMTtcbiAgICAgICAgICAgIGlmIChtWzhdID4gbVtpICogMyArIGldKVxuICAgICAgICAgICAgICAgIGkgPSAyO1xuICAgICAgICAgICAgbGV0IGogPSAoaSArIDEpICUgMztcbiAgICAgICAgICAgIGxldCBrID0gKGkgKyAyKSAlIDM7XG4gICAgICAgICAgICBmUm9vdCA9IE1hdGguc3FydChtW2kgKiAzICsgaV0gLSBtW2ogKiAzICsgal0gLSBtW2sgKiAzICsga10gKyAxLjApO1xuICAgICAgICAgICAgb3V0W2ldID0gMC41ICogZlJvb3Q7XG4gICAgICAgICAgICBmUm9vdCA9IDAuNSAvIGZSb290O1xuICAgICAgICAgICAgb3V0WzNdID0gKG1baiAqIDMgKyBrXSAtIG1bayAqIDMgKyBqXSkgKiBmUm9vdDtcbiAgICAgICAgICAgIG91dFtqXSA9IChtW2ogKiAzICsgaV0gKyBtW2kgKiAzICsgal0pICogZlJvb3Q7XG4gICAgICAgICAgICBvdXRba10gPSAobVtrICogMyArIGldICsgbVtpICogMyArIGtdKSAqIGZSb290O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIGV1bGVyIGFuZ2xlIHgsIHksIHouXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSB4IC0gQW5nbGUgdG8gcm90YXRlIGFyb3VuZCBYIGF4aXMgaW4gZGVncmVlcy5cbiAgICAgKiBAcGFyYW0geSAtIEFuZ2xlIHRvIHJvdGF0ZSBhcm91bmQgWSBheGlzIGluIGRlZ3JlZXMuXG4gICAgICogQHBhcmFtIHogLSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFogYXhpcyBpbiBkZWdyZWVzLlxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZyb21FdWxlcihvdXQsIHgsIHksIHopIHtcbiAgICAgICAgbGV0IGhhbGZUb1JhZCA9ICgwLjUgKiBNYXRoLlBJKSAvIDE4MC4wO1xuICAgICAgICB4ICo9IGhhbGZUb1JhZDtcbiAgICAgICAgeSAqPSBoYWxmVG9SYWQ7XG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xuICAgICAgICBsZXQgc3ggPSBNYXRoLnNpbih4KTtcbiAgICAgICAgbGV0IGN4ID0gTWF0aC5jb3MoeCk7XG4gICAgICAgIGxldCBzeSA9IE1hdGguc2luKHkpO1xuICAgICAgICBsZXQgY3kgPSBNYXRoLmNvcyh5KTtcbiAgICAgICAgbGV0IHN6ID0gTWF0aC5zaW4oeik7XG4gICAgICAgIGxldCBjeiA9IE1hdGguY29zKHopO1xuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogLSBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogKyBzeCAqIHN5ICogc3o7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBxdWF0ZW5pb25cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBzdHIoYSkge1xuICAgICAgICByZXR1cm4gYFF1YXQoJHthLmpvaW4oJywgJyl9KWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHF1YXRlcm5pb24gdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJucyBhIG5ldyBxdWF0ZXJuaW9uXG4gICAgICovXG4gICAgc3RhdGljIGNsb25lKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIHggLSBYIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB5IC0gWSBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0geiAtIFogY29tcG9uZW50XG4gICAgICogQHBhcmFtIHcgLSBXIGNvbXBvbmVudFxuICAgICAqIEByZXR1cm5zIGEgbmV3IHF1YXRlcm5pb25cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVZhbHVlcyh4LCB5LCB6LCB3KSB7XG4gICAgICAgIHJldHVybiBuZXcgUXVhdCh4LCB5LCB6LCB3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHF1YXQgdG8gYW5vdGhlclxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBzb3VyY2UgcXVhdGVybmlvblxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGNvcHkob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHtAbGluayBRdWF0fSB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSB4IC0gWCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0geSAtIFkgY29tcG9uZW50XG4gICAgICogQHBhcmFtIHogLSBaIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB3IC0gVyBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQob3V0LCB4LCB5LCB6LCB3KSB7IHJldHVybiBvdXQ7IH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHR3byB7QGxpbmsgUXVhdH0nc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGQob3V0LCBhLCBiKSB7IHJldHVybiBvdXQ7IH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFF1YXQubXVsdGlwbHl9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWwob3V0LCBhLCBiKSB7IHJldHVybiBvdXQ7IH1cbiAgICAvKipcbiAgICAgKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHZlY3RvciB0byBzY2FsZVxuICAgICAqIEBwYXJhbSBiIC0gYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzY2FsZShvdXQsIGEsIHNjYWxlKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBzY2FsZTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogc2NhbGU7XG4gICAgICAgIG91dFszXSA9IGFbM10gKiBzY2FsZTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHF1YXQnc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAgICAgKi9cbiAgICBzdGF0aWMgZG90KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXQnc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gdCAtIGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBsZXJwKG91dCwgYSwgYiwgdCkgeyByZXR1cm4gb3V0OyB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIChsZW5ndGgpIG9mIGEge0BsaW5rIFF1YXR9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSBxdWF0ZXJuaW9uIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAgICAgKiBAcmV0dXJucyBsZW5ndGggb2YgYGFgXG4gICAgICovXG4gICAgc3RhdGljIG1hZ25pdHVkZShhKSB7IHJldHVybiAwOyB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBRdWF0Lm1hZ25pdHVkZX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG1hZyhhKSB7IHJldHVybiAwOyB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBRdWF0Lm1hZ25pdHVkZX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBRdWF0Lm1hZ25pdHVkZX0gdG8gYXZvaWQgY29uZmxpY3RzIHdpdGggYnVpbHRpbiBgbGVuZ3RoYCBtZXRob2RzL2F0dHJpYnNcbiAgICAgKi9cbiAgICAvLyBAdHMtaWdub3JlOiBMZW5ndGggY29uZmxpY3RzIHdpdGggRnVuY3Rpb24ubGVuZ3RoXG4gICAgc3RhdGljIGxlbmd0aChhKSB7IHJldHVybiAwOyB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBRdWF0Lm1hZ25pdHVkZX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBRdWF0Lm1hZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgbGVuKGEpIHsgcmV0dXJuIDA7IH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHtAbGluayBRdWF0fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gcXVhdGVybmlvbiB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAgICAgKiBAcmV0dXJucyBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gICAgICovXG4gICAgc3RhdGljIHNxdWFyZWRMZW5ndGgoYSkgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgUXVhdC5zcXVhcmVkTGVuZ3RofVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc3FyTGVuKGEpIHsgcmV0dXJuIDA7IH1cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemUgYSB7QGxpbmsgUXVhdH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIGEgLSBxdWF0ZXJuaW9uIHRvIG5vcm1hbGl6ZVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIG5vcm1hbGl6ZShvdXQsIGEpIHsgcmV0dXJuIG91dDsgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHF1YXRlcm5pb25zIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBxdWF0ZXJuaW9uLlxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHNlY29uZCBxdWF0ZXJuaW9uLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgc3RhdGljIGV4YWN0RXF1YWxzKGEsIGIpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gVGhlIGZpcnN0IHZlY3Rvci5cbiAgICAgKiBAcGFyYW0gYiAtIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgc3RhdGljIGVxdWFscyhhLCBiKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCB0aGUgc2hvcnRlc3Qgcm90YXRpb24gZnJvbSBvbmVcbiAgICAgKiB2ZWN0b3IgdG8gYW5vdGhlci5cbiAgICAgKlxuICAgICAqIEJvdGggdmVjdG9ycyBhcmUgYXNzdW1lZCB0byBiZSB1bml0IGxlbmd0aC5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uLlxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGluaXRpYWwgdmVjdG9yXG4gICAgICogQHBhcmFtIGIgLSB0aGUgZGVzdGluYXRpb24gdmVjdG9yXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRpb25UbyhvdXQsIGEsIGIpIHtcbiAgICAgICAgbGV0IGRvdCA9IFZlYzMuZG90KGEsIGIpO1xuICAgICAgICBpZiAoZG90IDwgLTAuOTk5OTk5KSB7XG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRtcFZlYzMsIHhVbml0VmVjMywgYSk7XG4gICAgICAgICAgICBpZiAoVmVjMy5sZW4odG1wVmVjMykgPCAwLjAwMDAwMSlcbiAgICAgICAgICAgICAgICBWZWMzLmNyb3NzKHRtcFZlYzMsIHlVbml0VmVjMywgYSk7XG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZSh0bXBWZWMzLCB0bXBWZWMzKTtcbiAgICAgICAgICAgIFF1YXQuc2V0QXhpc0FuZ2xlKG91dCwgdG1wVmVjMywgTWF0aC5QSSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvdCA+IDAuOTk5OTk5KSB7XG4gICAgICAgICAgICBvdXRbMF0gPSAwO1xuICAgICAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgICAgICBvdXRbM10gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFZlYzMuY3Jvc3ModG1wVmVjMywgYSwgYik7XG4gICAgICAgICAgICBvdXRbMF0gPSB0bXBWZWMzWzBdO1xuICAgICAgICAgICAgb3V0WzFdID0gdG1wVmVjM1sxXTtcbiAgICAgICAgICAgIG91dFsyXSA9IHRtcFZlYzNbMl07XG4gICAgICAgICAgICBvdXRbM10gPSAxICsgZG90O1xuICAgICAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHNwaGVyaWNhbCBsaW5lYXIgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYyAtIHRoZSB0aGlyZCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGQgLSB0aGUgZm91cnRoIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gdCAtIGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzcWxlcnAob3V0LCBhLCBiLCBjLCBkLCB0KSB7XG4gICAgICAgIFF1YXQuc2xlcnAodGVtcDEsIGEsIGQsIHQpO1xuICAgICAgICBRdWF0LnNsZXJwKHRlbXAyLCBiLCBjLCB0KTtcbiAgICAgICAgUXVhdC5zbGVycChvdXQsIHRlbXAxLCB0ZW1wMiwgMiAqIHQgKiAoMSAtIHQpKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24gd2l0aCB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW5cbiAgICAgKiBheGVzLiBFYWNoIGF4aXMgaXMgYSB2ZWMzIGFuZCBpcyBleHBlY3RlZCB0byBiZSB1bml0IGxlbmd0aCBhbmRcbiAgICAgKiBwZXJwZW5kaWN1bGFyIHRvIGFsbCBvdGhlciBzcGVjaWZpZWQgYXhlcy5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIHZpZXcgLSB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgdmlld2luZyBkaXJlY3Rpb25cbiAgICAgKiBAcGFyYW0gcmlnaHQgLSB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbG9jYWwgXCJyaWdodFwiIGRpcmVjdGlvblxuICAgICAqIEBwYXJhbSB1cCAtIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInVwXCIgZGlyZWN0aW9uXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0QXhlcyhvdXQsIHZpZXcsIHJpZ2h0LCB1cCkge1xuICAgICAgICB0ZW1wTWF0M1swXSA9IHJpZ2h0WzBdO1xuICAgICAgICB0ZW1wTWF0M1szXSA9IHJpZ2h0WzFdO1xuICAgICAgICB0ZW1wTWF0M1s2XSA9IHJpZ2h0WzJdO1xuICAgICAgICB0ZW1wTWF0M1sxXSA9IHVwWzBdO1xuICAgICAgICB0ZW1wTWF0M1s0XSA9IHVwWzFdO1xuICAgICAgICB0ZW1wTWF0M1s3XSA9IHVwWzJdO1xuICAgICAgICB0ZW1wTWF0M1syXSA9IC12aWV3WzBdO1xuICAgICAgICB0ZW1wTWF0M1s1XSA9IC12aWV3WzFdO1xuICAgICAgICB0ZW1wTWF0M1s4XSA9IC12aWV3WzJdO1xuICAgICAgICByZXR1cm4gUXVhdC5ub3JtYWxpemUob3V0LCBRdWF0LmZyb21NYXQzKG91dCwgdGVtcE1hdDMpKTtcbiAgICB9XG59XG4vLyBUZW1wb3JhcnkgdmFyaWFibGVzIHRvIHByZXZlbnQgcmVwZWF0ZWQgYWxsb2NhdGlvbnMgaW4gdGhlIGFsZ29yaXRobXMgYWJvdmUuXG5jb25zdCB0ZW1wMSA9IG5ldyBRdWF0KCk7XG5jb25zdCB0ZW1wMiA9IG5ldyBRdWF0KCk7XG5jb25zdCB0ZW1wTWF0MyA9IG5ldyBNYXQzKCk7XG5jb25zdCB0bXBWZWMzID0gbmV3IFZlYzMoKTtcbmNvbnN0IHhVbml0VmVjMyA9IG5ldyBWZWMzKDEsIDAsIDApO1xuY29uc3QgeVVuaXRWZWMzID0gbmV3IFZlYzMoMCwgMSwgMCk7XG4vLyBNZXRob2RzIHdoaWNoIHJlLXVzZSB0aGUgVmVjNCBpbXBsZW1lbnRhdGlvblxuUXVhdC5zZXQgPSBWZWM0LnNldDtcblF1YXQuYWRkID0gVmVjNC5hZGQ7XG5RdWF0LmxlcnAgPSBWZWM0LmxlcnA7XG5RdWF0Lm5vcm1hbGl6ZSA9IFZlYzQubm9ybWFsaXplO1xuUXVhdC5zcXVhcmVkTGVuZ3RoID0gVmVjNC5zcXVhcmVkTGVuZ3RoO1xuUXVhdC5zcXJMZW4gPSBWZWM0LnNxdWFyZWRMZW5ndGg7XG5RdWF0LmV4YWN0RXF1YWxzID0gVmVjNC5leGFjdEVxdWFscztcblF1YXQuZXF1YWxzID0gVmVjNC5lcXVhbHM7XG5RdWF0Lm1hZ25pdHVkZSA9IFZlYzQubWFnbml0dWRlO1xuLy8gSW5zdGFuY2UgbWV0aG9kIGFsaWFzIGFzc2lnbm1lbnRzXG5RdWF0LnByb3RvdHlwZS5tdWwgPSBRdWF0LnByb3RvdHlwZS5tdWx0aXBseTtcbi8vIFN0YXRpYyBtZXRob2QgYWxpYXMgYXNzaWdubWVudHNcblF1YXQubXVsID0gUXVhdC5tdWx0aXBseTtcblF1YXQubWFnID0gUXVhdC5tYWduaXR1ZGU7XG5RdWF0Lmxlbmd0aCA9IFF1YXQubWFnbml0dWRlO1xuUXVhdC5sZW4gPSBRdWF0Lm1hZ25pdHVkZTtcbi8qKlxuICogUXVhdCBhbGlhcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAqL1xuZXhwb3J0IGNvbnN0IHF1YXQgPSBRdWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cXVhdC5qcy5tYXAiLCJpbXBvcnQgeyBFUFNJTE9OIH0gZnJvbSAnLi9jb21tb24uanMnO1xuLyoqXG4gKiAzIERpbWVuc2lvbmFsIFZlY3RvclxuICovXG5leHBvcnQgY2xhc3MgVmVjMyBleHRlbmRzIEZsb2F0MzJBcnJheSB7XG4gICAgLyoqXG4gICAgKiBUaGUgbnVtYmVyIG9mIGJ5dGVzIGluIGEge0BsaW5rIFZlYzN9LlxuICAgICovXG4gICAgc3RhdGljIEJZVEVfTEVOR1RIID0gMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVDtcbiAgICAvKipcbiAgICAqIENyZWF0ZSBhIHtAbGluayBWZWMzfS5cbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKC4uLnZhbHVlcykge1xuICAgICAgICBzd2l0Y2ggKHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBzdXBlcih2YWx1ZXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHN1cGVyKHZhbHVlc1swXSwgdmFsdWVzWzFdLCAzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMToge1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSB2YWx1ZXNbMF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBzdXBlcihbdiwgdiwgdl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIodiwgMCwgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzdXBlcigzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLz09PT09PT09PT09PVxuICAgIC8vIEF0dHJpYnV0ZXNcbiAgICAvLz09PT09PT09PT09PVxuICAgIC8vIEdldHRlcnMgYW5kIHNldHRlcnMgdG8gbWFrZSBjb21wb25lbnQgYWNjZXNzIHJlYWQgYmV0dGVyLlxuICAgIC8vIFRoZXNlIGFyZSBsaWtlbHkgdG8gYmUgYSBsaXR0bGUgYml0IHNsb3dlciB0aGFuIGRpcmVjdCBhcnJheSBhY2Nlc3MuXG4gICAgLyoqXG4gICAgICogVGhlIHggY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMF07YFxuICAgICAqIEBjYXRlZ29yeSBWZWN0b3IgY29tcG9uZW50c1xuICAgICAqL1xuICAgIGdldCB4KCkgeyByZXR1cm4gdGhpc1swXTsgfVxuICAgIHNldCB4KHZhbHVlKSB7IHRoaXNbMF0gPSB2YWx1ZTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yLiBFcXVpdmFsZW50IHRvIGB0aGlzWzFdO2BcbiAgICAgKiBAY2F0ZWdvcnkgVmVjdG9yIGNvbXBvbmVudHNcbiAgICAgKi9cbiAgICBnZXQgeSgpIHsgcmV0dXJuIHRoaXNbMV07IH1cbiAgICBzZXQgeSh2YWx1ZSkgeyB0aGlzWzFdID0gdmFsdWU7IH1cbiAgICAvKipcbiAgICAgKiBUaGUgeiBjb21wb25lbnQgb2YgdGhlIHZlY3Rvci4gRXF1aXZhbGVudCB0byBgdGhpc1syXTtgXG4gICAgICogQGNhdGVnb3J5IFZlY3RvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IHooKSB7IHJldHVybiB0aGlzWzJdOyB9XG4gICAgc2V0IHoodmFsdWUpIHsgdGhpc1syXSA9IHZhbHVlOyB9XG4gICAgLy8gQWx0ZXJuYXRlIHNldCBvZiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGluIGNhc2UgdGhpcyBpcyBiZWluZyB1c2VkIHRvIGRlZmluZVxuICAgIC8vIGEgY29sb3IuXG4gICAgLyoqXG4gICAgICogVGhlIHIgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMF07YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IHIoKSB7IHJldHVybiB0aGlzWzBdOyB9XG4gICAgc2V0IHIodmFsdWUpIHsgdGhpc1swXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIGcgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMV07YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IGcoKSB7IHJldHVybiB0aGlzWzFdOyB9XG4gICAgc2V0IGcodmFsdWUpIHsgdGhpc1sxXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIGIgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMl07YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IGIoKSB7IHJldHVybiB0aGlzWzJdOyB9XG4gICAgc2V0IGIodmFsdWUpIHsgdGhpc1syXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIG1hZ25pdHVkZSAobGVuZ3RoKSBvZiB0aGlzLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzMubWFnbml0dWRlKHRoaXMpO2BcbiAgICAgKlxuICAgICAqIE1hZ25pdHVkZSBpcyB1c2VkIGJlY2F1c2UgdGhlIGBsZW5ndGhgIGF0dHJpYnV0ZSBpcyBhbHJlYWR5IGRlZmluZWQgYnlcbiAgICAgKiBgRmxvYXQzMkFycmF5YCB0byBtZWFuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGFycmF5LlxuICAgICAqL1xuICAgIGdldCBtYWduaXR1ZGUoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzWzBdO1xuICAgICAgICBjb25zdCB5ID0gdGhpc1sxXTtcbiAgICAgICAgY29uc3QgeiA9IHRoaXNbMl07XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWMzLm1hZ25pdHVkZX1cbiAgICAgKi9cbiAgICBnZXQgbWFnKCkgeyByZXR1cm4gdGhpcy5tYWduaXR1ZGU7IH1cbiAgICAvKipcbiAgICAgKiBUaGUgc3F1YXJlZCBtYWduaXR1ZGUgKGxlbmd0aCkgb2YgYHRoaXNgLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzMuc3F1YXJlZE1hZ25pdHVkZSh0aGlzKTtgXG4gICAgICovXG4gICAgZ2V0IHNxdWFyZWRNYWduaXR1ZGUoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzWzBdO1xuICAgICAgICBjb25zdCB5ID0gdGhpc1sxXTtcbiAgICAgICAgY29uc3QgeiA9IHRoaXNbMl07XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjMy5zcXVhcmVkTWFnbml0dWRlfVxuICAgICAqL1xuICAgIGdldCBzcXJNYWcoKSB7IHJldHVybiB0aGlzLnNxdWFyZWRNYWduaXR1ZGU7IH1cbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBgdGhpc2BcbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLnN0cih0aGlzKTtgXG4gICAgICovXG4gICAgZ2V0IHN0cigpIHtcbiAgICAgICAgcmV0dXJuIFZlYzMuc3RyKHRoaXMpO1xuICAgIH1cbiAgICAvLz09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBJbnN0YW5jZXMgbWV0aG9kc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIGFub3RoZXIge0BsaW5rIFZlYzN9IGludG8gYHRoaXNgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBjb3B5KGEpIHtcbiAgICAgICAgdGhpcy5zZXQoYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEge0BsaW5rIFZlYzN9IHRvIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLmFkZCh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSB2ZWN0b3IgdG8gYWRkIHRvIGB0aGlzYFxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIGFkZChiKSB7XG4gICAgICAgIHRoaXNbMF0gKz0gYlswXTtcbiAgICAgICAgdGhpc1sxXSArPSBiWzFdO1xuICAgICAgICB0aGlzWzJdICs9IGJbMl07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgYSB7QGxpbmsgVmVjM30gZnJvbSBgdGhpc2AuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjMy5zdWJ0cmFjdCh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbSBgdGhpc2BcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBzdWJ0cmFjdChiKSB7XG4gICAgICAgIHRoaXNbMF0gLT0gYlswXTtcbiAgICAgICAgdGhpc1sxXSAtPSBiWzFdO1xuICAgICAgICB0aGlzWzJdIC09IGJbMl07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzMuc3VidHJhY3R9XG4gICAgICovXG4gICAgc3ViKGIpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIGB0aGlzYCBieSBhIHtAbGluayBWZWMzfS5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLm11bHRpcGx5KHRoaXMsIHRoaXMsIGIpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHZlY3RvciB0byBtdWx0aXBseSBgdGhpc2AgYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBtdWx0aXBseShiKSB7XG4gICAgICAgIHRoaXNbMF0gKj0gYlswXTtcbiAgICAgICAgdGhpc1sxXSAqPSBiWzFdO1xuICAgICAgICB0aGlzWzJdICo9IGJbMl07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzMubXVsdGlwbHl9XG4gICAgICovXG4gICAgbXVsKGIpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKipcbiAgICAgKiBEaXZpZGVzIGB0aGlzYCBieSBhIHtAbGluayBWZWMzfS5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLmRpdmlkZSh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIGB0aGlzYCBieVxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIGRpdmlkZShiKSB7XG4gICAgICAgIHRoaXNbMF0gLz0gYlswXTtcbiAgICAgICAgdGhpc1sxXSAvPSBiWzFdO1xuICAgICAgICB0aGlzWzJdIC89IGJbMl07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzMuZGl2aWRlfVxuICAgICAqL1xuICAgIGRpdihiKSB7IHJldHVybiB0aGlzOyB9XG4gICAgLyoqXG4gICAgICogU2NhbGVzIGB0aGlzYCBieSBhIHNjYWxhciBudW1iZXIuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjMy5zY2FsZSh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIEFtb3VudCB0byBzY2FsZSBgdGhpc2AgYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBzY2FsZShiKSB7XG4gICAgICAgIHRoaXNbMF0gKj0gYjtcbiAgICAgICAgdGhpc1sxXSAqPSBiO1xuICAgICAgICB0aGlzWzJdICo9IGI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGB0aGlzYCBzY2FsZWQgYnkgYSBzY2FsYXIgdmFsdWUgdGhlbiBhZGRzIHRoZSByZXN1bHQgdG8gYHRoaXNgLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzMuc2NhbGVBbmRBZGQodGhpcywgdGhpcywgYiwgc2NhbGUpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHZlY3RvciB0byBhZGQgdG8gYHRoaXNgXG4gICAgICogQHBhcmFtIHNjYWxlIC0gVGhlIGFtb3VudCB0byBzY2FsZSBgYmAgYnkgYmVmb3JlIGFkZGluZ1xuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIHNjYWxlQW5kQWRkKGIsIHNjYWxlKSB7XG4gICAgICAgIHRoaXNbMF0gKz0gYlswXSAqIHNjYWxlO1xuICAgICAgICB0aGlzWzFdICs9IGJbMV0gKiBzY2FsZTtcbiAgICAgICAgdGhpc1syXSArPSBiWzJdICogc2NhbGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiBhbm90aGVyIHtAbGluayBWZWMzfSBhbmQgYHRoaXNgLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzMuZGlzdGFuY2UodGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgdG9cbiAgICAgKiBAcmV0dXJucyBEaXN0YW5jZSBiZXR3ZWVuIGB0aGlzYCBhbmQgYGJgXG4gICAgICovXG4gICAgZGlzdGFuY2UoYikge1xuICAgICAgICByZXR1cm4gVmVjMy5kaXN0YW5jZSh0aGlzLCBiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWMzLmRpc3RhbmNlfVxuICAgICAqL1xuICAgIGRpc3QoYikgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gYW5vdGhlciB7QGxpbmsgVmVjM30gYW5kIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLnNxdWFyZWREaXN0YW5jZSh0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgc3F1YXJlZCBkaXN0YW5jZSB0b1xuICAgICAqIEByZXR1cm5zIFNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBgdGhpc2AgYW5kIGBiYFxuICAgICAqL1xuICAgIHNxdWFyZWREaXN0YW5jZShiKSB7XG4gICAgICAgIHJldHVybiBWZWMzLnNxdWFyZWREaXN0YW5jZSh0aGlzLCBiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAgICAgKi9cbiAgICBzcXJEaXN0KGIpIHsgcmV0dXJuIDA7IH1cbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLm5lZ2F0ZSh0aGlzLCB0aGlzKTtgXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBuZWdhdGUoKSB7XG4gICAgICAgIHRoaXNbMF0gKj0gLTE7XG4gICAgICAgIHRoaXNbMV0gKj0gLTE7XG4gICAgICAgIHRoaXNbMl0gKj0gLTE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZlcnRzIHRoZSBjb21wb25lbnRzIG9mIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWMzLmludmVyc2UodGhpcywgdGhpcyk7YFxuICAgICAqXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICB0aGlzWzBdID0gMS4wIC8gdGhpc1swXTtcbiAgICAgICAgdGhpc1sxXSA9IDEuMCAvIHRoaXNbMV07XG4gICAgICAgIHRoaXNbMl0gPSAxLjAgLyB0aGlzWzJdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBhbmQgYW5vdGhlciB7QGxpbmsgVmVjM30uXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjMy5kb3QodGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBEb3QgcHJvZHVjdCBvZiBgdGhpc2AgYW5kIGBiYFxuICAgICAqL1xuICAgIGRvdChiKSB7XG4gICAgICAgIHJldHVybiB0aGlzWzBdICogYlswXSArIHRoaXNbMV0gKiBiWzFdICsgdGhpc1syXSAqIGJbMl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBgdGhpc2AuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjMy5ub3JtYWxpemUodGhpcywgdGhpcyk7YFxuICAgICAqXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICByZXR1cm4gVmVjMy5ub3JtYWxpemUodGhpcywgdGhpcyk7XG4gICAgfVxuICAgIC8vPT09PT09PT09PT09PT09PVxuICAgIC8vIFN0YXRpYyBtZXRob2RzXG4gICAgLy89PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjM1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGEgbmV3IDNEIHZlY3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBjbG9uZVxuICAgICAqIEByZXR1cm5zIGEgbmV3IDNEIHZlY3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBjbG9uZShhKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyhhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIChsZW5ndGgpIG9mIGEge0BsaW5rIFZlYzN9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSBWZWN0b3IgdG8gY2FsY3VsYXRlIG1hZ25pdHVkZSBvZlxuICAgICAqIEByZXR1cm5zIE1hZ25pdHVkZSBvZiBhXG4gICAgICovXG4gICAgc3RhdGljIG1hZ25pdHVkZShhKSB7XG4gICAgICAgIGxldCB4ID0gYVswXTtcbiAgICAgICAgbGV0IHkgPSBhWzFdO1xuICAgICAgICBsZXQgeiA9IGFbMl07XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWMzLm1hZ25pdHVkZX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG1hZyhhKSB7IHJldHVybiAwOyB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWMzLm1hZ25pdHVkZX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBWZWMzLm1hZ25pdHVkZX0gdG8gYXZvaWQgY29uZmxpY3RzIHdpdGggYnVpbHRpbiBgbGVuZ3RoYCBtZXRob2RzL2F0dHJpYnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAgICAgKiBAcmV0dXJucyBsZW5ndGggb2YgYVxuICAgICAqL1xuICAgIC8vIEB0cy1pZ25vcmU6IExlbmd0aCBjb25mbGljdHMgd2l0aCBGdW5jdGlvbi5sZW5ndGhcbiAgICBzdGF0aWMgbGVuZ3RoKGEpIHsgcmV0dXJuIDA7IH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzMubWFnbml0dWRlfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIFZlYzMubWFnfVxuICAgICAqL1xuICAgIHN0YXRpYyBsZW4oYSkgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0geCAtIFggY29tcG9uZW50XG4gICAgICogQHBhcmFtIHkgLSBZIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB6IC0gWiBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJucyBhIG5ldyAzRCB2ZWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVZhbHVlcyh4LCB5LCB6KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMyh4LCB5LCB6KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHNvdXJjZSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBjb3B5KG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdO1xuICAgICAgICBvdXRbMl0gPSBhWzJdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0geCAtIFggY29tcG9uZW50XG4gICAgICogQHBhcmFtIHkgLSBZIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB6IC0gWiBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXQob3V0LCB4LCB5LCB6KSB7XG4gICAgICAgIG91dFswXSA9IHg7XG4gICAgICAgIG91dFsxXSA9IHk7XG4gICAgICAgIG91dFsyXSA9IHo7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgdHdvIHtAbGluayBWZWMzfXNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGQob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICAgICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjMy5zdWJ0cmFjdH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHN1YihvdXQsIGEsIGIpIHsgcmV0dXJuIFswLCAwLCAwXTsgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWMzLm11bHRpcGx5fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsKG91dCwgYSwgYikgeyByZXR1cm4gWzAsIDAsIDBdOyB9XG4gICAgLyoqXG4gICAgICogRGl2aWRlcyB0d28gdmVjMydzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZGl2aWRlKG91dCwgYSwgYikge1xuICAgICAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzMuZGl2aWRlfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZGl2KG91dCwgYSwgYikgeyByZXR1cm4gWzAsIDAsIDBdOyB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBjZWlsXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgY2VpbChvdXQsIGEpIHtcbiAgICAgICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgICAgICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gICAgICAgIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBmbG9vclxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGZsb29yKG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICAgICAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgICAgICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBtaW4ob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgICAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICAgICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIG1heChvdXQsIGEsIGIpIHtcbiAgICAgICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgICAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogc3ltbWV0cmljIHJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdmVjdG9yIHRvIHJvdW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICAvKnN0YXRpYyByb3VuZChvdXQ6IFZlYzNMaWtlLCBhOiBSZWFkb25seTxWZWMzTGlrZT4pOiBWZWMzTGlrZSB7XG4gICAgICBvdXRbMF0gPSBnbE1hdHJpeC5yb3VuZChhWzBdKTtcbiAgICAgIG91dFsxXSA9IGdsTWF0cml4LnJvdW5kKGFbMV0pO1xuICAgICAgb3V0WzJdID0gZ2xNYXRyaXgucm91bmQoYVsyXSk7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0qL1xuICAgIC8qKlxuICAgICAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gICAgICogQHBhcmFtIHNjYWxlIC0gYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzY2FsZShvdXQsIGEsIHNjYWxlKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBzY2FsZTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogc2NhbGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgdHdvIHZlYzMncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBzY2FsZSAtIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAgICovXG4gICAgc3RhdGljIGRpc3RhbmNlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgeCA9IGJbMF0gLSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYlsxXSAtIGFbMV07XG4gICAgICAgIGNvbnN0IHogPSBiWzJdIC0gYVsyXTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzMuZGlzdGFuY2V9XG4gICAgICovXG4gICAgc3RhdGljIGRpc3QoYSwgYikgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAgICovXG4gICAgc3RhdGljIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IHggPSBiWzBdIC0gYVswXTtcbiAgICAgICAgY29uc3QgeSA9IGJbMV0gLSBhWzFdO1xuICAgICAgICBjb25zdCB6ID0gYlsyXSAtIGFbMl07XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjMy5zcXVhcmVkRGlzdGFuY2V9XG4gICAgICovXG4gICAgc3RhdGljIHNxckRpc3QoYSwgYikgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjM1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICAgICAqIEByZXR1cm5zIHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAgICAgKi9cbiAgICBzdGF0aWMgc3F1YXJlZExlbmd0aChhKSB7XG4gICAgICAgIGNvbnN0IHggPSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgeiA9IGFbMl07XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjMy5zcXVhcmVkTGVuZ3RofVxuICAgICAqL1xuICAgIHN0YXRpYyBzcXJMZW4oYSwgYikgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB2ZWN0b3IgdG8gbmVnYXRlXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbmVnYXRlKG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSAtYVswXTtcbiAgICAgICAgb3V0WzFdID0gLWFbMV07XG4gICAgICAgIG91dFsyXSA9IC1hWzJdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdmVjdG9yIHRvIGludmVydFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGludmVyc2Uob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IDEuMCAvIGFbMF07XG4gICAgICAgIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gICAgICAgIG91dFsyXSA9IDEuMCAvIGFbMl07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBub3JtYWxpemVcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBub3JtYWxpemUob3V0LCBhKSB7XG4gICAgICAgIGNvbnN0IHggPSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgeiA9IGFbMl07XG4gICAgICAgIGxldCBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICB9XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gICAgICovXG4gICAgc3RhdGljIGRvdChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgICAgICAgY29uc3QgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXTtcbiAgICAgICAgY29uc3QgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXTtcbiAgICAgICAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnk7XG4gICAgICAgIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgICAgICBvdXRbMl0gPSBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gdCAtIGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgICAgICBjb25zdCBheCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGF5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgYXogPSBhWzJdO1xuICAgICAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICAgICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHNwaGVyaWNhbCBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gdCAtIGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSBNYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoVmVjMy5kb3QoYSwgYiksIC0xKSwgMSkpO1xuICAgICAgICBjb25zdCBzaW5Ub3RhbCA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgY29uc3QgcmF0aW9BID0gTWF0aC5zaW4oKDEgLSB0KSAqIGFuZ2xlKSAvIHNpblRvdGFsO1xuICAgICAgICBjb25zdCByYXRpb0IgPSBNYXRoLnNpbih0ICogYW5nbGUpIC8gc2luVG90YWw7XG4gICAgICAgIG91dFswXSA9IHJhdGlvQSAqIGFbMF0gKyByYXRpb0IgKiBiWzBdO1xuICAgICAgICBvdXRbMV0gPSByYXRpb0EgKiBhWzFdICsgcmF0aW9CICogYlsxXTtcbiAgICAgICAgb3V0WzJdID0gcmF0aW9BICogYVsyXSArIHJhdGlvQiAqIGJbMl07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgaGVybWl0ZSBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGMgLSB0aGUgdGhpcmQgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBkIC0gdGhlIGZvdXJ0aCBvcGVyYW5kXG4gICAgICogQHBhcmFtIHQgLSBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgaGVybWl0ZShvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgICAgICAgY29uc3QgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gICAgICAgIGNvbnN0IGZhY3RvcjEgPSBmYWN0b3JUaW1lczIgKiAoMiAqIHQgLSAzKSArIDE7XG4gICAgICAgIGNvbnN0IGZhY3RvcjIgPSBmYWN0b3JUaW1lczIgKiAodCAtIDIpICsgdDtcbiAgICAgICAgY29uc3QgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSk7XG4gICAgICAgIGNvbnN0IGZhY3RvcjQgPSBmYWN0b3JUaW1lczIgKiAoMyAtIDIgKiB0KTtcbiAgICAgICAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICAgICAgICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBiZXppZXIgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBjIC0gdGhlIHRoaXJkIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gZCAtIHRoZSBmb3VydGggb3BlcmFuZFxuICAgICAqIEBwYXJhbSB0IC0gaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGJlemllcihvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgICAgICAgY29uc3QgaW52ZXJzZUZhY3RvciA9IDEgLSB0O1xuICAgICAgICBjb25zdCBpbnZlcnNlRmFjdG9yVGltZXNUd28gPSBpbnZlcnNlRmFjdG9yICogaW52ZXJzZUZhY3RvcjtcbiAgICAgICAgY29uc3QgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gICAgICAgIGNvbnN0IGZhY3RvcjEgPSBpbnZlcnNlRmFjdG9yVGltZXNUd28gKiBpbnZlcnNlRmFjdG9yO1xuICAgICAgICBjb25zdCBmYWN0b3IyID0gMyAqIHQgKiBpbnZlcnNlRmFjdG9yVGltZXNUd287XG4gICAgICAgIGNvbnN0IGZhY3RvcjMgPSAzICogZmFjdG9yVGltZXMyICogaW52ZXJzZUZhY3RvcjtcbiAgICAgICAgY29uc3QgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqIHQ7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICAgICAgICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgLypzdGF0aWMgcmFuZG9tKG91dDogVmVjM0xpa2UsIHNjYWxlKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlID09PSB1bmRlZmluZWQgPyAxLjAgOiBzY2FsZTtcbiAgXG4gICAgICBsZXQgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICAgIGxldCB6ID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgLSAxLjA7XG4gICAgICBsZXQgelNjYWxlID0gTWF0aC5zcXJ0KDEuMCAtIHogKiB6KSAqIHNjYWxlO1xuICBcbiAgICAgIG91dFswXSA9IE1hdGguY29zKHIpICogelNjYWxlO1xuICAgICAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGU7XG4gICAgICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0qL1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXG4gICAgICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIG0gLSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0KG91dCwgYSwgbSkge1xuICAgICAgICBjb25zdCB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgICAgICBjb25zdCB3ID0gKG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XSkgfHwgMS4wO1xuICAgICAgICBvdXRbMF0gPSAobVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0pIC8gdztcbiAgICAgICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHc7XG4gICAgICAgIG91dFsyXSA9IChtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF0pIC8gdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0My5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIG0gLSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gICAgICAgIGxldCB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdO1xuICAgICAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gICAgICAgIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XTtcbiAgICAgICAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XG4gICAgICogQ2FuIGFsc28gYmUgdXNlZCBmb3IgZHVhbCBxdWF0ZXJuaW9ucy4gKE11bHRpcGx5IGl0IHdpdGggdGhlIHJlYWwgcGFydClcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIHEgLSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtUXVhdChvdXQsIGEsIHEpIHtcbiAgICAgICAgLy8gYmVuY2htYXJrczogaHR0cHM6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tdHJhbnNmb3JtLXZlYzMtaW1wbGVtZW50YXRpb25zLWZpeGVkXG4gICAgICAgIGNvbnN0IHF4ID0gcVswXTtcbiAgICAgICAgY29uc3QgcXkgPSBxWzFdO1xuICAgICAgICBjb25zdCBxeiA9IHFbMl07XG4gICAgICAgIGNvbnN0IHcyID0gcVszXSAqIDI7XG4gICAgICAgIGNvbnN0IHggPSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgeiA9IGFbMl07XG4gICAgICAgIC8vIHZhciBxdmVjID0gW3F4LCBxeSwgcXpdO1xuICAgICAgICAvLyB2YXIgdXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCBhKTtcbiAgICAgICAgY29uc3QgdXZ4ID0gKHF5ICogeiAtIHF6ICogeSk7XG4gICAgICAgIGNvbnN0IHV2eSA9IChxeiAqIHggLSBxeCAqIHopO1xuICAgICAgICBjb25zdCB1dnogPSAocXggKiB5IC0gcXkgKiB4KTtcbiAgICAgICAgLy8gdmFyIHV1diA9IHZlYzMuY3Jvc3MoW10sIHF2ZWMsIHV2KTtcbiAgICAgICAgLy8gdmVjMy5zY2FsZSh1dXYsIHV1diwgMik7XG4gICAgICAgIGNvbnN0IHV1dnggPSAocXkgKiB1dnogLSBxeiAqIHV2eSkgKiAyO1xuICAgICAgICBjb25zdCB1dXZ5ID0gKHF6ICogdXZ4IC0gcXggKiB1dnopICogMjtcbiAgICAgICAgY29uc3QgdXV2eiA9IChxeCAqIHV2eSAtIHF5ICogdXZ4KSAqIDI7XG4gICAgICAgIC8vIHZlYzMuc2NhbGUodXYsIHV2LCAyICogdyk7XG4gICAgICAgIC8vIHJldHVybiB2ZWMzLmFkZChvdXQsIGEsIHZlYzMuYWRkKG91dCwgdXYsIHV1dikpO1xuICAgICAgICBvdXRbMF0gPSB4ICsgKHV2eCAqIHcyKSArIHV1dng7XG4gICAgICAgIG91dFsxXSA9IHkgKyAodXZ5ICogdzIpICsgdXV2eTtcbiAgICAgICAgb3V0WzJdID0geiArICh1dnogKiB3MikgKyB1dXZ6O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiAgICAgKiBAcGFyYW0gb3V0IC0gVGhlIHJlY2VpdmluZyB2ZWMzXG4gICAgICogQHBhcmFtIGEgLSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gICAgICogQHBhcmFtIHJhZCAtIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWChvdXQsIGEsIGIsIHJhZCkge1xuICAgICAgICBjb25zdCBieSA9IGJbMV07XG4gICAgICAgIGNvbnN0IGJ6ID0gYlsyXTtcbiAgICAgICAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICAgICAgICBjb25zdCBweSA9IGFbMV0gLSBieTtcbiAgICAgICAgY29uc3QgcHogPSBhWzJdIC0gYno7XG4gICAgICAgIC8vcGVyZm9ybSByb3RhdGlvblxuICAgICAgICAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IChweSAqIE1hdGguY29zKHJhZCkgLSBweiAqIE1hdGguc2luKHJhZCkpICsgYnk7XG4gICAgICAgIG91dFsyXSA9IChweSAqIE1hdGguc2luKHJhZCkgKyBweiAqIE1hdGguY29zKHJhZCkpICsgYno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHktYXhpc1xuICAgICAqIEBwYXJhbSBvdXQgLSBUaGUgcmVjZWl2aW5nIHZlYzNcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICAgICAqIEBwYXJhbSBiIC0gVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAgICAgKiBAcGFyYW0gcmFkIC0gVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVZKG91dCwgYSwgYiwgcmFkKSB7XG4gICAgICAgIGNvbnN0IGJ4ID0gYlswXTtcbiAgICAgICAgY29uc3QgYnogPSBiWzJdO1xuICAgICAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgICAgIGNvbnN0IHB4ID0gYVswXSAtIGJ4O1xuICAgICAgICBjb25zdCBweiA9IGFbMl0gLSBiejtcbiAgICAgICAgLy9wZXJmb3JtIHJvdGF0aW9uXG4gICAgICAgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICAgICAgb3V0WzBdID0gKHB6ICogTWF0aC5zaW4ocmFkKSArIHB4ICogTWF0aC5jb3MocmFkKSkgKyBieDtcbiAgICAgICAgb3V0WzFdID0gYVsxXTtcbiAgICAgICAgb3V0WzJdID0gKHB6ICogTWF0aC5jb3MocmFkKSAtIHB4ICogTWF0aC5zaW4ocmFkKSkgKyBiejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXG4gICAgICogQHBhcmFtIG91dCAtIFRoZSByZWNlaXZpbmcgdmVjM1xuICAgICAqIEBwYXJhbSBhIC0gVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gICAgICogQHBhcmFtIGIgLSBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICAgICAqIEBwYXJhbSByYWQgLSBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVoob3V0LCBhLCBiLCByYWQpIHtcbiAgICAgICAgY29uc3QgYnggPSBiWzBdO1xuICAgICAgICBjb25zdCBieSA9IGJbMV07XG4gICAgICAgIC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgICAgICAgY29uc3QgcHggPSBhWzBdIC0gYng7XG4gICAgICAgIGNvbnN0IHB5ID0gYVsxXSAtIGJ5O1xuICAgICAgICAvL3BlcmZvcm0gcm90YXRpb25cbiAgICAgICAgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgICAgICBvdXRbMF0gPSAocHggKiBNYXRoLmNvcyhyYWQpIC0gcHkgKiBNYXRoLnNpbihyYWQpKSArIGJ4O1xuICAgICAgICBvdXRbMV0gPSAocHggKiBNYXRoLnNpbihyYWQpICsgcHkgKiBNYXRoLmNvcyhyYWQpKSArIGJ5O1xuICAgICAgICBvdXRbMl0gPSBiWzJdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDNEIHZlY3RvcnNcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICAgICAqL1xuICAgIHN0YXRpYyBhbmdsZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IGF4ID0gYVswXTtcbiAgICAgICAgY29uc3QgYXkgPSBhWzFdO1xuICAgICAgICBjb25zdCBheiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGJ4ID0gYlswXTtcbiAgICAgICAgY29uc3QgYnkgPSBiWzFdO1xuICAgICAgICBjb25zdCBieiA9IGJbMl07XG4gICAgICAgIGNvbnN0IG1hZyA9IE1hdGguc3FydCgoYXggKiBheCArIGF5ICogYXkgKyBheiAqIGF6KSAqIChieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnopKTtcbiAgICAgICAgY29uc3QgY29zaW5lID0gbWFnICYmIFZlYzMuZG90KGEsIGIpIC8gbWFnO1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gemVyb1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHplcm8ob3V0KSB7XG4gICAgICAgIG91dFswXSA9IDAuMDtcbiAgICAgICAgb3V0WzFdID0gMC4wO1xuICAgICAgICBvdXRbMl0gPSAwLjA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBzdHIoYSkge1xuICAgICAgICByZXR1cm4gYFZlYzMoJHthLmpvaW4oJywgJyl9KWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gVGhlIGZpcnN0IHZlY3Rvci5cbiAgICAgKiBAcGFyYW0gYiAtIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgc3RhdGljIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIFRoZSBmaXJzdCB2ZWN0b3IuXG4gICAgICogQHBhcmFtIGIgLSBUaGUgc2Vjb25kIHZlY3Rvci5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHN0YXRpYyBlcXVhbHMoYSwgYikge1xuICAgICAgICBjb25zdCBhMCA9IGFbMF07XG4gICAgICAgIGNvbnN0IGExID0gYVsxXTtcbiAgICAgICAgY29uc3QgYTIgPSBhWzJdO1xuICAgICAgICBjb25zdCBiMCA9IGJbMF07XG4gICAgICAgIGNvbnN0IGIxID0gYlsxXTtcbiAgICAgICAgY29uc3QgYjIgPSBiWzJdO1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkpO1xuICAgIH1cbn1cbi8vIEluc3RhbmNlIG1ldGhvZCBhbGlhcyBhc3NpZ25tZW50c1xuVmVjMy5wcm90b3R5cGUuc3ViID0gVmVjMy5wcm90b3R5cGUuc3VidHJhY3Q7XG5WZWMzLnByb3RvdHlwZS5tdWwgPSBWZWMzLnByb3RvdHlwZS5tdWx0aXBseTtcblZlYzMucHJvdG90eXBlLmRpdiA9IFZlYzMucHJvdG90eXBlLmRpdmlkZTtcblZlYzMucHJvdG90eXBlLmRpc3QgPSBWZWMzLnByb3RvdHlwZS5kaXN0YW5jZTtcblZlYzMucHJvdG90eXBlLnNxckRpc3QgPSBWZWMzLnByb3RvdHlwZS5zcXVhcmVkRGlzdGFuY2U7XG4vLyBTdGF0aWMgbWV0aG9kIGFsaWFzIGFzc2lnbm1lbnRzXG5WZWMzLnN1YiA9IFZlYzMuc3VidHJhY3Q7XG5WZWMzLm11bCA9IFZlYzMubXVsdGlwbHk7XG5WZWMzLmRpdiA9IFZlYzMuZGl2aWRlO1xuVmVjMy5kaXN0ID0gVmVjMy5kaXN0YW5jZTtcblZlYzMuc3FyRGlzdCA9IFZlYzMuc3F1YXJlZERpc3RhbmNlO1xuVmVjMy5zcXJMZW4gPSBWZWMzLnNxdWFyZWRMZW5ndGg7XG5WZWMzLm1hZyA9IFZlYzMubWFnbml0dWRlO1xuVmVjMy5sZW5ndGggPSBWZWMzLm1hZ25pdHVkZTtcblZlYzMubGVuID0gVmVjMy5tYWduaXR1ZGU7XG4vKipcbiAqIFZlYzMgYWxpYXMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKi9cbmV4cG9ydCBjb25zdCB2ZWMzID0gVmVjMztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlYzMuanMubWFwIiwiaW1wb3J0IHsgRVBTSUxPTiB9IGZyb20gJy4vY29tbW9uLmpzJztcbi8qKlxuICogNCBEaW1lbnNpb25hbCBWZWN0b3JcbiAqL1xuZXhwb3J0IGNsYXNzIFZlYzQgZXh0ZW5kcyBGbG9hdDMyQXJyYXkge1xuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgYnl0ZXMgaW4gYSB7QGxpbmsgVmVjNH0uXG4gICAgICovXG4gICAgc3RhdGljIEJZVEVfTEVOR1RIID0gNCAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVDtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSB7QGxpbmsgVmVjNH0uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoLi4udmFsdWVzKSB7XG4gICAgICAgIHN3aXRjaCAodmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHN1cGVyKHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgc3VwZXIodmFsdWVzWzBdLCB2YWx1ZXNbMV0sIDQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IHZhbHVlc1swXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyKFt2LCB2LCB2LCB2XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdXBlcih2LCAwLCA0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHN1cGVyKDQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vPT09PT09PT09PT09XG4gICAgLy8gQXR0cmlidXRlc1xuICAgIC8vPT09PT09PT09PT09XG4gICAgLy8gR2V0dGVycyBhbmQgc2V0dGVycyB0byBtYWtlIGNvbXBvbmVudCBhY2Nlc3MgcmVhZCBiZXR0ZXIuXG4gICAgLy8gVGhlc2UgYXJlIGxpa2VseSB0byBiZSBhIGxpdHRsZSBiaXQgc2xvd2VyIHRoYW4gZGlyZWN0IGFycmF5IGFjY2Vzcy5cbiAgICAvKipcbiAgICAgKiBUaGUgeCBjb21wb25lbnQgb2YgdGhlIHZlY3Rvci4gRXF1aXZhbGVudCB0byBgdGhpc1swXTtgXG4gICAgICogQGNhdGVnb3J5IFZlY3RvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IHgoKSB7IHJldHVybiB0aGlzWzBdOyB9XG4gICAgc2V0IHgodmFsdWUpIHsgdGhpc1swXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIHkgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMV07YFxuICAgICAqIEBjYXRlZ29yeSBWZWN0b3IgY29tcG9uZW50c1xuICAgICAqL1xuICAgIGdldCB5KCkgeyByZXR1cm4gdGhpc1sxXTsgfVxuICAgIHNldCB5KHZhbHVlKSB7IHRoaXNbMV0gPSB2YWx1ZTsgfVxuICAgIC8qKlxuICAgICAqIFRoZSB6IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yLiBFcXVpdmFsZW50IHRvIGB0aGlzWzJdO2BcbiAgICAgKiBAY2F0ZWdvcnkgVmVjdG9yIGNvbXBvbmVudHNcbiAgICAgKi9cbiAgICBnZXQgeigpIHsgcmV0dXJuIHRoaXNbMl07IH1cbiAgICBzZXQgeih2YWx1ZSkgeyB0aGlzWzJdID0gdmFsdWU7IH1cbiAgICAvKipcbiAgICAgKiBUaGUgdyBjb21wb25lbnQgb2YgdGhlIHZlY3Rvci4gRXF1aXZhbGVudCB0byBgdGhpc1szXTtgXG4gICAgICogQGNhdGVnb3J5IFZlY3RvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IHcoKSB7IHJldHVybiB0aGlzWzNdOyB9XG4gICAgc2V0IHcodmFsdWUpIHsgdGhpc1szXSA9IHZhbHVlOyB9XG4gICAgLy8gQWx0ZXJuYXRlIHNldCBvZiBnZXR0ZXJzIGFuZCBzZXR0ZXJzIGluIGNhc2UgdGhpcyBpcyBiZWluZyB1c2VkIHRvIGRlZmluZVxuICAgIC8vIGEgY29sb3IuXG4gICAgLyoqXG4gICAgICogVGhlIHIgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMF07YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IHIoKSB7IHJldHVybiB0aGlzWzBdOyB9XG4gICAgc2V0IHIodmFsdWUpIHsgdGhpc1swXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIGcgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMV07YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IGcoKSB7IHJldHVybiB0aGlzWzFdOyB9XG4gICAgc2V0IGcodmFsdWUpIHsgdGhpc1sxXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIGIgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbMl07YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IGIoKSB7IHJldHVybiB0aGlzWzJdOyB9XG4gICAgc2V0IGIodmFsdWUpIHsgdGhpc1syXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIGEgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3IuIEVxdWl2YWxlbnQgdG8gYHRoaXNbM107YFxuICAgICAqIEBjYXRlZ29yeSBDb2xvciBjb21wb25lbnRzXG4gICAgICovXG4gICAgZ2V0IGEoKSB7IHJldHVybiB0aGlzWzNdOyB9XG4gICAgc2V0IGEodmFsdWUpIHsgdGhpc1szXSA9IHZhbHVlOyB9XG4gICAgLyoqXG4gICAgICogVGhlIG1hZ25pdHVkZSAobGVuZ3RoKSBvZiB0aGlzLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzQubWFnbml0dWRlKHRoaXMpO2BcbiAgICAgKlxuICAgICAqIE1hZ25pdHVkZSBpcyB1c2VkIGJlY2F1c2UgdGhlIGBsZW5ndGhgIGF0dHJpYnV0ZSBpcyBhbHJlYWR5IGRlZmluZWQgYnlcbiAgICAgKiBgRmxvYXQzMkFycmF5YCB0byBtZWFuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGFycmF5LlxuICAgICAqL1xuICAgIGdldCBtYWduaXR1ZGUoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzWzBdO1xuICAgICAgICBjb25zdCB5ID0gdGhpc1sxXTtcbiAgICAgICAgY29uc3QgeiA9IHRoaXNbMl07XG4gICAgICAgIGNvbnN0IHcgPSB0aGlzWzNdO1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWM0Lm1hZ25pdHVkZX1cbiAgICAgKi9cbiAgICBnZXQgbWFnKCkgeyByZXR1cm4gdGhpcy5tYWduaXR1ZGU7IH1cbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBgdGhpc2BcbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWM0LnN0cih0aGlzKTtgXG4gICAgICovXG4gICAgZ2V0IHN0cigpIHtcbiAgICAgICAgcmV0dXJuIFZlYzQuc3RyKHRoaXMpO1xuICAgIH1cbiAgICAvLz09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBJbnN0YW5jZXMgbWV0aG9kc1xuICAgIC8vPT09PT09PT09PT09PT09PT09PVxuICAgIC8qKlxuICAgICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIGFub3RoZXIge0BsaW5rIFZlYzR9IGludG8gYHRoaXNgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBjb3B5KGEpIHtcbiAgICAgICAgc3VwZXIuc2V0KGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHtAbGluayBWZWM0fSB0byBgdGhpc2AuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjNC5hZGQodGhpcywgdGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgdmVjdG9yIHRvIGFkZCB0byBgdGhpc2BcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBhZGQoYikge1xuICAgICAgICB0aGlzWzBdICs9IGJbMF07XG4gICAgICAgIHRoaXNbMV0gKz0gYlsxXTtcbiAgICAgICAgdGhpc1syXSArPSBiWzJdO1xuICAgICAgICB0aGlzWzNdICs9IGJbM107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgYSB7QGxpbmsgVmVjNH0gZnJvbSBgdGhpc2AuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjNC5zdWJ0cmFjdCh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSB2ZWN0b3IgdG8gc3VidHJhY3QgZnJvbSBgdGhpc2BcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBzdWJ0cmFjdChiKSB7XG4gICAgICAgIHRoaXNbMF0gLT0gYlswXTtcbiAgICAgICAgdGhpc1sxXSAtPSBiWzFdO1xuICAgICAgICB0aGlzWzJdIC09IGJbMl07XG4gICAgICAgIHRoaXNbM10gLT0gYlszXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjNC5zdWJ0cmFjdH1cbiAgICAgKi9cbiAgICBzdWIoYikgeyByZXR1cm4gdGhpczsgfVxuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgYHRoaXNgIGJ5IGEge0BsaW5rIFZlYzR9LlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzQubXVsdGlwbHkodGhpcywgdGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IGB0aGlzYCBieVxuICAgICAqIEByZXR1cm5zIGB0aGlzYFxuICAgICAqL1xuICAgIG11bHRpcGx5KGIpIHtcbiAgICAgICAgdGhpc1swXSAqPSBiWzBdO1xuICAgICAgICB0aGlzWzFdICo9IGJbMV07XG4gICAgICAgIHRoaXNbMl0gKj0gYlsyXTtcbiAgICAgICAgdGhpc1szXSAqPSBiWzNdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWM0Lm11bHRpcGx5fVxuICAgICAqL1xuICAgIG11bChiKSB7IHJldHVybiB0aGlzOyB9XG4gICAgLyoqXG4gICAgICogRGl2aWRlcyBgdGhpc2AgYnkgYSB7QGxpbmsgVmVjNH0uXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjNC5kaXZpZGUodGhpcywgdGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgdmVjdG9yIHRvIGRpdmlkZSBgdGhpc2AgYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBkaXZpZGUoYikge1xuICAgICAgICB0aGlzWzBdIC89IGJbMF07XG4gICAgICAgIHRoaXNbMV0gLz0gYlsxXTtcbiAgICAgICAgdGhpc1syXSAvPSBiWzJdO1xuICAgICAgICB0aGlzWzNdIC89IGJbM107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzQuZGl2aWRlfVxuICAgICAqL1xuICAgIGRpdihiKSB7IHJldHVybiB0aGlzOyB9XG4gICAgLyoqXG4gICAgICogU2NhbGVzIGB0aGlzYCBieSBhIHNjYWxhciBudW1iZXIuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjNC5zY2FsZSh0aGlzLCB0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiAtIEFtb3VudCB0byBzY2FsZSBgdGhpc2AgYnlcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBzY2FsZShiKSB7XG4gICAgICAgIHRoaXNbMF0gKj0gYjtcbiAgICAgICAgdGhpc1sxXSAqPSBiO1xuICAgICAgICB0aGlzWzJdICo9IGI7XG4gICAgICAgIHRoaXNbM10gKj0gYjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYHRoaXNgIHNjYWxlZCBieSBhIHNjYWxhciB2YWx1ZSB0aGVuIGFkZHMgdGhlIHJlc3VsdCB0byBgdGhpc2AuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjNC5zY2FsZUFuZEFkZCh0aGlzLCB0aGlzLCBiLCBzY2FsZSk7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgdmVjdG9yIHRvIGFkZCB0byBgdGhpc2BcbiAgICAgKiBAcGFyYW0gc2NhbGUgLSBUaGUgYW1vdW50IHRvIHNjYWxlIGBiYCBieSBiZWZvcmUgYWRkaW5nXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgc2NhbGVBbmRBZGQoYiwgc2NhbGUpIHtcbiAgICAgICAgdGhpc1swXSArPSBiWzBdICogc2NhbGU7XG4gICAgICAgIHRoaXNbMV0gKz0gYlsxXSAqIHNjYWxlO1xuICAgICAgICB0aGlzWzJdICs9IGJbMl0gKiBzY2FsZTtcbiAgICAgICAgdGhpc1szXSArPSBiWzNdICogc2NhbGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiBhbm90aGVyIHtAbGluayBWZWM0fSBhbmQgYHRoaXNgLlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzQuZGlzdGFuY2UodGhpcywgYik7YFxuICAgICAqXG4gICAgICogQHBhcmFtIGIgLSBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgdG9cbiAgICAgKiBAcmV0dXJucyBEaXN0YW5jZSBiZXR3ZWVuIGB0aGlzYCBhbmQgYGJgXG4gICAgICovXG4gICAgZGlzdGFuY2UoYikge1xuICAgICAgICByZXR1cm4gVmVjNC5kaXN0YW5jZSh0aGlzLCBiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWM0LmRpc3RhbmNlfVxuICAgICAqL1xuICAgIGRpc3QoYikgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gYW5vdGhlciB7QGxpbmsgVmVjNH0gYW5kIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWM0LnNxdWFyZWREaXN0YW5jZSh0aGlzLCBiKTtgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYiBUaGUgdmVjdG9yIHRvIGNhbGN1bGF0ZSB0aGUgc3F1YXJlZCBkaXN0YW5jZSB0b1xuICAgICAqIEByZXR1cm5zIFNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBgdGhpc2AgYW5kIGBiYFxuICAgICAqL1xuICAgIHNxdWFyZWREaXN0YW5jZShiKSB7XG4gICAgICAgIHJldHVybiBWZWM0LnNxdWFyZWREaXN0YW5jZSh0aGlzLCBiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWM0LnNxdWFyZWREaXN0YW5jZX1cbiAgICAgKi9cbiAgICBzcXJEaXN0KGIpIHsgcmV0dXJuIDA7IH1cbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWM0Lm5lZ2F0ZSh0aGlzLCB0aGlzKTtgXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgdGhpc2BcbiAgICAgKi9cbiAgICBuZWdhdGUoKSB7XG4gICAgICAgIHRoaXNbMF0gKj0gLTE7XG4gICAgICAgIHRoaXNbMV0gKj0gLTE7XG4gICAgICAgIHRoaXNbMl0gKj0gLTE7XG4gICAgICAgIHRoaXNbM10gKj0gLTE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZlcnRzIHRoZSBjb21wb25lbnRzIG9mIGB0aGlzYC5cbiAgICAgKiBFcXVpdmFsZW50IHRvIGBWZWM0LmludmVyc2UodGhpcywgdGhpcyk7YFxuICAgICAqXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgaW52ZXJ0KCkge1xuICAgICAgICB0aGlzWzBdID0gMS4wIC8gdGhpc1swXTtcbiAgICAgICAgdGhpc1sxXSA9IDEuMCAvIHRoaXNbMV07XG4gICAgICAgIHRoaXNbMl0gPSAxLjAgLyB0aGlzWzJdO1xuICAgICAgICB0aGlzWzNdID0gMS4wIC8gdGhpc1szXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgYW5kIGFub3RoZXIge0BsaW5rIFZlYzR9LlxuICAgICAqIEVxdWl2YWxlbnQgdG8gYFZlYzQuZG90KHRoaXMsIGIpO2BcbiAgICAgKlxuICAgICAqIEBwYXJhbSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgRG90IHByb2R1Y3Qgb2YgYHRoaXNgIGFuZCBgYmBcbiAgICAgKi9cbiAgICBkb3QoYikge1xuICAgICAgICByZXR1cm4gdGhpc1swXSAqIGJbMF0gKyB0aGlzWzFdICogYlsxXSArIHRoaXNbMl0gKiBiWzJdICsgdGhpc1szXSAqIGJbM107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBgdGhpc2AuXG4gICAgICogRXF1aXZhbGVudCB0byBgVmVjNC5ub3JtYWxpemUodGhpcywgdGhpcyk7YFxuICAgICAqXG4gICAgICogQHJldHVybnMgYHRoaXNgXG4gICAgICovXG4gICAgbm9ybWFsaXplKCkge1xuICAgICAgICByZXR1cm4gVmVjNC5ub3JtYWxpemUodGhpcywgdGhpcyk7XG4gICAgfVxuICAgIC8vPT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFN0YXRpYyBtZXRob2RzXG4gICAgLy89PT09PT09PT09PT09PT09PT09XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldywgZW1wdHkge0BsaW5rIFZlYzR9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHJldHVybnMgYSBuZXcgNEQgdmVjdG9yXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWM0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIFZlYzR9IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSB2ZWN0b3IgdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJucyBhIG5ldyA0RCB2ZWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xvbmUoYSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzQoYSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIFZlYzR9IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB4IC0gWCBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0geSAtIFkgY29tcG9uZW50XG4gICAgICogQHBhcmFtIHogLSBaIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB3IC0gVyBjb21wb25lbnRcbiAgICAgKiBAcmV0dXJucyBhIG5ldyA0RCB2ZWN0b3JcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVZhbHVlcyh4LCB5LCB6LCB3KSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjNCh4LCB5LCB6LCB3KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHtAbGluayBWZWM0fSB0byBhbm90aGVyXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgc291cmNlIHZlY3RvclxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGNvcHkob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl07XG4gICAgICAgIG91dFszXSA9IGFbM107XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHtAbGluayBWZWM0fSB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIHggLSBYIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB5IC0gWSBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0geiAtIFogY29tcG9uZW50XG4gICAgICogQHBhcmFtIHcgLSBXIGNvbXBvbmVudFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHNldChvdXQsIHgsIHksIHosIHcpIHtcbiAgICAgICAgb3V0WzBdID0geDtcbiAgICAgICAgb3V0WzFdID0geTtcbiAgICAgICAgb3V0WzJdID0gejtcbiAgICAgICAgb3V0WzNdID0gdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0d28ge0BsaW5rIFZlYzR9c1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSBUaGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gVGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIFRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGFkZChvdXQsIGEsIGIpIHtcbiAgICAgICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgICAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICAgICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzQuc3VidHJhY3R9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzdWIob3V0LCBhLCBiKSB7IHJldHVybiBvdXQ7IH1cbiAgICAvKipcbiAgICAgKiBNdWx0aXBsaWVzIHR3byB7QGxpbmsgVmVjNH0nc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgICAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICAgICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgICAgICBvdXRbM10gPSBhWzNdICogYlszXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBWZWM0Lm11bHRpcGx5fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsKG91dCwgYSwgYikgeyByZXR1cm4gb3V0OyB9XG4gICAgLyoqXG4gICAgICogRGl2aWRlcyB0d28ge0BsaW5rIFZlYzR9J3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBkaXZpZGUob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgICAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gICAgICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzQuZGl2aWRlfVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZGl2KG91dCwgYSwgYikgeyByZXR1cm4gb3V0OyB9XG4gICAgLyoqXG4gICAgICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEge0BsaW5rIFZlYzR9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB2ZWN0b3IgdG8gY2VpbFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGNlaWwob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgICAgICAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICAgICAgICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gICAgICAgIG91dFszXSA9IE1hdGguY2VpbChhWzNdKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHtAbGluayBWZWM0fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdmVjdG9yIHRvIGZsb29yXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgZmxvb3Iob3V0LCBhKSB7XG4gICAgICAgIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gICAgICAgIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gICAgICAgIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gICAgICAgIG91dFszXSA9IE1hdGguZmxvb3IoYVszXSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHtAbGluayBWZWM0fSdzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgbWluKG91dCwgYSwgYikge1xuICAgICAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICAgICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgICAgICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28ge0BsaW5rIFZlYzR9J3NcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAgICogQHBhcmFtIGIgLSB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBtYXgob3V0LCBhLCBiKSB7XG4gICAgICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgICAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICAgICAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gICAgICAgIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEge0BsaW5rIFZlYzR9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB2ZWN0b3IgdG8gcm91bmRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyByb3VuZChvdXQsIGEpIHtcbiAgICAgICAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgICAgICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICAgICAgb3V0WzJdID0gTWF0aC5yb3VuZChhWzJdKTtcbiAgICAgICAgb3V0WzNdID0gTWF0aC5yb3VuZChhWzNdKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NhbGVzIGEge0BsaW5rIFZlYzR9IGJ5IGEgc2NhbGFyIG51bWJlclxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHZlY3RvciB0byBzY2FsZVxuICAgICAqIEBwYXJhbSBzY2FsZSAtIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2NhbGUob3V0LCBhLCBzY2FsZSkge1xuICAgICAgICBvdXRbMF0gPSBhWzBdICogc2NhbGU7XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBzY2FsZTtcbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIHNjYWxlO1xuICAgICAgICBvdXRbM10gPSBhWzNdICogc2NhbGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgdHdvIHtAbGluayBWZWM0fSdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIG91dCAtIHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHBhcmFtIHNjYWxlIC0gdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gICAgICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gICAgICAgIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB7QGxpbmsgVmVjNH0nc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICAgICAqL1xuICAgIHN0YXRpYyBkaXN0YW5jZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IHggPSBiWzBdIC0gYVswXTtcbiAgICAgICAgY29uc3QgeSA9IGJbMV0gLSBhWzFdO1xuICAgICAgICBjb25zdCB6ID0gYlsyXSAtIGFbMl07XG4gICAgICAgIGNvbnN0IHcgPSBiWzNdIC0gYVszXTtcbiAgICAgICAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjNC5kaXN0YW5jZX1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRpc3QoYSwgYikgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHtAbGluayBWZWM0fSdzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAgICAgKi9cbiAgICBzdGF0aWMgc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgeCA9IGJbMF0gLSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYlsxXSAtIGFbMV07XG4gICAgICAgIGNvbnN0IHogPSBiWzJdIC0gYVsyXTtcbiAgICAgICAgY29uc3QgdyA9IGJbM10gLSBhWzNdO1xuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjNC5zcXVhcmVkRGlzdGFuY2V9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzcXJEaXN0KGEsIGIpIHsgcmV0dXJuIDA7IH1cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBtYWduaXR1ZGUgKGxlbmd0aCkgb2YgYSB7QGxpbmsgVmVjNH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gICAgICogQHJldHVybnMgbGVuZ3RoIG9mIGBhYFxuICAgICAqL1xuICAgIHN0YXRpYyBtYWduaXR1ZGUoYSkge1xuICAgICAgICBjb25zdCB4ID0gYVswXTtcbiAgICAgICAgY29uc3QgeSA9IGFbMV07XG4gICAgICAgIGNvbnN0IHogPSBhWzJdO1xuICAgICAgICBjb25zdCB3ID0gYVszXTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjNC5tYWduaXR1ZGV9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtYWcoYSkgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjNC5tYWduaXR1ZGV9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgVmVjNC5tYWduaXR1ZGV9IHRvIGF2b2lkIGNvbmZsaWN0cyB3aXRoIGJ1aWx0aW4gYGxlbmd0aGAgbWV0aG9kcy9hdHRyaWJzXG4gICAgICovXG4gICAgLy8gQHRzLWlnbm9yZTogTGVuZ3RoIGNvbmZsaWN0cyB3aXRoIEZ1bmN0aW9uLmxlbmd0aFxuICAgIHN0YXRpYyBsZW5ndGgoYSkgeyByZXR1cm4gMDsgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgVmVjNC5tYWduaXR1ZGV9XG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgVmVjNC5tYWd9XG4gICAgICovXG4gICAgc3RhdGljIGxlbihhKSB7IHJldHVybiAwOyB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB7QGxpbmsgVmVjNH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAgICAgKiBAcmV0dXJucyBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gICAgICovXG4gICAgc3RhdGljIHNxdWFyZWRMZW5ndGgoYSkge1xuICAgICAgICBjb25zdCB4ID0gYVswXTtcbiAgICAgICAgY29uc3QgeSA9IGFbMV07XG4gICAgICAgIGNvbnN0IHogPSBhWzJdO1xuICAgICAgICBjb25zdCB3ID0gYVszXTtcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIFZlYzQuc3F1YXJlZExlbmd0aH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNxckxlbihhKSB7IHJldHVybiAwOyB9XG4gICAgLyoqXG4gICAgICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHtAbGluayBWZWM0fVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdmVjdG9yIHRvIG5lZ2F0ZVxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIG5lZ2F0ZShvdXQsIGEpIHtcbiAgICAgICAgb3V0WzBdID0gLWFbMF07XG4gICAgICAgIG91dFsxXSA9IC1hWzFdO1xuICAgICAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICAgICAgb3V0WzNdID0gLWFbM107XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB7QGxpbmsgVmVjNH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBpbnZlcnRcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBpbnZlcnNlKG91dCwgYSkge1xuICAgICAgICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICAgICAgICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICAgICAgICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICAgICAgICBvdXRbM10gPSAxLjAgLyBhWzNdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemUgYSB7QGxpbmsgVmVjNH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byBub3JtYWxpemVcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyBub3JtYWxpemUob3V0LCBhKSB7XG4gICAgICAgIGNvbnN0IHggPSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgeiA9IGFbMl07XG4gICAgICAgIGNvbnN0IHcgPSBhWzNdO1xuICAgICAgICBsZXQgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgIH1cbiAgICAgICAgb3V0WzBdID0geCAqIGxlbjtcbiAgICAgICAgb3V0WzFdID0geSAqIGxlbjtcbiAgICAgICAgb3V0WzJdID0geiAqIGxlbjtcbiAgICAgICAgb3V0WzNdID0gdyAqIGxlbjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHtAbGluayBWZWM0fSdzXG4gICAgICogQGNhdGVnb3J5IFN0YXRpY1xuICAgICAqXG4gICAgICogQHBhcmFtIGEgLSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgICAqIEBwYXJhbSBiIC0gdGhlIHNlY29uZCBvcGVyYW5kXG4gICAgICogQHJldHVybnMgZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICAgICAqL1xuICAgIHN0YXRpYyBkb3QoYSwgYikge1xuICAgICAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdICsgYVszXSAqIGJbM107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNyb3NzLXByb2R1Y3Qgb2YgdGhyZWUgdmVjdG9ycyBpbiBhIDQtZGltZW5zaW9uYWwgc3BhY2VcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAgICogQHBhcmFtIHUgLSB0aGUgZmlyc3QgdmVjdG9yXG4gICAgICogQHBhcmFtIHYgLSB0aGUgc2Vjb25kIHZlY3RvclxuICAgICAqIEBwYXJhbSB3IC0gdGhlIHRoaXJkIHZlY3RvclxuICAgICAqIEByZXR1cm5zIHJlc3VsdFxuICAgICAqL1xuICAgIHN0YXRpYyBjcm9zcyhvdXQsIHUsIHYsIHcpIHtcbiAgICAgICAgY29uc3QgYSA9IHZbMF0gKiB3WzFdIC0gdlsxXSAqIHdbMF07XG4gICAgICAgIGNvbnN0IGIgPSB2WzBdICogd1syXSAtIHZbMl0gKiB3WzBdO1xuICAgICAgICBjb25zdCBjID0gdlswXSAqIHdbM10gLSB2WzNdICogd1swXTtcbiAgICAgICAgY29uc3QgZCA9IHZbMV0gKiB3WzJdIC0gdlsyXSAqIHdbMV07XG4gICAgICAgIGNvbnN0IGUgPSB2WzFdICogd1szXSAtIHZbM10gKiB3WzFdO1xuICAgICAgICBjb25zdCBmID0gdlsyXSAqIHdbM10gLSB2WzNdICogd1syXTtcbiAgICAgICAgY29uc3QgZyA9IHVbMF07XG4gICAgICAgIGNvbnN0IGggPSB1WzFdO1xuICAgICAgICBjb25zdCBpID0gdVsyXTtcbiAgICAgICAgY29uc3QgaiA9IHVbM107XG4gICAgICAgIG91dFswXSA9IGggKiBmIC0gaSAqIGUgKyBqICogZDtcbiAgICAgICAgb3V0WzFdID0gLShnICogZikgKyBpICogYyAtIGogKiBiO1xuICAgICAgICBvdXRbMl0gPSBnICogZSAtIGggKiBjICsgaiAqIGE7XG4gICAgICAgIG91dFszXSA9IC0oZyAqIGQpICsgaCAqIGIgLSBpICogYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB7QGxpbmsgVmVjNH0nc1xuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIGZpcnN0IG9wZXJhbmRcbiAgICAgKiBAcGFyYW0gYiAtIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEBwYXJhbSB0IC0gaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gICAgICAgIGNvbnN0IGF4ID0gYVswXTtcbiAgICAgICAgY29uc3QgYXkgPSBhWzFdO1xuICAgICAgICBjb25zdCBheiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGF3ID0gYVszXTtcbiAgICAgICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgICAgICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgICAgICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gW3NjYWxlXSAtIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgLypzdGF0aWMgcmFuZG9tKG91dDogVmVjNExpa2UsIHNjYWxlKTogVmVjNExpa2Uge1xuICAgICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gIFxuICAgICAgLy8gTWFyc2FnbGlhLCBHZW9yZ2UuIENob29zaW5nIGEgUG9pbnQgZnJvbSB0aGUgU3VyZmFjZSBvZiBhXG4gICAgICAvLyBTcGhlcmUuIEFubi4gTWF0aC4gU3RhdGlzdC4gNDMgKDE5NzIpLCBuby4gMiwgNjQ1LS02NDYuXG4gICAgICAvLyBodHRwOi8vcHJvamVjdGV1Y2xpZC5vcmcvZXVjbGlkLmFvbXMvMTE3NzY5MjY0NDtcbiAgICAgIHZhciB2MSwgdjIsIHYzLCB2NDtcbiAgICAgIHZhciBzMSwgczI7XG4gICAgICBkbyB7XG4gICAgICAgIHYxID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICAgICAgdjIgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgICAgICBzMSA9IHYxICogdjEgKyB2MiAqIHYyO1xuICAgICAgfSB3aGlsZSAoczEgPj0gMSk7XG4gICAgICBkbyB7XG4gICAgICAgIHYzID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICAgICAgdjQgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgICAgICBzMiA9IHYzICogdjMgKyB2NCAqIHY0O1xuICAgICAgfSB3aGlsZSAoczIgPj0gMSk7XG4gIFxuICAgICAgdmFyIGQgPSBNYXRoLnNxcnQoKDEgLSBzMSkgLyBzMik7XG4gICAgICBvdXRbMF0gPSBzY2FsZSAqIHYxO1xuICAgICAgb3V0WzFdID0gc2NhbGUgKiB2MjtcbiAgICAgIG91dFsyXSA9IHNjYWxlICogdjMgKiBkO1xuICAgICAgb3V0WzNdID0gc2NhbGUgKiB2NCAqIGQ7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0qL1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybXMgdGhlIHtAbGluayBWZWM0fSB3aXRoIGEge0BsaW5rIE1hdDR9LlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvdXQgLSB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEBwYXJhbSBhIC0gdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICAgKiBAcGFyYW0gbSAtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICAgICAqIEByZXR1cm5zIGBvdXRgXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gICAgICAgIGNvbnN0IHggPSBhWzBdO1xuICAgICAgICBjb25zdCB5ID0gYVsxXTtcbiAgICAgICAgY29uc3QgeiA9IGFbMl07XG4gICAgICAgIGNvbnN0IHcgPSBhWzNdO1xuICAgICAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHc7XG4gICAgICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdICogdztcbiAgICAgICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICAgICAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyB0aGUge0BsaW5rIFZlYzR9IHdpdGggYSB7QGxpbmsgUXVhdH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcGFyYW0gYSAtIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIHEgLSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gICAgICogQHJldHVybnMgYG91dGBcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtUXVhdChvdXQsIGEsIHEpIHtcbiAgICAgICAgY29uc3QgeCA9IGFbMF07XG4gICAgICAgIGNvbnN0IHkgPSBhWzFdO1xuICAgICAgICBjb25zdCB6ID0gYVsyXTtcbiAgICAgICAgY29uc3QgcXggPSBxWzBdO1xuICAgICAgICBjb25zdCBxeSA9IHFbMV07XG4gICAgICAgIGNvbnN0IHF6ID0gcVsyXTtcbiAgICAgICAgY29uc3QgcXcgPSBxWzNdO1xuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuICAgICAgICBjb25zdCBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeTtcbiAgICAgICAgY29uc3QgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XG4gICAgICAgIGNvbnN0IGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4O1xuICAgICAgICBjb25zdCBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7XG4gICAgICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICAgICAgb3V0WzBdID0gaXggKiBxdyArIGl3ICogLXF4ICsgaXkgKiAtcXogLSBpeiAqIC1xeTtcbiAgICAgICAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgICAgICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICAgICAgb3V0WzNdID0gYVszXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEge0BsaW5rIFZlYzR9IHRvIHplcm9cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3V0IC0gdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJucyBgb3V0YFxuICAgICAqL1xuICAgIHN0YXRpYyB6ZXJvKG91dCkge1xuICAgICAgICBvdXRbMF0gPSAwLjA7XG4gICAgICAgIG91dFsxXSA9IDAuMDtcbiAgICAgICAgb3V0WzJdID0gMC4wO1xuICAgICAgICBvdXRbM10gPSAwLjA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB7QGxpbmsgVmVjNH1cbiAgICAgKiBAY2F0ZWdvcnkgU3RhdGljXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSAtIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICAgICAqL1xuICAgIHN0YXRpYyBzdHIoYSkge1xuICAgICAgICByZXR1cm4gYFZlYzQoJHthLmpvaW4oJywgJyl9KWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gVGhlIGZpcnN0IHZlY3Rvci5cbiAgICAgKiBAcGFyYW0gYiAtIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgc3RhdGljIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdICYmIGFbM10gPT09IGJbM107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgICAqIEBjYXRlZ29yeSBTdGF0aWNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhIC0gVGhlIGZpcnN0IHZlY3Rvci5cbiAgICAgKiBAcGFyYW0gYiAtIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgc3RhdGljIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIGNvbnN0IGEwID0gYVswXTtcbiAgICAgICAgY29uc3QgYTEgPSBhWzFdO1xuICAgICAgICBjb25zdCBhMiA9IGFbMl07XG4gICAgICAgIGNvbnN0IGEzID0gYVszXTtcbiAgICAgICAgY29uc3QgYjAgPSBiWzBdO1xuICAgICAgICBjb25zdCBiMSA9IGJbMV07XG4gICAgICAgIGNvbnN0IGIyID0gYlsyXTtcbiAgICAgICAgY29uc3QgYjMgPSBiWzNdO1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEzIC0gYjMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSk7XG4gICAgfVxufVxuLy8gSW5zdGFuY2UgbWV0aG9kIGFsaWFzIGFzc2lnbm1lbnRzXG5WZWM0LnByb3RvdHlwZS5zdWIgPSBWZWM0LnByb3RvdHlwZS5zdWJ0cmFjdDtcblZlYzQucHJvdG90eXBlLm11bCA9IFZlYzQucHJvdG90eXBlLm11bHRpcGx5O1xuVmVjNC5wcm90b3R5cGUuZGl2ID0gVmVjNC5wcm90b3R5cGUuZGl2aWRlO1xuVmVjNC5wcm90b3R5cGUuZGlzdCA9IFZlYzQucHJvdG90eXBlLmRpc3RhbmNlO1xuVmVjNC5wcm90b3R5cGUuc3FyRGlzdCA9IFZlYzQucHJvdG90eXBlLnNxdWFyZWREaXN0YW5jZTtcbi8vIFN0YXRpYyBtZXRob2QgYWxpYXMgYXNzaWdubWVudHNcblZlYzQuc3ViID0gVmVjNC5zdWJ0cmFjdDtcblZlYzQubXVsID0gVmVjNC5tdWx0aXBseTtcblZlYzQuZGl2ID0gVmVjNC5kaXZpZGU7XG5WZWM0LmRpc3QgPSBWZWM0LmRpc3RhbmNlO1xuVmVjNC5zcXJEaXN0ID0gVmVjNC5zcXVhcmVkRGlzdGFuY2U7XG5WZWM0LnNxckxlbiA9IFZlYzQuc3F1YXJlZExlbmd0aDtcblZlYzQubWFnID0gVmVjNC5tYWduaXR1ZGU7XG5WZWM0Lmxlbmd0aCA9IFZlYzQubWFnbml0dWRlO1xuVmVjNC5sZW4gPSBWZWM0Lm1hZ25pdHVkZTtcbi8qKlxuICogVmVjNCBhbGlhcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAqL1xuZXhwb3J0IGNvbnN0IHZlYzQgPSBWZWM0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVjNC5qcy5tYXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjdWJlRnJhZ21lbnRTaGFkZXIgZnJvbSBcIi4vc2hhZGVycy9jdWJlRnJhZ21lbnRTaGFkZXIuZnJhZ1wiO1xuaW1wb3J0IGN1YmVWZXJ0ZXhTaGFkZXIgZnJvbSBcIi4vc2hhZGVycy9jdWJlVmVydGV4U2hhZGVyLnZlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZVByb2dyYW0sIGNyZWF0ZVNoYWRlciwgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSB9IGZyb20gXCIuL3NoYWRlckhlbHBlclwiO1xuaW1wb3J0IHsgTWF0NCB9IGZyb20gXCIuLi9ub2RlX21vZHVsZXMvdHMtZ2wtbWF0cml4L2Rpc3Qvc3JjL21hdDRcIjtcbmltcG9ydCB7IFZlYzMgfSBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL3RzLWdsLW1hdHJpeC9kaXN0L3NyYy92ZWMzXCI7XG5pbXBvcnQgeyBRdWF0IH0gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy90cy1nbC1tYXRyaXgvZGlzdC9zcmMvcXVhdFwiO1xuY29uc3QgdmVydGV4QnVmZmVyRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgLTEuMCwgLTEuMCwgMS4wLFxuICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgIDEuMCwgLTEuMCwgMS4wLFxuICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgMS4wLCAtMS4wLCAtMS4wLFxuICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgIC0xLjAsIC0xLjAsIC0xLjAsXG4gICAgLTEuMCwgMS4wLCAxLjAsXG4gICAgLTEuMCwgMS4wLCAtMS4wLFxuICAgIDEuMCwgLTEuMCwgMS4wLFxuICAgIC0xLjAsIC0xLjAsIDEuMCxcbiAgICAtMS4wLCAtMS4wLCAtMS4wLFxuICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgIC0xLjAsIC0xLjAsIDEuMCxcbiAgICAxLjAsIC0xLjAsIDEuMCxcbiAgICAxLjAsIDEuMCwgMS4wLFxuICAgIDEuMCwgLTEuMCwgLTEuMCxcbiAgICAxLjAsIDEuMCwgLTEuMCxcbiAgICAxLjAsIC0xLjAsIC0xLjAsXG4gICAgMS4wLCAxLjAsIDEuMCxcbiAgICAxLjAsIC0xLjAsIDEuMCxcbiAgICAxLjAsIDEuMCwgMS4wLFxuICAgIDEuMCwgMS4wLCAtMS4wLFxuICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAxLjAsIDEuMCwgMS4wLFxuICAgIC0xLjAsIDEuMCwgLTEuMCxcbiAgICAtMS4wLCAxLjAsIDEuMCxcbiAgICAxLjAsIDEuMCwgMS4wLFxuICAgIC0xLjAsIDEuMCwgMS4wLFxuICAgIDEuMCwgLTEuMCwgMS4wLFxuXSk7XG52YXIgd2ViZ2xDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2ViZ2wtY2FudmFzJyk7XG52YXIgZ2wgPSB3ZWJnbENhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xud2ViZ2xDYW52YXMud2lkdGggPSB3ZWJnbENhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbndlYmdsQ2FudmFzLmhlaWdodCA9IHdlYmdsQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbmlmICghZ2wpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBtYXkgbm90IHN1cHBvcnQgaXQuXCIpO1xufVxuLy9lbmFsYmluZyBibGVuZGluZyBmb3IgcHJvcGVyIGFscGhhIFxuZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbmdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuLy9wcm9wZXIgZGVwdGggdGhlbiBkcmF3aW5nIHRoZSBjdWJlXG5nbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG5nbC5kZXB0aEZ1bmMoZ2wuTEVTUyk7XG4vL2NvbXBpbGluZyB0aGUgc2hhZGVycyB3aXRoIGEgaGVscGVyIGZ1bmN0aW9uXG52YXIgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCBjdWJlVmVydGV4U2hhZGVyKTtcbnZhciBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBjdWJlRnJhZ21lbnRTaGFkZXIpO1xuaWYgKCF2ZXJ0ZXhTaGFkZXIgfHwgIWZyYWdtZW50U2hhZGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU2hhZGVyIGNyZWF0aW9uIGZhaWxlZFwiKTtcbn1cbi8vY3JlYXRpbmcgYSBXZWJHTCBwcm9ncmFtIGFuZCBhdHRhY2hpbmcgdGhlIHNoYWRlcnMgdG8gaXQgd2l0aCBhIGhlbHBlciBmdW5jdGlvblxudmFyIHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcbmlmICghcHJvZ3JhbSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlByb2dyYW0gY3JlYXRpb24gZmFpbGVkXCIpO1xufVxudmFyIHZlcnRleEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlcik7XG5nbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4QnVmZmVyRGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuY29uc3QgbXZwVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdNVlAnKTtcbmRyYXdDdWJlKFZlYzMuZnJvbVZhbHVlcygwLjMsIDAuMywgMC4zKSk7XG5mdW5jdGlvbiBjcmVhdGVNVlBNYXRyaXgoc2NhbGUsIHJvdCkge1xuICAgIGxldCBNVlBNYXRyaXggPSBNYXQ0LmNyZWF0ZSgpO1xuICAgIE1hdDQuZnJvbVF1YXQoTVZQTWF0cml4LCBRdWF0LmZyb21FdWxlcihRdWF0LmNyZWF0ZSgpLCByb3QueCwgcm90LnksIHJvdC56KSk7XG4gICAgTVZQTWF0cml4LnNjYWxlKHNjYWxlKTtcbiAgICByZXR1cm4gTVZQTWF0cml4O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdDdWJlKHJvdCkge1xuICAgIGNvbnN0IHJvdGF0aW9uID0gVmVjMy5mcm9tVmFsdWVzKHBlcmZvcm1hbmNlLm5vdygpIC8gMTAwMC4wLCAvLyBSb3RhdGlvbiBhcm91bmQgWFxuICAgIHBlcmZvcm1hbmNlLm5vdygpIC8gMjAwMC4wLCAvLyBSb3RhdGlvbiBhcm91bmQgWVxuICAgIHBlcmZvcm1hbmNlLm5vdygpIC8gMzAwMC4wIC8vIFJvdGF0aW9uIGFyb3VuZCBaXG4gICAgKTtcbiAgICBjb25zdCBtdnBNYXRyaXggPSBjcmVhdGVNVlBNYXRyaXgoVmVjMy5mcm9tVmFsdWVzKDAuMywgMC4zLCAwLjMpLCByb3RhdGlvbik7XG4gICAgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZShnbC5jYW52YXMpO1xuICAgIC8vIFRlbGwgV2ViR0wgaG93IHRvIGNvbnZlcnQgZnJvbSBjbGlwIHNwYWNlIHRvIHBpeGVsc1xuICAgIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgLy8gQ2xlYXIgdGhlIGNhbnZhc1xuICAgIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMCk7IC8vIENsZWFyIHRvIHRyYW5zcGFyZW50IGJsYWNrXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoMCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlckRhdGEsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKDAsIDMsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihtdnBVbmlmb3JtTG9jYXRpb24sIGZhbHNlLCBtdnBNYXRyaXgpO1xuICAgIC8vIFRlbGwgaXQgdG8gdXNlIHByb2dyYW0gKHBhaXIgb2Ygc2hhZGVycylcbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDEyICogMyk7XG4gICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KDApO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9