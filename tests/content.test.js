import test from 'node:test';
import assert from 'node:assert/strict';
import {pillars,dailyQuestions,starterDays} from '../src/data.js';
test('six ordered BOUNCE principles',()=>{assert.equal(pillars.length,6);assert.equal(pillars.map(p=>p.letter).join(''),'BOUNCE');assert.ok(pillars.every(p=>p.title&&p.description&&p.question.endsWith('?')))});
test('six reflection questions',()=>{assert.equal(dailyQuestions.length,6);assert.ok(dailyQuestions.every(q=>q.endsWith('?')))});
test('seven noncompetitive invitations',()=>{assert.equal(starterDays.length,7);assert.ok(starterDays.every(d=>d.name&&d.focus&&d.action&&d.reflection))});
