#version 300 es

precision mediump float;

in vec3 fragmentColor;
out vec4 color;

void main(){

    color = vec4(fragmentColor, 1.);
}