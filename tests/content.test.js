import test from 'node:test';
import assert from 'node:assert/strict';
import {pillars,dailyQuestions,starterDays,foundationSupports} from '../src/data.js';
test('six ordered BOUNCE principles',()=>{assert.equal(pillars.length,6);assert.equal(pillars.map(p=>p.letter).join(''),'BOUNCE');assert.ok(pillars.every(p=>p.title&&p.description&&p.question.endsWith('?')))});
test('six reflection questions',()=>{assert.equal(dailyQuestions.length,6);assert.ok(dailyQuestions.every(q=>q.endsWith('?')))});
test('seven noncompetitive invitations',()=>{assert.equal(starterDays.length,7);assert.ok(starterDays.every(d=>d.name&&d.focus&&d.action&&d.reflection))});

test('foundation metaphor maps one support to each BOUNCE principle without scores', () => {
  assert.equal(foundationSupports.length, pillars.length)
  assert.equal(foundationSupports.map(s => s.letter).join(''), 'BOUNCE')
  assert.equal(new Set(foundationSupports.map(s => s.role)).size, 6)
  assert.ok(foundationSupports.every(s => s.title && s.meaning.length > 30 && s.check.endsWith('?')))
  assert.deepEqual(foundationSupports.map(s => s.title),
    ['Honesty', 'Accountability', 'Understanding', 'Interconnection', 'Creation', 'Evolution'])
})
