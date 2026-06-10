import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_shnh4aa'
const EMAILJS_TEMPLATE_ID = 'template_81brfpe'
const EMAILJS_PUBLIC_KEY = 'x7NMbIh92oCWzIwVh'

const projects = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
    title: 'KisanMitra',
    subtitle: 'AI-driven agriculture platform — national hackathon finalist',
    tech: ['React.js', 'AI/ML', 'REST API'],
    points: [
      'National hackathon finalist — AI platform for Indian farmers',
      'Crop disease detection, market price insights, weather forecasting',
      'Built React.js frontend with responsive multi-language support',
      'Integrated multiple REST APIs for real-time agricultural data',
    ],
    live: null,
    github: 'https://github.com/kizz-code',
    tag: 'Hackathon',
  },
  {
    id: 4,
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
  },
]

const skills = {
  Languages: ['C++', 'JavaScript', 'Java', 'PHP', 'SQL'],
  Frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
  Backend: ['Node.js', 'Express', 'REST APIs'],
  Tools: ['Git', 'Linux/WSL', 'MySQL', 'MongoDB', 'VS Code'],
  'CS Core': ['DSA', 'OOPs', 'Computer Networks', 'OS', 'DBMS'],
}

const tagColors = {
  Frontend: '#00d4aa',
  'Full Stack': '#7c6bff',
  Hackathon: '#ff6b6b',
  Systems: '#f39c12',
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleSend = async (e) => {
    e.preventDefault()
    setSending(true)
    setFormStatus(null)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
          to_email: 'kshitizashok2@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setFormStatus('success')
      setFormState({ name: '', email: '', message: '' })
    } catch {
      setFormStatus('error')
    }
    setSending(false)
  }

  const navLinks = ['home', 'about', 'projects', 'contact']

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)', height: '64px',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '15px', color: 'var(--accent)', fontWeight: 500 }}>
          kshitiz.dev
        </span>

        {/* desktop nav */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}
          className="desktop-nav">
          {navLinks.map((n) => (
            <li key={n}>
              <a href={`#${n}`} style={{
                fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em',
                color: activeSection === n ? 'var(--accent)' : 'var(--text2)',
                transition: 'color 0.2s',
                textTransform: 'capitalize',
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
              background: menuOpen && i === 1 ? 'transparent' : 'var(--text)',
              transition: 'transform 0.2s',
              transform: menuOpen ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
          background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
          padding: '1rem 2rem',
        }}>
          {navLinks.map(n => (
            <a key={n} href={`#${n}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                color: activeSection === n ? 'var(--accent)' : 'var(--text)',
                textTransform: 'capitalize', fontWeight: 500,
              }}>{n}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,4rem) 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* ambient glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '60%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', position: 'relative' }}>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '13px',
            color: 'var(--accent)', letterSpacing: '0.12em',
            marginBottom: '1.5rem', textTransform: 'uppercase',
          }}>
            Available for internships & placements
          </p>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}>
            Kshitiz Kumar
            <span style={{ display: 'block', color: 'var(--accent)' }}>
              builds things.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text2)', maxWidth: '560px',
            lineHeight: 1.8, marginBottom: '2.5rem',
          }}>
            B.Tech CS student at IET DAVV, Indore. I write C++, build React apps,
            and dig into networking internals — from raw ICMP sockets to live crypto dashboards.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#projects" style={{
              background: 'var(--accent)', color: '#000',
              padding: '0.75rem 1.75rem', borderRadius: '6px',
              fontWeight: 600, fontSize: '15px', transition: 'opacity 0.2s',
            }}
              onMouseOver={e => e.target.style.opacity = '0.85'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              See my work
            </a>
            <a href="#contact" style={{
              border: '1px solid var(--border2)', color: 'var(--text)',
              padding: '0.75rem 1.75rem', borderRadius: '6px',
              fontWeight: 500, fontSize: '15px', transition: 'border-color 0.2s',
            }}
              onMouseOver={e => e.target.style.borderColor = 'var(--accent)'}
              onMouseOut={e => e.target.style.borderColor = 'var(--border2)'}
            >
              Get in touch
            </a>
          </div>

          {/* stats */}
          <div style={{
            display: 'flex', gap: '2.5rem', marginTop: '4rem', flexWrap: 'wrap',
          }}>
            {[
              { num: '4+', label: 'Projects shipped' },
              { num: '7.0', label: 'CGPA (IET DAVV)' },
              { num: '2027', label: 'Graduating' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '4px', letterSpacing: '0.04em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SectionLabel>About</SectionLabel>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem', marginTop: '2.5rem',
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '1.2rem' }}>
                CS student with a love for building real things.
              </h2>
              <p style={{ color: 'var(--text2)', lineHeight: 1.9, marginBottom: '1rem' }}>
                I'm Kshitiz — a third-year CS student at IET DAVV, Indore, graduating in 2027.
                I started with web dev and eventually found myself deep in C++ networking internals,
                writing raw TCP socket clients and ICMP ping tools from scratch.
              </p>
              <p style={{ color: 'var(--text2)', lineHeight: 1.9, marginBottom: '2rem' }}>
                Alongside systems work, I build data-heavy frontend apps — real-time dashboards,
                portfolio trackers — and I practice DSA seriously (Striver's A-to-Z).
                I'm actively targeting fresher / internship roles in software development.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/kizz-code', icon: '⌥' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kshitiz-kumar11', icon: '⌘' },
                  { label: 'LeetCode', href: 'https://leetcode.com/u/Kizziee/', icon: '⌃' },
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '0.5rem 1rem', border: '1px solid var(--border)',
                    borderRadius: '6px', fontSize: '13px', color: 'var(--text2)',
                    fontWeight: 500, transition: 'border-color 0.2s, color 0.2s',
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>

            {/* skills */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {Object.entries(skills).map(([cat, items]) => (
                  <div key={cat}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {items.map(skill => (
                        <span key={skill} style={{
                          padding: '4px 10px', background: 'var(--bg3)',
                          border: '1px solid var(--border)', borderRadius: '4px',
                          fontSize: '13px', color: 'var(--text2)', fontWeight: 400,
                        }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,4rem)',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <SectionLabel>Projects</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 600, marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Things I've built
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.25rem' }}>
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
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
              border: 'none', padding: '0.85rem 2rem',
              borderRadius: '6px', fontWeight: 600, fontSize: '15px',
              cursor: sending ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font)', transition: 'opacity 0.2s',
              alignSelf: 'flex-start',
            }}>
              {sending ? 'Sending…' : 'Send message →'}
            </button>

            {formStatus === 'success' && (
              <p style={{ color: 'var(--accent)', fontSize: '14px', marginTop: '0.5rem' }}>
                ✓ Message sent! I'll get back to you soon.
              </p>
            )}
            {formStatus === 'error' && (
              <p style={{ color: '#ff6b6b', fontSize: '14px', marginTop: '0.5rem' }}>
                Something went wrong. Try emailing me directly at kshitizashok2@gmail.com
              </p>
            )}
          </form>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <ContactItem icon="📞" value="+91 9302655144" />
            <ContactItem icon="📧" value="kshitizashok2@gmail.com" href="mailto:kshitizashok2@gmail.com" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem clamp(1.5rem,5vw,4rem)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text3)' }}>
          © 2025 Kshitiz Kumar
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text3)' }}>
          Built with React · Deployed on Vercel
        </span>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .desktop-nav { display: flex !important; }
          .hamburger { display: none !important; }
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
    }}>
      {children}
    </p>
  )
}

function ProjectCard({ project: p }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg3)' : 'var(--bg)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        borderRadius: '10px', padding: '1.5rem',
        transition: 'background 0.2s, border-color 0.2s',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.05em',
            background: `${tagColors[p.tag]}18`,
            color: tagColors[p.tag],
            border: `1px solid ${tagColors[p.tag]}40`,
            marginBottom: '0.6rem',
          }}>{p.tag}</span>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.3 }}>{p.title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text3)', marginTop: '2px' }}>{p.subtitle}</p>
        </div>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {p.points.map((pt, i) => (
          <li key={i} style={{ fontSize: '13px', color: 'var(--text2)', display: 'flex', gap: '8px', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px', fontSize: '10px' }}>▸</span>
            {pt}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {p.tech.map(t => (
          <span key={t} style={{
            padding: '3px 8px', background: 'var(--bg2)',
            border: '1px solid var(--border)', borderRadius: '4px',
            fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)',
          }}>{t}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" style={{
            fontSize: '13px', color: 'var(--accent)', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>Live demo ↗</a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" style={{
            fontSize: '13px', color: 'var(--text2)', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>GitHub ↗</a>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', textarea, required }) {
  const inputStyle = {
    width: '100%', background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: '6px', padding: '0.7rem 0.9rem',
    color: 'var(--text)', fontFamily: 'var(--font)', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s',
    resize: textarea ? 'vertical' : 'none',
    minHeight: textarea ? '120px' : 'auto',
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
