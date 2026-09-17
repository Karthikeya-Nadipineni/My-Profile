import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon, Workflow, Server, Globe,
  CheckCircle2, ExternalLink, Mail, Sparkles, Code2,
  Activity, Radio, Send, ArrowRight, Cpu,
  ChevronRight, Shield
} from "lucide-react";
import Interactive3DBackground from "./components/Interactive3DBackground";
import PixelFaceMesh from "./components/PixelFaceMesh";
import confetti from "canvas-confetti";

const GithubIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const revealStyle = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
};

export default function App() {
  const [formSent, setFormSent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Python Automation Engineer  |  DevOps Architect  |  AI Monitoring";

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(iv);
    }, 38);
    return () => clearInterval(iv);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.action.includes("your-endpoint-here") || form.action === window.location.href) {
      setFormSent(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.8 }, colors: ["#00ff66", "#39ff14", "#a3e635"] });
      setTimeout(() => setFormSent(false), 5000);
      return;
    }
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (res.ok) {
        setFormSent(true);
        form.reset();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.8 }, colors: ["#00ff66", "#39ff14", "#a3e635"] });
        setTimeout(() => setFormSent(false), 5000);
      } else { alert("Submission failed. Please try again."); }
    } catch { alert("Submission failed. Please try again."); }
  };

  const skillGroups = [
    {
      category: "Automation & Scripting",
      icon: <TerminalIcon size={20} />,
      color: "#00ff66",
      items: ["Python", "BeautifulSoup, Scrapy, Selenium", "Workflow Automation", "Data Cleansing & Transformation", "Regex Engine Parsing"]
    },
    {
      category: "DevOps & Cloud",
      icon: <Server size={20} />,
      color: "#39ff14",
      items: ["Docker Containerization", "Kubernetes Orchestration", "Jenkins CI/CD Pipelines", "Chef Configuration Mgmt", "Microservices Architecture"]
    },
    {
      category: "AI & Monitoring",
      icon: <Activity size={20} />,
      color: "#a3e635",
      items: ["Proactive Fault Detection", "System Health Telemetry", "Automated Alerting", "Downtime Reduction", "Log Analytics & Parsing"]
    },
    {
      category: "Data & Localization",
      icon: <Globe size={20} />,
      color: "#00e85a",
      items: ["22 Indian Languages", "Multilingual ETL Pipelines", "Accessibility Audio Engines", "Structured JSON/XML", "Scalable Batch Ingestion"]
    }
  ];

  const projects = [
    {
      title: "AI-Enhanced Proactive Monitoring",
      tag: "AI & DEVOPS",
      color: "#00ff66",
      icon: <Activity size={16} />,
      description: "Automated intelligent alerting framework using predictive failure detection, metric anomaly scoring, and AI-driven insights to dramatically lower MTTR.",
      metrics: ["99.9% Uptime", "Sub-second Alerts", "ML Anomaly Engine"],
      tech: ["Python", "Docker", "Prometheus", "Machine Learning", "REST APIs"]
    },
    {
      title: "Multilingual Ingestion Pipeline",
      tag: "DATA ENGINE",
      color: "#39ff14",
      icon: <Globe size={16} />,
      description: "High-throughput scraping and aggregation system with real-time data cleansing, supporting all 22 official Indian languages simultaneously.",
      metrics: ["22 Languages", "100K+ Articles", "Real-time ETL"],
      tech: ["Python", "BeautifulSoup", "Scrapy", "NLP", "Kubernetes"]
    },
    {
      title: "Accessibility Content Engine",
      tag: "ACCESSIBILITY",
      color: "#a3e635",
      icon: <Shield size={16} />,
      description: "Audio-based delivery system enabling visually impaired users to navigate dynamic website information via hands-free voice synthesis.",
      metrics: ["WCAG AAA", "Voice Synthesis", "Cross-platform"],
      tech: ["Python", "TTS APIs", "Web Accessibility", "REST", "Docker"]
    },
    {
      title: "Automated Enterprise CI/CD",
      tag: "INFRA",
      color: "#00ff66",
      icon: <Workflow size={16} />,
      description: "Containerised microservices deployment with automated health probes, zero-downtime rollback mechanics, and Chef-driven node configuration.",
      metrics: ["Zero Downtime", "70% Faster", "Auto Rollback"],
      tech: ["Jenkins", "Docker", "Chef", "Kubernetes", "Shell"]
    }
  ];

  const aboutCards = [
    {
      icon: <TerminalIcon size={24} />, color: "#00ff66",
      title: "Data Scraping & Extraction",
      desc: "High-resilience scrapers that bypass anti-bot systems, extract nested dynamic content, and structure raw web data into clean typed schemas at scale."
    },
    {
      icon: <Workflow size={24} />, color: "#39ff14",
      title: "DevOps & CI/CD",
      desc: "Production pipelines with Docker containers, Kubernetes scaling, and Jenkins automation — enabling zero-downtime releases and minimising failure rates."
    },
    {
      icon: <Activity size={24} />, color: "#a3e635",
      title: "Proactive Monitoring",
      desc: "Intelligent stacks that identify performance bottlenecks and system failures before end-users experience any service interruption."
    }
  ];

  const s1 = useReveal(), s2 = useReveal(), s3 = useReveal(), s4 = useReveal();

  const inputStyle = {
    width: "100%", padding: "0.9rem 1.1rem", borderRadius: "0.6rem",
    background: "rgba(0,0,0,0.45)", border: "1px solid rgba(0,255,102,0.12)",
    color: "#f0fdf4", fontFamily: "var(--font-body)", fontSize: "0.93rem",
    outline: "none", transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    caretColor: "#00ff66"
  };

  const focusIn = e => {
    e.target.style.borderColor = "rgba(0,255,102,0.28)";
    e.target.style.boxShadow = "0 0 0 3px rgba(0,255,102,0.08)";
  };
  const focusOut = e => {
    e.target.style.borderColor = "rgba(0,255,102,0.12)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Interactive3DBackground />
      <div className="scanlines" />
      <div className="background-grid" />
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: "rgba(2, 7, 4, 0.9)",
        borderBottom: "1px solid rgba(0, 255, 102, 0.1)"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{
              width: "2.6rem", height: "2.6rem", borderRadius: "0.6rem",
              background: "linear-gradient(135deg, #00e85a, #39ff14)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 22px rgba(0,255,102,0.55)"
            }}>
              <Code2 size={19} color="#020704" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", lineHeight: 1.1, color: "#f0fdf4" }}>
                NADIPINENI
              </div>
              <div style={{ fontSize: "0.66rem", color: "var(--neon-green)", fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
                KARTHIKEYA
              </div>
            </div>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[["#about", "ABOUT"], ["#skills", "SKILLS"], ["#projects", "WORK"]].map(([href, label]) => (
              <a key={href} href={href} style={{
                color: "var(--text-muted)", textDecoration: "none",
                fontSize: "0.8rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                transition: "color 0.2s ease"
              }}
                onMouseEnter={e => e.target.style.color = "#00ff66"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
                {label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.78rem" }}>
              HIRE ME
            </a>
          </nav>
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 10 }}>

        {/* HERO */}
        <section style={{ minHeight: "calc(100vh - 4.5rem)", display: "flex", alignItems: "center", padding: "5rem 0" }}>
          <div className="container" style={{ width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "4rem", alignItems: "center" }}>

              <div>
                <div style={{ display: "flex", gap: "0.7rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                  <span className="badge">
                    <Radio size={12} /> OPEN TO WORK
                  </span>
                  <span className="badge emerald">
                    <Sparkles size={12} /> PYTHON &bull; DEVOPS &bull; AI
                  </span>
                </div>

                <h1 style={{ fontSize: "3.8rem", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.035em", marginBottom: "1.5rem", fontFamily: "var(--font-heading)" }}>
                  Building <span className="gradient-text-accent">Resilient</span><br />
                  Automated Systems<br />
                  <span style={{ color: "var(--text-muted)", fontWeight: 300 }}>&amp; Intelligent Pipelines.</span>
                </h1>

                <p style={{ fontSize: "0.95rem", color: "var(--neon-green)", fontFamily: "var(--font-mono)", marginBottom: "1.8rem", minHeight: "1.6rem", letterSpacing: "0.01em" }}>
                  {typedText}<span style={{ animation: "blink 1s step-end infinite" }}>|</span>
                </p>

                <p style={{ fontSize: "1.02rem", color: "var(--text-muted)", maxWidth: "540px", lineHeight: 1.78, marginBottom: "2.5rem" }}>
                  Computer Science Engineer specialising in Python scraping engines, structured data pipelines,
                  CI/CD automation with Docker &amp; Kubernetes, and AI-driven proactive monitoring platforms.
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="#projects" className="btn-primary">
                    View My Work <ArrowRight size={16} />
                  </a>
                  <a href="https://github.com/Karthikeya-Nadipineni" target="_blank" rel="noreferrer" className="btn-secondary">
                    <GithubIcon size={16} /> GitHub
                  </a>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,255,102,0.1)" }}>
                  {[
                    { n: "22+", label: "Languages Supported", color: "#00ff66" },
                    { n: "4+", label: "Orchestration Tools", color: "#39ff14" },
                    { n: "99.9%", label: "Reliability Target", color: "#a3e635" }
                  ].map(({ n, label, color }) => (
                    <div key={n} style={{ paddingRight: "1.5rem" }}>
                      <div style={{ fontSize: "2.1rem", fontWeight: 900, color, fontFamily: "var(--font-heading)", lineHeight: 1, filter: `drop-shadow(0 0 10px ${color}80)` }}>{n}</div>
                      <div style={{ fontSize: "0.77rem", color: "var(--text-dim)", marginTop: "0.35rem", fontFamily: "var(--font-mono)" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portrait */}
              <div className="glass-panel no-rotate" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem", paddingBottom: "0.8rem", borderBottom: "1px solid rgba(0,255,102,0.1)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.72rem", color: "var(--neon-green)", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Cpu size={13} /> IDENTITY_MATRIX
                  </span>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {["#00ff66", "#39ff14", "#a3e635"].map(c => (
                      <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, boxShadow: `0 0 5px ${c}` }} />
                    ))}
                  </div>
                </div>

                <PixelFaceMesh />

                <div style={{ marginTop: "1rem", padding: "1.1rem 1.25rem", background: "rgba(0,255,102,0.04)", borderRadius: "0.75rem", border: "1px solid rgba(0,255,102,0.12)", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em", marginBottom: "0.3rem" }}>
                    Karthikeya Nadipineni
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "var(--neon-green)", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
                    CS Engineer &bull; Automation &amp; DevOps
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.55rem", marginTop: "0.85rem", flexWrap: "wrap" }}>
                    {["Python", "Docker", "K8s", "Jenkins"].map(t => (
                      <span key={t} style={{ fontSize: "0.65rem", padding: "0.2rem 0.55rem", borderRadius: "5px", background: "rgba(0,255,102,0.08)", color: "var(--text-dim)", fontFamily: "var(--font-mono)", border: "1px solid rgba(0,255,102,0.15)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "7rem 0", borderTop: "1px solid rgba(0,255,102,0.07)" }}>
          <div className="container">
            <div ref={s1} style={revealStyle}>
              <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4.5rem auto" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--neon-green)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
                  // ENGINEERING PHILOSOPHY
                </span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.15, fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>
                  Transforming Chaos Into <span className="gradient-text-accent">Deterministic Pipelines</span>
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.78 }}>
                  I bridge software engineering, automated data acquisition, and deployment architecture to build zero-friction, production-grade engineering workflows.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.75rem" }}>
                {aboutCards.map(({ icon, color, title, desc }, i) => (
                  <div key={i} className="glass-panel" style={{ padding: "2rem" }}>
                    <div style={{ width: "3rem", height: "3rem", borderRadius: "0.9rem", background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.4rem", color }}>
                      {icon}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.7rem", fontFamily: "var(--font-heading)" }}>{title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.72 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding: "7rem 0", borderTop: "1px solid rgba(0,255,102,0.07)", background: "rgba(0,6,2,0.5)" }}>
          <div className="container">
            <div ref={s2} style={revealStyle}>
              <div style={{ display: "grid", gridTemplateColumns: "0.8fr 2.2fr", gap: "5rem", alignItems: "start" }}>
                <div style={{ position: "sticky", top: "7rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--neon-green)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
                    // TECHNICAL MATRIX
                  </span>
                  <h2 style={{ fontSize: "2.3rem", fontWeight: 800, lineHeight: 1.15, fontFamily: "var(--font-heading)", marginBottom: "1.2rem" }}>
                    Engineered for <span className="gradient-text-accent">Scale</span>
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                    Tools, frameworks, and infrastructure I leverage daily across production environments.
                  </p>
                  <a href="#projects" className="btn-secondary" style={{ padding: "0.65rem 1.25rem", fontSize: "0.78rem" }}>
                    See Projects <ArrowRight size={14} />
                  </a>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  {skillGroups.map(({ category, icon, color, items }, i) => (
                    <div key={i} className="glass-panel" style={{ padding: "1.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.35rem" }}>
                        <div style={{ padding: "0.5rem", borderRadius: "0.65rem", background: `${color}14`, border: `1px solid ${color}25`, color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {icon}
                        </div>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>{category}</h3>
                      </div>
                      <div>
                        {items.map((item, j) => (
                          <div key={j} className="skill-item">
                            <ChevronRight size={13} style={{ color: "var(--neon-green)", flexShrink: 0 }} />
                            <span>{item}</span>
                          </div>
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
        <section id="projects" style={{ padding: "7rem 0", borderTop: "1px solid rgba(0,255,102,0.07)" }}>
          <div className="container">
            <div ref={s3} style={revealStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--neon-green)", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
                    // SELECTED WORK
                  </span>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.15 }}>
                    Featured <span className="gradient-text-accent">Architecture</span>
                  </h2>
                </div>
                <a href="https://github.com/Karthikeya-Nadipineni" target="_blank" rel="noreferrer" className="btn-secondary" style={{ fontSize: "0.78rem", padding: "0.6rem 1.2rem" }}>
                  <GithubIcon size={14} /> All Projects
                </a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.75rem" }}>
                {projects.map(({ title, tag, color, icon, description, metrics, tech }, i) => (
                  <div key={i} className="glass-panel" style={{ padding: "2.2rem", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.85rem", borderRadius: "6px", background: `${color}14`, border: `1px solid ${color}35`, color, fontSize: "0.66rem", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {icon} {tag}
                      </div>
                      <div style={{ padding: "0.4rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.04)", color: "var(--text-dim)" }}>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.3, marginBottom: "0.85rem" }}>{title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.78, marginBottom: "1.4rem", flexGrow: 1 }}>{description}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                      {metrics.map(m => (
                        <span key={m} style={{ fontSize: "0.7rem", padding: "0.22rem 0.65rem", borderRadius: "100px", background: `${color}10`, color, fontFamily: "var(--font-mono)", border: `1px solid ${color}28`, fontWeight: 600 }}>{m}</span>
                      ))}
                    </div>
                    <div style={{ paddingTop: "1.1rem", borderTop: "1px solid rgba(0,255,102,0.07)", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {tech.map(t => (
                        <span key={t} style={{ fontSize: "0.7rem", padding: "0.18rem 0.55rem", borderRadius: "5px", background: "rgba(255,255,255,0.04)", color: "var(--text-dim)", fontFamily: "var(--font-mono)", border: "1px solid rgba(255,255,255,0.06)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "7rem 0", borderTop: "1px solid rgba(0,255,102,0.07)", background: "rgba(0,6,2,0.5)" }}>
          <div className="container">
            <div ref={s4} style={revealStyle}>
              <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "5rem", alignItems: "start" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", color: "var(--neon-green)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
                    // INITIALIZE_CONTACT
                  </span>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1.15, marginBottom: "1.2rem" }}>
                    Let&apos;s Build Something <span className="gradient-text-accent">Remarkable.</span>
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.78, marginBottom: "2.5rem" }}>
                    Whether you&apos;re scaling data pipelines, building intelligent monitoring, or automating cloud infrastructure &mdash; I&apos;m ready to contribute immediately.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <a href="https://github.com/Karthikeya-Nadipineni" target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderRadius: "0.85rem", background: "rgba(0,255,102,0.04)", border: "1px solid rgba(0,255,102,0.12)", textDecoration: "none", color: "#fff", transition: "all 0.2s ease" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,102,0.08)"; e.currentTarget.style.borderColor = "rgba(0,255,102,0.25)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,102,0.04)"; e.currentTarget.style.borderColor = "rgba(0,255,102,0.12)"; }}>
                      <div style={{ width: "2.4rem", height: "2.4rem", borderRadius: "0.6rem", background: "rgba(0,255,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <GithubIcon size={18} color="#00ff66" />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>GitHub</div>
                        <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>github.com/Karthikeya-Nadipineni</div>
                      </div>
                    </a>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderRadius: "0.85rem", background: "rgba(0,255,102,0.04)", border: "1px solid rgba(0,255,102,0.12)" }}>
                      <div style={{ width: "2.4rem", height: "2.4rem", borderRadius: "0.6rem", background: "rgba(57,255,20,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#39ff14" }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>Email</div>
                        <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>karthikeyanadipineni1@gmail.com</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "2rem", padding: "1.1rem 1.3rem", borderRadius: "0.85rem", background: "rgba(0,255,102,0.05)", border: "1px solid rgba(0,255,102,0.12)" }}>
                    <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--neon-green)", marginBottom: "0.4rem", letterSpacing: "0.08em" }}>STATUS // ONLINE</div>
                    <div style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>Available for full-time roles &amp; freelance contracts. Typical response within 24 hours.</div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: "2.5rem" }}>
                  {formSent ? (
                    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                      <div style={{ width: "4rem", height: "4rem", borderRadius: "50%", background: "rgba(0,255,102,0.12)", border: "1px solid rgba(0,255,102,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem auto" }}>
                        <CheckCircle2 size={30} color="#00ff66" />
                      </div>
                      <h4 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Message Received!</h4>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: "0.35rem" }}>Send a Message</h3>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Tell me about your project or opportunity.</p>
                      </div>
                      <form action="https://formspree.io/f/mkjgwkjd" method="POST" onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.68rem", color: "var(--text-dim)", marginBottom: "0.45rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Name</label>
                            <input type="text" name="name" required placeholder="Alex Mercer" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.68rem", color: "var(--text-dim)", marginBottom: "0.45rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email</label>
                            <input type="email" name="email" required placeholder="alex@company.com" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.68rem", color: "var(--text-dim)", marginBottom: "0.45rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Subject</label>
                          <input type="text" name="subject" placeholder="Job opportunity / Project collaboration" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.68rem", color: "var(--text-dim)", marginBottom: "0.45rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Message</label>
                          <textarea name="message" rows={5} required placeholder="Describe your project, role, or how I can help..." style={{ ...inputStyle, resize: "none" }} onFocus={focusIn} onBlur={focusOut} />
                        </div>
                        <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: "0.4rem" }}>
                          <Send size={16} /> Send Message
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,255,102,0.08)", padding: "2rem 0", background: "var(--bg-primary)", position: "relative", zIndex: 10 }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            &copy; {new Date().getFullYear()} Nadipineni Karthikeya &mdash; React &amp; Three.js
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[["https://github.com/Karthikeya-Nadipineni", "GitHub"], ["#about", "About"], ["#skills", "Skills"], ["#contact", "Contact"]].map(([href, label]) => (
              <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}
                style={{ color: "var(--text-dim)", textDecoration: "none", fontSize: "0.78rem", fontFamily: "var(--font-mono)", transition: "color 0.2s ease" }}
                onMouseEnter={e => e.target.style.color = "var(--neon-green)"}
                onMouseLeave={e => e.target.style.color = "var(--text-dim)"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
