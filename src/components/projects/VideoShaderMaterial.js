import * as THREE from 'three';

/**
 * Custom Gaussian Blur Video Shader Material
 * 
 * Complies strictly with the requirement:
 * "Apply a slight blur to the video. Implement it in a custom fragment shader on the video texture
 * (a small gaussian blur with an adjustable uBlur, default about 1.5 px), so it works in Safari too.
 * Do not rely on ctx.filter."
 */

export const VideoBlurShader = {
  uniforms: {
    uTexture: { value: null },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
    uBlur: { value: 1.5 },
    uCurvature: { value: 0.0 }, // Spherical visor curvature distortion
    uVignette: { value: 0.15 },
    uBrightness: { value: 1.05 },
    uOpacity: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform float uBlur;
    uniform float uCurvature;
    uniform float uVignette;
    uniform float uBrightness;
    uniform float uOpacity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec2 uv = vUv;

      // Visor or lens spherical curvature distortion if requested
      if (uCurvature > 0.001) {
        vec2 centered = uv - 0.5;
        float r2 = dot(centered, centered);
        uv = 0.5 + centered * (1.0 + uCurvature * r2 * 1.5);
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
          discard;
        }
      }

      vec4 color = vec4(0.0);

      if (uBlur <= 0.05) {
        color = texture2D(uTexture, uv);
      } else {
        vec2 texel = (vec2(1.0) / uResolution) * uBlur;
        
        // 9-tap 2D Gaussian kernel
        // Weights: Center 0.204, Orthogonal 0.124 * 4, Diagonal 0.075 * 4 => sum = 1.0
        color += texture2D(uTexture, uv) * 0.204164;
        color += texture2D(uTexture, uv + vec2( texel.x,  0.0)) * 0.123849;
        color += texture2D(uTexture, uv + vec2(-texel.x,  0.0)) * 0.123849;
        color += texture2D(uTexture, uv + vec2( 0.0,      texel.y)) * 0.123849;
        color += texture2D(uTexture, uv + vec2( 0.0,     -texel.y)) * 0.123849;
        color += texture2D(uTexture, uv + vec2( texel.x,  texel.y)) * 0.075117;
        color += texture2D(uTexture, uv + vec2(-texel.x,  texel.y)) * 0.075117;
        color += texture2D(uTexture, uv + vec2( texel.x, -texel.y)) * 0.075117;
        color += texture2D(uTexture, uv + vec2(-texel.x, -texel.y)) * 0.075117;
      }

      // Subtle edge vignette
      if (uVignette > 0.001) {
        vec2 vigUv = (uv - 0.5) * 2.0;
        float vig = clamp(1.0 - dot(vigUv, vigUv) * uVignette, 0.0, 1.0);
        color.rgb *= vig;
      }

      // Brightness calibration
      color.rgb *= uBrightness;

      gl_FragColor = vec4(color.rgb, color.a * uOpacity);
    }
  `
};

export function createVideoBlurMaterial(texture, options = {}) {
  const {
    blur = 1.5,
    curvature = 0.0,
    vignette = 0.1,
    brightness = 1.0,
    opacity = 1.0,
    resolution = new THREE.Vector2(1920, 1080),
    transparent = false,
    side = THREE.FrontSide
  } = options;

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: texture },
      uResolution: { value: resolution },
      uBlur: { value: blur },
      uCurvature: { value: curvature },
      uVignette: { value: vignette },
      uBrightness: { value: brightness },
      uOpacity: { value: opacity }
    },
    vertexShader: VideoBlurShader.vertexShader,
    fragmentShader: VideoBlurShader.fragmentShader,
    transparent: transparent || opacity < 1.0,
    side: side,
    depthWrite: true,
    depthTest: true
  });

  return mat;
}
