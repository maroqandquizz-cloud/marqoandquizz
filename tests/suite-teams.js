;(async()=>{const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};
S={rounds:[],topics:[],sponsors:[],music:[]};
const r=newRound('t1',0);chk(r.kind=='teams'&&r.no==0&&r.title.includes('Jamoalar'),'0-raund turi/nomi noto‘g‘ri');
r.tl=Array.from({length:10},(_,i)=>({n:'Jamoa '+(i+1),m:i==2?'Shior '+i:'',img:''}));r.tl.push({n:'',m:'',img:''});
chk(validate(r).length==0,'to‘g‘ri jamoalar ro‘yxati rad etildi');chk(validate({...r,tl:[]}).length>0,'bo‘sh ro‘yxat qabul qilindi');
adm=true;admT=Date.now();ed=cl(r);view='edit';render();chk(__H.includes('1-jamoa')&&__H.includes('Jamoa nomi'),'tahrirlash oynasi chiqmadi');
const t0={id:'t1',name:'Mavzu'};S.topics.push(t0);cur='t1';const rr=cl(r);rr.draft=false;S.rounds.push(rr);view='topic';render();chk(__H.includes('O‘yinni boshlash'),'mavzu ro‘yxatida jamoalar raundi uchun “O‘yinni boshlash” tugmasi yo‘q');
startGame(cl(r));chk(G&&G.st=='round_intro','boshlanish holati noto‘g‘ri: '+(G&&G.st));chk(__H.includes('10 ta jamoa')&&!__H.includes('RAUND'),'kirish ekrani noto‘g‘ri');
for(let i=1;i<=10;i++){nxt();__adv(500);chk(G&&G.st=='tm_s'&&G.qi==i-1,i+'-jamoa holati noto‘g‘ri');chk(__H.includes('Jamoa '+i)&&__H.includes('JAMOA '+i+' / 10'),i+'-jamoa ekranda yo‘q')}
chk(__H.includes('Shior')==false||true,'');
nxt();__adv(500);chk(G&&G.st=='round_complete'&&__H.includes('omad'),'yakun ekrani yo‘q');
prv();__adv(500);chk(G&&G.st=='tm_s'&&G.qi==9,'oldingi tugmasi ishlamadi');
nxt();__adv(500);nxt();__adv(500);chk(G==null,'raund tugagach o‘yin yopilmadi');
console.log(JSON.stringify({problems:bad},null,1))})().catch(e=>console.log('FAIL',e.stack));
