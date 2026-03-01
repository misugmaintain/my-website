import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  "Home", "About", "Experience", "Research", "Publications",
  "Teaching", "Events", "Articles", "Opportunities", "Podcasts", "Scholarship", "Contact"
];

const NAV_IDS = {
  Home: "home",
  About: "about",
  Experience: "experience",
  Research: "research",
  Publications: "publications",
  Teaching: "teaching",
  Events: "events",
  Articles: "articles",
  Opportunities: "opportunities",
  Podcasts: "podcasts",
  Scholarship: "scholarship",
  Contact: "contact",
};

// ════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════

const EVENTS_DATA = [
  {
    title: "American Public Health Association (APHA) Annual Meeting",
    type: "Conference",
    date: "November 2025",
    location: "Washington, DC",
    status: "past",
    role: "Presenter and Moderator",
    description: "Presented research on social support systems and future aspirations among pregnant adolescents. Also moderated a few sessions in public health statistics and epidemiology.",
  },
  {
    title: "SUNY Biostatistics & Data Science Summit",
    type: "Summit",
    date: "September 2025",
    location: "Brooklyn, NY",
    status: "past",
    role: "Organizer & Speaker",
    description: "Co-organized an institutional summit on integrating machine learning with traditional biostatistical approaches in clinical research.",
  },
  {
    title: "John Ruffin Young Investigator Award Presentation",
    type: "Conference",
    date: "2024",
    location: "Xavier University Health Disparities Conference",
    status: "past",
    role: "Award Recipient & Presenter",
    description: "Received the Young Investigator Award and presented research on racial disparities in mutational burden among metastatic prostate cancer patients.",
  },
  {
    title: "ABRCMS Innovation Programs",
    type: "Conference",
    date: "2024",
    location: "Washington, DC",
    status: "past",
    role: "Leadership Development Academy Awardee",
    description: "Selected for the Leadership Development Academy at the Annual Biomedical Research Conference for Minoritized Scientists.",
  },
  {
    title: "9th Annual HBCU Climate Change Conference",
    type: "Conference",
    date: "2023",
    location: "New Orleans, LA",
    status: "past",
    role: "Presenter & Award Recipient",
    description: "Received the Deep South Center for Environmental Justice Award for research on environmental public health.",
  },
  {
    title: "FAMU/AbbVie Science Research Forum",
    type: "Research Forum",
    date: "2022",
    location: "Tallahassee, FL",
    status: "past",
    role: "Presenter",
    description: "Received Best Graduate Clinical Research Award for epidemiological research presentation.",
  },
];

const ARTICLES_DATA = [
  {
    title: "Understanding Syndromic Surveillance: Why Emergency Department Data, Laboratory Data, and Mortality Data Matter",
    date: "February 2026",
    category: "Public Health",
    readTime: "6 min read",
    excerpt: "Syndromic surveillance uses real-time health data, primarily from emergency department visits, to detect disease outbreaks earlier than traditional reporting methods. Here is why this approach is transforming public health response.",
    content: `Syndromic surveillance represents a paradigm shift in how public health agencies detect and respond to disease outbreaks, even right from the community level. Unlike traditional surveillance, which relies on confirmed laboratory diagnoses, syndromic surveillance analyzes pre-diagnostic data, such as chief complaints, discharge diagnoses, and other clinical indicators, to identify potential outbreaks in near real-time.\n\nDuring my time at the CDC's National Syndromic Surveillance Program, I worked extensively with emergency department data from across the United States. What struck me most was the power of timeliness: syndromic systems can flag or censor unusual patterns days or even weeks before traditional reporting systems would detect them.\n\nThe implications are profound. Earlier detection means earlier response, which can translate into lives saved and resources deployed more efficiently. As we continue to face emerging infectious disease threats, investing in and refining these surveillance systems remains one of our most important public health priorities.\n\nKey takeaway: Public health practitioners and policymakers should advocate for continued investment in syndromic surveillance infrastructure, including data quality improvements and workforce training in these methodologies.`,
  },
  {
    title: "Racial Disparities in Cancer Genomics: What the Data Says",
    date: "January 2026",
    category: "Cancer Epidemiology",
    readTime: "8 mins read",
    excerpt: "Genomic databases have revealed significant differential racial distribution in mutational burden among cancer patients. This piece explores the evidence, the underlying factors, and what it means for precision medicine.",
    content: `The promise of precision medicine, which simply means tailoring treatment to an individual's genetic profile, depends fundamentally on having representative genomic data. Unfortunately, most large-scale genomic studies have disproportionately enrolled participants, particularly those of European ancestry, leaving significant gaps in our understanding of cancer genomics across diverse populations.\n\nOur recent analysis of the AACR Project GENIE database revealed that mutational burden among patients with metastatic prostate cancer differed significantly by race in three key genes. These findings underscore a critical point: genomic-guided treatment strategies developed primarily from data on one population may not serve all patients equally.\n\nAddressing this requires action on multiple fronts. Actions include increasing diversity in genomic research, developing evidence-based analytical methods that account for population-specific variation, and ensuring that the benefits of precision medicine are equitably distributed.\n\nFor researchers and clinicians: consider how the demographic composition of your study populations may influence the generalizability of your findings. Diversifying enrollment is not just an equity issue — it is a scientific imperative.`,
  },
  {
    title: "A Beginner's Guide to Biostatistics in Public Health Research",
    date: "December 2025",
    category: "Biostatistics",
    readTime: "4 mins read",
    excerpt: "For students and early-career professionals entering public health, biostatistics can feel intimidating. This guide breaks down the essential concepts and why they matter for evidence-based practice.",
    content: `Biostatistics is the backbone of evidence-based public health science. Whether you are evaluating a vaccination program, investigating an outbreak, or assessing health disparities, statistical methods provide the framework for drawing valid conclusions from data.\n\nAt its core, biostatistics helps us answer a simple question: is what we are observing real, or could it have happened by chance? Hypothesis testing, confidence intervals, and p-values are all tools designed to help us make this determination rigorously.\n\nFrom my experience teaching graduate students, I have realized that the biggest barrier is not mathematical ability — it is connecting abstract concepts to real-world applications. When students see how a logistic regression model can identify risk factors for a disease, or how survival analysis can compare treatment outcomes, the concepts come alive.\n\nMy advice to students: start with the research question, not the method. Understand what you are trying to learn, and the appropriate statistical approach will follow. Build your skills in R or SAS or Python early. Hands-on practice with real datasets is the fastest path to competence.`,
  },
];

const OPPORTUNITIES_DATA = [
  {
    title: "CDC Steven M. Teutsch Prevention Effectiveness Fellowship",
    org: "Centers for Disease Control and Prevention",
    type: "Fellowship",
    deadline: "March 2026",
    status: "active",
    url: "https://www.cdc.gov/pef/index.html",
    description: "Two-year fellowship for doctoral-level scientists to apply advanced methods of decision and economic sciences to public health issues at CDC.",
    eligibility: "Doctoral degree in epidemiology, biostatistics, economics, or related field",
  },
  {
    title: "ORISE Research Participation Program — FDA",
    org: "Oak Ridge Institute for Science and Education",
    type: "Fellowship",
    deadline: "Rolling",
    status: "active",
    url: "https://orise.orau.gov/fda/",
    description: "Research opportunities at the FDA for recent graduates and postdoctoral scientists in epidemiology, biostatistics, and regulatory science.",
    eligibility: "Recent graduates or postdoctoral researchers in relevant fields",
  },
  {
    title: "EIS Officer Program",
    org: "Centers for Disease Control and Prevention",
    type: "Fellowship",
    deadline: "Annually (Fall)",
    status: "active",
    url: "https://www.cdc.gov/eis/index.html",
    description: "The Epidemic Intelligence Service is a two-year postgraduate program of applied epidemiology at the CDC. Officers are on the frontlines of public health.",
    eligibility: "Doctoral degree (PhD, DrPH, MD, DVM, etc.) or master's with relevant experience",
  },
  {
    title: "CSTE Applied Epidemiology Fellowship",
    org: "Council of State and Territorial Epidemiologists",
    type: "Fellowship",
    deadline: "Annually (Spring)",
    status: "active",
    url: "https://www.cste.org/page/AEF",
    description: "Two-year fellowship placing epidemiologists in state and local health departments to build workforce capacity.",
    eligibility: "Master's or doctoral degree in epidemiology or related field",
  },
  {
    title: "NIH Biostatistics Summer Internship Program",
    org: "National Institutes of Health",
    type: "Internship",
    deadline: "March 2026",
    status: "active",
    url: "https://www.training.nih.gov/programs/sip",
    description: "Summer research internship for undergraduate and graduate students interested in biostatistics and data science at NIH.",
    eligibility: "Enrolled undergraduate or graduate students in statistics, biostatistics, or related fields",
  },
  {
    title: "ASA/NSF/BLS Fellowship Program",
    org: "American Statistical Association",
    type: "Fellowship",
    deadline: "Annually",
    status: "active",
    url: "https://www.amstat.org/your-career/asa-fellowships-and-grants",
    description: "Research fellowship at federal statistical agencies for early-career statisticians and data scientists.",
    eligibility: "Recent doctoral graduates in statistics or biostatistics",
  },
];

const PODCASTS_DATA = [
  {
    title: "The Role of Biostatistics in Modern Medicine",
    guest: "Coming Soon",
    date: "March 2026",
    status: "upcoming",
    description: "An in-depth conversation on how biostatistical methods are shaping clinical decision-making and precision medicine.",
    tags: ["Biostatistics", "Medicine", "AI/ML"],
  },
  {
    title: "Navigating Careers in Public Health Epidemiology",
    guest: "Coming Soon",
    date: "April 2026",
    status: "upcoming",
    description: "A discussion on career pathways in epidemiology, from graduate school to federal agencies, with practical advice for emerging professionals.",
    tags: ["Career Development", "Epidemiology"],
  },
];

// ── Scholarship Programs Data ──
const SCHOLARSHIP_PROGRAMS = [
  {
    id: "research",
    title: "Research Scholarship",
    award: "₦100,000",
    slots: 3,
    icon: "📑",
    theme: "The Importance of AI/Robotics in Healthcare Systems in Nigeria",
    description:
      "The Research Scholarship supports rising final-year undergraduate students in Nigerian universities who demonstrate exceptional research aptitude. Selected scholars will produce a thorough research article on a designated annual theme, contributing original thought and rigorous analysis to the discourse on healthcare innovation in Nigeria.",
    eligibility: [
      "Must be an undergraduate student in a recognized Nigerian university, approaching the final year of their program (i.e., 300-level for 4-year programs, 400-level for 5-year programs, or equivalent)",
      "Must be enrolled in a health sciences, biomedical sciences, medicine, computer science, engineering, statistics, mathematics, or closely related discipline",
      "Must demonstrate academic merit with a minimum CGPA of 3.50/5.00 or Second Class Upper Division equivalent",
    ],
    requirements: [
      "Submit a research article on the 2025/2026 theme: \"The Future of Nigeria's Healthcare System: Assessing the Role of Artificial Intelligence and Robotics\"",
      "The article must be written in one of the following formats: a systematic review and meta-analysis, a review paper, or an original research article",
      "Alternatively, applicants may submit a relevant portion of their final-year project, provided it falls within the scholarship theme (AI/robotics in healthcare systems)",
      "All submissions must follow APA (7th edition) formatting and citation style",
      "Submissions must be entirely the applicant's own work — absolutely no use of AI writing tools (e.g., ChatGPT, Gemini, Copilot, or similar), and zero tolerance for plagiarism of any kind. All submissions will be subjected to AI-detection and plagiarism screening",
      "Minimum article length: 3,000 words (excluding references and appendices)",
    ],
    documents: [
      "Research article or final-year project excerpt (PDF format)",
      "Unofficial academic transcript",
      "International passport (data page)",
      "Passport-sized photograph (white background, recent)",
      "Bank account details including sort code",
      "Two recommendation letters — one must be from the Head of Department (HOD) of the applicant's program, and the second from another faculty member in the department",
      "Current résumé or curriculum vitae",
    ],
  },
  {
    id: "innovation",
    title: "Innovation Scholarship",
    award: "₦100,000",
    slots: 3,
    icon: "💡",
    theme: "Innovative Solutions for Healthcare Challenges in Nigeria",
    description:
      "The Innovation Scholarship recognizes and rewards creative, forward-thinking undergraduate students in Nigerian universities who are developing practical and scalable solutions to real healthcare challenges. Selected scholars will receive funding to support the further development and refinement of their innovative ideas.",
    eligibility: [
      "Must be an undergraduate student in a recognized Nigerian university, approaching the final year of their program (i.e., 300-level for 4-year programs, 400-level for 5-year programs, or equivalent)",
      "Must be enrolled in any discipline — the scholarship welcomes cross-disciplinary innovation (health sciences, engineering, computer science, social sciences, business, etc.)",
      "Must demonstrate academic merit with a minimum CGPA of 3.50/5.00 or Second Class Upper Division equivalent",
    ],
    requirements: [
      "Submit a detailed innovation proposal (minimum 1,500 words) describing the problem being addressed, the proposed solution, its feasibility, scalability, and expected impact on healthcare delivery in Nigeria",
      "The proposal must include a clear implementation timeline, resource requirements, and a sustainability plan",
      "If the innovation involves technology (app, device, platform, etc.), include wireframes, diagrams, or prototypes where applicable",
      "Submissions must be entirely the applicant's own work — absolutely no use of AI writing tools, and zero tolerance for plagiarism",
      "All proposals must be formatted in APA (7th edition) style",
    ],
    documents: [
      "Innovation proposal document (PDF format)",
      "Unofficial academic transcript",
      "International passport (data page)",
      "Passport-sized photograph (white background, recent)",
      "Bank account details including sort code",
      "Two recommendation letters — one must be from the Head of Department (HOD) of the applicant's program, and the second from another faculty member in the department",
      "Current résumé or curriculum vitae",
    ],
  },
];

// ════════════════════════════════════════════
// SHARED COMPONENTS
// ════════════════════════════════════════════

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

function Nav({ active, scrolled, menuOpen, setMenuOpen }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "10px 32px" : "16px 32px",
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

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }} className="desktop-nav">
        {SECTIONS.filter((s) => s !== "Home").map((s) => (
          <a
            key={s}
            href={`#${NAV_IDS[s]}`}
            style={{
              fontSize: "12px",
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
              <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: "1.5px", background: "#8B4513", borderRadius: "1px" }} />
            )}
          </a>
        ))}
      </div>

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", zIndex: 110 }}
        aria-label="Toggle menu"
      >
        <div style={{ width: 24, height: 18, position: "relative" }}>
          <span style={{ display: "block", width: 24, height: 2, background: "#2c2520", borderRadius: 2, position: "absolute", top: menuOpen ? 8 : 0, transform: menuOpen ? "rotate(45deg)" : "none", transition: "all 0.3s" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#2c2520", borderRadius: 2, position: "absolute", top: 8, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#2c2520", borderRadius: 2, position: "absolute", top: menuOpen ? 8 : 16, transform: menuOpen ? "rotate(-45deg)" : "none", transition: "all 0.3s" }} />
        </div>
      </button>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(250,247,243,0.98)", zIndex: 105, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, overflowY: "auto", padding: "80px 20px" }}>
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${NAV_IDS[s]}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "17px", color: "#2c2520", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Source Sans 3', sans-serif", fontWeight: active === NAV_IDS[s] ? 600 : 400 }}
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Section({ id, children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)", ...style }}>
      {children}
    </section>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B4513", fontWeight: 600 }}>{text}</span>
    </div>
  );
}

function SectionTitle({ text }) {
  return <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 600, color: "#2c2520", margin: "0 0 32px 0", lineHeight: 1.25 }}>{text}</h2>;
}

function Divider() {
  return <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, #8B4513, rgba(139,69,19,0.2))", borderRadius: 1, margin: "0 0 32px 0" }} />;
}

function StatusBadge({ status, label }) {
  const colors = {
    upcoming: { bg: "rgba(34,139,34,0.08)", border: "rgba(34,139,34,0.2)", text: "#228B22" },
    past: { bg: "rgba(139,69,19,0.06)", border: "rgba(139,69,19,0.15)", text: "#8B4513" },
    active: { bg: "rgba(34,139,34,0.08)", border: "rgba(34,139,34,0.2)", text: "#228B22" },
    closed: { bg: "rgba(160,82,45,0.06)", border: "rgba(160,82,45,0.15)", text: "#A0522D" },
  };
  const c = colors[status] || colors.past;
  return (
    <span style={{
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: c.text,
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 20,
      padding: "3px 12px",
      whiteSpace: "nowrap",
    }}>
      {label || status}
    </span>
  );
}

function Tag({ label }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: "11.5px",
      color: "#5c5147",
      background: "rgba(139,69,19,0.05)",
      border: "1px solid rgba(139,69,19,0.1)",
      borderRadius: 16,
      padding: "3px 11px",
      letterSpacing: "0.02em",
    }}>
      {label}
    </span>
  );
}

function SkillTag({ label }) {
  return (
    <span style={{ display: "inline-block", fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#5c5147", background: "rgba(139,69,19,0.06)", border: "1px solid rgba(139,69,19,0.12)", borderRadius: "20px", padding: "5px 14px", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function InterestCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? "rgba(139,69,19,0.04)" : "rgba(255,255,255,0.6)", border: "1px solid rgba(58,50,40,0.08)", borderRadius: 12, padding: "28px 24px", transition: "all 0.35s ease", transform: hovered ? "translateY(-3px)" : "translateY(0)", boxShadow: hovered ? "0 8px 30px rgba(58,50,40,0.06)" : "none", cursor: "default" }}>
      <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
      <h4 style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: "#2c2520", margin: "0 0 8px 0" }}>{title}</h4>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068", lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

function PubEntry({ number, authors, year, title, journal, doi }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
      <span style={{ fontFamily: "'Lora', serif", fontSize: "14px", color: "#8B4513", fontWeight: 600, minWidth: 24, paddingTop: 2 }}>{number}.</span>
      <div>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", lineHeight: 1.65, color: "#3a3228", margin: 0 }}>
          {authors} ({year}). "{title}." <em>{journal}.</em>
        </p>
        {doi && <a href={doi} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#8B4513", textDecoration: "none", marginTop: 6, display: "inline-block", letterSpacing: "0.02em" }}>View Publication →</a>}
      </div>
    </div>
  );
}

function ExpEntry({ org, role, unit, period, highlights }) {
  return (
    <div style={{ padding: "28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h4 style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: "#2c2520", margin: "0 0 4px 0" }}>{org}</h4>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14.5px", color: "#8B4513", fontWeight: 500, margin: "0 0 2px 0" }}>{role}</p>
          {unit && <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#7a7068", margin: 0, fontStyle: "italic" }}>{unit}</p>}
        </div>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#9a8e82", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{period}</span>
      </div>
      {highlights && highlights.length > 0 && (
        <div style={{ marginTop: 14 }}>
          {highlights.map((h, i) => (
            <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "#5c5147", margin: "0 0 6px 0", paddingLeft: 14, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "#8B4513" }}>·</span>{h}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// NEW MODULE COMPONENTS
// ════════════════════════════════════════════

// ── Events ──
function EventCard({ event }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px 28px",
        background: hovered ? "rgba(139,69,19,0.03)" : "rgba(255,255,255,0.5)",
        border: "1px solid rgba(58,50,40,0.08)",
        borderRadius: 12,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 24px rgba(58,50,40,0.05)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <StatusBadge status={event.status} label={event.status === "upcoming" ? "Upcoming" : "Past"} />
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#9a8e82" }}>{event.date}</span>
      </div>
      <h4 style={{ fontFamily: "'Lora', serif", fontSize: "16.5px", fontWeight: 600, color: "#2c2520", margin: "0 0 6px 0", lineHeight: 1.35 }}>
        {event.title}
      </h4>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#8B4513", fontWeight: 500, margin: "0 0 4px 0" }}>
        {event.role}
      </p>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#7a7068", margin: "0 0 10px 0" }}>
        {event.location}
      </p>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.65, margin: 0 }}>
        {event.description}
      </p>
    </div>
  );
}

// ── Articles ──
function ArticleCard({ article, onRead }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        background: hovered ? "rgba(139,69,19,0.03)" : "rgba(255,255,255,0.5)",
        border: "1px solid rgba(58,50,40,0.08)",
        borderRadius: 12,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 24px rgba(58,50,40,0.05)" : "none",
        cursor: "pointer",
      }}
      onClick={onRead}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <Tag label={article.category} />
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", color: "#9a8e82" }}>
          {article.date} · {article.readTime}
        </span>
      </div>
      <h4 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c2520", margin: "0 0 12px 0", lineHeight: 1.35 }}>
        {article.title}
      </h4>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14.5px", color: "#5c5147", lineHeight: 1.7, margin: "0 0 16px 0" }}>
        {article.excerpt}
      </p>
      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#8B4513", fontWeight: 600, letterSpacing: "0.03em" }}>
        Read Article →
      </span>
    </div>
  );
}

function ArticleReader({ article, onClose }) {
  const [showCitation, setShowCitation] = useState(false);
  const [copied, setCopied] = useState(false);

  const citationAPA = `Arigbede, O. M. (${article.date.split(" ")[1] || new Date().getFullYear()}). ${article.title}. The Olu Arigbede — Insights & Commentary. Retrieved from https://www.theoluarigbede.com/#articles`;
  const citationBibTeX = `@article{arigbede${article.date.split(" ")[1] || "2026"},\n  author = {Arigbede, Olumide M.},\n  title = {${article.title}},\n  journal = {The Olu Arigbede — Insights \\& Commentary},\n  year = {${article.date.split(" ")[1] || new Date().getFullYear()}},\n  month = {${article.date.split(" ")[0]}},\n  url = {https://www.theoluarigbede.com/#articles}\n}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(44,37,32,0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "60px 20px", overflowY: "auto" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#faf7f3", borderRadius: 16, maxWidth: 720, width: "100%", padding: "48px 40px", position: "relative", boxShadow: "0 20px 60px rgba(44,37,32,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#7a7068", lineHeight: 1 }}
          aria-label="Close"
        >
          ×
        </button>

        <Tag label={article.category} />
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, color: "#2c2520", margin: "16px 0 8px 0", lineHeight: 1.3 }}>
          {article.title}
        </h2>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#9a8e82", marginBottom: 28 }}>
          {article.date} · {article.readTime} · By Dr. Olumide M. Arigbede
        </p>
        <div style={{ width: 40, height: 2, background: "#8B4513", borderRadius: 1, marginBottom: 28 }} />

        {article.content.split("\n\n").map((para, i) => (
          <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.85, color: "#3a3228", margin: "0 0 20px 0" }}>
            {para}
          </p>
        ))}

        {/* Citation block */}
        <div style={{ marginTop: 36, borderTop: "1px solid rgba(58,50,40,0.1)", paddingTop: 24 }}>
          <button
            onClick={() => setShowCitation(!showCitation)}
            style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600,
              color: "#8B4513", background: "rgba(139,69,19,0.06)",
              border: "1px solid rgba(139,69,19,0.15)", borderRadius: 6,
              padding: "9px 18px", cursor: "pointer", letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
          >
            {showCitation ? "Hide Citation" : "Cite This Article"}
          </button>

          {showCitation && (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B4513" }}>APA Format</span>
                  <button onClick={() => handleCopy(citationAPA)} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", color: copied ? "#228B22" : "#8B4513", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#3a3228", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.08)", borderRadius: 8, padding: "14px 16px", lineHeight: 1.65 }}>
                  {citationAPA}
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B4513" }}>BibTeX</span>
                  <button onClick={() => handleCopy(citationBibTeX)} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", color: "#8B4513", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                    Copy
                  </button>
                </div>
                <pre style={{ fontFamily: "monospace", fontSize: "12.5px", color: "#3a3228", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.08)", borderRadius: 8, padding: "14px 16px", lineHeight: 1.6, whiteSpace: "pre-wrap", margin: 0 }}>
                  {citationBibTeX}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Opportunities ──
function OpportunityCard({ opp }) {
  const [hovered, setHovered] = useState(false);
  const typeColors = {
    Fellowship: { bg: "rgba(70,130,180,0.08)", border: "rgba(70,130,180,0.2)", text: "#4682B4" },
    Internship: { bg: "rgba(107,142,35,0.08)", border: "rgba(107,142,35,0.2)", text: "#6B8E23" },
    Grant: { bg: "rgba(139,69,19,0.08)", border: "rgba(139,69,19,0.2)", text: "#8B4513" },
    Job: { bg: "rgba(128,0,128,0.06)", border: "rgba(128,0,128,0.15)", text: "#800080" },
  };
  const tc = typeColors[opp.type] || typeColors.Fellowship;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px 28px",
        background: hovered ? "rgba(139,69,19,0.03)" : "rgba(255,255,255,0.5)",
        border: "1px solid rgba(58,50,40,0.08)",
        borderRadius: 12,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 24px rgba(58,50,40,0.05)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <span style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", color: tc.text, background: tc.bg, border: `1px solid ${tc.border}`,
          borderRadius: 20, padding: "3px 12px",
        }}>
          {opp.type}
        </span>
        <StatusBadge status={opp.status} label={opp.status === "active" ? "Active" : "Closed"} />
      </div>

      <h4 style={{ fontFamily: "'Lora', serif", fontSize: "16.5px", fontWeight: 600, color: "#2c2520", margin: "0 0 4px 0", lineHeight: 1.35 }}>
        {opp.title}
      </h4>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#8B4513", fontWeight: 500, margin: "0 0 8px 0" }}>
        {opp.org}
      </p>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.65, margin: "0 0 10px 0" }}>
        {opp.description}
      </p>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#7a7068", margin: "0 0 4px 0" }}>
        <strong style={{ color: "#5c5147" }}>Eligibility:</strong> {opp.eligibility}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#9a8e82" }}>
          Deadline: {opp.deadline}
        </span>
        {opp.url && (
          <a href={opp.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#8B4513", textDecoration: "none", fontWeight: 600, letterSpacing: "0.03em" }}>
            Learn More →
          </a>
        )}
      </div>
    </div>
  );
}

// ── Podcasts ──
function PodcastCard({ episode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "28px",
        background: hovered ? "rgba(139,69,19,0.03)" : "rgba(255,255,255,0.5)",
        border: "1px solid rgba(58,50,40,0.08)",
        borderRadius: 12,
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 24px rgba(58,50,40,0.05)" : "none",
      }}
    >
      {/* Video placeholder */}
      <div style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: 8,
        background: "linear-gradient(145deg, rgba(44,37,32,0.06), rgba(139,69,19,0.04))",
        border: "1px solid rgba(58,50,40,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        gap: 8,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(139,69,19,0.08)", border: "1px solid rgba(139,69,19,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#8B4513" style={{ marginLeft: 2, opacity: 0.6 }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11px", color: "#9a8e82", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {episode.status === "upcoming" ? "Coming Soon" : "Watch Episode"}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <StatusBadge status={episode.status} label={episode.status === "upcoming" ? "Upcoming" : "Available"} />
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", color: "#9a8e82" }}>{episode.date}</span>
      </div>

      <h4 style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: "#2c2520", margin: "0 0 4px 0", lineHeight: 1.35 }}>
        {episode.title}
      </h4>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#8B4513", fontWeight: 500, margin: "0 0 10px 0" }}>
        Guest: {episode.guest}
      </p>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.65, margin: "0 0 12px 0" }}>
        {episode.description}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {episode.tags.map((t) => <Tag key={t} label={t} />)}
      </div>
    </div>
  );
}

// ── Contact Form ──
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const inputStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "14.5px",
    color: "#2c2520",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(58,50,40,0.15)",
    borderRadius: 8,
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.25s",
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("incomplete");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/maqdznwd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "32px", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(58,50,40,0.08)", borderRadius: 12 }}>
      <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", margin: "0 0 6px 0" }}>
        Send a Message
      </h3>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068", margin: "0 0 24px 0" }}>
        Fill out the form below and I will get back to you as soon as possible.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5c5147", display: "block", marginBottom: 6 }}>
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Your full name"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#8B4513")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")}
          />
        </div>
        <div>
          <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5c5147", display: "block", marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="your.email@example.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#8B4513")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")}
          />
        </div>
        <div>
          <label style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5c5147", display: "block", marginBottom: 6 }}>
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={handleChange("message")}
            placeholder="How can I help you?"
            rows={5}
            style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
            onFocus={(e) => (e.target.style.borderColor = "#8B4513")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#fff", background: status === "sending" ? "#7a7068" : "#2c2520",
            border: "none", borderRadius: 6, padding: "14px 28px",
            cursor: status === "sending" ? "wait" : "pointer",
            transition: "background 0.3s", alignSelf: "flex-start",
          }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#228B22", margin: 0, fontWeight: 500 }}>
            Thank you! Your message has been sent successfully. I will be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#B22222", margin: 0 }}>
            Something went wrong. Please try again or email me directly.
          </p>
        )}
        {status === "incomplete" && (
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#B8860B", margin: 0 }}>
            Please fill in all fields before submitting.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Scholarship Program Detail Viewer ──
function ScholarshipDetail({ program, onClose, onApply }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const listItemStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "14px",
    lineHeight: 1.75,
    color: "#3a3228",
    margin: "0 0 10px 0",
    paddingLeft: 16,
    position: "relative",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(44,37,32,0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "50px 20px", overflowY: "auto" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#faf7f3", borderRadius: 16, maxWidth: 760, width: "100%", padding: "44px 40px", position: "relative", boxShadow: "0 20px 60px rgba(44,37,32,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#7a7068", lineHeight: 1 }} aria-label="Close">×</button>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>{program.icon}</span>
          <div>
            <StatusBadge status="active" label="Accepting Applications" />
          </div>
        </div>

        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, color: "#2c2520", margin: "12px 0 6px 0", lineHeight: 1.3 }}>
          {program.title}
        </h2>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#8B4513", fontWeight: 600, marginBottom: 6 }}>
          Award: {program.award} per recipient · {program.slots} scholars selected annually
        </p>
        <div style={{ width: 40, height: 2, background: "#8B4513", borderRadius: 1, margin: "16px 0 24px 0" }} />

        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", lineHeight: 1.8, color: "#3a3228", margin: "0 0 24px 0" }}>
          {program.description}
        </p>

        {/* Theme */}
        <div style={{ padding: "18px 22px", background: "rgba(139,69,19,0.04)", border: "1px solid rgba(139,69,19,0.12)", borderRadius: 10, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B4513" }}>2025/2026 Theme</span>
          <p style={{ fontFamily: "'Lora', serif", fontSize: "15.5px", fontWeight: 500, color: "#2c2520", lineHeight: 1.55, margin: "8px 0 0 0" }}>
            {program.theme}
          </p>
        </div>

        {/* Eligibility */}
        <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c2520", margin: "0 0 14px 0" }}>Eligibility Criteria</h3>
        {program.eligibility.map((item, i) => (
          <p key={i} style={listItemStyle}>
            <span style={{ position: "absolute", left: 0, color: "#8B4513", fontWeight: 600 }}>{i + 1}.</span>
            {item}
          </p>
        ))}

        {/* Requirements */}
        <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c2520", margin: "28px 0 14px 0" }}>Submission Requirements</h3>
        {program.requirements.map((item, i) => (
          <p key={i} style={listItemStyle}>
            <span style={{ position: "absolute", left: 0, color: "#8B4513", fontWeight: 600 }}>·</span>
            {item}
          </p>
        ))}

        {/* Required Documents */}
        <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c2520", margin: "28px 0 14px 0" }}>Required Documents</h3>
        {program.documents.map((item, i) => (
          <p key={i} style={listItemStyle}>
            <span style={{ position: "absolute", left: 0, color: "#8B4513", fontWeight: 600 }}>{i + 1}.</span>
            {item}
          </p>
        ))}

        {/* Important Notice */}
        <div style={{ padding: "18px 22px", background: "rgba(178,34,34,0.04)", border: "1px solid rgba(178,34,34,0.12)", borderRadius: 10, marginTop: 28, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B22222" }}>Important Notice</span>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#3a3228", lineHeight: 1.7, margin: "8px 0 0 0" }}>
            All submissions will be screened for plagiarism and AI-generated content. Any application found to contain work produced by AI tools (including but not limited to ChatGPT, Gemini, Copilot, or similar platforms) or that contains plagiarized material will be immediately disqualified. Academic integrity is non-negotiable.
          </p>
        </div>

        <button
          onClick={() => { onClose(); onApply(program.id); }}
          style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#fff", background: "#2c2520", border: "none", borderRadius: 6,
            padding: "14px 32px", cursor: "pointer", transition: "background 0.3s",
          }}
        >
          Apply for This Scholarship →
        </button>
      </div>
    </div>
  );
}

// ── Scholarship Application Form ──
function ScholarshipApplicationForm({ programId, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    department: "",
    yearOfStudy: "",
    cgpa: "",
    program: programId || "research",
    articleType: "",
    abstractSummary: "",
  });
  const [files, setFiles] = useState({
    submission: null,
    transcript: null,
    passport: null,
    photo: null,
    bankDetails: null,
    recLetterHOD: null,
    recLetterFaculty: null,
    resume: null,
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const inputStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "14px",
    color: "#2c2520",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(58,50,40,0.15)",
    borderRadius: 8,
    padding: "11px 14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.25s",
  };

  const labelStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "11.5px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#5c5147",
    display: "block",
    marginBottom: 5,
  };

  const fileInputStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "13px",
    color: "#5c5147",
    background: "rgba(255,255,255,0.5)",
    border: "1.5px dashed rgba(139,69,19,0.2)",
    borderRadius: 8,
    padding: "12px 14px",
    width: "100%",
    cursor: "pointer",
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    if (file) setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async () => {
    // Validate required text fields
    const requiredText = ["fullName", "email", "phone", "university", "department", "yearOfStudy", "cgpa", "abstractSummary"];
    if (formData.program === "research") requiredText.push("articleType");
    const missingText = requiredText.some((f) => !formData[f].trim());

    // Validate required files
    const requiredFiles = ["submission", "transcript", "passport", "photo", "bankDetails", "recLetterHOD", "recLetterFaculty", "resume"];
    const missingFiles = requiredFiles.some((f) => !files[f]);

    if (missingText || missingFiles) {
      setStatus("incomplete");
      return;
    }

    setStatus("sending");

    try {
      const fd = new FormData();
      fd.append("_subject", `Scholarship Application: ${formData.program === "research" ? "Research Scholarship" : "Innovation Scholarship"} — ${formData.fullName}`);
      fd.append("Full Name", formData.fullName);
      fd.append("Email", formData.email);
      fd.append("Phone", formData.phone);
      fd.append("University", formData.university);
      fd.append("Department/Program", formData.department);
      fd.append("Year of Study", formData.yearOfStudy);
      fd.append("CGPA", formData.cgpa);
      fd.append("Scholarship Program", formData.program === "research" ? "Research Scholarship" : "Innovation Scholarship");
      if (formData.program === "research") {
        fd.append("Article Type", formData.articleType);
      }
      fd.append("Abstract/Summary", formData.abstractSummary);

      // Attach all files
      fd.append("Research Article or Proposal", files.submission);
      fd.append("Unofficial Transcript", files.transcript);
      fd.append("International Passport", files.passport);
      fd.append("Passport Photograph", files.photo);
      fd.append("Bank Details", files.bankDetails);
      fd.append("Recommendation Letter (HOD)", files.recLetterHOD);
      fd.append("Recommendation Letter (Faculty)", files.recLetterFaculty);
      fd.append("Resume/CV", files.resume);

      // NOTE: Replace this Formspree endpoint with a dedicated scholarship form endpoint.
      // Formspree paid plans support file uploads. You may also use an alternative
      // form backend such as Getform, Basin, or a custom server.
      const res = await fetch("https://formspree.io/f/maqdznwd", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const programLabel = formData.program === "research" ? "Research Scholarship" : "Innovation Scholarship";

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(44,37,32,0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 16px", overflowY: "auto" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#faf7f3", borderRadius: 16, maxWidth: 720, width: "100%", padding: "40px 36px", position: "relative", boxShadow: "0 20px 60px rgba(44,37,32,0.15)", marginBottom: 40 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: "#7a7068", lineHeight: 1 }} aria-label="Close">×</button>

        <StatusBadge status="active" label={programLabel} />
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 600, color: "#2c2520", margin: "14px 0 6px 0", lineHeight: 1.3 }}>
          Scholarship Application
        </h2>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068", margin: "0 0 8px 0" }}>
          The Olu Arigbede Scholarship · 2025/2026 Cycle
        </p>
        <div style={{ width: 40, height: 2, background: "#8B4513", borderRadius: 1, margin: "12px 0 28px 0" }} />

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "22px", fontWeight: 600, color: "#228B22", margin: "0 0 12px 0" }}>Application Submitted Successfully</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", color: "#3a3228", lineHeight: 1.7 }}>
              Thank you for applying to the {programLabel}. Your application and all supporting documents have been received. You will be notified of the outcome via the email address you provided.
            </p>
            <button onClick={onClose} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "#2c2520", border: "none", borderRadius: 6, padding: "12px 28px", cursor: "pointer", marginTop: 24 }}>
              Close
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Scholarship Program Selector */}
            <div>
              <label style={labelStyle}>Scholarship Program</label>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { key: "research", label: "Research Scholarship" },
                  { key: "innovation", label: "Innovation Scholarship" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFormData((prev) => ({ ...prev, program: key }))}
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", fontWeight: formData.program === key ? 600 : 400,
                      color: formData.program === key ? "#fff" : "#5c5147",
                      background: formData.program === key ? "#8B4513" : "transparent",
                      border: `1.5px solid ${formData.program === key ? "#8B4513" : "rgba(58,50,40,0.2)"}`,
                      borderRadius: 24, padding: "8px 18px", cursor: "pointer", transition: "all 0.25s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Personal Information ── */}
            <div style={{ padding: "16px 0 0 0", borderTop: "1px solid rgba(58,50,40,0.06)" }}>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: "#2c2520" }}>Personal Information</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="scholarship-form-grid">
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" value={formData.fullName} onChange={handleChange("fullName")} placeholder="Surname First, e.g., Arigbede Olumide" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={formData.email} onChange={handleChange("email")} placeholder="your.email@university.edu.ng" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={formData.phone} onChange={handleChange("phone")} placeholder="+234 800 000 0000" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
              <div>
                <label style={labelStyle}>CGPA (on a 5.0 scale)</label>
                <input type="text" value={formData.cgpa} onChange={handleChange("cgpa")} placeholder="e.g., 4.25" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
            </div>

            {/* ── Academic Information ── */}
            <div style={{ padding: "16px 0 0 0", borderTop: "1px solid rgba(58,50,40,0.06)" }}>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: "#2c2520" }}>Academic Information</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="scholarship-form-grid">
              <div>
                <label style={labelStyle}>University</label>
                <input type="text" value={formData.university} onChange={handleChange("university")} placeholder="e.g., University of Lagos" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
              <div>
                <label style={labelStyle}>Department / Program</label>
                <input type="text" value={formData.department} onChange={handleChange("department")} placeholder="e.g., Computer Science" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
              <div>
                <label style={labelStyle}>Current Year / Level</label>
                <input type="text" value={formData.yearOfStudy} onChange={handleChange("yearOfStudy")} placeholder="e.g., 300-Level (approaching final year)" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#8B4513")} onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")} />
              </div>
              {formData.program === "research" && (
                <div>
                  <label style={labelStyle}>Article Type</label>
                  <select
                    value={formData.articleType}
                    onChange={handleChange("articleType")}
                    style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
                  >
                    <option value="">Select article type...</option>
                    <option value="Systematic Review and Meta-Analysis">Systematic Review and Meta-Analysis</option>
                    <option value="Review Paper">Review Paper</option>
                    <option value="Original Research Article">Original Research Article</option>
                    <option value="Final-Year Project Excerpt">Final-Year Project Excerpt (within theme)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Abstract / Summary */}
            <div>
              <label style={labelStyle}>
                {formData.program === "research" ? "Abstract / Research Summary" : "Innovation Proposal Summary"}
              </label>
              <textarea
                value={formData.abstractSummary}
                onChange={handleChange("abstractSummary")}
                placeholder={formData.program === "research"
                  ? "Provide a brief abstract of your research article (200–300 words)..."
                  : "Briefly describe your innovation, the problem it addresses, and its expected impact (200–400 words)..."
                }
                rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                onFocus={(e) => (e.target.style.borderColor = "#8B4513")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(58,50,40,0.15)")}
              />
            </div>

            {/* ── Document Uploads ── */}
            <div style={{ padding: "16px 0 0 0", borderTop: "1px solid rgba(58,50,40,0.06)" }}>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: "#2c2520" }}>Document Uploads</span>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#7a7068", margin: "4px 0 0 0" }}>All documents must be uploaded in PDF format unless otherwise stated. Maximum file size: 10 MB per file.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="scholarship-form-grid">
              <div>
                <label style={labelStyle}>
                  {formData.program === "research" ? "Research Article / Project Excerpt (PDF)" : "Innovation Proposal (PDF)"}
                </label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange("submission")} style={fileInputStyle} />
                {files.submission && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.submission.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>Unofficial Academic Transcript (PDF)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange("transcript")} style={fileInputStyle} />
                {files.transcript && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.transcript.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>International Passport — Data Page (PDF/Image)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange("passport")} style={fileInputStyle} />
                {files.passport && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.passport.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>Passport Photograph (White Background)</label>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange("photo")} style={fileInputStyle} />
                {files.photo && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.photo.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>Bank Account Details with Sort Code (PDF/Image)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange("bankDetails")} style={fileInputStyle} />
                {files.bankDetails && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.bankDetails.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>Résumé / Curriculum Vitae (PDF)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange("resume")} style={fileInputStyle} />
                {files.resume && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.resume.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>Recommendation Letter — HOD (PDF)</label>
                <input type="file" accept=".pdf" onChange={handleFileChange("recLetterHOD")} style={fileInputStyle} />
                {files.recLetterHOD && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.recLetterHOD.name}</span>}
              </div>
              <div>
                <label style={labelStyle}>Recommendation Letter — Faculty Member (PDF)</label>
                <input type="file" accept=".pdf" onChange={handleFileChange("recLetterFaculty")} style={fileInputStyle} />
                {files.recLetterFaculty && <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#228B22", marginTop: 4, display: "block" }}>✓ {files.recLetterFaculty.name}</span>}
              </div>
            </div>

            {/* Declaration */}
            <div style={{ padding: "18px 22px", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.1)", borderRadius: 10 }}>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#3a3228", lineHeight: 1.7, margin: 0 }}>
                By submitting this application, I affirm that all information and documents provided are accurate, authentic, and entirely my own work. I understand that any evidence of plagiarism, AI-generated content, or falsified documents will result in immediate disqualification and potential academic consequences.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#fff", background: status === "sending" ? "#7a7068" : "#2c2520",
                border: "none", borderRadius: 6, padding: "14px 32px",
                cursor: status === "sending" ? "wait" : "pointer",
                transition: "background 0.3s", alignSelf: "flex-start",
              }}
            >
              {status === "sending" ? "Submitting Application..." : "Submit Application"}
            </button>

            {status === "error" && (
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#B22222", margin: 0 }}>
                Something went wrong submitting your application. Please try again or contact Dr. Arigbede directly via the Contact section.
              </p>
            )}
            {status === "incomplete" && (
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#B8860B", margin: 0 }}>
                Please complete all required fields and upload all required documents before submitting.
              </p>
            )}
          </div>
        )}
      </div>
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
  const [readingArticle, setReadingArticle] = useState(null);
  const [eventFilter, setEventFilter] = useState("all");
  const [oppFilter, setOppFilter] = useState("all");
  const [viewingScholarship, setViewingScholarship] = useState(null);
  const [applyingScholarship, setApplyingScholarship] = useState(null);

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

  const containerStyle = { maxWidth: 820, margin: "0 auto", padding: "0 32px" };

  const filteredEvents = eventFilter === "all" ? EVENTS_DATA : EVENTS_DATA.filter((e) => e.status === eventFilter);
  const filteredOpps = oppFilter === "all" ? OPPORTUNITIES_DATA : OPPORTUNITIES_DATA.filter((o) => o.type.toLowerCase() === oppFilter);

  return (
    <div style={{ background: "#faf7f3", color: "#3a3228", minHeight: "100vh", position: "relative", fontFamily: "'Source Sans 3', sans-serif" }}>
      <GrainOverlay />

      {/* Dynamic favicon */}
      {(() => {
        if (typeof document !== "undefined") {
          const existing = document.querySelector("link[rel='icon']");
          if (existing) existing.remove();
          const canvas = document.createElement("canvas");
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#2c2520";
          ctx.fillRect(0, 0, 64, 64);
          ctx.fillStyle = "#faf7f3";
          ctx.font = "bold 36px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("OA", 32, 34);
          const link = document.createElement("link");
          link.rel = "icon";
          link.href = canvas.toDataURL("image/png");
          document.head.appendChild(link);
        }
        return null;
      })()}

      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        ::selection { background: rgba(139,69,19,0.15); }
        a:hover { opacity: 0.85; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .hero-grid { flex-direction: column !important; text-align: center !important; }
          .hero-grid > div:first-child { align-items: center !important; }
          .research-grid, .events-grid, .articles-grid, .opps-grid, .podcasts-grid, .scholarship-grid { grid-template-columns: 1fr !important; }
          .footer-cols { flex-direction: column !important; gap: 24px !important; }
          .scholarship-form-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      <Nav active={active} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Article reader overlay */}
      {readingArticle !== null && (
        <ArticleReader article={ARTICLES_DATA[readingArticle]} onClose={() => setReadingArticle(null)} />
      )}

      {/* Scholarship detail overlay */}
      {viewingScholarship !== null && (
        <ScholarshipDetail
          program={SCHOLARSHIP_PROGRAMS.find((p) => p.id === viewingScholarship)}
          onClose={() => setViewingScholarship(null)}
          onApply={(id) => setApplyingScholarship(id)}
        />
      )}

      {/* Scholarship application overlay */}
      {applyingScholarship !== null && (
        <ScholarshipApplicationForm
          programId={applyingScholarship}
          onClose={() => setApplyingScholarship(null)}
        />
      )}

      {/* ═══════════ HERO ═══════════ */}
      <Section id="home" style={{ paddingTop: 110, paddingBottom: 70 }}>
        <div style={containerStyle}>
          <div className="hero-grid" style={{ display: "flex", gap: 56, alignItems: "center" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B4513", fontWeight: 600, marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif" }}>
                Health Scientist · Biostatistician · Epidemiologist
              </div>
              <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 700, lineHeight: 1.12, color: "#2c2520", margin: "0 0 20px 0" }}>
                Olumide M.<br />Arigbede<span style={{ color: "#8B4513" }}>,</span>{" "}
                <span style={{ fontWeight: 400, fontStyle: "italic", fontSize: "0.72em" }}>DrPH, MPH</span>
              </h1>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "16px", lineHeight: 1.75, color: "#5c5147", maxWidth: 520, marginBottom: 32 }}>
                Biostatistical consultant and an academic at SUNY Downstate Health Sciences
                University, with over 8 years of expertise spanning the FDA, CDC, academic institutions, and
                state/local health departments. My work spans cancer and infectious disease epidemiology, computational genomics, mathematical modeling, predictive modeling, health disparities, research methods,
                and advanced biostatistics, and more recently, the application of AI and ML to population health events with the aim of transforming complex data into actionable public health insights.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#contact" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "#2c2520", padding: "13px 28px", borderRadius: 6, textDecoration: "none", transition: "background 0.3s" }}>Get in Touch</a>
                <a href="#publications" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2c2520", background: "transparent", padding: "13px 28px", borderRadius: 6, textDecoration: "none", border: "1.5px solid rgba(44,37,32,0.25)", transition: "border-color 0.3s" }}>Publications</a>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
                {[
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/dr-olumide-arigbede/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BzmdRxLStTuSvZpRvvjAjhw%3D%3D" },
                  { label: "Google Scholar", url: "https://scholar.google.com/citations?user=iNAHPDMAAAAJ&hl=en" },
                  { label: "ResearchGate", url: "https://www.researchgate.net/profile/Olumide-Arigbede?ev=hdr_xprf" },
                ].map(({ label, url }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 10 }}>◆</span> {label}
                  </a>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <img
                src="/headshot.jpg"
                alt="Dr. Olumide M. Arigbede"
                style={{ width: 260, height: 320, borderRadius: 12, objectFit: "cover", objectPosition: "top", border: "1px solid rgba(139,69,19,0.1)" }}
              />
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
              Dr. Olu Arigbede is a health/research scientist, biostatistician, and epidemiologist with over eight years of progressive
              expertise in public health, epidemiology, and biostatistics. His specializations include infectious diseases, health disparities, health outcomes, research methods, health policy, computational genomics, cancer education, and cardiovascular disease surveillance, among other research that he has carried out
              across federal agencies, academic institutions, and state- and county-level public health departments.
            </p>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              Currently serving as an Associate for Institutional Research and Biostatistics instructor at
              <strong> SUNY Downstate Health Sciences University</strong>, Office of the Senior Vice President for Research and School of Public Health, respectively, where he provides comprehensive biostatistical
              consulting services, develop a webinar series on statistical methodologies, teach biostatistics courses, and mentor graduate students
              and junior researchers. Previously, Dr. Arigbede contributed to regulatory science analysis at the
              <strong> Food and Drug Administration (FDA)</strong>, developed syndromic surveillance systems at the
              <strong> Centers for Disease Control and Prevention (CDC)</strong>, and led epidemiological investigations
              at state and local health departments in Florida, Texas, and Washington, D.C.
            </p>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              He earned his Doctor of Public Health (DrPH) in Epidemiology and Biostatistics from Florida A&M University,
              where his doctoral research applied mathematical modeling to analyze emerging and reemerging infectious diseases
              outbreak. He is very proficient in R, SAS, Python, and SQL, with demonstrated capabilities in machine learning,
              spatial epidemiology, and real-world evidence analysis.
            </p>
          </div>
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", marginBottom: 20 }}>Education</h3>
            {[
              { degree: "Doctor of Public Health (DrPH)", field: "Epidemiology & Biostatistics", school: "Florida A&M University", year: "2024" },
              { degree: "Master of Public Health (MPH)", field: "Epidemiology & Biostatistics", school: "Florida A&M University", year: "2021" },
              { degree: "Master of Health Administration (MHA)", field: "Health Business & Finance", school: "Florida A&M University", year: "2019" },
              { degree: "Bachelor of Technology (B.Tech)", field: "Statistics", school: "Federal University of Technology, Akure", year: "2017" },
              { degree: "Higher National Diploma (HND)", field: "Computer Science", school: "The Polytechnic, Ibadan", year: "2010" },
            ].map((e, i) => (
              <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid rgba(58,50,40,0.06)", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14.5px", fontWeight: 600, color: "#2c2520" }}>{e.degree}</span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#7a7068" }}> — {e.field}</span><br />
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#9a8e82", fontStyle: "italic" }}>{e.school}</span>
                </div>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#8B4513", fontWeight: 500 }}>{e.year}</span>
              </div>
            ))}
          </div>

          {/* Core Skills */}
          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", marginBottom: 16 }}>Technical Proficiencies</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["R (Shiny, Markdown, ggplot2, tidyverse)", "SAS (Macros, PROC SQL)", "Python", "SQL", "Tableau", "Power BI", "ArcGIS", "ESSENCE", "REDCap", "Machine Learning", "Survival Analysis", "Longitudinal Data", "Meta-Analysis", "Causal Inference", "Time Series", "Spatial Epidemiology"].map((s) => (
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
          <ExpEntry org="SUNY Downstate Health Sciences University" role="Associate for Institutional Research" unit="Office of the Senior Vice President for Research" period="Feb 2025 – Present" highlights={["Teach biostatistics and epidemiology courses, such as survival analysis, among others, in the School of Public Health and the School of Health Professions, SUNY Downstate.",
              "Provide biostatistical consulting to 20+ researchers monthly across study design, analysis, and interpretation",
              "Develop and lead a monthly biostatistical webinar series attended by 15+ faculty, students, and fellows",
              "Design hands-on SAS/R training modules with real-world biomedical applications for multiple departments",
              "Deliver invited lectures bridging traditional statistics with machine learning for medical students"]} />
          <ExpEntry org="SUNY Downstate Health Sciences University" role="Instructor" unit="HINF 5111 – Research Methods, School of Health Professions" period="Fall 2025" highlights={["Taught graduate-level biostatistical concepts to 25+ health informatics students", "Designed hands-on assignments using real healthcare datasets to foster applied learning"]} />
          <ExpEntry org="Food and Drug Administration (FDA)" role="Health Scientist" unit="Office of Minority Health — Office of the Commissioner" period="Nov 2024 – Jun 2025" highlights={["Developed an automated data extraction (ADE) tool in R achieving over 90% reduction in processing time", "Provided demographic analyses and interactive dashboards for regulatory submission data (NDA)", "Collaborated with CDER to enhance safety and efficacy data analysis from pivotal clinical studies"]} />
          <ExpEntry org="Centers for Disease Control and Prevention (CDC)" role="Health Scientist & Epidemiologist Fellow (ORISE)" unit="National Syndromic Surveillance Program (NSSP)" period="Jun 2022 – Nov 2024" highlights={["Developed syndromic case definitions using ICD-10-CM, ICD-9-CM, and SNOMED classification systems", "Implemented electronic surveillance system improving outbreak detection timeliness by 31%", "Applied machine learning techniques to free-text data, improving signal detection accuracy", "Built interactive dashboards and optimized data pipelines for ED, mortality, and laboratory data"]} />
          <ExpEntry org="Florida A&M University" role="Graduate Teaching / Research Assistant" unit="Division of Epidemiology and Biostatistics" period="Aug 2020 – Nov 2024" highlights={["Mentored 47+ students in public health statistics and data epidemiology", "Assisted with teaching graduate-level biostatistics, computational statistics, and epidemiology"]} />
          <ExpEntry org="District of Columbia Department of Health" role="Epidemiologist / Disease Investigator" unit="" period="Oct 2021 – Mar 2022" highlights={["Led COVID-19 outbreak investigations, contact tracing, and case documentation"]} />
          <ExpEntry org="Florida Department of Health in Leon County" role="OPS Biological Scientist III" unit="" period="Sep 2020 – Oct 2021" highlights={["Analyzed epidemiological data and developed executive summaries and visualizations for decision-makers"]} />
          <ExpEntry org="Texas Department of State Health Services" role="Epidemiologist" unit="" period="Dec 2020 – Jun 2021" highlights={["Analyzed community-level epidemiological data using advanced statistical methods"]} />
        </div>
      </Section>

      {/* ═══════════ RESEARCH ═══════════ */}
      <Section id="research" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="Research" />
          <SectionTitle text="Research Interests" />
          <Divider />
          <div className="research-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            <InterestCard icon="🧬" title="Cancer & Genomics Epidemiology" desc="Investigating mutational burden, genomic disparities, and survival modeling using cBioPortal, TCGA, and SEER databases." />
            <InterestCard icon="🦠" title="Infectious Disease Epidemiology" desc="Mathematical modeling of disease outbreaks, syndromic surveillance, and emergency department visit prediction." />
            <InterestCard icon="📊" title="Biostatistical Methods" desc="Advanced regression, survival analysis, causal inference, and machine learning applications in public health research." />
            <InterestCard icon="🌍" title="Computational Epidemiology" desc="Agent-based modeling, spatiotemporal analysis, and AI-driven approaches to disease dynamics and population health." />
            <InterestCard icon="🤰" title="Maternal & Child Health" desc="Disparities in breastfeeding, infant nutrition, and WIC participation across diverse populations." />
            <InterestCard icon="📐" title="Research Methods" desc="Study design, meta-analysis, real-world evidence, and statistical methodology for clinical and epidemiological studies." />
          </div>
          <div style={{ marginTop: 48, padding: "28px 32px", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.1)", borderRadius: 12 }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B4513", fontWeight: 600 }}>Doctoral Dissertation</span>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 500, color: "#2c2520", lineHeight: 1.6, margin: "10px 0 0 0" }}>
              Mathematical Modeling of Emerging and Reemerging Infectious Disease Outbreaks and the Predicted Rate of ED Visits: Case Studies of COVID-19 and Influenza, the National Syndromic Surveillance Program (NSSP) Datasets — United States, 2019–2024
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
          <PubEntry number={1} authors="Arigbede, O.M." year="2024" title="Mathematical modeling of emerging and reemerging infectious disease outbreaks and the predicted rate of emergency department (ED) visits: Case studies of COVID-19 and influenza, the NSSP Datasets — United States, 2019–2024" journal="ProQuest Dissertations & Theses, Florida A&M University" doi="https://www.proquest.com/dissertations-theses/mathematical-modeling-emerging-reemerging/docview/3177776585/se-2" />
          <PubEntry number={2} authors="Arigbede, O.M. et al." year="2024" title="Mutational burden among patients with metastatic prostate cancer differs by race in 3 key genes: An analysis of genomic and clinical data from the AACR Project GENIE biopharma collaborative in cBioPortal" journal="Journal of Clinical Oncology, 42, 5106–5106" doi="https://doi.org/10.1200/JCO.2024.42.16_suppl.5106" />
          <PubEntry number={3} authors="Arigbede, O., Buxbaum, S.G., Falzarano, S., Rhie, S.K." year="2024" title="Global disparities in prostate cancer burden: An analysis of the GLOBOCAN 2020 database" journal="Cancer Epidemiol Biomarkers Prev, 33(9_Supplement): C001" doi="https://doi.org/10.1158/1538-7755.DISP24-C001" />
          <PubEntry number={4} authors="Arigbede, O., Kiros, G." year="2024" title="Analysis of predictive indicators of invasive breast cancer: Modeling survival rates" journal="Cancer Research, 84(3 Suppl_2)" doi="https://doi.org/10.1158/1538-7445.CANEVOL23-B042" />
          <PubEntry number={5} authors="Arigbede, O.M. et al." year="2023" title="Disparities in infant nutrition: WIC participation and rates of breastfeeding in Florida" journal="Int. J. Environ. Res. Public Health, 20, 5988" doi="https://doi.org/10.3390/ijerph20115988" />
          <PubEntry number={6} authors="Arigbede, O., Amusa, T., Buxbaum, S.G." year="2023" title="Exploring the use of artificial intelligence and robotics in prostate cancer management" journal="Cureus, 15(9): e46021" doi="https://doi.org/10.7759/cureus.46021" />
          <PubEntry number={7} authors="Arigbede, O., Kilanko, O., Arigbede, O.J., Matthew, O." year="2023" title="Hunger, food security, and sovereignty: A need for evidence-based public health approaches to meet sustainable development goals" journal="Int J Public Health, 68:1605956" doi="https://doi.org/10.3389/ijph.2023.1605956" />
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#8B4513", marginTop: 24, fontStyle: "italic" }}>
            Complete publication list available on <a href="#" style={{ color: "#8B4513", textDecoration: "underline" }}>Google Scholar</a>.
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
              I am passionate about training the next generation of public health professionals. My teaching integrates real-world datasets and hands-on computing exercises in R and SAS, ensuring students develop both conceptual understanding and practical analytical skills.
            </p>
          </div>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", marginBottom: 16 }}>Courses Taught</h3>
          <div style={{ padding: "16px 0 28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2c2520" }}>HINF 5111 — Research Methods</span><br />
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068" }}>SUNY Downstate Health Sciences University, School of Health Professions · Fall 2025 · Graduate Level</span>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.7, marginTop: 10 }}>
              Comprehensive lectures on biostatistical foundations for health informatics students, covering probability theory, distributions, hypothesis testing, regression analysis, and statistical inference using healthcare datasets.
            </p>
          </div>
          <div style={{ padding: "16px 0 28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2c2520" }}>Biostatistics, Computational Statistics & Epidemiology</span><br />
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068" }}>Florida A&M University · 2020–2024 · Graduate Teaching Assistant</span>
          </div>
          <div style={{ padding: "16px 0 28px 0", borderBottom: "1px solid rgba(58,50,40,0.06)" }}>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15px", fontWeight: 600, color: "#2c2520" }}>Introduction to Biostatistics for AI/ML in Medicine</span><br />
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13.5px", color: "#7a7068" }}>SUNY Chancellor's Opportunity Research Experience (SCOREs) Summer Program · July 2025 · Featured Speaker</span>
          </div>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", margin: "40px 0 16px 0" }}>Mentorship & Service</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Mentored 47+ students in public health statistics and epidemiology at FAMU (2019–2024)", "Active mentor at the Council of State and Territorial Epidemiologists (CSTE), supporting 4+ mentees", "Peer reviewer for JAMA Network Open, Public Health Reports, and Cureus Medical Journal", "Abstract reviewer for the American Public Health Association (APHA)", "Developed a monthly biostatistical webinar series for faculty, fellows, and graduate students at SUNY Downstate"].map((item, i) => (
              <p key={i} style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14.5px", color: "#3a3228", lineHeight: 1.7, paddingLeft: 14, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#8B4513" }}>·</span>{item}
              </p>
            ))}
          </div>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2c2520", margin: "40px 0 16px 0" }}>Selected Honors & Awards</h3>
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
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#3a3228" }}>{a.award}</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#8B4513", fontWeight: 500 }}>{a.year}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ EVENTS ═══════════ */}
      <Section id="events" style={{ padding: "80px 0", background: "rgba(255,255,255,0.4)" }}>
        <div style={containerStyle}>
          <SectionLabel text="Events" />
          <SectionTitle text="Conferences & Summits" />
          <Divider />
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228", marginBottom: 28 }}>
            I regularly present research at national and international conferences, contribute to scientific meetings, and participate in summits advancing public health, epidemiology, and biostatistics.
          </p>

          {/* Filter buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { key: "all", label: "All Events" },
              { key: "upcoming", label: "Upcoming" },
              { key: "past", label: "Past" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setEventFilter(key)}
                style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", fontWeight: eventFilter === key ? 600 : 400,
                  color: eventFilter === key ? "#fff" : "#5c5147",
                  background: eventFilter === key ? "#2c2520" : "transparent",
                  border: `1.5px solid ${eventFilter === key ? "#2c2520" : "rgba(58,50,40,0.2)"}`,
                  borderRadius: 24, padding: "7px 18px", cursor: "pointer",
                  transition: "all 0.25s", letterSpacing: "0.04em",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18 }}>
            {filteredEvents.map((event, i) => <EventCard key={i} event={event} />)}
          </div>
        </div>
      </Section>

      {/* ═══════════ ARTICLES ═══════════ */}
      <Section id="articles" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="Articles" />
          <SectionTitle text="Insights & Commentary" />
          <Divider />
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228", marginBottom: 28 }}>
            Short-form pieces on epidemiology, biostatistics, and public health — written for researchers, students, practitioners, and anyone curious about how data shapes our understanding of health.
          </p>

          <div className="articles-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
            {ARTICLES_DATA.map((article, i) => (
              <ArticleCard key={i} article={article} onRead={() => setReadingArticle(i)} />
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ OPPORTUNITIES ═══════════ */}
      <Section id="opportunities" style={{ padding: "80px 0", background: "rgba(255,255,255,0.4)" }}>
        <div style={containerStyle}>
          <SectionLabel text="Opportunities" />
          <SectionTitle text="Fellowships, Internships & Grants" />
          <Divider />
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228", marginBottom: 28 }}>
            A curated collection of opportunities for students, recent graduates, and early-career professionals in epidemiology, biostatistics, data science, and public health. I update this section regularly — bookmark this page and check back often.
          </p>

          {/* Filter buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { key: "all", label: "All" },
              { key: "fellowship", label: "Fellowships" },
              { key: "internship", label: "Internships" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setOppFilter(key)}
                style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", fontWeight: oppFilter === key ? 600 : 400,
                  color: oppFilter === key ? "#fff" : "#5c5147",
                  background: oppFilter === key ? "#2c2520" : "transparent",
                  border: `1.5px solid ${oppFilter === key ? "#2c2520" : "rgba(58,50,40,0.2)"}`,
                  borderRadius: 24, padding: "7px 18px", cursor: "pointer",
                  transition: "all 0.25s", letterSpacing: "0.04em",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="opps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 18 }}>
            {filteredOpps.map((opp, i) => <OpportunityCard key={i} opp={opp} />)}
          </div>

          <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.1)", borderRadius: 10 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#2c2520" }}>Know of an opportunity?</strong> If you would like to share a fellowship, internship, grant, or job opportunity for this page, please <a href="#contact" style={{ color: "#8B4513", textDecoration: "underline" }}>get in touch</a>. I am committed to helping emerging professionals find pathways into impactful public health careers.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ PODCASTS ═══════════ */}
      <Section id="podcasts" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="Podcasts" />
          <SectionTitle text="Conversations in Public Health" />
          <Divider />
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228", marginBottom: 28 }}>
            In-depth conversations with researchers, practitioners, and thought leaders on the topics shaping public health today — from biostatistical innovation and disease surveillance to health equity and career development.
          </p>

          <div className="podcasts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {PODCASTS_DATA.map((ep, i) => <PodcastCard key={i} episode={ep} />)}
          </div>

          <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.1)", borderRadius: 10 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "#2c2520" }}>Want to be a guest?</strong> I am always looking for compelling voices in epidemiology, biostatistics, data science, and public health. If you have a story to share or a topic you are passionate about, please <a href="#contact" style={{ color: "#8B4513", textDecoration: "underline" }}>reach out</a>.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ SCHOLARSHIP ═══════════ */}
      <Section id="scholarship" style={{ padding: "80px 0", background: "rgba(255,255,255,0.4)" }}>
        <div style={containerStyle}>
          <SectionLabel text="Scholarship" />
          <SectionTitle text="The Olu Arigbede Scholarship" />
          <Divider />

          {/* Mission statement */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              The Olu Arigbede Scholarship was established in 2025 to support the academic futures of outstanding undergraduate students at Nigerian universities. Rooted in a commitment to research excellence and innovation, this scholarship provides financial support and recognition to rising final-year students who demonstrate exceptional intellectual curiosity, academic merit, and a genuine desire to advance healthcare systems through rigorous research or creative problem-solving.
            </p>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228" }}>
              Each year, the scholarship supports two distinct tracks: a <strong>Research Scholarship</strong> for students producing high-quality academic articles on a designated public health theme, and an <strong>Innovation Scholarship</strong> for students developing practical, scalable solutions to real healthcare challenges in Nigeria. Three scholars are selected per track, each receiving <strong>₦100,000</strong> to support their academic and professional development.
            </p>
          </div>

          {/* Key highlights bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }} className="scholarship-grid">
            {[
              { label: "Scholars Per Track", value: "3", sub: "6 total annually" },
              { label: "Award Amount", value: "₦100,000", sub: "Per recipient" },
              { label: "Application Cycle", value: "2025/2026", sub: "Now accepting applications" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "22px 20px", background: "rgba(139,69,19,0.03)", border: "1px solid rgba(139,69,19,0.1)", borderRadius: 10, textAlign: "center" }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: "24px", fontWeight: 700, color: "#8B4513", margin: "0 0 4px 0" }}>{stat.value}</p>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2c2520", margin: "0 0 2px 0" }}>{stat.label}</p>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", color: "#7a7068", margin: 0 }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Scholarship program cards */}
          <div className="scholarship-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 36 }}>
            {SCHOLARSHIP_PROGRAMS.map((prog) => {
              const [hovered, setHovered] = useState(false);
              return (
                <div
                  key={prog.id}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    padding: "32px 28px",
                    background: hovered ? "rgba(139,69,19,0.04)" : "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(58,50,40,0.08)",
                    borderRadius: 12,
                    transition: "all 0.35s ease",
                    transform: hovered ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hovered ? "0 8px 30px rgba(58,50,40,0.06)" : "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 32 }}>{prog.icon}</span>
                    <StatusBadge status="active" label="Open" />
                  </div>

                  <h4 style={{ fontFamily: "'Lora', serif", fontSize: "19px", fontWeight: 600, color: "#2c2520", margin: "0 0 6px 0", lineHeight: 1.3 }}>
                    {prog.title}
                  </h4>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#8B4513", fontWeight: 600, margin: "0 0 12px 0" }}>
                    Award: {prog.award} · {prog.slots} recipients
                  </p>

                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.7, margin: "0 0 16px 0", flex: 1 }}>
                    {prog.description}
                  </p>

                  {/* Theme callout */}
                  <div style={{ padding: "12px 16px", background: "rgba(139,69,19,0.04)", border: "1px solid rgba(139,69,19,0.1)", borderRadius: 8, marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B4513" }}>2025/2026 Theme</span>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#2c2520", fontWeight: 500, lineHeight: 1.5, margin: "4px 0 0 0" }}>
                      {prog.theme}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      onClick={() => setViewingScholarship(prog.id)}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 600,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        color: "#8B4513", background: "rgba(139,69,19,0.06)",
                        border: "1px solid rgba(139,69,19,0.15)", borderRadius: 6,
                        padding: "10px 18px", cursor: "pointer", transition: "all 0.25s",
                      }}
                    >
                      Full Details & Requirements
                    </button>
                    <button
                      onClick={() => setApplyingScholarship(prog.id)}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif", fontSize: "12px", fontWeight: 600,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        color: "#fff", background: "#2c2520",
                        border: "none", borderRadius: 6,
                        padding: "10px 18px", cursor: "pointer", transition: "all 0.25s",
                      }}
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Important note */}
          <div style={{ padding: "22px 26px", background: "rgba(178,34,34,0.03)", border: "1px solid rgba(178,34,34,0.1)", borderRadius: 10 }}>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#3a3228", lineHeight: 1.75, margin: 0 }}>
              <strong style={{ color: "#B22222" }}>Academic Integrity Statement:</strong> All submissions to The Olu Arigbede Scholarship must be entirely the applicant's own original work. Applications containing content generated by AI tools (including ChatGPT, Gemini, Copilot, or similar platforms), plagiarized material, or falsified documents will be immediately disqualified. Every submission undergoes rigorous AI-detection and plagiarism screening. This scholarship exists to celebrate and reward authentic intellectual effort.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONTACT ═══════════ */}
      <Section id="contact" style={{ padding: "80px 0" }}>
        <div style={containerStyle}>
          <SectionLabel text="Contact" />
          <SectionTitle text="Get in Touch" />
          <Divider />
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "15.5px", lineHeight: 1.8, color: "#3a3228", marginBottom: 32, maxWidth: 580 }}>
            I welcome collaborations, consulting inquiries, speaking invitations, and questions from fellow researchers, students, or public health professionals.
          </p>
          

          {/* Contact Form */}
          <ContactForm />

          <div style={{ marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2c2520", marginBottom: 14 }}>Professional Affiliations</h3>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "14px", color: "#5c5147", lineHeight: 1.8 }}>
              American Association of Cancer Research (AACR) · American Society of Clinical Oncology (ASCO) · American Statistical Association (ASA) · American Public Health Association (APHA) · International Genetic Epidemiology Society (IGES) · American Society of Hematology (ASH) · Council of State and Territorial Epidemiologists (CSTE) · Cancer Research and Education (CaRE2)
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ padding: "48px 0 32px 0", borderTop: "1px solid rgba(58,50,40,0.08)" }}>
        <div style={containerStyle}>
          <div className="footer-cols" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
            <div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: "#2c2520", marginBottom: 6 }}>Olumide M. Arigbede, DrPH, MPH</p>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", color: "#7a7068" }}>Health Scientist · Biostatistician · Epidemiologist</p>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["LinkedIn", "Google Scholar", "ResearchGate"].map((link) => (
                <a key={link} href="#" style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "12.5px", color: "#8B4513", textDecoration: "none", letterSpacing: "0.04em" }}>{link}</a>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "11.5px", color: "#9a8e82", marginTop: 32, textAlign: "center", letterSpacing: "0.04em" }}>
            © {new Date().getFullYear()} Dr. Olumide M. Arigbede. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
