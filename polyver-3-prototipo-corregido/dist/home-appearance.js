export function createHomeAppearance(React,jsx){
  return function HomeAppearance(){
    const next=document.documentElement.dataset.theme==='day'?'night':'day';
    const label=next==='day'?'Activar modo día':'Activar modo noche';
    React.useLayoutEffect(()=>{window.PolyverTheme?.refresh();},[]);
    return jsx.jsx('button',{
      type:'button',className:'home-theme-toggle','data-theme-toggle':'',
      'aria-label':label,title:label,
      children:jsx.jsx('span',{'data-theme-emoji':'','aria-hidden':true,children:next==='day'?'☀️':'🌙'})
    });
  };
}
