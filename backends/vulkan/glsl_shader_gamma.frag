#version 450 core
layout(location = 0) out vec4 fColor;

layout(set=0, binding=0) uniform sampler2D sTexture;

layout(location = 0) in struct {
    vec4 Color;
    vec2 UV;
} In;

void main()
{
    // In.Color is already linear (decoded in the vertex shader). Gamma-encode
    // back to sRGB for a non-sRGB backbuffer (when ImGuiBackendFlags_ToolKitGammaEncode
    // is set). Mirrors the flag-gated fragment_shader_glsl_300_es in the OpenGL3 backend.
    vec4 linear_color = In.Color * texture(sTexture, In.UV.st);
    vec3 srgb_color = pow(linear_color.rgb, vec3(0.454545));
    fColor = vec4(srgb_color, linear_color.a);
}
