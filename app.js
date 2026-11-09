(function(){
const {RM,$,$$}=K;
K.intro($('#intro'),1700);K.reveal();K.magnet('.mag');K.smooth();
const NUM='12676972146';
K.waLinks({num:NUM,greet:'Hi Manu, I found your page online and would like a quote.'});
const F=K.form($('#qf'),{num:NUM,biz:'Manu Mobile Detailing & Carpet Cleaning',areaLabel:'ZIP code or town',greet:'Hi Manu, I would like a quote.'});window.__form=F;
$$('.pick').forEach(b=>b.addEventListener('click',()=>{const s=$('#qf').elements.service;s.value=b.dataset.job;s.dispatchEvent(new Event('change',{bubbles:true}));$('#quote').scrollIntoView({behavior:RM?'auto':'smooth'});setTimeout(()=>$('#qf').elements.name.focus({preventScroll:true}),500)}));
const secs=['top','services','why','quote'].map(id=>[id,document.getElementById(id)]);const links=$$('.side a');
const hl=()=>{let cur='top';secs.forEach(([id,el])=>{if(el.getBoundingClientRect().top<innerHeight*.5)cur=id});links.forEach(a=>a.classList.toggle('on',a.dataset.s===cur))};addEventListener('scroll',hl,{passive:true});hl();
const rail=$('#rail');const step=()=>Math.min(440,rail.clientWidth*.85);
$('#next').onclick=()=>rail.scrollBy({left:step(),behavior:RM?'auto':'smooth'});$('#prev').onclick=()=>rail.scrollBy({left:-step(),behavior:RM?'auto':'smooth'});
rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight')$('#next').click();if(e.key==='ArrowLeft')$('#prev').click()});
/* drag-scroll rail with mouse */
let dn=null;rail.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&!e.target.closest('button')){dn={x:e.clientX,s:rail.scrollLeft}}});addEventListener('pointermove',e=>{if(dn){rail.style.scrollSnapType='none';rail.scrollLeft=dn.s-(e.clientX-dn.x)}});addEventListener('pointerup',()=>{if(dn){dn=null;rail.style.scrollSnapType=''}});
/* car controls */
const COLORS=[['Gloss black','#0b0b0f'],['Hot magenta','#d6119f'],['Silver','#b9bcc4'],['Pearl white','#efeaf1']];
const C=window.CAR={shine:10,color:0,spin:true};
const sw=$('#sw');COLORS.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','radio');b.setAttribute('aria-label',c[0]);b.title=c[0];b.style.background=c[1];b.setAttribute('aria-checked',i===0);b.onclick=()=>{C.color=i;$$('#sw button').forEach((x,j)=>x.setAttribute('aria-checked',j===i));C.draw&&C.draw()};sw.appendChild(b)});
const sh=$('#shine');sh.addEventListener('input',()=>{C.shine=+sh.value;$('#shineO').textContent=sh.value+'%';C.draw&&C.draw()});
$('#spin').onclick=function(){C.spin=!C.spin;this.setAttribute('aria-pressed',C.spin);this.textContent='Turntable: '+(C.spin?'on':'off')};
if(RM){C.spin=false;$('#spin').textContent='Turntable: off';$('#spin').setAttribute('aria-pressed','false')}
if(!RM){setTimeout(()=>{if(+sh.value<=10){let v=10;const go=()=>{if(+sh.value!==Math.round(v)&&v>10.5&&sh.dataset.u)return;v+=.7;sh.value=v;C.shine=v;$('#shineO').textContent=Math.round(v)+'%';if(v<70)requestAnimationFrame(go)};go()}},2400);sh.addEventListener('pointerdown',()=>sh.dataset.u=1)}
})();
