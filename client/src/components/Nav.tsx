import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";


// ─── NAV ──────────────────────────────────────────────────────
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const links = [["Home","/"],["Dashboard","/dashboard"],["Services","/services"],["Products","/products"],["Articles","/articles"],["About","/about"],["Contact","/contact"]];
  return (
    <>
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:900,background:scrolled?"rgba(5,6,15,0.9)":"transparent",backdropFilter:scrolled?"blur(22px)":"none",borderBottom:scrolled?"1px solid rgba(139,92,246,0.1)":"none",transition:"all .4s",padding:"0 1.5rem" }}>
        <div style={{ maxWidth:1320,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68 }}>
          <div onClick={() => { navigate("/"); setMob(false); }} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:11,userSelect:"none" }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontWeight:700,fontSize:17,color:"#fff",boxShadow:"0 0 18px rgba(124,58,237,.5)" }}>
              <img width={36} height={36} src="logo.png"/>
            </div>
            <span style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:19,color:"#fff" }}>YobbyTech<span><div className="dot"></div></span></span>
          </div>
          <div className="hm" style={{ display:"flex",gap:2 }}>
              {links.map(([l,p]) => (
             <NavLink key={l} to={p} style={({ isActive }) => ({ background:"none",border:"none",cursor:"pointer",textDecoration:"none",color: isActive ? "#a855f7":"var(--t2)",fontFamily:"var(--fb)",fontWeight:500,fontSize:13.5,padding:"7px 13px",borderRadius:8,transition:"color .2s",position:"relative" })}>
              <span style={{fontSize: 14,width: 18,textAlign: "center",}}></span>{l}
              </NavLink>
              ))}
          </div>
         
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <button onClick={() => navigate("/contact")} className="btn-p hm" style={{ fontSize:13,padding:"9px 20px" }}>Start a Project →</button>
            <button onClick={() => setMob(!mob)} className="mmb" style={{ display:"none",background:"var(--s)",border:"1px solid var(--b)",borderRadius:8,padding:"9px 13px",cursor:"pointer",color:"var(--t2)",fontFamily:"var(--fm)",fontSize:14 }}>☰</button>
          </div>
          
        </div>
      </nav>
      {mob && (
        <div style={{ position:"fixed",top:68,left:0,right:0,bottom:0,zIndex:899,background:"rgba(5,6,15,.97)",backdropFilter:"blur(22px)",display:"flex",flexDirection:"column",padding:"2rem 1.5rem",gap:6 }}>
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