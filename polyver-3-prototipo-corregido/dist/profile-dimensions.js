import {people} from './chat-model.js';
import {personForProfile} from './integration-contract.js';
import {spectrum,principles,clamp,spectrumAnswer,principleCoordinates,valuesAnswer,validPin} from './profile-dimensions-model.js';

export function createProfileDimensions(React, jsx) {
  const h=React.createElement;
  function useAnswers(personId, section, count) {
    const state=window.__polyverDimensionState??=(Object.create(null));
    const key=`${personId}:${section}`;
    const [values,setValues]=React.useState(()=>state[key]??Array(count).fill(50));
    const update=(index,value)=>setValues(previous=>{
      const next=previous.map((v,i)=>i===index?clamp(value):v);
      state[key]=next;
      return next;
    });
    return [values,update];
  }
  function ProfilePhoto({personId,own=false}) {
    const person=people.find(p=>p.id===personId)??people[0];
    const uploaded=own&&personId==='luciano'?window.__polyverProfilePhotos?.[0]:null;
    return h('span',{className:`dimension-photo${uploaded?' uploaded':''}`},
      h('img',{src:uploaded||`/official/people/${personId}.jpg`,alt:own?'Tu foto de perfil':person.name,style:{'--portrait-top':person.crop},draggable:false}));
  }
  function ArtHeader({kind,onClick}) {
    const label=kind==='dike'?'Díke · Valores y principios':'Perséfone · Mi espectro';
    const content=h('img',{src:`/official/modules/${kind==='dike'?'dike-values':'persefone-spectrum'}.png`,alt:kind==='dike'?'Díke con su balanza. Valores y principios.':'Perséfone con un candado y rosas púrpura. Mi espectro: amor en todas sus formas.',draggable:false});
    return h(React.Fragment,null,h('h1',{className:'dimensions-sr-only'},label),
      onClick?h('button',{className:`dimension-art ${kind}-art`,onClick,'aria-label':'Abrir la clave de Perséfone'},content):h('div',{className:`dimension-art ${kind}-art`},content));
  }
  function PinDialog({onUnlock,onClose}) {
    const dialog=React.useRef(null);
    const inputs=React.useRef([]);
    const [digits,setDigits]=React.useState(['','','']);
    const [error,setError]=React.useState('');
    React.useEffect(()=>{
      const node=dialog.current;
      node.showModal();
      inputs.current[0]?.focus();
      return ()=>{if(node.open)node.close();};
    },[]);
    function apply(next,index) {
      setDigits(next); setError('');
      if(next.every(Boolean)) {
        if(validPin(next)){onUnlock();return;}
        setError('Clave incorrecta. Inténtalo otra vez.');
        setDigits(['','','']);
        inputs.current[0]?.focus();
      } else inputs.current[Math.min(index+1,2)]?.focus();
    }
    function change(index,raw) {
      const digit=raw.replace(/\D/g,'').slice(-1);
      if(!digit){setDigits(previous=>previous.map((v,i)=>i===index?'':v));return;}
      const next=[...digits]; next[index]=digit; apply(next,index);
    }
    function paste(event,index) {
      const value=event.clipboardData.getData('text').replace(/\D/g,'').slice(0,3-index);
      if(!value)return;
      event.preventDefault();
      const next=[...digits]; [...value].forEach((digit,i)=>next[index+i]=digit);
      apply(next,Math.min(index+value.length-1,2));
    }
    return h('dialog',{ref:dialog,className:'persefone-pin','aria-labelledby':'persefone-pin-title','aria-describedby':'persefone-pin-help',onCancel:event=>{event.preventDefault();onClose();}},
      h('button',{className:'pin-close',onClick:onClose,'aria-label':'Cerrar clave'},'×'),
      h('h2',{id:'persefone-pin-title'},'Tu espacio privado'),
      h('p',{id:'persefone-pin-help'},'Introduce tu clave de tres números'),
      h('div',{className:'pin-digits'},digits.map((value,index)=>h('input',{
        key:index,ref:node=>{inputs.current[index]=node;},type:'password',inputMode:'numeric',pattern:'[0-9]*',maxLength:1,
        autoComplete:'off',value,'aria-label':`Número ${index+1} de la clave`,'aria-invalid':!!error,
        onFocus:event=>event.target.select(),onChange:event=>change(index,event.target.value),onPaste:event=>paste(event,index),
        onKeyDown:event=>{
          if(event.key==='Backspace'&&!digits[index]&&index>0){event.preventDefault();inputs.current[index-1]?.focus();setDigits(v=>v.map((d,i)=>i===index-1?'':d));}
          if(event.key==='ArrowLeft'&&index>0)inputs.current[index-1]?.focus();
          if(event.key==='ArrowRight'&&index<2)inputs.current[index+1]?.focus();
        }
      }))),h('p',{className:'pin-error',role:'alert'},error));
  }
  function IntimateScreen({profile}) {
    const panel=React.useRef(null);
    const personId=personForProfile(profile);
    const [values,update]=useAnswers(personId,'spectrum',spectrum.length);
    const [unlocked,setUnlocked]=React.useState(false);
    const [showPin,setShowPin]=React.useState(true);
    const firstSlider=React.useRef(null);
    function lock(){setUnlocked(false);setShowPin(true);panel.current?.closest('.app-scroll')?.scrollTo({top:0,behavior:'instant'});}
    React.useLayoutEffect(()=>{panel.current?.closest('.app-scroll')?.scrollTo({top:0,behavior:'instant'});},[]);
    React.useEffect(()=>{
      window.addEventListener('polyver:lock-intimate',lock);
      return ()=>window.removeEventListener('polyver:lock-intimate',lock);
    },[]);
    React.useEffect(()=>{if(unlocked)firstSlider.current?.focus({preventScroll:true});},[unlocked]);
    return h('div',{ref:panel,className:'app-view dimension-screen intimate-screen'},
      h(ArtHeader,{kind:'persefone',onClick:lock}),
      unlocked?h('section',{className:'spectrum-controls','aria-label':'Mi espectro'},
        h('div',{className:'spectrum-intro'},h('p',null,'Mueve cada corazón para expresar cómo te identificas.'),h('button',{className:'dimension-lock',onClick:lock},'Bloquear')),
        spectrum.map((dimension,index)=>h('section',{className:'spectrum-row',key:dimension.id},
          h('h2',null,dimension.title),
          h('div',{className:'spectrum-endpoints','aria-hidden':true},dimension.labels.map(label=>h('span',{key:label},label))),
          h('input',{ref:index===0?firstSlider:undefined,type:'range',className:'heart-slider',min:0,max:100,step:1,value:values[index],
            'aria-label':dimension.title,'aria-valuetext':`${spectrumAnswer(dimension.labels,values[index])}, ${values[index]} de 100`,
            onChange:event=>update(index,event.target.value)}),
          h('output',{className:'spectrum-answer','aria-live':'polite'},spectrumAnswer(dimension.labels,values[index]),h('small',null,` · ${values[index]} / 100`))
        )),h('p',{className:'dimension-motto'},'CONEXIONES MÁS PROFUNDAS')):
      h('section',{className:'spectrum-locked','aria-label':'Información de Perséfone bloqueada'},
        h('div',{className:'spectrum-blur','aria-hidden':true},Array.from({length:6},(_,index)=>h('div',{className:'spectrum-placeholder',key:index},h('i'),h('b'),h('i')))),
        h('div',{className:'spectrum-lock-message'},h('span',{'aria-hidden':true},'♢'),h('h2',null,'Solo para ti'),h('p',null,'Desbloquea tu espectro con tu clave.'),h('button',{onClick:()=>setShowPin(true)},'Desbloquear'))),
      h('div',{className:'persefone-garden','aria-hidden':true}),
      showPin?h(PinDialog,{onClose:()=>setShowPin(false),onUnlock:()=>{setUnlocked(true);setShowPin(false);}}):null);
  }
  function ValuesScreen({profile}) {
    const panel=React.useRef(null);
    React.useLayoutEffect(()=>{panel.current?.closest('.app-scroll')?.scrollTo({top:0,behavior:'instant'});},[]);
    const personId=personForProfile(profile);
    const [values,update]=useAnswers(personId,'principles',principles.length);
    const [selected,setSelected]=React.useState(personId);
    const point=principleCoordinates(values);
    const demo={luciano:{x:72,y:71},francisca:{x:74,y:29},sofia:{x:28,y:68}};
    const loovers=people.filter(p=>p.id!==personId);
    return h('div',{ref:panel,className:'app-view dimension-screen values-screen'},
      h(ArtHeader,{kind:'dike'}),
      h('section',{className:'values-content'},
        h('h2',{className:'compass-title'},'BRÚJULA POLÍTICA'),
        h('div',{className:'compass-wrap'},
          h('span',{className:'compass-axis axis-top'},'Autoridad'),
          h('span',{className:'compass-axis axis-left'},'Igualdad'),
          h('span',{className:'compass-axis axis-right'},'Merito'),
          h('span',{className:'compass-axis axis-bottom'},'Libertad'),
          h('div',{className:'political-compass','aria-label':'Tu posición y la de tus Loover en la brújula política'},
            h('div',{className:'compass-quadrants','aria-hidden':true},['Colectivismo','Conservadurismo','Progresismo','Liberalismo'].map((label,i)=>h('span',{className:`quadrant quadrant-${i}`,key:label},label))),
            h('div',{className:'compass-cross','aria-hidden':true}),
            loovers.map(person=>h('button',{className:`compass-person${selected===person.id?' selected':''}`,key:person.id,
              style:{left:`${demo[person.id].x}%`,top:`${demo[person.id].y}%`},'aria-label':`${person.name}, Loover de muestra`,'aria-pressed':selected===person.id,onClick:()=>setSelected(person.id)},
              h(ProfilePhoto,{personId:person.id}),h('span',{className:'compass-name'},person.name))),
            h('button',{className:`compass-person compass-you${selected===personId?' selected':''}`,style:{left:`${Math.max(7,Math.min(93,point.x))}%`,top:`${Math.max(7,Math.min(93,point.y))}%`},
              'aria-label':`Tu posición: eje horizontal ${Math.round(point.x)}, eje vertical ${Math.round(point.y)}`,'aria-pressed':selected===personId,onClick:()=>setSelected(personId)},h(ProfilePhoto,{personId,own:true}),h('span',{className:'compass-name'},'Tú')))),
        h('div',{className:'compass-legend'},h('span',null,'● Tú'),h('span',null,'○ Tus Loover')),
        h('p',{className:'values-answer','aria-live':'polite'},selected===personId?valuesAnswer(point):`${people.find(p=>p.id===selected)?.name}: posición de ejemplo de tu Loover.`),
        h('p',{className:'compass-note'},'Tu posición cambia con tus barras. La brújula es orientativa; las posiciones de tus Loover son de muestra.'),
        h('h2',{className:'principles-heading'},'Principios'),
        h('p',{className:'principles-help'},'Desliza las barras y observa cómo se mueve tu perfil.'),
        h('div',{className:'principles-controls'},principles.map(([left,right],index)=>h('section',{className:'principle-row',key:left},
          h('div',{className:'principle-labels'},h('label',{htmlFor:`principle-${index}`},left),h('span',null,right)),
          h('div',{className:'principle-input'},h('output',null,`${100-values[index]}%`),h('input',{type:'range',id:`principle-${index}`,min:0,max:100,step:1,value:values[index],
            style:{'--value':`${values[index]}%`},'aria-label':`${left} — ${right}`,'aria-valuetext':`${left}: ${100-values[index]}%; ${right}: ${values[index]}%`,
            onChange:event=>{update(index,event.target.value);setSelected(personId);}}),h('output',null,`${values[index]}%`))))),
        h('p',{className:'dimension-motto'},'PRINCIPIOS HOY, UNA SOCIEDAD MEJOR MAÑANA.')));
  }
  return {ValuesScreen,IntimateScreen};
}
