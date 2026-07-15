import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_shnh4aa'
const EMAILJS_TEMPLATE_ID = 'template_g22e5ls'
const EMAILJS_PUBLIC_KEY = 'x7NMbIh92oCWzIwVh'

const projects = [
  {
    id: 1,
    title: 'ShopEasy',
    subtitle: 'Full-stack e-commerce with cart, auth & admin panel',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    points: [
      'Product browsing, cart management, and JWT-based authentication',
      'Role-based access control for admin and customer roles',
      'REST API with CORS; backend on Render, frontend on Vercel',
      'MongoDB Atlas for cloud data, admin panel for inventory control',
    ],
    live: 'https://shopeasy-frontend-wine.vercel.app',
    github: 'https://github.com/kizz-code/shopeasy-frontend',
    tag: 'Full Stack',
    featured: true,
  },
  {
    id: 2,
    title: 'Crypto Price Dashboard',
    subtitle: 'Real-time crypto tracker with watchlist & comparison',
    tech: ['React', 'Tailwind CSS', 'Recharts', 'CoinGecko API'],
    points: [
      'Consumed CoinGecko REST API for live price data',
      'Interactive line charts with 1D / 7D / 30D timeframe toggling',
      'Loading skeletons, error boundaries, and responsive dark UI',
      'Watchlist with localStorage and 2-coin comparison mode',
    ],
    live: 'https://cryptex-plum.vercel.app/',
    github: null,
    tag: 'Frontend',
    featured: true,
  },
  {
    id: 3,
    title: 'Portfolio Tracker',
    subtitle: 'Multi-page stock portfolio manager with P&L analytics',
    tech: ['Next.js', 'Tailwind CSS', 'Recharts', 'Alpha Vantage API'],
    points: [
      'Holdings table with real-time P&L via Alpha Vantage REST API',
      'Dashboard with allocation charts, analytics with historical trends',
      'Centralized API layer, localStorage persistence, CSV export',
      'Color-coded P&L, graceful fallback handling, loading skeletons',
    ],
    live: 'https://arcadia-omega.vercel.app/dashboard',
    github: null,
    tag: 'Full Stack',
    featured: true,
  },
  {
    id: 4,
    title: 'KisanMitra',
    subtitle: 'AI-driven agriculture platform — national hackathon finalist',
    tech: ['React.js', 'AI/ML', 'REST API', 'Node.js'],
    points: [
      'National hackathon finalist — AI platform for Indian farmers',
      'Crop disease detection, market price insights, weather forecasting',
      'Built React.js frontend with responsive multi-language support',
      'Integrated multiple REST APIs for real-time agricultural data',
    ],
    live: null,
    github: 'https://github.com/kizz-code',
    tag: 'Hackathon',
    featured: false,
  },
  {
    id: 5,
    title: 'Ping Tool & HTTP Client',
    subtitle: 'Low-level networking utilities built in C++ on Linux',
    tech: ['C++', 'Raw Sockets', 'ICMP', 'TCP', 'Linux/WSL'],
    points: [
      'ICMP-based ping utility with raw socket programming',
      'HTTP/1.1 client over raw TCP — no libcurl dependency',
      'Implemented checksum calculation, TTL/RTT measurement',
      'Tested on WSL/Ubuntu; demonstrates deep networking knowledge',
    ],
    live: null,
    github: 'https://github.com/kizz-code',
    tag: 'Systems',
    featured: false,
  },
]

const primarySkills = {
  'Languages': ['JavaScript', 'HTML', 'CSS', 'SQL'],
  'Frontend': ['React.js', 'Next.js', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Express', 'REST APIs', 'JWT Auth'],
  'Databases & Tools': ['MongoDB', 'MySQL', 'Git', 'VS Code', 'Vercel'],
}

const secondarySkills = ['C++', 'Java', 'PHP', 'Linux/WSL', 'Raw Sockets', 'ICMP/TCP', 'DSA', 'OOPs', 'Computer Networks', 'OS', 'DBMS']

const tagColors = {
  Frontend: '#00d4aa',
  'Full Stack': '#7c6bff',
  Hackathon: '#ff6b6b',
  Systems: '#f39c12',
}

// ── Featured internship ──
const experience = {
  role: 'Frontend – Full Stack Developer Intern',
  company: 'Equinext Strategies LLP',
  duration: 'June 2026 – Present',
  description:
    'Contributing to a production-grade mutual fund analytics platform used for wealth management. ' +
    'Working on interactive dashboards, financial APIs, data visualization, and investment analytics ' +
    'using modern web technologies.',
  resume: 'https://drive.google.com/file/d/100JbEqRy5GPPYhkNZW2mQMwJgZhskb9Y/view?usp=sharing',
}

// What I actually built during the internship.
const contributions = [
  {
    text: 'Built responsive mutual-fund analytics dashboards in Next.js and React — surfacing NAV history, benchmark comparison, and holdings analysis.',
  },
  {
    text: 'Integrated REST APIs for fund search, NAV history, and benchmark data into a single normalized data layer.',
  },
  {
    text: 'Designed a database-first fallback with timeout handling that keeps dashboards live when third-party APIs are slow or down.',
  },
  {
    text: 'Assisted in financial data ingestion and validation pipelines for investment datasets.',
  },
  {
    text: 'Built reusable chart and table components with Recharts, shared across the dashboard.',
  },
]

const expTechStack = ['Next.js', 'React', 'JavaScript', 'SQLite', 'REST APIs', 'Tailwind CSS', 'Recharts', 'Git', 'GitHub', 'Postman', 'Render', 'Vercel']

const challenges = [
  'Unreliable third-party financial APIs',
  'Keeping dashboards responsive with heavy data',
  'Working with real, messy financial datasets',
  'Designing resilient fallback strategies',
]

const learnings = [
  'Fintech product development',
  'Financial APIs & data modeling',
  'Production debugging under real usage',
  'Modern React / Next.js architecture',
]

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleSend = async (e) => {
    e.preventDefault()
    setSending(true)
    setFormStatus(null)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        // `name` fills the template's subject + body; `from_name`/`from_email`
        // fill the From Name and Reply To fields. To Email is hardcoded in the template.
        name: formState.name,
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
      }, EMAILJS_PUBLIC_KEY)
      setFormStatus('success')
      setFormState({ name: '', email: '', message: '' })
    } catch {
      setFormStatus('error')
    }
    setSending(false)
  }

  const navLinks = ['home', 'experience', 'projects', 'about', 'contact']
  const visibleProjects = showAll ? projects : projects.filter(p => p.featured)

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)', height: '64px',
      }}>
        {/* KK Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'var(--accent-dim)', border: '1px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: 'var(--font)', fontSize: '14px', fontWeight: 700,
              color: 'var(--accent)', letterSpacing: '-0.5px',
            }}>KK</span>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text3)', fontWeight: 400, display: 'none' }}
            className="nav-name">kshitiz.dev</span>
        </a>

        {/* desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((n) => (
            <li key={n}>
              <a href={`#${n}`} style={{
                fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em',
                color: activeSection === n ? 'var(--accent)' : 'var(--text2)',
                transition: 'color 0.2s', textTransform: 'capitalize',
              }}>{n}</a>
            </li>
          ))}
        </ul>

        {/* hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'none', flexDirection: 'column', gap: '5px', padding: '4px',
        }} className="hamburger" aria-label="Menu">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: menuOpen && i === 1 ? 'transparent' : 'var(--text)', transition: 'transform 0.2s',
              transform: menuOpen ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
          background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '1rem 2rem',
        }}>
          {navLinks.map(n => (
            <a key={n} href={`#${n}`} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '0.75rem 0', borderBottom: '1px solid var(--border)',
              color: activeSection === n ? 'var(--accent)' : 'var(--text)',
              textTransform: 'capitalize', fontWeight: 500,
            }}>{n}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* ambient glow */}
        <div style={{
          position: 'absolute', top: '15%', left: '55%', width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 70%)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,107,255,0.05) 0%, transparent 70%)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '820px', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 12px', borderRadius: '100px',
            background: 'var(--accent-dim2)', border: '1px solid rgba(0,212,170,0.2)',
            marginBottom: '1.75rem',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.08em' }}>
              Interning @ Equinext Strategies · Open to SDE roles
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 7.5vw, 5.8rem)', fontWeight: 700,
            lineHeight: 1.04, letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Kshitiz Kumar
          </h1>

          {/* role subtitle */}
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 600,
            color: 'var(--accent)', marginBottom: '0.4rem', letterSpacing: '-0.01em', lineHeight: 1.3,
          }}>
            Frontend &amp; Full Stack Developer Intern{' '}
            <span style={{ color: 'var(--text2)', fontWeight: 500 }}>@ Equinext Strategies LLP</span>
          </p>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)', fontWeight: 500,
            color: 'var(--text2)', marginBottom: '1.75rem', letterSpacing: '-0.005em',
          }}>
            Building Mutual Fund Analytics &amp; Wealth Management Products
          </p>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'var(--text2)',
            maxWidth: '560px', lineHeight: 1.85, marginBottom: '2.75rem',
          }}>
            B.Tech CS student at IET DAVV, Indore. I turn ideas into full-stack products —
            from React dashboards and REST APIs to raw C++ networking tools.
            Currently interning in fintech and open to full-time SDE roles.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '4rem' }}>
            <a href="#projects" style={{
              background: 'var(--accent)', color: '#000',
              padding: '0.8rem 2rem', borderRadius: '6px',
              fontWeight: 700, fontSize: '15px', transition: 'opacity 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
            }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
            >
              See My Work ↓
            </a>
            <a href="#contact" style={{
              border: '1px solid var(--border2)', color: 'var(--text)',
              padding: '0.8rem 2rem', borderRadius: '6px',
              fontWeight: 500, fontSize: '15px', transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)' }}
            >
              Get in touch
            </a>
            <a href="https://github.com/kizz-code" target="_blank" rel="noreferrer" style={{
              color: 'var(--text3)', fontSize: '13px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.2s',
            }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text3)'}
            >
              GitHub ↗
            </a>
          </div>

          {/* stats */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { num: '5+', label: 'Projects shipped' },
              { num: '2', label: 'Hackathons' },
              { num: '2027', label: 'Graduating' },
            ].map(s => (
              <div key={s.label} style={{ borderLeft: '2px solid var(--border)', paddingLeft: '1rem' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px', letterSpacing: '0.04em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EXPERIENCE (internship) ── */}
      <ExperienceSection />

      {/* ── PROJECTS (moved up, before About) ── */}
      <section id="projects" style={{
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SectionLabel>Projects</SectionLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
              Things I've built
            </h2>
            <button onClick={() => setShowAll(!showAll)} style={{
              background: 'none', border: '1px solid var(--border)', color: 'var(--text2)',
              padding: '0.45rem 1rem', borderRadius: '6px', cursor: 'pointer',
              fontSize: '13px', fontFamily: 'var(--font)', fontWeight: 500,
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
            >
              {showAll ? 'Show less' : `View all (${projects.length})`}
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}>
            {visibleProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SectionLabel>About</SectionLabel>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem', marginTop: '2.5rem',
          }}>
            {/* bio */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.2rem' }}>
                CS student with a love for building real things.
              </h2>
              <p style={{ color: 'var(--text2)', lineHeight: 1.9, marginBottom: '1rem' }}>
                I'm Kshitiz — a third-year CS student at IET DAVV, Indore, graduating in 2027.
                I build full-stack web apps with React and Node.js, and I also dig deep into
                systems programming — writing raw TCP socket clients and ICMP tools from scratch in C++.
              </p>
              <p style={{ color: 'var(--text2)', lineHeight: 1.9, marginBottom: '2rem' }}>
                I take DSA seriously (Striver's A-to-Z), love hackathons, and am actively targeting
                SDE internships and fresher placements.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/kizz-code' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kshitiz-kumar11' },
                  { label: 'LeetCode', href: 'https://leetcode.com/u/Kizziee/' },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                    padding: '0.5rem 1rem', border: '1px solid var(--border)',
                    borderRadius: '6px', fontSize: '13px', color: 'var(--text2)', fontWeight: 500,
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
                  >{l.label} ↗</a>
                ))}
              </div>
            </div>

            {/* skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* primary */}
              <div>
                {Object.entries(primarySkills).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: '1.1rem' }}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {items.map(skill => (
                        <span key={skill} style={{
                          padding: '4px 11px', background: 'var(--bg3)',
                          border: '1px solid var(--border)', borderRadius: '4px',
                          fontSize: '13px', color: 'var(--text)', fontWeight: 400,
                        }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* secondary */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Also familiar with</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {secondarySkills.map(skill => (
                    <span key={skill} style={{
                      padding: '3px 9px', background: 'transparent',
                      border: '1px solid var(--border)', borderRadius: '4px',
                      fontSize: '12px', color: 'var(--text3)',
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SectionLabel>Contact</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
            Let's work together
          </h2>
          <p style={{ color: 'var(--text2)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            Open to internships, campus placements, and collaborations.
            Drop a message and I'll get back to you.
          </p>

          <form ref={formRef} onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Name" value={formState.name} onChange={v => setFormState(s => ({ ...s, name: v }))} placeholder="Your name" required />
              <Field label="Email" type="email" value={formState.email} onChange={v => setFormState(s => ({ ...s, email: v }))} placeholder="you@example.com" required />
            </div>
            <Field label="Message" textarea value={formState.message} onChange={v => setFormState(s => ({ ...s, message: v }))} placeholder="What's on your mind?" required />
            <button type="submit" disabled={sending} style={{
              background: sending ? 'var(--bg3)' : 'var(--accent)',
              color: sending ? 'var(--text3)' : '#000',
              border: 'none', padding: '0.85rem 2rem', borderRadius: '6px',
              fontWeight: 600, fontSize: '15px', cursor: sending ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font)', transition: 'opacity 0.2s', alignSelf: 'flex-start',
            }}>
              {sending ? 'Sending…' : 'Send message →'}
            </button>
            {formStatus === 'success' && <p style={{ color: 'var(--accent)', fontSize: '14px' }}>✓ Message sent! I'll get back to you soon.</p>}
            {formStatus === 'error' && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>Something went wrong. Email me directly at kshitizashok2@gmail.com</p>}
          </form>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <ContactItem icon="📞" value="+91 9302655144" />
            <ContactItem icon="📧" value="kshitizashok2@gmail.com" href="mailto:kshitizashok2@gmail.com" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.5rem,5vw,4rem)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '5px',
            background: 'var(--accent-dim)', border: '1px solid rgba(0,212,170,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: '9px', fontWeight: 700, color: 'var(--accent)' }}>KK</span>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text3)' }}>© 2026 Kshitiz Kumar</span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text3)' }}>Built with React · Deployed on Vercel</span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; }
          .nav-name { display: inline !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--mono)', fontSize: '11px',
      color: 'var(--accent)', letterSpacing: '0.14em',
      textTransform: 'uppercase', marginBottom: '0.4rem',
    }}>{children}</p>
  )
}

function ProjectCard({ project: p }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg3)' : 'var(--bg2)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '12px', padding: '1.5rem',
        transition: 'background 0.2s, border-color 0.25s, transform 0.2s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column', gap: '0.9rem',
        boxShadow: hovered ? '0 8px 32px rgba(0,212,170,0.08)' : 'none',
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '4px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em',
            background: `${tagColors[p.tag]}18`, color: tagColors[p.tag],
            border: `1px solid ${tagColors[p.tag]}40`, marginBottom: '0.55rem',
          }}>{p.tag}</span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.25 }}>{p.title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text3)', marginTop: '3px', lineHeight: 1.4 }}>{p.subtitle}</p>
        </div>
        {p.featured && (
          <span style={{
            fontSize: '10px', color: 'var(--accent)', border: '1px solid rgba(0,212,170,0.3)',
            borderRadius: '4px', padding: '2px 6px', fontFamily: 'var(--mono)',
            letterSpacing: '0.05em', flexShrink: 0, marginLeft: '8px',
          }}>FEATURED</span>
        )}
      </div>

      {/* bullet points */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
        {p.points.map((pt, i) => (
          <li key={i} style={{ fontSize: '13px', color: 'var(--text2)', display: 'flex', gap: '8px', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', fontSize: '9px' }}>▸</span>
            {pt}
          </li>
        ))}
      </ul>

      {/* tech badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {p.tech.map(t => (
          <span key={t} style={{
            padding: '3px 8px', background: 'var(--bg)',
            border: '1px solid var(--border)', borderRadius: '4px',
            fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)',
          }}>{t}</span>
        ))}
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '0.45rem 1rem', borderRadius: '6px',
            background: 'var(--accent)', color: '#000',
            fontSize: '12px', fontWeight: 700, transition: 'opacity 0.2s',
          }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >Live Demo ↗</a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '0.45rem 1rem', borderRadius: '6px',
            border: '1px solid var(--border2)', color: 'var(--text2)',
            fontSize: '12px', fontWeight: 500, transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
          >GitHub ↗</a>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', textarea, required }) {
  const inputStyle = {
    width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: '6px', padding: '0.7rem 0.9rem',
    color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s',
    resize: textarea ? 'vertical' : 'none', minHeight: textarea ? '120px' : 'auto',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '12px', color: 'var(--text3)', letterSpacing: '0.04em', fontWeight: 500 }}>{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'} />
      }
    </div>
  )
}

function ContactItem({ icon, value, href }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      {href
        ? <a href={href} style={{ fontSize: '14px', color: 'var(--text2)' }}>{value}</a>
        : <span style={{ fontSize: '14px', color: 'var(--text2)' }}>{value}</span>
      }
    </div>
  )
}

/* ──────────────────────────────────────────────
   FEATURED EXPERIENCE — Equinext Strategies LLP
   ────────────────────────────────────────────── */

function ExperienceSection() {
  return (
    <section id="experience" aria-label="Featured experience at Equinext Strategies LLP" style={{
      padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: '-5%', right: '5%', width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* header card */}
        <Reveal>
          <SectionLabel>Featured Experience</SectionLabel>
          <HoverCard style={{ padding: 'clamp(1.5rem, 4vw, 2.25rem)', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: '100px',
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em',
                  background: 'var(--accent-dim)', color: 'var(--accent)',
                  border: '1px solid rgba(0,212,170,0.25)', marginBottom: '0.85rem',
                }}>Internship · Fintech</span>
                <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {experience.role}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '0.6rem' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--accent)' }}>{experience.company}</span>
                  <span style={{ color: 'var(--text3)' }}>·</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text2)' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'block', animation: 'pulse 2s infinite' }} />
                    {experience.duration}
                  </span>
                </div>
              </div>
              <a href={experience.resume} target="_blank" rel="noreferrer" aria-label="View resume (opens in a new tab)" style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px', whiteSpace: 'nowrap',
                padding: '0.6rem 1.2rem', borderRadius: '6px',
                border: '1px solid var(--border2)', color: 'var(--text)',
                fontSize: '13px', fontWeight: 600, transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)' }}
              >
                <Icon name="doc" size={15} /> View Resume ↗
              </a>
            </div>
            <p style={{ color: 'var(--text2)', lineHeight: 1.85, fontSize: '15px', maxWidth: '760px' }}>
              {experience.description}
            </p>
          </HoverCard>
        </Reveal>

        {/* what I built — one focused list, replacing the three icon-card grids */}
        <Reveal>
          <BlockHeading>What I built</BlockHeading>
          <HoverCard style={{ padding: 'clamp(1.25rem, 3vw, 1.9rem)' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {contributions.map((c, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '14px', alignItems: 'baseline',
                  padding: `${i === 0 ? '0' : '1.15rem'} 0 ${i === contributions.length - 1 ? '0' : '1.15rem'}`,
                  borderBottom: i < contributions.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 500, color: 'var(--accent)', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '14.5px', color: 'var(--text)', lineHeight: 1.65, flex: 1 }}>
                    {c.text}
                  </p>
                </li>
              ))}
            </ul>
          </HoverCard>
        </Reveal>

        {/* tech stack */}
        <Reveal>
          <BlockHeading>Tech stack</BlockHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {expTechStack.map(t => <TechBadge key={t}>{t}</TechBadge>)}
          </div>
        </Reveal>

        {/* challenges & learnings */}
        <Reveal>
          <BlockHeading>Challenges &amp; what I took away</BlockHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <ListCard title="Challenges" items={challenges} accent="#f39c12" icon="shield" />
            <ListCard title="What I learned" items={learnings} accent="#00d4aa" icon="grad" />
          </div>
        </Reveal>

      </div>
    </section>
  )
}

function BlockHeading({ children }) {
  return (
    <h3 style={{
      fontSize: 'clamp(1.15rem,2.2vw,1.5rem)', fontWeight: 700,
      letterSpacing: '-0.02em', margin: 'clamp(2.5rem,5vw,3.5rem) 0 1.25rem',
    }}>{children}</h3>
  )
}

// Reusable hover-lift card — same idiom as ProjectCard.
function HoverCard({ children, style }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg3)' : 'var(--bg2)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '12px',
        transition: 'background 0.2s, border-color 0.25s, transform 0.2s, box-shadow 0.2s',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 32px rgba(0,212,170,0.08)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function TechBadge({ children }) {
  const [h, setH] = useState(false)
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: '6px 13px', background: 'var(--bg3)',
        border: `1px solid ${h ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '6px', fontFamily: 'var(--mono)', fontSize: '12.5px',
        color: h ? 'var(--accent)' : 'var(--text)',
        transition: 'border-color 0.2s, color 0.2s', cursor: 'default',
      }}
    >{children}</span>
  )
}

function ListCard({ title, items, accent, icon }) {
  return (
    <HoverCard style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
        <IconBadge name={icon} color={accent} />
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{title}</h4>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontSize: '13.5px', color: 'var(--text2)', display: 'flex', gap: '9px', lineHeight: 1.5 }}>
            <span style={{ color: accent, flexShrink: 0, marginTop: '3px', fontSize: '9px' }}>▸</span>
            {it}
          </li>
        ))}
      </ul>
    </HoverCard>
  )
}

// Accent-tinted square holding an inline SVG icon.
function IconBadge({ name, color = '#00d4aa', size = 20 }) {
  return (
    <div style={{
      width: '38px', height: '38px', borderRadius: '9px',
      background: `${color}1a`, border: `1px solid ${color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, flexShrink: 0,
    }}>
      <Icon name={name} size={size} />
    </div>
  )
}

// Fade + rise on first scroll into view. Honors prefers-reduced-motion.
function Reveal({ children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(14px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>{children}</div>
  )
}

// Minimal inline stroke icons (currentColor).
const ICONS = {
  doc: <><path d="M6 3h8l5 5v13H6z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h6" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M12 9v4" /><path d="M12 16h.01" /></>,
  grad: <><path d="M3 8l9-4 9 4-9 4z" /><path d="M7 10.5V15c0 1.1 2.2 2 5 2s5-.9 5-2v-4.5" /><path d="M21 8.5v4.5" /></>,
}

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      {ICONS[name] || null}
    </svg>
  )
}
