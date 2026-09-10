export function createDionisoOptions(React,jsx){
  return function DionisoOptions(){
    React.useEffect(()=>{window.PolyverTheme?.refresh();},[]);
    return jsx.jsxs('details',{className:'dioniso-options',children:[
      jsx.jsx('summary',{children:'Opciones de Dioniso'}),
      jsx.jsxs('div',{className:'dioniso-appearance',children:[
        jsx.jsxs('div',{children:[jsx.jsx('strong',{children:'Apariencia'}),jsx.jsx('p',{children:'Elige modo noche o modo día.'})]}),
        jsx.jsxs('button',{type:'button',className:'dioniso-theme-toggle','data-theme-toggle':'','aria-label':'Activar modo día',children:[jsx.jsx('span',{'data-theme-icon':'','aria-hidden':true}),jsx.jsx('span',{'data-theme-label':'',children:'Modo día'})]})
      ]})
    ]});
  };
}
