import * as THREE from './three.module.js';
import {makeEnv} from './env.js';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const cv=document.getElementById('c3d'),box=cv.parentElement;
let r;try{r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){document.getElementById('nowebgl').hidden=false;throw e}
r.setPixelRatio(Math.min(devicePixelRatio,2));r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05;r.outputColorSpace=THREE.SRGBColorSpace;
const sc=new THREE.Scene();sc.environment=makeEnv(THREE,r,{bg:0x120a18,lights:[[0xffffff,9],[0xff6fe6,6],[0x9a7cff,5]]});
const cam=new THREE.PerspectiveCamera(30,1,.1,60);
const key=new THREE.DirectionalLight(0xffffff,1.4);key.position.set(3,6,4);sc.add(key);
const m1=new THREE.PointLight(0xff2bd6,40,16,1.5);m1.position.set(-4,2.2,3);sc.add(m1);
const m2=new THREE.PointLight(0x8a5cff,30,16,1.5);m2.position.set(4,1.5,-3);sc.add(m2);
const car=new THREE.Group();const turn=new THREE.Group();turn.add(car);sc.add(turn);
const PAINT=[0x0b0b0f,0xd6119f,0xb9bcc4,0xefeaf1];
const paint=new THREE.MeshPhysicalMaterial({color:PAINT[0],metalness:.7,roughness:.5,clearcoat:1,clearcoatRoughness:.5});
const glass=new THREE.MeshPhysicalMaterial({color:0x0a0c12,metalness:.1,roughness:.05,clearcoat:1});
/* body from side silhouette with wheel arches */
const sh=new THREE.Shape();sh.moveTo(2.2,.25);sh.lineTo(1.9,.25);sh.lineTo(1.9,.4);sh.absarc(1.4,.4,.5,0,Math.PI,false);sh.lineTo(.9,.25);sh.lineTo(-.9,.25);sh.lineTo(-.9,.4);sh.absarc(-1.4,.4,.5,0,Math.PI,false);sh.lineTo(-1.9,.25);sh.lineTo(-2.2,.25);sh.lineTo(-2.25,.6);sh.bezierCurveTo(-2.25,.78,-2.15,.85,-2.0,.87);sh.lineTo(-1.2,.95);sh.lineTo(.2,1.0);sh.lineTo(1.2,.97);sh.quadraticCurveTo(1.9,.9,2.12,.68);sh.lineTo(2.25,.5);sh.lineTo(2.2,.25);
const bodyG=new THREE.ExtrudeGeometry(sh,{depth:1.5,bevelEnabled:true,bevelThickness:.16,bevelSize:.07,bevelSegments:8,curveSegments:32});bodyG.translate(0,0,-.75);
const body=new THREE.Mesh(bodyG,paint);car.add(body);
const cs=new THREE.Shape();cs.moveTo(-1.35,.95);cs.bezierCurveTo(-1.0,1.4,-.7,1.48,-.3,1.5);cs.lineTo(.35,1.5);cs.bezierCurveTo(.7,1.45,.95,1.15,1.3,.95);cs.lineTo(-1.35,.95);
const cabG=new THREE.ExtrudeGeometry(cs,{depth:1.2,bevelEnabled:true,bevelThickness:.1,bevelSize:.05,bevelSegments:6,curveSegments:24});cabG.translate(0,0,-.6);
const cab=new THREE.Mesh(cabG,glass);car.add(cab);

/* wheels */
const tireM=new THREE.MeshStandardMaterial({color:0x111114,roughness:.8}),rimM=new THREE.MeshStandardMaterial({color:0xdadde4,metalness:1,roughness:.2});
const wheels=[];[[1.4,.92],[1.4,-.92],[-1.4,.92],[-1.4,-.92]].forEach(([x,z])=>{const g=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.3,32),tireM);t.rotation.x=Math.PI/2;g.add(t);const rm=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.32,32),rimM);rm.rotation.x=Math.PI/2;g.add(rm);for(let i=0;i<5;i++){const sp=new THREE.Mesh(new THREE.BoxGeometry(.5,.07,.06),new THREE.MeshStandardMaterial({color:0x2a2a30,metalness:.9,roughness:.3}));sp.rotation.z=i/5*Math.PI*2;sp.position.z=z>0?.17:-.17;g.add(sp)}g.position.set(x,.4,z);car.add(g);wheels.push(g)});
/* wells (dark) */
[[1.4],[-1.4]].forEach(([x])=>{const w=new THREE.Mesh(new THREE.BoxGeometry(1.1,.5,1.6),new THREE.MeshBasicMaterial({color:0x020204}));w.position.set(x,.42,0);car.add(w)});
/* lights */
const hl=new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:2.5}),tl=new THREE.MeshStandardMaterial({color:0xff2b4a,emissive:0xff2b4a,emissiveIntensity:2.2});
[-.55,.55].forEach(z=>{const h=new THREE.Mesh(new THREE.BoxGeometry(.06,.07,.38),hl);h.position.set(2.43,.64,z);car.add(h);const t=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,.42),tl);t.position.set(-2.46,.66,z);car.add(t)});
/* ground */
const gm=new THREE.Mesh(new THREE.CircleGeometry(6,64),new THREE.MeshStandardMaterial({color:0x0b0810,metalness:.8,roughness:.25}));gm.rotation.x=-Math.PI/2;gm.position.y=.0;sc.add(gm);
const ringG=new THREE.Mesh(new THREE.RingGeometry(3.6,3.68,96),new THREE.MeshBasicMaterial({color:0xff2bd6,side:THREE.DoubleSide,transparent:true,opacity:.9}));ringG.rotation.x=-Math.PI/2;ringG.position.y=.01;sc.add(ringG);
const ring2=new THREE.Mesh(new THREE.RingGeometry(4.3,4.33,96),new THREE.MeshBasicMaterial({color:0x8a5cff,side:THREE.DoubleSide,transparent:true,opacity:.6}));ring2.rotation.x=-Math.PI/2;ring2.position.y=.01;sc.add(ring2);
const bc=document.createElement('canvas');bc.width=bc.height=128;const bx=bc.getContext('2d');const gg=bx.createRadialGradient(64,64,6,64,64,64);gg.addColorStop(0,'rgba(0,0,0,.85)');gg.addColorStop(1,'rgba(0,0,0,0)');bx.fillStyle=gg;bx.fillRect(0,0,128,128);
const blob=new THREE.Mesh(new THREE.PlaneGeometry(6.4,3.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(bc),transparent:true,depthWrite:false}));blob.rotation.x=-Math.PI/2;blob.position.y=.02;sc.add(blob);
/* state */
let yaw=-.6,tyaw=-.6,pitch=.12,tp=.12,drag=null,vis=true,t=0,spinV=0;
function mat(){const C=window.CAR||{shine:10,color:0};const k=C.shine/100;paint.color.setHex(PAINT[C.color]);paint.roughness=.55-.5*k;paint.clearcoatRoughness=.55-.53*k;paint.metalness=C.color===0?.55+.3*k:.7;paint.envMapIntensity=.5+1.3*k;paint.needsUpdate=false}
function size(){const w=box.clientWidth,h=box.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;const narrow=w/h<.9;cam.fov=narrow?42:30;cam.position.set(narrow?0:-1.1,narrow?3.4:3.2,narrow?13.5:12.4);cam.lookAt(narrow?0:-1.1,narrow?1.6:.5,0);cam.updateProjectionMatrix();if(RM)draw()}
function draw(){mat();turn.rotation.y=yaw;turn.rotation.x=0;r.render(sc,cam)}
function loop(){if(vis){const C=window.CAR||{spin:true};if(!drag&&C.spin&&!RM)tyaw+=.0042;yaw+=(tyaw-yaw)*.1;pitch+=(tp-pitch)*.1;t+=.016;m1.position.x=-4+Math.sin(t*.8)*3;m1.position.z=3+Math.cos(t*.8)*1.5;m2.position.x=4-Math.sin(t*.8)*3;wheels.forEach(w=>w.rotation.z=-t*1.2*(C.spin?1:0));draw()}requestAnimationFrame(loop)}
window.CAR=Object.assign(window.CAR||{shine:10,color:0,spin:true},{draw:()=>{if(RM)draw()}});
cam.lookAt(0,.55,0);
new ResizeObserver(size).observe(box);new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(box);
cv.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(drag){tyaw+=(e.clientX-drag.x)*.008;tp=Math.max(-.2,Math.min(.5,tp+(e.clientY-drag.y)*.003));drag={x:e.clientX,y:e.clientY};if(RM)draw()}});
cv.addEventListener('pointerup',()=>drag=null);cv.addEventListener('pointercancel',()=>drag=null);
cv.tabIndex=0;cv.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')tyaw-=.2;if(e.key==='ArrowRight')tyaw+=.2;if(RM)draw()});
addEventListener('scroll',()=>{if(!RM&&scrollY<innerHeight)tyaw+=.002},{passive:true});
size();draw();loop();window.__car=true;
