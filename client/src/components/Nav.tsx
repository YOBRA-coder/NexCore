import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";


// ─── NAV ──────────────────────────────────────────────────────
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [["Home","/"],["Dashboard","/dashboard"],["Services","/services"],["Products","/products"],["Articles","/articles"],["Careers","/careers"],["About","/about"],["Contact","/contact"],["Request a Quote","/request-quote"]];
  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:900,background:scrolled?"color-mix(in srgb, var(--bg) 90%, transparent)":"transparent",backdropFilter:scrolled?"blur(22px)":"none",borderBottom:scrolled?"1px solid rgba(139,92,246,0.1)":"none",transition:"all .4s",padding:"0 1.5rem" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68 }}>
          <div onClick={() => { navigate("/"); setMob(false); }} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:11,userSelect:"none" }}>
            <div className="brand-logo-mark brand-logo-mark-nav">
              <img src="/yobby.png" alt="Yobby Technologies logo"/>
            </div>
           <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 19, color: "var(--t)", display: "inline-flex", alignItems: "baseline" }}>
  Y
  <span className="dot1"></span>
  bby
</span>
          </div>
          <div className="hm" style={{ display:"flex",gap:2 }}>
              {links.map(([l,p]) => (
             <NavLink key={l} to={p} style={({ isActive }) => ({ background:"none",border:"none",cursor:"pointer",textDecoration:"none",color: isActive ? "#a855f7":"var(--t2)",fontFamily:"var(--fb)",fontWeight:500,fontSize:13.5,padding:"7px 13px",borderRadius:8,transition:"color .2s",position:"relative" })}>
              <span style={{fontSize: 14,width: 18,textAlign: "center",}}></span>{l}
              </NavLink>
              ))}
          </div>
         
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <ThemeToggle />
            <button onClick={() => navigate("/contact")} className="btn-p hm" style={{ fontSize:13,padding:"9px 20px" }}>Start a Project →</button>
            <button onClick={() => setMob(!mob)} className="mmb" style={{ display:"none",background:"var(--s)",border:"1px solid var(--b)",borderRadius:8,padding:"9px 13px",cursor:"pointer",color:"var(--t2)",fontFamily:"var(--fm)",fontSize:14 }}>☰</button>
          </div>
          
        </div>
      </nav>
      {mob && (
        <div style={{ position:"fixed",top:68,left:0,right:0,bottom:0,zIndex:899,background:"color-mix(in srgb, var(--bg) 97%, transparent)",backdropFilter:"blur(22px)",display:"flex",flexDirection:"column",padding:"2rem 1.5rem",gap:6 }}>
          {links.map(([l,p]) => (
            <NavLink key={l} to={p} style={({ isActive }) => ({ background:"none",border:"none",cursor:"pointer",textDecoration:"none",color: isActive ? "#a855f7":"var(--t2)",fontFamily:"var(--fb)",fontWeight:500,fontSize:16,padding:"10px 14px",borderRadius:8,transition:"color .2s",position:"relative" })}               onClick={()=>setMob(false)} >
              <span style={{fontSize: 14,width: 18,textAlign: "center",}}></span>{l}
              </NavLink>
          ))}
          <button onClick={() => { navigate("/contact"); setMob(false); }} className="btn-p" style={{ marginTop:16 }}>Start a Project →</button>
        </div>
      )}
    </>
  );
}
