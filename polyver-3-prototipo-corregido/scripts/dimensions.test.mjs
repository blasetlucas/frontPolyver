import test from 'node:test';
import assert from 'node:assert/strict';
import {principleCoordinates,spectrumAnswer,spectrum,validPin} from '../dist/profile-dimensions-model.js';

test('every principles bar changes the avatar position, all extreme combinations remain on the chart',()=>{
  const neutral=Array(8).fill(50);
  assert.deepEqual(principleCoordinates(neutral),{x:50,y:50});
  for(let i=0;i<8;i++){
    const changed=[...neutral];changed[i]=100;
    assert.notDeepEqual(principleCoordinates(changed),{x:50,y:50});
  }
  for(let mask=0;mask<256;mask++){
    const point=principleCoordinates(Array.from({length:8},(_,i)=>(mask>>i&1)*100));
    assert(point.x>=0&&point.x<=100&&point.y>=0&&point.y<=100);
  }
  assert(principleCoordinates([50,50,50,50,100,100,50,50]).x>50);
  assert(principleCoordinates([50,100,50,50,50,50,50,50]).y<50);
});
test('all six hearts describe both ends and the middle of the selected spectrum',()=>{
  for(const {labels} of spectrum){
    assert.equal(spectrumAnswer(labels,0),labels[0]);
    assert.equal(spectrumAnswer(labels,50),labels[1]);
    assert.equal(spectrumAnswer(labels,100),labels[2]);
    assert.notEqual(spectrumAnswer(labels,25),spectrumAnswer(labels,75));
  }
});
test('only the complete demo PIN opens the private view',()=>{
  assert.equal(validPin(['6','6','6']),true);
  for(const digits of [[],['6','6'],['6','','6'],['6','6','5'],['6','6','66'],['6','6','6','6']])assert.equal(validPin(digits),false);
});
