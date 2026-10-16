import { useState } from 'react'
import { pillars, dailyQuestions, starterDays } from './data.js'

const STORAGE_KEY = 'more-bounce-method:daily:v1'
const today = () => {
  const d = new Date()
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-')
}
const blank = () => ({ date: today(), checked: [], note: '' })
function readSaved() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (stored?.date === today() && Array.isArray(stored.checked) && typeof stored.note === 'string') {
      return { date: today(), checked: stored.checked.filter(n => Number.isInteger(n) && n >= 0 && n < 6), note: stored.note.slice(0, 4000) }
    }
  } catch { /* private browsing or malformed data */ }
  return blank()
}
function Mark() {
  return <span className="mark" aria-hidden="true"><span>∿</span><i /></span>
}
function Header() {
  return <header className="header">
    <a href="#home" className="brand" aria-label="More Bounce Method home"><Mark/><span>MORE <strong>BOUNCE</strong><small>METHOD™</small></span></a>
    <nav aria-label="Main navigation"><a href="#method">The method</a><a href="#daily">Daily Bounce</a><a href="#seven-days">7-day start</a><a href="#manifesto">Manifesto</a></nav>
    <a className="github-link" href="https://github.com/MichaelWave369/MoreBounceMethod" target="_blank" rel="noopener noreferrer">Open source ↗</a>
  </header>
}
function Hero() {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="green-dot"/> An open invitation to be beautifully human</p>
      <h1 id="hero-title">Leave a little <em>more light</em> than you found.</h1>
      <p className="lead">What if the highest form of human advancement wasn't becoming more powerful, but becoming more beneficial to everything around us?</p>
      <p className="hero-tagline">Less perfection. More compassion. More honesty. <strong>More Bounce.</strong></p>
      <div className="hero-actions"><a className="button primary" href="#daily">Start your Daily Bounce ↗</a><a className="button outlined" href="#method">Explore the method ↓</a></div>
      <p className="footnote">Free to use. No accounts. No comparison. Just a practice.</p>
    </div>
    <div className="hero-art" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/>
      <span className="art-star star-a">✳</span><span className="art-star star-b">✦</span><span className="art-star star-c">✴</span>
      <div className="orb"><span>THE MORE</span><strong>BOUNCE</strong><span>STARTS WITH US</span><i /></div>
      <span className="art-note note-a">be kind</span><span className="art-note note-b">stay curious</span><span className="art-note note-c">make good</span>
    </div>
  </section>
}
function Method() {
  return <section id="method" className="section" aria-labelledby="method-title">
    <div className="section-title"><p className="kicker">01 / THE METHOD</p><h2 id="method-title">Six ways to <span className="gradient">keep the good moving.</span></h2><p>Not commandments. Not personality types. Six practices you can return to as often as you need.</p></div>
    <div className="pillar-grid">{pillars.map((p,i)=><article key={p.letter} className={'pillar pillar-'+p.letter.toLowerCase()}>
      <div className="pillar-head"><span className="pillar-letter">{p.letter}</span><span className="subtle">0{i+1} / 06</span></div>
      <p className="pillar-tag">{p.tag}</p><h3>{p.title}</h3><p className="pillar-desc">{p.description}</p>
      <div className="pillar-try"><span className="tiny-accent">TRY THIS ↗</span><span>{p.question}</span></div>
    </article>)}</div>
  </section>
}
function Daily() {
  const [entry,setEntry] = useState(readSaved)
  const [notice,setNotice] = useState('')
  const toggle = i => { setEntry(e=>({...e,checked:e.checked.includes(i)?e.checked.filter(n=>n!==i):[...e.checked,i]}));setNotice('') }
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify({date:today(),checked:entry.checked,note:entry.note}));setNotice('Saved privately on this device.') }
    catch { setNotice('Local saving is blocked by your browser. Export still works.') }
  }
  const clear = () => { try {localStorage.removeItem(STORAGE_KEY)} catch {} setEntry(blank());setNotice('Today’s reflection has been cleared.') }
  const exportText = () => {
    const lines = ['MORE BOUNCE METHOD™ / DAILY REFLECTION','Date: '+today(),'',
      ...dailyQuestions.map((q,i)=>(entry.checked.includes(i)?'[considered] ':'[not marked] ')+q),
      '', 'One small thing I can do tomorrow:', entry.note || '(no note)', '',
      'A reflection, never a measure of human worth.']
    const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}))
    const a=document.createElement('a');a.href=url;a.download='daily-bounce-'+today()+'.txt';document.body.appendChild(a);a.click();a.remove()
    setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice('A text copy was exported.')
  }
  return <section id="daily" className="section daily-section" aria-labelledby="daily-title">
    <div className="daily-intro"><p className="kicker">02 / THE DAILY BOUNCE</p><h2 id="daily-title">Small actions.<br/><span className="gradient">Real ripples.</span></h2>
      <p>Take a gentle inventory of your day. Mark a question when you've considered it, even if your answer is “not today.” There are no points, grades, or streaks.</p>
      <blockquote>✦ Progress isn't being good all the time. It's staying willing to grow.</blockquote>
      <p className="privacy-note">🔒 Nothing is transmitted. Saving is optional and stays in this browser.</p>
    </div>
    <div className="daily-card"><div className="daily-card-head"><div><p className="subtle">YOUR PRIVATE MOMENT</p><h3>Today's reflection</h3></div><span className="date">{new Date().toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})}</span></div>
      <p className="helper">Reflect on what feels useful. You're not being tested.</p>
      <fieldset className="questions"><legend className="sr-only">Daily reflection questions</legend>{dailyQuestions.map((q,i)=><label key={q} className="question">
        <input type="checkbox" checked={entry.checked.includes(i)} onChange={()=>toggle(i)}/><span className="check" aria-hidden="true">✓</span><span>{q}</span>
      </label>)}</fieldset>
      <p className="considered" aria-live="polite">{entry.checked.length===0?'Choose any question to begin.':'Considered '+entry.checked.length+' of 6 questions. No judgment, ever.'}</p>
      <label htmlFor="note" className="note-label">One small thing I can do tomorrow</label>
      <textarea id="note" maxLength={4000} rows={3} value={entry.note} placeholder="A kind word, a repaired mistake, a moment of rest…" onChange={e=>{setEntry(old=>({...old,note:e.target.value}));setNotice('')}}/>
      <div className="daily-actions"><button type="button" className="button save" onClick={save}>Save on this device</button><button type="button" className="button export" onClick={exportText}>Export .txt ↗</button><button type="button" className="clear" onClick={clear}>Clear</button></div>
      <p className="status" role="status">{notice||'Unsaved notes stay in this tab only.'}</p>
    </div>
  </section>
}
function SevenDays() {
  const [index,setIndex] = useState(0)
  const day=starterDays[index]
  return <section id="seven-days" className="section journey-section" aria-labelledby="journey-title">
    <div className="section-title"><p className="kicker">03 / BEGIN ANYWHERE</p><h2 id="journey-title">A gentle <span className="gradient">7-day start.</span></h2><p>Seven invitations. Not a challenge to win. Go in order, jump around, take a month, or begin again whenever you like.</p></div>
    <div className="journey"><div className="days" role="group" aria-label="Choose a day">{starterDays.map((d,i)=><button key={d.name} type="button" className={'day'+(i===index?' chosen':'')} aria-pressed={index===i} onClick={()=>setIndex(i)}><small>DAY {String(i+1).padStart(2,'0')}</small><strong>{d.name}</strong></button>)}</div>
      <div className="day-detail" aria-live="polite"><span className="day-sun" aria-hidden="true">✺</span><p className="tiny-accent">DAY {String(index+1).padStart(2,'0')} · {day.focus}</p><h3>{day.name}.</h3><p className="action">{day.action}</p>
        <div className="reflection-prompt"><p className="tiny-accent">SOMETHING TO ASK YOURSELF</p><p>{day.reflection}</p></div>
        <p className="day-reminder">No catch-up. No falling behind. The next bounce is always available.</p>
      </div>
    </div>
  </section>
}
function Manifesto() {
  return <section id="manifesto" className="section manifesto" aria-labelledby="manifesto-title"><p className="kicker">04 / OUR OPEN MANIFESTO</p><h2 id="manifesto-title">Nobody owns the Bounce.<br/><span className="gradient">Everybody can add to it.</span></h2>
    <div className="manifesto-columns"><div><p>We reject the idea that a person's worth can be reduced to wealth, productivity, popularity, or constant happiness.</p><p>We believe honesty without cruelty, compassion without self-erasure, curiosity without arrogance, and responsibility without shame are skills worth practicing.</p></div>
      <div><p>We don't need copies of one another. We need people who feel free to be themselves while caring about the lives they touch.</p><p>We'll welcome criticism, change when evidence calls for it, protect each person's agency, and leave the door open for whoever comes next.</p></div></div>
    <blockquote>“The measure of a life is not how much of the world you acquire, but how much better the world becomes because you were here.”</blockquote>
    <div className="manifesto-foot"><span>MORE BOUNCE. LESS FEAR. LEDGER ABOVE EGO.</span><a href="https://github.com/MichaelWave369/MoreBounceMethod/issues" target="_blank" rel="noopener noreferrer">Help shape the method ↗</a></div>
  </section>
}
export default function App() {
  return <><a className="skip" href="#main">Skip to content</a><Header/><main id="main"><Hero/>
    <div className="ribbon" aria-label="Our promises"><span>✳ REAL OVER PERFECT</span><span>✳ KINDNESS WITH BOUNDARIES</span><span>✳ SMALL RIPPLES COUNT</span><span>✳ LEDGER ABOVE EGO</span></div>
    <Method/><aside className="reminder"><div className="reminder-icon" aria-hidden="true">✳</div><div><p className="kicker">A REMINDER, NOT A REQUIREMENT</p><h2>You don't have to shine every day to deserve the light.</h2><p>Rest is allowed. Boundaries are healthy. Asking for help counts. The More Bounce Method is never a test of whether you're a good person.</p></div></aside>
    <Daily/><SevenDays/><Manifesto/></main>
    <footer className="footer"><div className="brand"><Mark/><span>More Bounce Method™<small>A human practice, built in the open. © 2026 MichaelWave369.</small></span></div><div className="footer-links"><a href="#home">Back to top ↑</a><a href="https://github.com/MichaelWave369/MoreBounceMethod/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT license ↗</a><a href="https://github.com/MichaelWave369/MoreBounceMethod" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></footer>
  </>
}
