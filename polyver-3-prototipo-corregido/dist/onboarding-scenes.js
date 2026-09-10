// The image is rendered from the current step, never injected into a reused guide.
export const triads = [
  {id:'dioniso-dike-eleutheria',names:'Dioniso · Díke · Eleutheria',asset:'/official/kawaii/triad-dioniso-dike-eleutheria.png',layout:'tablet',label:'Deseo · valores · libertad'},
  {id:'marte-venus-mercurio',names:'Marte · Venus · Mercurio',asset:'/official/kawaii/triad-marte-venus-mercurio.png',layout:'portrait',label:'Seguridad · afecto · agilidad'},
  {id:'persefone-hercules-apolo',names:'Perséfone · Hércules · Apolo',asset:'/official/kawaii/triad-persefone-hercules-apolo.png',layout:'landscape',label:'Profundidad · constancia · creatividad'},
  {id:'hefesto-atenea-artemisa',names:'Hefesto · Atenea · Artemisa',asset:'/official/kawaii/triad-hefesto-atenea-artemisa.png',layout:'landscape',label:'Cooperación · estrategia · selectividad'}
];
export const onboardingTriads = {phone:3,verify:1,location:1,privacy:2,identity:3,photos:1};

function figure(jsx,scene,copy){
  return jsx.jsxs('figure',{className:'onboarding-triad', 'data-triad':scene.id,children:[
    jsx.jsx('div',{className:`onboarding-triad-image ${scene.layout}`,children:jsx.jsx('img',{src:scene.asset,alt:scene.layout==='tablet'?`${scene.names} mirando un iPad con un racimo de uvas`:`Tríada kawaii: ${scene.names}`,draggable:false})}),
    jsx.jsxs('figcaption',{children:[jsx.jsx('strong',{children:scene.names}),jsx.jsx('p',{children:copy||scene.label})]})
  ]});
}
export function createOnboardingScene(jsx){
  return function OnboardingScene({step,children}){return figure(jsx,triads[onboardingTriads[step]],children);};
}
export function createTriadShowcase(React,jsx){
  return function TriadShowcase(){
    const [index,setIndex]=React.useState(0);
    return jsx.jsxs('section',{className:'onboarding-families', 'aria-label':'Las cuatro tríadas kawaii',children:[
      figure(jsx,triads[index]),
      jsx.jsx('div',{className:'onboarding-triad-selector', 'aria-label':'Elegir una tríada',children:triads.map((scene,i)=>jsx.jsx('button',{type:'button',onClick:()=>setIndex(i),'aria-pressed':i===index,'aria-label':`Ver ${scene.names}`,children:String(i+1)},scene.id))})
    ]});
  };
}
