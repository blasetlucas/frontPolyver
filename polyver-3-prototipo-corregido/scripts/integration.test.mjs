import test from 'node:test';
import assert from 'node:assert/strict';
import {personIds,deityIds,validSelection,personForProfile,profileForSelection,trustedMessage} from '../dist/integration-contract.js';
import {createIntegratedChat} from '../dist/prototype-chat.js';

test('all demo identities are accepted, unknown or incomplete selections are rejected',()=>{
  for(const personId of personIds)for(const deityId of deityIds)assert(validSelection({personId,deityId}));
  for(const value of [null,{}, {personId:'luciano'}, {personId:'intruder',deityId:'atenea'}, {personId:'sofia',deityId:'unknown'}])assert(!validSelection(value));
});

test('changing the demo identity preserves the original profile schema',()=>{
  const profile={name:'Luciano',gender:'Hombre',values:['Respeto'],interests:['Cine'],oracleAnswer:'Me gusta conversar'};
  const changed=profileForSelection(profile,{personId:'sofia',deityId:'apolo'});
  assert.equal(changed.name,'Sofía');assert.equal(changed.gender,'Mujer');assert.equal(personForProfile(changed),'sofia');
  assert.deepEqual(changed.values,profile.values);assert.equal(changed.oracleAnswer,profile.oracleAnswer);
  assert.equal(profileForSelection(changed,{personId:'sofia',deityId:'venus'}),changed);
  assert.equal(personForProfile({name:'Sofía'}),'sofia');
  assert.equal(personForProfile({name:'A custom name'}),'luciano');
});

test('the bridge rejects messages from another origin or another frame',()=>{
  const frame={},origin='https://polyver.example';
  assert(trustedMessage({source:frame,origin},frame,origin));
  assert(!trustedMessage({source:{},origin},frame,origin));
  assert(!trustedMessage({source:frame,origin:'https://other.example'},frame,origin));
});

test('chat component handshakes, validates navigation and selection, and sends updated context',()=>{
  // Exercise the React adapter without a browser or rendered DOM.
  const listeners=new Map(),refs=[],effects=[];let cursor=0;
  const originalWindow=globalThis.window,originalLocation=globalThis.location;
  const origin='https://polyver.example';
  globalThis.location={origin};
  globalThis.window={addEventListener:(type,fn)=>listeners.set(type,fn),removeEventListener:(type,fn)=>{if(listeners.get(type)===fn)listeners.delete(type)}};
  try{
    const React={useRef:value=>{const index=cursor++;return refs[index]??=( {current:value} )},useEffect:fn=>effects.push(fn)};
    const Component=createIntegratedChat(React,{jsx:(type,props)=>({type,props})});
    const selections=[],routes=[],sent=[];
    let props={profile:{name:'Luciano'},cupid:{id:'atenea',name:'Atenea'},visible:true,onChatSelection:value=>selections.push(value),onNavigate:route=>routes.push(route)};
    const element=Component(props);assert.equal(element.type,'iframe');assert.equal(element.props.src,'/chat.html?embedded=1');
    const child={postMessage:(data,target)=>sent.push({data,target})};element.props.ref.current={contentWindow:child};
    const cleanup=effects[0]();effects[1]();
    const receive=data=>listeners.get('message')({source:child,origin,data});
    receive({type:'polyver:ready'});assert.equal(sent.at(-1).data.deityId,'atenea');assert.equal(sent.at(-1).target,origin);
    receive({type:'polyver:selection',personId:'francisca',deityId:'venus'});assert.equal(selections.length,1);
    receive({type:'polyver:selection',personId:'francisca',deityId:'unknown'});assert.equal(selections.length,1);
    receive({type:'polyver:navigate',route:'agenda'});receive({type:'polyver:navigate',route:'javascript:alert(1)'});assert.deepEqual(routes,['agenda']);
    listeners.get('message')({source:{},origin,data:{type:'polyver:navigate',route:'profile'}});assert.deepEqual(routes,['agenda']);
    cursor=0;effects.length=0;
    props={...props,profile:{name:'Sofía'},cupid:{id:'apolo',name:'Apolo'},visible:false};
    const updated=Component(props);assert.equal(updated.props.ref,element.props.ref);assert.equal(updated.props.src,element.props.src);
    effects[1]();assert.deepEqual(sent.at(-1).data,{type:'polyver:context',personId:'sofia',displayName:'Sofía',deityId:'apolo',visible:false});
    cleanup();assert(!listeners.has('message'));
  }finally{globalThis.window=originalWindow;globalThis.location=originalLocation;}
});
