#version 300 es

precision mediump float;

layout(location = 0) in vec3 vertexPosition_modelspace;
layout(location = 1) in vec3 vertexColor_modelspace;

out vec3 fragmentColor;

uniform mat4 u_MVP;


void main(){ 
  gl_Position =  u_MVP * vec4(vertexPosition_modelspace, 1.);

  fragmentColor = vertexColor_modelspace;
}