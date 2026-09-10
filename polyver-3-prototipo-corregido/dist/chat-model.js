export const people = [
  {id:'luciano',name:'Luciano',age:33,detail:'Santiago',crop:'-27%'},
  {id:'francisca',name:'Francisca',age:27,detail:'Santiago',crop:'-54%'},
  {id:'sofia',name:'Sofía',age:35,detail:'Providencia',crop:'-32%'}
];
export const deities = [
  {id:'dioniso',name:'Dioniso',trait:'Alegría y conexión',focus:'soltarte, conectar y disfrutar del encuentro',crop:'-143%'},
  {id:'atenea',name:'Atenea',trait:'Claridad y autoconocimiento',focus:'entender lo que buscas y elegir con claridad',crop:'-150%'},
  {id:'venus',name:'Venus',trait:'Atracción y afectividad',focus:'explorar lo que sientes y cómo quieres vincularte',crop:'-144%'},
  {id:'hercules',name:'Hércules',trait:'Constancia y acción',focus:'dar un paso concreto para encontrarte con alguien',crop:'-145%'},
  {id:'persefone',name:'Perséfone',trait:'Intimidad y confianza',focus:'crear confianza a tu ritmo',crop:'-147%'},
  {id:'apolo',name:'Apolo',trait:'Cultura y creatividad',focus:'conectar a través de las ideas y lo que te inspira',crop:'-145%'},
  {id:'dike',name:'Díke',trait:'Valores y acuerdos',focus:'conocer tus valores y construir acuerdos',crop:'-144%'},
  {id:'eleutheria',name:'Eleutheria',trait:'Libertad y autonomía',focus:'vincularte conservando tu libertad',crop:'-144%'},
  {id:'mercurio',name:'Mercurio',trait:'Conversación y cercanía',focus:'encontrar palabras que abran una conversación',crop:'-147%'},
  {id:'marte',name:'Marte',trait:'Seguridad y límites',focus:'reconocer y comunicar tus límites',crop:'-145%'},
  {id:'artemisa',name:'Artemisa',trait:'Intuición y aprendizaje',focus:'escuchar tu intuición y aprender de tus encuentros',crop:'-146%'},
  {id:'hefesto',name:'Hefesto',trait:'Estabilidad y cooperación',focus:'construir un vínculo con cuidado y reciprocidad',crop:'-145%'}
];
export function initialMessages(person,deity,seeded=true){
  if(!seeded)return[{role:'assistant',text:`Hola, ${person.name}. Soy ${deity.name}. Estoy aquí para ayudarte a ${deity.focus}.\n\n¿Qué tienes en mente hoy?`}];
  return[
    {role:'assistant',text:`Hola, ${person.name}. Soy ${deity.name}.\n\nEste es nuestro espacio para conversar. Podemos hablar de lo que buscas, de cómo te sientes o de esa persona que te da curiosidad. ¿Por dónde te gustaría empezar?`},
    {role:'user',text:person.id==='luciano'?'Quiero conocer a alguien con quien pueda ser yo mismo, sin sentir que tengo que impresionar.':person.id==='francisca'?'Me gustaría conocer a alguien con quien haya química, pero también una conversación de verdad.':'Quiero una conexión que tenga espacio para conversar, compartir ideas y también improvisar.'},
    {role:'assistant',text:person.id==='luciano'?'Poder ser tú mismo es un buen punto de partida. No hace falta llegar con una versión perfecta de ti.\n\nPiensa en un momento en que conversar con alguien te resultó fácil. ¿Qué había ahí: humor, curiosidad, calma?':person.id==='francisca'?'La química puede abrir la puerta, y la curiosidad por la otra persona puede sostener la conversación.\n\n¿Qué te hace querer seguir conociendo a alguien después de ese primer encuentro?':'Compartir ideas y dejar espacio a lo inesperado pueden ir muy bien juntos.\n\n¿Qué conversación te ha hecho perder la noción del tiempo últimamente?'}
  ];
}
export function demoReply(input,person,deity){
  const t=input.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  if(/demo|simulad|inteligencia artificial|eres real|eres una ia/.test(t))return `Soy ${deity.name}, el avatar de este prototipo. Aquí las respuestas son ejemplos preparados para mostrar cómo se sentirá el chat.\n\nPuedes probar una conversación, cambiar de deidad o explorar el resto de Polyver.`;
  if(/hola|buenas|como estas/.test(t))return `Hola, ${person.name}. Me alegra que estés aquí.\n\nPodemos empezar por algo sencillo: ¿cómo te gustaría sentirte al conocer a alguien?`;
  if(/sofia|francisca|luciano|compatib|afinidad|match/.test(t))return 'Una afinidad puede ser un punto de partida para conversar. Lo importante es descubrir qué sucede cuando se conocen.\n\nEn el recorrido de Polyver puedes ver los perfiles y las afinidades de muestra. ¿Qué te gustaría descubrir sobre esa persona?';
  if(/cita|plan|cafe|salir|encuentro/.test(t))return `${person.name}, probemos con un plan sencillo: un café en un lugar público y tranquilo, con tiempo para conversar sin apuro.\n\nPodrías proponer: «Me gustó conversar contigo. ¿Te gustaría seguir con un café esta semana?».\n\n¿Ese plan se parece a ti o preferirías algo más espontáneo?`;
  if(/nerv|timid|verguenza|miedo|impresionar|insegur/.test(t))return 'Es comprensible que aparezcan nervios. Puedes darte permiso para ir despacio y no tener todas las respuestas.\n\nUna pregunta sencilla —«¿qué has disfrutado esta semana?»— puede ayudarte a empezar desde la curiosidad. ¿Qué parte del encuentro te pone más nervioso o nerviosa?';
  if(/humor|risa|reir|diver|espont/.test(t))return 'El humor compartido puede hacer que bajes la guardia y la conversación se sienta más natural.\n\nPiensa en algo pequeño que te haya hecho reír esta semana. Esa historia puede decir más de ti que una presentación perfecta. ¿Te viene alguna a la cabeza?';
  if(/valor|respeto|limite|honest|confian/.test(t))return 'Vale la pena ponerle palabras a eso que necesitas de un vínculo. No para exigir perfección, sino para reconocer cuándo te sientes a gusto.\n\n¿Qué gesto concreto te hace sentir respeto y confianza?';
  if(/busco|buscas|quiero|conocerme|mi mismo|mi misma/.test(t))return 'Podemos empezar con dos cosas: cómo quieres sentirte con alguien y qué disfrutas compartir.\n\nSi eligieras una sola cualidad para tu próxima conexión —curiosidad, calma, humor o profundidad—, ¿cuál sería?';
  if(/calma|escuch|tranquil/.test(t))return 'Sentirte escuchado o escuchada puede cambiar por completo un encuentro. A veces se nota en algo tan simple como poder terminar una idea sin apuro.\n\n¿Qué haces tú cuando quieres que la otra persona se sienta cómoda?';
  if(/idea|cultura|libro|musica|curios/.test(t))return 'Compartir algo que te interesa es una forma muy tuya de abrir la conversación. No necesitan pensar igual: la curiosidad por la mirada del otro también conecta.\n\n¿Qué libro, canción o idea te gustaría compartir en una primera cita?';
  if(/gracias/.test(t))return `Gracias a ti por compartirlo, ${person.name}.\n\nPodemos seguir por donde prefieras. ¿Quieres explorar lo que buscas o pensar en un primer encuentro?`;
  return `Podemos mirar lo que cuentas desde ${deity.trait.toLowerCase()}.\n\n¿Qué es lo más importante para ti en esa situación: cómo te sientes, lo que necesitas o el siguiente paso que te gustaría dar?`;
}
