'use strict';
const K=['m','s','f','c'];
// Порядок вариантов в каждом вопросе: горы, море, лес, город (при показе перемешиваются)
const Q=[
["Как вы проводите идеальные выходные?","Иду по горной тропе","Слушаю шум волн","Читаю в тишине леса","Гуляю по шумным улицам"],
["Какой вид из окна вдохновляет больше?","Заснеженные вершины","Горизонт над водой","Густой хвойный лес","Огни небоскрёбов"],
["Что вы кладёте в рюкзак первым?","Треккинговые ботинки","Солнцезащитные очки","Термос и плед","Наушники и пауэрбанк"],
["Какой звук лучше всего будит по утрам?","Ветер на высоте","Прибой","Пение птиц","Гул просыпающегося города"],
["Как вы восстанавливаете силы?","Преодолеваю трудный маршрут","Лежу у воды","Остаюсь один среди деревьев","Окунаюсь в движение толпы"],
["Какой ужин вам ближе?","Костёр после перехода","Свежая рыба на закате","Чай на веранде в лесу","Новый ресторан в центре"],
["Что главное в отпуске?","Вызов себе","Полное расслабление","Уединение","Новые впечатления"],
["Какое время суток вы любите?","Рассвет на перевале","Полдень на пляже","Туман в сумерках","Ночные огни"],
["Как вы относитесь к планам?","Люблю сложные маршруты","Без плана, по течению","Простой план и тишина","График по часам"],
["Выберите способ передвижения","Пешком в гору","Лодка или яхта","Велосипед по лесной тропе","Метро и такси"],
["Идеальная компания в поездке?","Команда единомышленников","Близкий человек","Только я сам","Новые люди каждый день"],
["Что вы хотите увидеть?","Панораму с вершины","Бесконечный горизонт","Старый лес","Архитектуру и огни"],
["Какое хобби вам ближе?","Скалолазание","Плавание","Фотография природы","Кофейни и выставки"],
["Как вы справляетесь со стрессом?","Физическая нагрузка","Вода и купание","Тихая прогулка","Музыка и прогулка по городу"],
["Что привезёте домой?","Покорённую вершину","Загар и покой","Ясную голову","Знакомства и идеи"],
["Какая погода по душе?","Свежий холодный воздух","Тёплый бриз","Лёгкий дождь","Любая, лишь бы шли события"],
["Какой отель выберете?","Приют в горах","Бунгало на берегу","Домик в лесу","Номер в центре города"],
["Что сделаете в свободный час?","Поднимусь на ближайший холм","Искупаюсь","Посижу под деревьями","Зайду в музей или бар"],
["Чем вы гордитесь больше?","Выносливостью","Умением отдыхать","Внутренним спокойствием","Широким кругозором"],
["Ваш девиз в путешествии?","«Выше!»","«Не спеши»","«Тишина»","«Ещё!»"]
];
const R={
m:{n:"Горы",t:"Горный философ",d:"Треккинг по Алтайским горам",l:"6–8 дней",a:"Треккинг, ночёвки в палатках, рассветы на перевалах",w:"Вы цените вызов и ясность, которую даёт высота. Долгий маршрут и рассвет на перевале дают вам то, чего не даст отпуск у бассейна."},
s:{n:"Море",t:"Пляжный гедонист",d:"Релакс на побережье Каспия",l:"5–7 дней",a:"Пляж, морские прогулки, закаты на воде",w:"Вы умеете отдыхать и не считаете это слабостью. Шум воды и неспешный ритм помогают вам перезагрузиться полностью."},
f:{n:"Лес",t:"Лесной отшельник",d:"Уединение в хвойных лесах Бурабая",l:"4–5 дней",a:"Тихие тропы, озёра, чай на веранде, фотография природы",w:"Вам нужна тишина, чтобы услышать собственные мысли. Хвойный лес и озёра дают спокойствие без лишнего шума."},
c:{n:"Мегаполис",t:"Энергичный урбанист",d:"Уикенд в неоновом Токио",l:"4–5 дней",a:"Архитектура, кухни мира, музеи, ночные огни",w:"Вы заряжаетесь от движения, людей и идей. Большой город с его ритмом и сюрпризами за каждым поворотом — ваша стихия."}
};
const P={
m:'<circle cx="152" cy="34" r="13" fill="url(#gsun)"/><path d="M0 140V94L50 38L84 82L120 26L200 120V140Z" fill="url(#gm)" opacity=".5"/><path d="M0 140V110L62 54L100 98L142 64L200 128V140Z" fill="url(#gm)"/><path d="M50 38L40 52L50 48L58 56ZM120 26L110 42L120 38L130 46Z" fill="#fff"/>',
s:'<circle cx="100" cy="62" r="26" fill="url(#gsun)"/><path d="M0 84H200V140H0Z" fill="url(#gs)" opacity=".55"/><path d="M0 98Q25 90 50 98T100 98T150 98T200 98V140H0Z" fill="url(#gs)"/><path d="M34 110H72M104 118H150M58 128H112" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>',
f:'<circle cx="164" cy="26" r="9" fill="#d1fae5" opacity=".8"/><path d="M8 124L30 70L52 124ZM60 124L84 56L108 124Z" fill="url(#gf)" opacity=".45"/><path d="M28 128L54 64L80 128ZM76 128L106 40L136 128ZM130 128L156 62L182 128Z" fill="url(#gf)"/><path d="M0 124H200V140H0Z" fill="#022c22"/>',
c:'<rect x="12" y="72" width="30" height="68" fill="url(#gc)" opacity=".45"/><rect x="48" y="28" width="36" height="112" fill="url(#gc)"/><rect x="90" y="58" width="26" height="82" fill="url(#gc)" opacity=".7"/><rect x="122" y="42" width="34" height="98" fill="url(#gc)"/><rect x="162" y="78" width="28" height="62" fill="url(#gc)" opacity=".45"/><path d="M56 44H76M56 58H76M56 72H76M56 86H76M130 56H148M130 70H148M130 84H148M98 72H108M98 86H108" stroke="#fbcfe8" stroke-width="3" stroke-dasharray="4 5" opacity=".85"/>'
};
const svg=k=>`<svg class="scn" viewBox="0 0 200 140" aria-hidden="true">${P[k]}</svg>`;
const $=s=>document.querySelector(s),quiz=$('#quiz'),N=Q.length;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
let i=0,sc;

$('#pgrid').innerHTML=K.map(k=>`<article class="pcard reveal">${svg(k)}<small>${R[k].n} · ${R[k].l}</small><h3>${R[k].d}</h3><p>${R[k].a}</p></article>`).join('');

const intro=()=>{
  quiz.innerHTML=`<div class="step"><p class="eyebrow">Психологический опросник</p><h2>${N} вопросов. Один маршрут.</h2><p class="lead">Отвечайте быстро и честно — правильных ответов здесь нет. В конце вы получите свой тип путешественника и направление.</p><button class="btn" id="go">Начать тест</button></div>`;
  $('#go').onclick=go;
};
const go=()=>{i=0;sc={m:0,s:0,f:0,c:0};ask();quiz.scrollIntoView({behavior:'smooth',block:'start'})};
const ask=()=>{
  const q=Q[i],opts=shuffle(K.map((k,n)=>[k,q[n+1]]));
  quiz.innerHTML=`<div class="step"><div class="meta"><span>Вопрос ${i+1} из ${N}</span><span>${Math.round(i/N*100)}%</span></div><div class="pbar"><i style="transform:scaleX(${i/N})"></i></div><h2>${q[0]}</h2><div class="opts">${opts.map((o,j)=>`<button data-k="${o[0]}"><em>${'АБВГ'[j]}</em>${o[1]}</button>`).join('')}</div></div>`;
  quiz.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{
    sc[b.dataset.k]++;
    quiz.querySelectorAll('.opts button').forEach(x=>x.disabled=true);
    b.classList.add('sel');
    quiz.querySelector('.pbar i').style.transform=`scaleX(${(i+1)/N})`;
    setTimeout(()=>{++i<N?ask():done()},340);
  });
};
const done=()=>{
  const k=K.reduce((a,b)=>sc[b]>sc[a]?b:a),r=R[k];
  quiz.innerHTML=`<div class="step"><p class="eyebrow">Ваш тип путешественника</p><h2>${r.t}</h2>
  <div class="res-grid"><div class="scene">${svg(k)}</div><div><h3>${r.d}</h3><p>${r.w}</p><dl><div><dt>Длительность</dt><dd>${r.l}</dd></div><div><dt>Ключевые активности</dt><dd>${r.a}</dd></div></dl></div></div>
  <div class="dist">${K.map(x=>`<div><span>${R[x].n}</span><b><i style="--w:${sc[x]/N}"></i></b><u>${Math.round(sc[x]/N*100)}%</u></div>`).join('')}</div>
  <div class="row"><a class="btn" href="#contacts">Забронировать такое путешествие</a><button class="btn ghost" id="again">Пройти тест заново</button></div></div>`;
  $('#again').onclick=go;
  quiz.scrollIntoView({behavior:'smooth',block:'start'});
};
$('#cta').onclick=e=>{e.preventDefault();go()};
intro();

const bg=$('.burger'),nav=$('#nav');
bg.onclick=()=>bg.setAttribute('aria-expanded',nav.classList.toggle('open'));
nav.onclick=()=>{nav.classList.remove('open');bg.setAttribute('aria-expanded','false')};

const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

$('#mq').innerHTML=Array(4).fill(K.map(k=>`<span>${R[k].n}</span>`).join('')).join('');
document.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest('.tile,.pcard,.fact,.card');if(t){const r=t.getBoundingClientRect();t.style.setProperty('--x',e.clientX-r.left+'px');t.style.setProperty('--y',e.clientY-r.top+'px')}});
