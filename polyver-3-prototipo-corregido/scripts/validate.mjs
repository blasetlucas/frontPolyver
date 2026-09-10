import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {people,deities,initialMessages,demoReply} from '../dist/chat-model.js';
import {triads,onboardingTriads,sceneForStep,oracleTriads} from '../dist/tablet-scenes.js';
const project=fileURLToPath(new URL('../',import.meta.url));
const root=path.join(project,'dist');
let references=0;
for(const name of ['index.html','chat.html','recorrido.html','prototype/index.html']){
  const file=path.join(root,name),html=fs.readFileSync(file,'utf8');
  assert(html.includes('lang="es"'),`Missing Spanish metadata: ${name}`);
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
    if(/^(https?:|data:|mailto:)/.test(m[1]))continue;
    const ref=m[1].split('?')[0].split('#')[0];
    const target=ref.startsWith('/')?path.join(root,ref):path.resolve(path.dirname(file),ref);
    assert(fs.existsSync(target),`Missing asset: ${name} -> ${ref}`);references++;
  }
}
for(const name of ['chat.js','chat-model.js','theme.js','enhancements.js','prototype-chat.js','integration-contract.js','assets/page-polyver3-border.js','assets/index-polyver3-border.js'])execFileSync(process.execPath,['--check',path.join(root,name)]);
const introScenes=Object.keys(onboardingTriads).map(sceneForStep);
for(const scene of [...introScenes,...oracleTriads])assert(fs.existsSync(path.join(root,scene.asset)),`Missing scene: ${scene.asset}`);
for(const triad of triads.slice(1))assert.equal(introScenes.filter(scene=>scene.id===triad.id).length,1,`Repeated supporting triad: ${triad.id}`);
assert(fs.existsSync(path.join(root,'official/kawaii/welcome-12-kawaii-border.webp')),'Missing twelve-Cupido welcome scene');
for(const p of people){
  assert(fs.existsSync(path.join(root,`official/people/${p.id}.jpg`)));
  for(const d of deities){
    assert(fs.existsSync(path.join(root,`official/modern/${d.id}.jpg`)));
    const m=initialMessages(p,d);assert.equal(m.length,3);assert(m[0].text.includes(p.name));assert(m[0].text.includes(d.name));
    const r=demoReply('Quiero una cita',p,d);assert(r.includes(p.name));
  }
}
const js=fs.readFileSync(path.join(root,'chat.js'),'utf8'),html=fs.readFileSync(path.join(root,'chat.html'),'utf8');
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
for(const m of js.matchAll(/\$\('([^']+)'\)/g))assert(ids.has(m[1])||m[1]==='typing',`Missing control: ${m[1]}`);
assert(html.includes('Respuestas de ejemplo'));
// Follow the compiled client import graph, including its layout-to-bootstrap cycle.
// No live module may load the preserved Polyver 2 bootstrap or page component.
const visited=new Set();
function checkModule(relative){
  const file=path.resolve(root,relative);
  if(visited.has(file))return;
  assert(fs.existsSync(file),`Missing module: ${relative}`);
  visited.add(file);
  const source=fs.readFileSync(file,'utf8');
  assert(!source.includes('index-Bvdw6A10.js')&&!source.includes('page-DcBYk7Ef.js'),`Old bootstrap reachable from ${relative}`);
  for(const match of source.matchAll(/["'`]((?:\.\.?\/)[^"'`]+\.js)["'`]/g))checkModule(path.relative(root,path.resolve(path.dirname(file),match[1])));
}
checkModule('assets/index-polyver3-border.js');
checkModule('chat.js');
console.log(`Validated ${visited.size} reachable JavaScript modules; only the integrated bootstrap is reachable.`);
console.log(`Validated 4 entrypoints, ${references} asset references, JS syntax, control IDs, and 36 profile/deity combinations.`);
