import {people,deities,initialMessages,demoReply} from './chat-model.js';
import {validSelection, trustedMessage} from './integration-contract.js';
const embedded = new URLSearchParams(location.search).get('embedded') === '1' && parent !== window;
let contextReady = !embedded, applyingContext = false;
if (embedded) document.documentElement.classList.add('embedded-chat');
const $=id=>document.getElementById(id);
const icons={edit:'<path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7"/><path d="m16 3 5 5M10 14l-1 4 4-1L22 8l-5-5Z"/>',chat:'<path d="M21 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 19 0Z"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z"/>',chevron:'<path d="m9 5 7 7-7 7"/>','chevron-down':'<path d="m6 9 6 6 6-6"/>',chevrons:'<path d="m8 8 4-4 4 4m-8 8 4 4 4-4"/>','arrow-up':'<path d="M12 19V5m-6 6 6-6 6 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',spark:'<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3Z"/>',copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H4v13h4"/>',check:'<path d="m5 12 4 4L19 6"/>'};
function icon(name){const s=document.createElement('span');s.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]??''}</svg>`;return s;}
document.querySelectorAll('[data-icon]').forEach(el=>el.append(icon(el.dataset.icon)));
function avatar(data,kind,size=''){const el=document.createElement('span');el.className=`avatar ${kind} ${size}`;const img=document.createElement('img');img.src=`/official/${kind==='person'?'people':'modern'}/${data.id}.jpg`;img.alt=data.name;img.style.top=data.crop;img.draggable=false;el.append(img);return el;}
let person=people[0], sequence=0;
const conversations=[];
let active;
function createConversation(deity,seeded=false){const c={id:++sequence,personId:person.id,personName:person.name,deityId:deity.id,title:seeded?'Una conexión de verdad':'Nueva conversación',messages:initialMessages(person,deity,seeded),draft:'',pending:false};conversations.unshift(c);return c;}
active=createConversation(deities.find(d=>d.id==='atenea'),true);
// Keep demo state in the containing page's memory when it opens another flow.
// Nothing here survives a full page refresh or is sent to a server.
if (embedded) {
  try {
    const saved=parent.__polyverChatDemoState;
    if (saved?.conversations?.length) {
      conversations.splice(0,conversations.length,...saved.conversations);
      sequence=saved.sequence;
      active=conversations.find(c=>c.id===saved.activeId) || conversations[0];
      person={...people.find(p=>p.id===active.personId),name:active.personName||people.find(p=>p.id===active.personId).name};
    }
  } catch { /* The bridge can still work without shared page memory. */ }
}
function publishSelection() {
  if (!embedded) return;
  try { parent.__polyverChatDemoState={conversations,sequence,activeId:active.id}; } catch {}
  if (contextReady && !applyingContext) parent.postMessage({type:'polyver:selection',personId:person.id,deityId:active.deityId},location.origin);
}
function currentDeity(c=active){return deities.find(d=>d.id===c.deityId);}
function renderIdentity(){const deity=currentDeity();for(const id of ['sidebar-deity-avatar','header-avatar'])$(id).replaceChildren(avatar(deity,'deity'));$('sidebar-deity-name').textContent=deity.name;$('header-name').textContent=deity.name;$('header-trait').textContent=deity.trait;$('header-deity').setAttribute('aria-label',`${deity.name}. Cambiar deidad`);$('sidebar-user-avatar').replaceChildren(avatar(person,'person'));$('sidebar-user-name').textContent=person.name;$('mobile-profile').replaceChildren(avatar(person,'person','small'));$('mobile-profile').setAttribute('aria-label',`${person.name}. Cambiar perfil de muestra`);$('recipient').textContent=`Conversando con ${deity.name}`;$('message').placeholder=`Escríbele a ${deity.name}…`;$('conversation').setAttribute('aria-label',`Conversación de ${person.name} con ${deity.name}`);document.title=`${deity.name} y ${person.name} · Polyver`;}
function renderHistory(){$('history').replaceChildren();for(const c of conversations.filter(c=>c.personId===person.id)){const b=document.createElement('button');b.className=`history-item${c.id===active.id?' active':''}`;if(c.id===active.id)b.setAttribute('aria-current','true');const title=document.createElement('strong');title.textContent=c.title;const detail=document.createElement('small');detail.textContent=`Con ${currentDeity(c).name}`;b.append(title,detail);b.addEventListener('click',()=>{active=c;render();closeSidebar();});$('history').append(b);}}
function messageElement(m,c){const deity=currentDeity(c);const sender=m.role==='user'?{...people.find(p=>p.id===c.personId),name:c.personName||people.find(p=>p.id===c.personId).name}:deity;const row=document.createElement('article');row.className=`message ${m.role}`;row.append(avatar(sender,m.role==='user'?'person':'deity'));const content=document.createElement('div');content.className='message-content';const name=document.createElement('div');name.className='message-name';name.textContent=sender.name;if(m.role==='assistant'){const marker=document.createElement('span');marker.className='deity-marker';marker.textContent='Tu deidad';name.append(marker);}const body=document.createElement('div');body.className='message-text';m.text.split('\n\n').forEach(t=>{const p=document.createElement('p');p.textContent=t;body.append(p);});content.append(name,body);if(m.role==='assistant'){const actions=document.createElement('div');actions.className='message-actions';const copy=document.createElement('button');copy.type='button';copy.setAttribute('aria-label',`Copiar mensaje de ${deity.name}`);copy.title='Copiar respuesta';copy.append(icon('copy'));copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(m.text);copy.replaceChildren(icon('check'));copy.setAttribute('aria-label','Respuesta copiada');setTimeout(()=>{copy.replaceChildren(icon('copy'));copy.setAttribute('aria-label',`Copiar mensaje de ${deity.name}`);},1600);}catch{copy.textContent='Selecciona el texto para copiar';}});actions.append(copy);content.append(actions);}row.append(content);return row;}
function typingElement(){const row=document.createElement('article');row.className='message assistant';row.id='typing';row.append(avatar(currentDeity(),'deity'));const label=document.createElement('div');label.className='typing-label';label.textContent=`${currentDeity().name} está escribiendo`;const dots=document.createElement('span');dots.className='typing-dots';dots.setAttribute('aria-hidden','true');for(let i=0;i<3;i++)dots.append(document.createElement('i'));label.append(dots);row.append(label);return row;}
function renderThread(){const date=document.createElement('div');date.className='thread-date';date.textContent='Hoy · Un espacio para ti';$('thread').replaceChildren(date);for(const m of active.messages)$('thread').append(messageElement(m,active));if(active.pending)$('thread').append(typingElement());scrollToLatest();}
function scrollToLatest(){requestAnimationFrame(()=>$('conversation').scrollTo({top:$('conversation').scrollHeight,behavior:'auto'}));}
function renderSuggestions(){$('suggestions').replaceChildren();const items=active.messages.length>3?['Pensar en una primera cita','Explorar lo que busco']:['Quiero conocerme mejor','Me da nervios la primera cita','Busco una conexión real'];for(const text of items){const b=document.createElement('button');b.type='button';b.textContent=text;b.disabled=active.pending;b.addEventListener('click',()=>sendMessage(text));$('suggestions').append(b);}}
function resizeInput(){const el=$('message');el.style.height='auto';el.style.height=Math.min(el.scrollHeight,150)+'px';$('send').disabled=!el.value.trim()||active.pending;}
function render(){renderIdentity();renderHistory();renderThread();renderSuggestions();$('message').value=active.draft;resizeInput();publishSelection();}
function sendMessage(text){text=text.trim();if(!text||active.pending)return;const c=active;const p={...people.find(x=>x.id===c.personId),name:c.personName||person.name};const d=currentDeity(c);const m={role:'user',text};c.messages.push(m);if(c.title==='Nueva conversación')c.title=text.length>31?text.slice(0,31)+'…':text;c.draft='';c.pending=true;$('message').value='';$('thread').append(messageElement(m,c),typingElement());resizeInput();renderSuggestions();renderHistory();scrollToLatest();scheduleReply(c,p,d);publishSelection();}$('composer').addEventListener('submit',e=>{e.preventDefault();sendMessage($('message').value);});$('message').addEventListener('input',()=>{active.draft=$('message').value;resizeInput();});$('message').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();sendMessage(e.currentTarget.value);}});
$('new-chat').addEventListener('click',()=>{active=createConversation(currentDeity());render();closeSidebar();$('message').focus();});
function closeSidebar(){$('sidebar').classList.remove('open');$('scrim').hidden=true;$('open-menu').setAttribute('aria-expanded','false');if(innerWidth<=760)$('sidebar').inert=true;}
function openSidebar(){$('sidebar').inert=false;$('sidebar').classList.add('open');$('scrim').hidden=false;$('open-menu').setAttribute('aria-expanded','true');$('close-menu').focus();}
$('open-menu').addEventListener('click',openSidebar);$('close-menu').addEventListener('click',()=>{closeSidebar();$('open-menu').focus();});$('scrim').addEventListener('click',closeSidebar);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('sidebar').classList.contains('open')){closeSidebar();$('open-menu').focus();}});
const mq=matchMedia('(max-width:760px)');function adaptSidebar(){$('sidebar').inert=mq.matches&&!$('sidebar').classList.contains('open');if(!mq.matches)closeSidebar();}mq.addEventListener('change',adaptSidebar);adaptSidebar();
function showProfiles(){$('profile-options').replaceChildren();for(const p of people){const b=document.createElement('button');b.className=`profile-option${p.id===person.id?' selected':''}`;b.setAttribute('aria-pressed',String(p.id===person.id));b.append(avatar(p,'person','large'));const copy=document.createElement('span');const name=document.createElement('strong');name.textContent=p.name;const sub=document.createElement('small');sub.textContent=`${p.age} años · ${p.detail}`;copy.append(name,sub);b.append(copy);if(p.id===person.id){const check=icon('check');check.className='selected-check';b.append(check);}b.addEventListener('click',()=>{if(person.id!==p.id){person=p;active=conversations.find(c=>c.personId===p.id)??createConversation(deities.find(d=>d.id==='atenea'),true);render();}closeSidebar();$('profile-dialog').close();});$('profile-options').append(b);}$('profile-dialog').showModal();}
function showDeities(){$('deity-options').replaceChildren();for(const d of deities){const b=document.createElement('button');b.className=`deity-option${d.id===active.deityId?' selected':''}`;b.setAttribute('aria-pressed',String(d.id===active.deityId));b.append(avatar(d,'deity'));const copy=document.createElement('span');const name=document.createElement('strong');name.textContent=d.name;const sub=document.createElement('small');sub.textContent=d.trait;copy.append(name,sub);b.append(copy);b.addEventListener('click',()=>{if(active.deityId!==d.id){active=conversations.find(c=>c.personId===person.id&&c.deityId===d.id)??createConversation(d);render();}closeSidebar();$('deity-dialog').close();});$('deity-options').append(b);}$('deity-dialog').showModal();}
['profile-button','mobile-profile'].forEach(id=>$(id).addEventListener('click',showProfiles));['sidebar-deity','header-deity'].forEach(id=>$(id).addEventListener('click',showDeities));document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const rect=d.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)d.close();}}));
render();

function scheduleReply(c,p,d){
  const text=c.messages.findLast(message=>message.role==='user')?.text || '';
  setTimeout(()=>{
    if(!c.pending)return;
    const reply={role:'assistant',text:demoReply(text,p,d)};
    c.messages.push(reply);c.pending=false;
    if(active.id===c.id){$('typing')?.remove();$('thread').append(messageElement(reply,c));resizeInput();renderSuggestions();scrollToLatest();}
  },850);
}

if (embedded) {
  $('open-menu').setAttribute('aria-label','Conversaciones del chat');
  $('open-menu').replaceChildren(icon('chat'));
  document.querySelectorAll('.brand, .primary-nav a').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    const route=link.classList.contains('current')?'chat':'home';
    parent.postMessage({type:'polyver:navigate',route},location.origin);
    closeSidebar();
  }));
  window.addEventListener('message',event=>{
    if(!trustedMessage(event,parent,location.origin) || event.data?.type!=='polyver:context' || !validSelection(event.data))return;
    const data=event.data;
    const basePerson=people.find(p=>p.id===data.personId);
    const displayName=typeof data.displayName==='string'&&data.displayName.trim()?data.displayName.trim().slice(0,80):basePerson.name;
    applyingContext=true;
    contextReady=true;
    if(person.id!==data.personId || person.name!==displayName || active.deityId!==data.deityId){
      const sameConversation=person.id===data.personId&&active.deityId===data.deityId;
      person={...basePerson,name:displayName};
      for(const c of conversations.filter(c=>c.personId===person.id))c.personName=displayName;
      active=(sameConversation?active:conversations.find(c=>c.personId===person.id&&c.deityId===data.deityId)) || createConversation(deities.find(d=>d.id===data.deityId),true);
      render();
    }
    applyingContext=false;
    if(data.visible)requestAnimationFrame(()=>{resizeInput();scrollToLatest();});
  });
  parent.postMessage({type:'polyver:ready'},location.origin);
  for(const c of conversations.filter(c=>c.pending))scheduleReply(c,{...people.find(p=>p.id===c.personId),name:c.personName||people.find(p=>p.id===c.personId).name},currentDeity(c));
}
