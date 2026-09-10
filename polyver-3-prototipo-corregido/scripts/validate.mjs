import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {people,deities,initialMessages,demoReply} from '../dist/chat-model.js';
const project=fileURLToPath(new URL('../',import.meta.url));
const root=path.join(project,'dist');
let references=0;
for(const name of ['index.html','recorrido.html','prototype/index.html']){
  const file=path.join(root,name),html=fs.readFileSync(file,'utf8');
  assert(html.includes('lang="es"'),`Missing Spanish metadata: ${name}`);
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
    if(/^(https?:|data:|mailto:)/.test(m[1]))continue;
    const ref=m[1].split('?')[0].split('#')[0];
    const target=ref.startsWith('/')?path.join(root,ref):path.resolve(path.dirname(file),ref);
    assert(fs.existsSync(target),`Missing asset: ${name} -> ${ref}`);references++;
  }
}
for(const name of ['chat.js','chat-model.js','enhancements.js'])execFileSync(process.execPath,['--check',path.join(root,name)]);
for(const p of people){
  assert(fs.existsSync(path.join(root,`official/people/${p.id}.jpg`)));
  for(const d of deities){
    assert(fs.existsSync(path.join(root,`official/modern/${d.id}.jpg`)));
    const m=initialMessages(p,d);assert.equal(m.length,3);assert(m[0].text.includes(p.name));assert(m[0].text.includes(d.name));
    const r=demoReply('Quiero una cita',p,d);assert(r.includes(p.name));
  }
}
const js=fs.readFileSync(path.join(root,'chat.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
for(const m of js.matchAll(/\$\('([^']+)'\)/g))assert(ids.has(m[1])||m[1]==='typing',`Missing control: ${m[1]}`);
assert(html.includes('Respuestas de ejemplo'));
console.log(`Validated 3 entrypoints, ${references} asset references, JS syntax, control IDs, and 36 profile/deity combinations.`);
