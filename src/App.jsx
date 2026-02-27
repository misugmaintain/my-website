import { useState, useEffect, useRef } from "react";

const SECTIONS = ["Home", "About", "Experience", "Research", "Publications", "Teaching", "Contact"];

const NAV_IDS = {
  Home: "home",
  About: "about",
  Experience: "experience",
  Research: "research",
  Publications: "publications",
  Teaching: "teaching",
  Contact: "contact",
};

// ── Subtle animated background ──
function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.035,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ── Navigation ──
function Nav({ active, scrolled, menuOpen, setMenuOpen }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 40px" : "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(250,247,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(58,50,40,0.08)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        fontFamily: "'Lora', serif",
      }}
    >
      <a
        href="#home"
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "#2c2520",
          textDecoration: "none",
          letterSpacing: "0.03em",
        }}
      >
        O.M. Arigbede
      </a>

      {/* Desktop nav */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {SECTIONS.filter((s) => s !== "Home").map((s) => (
          <a
            key={s}
            href={`#${NAV_IDS[s]}`}
            style={{
              fontSize: "13px",
              color: active === NAV_IDS[s] ? "#8B4513" : "#5c5147",
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: active === NAV_IDS[s] ? 600 : 400,
              transition: "color 0.3s",
              fontFamily: "'Source Sans 3', sans-serif",
              position: "relative",
              paddingBottom: "2px",
            }}
          >
            {s}
            {active === NAV_IDS[s] && (
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: "1.5px",
                  background: "#8B4513",
                  borderRadius: "1px",
                }}
              />
            )}
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          zIndex: 110,
        }}
        aria-label="Toggle menu"
      >
        <div style={{ width: 24, height: 18, position: "relative" }}>
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#2c2520",
              borderRadius: 2,
              position: "absolute",
              top: menuOpen ? 8 : 0,
              transform: menuOpen ? "rotate(45deg)" : "none",
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#2c2520",
              borderRadius: 2,
              position: "absolute",
              top: 8,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "#2c2520",
              borderRadius: 2,
              position: "absolute",
              top: menuOpen ? 8 : 16,
              transform: menuOpen ? "rotate(-45deg)" : "none",
              transition: "all 0.3s",
            }}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(250,247,243,0.98)",
            zIndex: 105,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${NAV_IDS[s]}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "18px",
                color: "#2c2520",
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: active === NAV_IDS[s] ? 600 : 400,
              }}
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Section wrapper with fade-in ──
function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "11.5px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8B4513",
          fontWeight: 600,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function SectionTitle({ text }) {
  return (
    <h2
      style={{
        fontFamily: "'Lora', serif",
        fontSize: "clamp(26px, 3.2vw, 38px)",
        fontWeight: 600,
        color: "#2c2520",
        margin: "0 0 32px 0",
        lineHeight: 1.25,
      }}
    >
      {text}
    </h2>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 48,
        height: 2,
        background: "linear-gradient(90deg, #8B4513, rgba(139,69,19,0.2))",
        borderRadius: 1,
        margin: "0 0 32px 0",
      }}
    />
  );
}

// ── Publication entry ──
function PubEntry({ number, authors, year, title, journal, doi }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "20px 0",
        borderBottom: "1px solid rgba(58,50,40,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "14px",
          color: "#8B4513",
          fontWeight: 600,
          minWidth: 24,
          paddingTop: 2,
        }}
      >
        {number}.
      </span>
      <div>
        <p
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "15px",
            lineHeight: 1.65,
            color: "#3a3228",
            margin: 0,
          }}
        >
          {authors} ({year}). "{title}." <em>{journal}.</em>
        </p>
        {doi && (
          <a
            href={doi}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "12.5px",
              color: "#8B4513",
              textDecoration: "none",
              marginTop: 6,
              display: "inline-block",
              letterSpacing: "0.02em",
            }}
          >
            View Publication →
          </a>
        )}
      </div>
    </div>
  );
}

// ── Experience entry ──
function ExpEntry({ org, role, unit, period, highlights }) {
  return (
    <div
      style={{
        padding: "28px 0",
        borderBottom: "1px solid rgba(58,50,40,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h4
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "17px",
              fontWeight: 600,
              color: "#2c2520",
              margin: "0 0 4px 0",
            }}
          >
            {org}
          </h4>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "14.5px",
              color: "#8B4513",
              fontWeight: 500,
              margin: "0 0 2px 0",
            }}
          >
            {role}
          </p>
          {unit && (
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "13px",
                color: "#7a7068",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {unit}
            </p>
          )}
        </div>
        <span
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "12.5px",
            color: "#9a8e82",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
          }}
        >
          {period}
        </span>
      </div>
      {highlights && highlights.length > 0 && (
        <div style={{ marginTop: 14 }}>
          {highlights.map((h, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#5c5147",
                margin: "0 0 6px 0",
                paddingLeft: 14,
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", left: 0, color: "#8B4513" }}>·</span>
              {h}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Skill tag ──
function SkillTag({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "12.5px",
        color: "#5c5147",
        background: "rgba(139,69,19,0.06)",
        border: "1px solid rgba(139,69,19,0.12)",
        borderRadius: "20px",
        padding: "5px 14px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── Interest card ──
function InterestCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(139,69,19,0.04)" : "rgba(255,255,255,0.6)",
        border: "1px solid rgba(58,50,40,0.08)",
        borderRadius: 12,
        padding: "28px 24px",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 30px rgba(58,50,40,0.06)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
      <h4
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "16px",
          fontWeight: 600,
          color: "#2c2520",
          margin: "0 0 8px 0",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "13.5px",
          color: "#7a7068",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════
export default function AcademicWebsite() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = SECTIONS.map((s) => {
        const el = document.getElementById(NAV_IDS[s]);
        if (!el) return { id: NAV_IDS[s], top: 99999 };
        return { id: NAV_IDS[s], top: el.getBoundingClientRect().top };
      });
      const current = sections.filter((s) => s.top <= 200).pop();
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerStyle = {
    maxWidth: 820,
    margin: "0 auto",
    padding: "0 32px",
  };

  return (
    <div
      style={{
        background: "#faf7f3",
        color: "#3a3228",
        minHeight: "100vh",
        position: "relative",
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      <GrainOverlay />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        ::selection { background: rgba(139,69,19,0.15); }
        a:hover { opacity: 0.85; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .hero-grid { flex-direction: column !important; text-align: center !important; }
          .hero-grid > div:first-child { align-items: center !important; }
          .research-grid { grid-template-columns: 1fr !important; }
          .footer-cols { flex-direction: column !important; gap: 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <Nav active={active} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ═══════════ HERO ═══════════ */}
      <Section id="home" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div style={containerStyle}>
          <div
            className="hero-grid"
            style={{
              display: "flex",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8B4513",
                  fontWeight: 600,
                  marginBottom: 16,
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Health Scientist · Biostatistician · Epidemiologist
              </div>

              <h1
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: "clamp(34px, 5vw, 54px)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: "#2c2520",
                  margin: "0 0 20px 0",
                }}
              >
                Olumide M.
                <br />
                Arigbede
                <span style={{ color: "#8B4513" }}>,</span>{" "}
                <span style={{ fontWeight: 400, fontStyle: "italic", fontSize: "0.72em" }}>
                  DrPH, MPH
                </span>
              </h1>

              <p
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "#5c5147",
                  maxWidth: 520,
                  marginBottom: 32,
                }}
              >
                Research data analyst and biostatistical consultant at SUNY Downstate Health Sciences
                University, with 8+ years of expertise spanning the FDA, CDC, academic institutions, and
                state/local health departments. My work bridges epidemiology, computational genomics,
                and advanced biostatistics to transform complex data into actionable public health insights.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="#contact"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: "#2c2520",
                    padding: "13px 28px",
                    borderRadius: 6,
                    textDecoration: "none",
                    transition: "background 0.3s",
                  }}
                >
                  Get in Touch
                </a>
                <a
                  href="#publications"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#2c2520",
                    background: "transparent",
                    padding: "13px 28px",
                    borderRadius: 6,
                    textDecoration: "none",
                    border: "1.5px solid rgba(44,37,32,0.25)",
                    transition: "border-color 0.3s",
                  }}
                >
                  Publications
                </a>
              </div>

              {/* Social links */}
              <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
                {[
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/olumide-arigbede" },
                  { label: "Google Scholar", url: "#" },
                  { label: "ResearchGate", url: "#" },
                ].map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "12px",
                      color: "#8B4513",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 10 }}>◆</span> {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Photo placeholder */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: 260,
                  height: 320,
                  borderRadius: 12,
                  background: "linear-gradient(145deg, rgba(139,69,19,0.08), rgba(139,69,19,0.03))",
                  border: "1px solid rgba(139,69,19,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 60%, rgba(139,69,19,0.06))",
                }} />
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "11px",
                  color: "#8B4513",
                  opacity: 0.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>
                  Your Photo
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ ABOUT ═══════════ */}
      <Section id="about" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="About" />
          <SectionTitle text="Background & Expertise" />
          <Divider />

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              I am a health/research scientist, biostatistician, and epidemiologist with over eight years of progressive
              expertise in public health, epidemiology, and biostatistics. My specializations span infectious diseases,
              computational genomics, cancer, and cardiovascular disease surveillance — research that I have carried out
              across federal agencies, academic institutions, and public health departments.
            </p>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              Currently serving as Associate for Institutional Research and Research Data Analyst at
              <strong> SUNY Downstate Health Sciences University</strong>, I provide comprehensive biostatistical
              consulting services, develop webinar series on statistical methodologies, and mentor graduate students
              and junior researchers. Previously, I contributed to regulatory science analysis at the
              <strong> Food and Drug Administration (FDA)</strong>, developed syndromic surveillance systems at the
              <strong> Centers for Disease Control and Prevention (CDC)</strong>, and led epidemiological investigations
              at state and local health departments in Florida, Texas, and Washington, D.C.
            </p>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              I earned my Doctor of Public Health (DrPH) in Epidemiology and Biostatistics from Florida A&M University,
              where my doctoral research applied mathematical modeling to analyze emerging and reemerging infectious disease
              outbreaks. I am proficient in R, SAS, Python, and SQL, with demonstrated capabilities in machine learning,
              spatial epidemiology, and real-world evidence analysis.
            </p>
          </div>

          {/* Education */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", marginBottom: 20 }}>
              Education
            </h3>
            {[
              { degree: "Doctor of Public Health (DrPH)", field: "Epidemiology & Biostatistics", school: "Florida A&M University", year: "2024" },
              { degree: "Master of Public Health (MPH)", field: "Epidemiology & Biostatistics", school: "Florida A&M University", year: "2021" },
              { degree: "Master of Health Administration (MHA)", field: "Health Business & Finance", school: "Florida A&M University", year: "2019" },
              { degree: "Bachelor of Technology (B.Tech)", field: "Statistics", school: "Federal University of Technology, Akure", year: "2017" },
            ].map((e, i) => (
              <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid rgba(58,50,40,0.06)", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14.5px", fontWeight: 600, color: "#2c2520" }}>
                    {e.degree}
                  </span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#7a7068" }}>
                    {" "}— {e.field}
                  </span>
                  <br />
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#9a8e82", fontStyle: "italic" }}>
                    {e.school}
                  </span>
                </div>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#8B4513", fontWeight: 500 }}>
                  {e.year}
                </span>
              </div>
            ))}
          </div>

          {/* Core Skills */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", marginBottom: 16 }}>
              Technical Proficiencies
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "R (Shiny, Markdown, ggplot2, tidyverse)", "SAS (Macros, PROC SQL)", "Python", "SQL",
                "Tableau", "Power BI", "ArcGIS", "ESSENCE", "REDCap",
                "Machine Learning", "Survival Analysis", "Longitudinal Data", "Meta-Analysis",
                "Causal Inference", "Time Series", "Spatial Epidemiology",
              ].map((s) => (
                <SkillTag key={s} label={s} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <Section id="experience" style={{ padding: "80px 0", background: "rgba(255,255,255,0.4)" }}>
        <div style={containerStyle}>
          <SectionLabel text="Experience" />
          <SectionTitle text="Professional Journey" />
          <Divider />

          <ExpEntry
            org="SUNY Downstate Health Sciences University"
            role="Associate for Institutional Research / Research Data Analyst"
            unit="Office of the Senior Vice President for Research"
            period="Feb 2025 – Present"
            highlights={[
              "Provide biostatistical consulting to 20+ researchers monthly across study design, analysis, and interpretation",
              "Develop and lead a monthly biostatistical webinar series attended by 15+ faculty, students, and fellows",
              "Design hands-on SAS/R training modules with real-world biomedical applications for multiple departments",
              "Deliver invited lectures bridging traditional statistics with machine learning for medical students",
            ]}
          />
          <ExpEntry
            org="SUNY Downstate Health Sciences University"
            role="Adjunct Instructor"
            unit="HINF 5111 – Research Methods, School of Health Professions"
            period="Fall 2025"
            highlights={[
              "Taught graduate-level biostatistical concepts to 25+ health informatics students",
              "Designed hands-on assignments using real healthcare datasets to foster applied learning",
            ]}
          />
          <ExpEntry
            org="Food and Drug Administration (FDA)"
            role="Health Scientist"
            unit="Office of Minority Health — Office of the Commissioner"
            period="Nov 2024 – Feb 2025"
            highlights={[
              "Developed an automated data extraction (ADE) tool in R achieving 95–96% reduction in processing time",
              "Provided demographic analyses and interactive dashboards for regulatory submission data (NDA)",
              "Collaborated with CDER to enhance safety and efficacy data analysis from pivotal clinical studies",
            ]}
          />
          <ExpEntry
            org="Centers for Disease Control and Prevention (CDC)"
            role="Health Scientist & Epidemiologist Fellow (ORISE)"
            unit="National Syndromic Surveillance Program (NSSP)"
            period="Jun 2022 – Nov 2024"
            highlights={[
              "Developed syndromic case definitions using ICD-10-CM, ICD-9-CM, and SNOMED classification systems",
              "Implemented electronic surveillance system improving outbreak detection timeliness by 31%",
              "Applied machine learning techniques to free-text data, improving signal detection accuracy",
              "Built interactive dashboards and optimized data pipelines for ED, mortality, and laboratory data",
            ]}
          />
          <ExpEntry
            org="Florida A&M University"
            role="Graduate Teaching / Research Assistant"
            unit="Division of Epidemiology and Biostatistics"
            period="Aug 2020 – Nov 2024"
            highlights={[
              "Mentored 47+ students in public health statistics and data epidemiology",
              "Assisted with teaching graduate-level biostatistics, computational statistics, and epidemiology",
            ]}
          />
          <ExpEntry
            org="District of Columbia Department of Health"
            role="Epidemiologist / Disease Investigator"
            unit=""
            period="Oct 2021 – Mar 2022"
            highlights={[
              "Led COVID-19 outbreak investigations, contact tracing, and case documentation",
            ]}
          />
          <ExpEntry
            org="Florida Department of Health in Leon County"
            role="OPS Biological Scientist III"
            unit=""
            period="Sep 2020 – Oct 2021"
            highlights={[
              "Analyzed epidemiological data and developed executive summaries and visualizations for decision-makers",
            ]}
          />
          <ExpEntry
            org="Texas Department of State Health Services"
            role="Epidemiologist"
            unit=""
            period="Dec 2020 – Jun 2021"
            highlights={[
              "Analyzed community-level epidemiological data using advanced statistical methods",
            ]}
          />
        </div>
      </Section>

      {/* ═══════════ RESEARCH ═══════════ */}
      <Section id="research" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="Research" />
          <SectionTitle text="Research Interests" />
          <Divider />

          <div
            className="research-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            <InterestCard
              icon="🧬"
              title="Cancer & Genomics Epidemiology"
              desc="Investigating mutational burden, genomic disparities, and survival modeling using cBioPortal, TCGA, and SEER databases."
            />
            <InterestCard
              icon="🦠"
              title="Infectious Disease Epidemiology"
              desc="Mathematical modeling of disease outbreaks, syndromic surveillance, and emergency department visit prediction."
            />
            <InterestCard
              icon="📊"
              title="Biostatistical Methods"
              desc="Advanced regression, survival analysis, causal inference, and machine learning applications in public health research."
            />
            <InterestCard
              icon="🌍"
              title="Computational Epidemiology"
              desc="Agent-based modeling, spatiotemporal analysis, and AI-driven approaches to disease dynamics and population health."
            />
            <InterestCard
              icon="🤰"
              title="Maternal & Child Health"
              desc="Disparities in breastfeeding, infant nutrition, and WIC participation across diverse populations."
            />
            <InterestCard
              icon="📐"
              title="Research Methods"
              desc="Study design, meta-analysis, real-world evidence, and statistical methodology for clinical and epidemiological studies."
            />
          </div>

          {/* Dissertation */}
          <div style={{
            marginTop: 48,
            padding: "28px 32px",
            background: "rgba(139,69,19,0.03)",
            border: "1px solid rgba(139,69,19,0.1)",
            borderRadius: 12,
          }}>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8B4513",
              fontWeight: 600,
            }}>
              Doctoral Dissertation
            </span>
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#2c2520",
              lineHeight: 1.6,
              margin: "10px 0 0 0",
            }}>
              Mathematical Modeling of Emerging and Reemerging Infectious Disease Outbreaks and the Predicted Rate of
              ED Visits: Case Studies of COVID-19 and Influenza, the National Syndromic Surveillance Program (NSSP)
              Datasets — United States, 2019–2024
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ PUBLICATIONS ═══════════ */}
      <Section id="publications" style={{ padding: "80px 0", background: "rgba(255,255,255,0.4)" }}>
        <div style={containerStyle}>
          <SectionLabel text="Publications" />
          <SectionTitle text="Selected Publications" />
          <Divider />

          <PubEntry
            number={1}
            authors="Arigbede, O.M."
            year="2024"
            title="Mathematical modeling of emerging and reemerging infectious disease outbreaks and the predicted rate of emergency department (ED) visits: Case studies of COVID-19 and influenza, the NSSP Datasets — United States, 2019–2024"
            journal="ProQuest Dissertations & Theses, Florida A&M University"
            doi="https://www.proquest.com/dissertations-theses/mathematical-modeling-emerging-reemerging/docview/3177776585/se-2"
          />
          <PubEntry
            number={2}
            authors="Arigbede, O.M. et al."
            year="2024"
            title="Mutational burden among patients with metastatic prostate cancer differs by race in 3 key genes: An analysis of genomic and clinical data from the AACR Project GENIE biopharma collaborative in cBioPortal"
            journal="Journal of Clinical Oncology, 42, 5106–5106"
            doi="https://doi.org/10.1200/JCO.2024.42.16_suppl.5106"
          />
          <PubEntry
            number={3}
            authors="Arigbede, O., Buxbaum, S.G., Falzarano, S., Rhie, S.K."
            year="2024"
            title="Global disparities in prostate cancer burden: An analysis of the GLOBOCAN 2020 database"
            journal="Cancer Epidemiol Biomarkers Prev, 33(9_Supplement): C001"
            doi="https://doi.org/10.1158/1538-7755.DISP24-C001"
          />
          <PubEntry
            number={4}
            authors="Arigbede, O., Kiros, G."
            year="2024"
            title="Analysis of predictive indicators of invasive breast cancer: Modeling survival rates"
            journal="Cancer Research, 84(3 Suppl_2)"
            doi="https://doi.org/10.1158/1538-7445.CANEVOL23-B042"
          />
          <PubEntry
            number={5}
            authors="Arigbede, O.M. et al."
            year="2023"
            title="Disparities in infant nutrition: WIC participation and rates of breastfeeding in Florida"
            journal="Int. J. Environ. Res. Public Health, 20, 5988"
            doi="https://doi.org/10.3390/ijerph20115988"
          />
          <PubEntry
            number={6}
            authors="Arigbede, O., Amusa, T., Buxbaum, S.G."
            year="2023"
            title="Exploring the use of artificial intelligence and robotics in prostate cancer management"
            journal="Cureus, 15(9): e46021"
            doi="https://doi.org/10.7759/cureus.46021"
          />
          <PubEntry
            number={7}
            authors="Arigbede, O., Kilanko, O., Arigbede, O.J., Matthew, O."
            year="2023"
            title="Hunger, food security, and sovereignty: A need for evidence-based public health approaches to meet sustainable development goals"
            journal="Int J Public Health, 68:1605956"
            doi="https://doi.org/10.3389/ijph.2023.1605956"
          />

          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "14px",
            color: "#8B4513",
            marginTop: 24,
            fontStyle: "italic",
          }}>
            Complete publication list available on{" "}
            <a href="#" style={{ color: "#8B4513", textDecoration: "underline" }}>Google Scholar</a>.
          </p>
        </div>
      </Section>

      {/* ═══════════ TEACHING ═══════════ */}
      <Section id="teaching" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="Teaching & Mentorship" />
          <SectionTitle text="Teaching & Service" />
          <Divider />

          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              I am passionate about training the next generation of public health professionals. My teaching
              integrates real-world datasets and hands-on computing exercises in R and SAS, ensuring students
              develop both conceptual understanding and practical analytical skills.
            </p>
          </div>

          {/* Courses */}
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", marginBottom: 16 }}>
            Courses Taught
          </h3>
          <div style={{ padding: "16px 0 28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2c2520" }}>
              HINF 5111 — Research Methods
            </span>
            <br />
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068" }}>
              SUNY Downstate Health Sciences University, School of Health Professions · Fall 2025 · Graduate Level
            </span>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.7, marginTop: 10 }}>
              Comprehensive lectures on biostatistical foundations for health informatics students, covering
              probability theory, distributions, hypothesis testing, regression analysis, and statistical inference
              using healthcare datasets.
            </p>
          </div>
          <div style={{ padding: "16px 0 28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2c2520" }}>
              Biostatistics, Computational Statistics & Epidemiology
            </span>
            <br />
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068" }}>
              Florida A&M University · 2020–2024 · Graduate Teaching Assistant
            </span>
          </div>

          {/* Invited Talk */}
          <div style={{ padding: "16px 0 28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2c2520" }}>
              Introduction to Biostatistics for AI/ML in Medicine
            </span>
            <br />
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068" }}>
              SUNY Chancellor's Opportunity Research Experience (SCOREs) Summer Program · July 2025 · Featured Speaker
            </span>
          </div>

          {/* Mentorship */}
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", margin: "40px 0 16px 0" }}>
            Mentorship & Service
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Mentored 47+ students in public health statistics and epidemiology at FAMU (2019–2024)",
              "Active mentor at the Council of State and Territorial Epidemiologists (CSTE), supporting 4+ mentees",
              "Peer reviewer for JAMA Network Open, Public Health Reports, and Cureus Medical Journal",
              "Abstract reviewer for the American Public Health Association (APHA)",
              "Developed a monthly biostatistical webinar series for faculty, fellows, and graduate students at SUNY Downstate",
            ].map((item, i) => (
              <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14.5px", color: "#3a3228", lineHeight: 1.7, paddingLeft: 14, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#8B4513" }}>·</span>
                {item}
              </p>
            ))}
          </div>

          {/* Awards */}
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", margin: "40px 0 16px 0" }}>
            Selected Honors & Awards
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { award: "FAMU Institute of Public Health Outstanding Doctoral Graduate Scholarship", year: "2025" },
              { award: "John Ruffin Young Investigator Award, Xavier University Health Disparities Conference", year: "2024" },
              { award: "Leadership Development Academy Award, ABRCMS Innovation Programs", year: "2024" },
              { award: "Oak Ridge Institute for Science and Education (ORISE) Fellowship", year: "2022–2024" },
              { award: "Deep South Center for Environmental Justice Award, 9th HBCU Climate Change Conference", year: "2023" },
              { award: "Graduate Clinical Research Award, FAMU/AbbVie Science Research Forum", year: "2022" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, padding: "8px 0", borderBottom: "1px solid rgba(58,50,40,0.04)" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#3a3228" }}>
                  {a.award}
                </span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#8B4513", fontWeight: 500 }}>
                  {a.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ CONTACT ═══════════ */}
      <Section id="contact" style={{ padding: "80px 0", background: "rgba(255,255,255,0.4)" }}>
        <div style={containerStyle}>
          <SectionLabel text="Contact" />
          <SectionTitle text="Get in Touch" />
          <Divider />

          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228", marginBottom: 32, maxWidth: 580 }}>
            I welcome collaborations, consulting inquiries, speaking invitations, and questions from fellow
            researchers, students, or public health professionals. Please feel free to reach out through any
            of the channels below.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Email", value: "misugmaintain@gmail.com", href: "mailto:misugmaintain@gmail.com" },
              { label: "Phone", value: "(850) 960-6609", href: "tel:+18509606609" },
              { label: "LinkedIn", value: "linkedin.com/in/olumide-arigbede", href: "https://www.linkedin.com/in/olumide-arigbede" },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                <span style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "11.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8B4513",
                  fontWeight: 600,
                  minWidth: 72,
                }}>
                  {label}
                </span>
                <a href={href} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", color: "#2c2520", textDecoration: "none" }}>
                  {value}
                </a>
              </div>
            ))}
          </div>

          {/* Memberships */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c2520", marginBottom: 14 }}>
              Professional Affiliations
            </h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.8 }}>
              American Association of Cancer Research (AACR) · American Society of Clinical Oncology (ASCO) · American
              Statistical Association (ASA) · American Public Health Association (APHA) · International Genetic Epidemiology
              Society (IGES) · American Society of Hematology (ASH) · Council of State and Territorial Epidemiologists (CSTE) ·
              Cancer Research and Education (CaRE2)
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ padding: "48px 0 32px 0", borderTop: "1px solid rgba(58,50,40,0.08)" }}>
        <div style={containerStyle}>
          <div className="footer-cols" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
            <div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: "#2c2520", marginBottom: 6 }}>
                Olumide M. Arigbede, DrPH, MPH
              </p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#7a7068" }}>
                Health Scientist · Biostatistician · Epidemiologist
              </p>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["LinkedIn", "Google Scholar", "ResearchGate"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "12.5px",
                    color: "#8B4513",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "11.5px",
            color: "#9a8e82",
            marginTop: 32,
            textAlign: "center",
            letterSpacing: "0.04em",
          }}>
            © {new Date().getFullYear()} Olumide M. Arigbede. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
