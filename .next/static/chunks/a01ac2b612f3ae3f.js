(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,8003,e=>{"use strict";var t=e.i(50789),o=e.i(29715),r=e.i(74701),i=e.i(86746),a=e.i(78464),n=e.i(32370),s=e.i(24529),l=e.i(35339),c=e.i(9858);let u={uniforms:{ghostPosition:{value:new c.Vector3(0,0,0)},revealRadius:{value:37},fadeStrength:{value:1.7},baseOpacity:{value:.9},revealOpacity:{value:.05},time:{value:0}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      
      void main() {
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        gl_FragColor = vec4(0.001, 0.001, 0.002, opacity); // Ultra-low RGB
      }
    `};function d(){let e=(0,o.useRef)(null);return(0,i.useFrame)(t=>{e.current&&(e.current.uniforms.time.value=t.clock.elapsedTime)}),(0,t.jsxs)("mesh",{position:[0,0,-50],renderOrder:-100,children:[(0,t.jsx)("planeGeometry",{args:[300,300]}),(0,t.jsx)("shaderMaterial",{ref:e,args:[u],transparent:!0,depthWrite:!1})]})}function m(){let e=(0,o.useMemo)(()=>[new c.SphereGeometry(.05,6,6),new c.TetrahedronGeometry(.04,0),new c.OctahedronGeometry(.045,0)],[]),r=(0,o.useMemo)(()=>Array(50).fill(0).map(()=>({geoIndex:Math.floor(Math.random()*e.length),pos:new c.Vector3((Math.random()-.5)*8,(Math.random()-.5)*8-2,(Math.random()-.5)*4-1),color:"#8a2be2"})),[e]),a=(0,o.useRef)(null);return(0,i.useFrame)(e=>{let t=e.clock.elapsedTime;a.current&&(a.current.rotation.y=.05*t)}),(0,t.jsx)("group",{ref:a,children:r.map((o,r)=>(0,t.jsx)("mesh",{position:o.pos,geometry:e[o.geoIndex],children:(0,t.jsx)("meshBasicMaterial",{color:o.color,transparent:!0,opacity:.6})},r))})}function f(){let e=(0,o.useRef)(null),r=(0,o.useMemo)(()=>Array(20).fill(0).map(()=>({pos:new c.Vector3((Math.random()-.5)*40,(Math.random()-.5)*30,(Math.random()-.5)*20),velocity:new c.Vector3((Math.random()-.5)*.09,(Math.random()-.5)*.09,(Math.random()-.5)*.09)})),[]);return(0,i.useFrame)(()=>{e.current&&e.current.children.forEach((e,t)=>{let o=r[t];e.position.add(o.velocity),e.position.x>25&&(e.position.x=-25),e.position.x<-25&&(e.position.x=25),e.position.y>20&&(e.position.y=-20),e.position.y<-20&&(e.position.y=20)})}),(0,t.jsx)("group",{ref:e,children:r.map((e,o)=>(0,t.jsxs)("mesh",{position:e.pos,children:[(0,t.jsx)("sphereGeometry",{args:[.02,4,4]}),(0,t.jsx)("meshBasicMaterial",{color:0xffff44,transparent:!0,opacity:.9}),(0,t.jsx)("pointLight",{color:0xffff44,intensity:.8,distance:3,decay:2}),(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[.08,8,8]}),(0,t.jsx)("meshBasicMaterial",{color:0xffff88,transparent:!0,opacity:.4,side:c.BackSide})]})]},o))})}var h=e.i(26152);function p({children:e}){let r=(0,s.usePrefersReducedMotion)(),n=(0,o.useRef)(null),l=(0,o.useRef)({x:0,y:0}),{size:c}=(0,a.useThree)();return(0,o.useEffect)(()=>{if(r)return;let e=e=>{l.current.x=e.clientX/c.width*2-1,l.current.y=-(2*(e.clientY/c.height))+1};return window.addEventListener("mousemove",e),()=>window.removeEventListener("mousemove",e)},[r,c]),(0,i.useFrame)(()=>{!r&&n.current&&(n.current.position.x+=(8*l.current.x-n.current.position.x)*.05,n.current.position.y+=(5*l.current.y-n.current.position.y)*.05)}),(0,t.jsx)("group",{ref:n,children:e})}function v(){return(0,t.jsxs)(r.Canvas,{camera:{position:[0,0,7],fov:45},dpr:[1,2],gl:{antialias:!1,alpha:!0},className:"absolute inset-0 z-0",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"},children:[(0,t.jsx)("color",{attach:"background",args:["#06071f"]}),(0,t.jsx)("ambientLight",{intensity:.08,color:"#0a0a2e"}),(0,t.jsx)(d,{}),(0,t.jsxs)(p,{children:[(0,t.jsx)(l.default,{}),(0,t.jsx)(m,{})]}),(0,t.jsx)(f,{}),(0,t.jsxs)(n.EffectComposer,{children:[(0,t.jsx)(n.Bloom,{intensity:2.8,luminanceThreshold:.1,luminanceSmoothing:.9,radius:.6}),(0,t.jsx)(h.default,{}),(0,t.jsx)(n.Vignette,{eskil:!1,offset:.1,darkness:.4})]})]})}e.s(["default",()=>v],8003)},12235,e=>{e.n(e.i(8003))}]);