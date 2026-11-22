(()=>{
const $=id=>document.getElementById(id),T=window.THREE;
const ready=()=>{$('loader').classList.add('gone');setTimeout(()=>document.body.classList.add('on'),450)};
if(!T){ready();return}
try{
const mob=innerWidth<820,N=mob?6500:15000,L=520,c=v=>Math.max(-1,Math.min(1,v)),rnd=(a,b)=>a+Math.random()*(b-a);
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const px=z=>Math.sin(z*.018)*26+Math.sin(z*.007)*30;
const hy=(x,z)=>Math.sin(x*.045)*Math.cos(z*.035)*7+Math.sin(x*.1+z*.06)*2.2;
const R=new T.WebGLRenderer({antialias:false});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.setClearColor(0x02030a);$('valley').appendChild(R.domElement);
const scene=new T.Scene(),cam=new T.PerspectiveCamera(60,1,.5,260);
const pos=new Float32Array(N*3),col=new Float32Array(N*3),siz=new Float32Array(N),sd=new Float32Array(N);
const pal=[[1,.42,.72],[.4,.92,1],[1,.76,.3],[.7,.55,1],[.5,1,.72]];
for(let i=0;i<N;i++){
  const z=-Math.random()*L,x=px(z)+(Math.random()+Math.random()+Math.random()-1.5)*70,r=Math.random(),leaf=r<.4,fly=r>.93;
  pos.set([x,hy(x,z)+(leaf?rnd(0,1):fly?rnd(3,17):rnd(.3,2.4)),z],i*3);
  col.set(leaf?[.04,.3,.22]:fly?[1,.95,.6]:pal[Math.random()*5|0],i*3);
  siz[i]=leaf?rnd(.3,.6):fly?rnd(.25,.5):rnd(.5,1.4);sd[i]=Math.random();
}
const g=new T.BufferGeometry();
g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('aCol',new T.BufferAttribute(col,3));
g.setAttribute('aSize',new T.BufferAttribute(siz,1));g.setAttribute('aSeed',new T.BufferAttribute(sd,1));
const mat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,
uniforms:{uT:{value:0},uM:{value:new T.Vector2(9,9)},uD:{value:0},uS:{value:1}},
vertexShader:`attribute vec3 aCol;attribute float aSize,aSeed;uniform float uT,uD,uS;uniform vec2 uM;varying vec3 vC;varying float vA;
void main(){
  vec3 p=position;
  float d0=-(modelViewMatrix*vec4(p,1.)).z;
  float bloom=smoothstep(110.,12.,d0);
  p.y+=sin(uT*.8+aSeed*40.)*.25;
  p+=vec3(sin(aSeed*91.+uT*.3),cos(aSeed*57.+uT*.25)+.4,sin(aSeed*13.))*uD*(14.*aSeed+4.);
  vec4 mv=modelViewMatrix*vec4(p,1.);
  vec4 q=projectionMatrix*mv;
  vec2 n=q.xy/q.w-uM;float f=exp(-dot(n,n)*14.);
  q.xy+=normalize(n+vec2(1e-4))*f*.16*q.w;
  gl_Position=q;
  gl_PointSize=min(aSize*(.35+.65*bloom)*(1.+f*1.8)*uS/max(-mv.z,1.),90.);
  vC=aCol*(1.+f*1.6);vA=smoothstep(210.,40.,-mv.z)*(.45+.55*bloom);
}`,
fragmentShader:`varying vec3 vC;varying float vA;void main(){float r=length(gl_PointCoord-.5)*2.;float a=pow(max(1.-r,0.),2.2);gl_FragColor=vec4(vC*1.5,a*vA);}`});
const pts=new T.Points(g,mat);pts.frustumCulled=false;scene.add(pts);
let tx=9,ty=9,mx=9,my=9,drift=0,hov=0,hovT=0,prog=0,last=performance.now();
const maxS=()=>Math.max(1,document.documentElement.scrollHeight-innerHeight);
const size=()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();mat.uniforms.uS.value=innerHeight*R.getPixelRatio()*.87};
addEventListener('resize',size);size();
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth*2-1;ty=1-e.clientY/innerHeight*2});
// звук: синтезированный «ambient», запускается по кнопке
let ac,gain,lp,muted=true;
const audio=()=>{ac=new (window.AudioContext||window.webkitAudioContext)();lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1800;gain=ac.createGain();gain.gain.value=0;
  [110,164.8,220,277.2].forEach((f,i)=>{const o=ac.createOscillator(),v=ac.createGain();o.type=i%2?'triangle':'sine';o.frequency.value=f;v.gain.value=.05;o.connect(v);v.connect(lp);o.start()});
  lp.connect(gain);gain.connect(ac.destination)};
$('sound').onclick=()=>{if(!ac)audio();ac.resume();muted=!muted;gain.gain.linearRampToValueAtTime(muted?0:.7,ac.currentTime+1);$('sound').setAttribute('aria-pressed',String(!muted))};
// наведение на круглую кнопку: полёт замедляется, цветы разлетаются, звук глохнет
const hover=v=>{hovT=v;if(lp)lp.frequency.linearRampToValueAtTime(v?260:1800,ac.currentTime+.8)};
$('cta').addEventListener('pointerenter',()=>hover(1));$('cta').addEventListener('pointerleave',()=>hover(0));
const frame=now=>{
  const dt=Math.min((now-last)/1000,.05);last=now;
  hov+=(hovT-hov)*Math.min(dt*2.5,1);
  mx+=(tx-mx)*Math.min(dt*6,1);my+=(ty-my)*Math.min(dt*6,1);
  if(!rm)drift=Math.min(drift+dt*.004*(1-hov),.2);
  const target=Math.min(scrollY/maxS()*.75+drift,.96);
  prog+=(target-prog)*Math.min(dt*(1.5*(1-hov)+.1),1);
  const z=-prog*L,x=px(z),zl=z-9,xl=px(zl);
  cam.position.set(x,hy(x,z)+8+Math.sin(now*.0004)*.6,z);
  cam.lookAt(xl+c(mx)*8,hy(xl,zl)+4.5+c(my)*4,zl);
  mat.uniforms.uT.value=now*.001;mat.uniforms.uD.value=hov;mat.uniforms.uM.value.set(mx,my);
  R.render(scene,cam);requestAnimationFrame(frame);
};
frame(last);ready();
}catch(e){console.warn('WebGL недоступен',e);ready()}
})();
