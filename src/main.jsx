import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import technologiesData from './data/technologies.json';
import './styles.css';

const BRAND_GRADIENT = 'linear-gradient(90deg, #ff6a00 0%, #e72d7a 52%, #a82ee8 100%)';

function Logo() {
  return <img className="brand-logo" src="/assets/logo-text.png" alt="Dev Stack" />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ['Home', 'Technologies', 'Projects', 'About', 'Contact'];

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <img src="/assets/hamburger.png" alt="" />
        </button>
        <a className="desktop-logo" href="#home" aria-label="Dev Stack home"><Logo /></a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>
          ))}
        </nav>
        <a className="mobile-logo" href="#home" aria-label="Dev Stack home"><Logo /></a>
        <div className="auth-actions">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-copy">
        <h1>Build Your Ideal<br /><span>Development Stack</span></h1>
        <p>Explore frontend, backend, database, and tooling options,<br className="desktop-break" /> compare them side by side, and put together the stack that fits your<br className="desktop-break" /> next project.</p>
        <div className="hero-actions">
          <a href="#technologies" className="primary-btn">Explore Technologies</a>
          <a href="#about" className="secondary-btn">Learn More</a>
        </div>
      </div>
      <div className="hero-art">
        <img src="/assets/banner-stack.png" alt="Illustration of a modern development stack" />
      </div>
    </section>
  );
}

function TechCard({ tech, added, onAdd }) {
  return (
    <article className="tech-card">
      <div className="card-top">
        <img className="tech-icon" src={tech.icon} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
        <span className="badge">{tech.badge}</span>
      </div>
      <h3>{tech.name}</h3>
      <p>{tech.description}</p>
      <div className="card-meta">
        <span className="chip">{tech.category}</span>
        <span>{tech.difficulty}</span>
        <span className="rating"><span aria-hidden="true">★</span> {tech.rating}</span>
      </div>
      <button className={`add-btn ${added ? 'added' : ''}`} disabled={added} onClick={() => onAdd(tech)}>
        {added ? '✓ Added to Stack' : 'Add to Stack'}
      </button>
    </article>
  );
}

function StackPanel({ stack, onRemove, onRemoveAll }) {
  return (
    <aside className="stack-panel">
      <h2>Your Stack</h2>
      <p className="stack-count">{stack.length} Technology{stack.length === 1 ? '' : 'ies'} Selected</p>
      {stack.length === 0 ? (
        <div className="empty-stack">Your stack is empty.</div>
      ) : (
        <div className="stack-list">
          {stack.map((tech) => (
            <div className="stack-item" key={tech.id}>
              <img src={tech.icon} alt="" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
              <div>
                <strong>{tech.name}</strong>
                <small>{tech.category}</small>
              </div>
              <button aria-label={`Remove ${tech.name}`} onClick={() => onRemove(tech)}>×</button>
            </div>
          ))}
        </div>
      )}
      <button className="remove-all" disabled={stack.length === 0} onClick={onRemoveAll}>Remove All</button>
    </aside>
  );
}

function Technologies({ technologies, stack, onAdd, onRemove, onRemoveAll }) {
  return (
    <section id="technologies" className="technologies section-shell">
      <div className="section-heading">
        <h2>Explore the <span>Technologies</span></h2>
        <p>Pick one technology per category to build your ideal stack.</p>
      </div>
      <div className="tech-layout">
        <div className="tech-grid">
          {technologies.map((tech) => (
            <TechCard key={tech.id} tech={tech} added={stack.some((item) => item.id === tech.id)} onAdd={onAdd} />
          ))}
        </div>
        <StackPanel stack={stack} onRemove={onRemove} onRemoveAll={onRemoveAll} />
      </div>
    </section>
  );
}

function InfoSections() {
  return (
    <div className="sr-only-sections">
      <section id="projects"><h2>Projects</h2><p>Build and compare technology stacks for your next project.</p></section>
      <section id="about"><h2>About</h2><p>Dev Stack helps developers explore technologies and assemble a practical stack.</p></section>
      <section id="contact"><h2>Contact</h2><p>Connect with the Dev Stack team through the social links below.</p></section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#home"><Logo /></a>
          <p>Curated tools, technologies, and resources for developers building modern software.</p>
          <div className="socials"><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
        <div className="footer-col"><h4>PRODUCT</h4><a href="#home">Home</a><a href="#technologies">Technologies</a><a href="#projects">Projects</a></div>
        <div className="footer-col"><h4>COMPANY</h4><a href="#about">About</a><a href="#contact">Contact</a><a href="#contact">Careers</a></div>
        <div className="footer-col"><h4>LEGAL</h4><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Dev Stack. All rights reserved.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div>
    </footer>
  );
}

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTechnologies(technologiesData);
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const addToStack = (tech) => {
    if (stack.some((item) => item.id === tech.id)) {
      toast.warning(`${tech.name} is already in your stack.`);
      return;
    }
    setStack((current) => [...current, tech]);
    toast.success(`${tech.name} added to your stack.`);
  };

  const removeFromStack = (tech) => {
    setStack((current) => current.filter((item) => item.id !== tech.id));
    toast.info(`${tech.name} removed from your stack.`);
  };

  const removeAll = () => {
    if (!stack.length) return;
    setStack([]);
    toast.info('All technologies removed from your stack.');
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {loading ? (
          <section className="loading section-shell"><div className="spinner" /><p>Loading technologies...</p></section>
        ) : (
          <Technologies technologies={technologies} stack={stack} onAdd={addToStack} onRemove={removeFromStack} onRemoveAll={removeAll} />
        )}
        <InfoSections />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2200} hideProgressBar theme="light" />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
