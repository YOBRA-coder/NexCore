import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCounter } from "../utils/Shared";
import { PROJECTS, SERVICES, STACK } from "../utils/data";
import  {PCard}  from '../components/PCard1';
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Tilt } from "react-tilt";

// ─── HOME ─────────────────────────────────────────────────────
export function Home() {
    const navigate = useNavigate();
  const [mx, setMx] = useState(50); const [my, setMy] = useState(50);
  const heroRef = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    setMx(((e.clientX - r.left) / r.width) * 100);
    setMy(((e.clientY - r.top) / r.height) * 100);
  }, []);
  const c1 = useCounter(12); const c2 = useCounter(47); const c3 = useCounter(99); const c4 = useCounter(8);
  const cats = [
    { icon:"🌐", label:"Web & SaaS", color:"#0ea5e9" },
    { icon:"📱", label:"Android Apps", color:"#22c55e" },
    { icon:"🧠", label:"AI & ML", color:"#a855f7" },
    { icon:"⚡", label:"Trading Bots", color:"#00e5b4" },
    { icon:"🎨", label:"Design", color:"#f5a623" },
    { icon:"☁️", label:"Cloud", color:"#6366f1" }
  ];
  const { scrollYProgress } = useScroll();

  const scale = useTransform(
    scrollYProgress, [0, 1], [1, 1.15]
  );

  const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

  return (
    <div>
        <motion.div className="progress" style={{ scaleX: scrollYProgress,}}/>
      {/* HERO */}
      <section ref={heroRef} onMouseMove={onMove} style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:"var(--bg)",paddingTop:68 }}>
        <div className="mesh" />
        <motion.div style={{ scale }} className="aurora"/>
        <div className="grid-bg" />
        {/* mouse spotlight */}
        <div style={{ position:"absolute",inset:0,pointerEvents:"none",background:`radial-gradient(750px circle at ${mx}% ${my}%, rgba(124,58,237,.065) 0%, transparent 60%)`, transition:"background .08s" }} />
        {/* orbs */}
        {[[280,"8%","62%","rgba(124,58,237,.08)","0s"],[180,"58%","76%","rgba(0,229,180,.06)","2.5s"],[120,"72%","18%","rgba(245,166,35,.05)","5s"]].map(([s,t,l,c,d],i) => (
          <div key={i} style={{ position:"absolute",width:s as number,height:s as number,borderRadius:"50%",background:`radial-gradient(circle,${c} 0%,transparent 70%)`,top:t as string,left:l as string,animation:`float 9s ${d} ease-in-out infinite`,pointerEvents:"none" }} />
        ))}
            {Array.from({ length: 35 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="particle"
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration:
                        Math.random() * 5 + 4,
                      repeat: Infinity,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
        <div style={{ maxWidth:1320,margin:"0 auto",padding:"4rem 1.5rem",position:"relative",width:"100%" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1.15fr .85fr",gap:"4rem",alignItems:"center" }} className="g2">
            {/* LEFT */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
              <div className="chip">
              <span className="dot" />
              Enterprise Digital Studio
            </div>

            <h1 className="hero-title">
              Software &
              <br />
              <span className="gtext">
                Digital Solutions
              </span>
              <br />
              <span className="hero-sub">
                engineered-for-modern-businesses
              </span>
            </h1>

            <p className="hero-desc">
              NexCore builds AI systems,
              trading infrastructure,
              cloud platforms, mobile apps,
              and scalable digital products
              for startups and enterprises.
            </p>

            <div className="hero-actions">
              <button className="btn-primary" onClick={()=> navigate("/services")}>
                Explore Services →
              </button>

              <button className="btn-secondary" onClick={()=> navigate("/about")}>
                View Portfolio
              </button>
            </div>
              {/* counters */}
              <div className="au4" style={{ display:"flex",gap:"2.2rem",flexWrap:"wrap" }}>
                {[{ r:c1.ref,v:c1.val,s:"+",l:"Projects Built" },{ r:c2.ref,v:c2.val,s:"+",l:"Clients Served" },{ r:c3.ref,v:c3.val,s:"%",l:"Uptime SLA" },{ r:c4.ref,v:c4.val,s:" yrs",l:"Experience" }].map((s,i) => (
                  <div key={i} ref={s.r}>
                    <div style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:29,lineHeight:1,background:"linear-gradient(135deg,#fff,rgba(255,255,255,.65))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{s.v}{s.s}</div>
                    <div style={{ fontFamily:"var(--fb)",fontSize:11.5,color:"var(--t3)",marginTop:5 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* RIGHT — orbit */}
            <div className="hm au2" style={{ position:"relative",display:"flex",alignItems:"center",justifyContent:"center",height:440 }}>
              <div style={{ position:"relative",width:340,height:340 }}>
                {/* rings */}
                {[180,240,300].map((r,i) => (
                  <div key={r} style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:r,height:r,borderRadius:"50%",border:`1px solid rgba(139,92,246,${0.1-i*.025})`,animation:`spin ${20+i*10}s linear infinite ${i%2?"reverse":""}` }} />
                ))}
                {/* hub */}
                <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:96,height:96,borderRadius:"50%",background:"linear-gradient(135deg,rgba(124,58,237,.2),rgba(168,85,247,.12))",border:"1.5px solid rgba(139,92,246,.3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:5,boxShadow:"0 0 50px rgba(124,58,237,.2)" }}>
                  <span style={{ fontFamily:"var(--fd)",fontSize:13,fontWeight:700,color:"#a855f7" }}>Nex</span>
                  <span style={{ fontFamily:"var(--fd)",fontSize:13,fontWeight:700,color:"#00e5b4" }}>Core</span>
                </div>
                {/* orbit icons */}
                {cats.map((cat,i) => {
                  const a = (i/cats.length)*2*Math.PI - Math.PI/2;
                  const rx = Math.cos(a)*152, ry = Math.sin(a)*152;
                  return (
                    <div key={cat.label} style={{ position:"absolute",left:`calc(50% + ${rx}px - 32px)`,top:`calc(50% + ${ry}px - 32px)`,width:64,height:64,borderRadius:15,background:"var(--bg3)",border:`1px solid ${cat.color}22`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,boxShadow:"0 6px 24px rgba(0,0,0,.4)",transition:"all .3s",cursor:"pointer" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color+"66"; (e.currentTarget as HTMLElement).style.transform = "scale(1.12)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = cat.color+"22"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    >
                      <span style={{ fontSize:20 }}>{cat.icon}</span>
                      <span style={{ fontFamily:"var(--fb)",fontSize:8,color:"var(--t3)",textAlign:"center",fontWeight:500 }}>{cat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:"linear-gradient(90deg,var(--bg2),rgba(124,58,237,.04),var(--bg2))",borderTop:"1px solid rgba(139,92,246,.1)",borderBottom:"1px solid rgba(139,92,246,.1)",padding:"13px 0",overflow:"hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...STACK,...STACK].map((item,i) => (
              <span key={i} style={{ fontFamily:"var(--fm)",fontSize:12,color:"var(--t3)",letterSpacing:".06em",whiteSpace:"nowrap",padding:"0 2rem",display:"flex",alignItems:"center",gap:".75rem" }}>
                <span style={{ color:"#a855f7",opacity:.5 }}>◆</span>{item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WHAT WE DO */}
      <section style={{ padding:"7rem 1.5rem",background:"var(--bg)",position:"relative" }}>
        <div className="mesh" /><div className="grid-bg" />
        <div style={{ maxWidth:1320,margin:"0 auto",position:"relative" }}>
          <div style={{ textAlign:"center",marginBottom:"4rem" }}>
            <div className="chip" style={{ margin:"0 auto 1.5rem" }}>Our Expertise</div>
            <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(1.9rem,3.5vw,3rem)",color:"#fff",letterSpacing:"-.02em" }}>
              One studio. <span className="gtext">Every layer.</span>
            </h2>
            <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:16,marginTop:14,maxWidth:500,margin:"14px auto 0" }}>
             We build everything from
              frontend interfaces to AI
              infrastructure and cloud systems.
            </p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"2.5rem" }} className="g4">
     {SERVICES.map((svc, i) => (
              <Tilt
                glareEnable
                glareMaxOpacity={0.1}
                key={i}
              >
                <motion.div
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  className="service-card"
                >
                  <div
                    className="icon"
                    style={{
                      background: `${svc.accent}22`,
                    }}
                  >
                    {svc.icon}
                  </div>

                  <h3>{svc.title}</h3>

                  <p>{svc.subtitle}</p>

                  <div
                    className="price"
                    style={{
                      color: svc.accent,
                    }}
                  >
                    {svc.price}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={() => navigate("/services")} className="btn-g">View All Services + Pricing →</button>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ padding:"7rem 1.5rem",background:"var(--bg2)" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"3.5rem",flexWrap:"wrap",gap:"1rem" }}>
            <div>
              <div className="chip" style={{ marginBottom:"1rem" }}>Live Platforms</div>
              <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(1.9rem,3.5vw,3rem)",color:"#fff",letterSpacing:"-.02em" }}>
                Built. <span className="gtext-gold">Deployed.</span> Running.
              </h2>
            </div>
            <button onClick={() => navigate("/products")} className="btn-g">All Platforms →</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }} className="g3">
            {PROJECTS.slice(0,3).map(p => <PCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:"6rem 1.5rem",background:"var(--bg)" }}>
        <div style={{ maxWidth:1320,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
            <div className="chip" style={{ margin:"0 auto 1.25rem" }}>Client Stories</div>
            <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(1.7rem,3vw,2.5rem)",color:"#fff",letterSpacing:"-.02em" }}>What clients say</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem" }} className="g3">
            {[
              { q:"NexCore delivered our trading bot in 3 weeks. Runs live with real money and hasn't missed a beat.", a:"Alex M.", r:"Forex Trader, Nairobi", c:"#00e5b4" },
              { q:"The Android app they built saved our logistics team 4 hours of manual work every single day.", a:"Sarah K.", r:"Founder, QuickDeliver", c:"#a855f7" },
              { q:"Brand identity + website package was exactly what we needed to pitch investors. Closed our seed round.", a:"James O.", r:"CEO, FinEdge Capital", c:"#f5a623" }
            ].map((t,i) => (
              <div key={i} style={{ padding:"1.75rem",background:"var(--s)",border:"1px solid var(--b)",borderRadius:18,borderTop:`3px solid ${t.c}` }}>
                <p style={{ fontFamily:"var(--fb)",fontSize:14.5,color:"var(--t2)",lineHeight:1.78,marginBottom:"1.25rem",fontStyle:"italic" }}>"{t.q}"</p>
                <div style={{ fontFamily:"var(--fb)",fontWeight:600,color:"#fff",fontSize:14 }}>{t.a}</div>
                <div style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)",marginTop:3 }}>{t.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"7rem 1.5rem",textAlign:"center",background:"linear-gradient(180deg,var(--bg2),var(--bg))",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.07) 0%,transparent 70%)",pointerEvents:"none" }} />
        <div style={{ position:"relative",maxWidth:680,margin:"0 auto" }}>
          <div className="chip" style={{ margin:"0 auto 1.5rem" }}>Ready to launch?</div>
          <h2 style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:"clamp(2rem,4vw,3.4rem)",color:"#fff",letterSpacing:"-.025em",lineHeight:1.1,marginBottom:"1.25rem" }}>
            Let's build your next<br /><span className="gtext">big thing together</span>
          </h2>
          <p style={{ fontFamily:"var(--fb)",color:"var(--t2)",fontSize:16.5,lineHeight:1.75,marginBottom:"2.5rem" }}>
            Web app, Android app, AI system, trading bot, brand identity — whatever you need, we scope it and ship it.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <button onClick={() => navigate("/contact")} className="btn-p" style={{ fontSize:16,padding:"15px 36px" }}>Start a Project →</button>
            <button onClick={() => navigate("/services")} className="btn-g" style={{ fontSize:15 }}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}