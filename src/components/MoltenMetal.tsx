import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface MoltenMetalProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: 'molten' | 'monochrome';
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_speed;
  uniform float u_scale;
  uniform float u_detail;
  uniform float u_glow;
  uniform float u_coreSize;
  uniform float u_swirl;
  uniform float u_fold;
  uniform float u_blackPoint;
  uniform float u_brightness;
  uniform float u_grainIntensity;
  uniform float u_mouseStrength;
  uniform float u_opacity;
  uniform bool u_grain;

  varying vec2 vUv;

  // Simplex Noise 2D
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion with domain warping
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < 4; i++) {
      if (float(i) >= u_detail) break;
      value += amplitude * snoise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  // Random generator for film grain
  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  void main() {
    vec2 st = (vUv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) * u_scale;
    float t = u_time * u_speed;

    // Mouse wave interaction
    vec2 mouseOffset = (u_mouse - 0.5) * u_mouseStrength;
    st += mouseOffset;

    // Swirl & fold domain warping
    vec2 q = vec2(0.0);
    q.x = fbm(st + vec2(0.0, t));
    q.y = fbm(st + vec2(1.0, t));

    vec2 r = vec2(0.0);
    r.x = fbm(st + u_swirl * q + vec2(1.7, 9.2) + 0.15 * t);
    r.y = fbm(st + u_fold * q + vec2(8.3, 2.8) + 0.126 * t);

    float f = fbm(st + r);

    // Liquid highlights & core glow
    float glow = pow(f, u_glow) * u_brightness;
    glow = smoothstep(u_blackPoint, 1.0, glow);

    // Color gradient mixing
    vec3 color = mix(u_color1, u_color2, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, u_color3, clamp(pow(f, 2.5), 0.0, 1.0));
    color *= glow;

    // Add core glow highlight
    color += u_color3 * smoothstep(1.0 - u_coreSize, 1.0, f) * u_brightness * 0.5;

    // Grain overlay
    if (u_grain) {
      float grain = (rand(vUv * u_time) - 0.5) * u_grainIntensity;
      color += grain;
    }

    // Alpha mask for subtle overlay blending
    float alpha = clamp(length(color) * 0.85, 0.0, 1.0) * u_opacity;

    gl_FragColor = vec4(color, alpha);
  }
`;

export const MoltenMetal: React.FC<MoltenMetalProps> = ({
  color1 = '#5227FF',
  color2 = '#FF9FFC',
  color3 = '#FFFFFF',
  speed = 0.35,
  scale = 4,
  detail = 3,
  glow = 1.6,
  coreSize = 0.1,
  swirl = 1,
  fold = -0.2,
  blackPoint = 0.05,
  brightness = 1.3,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  opacity = 0.35,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Material Uniforms
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_color1: { value: new THREE.Color(color1) },
      u_color2: { value: new THREE.Color(color2) },
      u_color3: { value: new THREE.Color(color3) },
      u_speed: { value: speed },
      u_scale: { value: scale },
      u_detail: { value: detail },
      u_glow: { value: glow },
      u_coreSize: { value: coreSize },
      u_swirl: { value: swirl },
      u_fold: { value: fold },
      u_blackPoint: { value: blackPoint },
      u_brightness: { value: brightness },
      u_grainIntensity: { value: grainIntensity },
      u_mouseStrength: { value: mouseStrength },
      u_opacity: { value: opacity },
      u_grain: { value: grain }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
      uniforms.u_mouse.value.y = 1.0 - e.clientY / window.innerHeight;
    };

    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    color1, color2, color3, speed, scale, detail, glow, coreSize,
    swirl, fold, blackPoint, brightness, grain, grainIntensity,
    mouseInteraction, mouseStrength, opacity
  ]);

  return (
    <div
      ref={containerRef}
      className={`molten-metal-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style
      }}
    />
  );
};

export default MoltenMetal;
