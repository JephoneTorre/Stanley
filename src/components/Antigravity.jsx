import React, { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Plane } from 'ogl';

const vertexShader = `
  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 normal;
  
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform vec2 uMouse;
  uniform float uInteractive;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex 3D Noise 
  // by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    vec3 pos = position;
    
    float noise1 = snoise(vec3(pos.x * 2.0, pos.y * 2.0, uTime * uSpeed));
    float noise2 = snoise(vec3(pos.x * 4.0 - uTime * uSpeed, pos.y * 4.0, uTime * uSpeed * 0.5));
    
    // Mouse interaction displacement
    float dist = distance(uv, uMouse);
    float mouseEffect = uInteractive > 0.5 ? smoothstep(0.4, 0.0, dist) * 0.5 : 0.0;
    
    pos.z += (noise1 * 0.4 + noise2 * 0.2) * uAmplitude;
    pos.z += mouseEffect;

    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform vec3 uBaseColor;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Basic dynamic lighting simulation
    vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
    
    // Approximate normals using partial derivatives
    vec3 dpdx = dFdx(vPosition);
    vec3 dpdy = dFdy(vPosition);
    vec3 normal = normalize(cross(dpdx, dpdy));
    
    float diff = max(dot(normal, lightDir), 0.2);
    
    // Liquid chrome highlight reflection
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    
    // Mix the base color with shading and highlights
    vec3 finalColor = mix(uBaseColor * diff, vec3(1.0), spec * 0.8);
    
    // Add nice dark metallic fading
    finalColor = mix(finalColor, vec3(0.0), smoothstep(0.5, -0.5, normal.z));
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ] : [0, 0, 0];
}

const Antigravity = ({ 
  baseColor = "#c73434", 
  speed = 0.3, 
  amplitude = 0.3, 
  interactive = true 
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      premultipliedAlpha: false
    });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 2;

    const scene = new Transform();

    const geometry = new Plane(gl, {
      width: 4,
      height: 4,
      widthSegments: 100,
      heightSegments: 100
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uMouse: { value: [0.5, 0.5] },
        uInteractive: { value: interactive ? 1.0 : 0.0 },
        uBaseColor: { value: hexToRgb(baseColor) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const resize = () => {
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      // Cover logic
      const dist = camera.position.z - mesh.position.z;
      const height = 1; // 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
      camera.position.z = 2.5; 
      mesh.scale.set(gl.canvas.width / gl.canvas.height > 1 ? gl.canvas.width/gl.canvas.height * 2.5 : 2.5);
    };

    window.addEventListener('resize', resize, false);
    resize();

    const mouse = { x: 0.5, y: 0.5 };
    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let requestID;
    const render = (t) => {
      requestID = requestAnimationFrame(render);
      program.uniforms.uTime.value = t * 0.001;
      
      // Smoothly interpolate mouse uniform
      program.uniforms.uMouse.value[0] += (mouse.x - program.uniforms.uMouse.value[0]) * 0.1;
      program.uniforms.uMouse.value[1] += (mouse.y - program.uniforms.uMouse.value[1]) * 0.1;
      
      renderer.render({ scene, camera });
    };
    requestID = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(requestID);
      containerRef.current?.removeChild(gl.canvas);
    };
  }, [baseColor, speed, amplitude, interactive]);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: -1
      }} 
    />
  );
};

export default Antigravity;
