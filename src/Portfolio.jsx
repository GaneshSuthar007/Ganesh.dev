import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   GANESH SUTHAR — ops-console portfolio
   Concept: the portfolio is a production system.
   Career = deploy history · Projects = running services ·
   GitHub = live telemetry · Contact = an API endpoint.
   ============================================================ */

const PHOTO = "/ganesh.jpg";

const GH_USER = "GaneshSuthar007";
const EMAIL = "Ganeshsuthar123@gmail.com";
const LINKS = {
  github: "https://github.com/GaneshSuthar007",
  linkedin: "https://www.linkedin.com/in/ganeshsuthar/",
  email: `mailto:${EMAIL}`,
  // Google Doc → direct PDF download (requires the doc to be shared as "Anyone with the link — Viewer")
  resume: "https://docs.google.com/document/d/1y-yN2veELXyJK9mIj22KPMvhv1ynrgm8fTQIInvDzuU/export?format=pdf",
  resumeView: "https://docs.google.com/document/d/1y-yN2veELXyJK9mIj22KPMvhv1ynrgm8fTQIInvDzuU/view",
};

/* ----------------------------- data ----------------------------- */

const BOOT_LINES = [
  { t: "ok", text: "mounting /usr/ganesh/experience — 10 years found" },
  { t: "ok", text: "loading node.js · nestjs · grpc · microservices" },
  { t: "ok", text: "connecting milvus vector store … RAG pipeline ready" },
  { t: "ok", text: "peak traffic handled: 100K users/day" },
  { t: "sys", text: "all services operational. rendering portfolio…" },
];

const METRICS = [
  { value: "10+", unit: "yrs", label: "Production uptime" },
  { value: "100K", unit: "/day", label: "Peak users served" },
  { value: "20+", unit: "", label: "Systems shipped" },
  { value: "15+", unit: "", label: "Integrations wired" },
];

const RELEASES = [
  {
    v: "v7.0.0",
    current: true,
    company: "Versar Global Solutions",
    role: "Lead Software Engineer · Freelance",
    period: "Oct 2025 — present",
    place: "Remote",
    added: [
      "Production RAG pipelines — Milvus vector storage, Azure OpenAI embeddings + generation",
      "NestJS microservice delivery layer on PostgreSQL",
    ],
    tags: ["RAG", "Milvus", "Azure OpenAI", "NestJS", "PostgreSQL"],
  },
  {
    v: "v5.0.0",
    company: "Appinventiv",
    role: "Senior Software Developer",
    period: "Dec 2024 — Oct 2025",
    place: "Noida, IN",
    added: [
      "Designed and deployed scalable microservice architectures",
      "Owned cross-service API standards, MongoDB modelling, code review & team workflow",
    ],
    tags: ["gRPC", "Microservices", "MongoDB", "Team lead"],
  },
  {
    v: "v4.0.0",
    company: "Pando India Software Consultants",
    role: "Senior Software Developer",
    period: "Jun 2024 — Dec 2024",
    place: "Noida, IN",
    added: [
      "Extended a Survey Management System across ReactJS + Redux Toolkit",
      "Hardened Node.js / MySQL backend stability & scale via Azure Functions",
    ],
    tags: ["Node.js", "MySQL", "Azure Functions", "ReactJS"],
  },
  {
    v: "v3.0.0",
    company: "Appentus Technologies",
    role: "Software Developer",
    period: "Mar 2019 — Jun 2024",
    place: "Jaipur, IN",
    note: "longest deployment · 5y 3m",
    added: [
      "Built full-stack products from zero with WebSocket real-time features",
      "Shipped secure, scalable apps on AWS + Redis — Firebase, JWT, Sinch, Agora integrations",
    ],
    tags: ["NestJS", "WebSocket", "AWS", "Redis", "MongoDB"],
  },
  {
    v: "v1.0.0",
    company: "Appiqo Technologies",
    role: "NodeJS Developer",
    period: "Aug 2016 — Feb 2019",
    place: "Jaipur, IN",
    note: "initial release",
    added: [
      "Cross-platform REST APIs with Sequelize ORM",
      "Database indexing & query optimisation for high-throughput operations",
    ],
    tags: ["Node.js", "MySQL", "Sequelize"],
  },
];

const SERVICES = [
  {
    id: "svc-rag-assistant",
    name: "AI Document Assistant",
    kind: "Enterprise Construction PM Platform",
    role: "Lead Backend Engineer",
    desc: "End-to-end ingestion for an AI chat assistant over a construction document corpus — parsing, chunking and embedding into Milvus, with grounded citation logic so every answer is source-backed.",
    metrics: ["RAG pipeline", "Grounded citations", "Vector search"],
    stack: ["NestJS", "Milvus", "Azure OpenAI", "PostgreSQL"],
  },
  {
    id: "svc-bitdelta",
    name: "Bitdelta.pro",
    kind: "Crypto Trading System",
    role: "Backend Lead",
    desc: "Trading platform for buying and selling crypto. Migrated the legacy .NET MT5 codebase to NestJS and wired Chainalysis in for AML screening.",
    metrics: [".NET → NestJS migration", "Chainalysis AML"],
    stack: ["MT5", "Blockchain", "Microservices", "WebSocket"],
  },
  {
    id: "svc-sonnys",
    name: "Sonny's Direct",
    kind: "Multi-role Car Rental Platform",
    role: "Associate Tech Lead",
    desc: "Led a team building modular CRM + Store components. Owned the dev workflow and core backend services on Kafka-backed microservices.",
    metrics: ["Kafka event backbone", "Modular CRM"],
    stack: ["NestJS", "gRPC", "PostgreSQL", "Kafka"],
  },
  {
    id: "svc-zamplia",
    name: "Zamplia",
    kind: "Online Survey Marketplace",
    role: "Associate Tech Lead",
    desc: "High-traffic marketplace connecting traffic vendors with survey owners — commission-based transaction logic, tuned hot paths with Redis caching.",
    metrics: ["100K users/day", "Redis-tuned"],
    stack: ["Node.js", "MySQL", "Azure App Service", "Redis"],
  },
  {
    id: "svc-tcdl",
    name: "TheCardsDontLie",
    kind: "Subscription Booking Platform",
    role: "Full Stack Developer",
    desc: "Tarot-reading platform for one-on-one and group Zoom sessions — frontend, backend, Zoom integration and a custom admin panel.",
    metrics: ["Zoom API sessions", "Custom admin"],
    stack: ["ReactJS", "NestJS", "MySQL", "Zoom API"],
  },
];

const STACK = [
  { key: "backend", items: ["Node.js", "NestJS", "Express.js", "gRPC", "Microservices", "TypeScript"] },
  { key: "ai_rag", items: ["Milvus", "Azure OpenAI", "Embeddings", "Data chunking", "RAG pipelines"] },
  { key: "data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firestore"] },
  { key: "messaging", items: ["Kafka", "RabbitMQ", "WebSocket", "BullMQ", "XMPP"] },
  { key: "cloud", items: ["AWS · EC2 S3 Cognito RDS", "Azure · Functions App Service", "Docker", "GitHub Actions"] },
  { key: "integrations", items: ["Stripe", "PayPal", "WhatsApp Business API", "Twilio", "Agora", "Zoom", "OAuth / JWT"] },
];

/* --------------------------- hooks ------------------------------ */

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), obs.disconnect()),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function useBootLog(lines) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(lines.length);
      setDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 250);
      }
    }, 420);
    return () => clearInterval(id);
  }, [lines.length]);
  return [count, done];
}

/* ----------------------------- SEO ------------------------------ */

const SEO_IMAGE = "https://ganeshsuthar.dev/ganesh.jpg"; // ← update domain

const SEO = {
  title: "Ganesh Suthar — Lead Backend Engineer · Node.js, NestJS, Microservices & RAG",
  description:
    "Lead Backend Engineer with 10 years building scalable backend systems and microservice platforms in Node.js, NestJS and gRPC on AWS/Azure. Tech lead on systems serving 100K users/day, crypto trading on MT5, and production RAG pipelines with Milvus and Azure OpenAI.",
  url: "https://ganeshsuthar.dev/", // ← update to your real domain before deploying
  image: SEO_IMAGE,
  keywords:
    "Ganesh Suthar, Lead Backend Engineer, Node.js developer, NestJS, microservices, gRPC, RAG, Milvus, Azure OpenAI, backend architect, India",
};

function upsertMeta(sel, create) {
  let el = document.head.querySelector(sel);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr, key, content) {
  const el = upsertMeta(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", content);
}

function setLink(rel, href, extra = {}) {
  const el = upsertMeta(`link[rel="${rel}"][data-gs]`, () => {
    const l = document.createElement("link");
    l.setAttribute("rel", rel);
    l.setAttribute("data-gs", "1");
    return l;
  });
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}

function useSEO() {
  useEffect(() => {
    document.title = SEO.title;
    document.documentElement.lang = "en";

    // Core
    setMeta("name", "description", SEO.description);
    setMeta("name", "keywords", SEO.keywords);
    setMeta("name", "author", "Ganesh Suthar");
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("name", "theme-color", "#0A0D13");
    setMeta("name", "viewport", "width=device-width, initial-scale=1");

    // Open Graph
    setMeta("property", "og:type", "profile");
    setMeta("property", "og:title", SEO.title);
    setMeta("property", "og:description", SEO.description);
    setMeta("property", "og:url", SEO.url);
    setMeta("property", "og:image", SEO.image);
    setMeta("property", "og:site_name", "Ganesh Suthar — Portfolio");
    setMeta("property", "og:locale", "en_US");

    // Twitter
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", SEO.title);
    setMeta("name", "twitter:description", SEO.description);
    setMeta("name", "twitter:image", SEO.image);

    // Canonical + font preconnects (perf: saves a DNS+TLS round trip)
    setLink("canonical", SEO.url);
    ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].forEach((origin) => {
      if (!document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
        const l = document.createElement("link");
        l.rel = "preconnect";
        l.href = origin;
        if (origin.includes("gstatic")) l.crossOrigin = "anonymous";
        document.head.appendChild(l);
      }
    });

    // JSON-LD structured data — lets Google render a rich Person result
    if (!document.getElementById("gs-jsonld")) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "gs-jsonld";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ganesh Suthar",
        jobTitle: "Lead Backend Engineer",
        description: SEO.description,
        url: SEO.url,
        image: SEO.image,
        email: `mailto:${EMAIL}`,
        sameAs: [LINKS.github, LINKS.linkedin],
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Maharaja Ganga Singh University",
        },
        knowsAbout: [
          "Node.js", "NestJS", "TypeScript", "Microservices", "gRPC",
          "Retrieval-Augmented Generation", "Milvus", "Azure OpenAI",
          "PostgreSQL", "MongoDB", "Redis", "Kafka", "AWS", "Azure",
        ],
      });
      document.head.appendChild(script);
    }
  }, []);
}

/* ------------------------ small components ----------------------- */

function goTo(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function EmailButton({ className = "gs-btn primary" }) {
  const [copied, setCopied] = useState(false);
  const click = (e) => {
    e.preventDefault();
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
    try {
      window.open(LINKS.email, "_self");
    } catch (_) {
      /* mail client blocked in sandbox — address is on the clipboard */
    }
  };
  return (
    <a className={className} href={LINKS.email} onClick={click}>
      {copied ? "address copied ✓" : "email me"}
    </a>
  );
}

function Copyable({ text, children }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    const finish = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(finish, finish);
    } else {
      finish();
    }
  }, [text]);
  return (
    <button className="gs-copy" onClick={copy} type="button">
      {children}
      <span className={"gs-copy-flag" + (copied ? " on" : "")}>{copied ? "copied" : "copy"}</span>
    </button>
  );
}

function SectionTag({ id, label }) {
  return (
    <div className="gs-sectiontag" id={id}>
      <span className="gs-sectiontag-hash">#</span> {label}
    </div>
  );
}

/* ----------------------- GitHub telemetry ------------------------ */

function Heatmap({ weeks, max }) {
  return (
    <div className="gs-heatmap" role="img" aria-label="GitHub contribution activity, last 12 months">
      {weeks.map((week, wi) => (
        <div className="gs-heatcol" key={wi}>
          {week.map((d, di) => {
            const lvl = d.count === 0 ? 0 : Math.min(4, Math.ceil((d.count / Math.max(max, 1)) * 4));
            return <span key={di} className={"gs-cell l" + lvl} title={`${d.date}: ${d.count} contributions`} />;
          })}
        </div>
      ))}
    </div>
  );
}

function GithubTelemetry() {
  const [profile, setProfile] = useState(null);
  const [contrib, setContrib] = useState(null);
  const [state, setState] = useState("loading"); // loading | live | offline

  useEffect(() => {
    let alive = true;
    Promise.allSettled([
      fetch(`https://api.github.com/users/${GH_USER}`).then((r) => (r.ok ? r.json() : Promise.reject())),
      fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`).then((r) =>
        r.ok ? r.json() : Promise.reject()
      ),
    ]).then(([p, c]) => {
      if (!alive) return;
      let any = false;
      if (p.status === "fulfilled") {
        setProfile(p.value);
        any = true;
      }
      if (c.status === "fulfilled") {
        setContrib(c.value);
        any = true;
      }
      setState(any ? "live" : "offline");
    });
    return () => {
      alive = false;
    };
  }, []);

  let weeks = null;
  let total = 0;
  let max = 0;
  if (contrib?.contributions) {
    const days = contrib.contributions;
    total = contrib.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
    max = days.reduce((m, d) => Math.max(m, d.count), 0);
    weeks = [];
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  }

  const memberSince = profile?.created_at ? new Date(profile.created_at).getFullYear() : null;

  return (
    <div className="gs-telemetry">
      <div className="gs-telemetry-head">
        <span className={"gs-led " + (state === "live" ? "green" : state === "loading" ? "amber" : "grey")} />
        <span className="gs-mono gs-dim">
          {state === "loading" && "polling api.github.com …"}
          {state === "live" && `stream: live · ${GH_USER}`}
          {state === "offline" && "telemetry unavailable — visit the profile directly"}
        </span>
        <a className="gs-mini-link" href={LINKS.github} target="_blank" rel="noreferrer">
          open on GitHub ↗
        </a>
      </div>

      {state !== "offline" && (
        <div className="gs-telemetry-grid">
          <div className="gs-tstat">
            <div className="gs-tstat-v">{total || "—"}</div>
            <div className="gs-tstat-l">contributions · last 12 mo</div>
          </div>
          <div className="gs-tstat">
            <div className="gs-tstat-v">{profile ? profile.public_repos : "—"}</div>
            <div className="gs-tstat-l">public repos</div>
          </div>
          <div className="gs-tstat">
            <div className="gs-tstat-v">{profile ? profile.followers : "—"}</div>
            <div className="gs-tstat-l">followers</div>
          </div>
          <div className="gs-tstat">
            <div className="gs-tstat-v">{memberSince ?? "—"}</div>
            <div className="gs-tstat-l">on GitHub since</div>
          </div>
        </div>
      )}

      {weeks && <Heatmap weeks={weeks} max={max} />}
      <p className="gs-telemetry-note gs-dim">
        Fetched client-side on every visit — most of my last decade lives in private client repositories; the public
        stream is where side work lands.
      </p>
    </div>
  );
}

/* ------------------------------ hero ----------------------------- */

function Hero() {
  const [count, done] = useBootLog(BOOT_LINES);
  return (
    <header className="gs-hero">
      <div className="gs-hero-left">
        <div className="gs-bootlog gs-mono" aria-hidden="true">
          {BOOT_LINES.slice(0, count).map((l, i) => (
            <div className="gs-bootline" key={i}>
              <span className={l.t === "ok" ? "gs-ok" : "gs-sys"}>{l.t === "ok" ? "[ OK ]" : "[ SYS ]"}</span> {l.text}
            </div>
          ))}
          {!done && <span className="gs-caret" />}
        </div>

        <div className={"gs-hero-main" + (done ? " on" : "")}>
          <p className="gs-eyebrow gs-mono">GANESH SUTHAR · LEAD BACKEND ENGINEER</p>
          <h1 className="gs-h1">
            Systems that <em>stay&nbsp;up</em> when traffic doesn't.
          </h1>
          <p className="gs-lede">
            Ten years designing and running backend platforms in Node.js, NestJS and gRPC — from a survey marketplace
            at 100K users/day to crypto trading on MT5. Currently shipping production RAG pipelines with Milvus and
            Azure OpenAI.
          </p>
          <div className="gs-cta-row">
            <a className="gs-btn primary" href="#contact" onClick={(e) => goTo(e, "contact")}>
              POST /contact
            </a>
            <a className="gs-btn" href="#deploys" onClick={(e) => goTo(e, "deploys")}>
              read deploy history
            </a>
          </div>
        </div>
      </div>

      <figure className="gs-idcard">
        <div className="gs-idcard-frame">
          <img src={PHOTO} alt="Portrait of Ganesh Suthar, Lead Backend Engineer" width="420" height="576" decoding="async" fetchpriority="high" />
          <span className="gs-corner tl" />
          <span className="gs-corner tr" />
          <span className="gs-corner bl" />
          <span className="gs-corner br" />
        </div>
        <figcaption className="gs-idcard-meta gs-mono">
          <div>
            <span className="gs-led green" /> OPERATIONAL
          </div>
          <div className="gs-dim">region: India · remote-ready</div>
          <div className="gs-dim">uptime: 10y in production</div>
        </figcaption>
      </figure>
    </header>
  );
}

/* --------------------------- sections ---------------------------- */

function Metrics() {
  const [ref, on] = useReveal();
  return (
    <section ref={ref} className={"gs-metrics" + (on ? " on" : "")}>
      {METRICS.map((m, i) => (
        <div className="gs-metric" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
          <div className="gs-metric-v">
            {m.value}
            <span className="gs-metric-u">{m.unit}</span>
          </div>
          <div className="gs-metric-l">{m.label}</div>
        </div>
      ))}
    </section>
  );
}

function Release({ r, index }) {
  const [ref, on] = useReveal();
  return (
    <article ref={ref} className={"gs-release" + (on ? " on" : "")}>
      <div className="gs-release-rail">
        <span className={"gs-node" + (r.current ? " live" : "")} />
        {index < RELEASES.length - 1 && <span className="gs-rail-line" />}
      </div>
      <div className="gs-release-body">
        <div className="gs-release-top gs-mono">
          <span className={"gs-vtag" + (r.current ? " live" : "")}>{r.v}</span>
          <span className="gs-dim">{r.period}</span>
          <span className="gs-dim">· {r.place}</span>
          {r.current && <span className="gs-pill-live">CURRENT</span>}
          {r.note && <span className="gs-note">{r.note}</span>}
        </div>
        <h3 className="gs-release-title">
          {r.company} <span className="gs-role">— {r.role}</span>
        </h3>
        <ul className="gs-added">
          {r.added.map((a, i) => (
            <li key={i}>
              <span className="gs-plus gs-mono">+</span> {a}
            </li>
          ))}
        </ul>
        <div className="gs-tags gs-mono">
          {r.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ServiceCard({ s, i }) {
  const [ref, on] = useReveal();
  return (
    <article ref={ref} className={"gs-svc" + (on ? " on" : "")} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
      <div className="gs-svc-head gs-mono">
        <span className="gs-led green" />
        <span className="gs-svc-id">{s.id}</span>
        <span className="gs-dim gs-svc-role">{s.role}</span>
      </div>
      <h3 className="gs-svc-name">{s.name}</h3>
      <p className="gs-svc-kind gs-mono gs-dim">{s.kind}</p>
      <p className="gs-svc-desc">{s.desc}</p>
      <div className="gs-svc-metrics">
        {s.metrics.map((m) => (
          <span key={m} className="gs-chip amber">
            {m}
          </span>
        ))}
      </div>
      <div className="gs-tags gs-mono">
        {s.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </article>
  );
}

function StackManifest() {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={"gs-manifest gs-mono" + (on ? " on" : "")}>
      {STACK.map((g) => (
        <div className="gs-manifest-row" key={g.key}>
          <span className="gs-manifest-key">{g.key}:</span>
          <span className="gs-manifest-vals">
            {g.items.map((it, i) => (
              <span key={it}>
                {it}
                {i < g.items.length - 1 && <em className="gs-sep"> · </em>}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function Contact() {
  const [ref, on] = useReveal();
  return (
    <section ref={ref} className={"gs-contact" + (on ? " on" : "")} id="contact">
      <SectionTag label="POST /contact" />
      <div className="gs-contact-grid">
        <div>
          <h2 className="gs-h2">Open a request.</h2>
          <p className="gs-lede">
            Backend architecture, microservice platforms, RAG systems — or a team that needs a lead. Response time is
            usually well under 24h.
          </p>
          <div className="gs-contact-links">
            <EmailButton />
            <a className="gs-btn" href={LINKS.resume} target="_blank" rel="noreferrer" download="Ganesh-Suthar-Resume.pdf">
              resume.pdf ↓
            </a>
            <a className="gs-btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="gs-btn" href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="gs-curl gs-mono">
          <div className="gs-curl-bar">
            <span className="gs-dim">~ shell</span>
          </div>
          <Copyable text={EMAIL}>
            <code>
              <span className="gs-dim">$</span> curl -X POST ganesh.dev/contact \{"\n"}
              {"   "}-d 'email={EMAIL}' \{"\n"}
              {"   "}-d 'availability=open'
            </code>
          </Copyable>
        </div>
      </div>
      <footer className="gs-footer gs-mono gs-dim">
        <span>© {new Date().getFullYear()} Ganesh Suthar · Lead Backend Engineer</span>
        <span>
          EN · HI &nbsp;|&nbsp; BCA, MGSU Bikaner
        </span>
      </footer>
    </section>
  );
}

/* ------------------------------ app ------------------------------ */

export default function Portfolio() {
  useSEO();
  const now = useClock();
  const time = now.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <div className="gs-root">
      <style>{CSS}</style>

      <nav className="gs-statusbar gs-mono">
        <a
          className="gs-brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="gs-led green" /> GANESH.SYS
        </a>
        <span className="gs-statusbar-links">
          <a href="#deploys" onClick={(e) => goTo(e, "deploys")}>deploys</a>
          <a href="#services" onClick={(e) => goTo(e, "services")}>services</a>
          <a href="#stack" onClick={(e) => goTo(e, "stack")}>stack</a>
          <a href="#telemetry" onClick={(e) => goTo(e, "telemetry")}>telemetry</a>
          <a href="#contact" onClick={(e) => goTo(e, "contact")}>contact</a>
        </span>
        <span className="gs-dim gs-clock">{time} IST</span>
      </nav>

      <main className="gs-container">
        <Hero />
        <Metrics />

        <SectionTag id="deploys" label="DEPLOY_HISTORY — 10 years, 7 releases" />
        <p className="gs-section-sub">
          A career, versioned. Every release shipped to production and stayed there.
        </p>
        <div className="gs-releases">
          {RELEASES.map((r, i) => (
            <Release r={r} index={i} key={r.v} />
          ))}
        </div>

        <SectionTag id="services" label="SERVICES — selected production systems" />
        <div className="gs-svc-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard s={s} i={i} key={s.id} />
          ))}
        </div>

        <SectionTag id="stack" label="STACK_MANIFEST" />
        <StackManifest />

        <SectionTag id="telemetry" label="TELEMETRY — live from GitHub" />
        <GithubTelemetry />

        <Contact />
      </main>
    </div>
  );
}

/* ------------------------------ css ------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;450;500;600&display=swap');

.gs-root{
  --bg:#0A0D13; --surface:#10151E; --raised:#151C28; --line:#202A39;
  --ink:#E9EDF4; --dim:#8B95A8;
  --amber:#FFB224; --amber-soft:rgba(255,178,36,.12);
  --green:#34D98F;
  background:
    radial-gradient(1100px 500px at 80% -10%, rgba(255,178,36,.05), transparent 60%),
    radial-gradient(circle at 1px 1px, #161d29 1px, transparent 1.6px) 0 0/26px 26px,
    var(--bg);
  color:var(--ink);
  font-family:'IBM Plex Sans',system-ui,sans-serif;
  font-size:16px; line-height:1.6;
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.gs-root *{box-sizing:border-box;margin:0}
.gs-root a{color:inherit;text-decoration:none}
.gs-mono{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:.8rem;letter-spacing:.01em}
.gs-dim{color:var(--dim)}
.gs-container{max-width:1080px;margin:0 auto;padding:0 28px 96px}

/* status bar */
.gs-statusbar{
  position:sticky;top:0;z-index:50;
  display:flex;align-items:center;gap:24px;
  padding:12px 28px;
  background:rgba(10,13,19,.85);backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line);
}
.gs-brand{display:flex;align-items:center;gap:8px;font-weight:500;letter-spacing:.12em;cursor:pointer}
.gs-contact{scroll-margin-top:80px}
.gs-statusbar-links{display:flex;gap:20px;margin-left:auto}
.gs-statusbar-links a{color:var(--dim);transition:color .15s}
.gs-statusbar-links a:hover{color:var(--amber)}
.gs-clock{font-variant-numeric:tabular-nums;min-width:86px;text-align:right}
@media(max-width:720px){.gs-statusbar-links{display:none}}

.gs-led{width:8px;height:8px;border-radius:50%;display:inline-block;flex:none}
.gs-led.green{background:var(--green);box-shadow:0 0 8px rgba(52,217,143,.7)}
.gs-led.amber{background:var(--amber);box-shadow:0 0 8px rgba(255,178,36,.7)}
.gs-led.grey{background:#3a4354}

/* hero */
.gs-hero{display:grid;grid-template-columns:1.35fr .85fr;gap:56px;align-items:center;padding:72px 0 40px}
@media(max-width:860px){.gs-hero{grid-template-columns:1fr;gap:40px;padding-top:48px}}
.gs-bootlog{min-height:118px;margin-bottom:28px;color:var(--dim)}
.gs-bootline{margin-bottom:2px;animation:gsIn .25s ease both}
.gs-ok{color:var(--green)}
.gs-sys{color:var(--amber)}
.gs-caret{display:inline-block;width:8px;height:14px;background:var(--amber);animation:gsBlink 1s steps(2) infinite;vertical-align:middle}
@keyframes gsBlink{to{opacity:0}}
@keyframes gsIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}

.gs-hero-main{opacity:0;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease}
.gs-hero-main.on{opacity:1;transform:none}
.gs-eyebrow{color:var(--amber);letter-spacing:.22em;margin-bottom:16px}
.gs-h1{
  font-family:'Archivo',sans-serif;
  font-variation-settings:'wdth' 115;
  font-weight:850;font-size:clamp(2.4rem,5.4vw,4.1rem);
  line-height:1.02;letter-spacing:-.015em;text-wrap:balance;
}
.gs-h1 em{font-style:normal;color:var(--amber)}
.gs-lede{color:var(--dim);max-width:52ch;margin-top:20px;font-size:1.04rem}
.gs-cta-row{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap}
.gs-btn{
  font-family:'IBM Plex Mono',monospace;font-size:.82rem;
  padding:11px 20px;border:1px solid var(--line);border-radius:4px;
  color:var(--ink);background:var(--surface);
  transition:border-color .15s,transform .15s,background .15s;
  display:inline-block;
}
.gs-btn:hover{border-color:var(--amber);transform:translateY(-1px)}
.gs-btn.primary{background:var(--amber);border-color:var(--amber);color:#14100a;font-weight:500}
.gs-btn.primary:hover{background:#ffc14d}

/* id card */
.gs-idcard{justify-self:end;width:min(300px,80vw)}
@media(max-width:860px){.gs-idcard{justify-self:start}}
.gs-idcard-frame{position:relative;background:var(--surface);border:1px solid var(--line);padding:10px}
.gs-idcard-frame img{display:block;width:100%;height:auto;filter:saturate(.92) contrast(1.03)}
.gs-corner{position:absolute;width:14px;height:14px;border:2px solid var(--amber)}
.gs-corner.tl{top:-2px;left:-2px;border-right:0;border-bottom:0}
.gs-corner.tr{top:-2px;right:-2px;border-left:0;border-bottom:0}
.gs-corner.bl{bottom:-2px;left:-2px;border-right:0;border-top:0}
.gs-corner.br{bottom:-2px;right:-2px;border-left:0;border-top:0}
.gs-idcard-meta{margin-top:12px;display:grid;gap:4px}
.gs-idcard-meta>div{display:flex;align-items:center;gap:8px}

/* metrics */
.gs-metrics{
  display:grid;grid-template-columns:repeat(4,1fr);
  border:1px solid var(--line);background:var(--surface);
  margin:32px 0 72px;
}
@media(max-width:720px){.gs-metrics{grid-template-columns:repeat(2,1fr)}}
.gs-metric{
  padding:22px 24px;border-right:1px solid var(--line);
  opacity:0;transform:translateY(10px);transition:opacity .5s,transform .5s;
}
.gs-metric:last-child{border-right:0}
@media(max-width:720px){.gs-metric:nth-child(2){border-right:0}.gs-metric:nth-child(-n+2){border-bottom:1px solid var(--line)}}
.gs-metrics.on .gs-metric{opacity:1;transform:none}
.gs-metric-v{font-family:'Archivo',sans-serif;font-weight:800;font-size:2rem;font-variation-settings:'wdth' 110;color:var(--amber)}
.gs-metric-u{font-size:1rem;color:var(--dim);margin-left:2px}
.gs-metric-l{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:var(--dim);letter-spacing:.06em;text-transform:uppercase;margin-top:4px}

/* section tags */
.gs-sectiontag{
  font-family:'IBM Plex Mono',monospace;font-size:.8rem;letter-spacing:.14em;
  color:var(--amber);margin:80px 0 8px;scroll-margin-top:80px;
  display:flex;align-items:center;gap:10px;
}
.gs-sectiontag::after{content:'';flex:1;height:1px;background:var(--line)}
.gs-sectiontag-hash{color:var(--dim)}
.gs-section-sub{color:var(--dim);margin-bottom:36px;max-width:60ch}

/* releases */
.gs-releases{display:grid}
.gs-release{
  display:grid;grid-template-columns:28px 1fr;gap:20px;
  opacity:0;transform:translateY(14px);transition:opacity .55s,transform .55s;
}
.gs-release.on{opacity:1;transform:none}
.gs-release-rail{position:relative;display:flex;justify-content:center}
.gs-node{
  width:11px;height:11px;border-radius:50%;margin-top:8px;flex:none;
  background:var(--raised);border:2px solid var(--dim);z-index:1;
}
.gs-node.live{border-color:var(--green);background:var(--green);box-shadow:0 0 10px rgba(52,217,143,.6)}
.gs-rail-line{position:absolute;top:22px;bottom:-8px;width:1px;background:var(--line)}
.gs-release-body{padding-bottom:44px}
.gs-release-top{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px}
.gs-vtag{
  background:var(--amber-soft);color:var(--amber);
  border:1px solid rgba(255,178,36,.35);border-radius:3px;padding:2px 8px;font-weight:500;
}
.gs-vtag.live{background:rgba(52,217,143,.12);color:var(--green);border-color:rgba(52,217,143,.4)}
.gs-pill-live{color:var(--green);letter-spacing:.16em;font-size:.68rem}
.gs-note{color:var(--dim);font-style:italic;font-size:.74rem}
.gs-release-title{font-family:'Archivo',sans-serif;font-weight:700;font-size:1.25rem;font-variation-settings:'wdth' 108;letter-spacing:-.01em}
.gs-role{color:var(--dim);font-weight:450;font-family:'IBM Plex Sans',sans-serif;font-size:1rem}
.gs-added{list-style:none;padding:0;margin:12px 0 14px;display:grid;gap:6px}
.gs-added li{color:#c4ccdb;padding-left:22px;position:relative;max-width:72ch}
.gs-plus{position:absolute;left:0;color:var(--green)}
.gs-tags{display:flex;flex-wrap:wrap;gap:8px}
.gs-tags span{
  border:1px solid var(--line);color:var(--dim);
  padding:3px 9px;border-radius:3px;font-size:.72rem;background:var(--surface);
}

/* services */
.gs-svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:32px}
@media(max-width:820px){.gs-svc-grid{grid-template-columns:1fr}}
.gs-svc{
  background:var(--surface);border:1px solid var(--line);border-radius:6px;
  padding:24px;display:flex;flex-direction:column;gap:12px;
  opacity:0;transform:translateY(14px);
  transition:opacity .55s,transform .55s,border-color .2s;
}
.gs-svc.on{opacity:1;transform:none}
.gs-svc:hover{border-color:#31415a}
.gs-svc-head{display:flex;align-items:center;gap:10px}
.gs-svc-id{color:var(--dim)}
.gs-svc-role{margin-left:auto;font-size:.7rem;text-align:right}
.gs-svc-name{font-family:'Archivo',sans-serif;font-weight:750;font-size:1.35rem;font-variation-settings:'wdth' 110;letter-spacing:-.01em}
.gs-svc-kind{margin-top:-8px}
.gs-svc-desc{color:#c4ccdb;font-size:.95rem}
.gs-svc-metrics{display:flex;flex-wrap:wrap;gap:8px}
.gs-chip.amber{
  font-family:'IBM Plex Mono',monospace;font-size:.72rem;
  color:var(--amber);background:var(--amber-soft);
  border:1px solid rgba(255,178,36,.3);border-radius:3px;padding:3px 9px;
}

/* stack manifest */
.gs-manifest{
  border:1px solid var(--line);background:var(--surface);border-radius:6px;
  padding:8px 0;margin-top:32px;
  opacity:0;transform:translateY(12px);transition:opacity .5s,transform .5s;
}
.gs-manifest.on{opacity:1;transform:none}
.gs-manifest-row{
  display:grid;grid-template-columns:150px 1fr;gap:18px;
  padding:12px 24px;border-bottom:1px solid rgba(32,42,57,.6);
}
.gs-manifest-row:last-child{border-bottom:0}
@media(max-width:640px){.gs-manifest-row{grid-template-columns:1fr;gap:4px}}
.gs-manifest-key{color:var(--amber)}
.gs-manifest-vals{color:#c4ccdb}
.gs-sep{color:var(--dim);font-style:normal}

/* telemetry */
.gs-telemetry{border:1px solid var(--line);background:var(--surface);border-radius:6px;padding:24px;margin-top:32px}
.gs-telemetry-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.gs-mini-link{margin-left:auto;font-family:'IBM Plex Mono',monospace;font-size:.76rem;color:var(--amber)}
.gs-mini-link:hover{text-decoration:underline}
.gs-telemetry-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:22px 0}
@media(max-width:680px){.gs-telemetry-grid{grid-template-columns:repeat(2,1fr)}}
.gs-tstat-v{font-family:'Archivo',sans-serif;font-weight:800;font-size:1.7rem;font-variation-settings:'wdth' 110}
.gs-tstat-l{font-family:'IBM Plex Mono',monospace;font-size:.7rem;color:var(--dim);letter-spacing:.05em;text-transform:uppercase}
.gs-heatmap{display:flex;gap:3px;overflow-x:auto;padding:6px 0}
.gs-heatcol{display:flex;flex-direction:column;gap:3px}
.gs-cell{width:9px;height:9px;border-radius:2px;background:#161d29;flex:none}
.gs-cell.l1{background:#4a3a12}
.gs-cell.l2{background:#8a6516}
.gs-cell.l3{background:#c98d1c}
.gs-cell.l4{background:var(--amber)}
.gs-telemetry-note{font-size:.85rem;margin-top:14px}

/* contact */
.gs-contact{opacity:0;transform:translateY(14px);transition:opacity .55s,transform .55s}
.gs-contact.on{opacity:1;transform:none}
.gs-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin-top:32px}
@media(max-width:820px){.gs-contact-grid{grid-template-columns:1fr}}
.gs-h2{font-family:'Archivo',sans-serif;font-weight:850;font-size:clamp(1.8rem,3.6vw,2.6rem);font-variation-settings:'wdth' 112;letter-spacing:-.015em}
.gs-contact-links{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap}
.gs-curl{border:1px solid var(--line);border-radius:6px;background:#0C1017;overflow:hidden}
.gs-curl-bar{padding:8px 16px;border-bottom:1px solid var(--line);background:var(--surface)}
.gs-copy{
  display:block;width:100%;text-align:left;border:0;background:transparent;
  color:var(--ink);font:inherit;padding:18px 16px;cursor:pointer;position:relative;
}
.gs-copy code{white-space:pre-wrap;font-size:.8rem;line-height:1.7;color:#c4ccdb}
.gs-copy-flag{
  position:absolute;top:10px;right:12px;font-size:.68rem;color:var(--dim);
  border:1px solid var(--line);border-radius:3px;padding:2px 8px;transition:all .15s;
}
.gs-copy:hover .gs-copy-flag{color:var(--amber);border-color:var(--amber)}
.gs-copy-flag.on{color:var(--green);border-color:var(--green)}
.gs-footer{
  display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  margin-top:88px;padding-top:24px;border-top:1px solid var(--line);font-size:.72rem;
}

@media (prefers-reduced-motion: reduce){
  .gs-root *{animation:none!important;transition:none!important}
  .gs-metric,.gs-release,.gs-svc,.gs-manifest,.gs-contact,.gs-hero-main{opacity:1!important;transform:none!important}
}
`;
