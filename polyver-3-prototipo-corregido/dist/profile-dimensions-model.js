export const spectrum = [
  {id:'identity', title:'Mi identidad de género', labels:['Masculino','No binarie','Femenino']},
  {id:'expression', title:'Mi expresión de género', labels:['Hipermasculino','Andrógine','Hiperfemenino']},
  {id:'orientation', title:'Mi orientación sexual', labels:['Heterosexual','Bisexual','Homosexual']},
  {id:'desire', title:'Mi nivel de deseo sexual', labels:['Asexual','Sexual','Hipersexual']},
  {id:'romance', title:'Mi forma de amar', labels:['Aromántica','Romántica','Extrarromántica']},
  {id:'relationship', title:'Mi estilo de relación', labels:['Monógama','Relación abierta','Poliamorosa']},
];
export const principles = [
  ['Constructivismo','Esencialismo'],
  ['Justicia de rehabilitación','Justicia punitiva'],
  ['Progresismo','Conservadurismo'],
  ['Internacionalismo','Nacionalismo'],
  ['Comunismo','Capitalismo'],
  ['Regulacionismo','Laissez-faire'],
  ['Ecología','Productivismo'],
  ['Revolución','Reformismo'],
];
export const clamp = value => Math.max(0, Math.min(100, Number(value) || 0));
export function spectrumAnswer(labels, value) {
  const n=clamp(value);
  if(n<10) return labels[0];
  if(n>90) return labels[2];
  if(n>=45&&n<=55) return labels[1];
  return n<50 ? `Entre ${labels[0].toLowerCase()} y ${labels[1].toLowerCase()}` : `Entre ${labels[1].toLowerCase()} y ${labels[2].toLowerCase()}`;
}
// An illustrative projection for this demo, not a validated political assessment.
// Inputs are the viewer's explicit choices, never inferred from a profile/photo.
export function principleCoordinates(values) {
  const horizontal=[.12,0,.12,-.08,.32,.26,-.06,.04];
  const authority=[.10,.30,.18,.16,0,-.16,-.06,-.04];
  const project=weights=>weights.reduce((sum,w,i)=>sum+w*(clamp(values[i]??50)-50),0);
  return {x:clamp(50+project(horizontal)),y:clamp(50-project(authority))};
}
export function valuesAnswer({x,y}) {
  const horizontal=x<44?'la izquierda':x>56?'la derecha':'el centro económico';
  const vertical=y<44?'mayor autoridad':y>56?'mayor libertad individual':'un equilibrio entre autoridad y libertad';
  return `Tus ajustes te sitúan hacia ${horizontal}, con ${vertical}.`;
}
export const validPin = digits => digits.length===3 && digits.every(digit=>digit==='6');
