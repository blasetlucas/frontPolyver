// Keep all actions as live controls in the clear center of the illustration.
export function renderWelcome(jsx,Brand,Primary,Secondary,onNext){
  return jsx.jsxs('div',{className:'intro welcome welcome-border-screen',children:[
    jsx.jsx('img',{
      className:'welcome-border-art',
      src:'/official/kawaii/welcome-12-kawaii-border.webp',
      alt:'Los 12 Cupidos kawaii se asoman desde los cuatro bordes: Dioniso, Díke, Eleutheria, Marte, Venus, Mercurio, Perséfone, Hércules, Apolo, Hefesto, Atenea y Artemisa',
      draggable:false
    }),
    jsx.jsxs('div',{className:'welcome-center',children:[
      jsx.jsx(Brand,{}),
      jsx.jsxs('div',{className:'welcome-line',children:[
        jsx.jsx('span',{children:'COMPATIBILIDAD'}),jsx.jsx('i',{}),jsx.jsx('span',{children:'VIDA REAL'})
      ]}),
      jsx.jsxs('div',{className:'welcome-bottom',children:[
        jsx.jsxs('h1',{children:['Vuelve a creer',jsx.jsx('br',{}),'en el amor real,',jsx.jsx('br',{}),jsx.jsx('em',{children:'en vivo.'})]}),
        jsx.jsx('p',{children:'Menos chat. Más contexto, seguridad y encuentros que sí ocurren.'}),
        jsx.jsx(Primary,{onClick:onNext,children:'Crear una cuenta'}),
        jsx.jsx(Secondary,{onClick:onNext,children:'Ya tengo una cuenta'}),
        jsx.jsx('small',{children:'Al registrarte, aceptas las Condiciones y la Política de Privacidad.'})
      ]})
    ]})
  ]});
}
