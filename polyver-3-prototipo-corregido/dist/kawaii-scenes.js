// The image is rendered from the current step, never injected into a reused guide.
export const triads = [
  {id:'dioniso-dike-eleutheria',names:'Dioniso · Díke · Eleutheria',asset:'/official/kawaii/triad-dioniso-dike-eleutheria.png',layout:'tablet',label:'Deseo · valores · libertad'},
  {id:'marte-venus-mercurio',names:'Marte · Venus · Mercurio',asset:'/official/kawaii/triad-marte-venus-mercurio.png',layout:'portrait',label:'Seguridad · afecto · agilidad'},
  {id:'persefone-hercules-apolo',names:'Perséfone · Hércules · Apolo',asset:'/official/kawaii/triad-persefone-hercules-apolo.png',layout:'landscape',label:'Profundidad · constancia · creatividad'},
  {id:'hefesto-atenea-artemisa',names:'Hefesto · Atenea · Artemisa',asset:'/official/kawaii/triad-hefesto-atenea-artemisa.png',layout:'landscape',label:'Cooperación · estrategia · selectividad'}
];
// Each supporting trio has one step. Only Dioniso, Díke and Eleutheria recur.
export const onboardingTriads = {phone:0,verify:1,location:0,privacy:2,identity:3,photos:0};
const contextualScenes = {
  location:{asset:'/official/kawaii/triad-dioniso-dike-eleutheria-location.webp',layout:'landscape',description:'Dioniso, Díke y Eleutheria eligiendo un lugar en un mapa'},
  photos:{asset:'/official/kawaii/triad-dioniso-dike-eleutheria-photos.webp',layout:'landscape',description:'Dioniso, Díke y Eleutheria posando juntos para una foto'}
};
export function sceneForStep(step){return {...triads[onboardingTriads[step]],...contextualScenes[step]};}

function figure(jsx,scene,copy){
  return jsx.jsxs('figure',{className:'onboarding-triad', 'data-triad':scene.id,children:[
    jsx.jsx('div',{className:`onboarding-triad-image onboarding-triad-image--${scene.layout}`,children:jsx.jsx('img',{src:scene.asset,alt:scene.description||(scene.layout==='tablet'?`${scene.names} mirando un iPad con un racimo de uvas`:`Tríada kawaii: ${scene.names}`),draggable:false})}),
    jsx.jsxs('figcaption',{children:[jsx.jsx('strong',{children:scene.names}),jsx.jsx('p',{children:copy||scene.label})]})
  ]});
}
export function createOnboardingScene(jsx){
  return function OnboardingScene({step,children}){return figure(jsx,sceneForStep(step),children);};
}
export function createTriadShowcase(_React,jsx){
  return function TriadShowcase(){
    return jsx.jsx('section',{className:'onboarding-families', 'aria-label':'Dioniso, Díke y Eleutheria te acompañan',children:figure(jsx,triads[0])});
  };
}
