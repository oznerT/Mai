const $ = id => document.getElementById(id);
let rotation=0, spinning=false, current=null, selected=null, revealed=false;
const used=new Set();
const polar=(r,a)=>[250+r*Math.cos(a*Math.PI/180),250+r*Math.sin(a*Math.PI/180)];
const slices=categories.map((cat,i)=>{
 const start=-90+i*72,end=start+72,mid=start+36;
 const a=polar(250,start),b=polar(250,end),p=polar(159,mid);
 return `<path d="M250 250 L${a} A250 250 0 0 1 ${b} Z" fill="${cat.color}" stroke="#172015" stroke-width="2"/><g transform="translate(${p}) rotate(${mid+90})" fill="#20231b" text-anchor="middle"><text y="-16" font-family="Arial" font-size="31">${cat.icon}</text><text y="13" font-family="Arial" font-size="16" font-weight="900">${cat.label}</text><text y="32" font-family="Arial" font-size="10" letter-spacing="2">+ MODA</text></g>`;
}).join('');
$('wheel').innerHTML=`<svg viewBox="0 0 500 500" aria-hidden="true">${slices}</svg>`;
$('categories').innerHTML=categories.map(c=>`<span class="category-chip" style="--color:${c.color}"><i></i>${c.name}<small>+ moda</small></span>`).join('');
function spin(){
 if(spinning)return;
 if(used.size===questions.length)used.clear();
 const available=categories.filter(c=>questions.some(q=>q.category===c.id&&!used.has(q)));
 const category=available[Math.floor(Math.random()*available.length)];
 const index=categories.indexOf(category);
 spinning=true;$('spin').disabled=true;$('spin-center').disabled=true;
 $('spin-status').textContent='Girando…';
 const target=(360-(index*72+36))%360;
 rotation+=360*5+((target-rotation%360+360)%360);
 $('wheel').style.transform=`rotate(${rotation}deg)`;
 const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?160:4450;
 window.setTimeout(()=>{
 const pool=questions.filter(q=>q.category===category.id&&!used.has(q));
 showQuestion(pool[Math.floor(Math.random()*pool.length)]);
 spinning=false;$('spin').disabled=false;$('spin-center').disabled=false;
 $('spin-status').textContent='También podés tocar el centro de la ruleta.';
 },duration);
}
function showQuestion(question){
 current=question;selected=null;revealed=false;used.add(question);
 const cat=categories.find(c=>c.id===question.category);
 $('home').hidden=true;$('question-view').hidden=false;$('answer').hidden=true;$('reveal').hidden=false;
 $('question-category').textContent=cat.name+' + moda';$('question-category').style.setProperty('--color',cat.color);
 $('question-title').textContent=question.question;
 $('question-image').src='assets/question.svg';$('question-image').alt='Signo de pregunta, sin pistas sobre la respuesta';
 $('question-image').closest('figure').classList.remove('is-revealed');
 $('image-caption').textContent='La foto aparece al revelar la respuesta.';
 // Precargar sin insertar la foto en pantalla ni exponer su descripción.
 const photo=new Image();photo.src=question.revealImage;
 $('options').replaceChildren(...question.options.map((option,i)=>{
 const button=document.createElement('button');button.className='option';button.setAttribute('aria-pressed','false');
 const letter=document.createElement('span');letter.className='letter';letter.textContent='ABCD'[i];
 const text=document.createElement('span');text.textContent=option;
 button.append(letter,text);button.onclick=()=>select(i);return button;
 }));
 $('explanation').textContent=question.explanation;$('debate').textContent=question.debate;$('source').href=question.source;
 window.scrollTo(0,0);$('question-title').focus({preventScroll:true});
}
function select(i){if(revealed)return;selected=i;[...$('options').children].forEach((b,n)=>{b.classList.toggle('selected',n===i);b.setAttribute('aria-pressed',String(n===i));});}
function reveal(){
 if(!current||revealed)return;revealed=true;
 [...$('options').children].forEach((button,i)=>{button.disabled=true;button.classList.remove('selected');button.classList.toggle('correct',i===current.correct);button.classList.toggle('wrong',selected===i&&i!==current.correct);if(i===current.correct)button.firstChild.textContent='✓';});
 $('reveal').hidden=true;$('answer').hidden=false;
 $('question-image').src=current.revealImage;$('question-image').alt=current.caption;
 $('question-image').closest('figure').classList.add('is-revealed');
 $('image-caption').textContent=current.caption;
}
function home(){if(spinning)return;$('question-view').hidden=true;$('home').hidden=false;current=null;window.scrollTo(0,0);$('spin').focus({preventScroll:true});}
$('spin').onclick=spin;$('spin-center').onclick=spin;$('reveal').onclick=reveal;$('back').onclick=home;$('next').onclick=home;
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('fullscreen').textContent='Usá F11 para pantalla completa';}};
document.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||event.repeat)return;if(current&&'1234'.includes(event.key)){event.preventDefault();select(Number(event.key)-1);}});
$('question-image').onerror=()=>{if($('question-image').getAttribute('src')==='assets/question.svg')return;$('question-image').src='assets/question.svg';$('image-caption').textContent='No se pudo cargar la foto. Podés consultar la fuente de la respuesta.';};
