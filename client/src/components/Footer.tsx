import { useNavigate } from "react-router-dom";

// ─── FOOTER ───────────────────────────────────────────────────
export function Footer() {
    const navigate = useNavigate();
  return (
    <footer style={{ background:"#020309",borderTop:"1px solid rgba(139,92,246,.08)",padding:"4rem 1.5rem 2.5rem" }}>
      <div style={{ maxWidth:1320,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr 1fr",gap:"3rem",marginBottom:"3rem" }} className="g4">
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:11,marginBottom:"1.25rem" }}>
              <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#7c3aed,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fd)",fontWeight:700,fontSize:16,color:"#fff" }}>
                <img height={36} width={36} src="logo.png"/>
              </div>
              <span style={{ fontFamily:"var(--fd)",fontWeight:700,fontSize:18,color:"#fff" }}>Yobby Technologies</span>
            </div>
            <p style={{ fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t3)",lineHeight:1.75,maxWidth:300 }}>
              We don't just build — we solve. Full-service digital studio: web, mobile, AI, trading, design, and cloud.
            </p>
            <div style={{ display:"flex",gap:8,marginTop:"1.5rem" }}>
              {["🐙","🐦","💼","📱"].map((icon,i) => (
                <div key={i} style={{ width:36,height:36,borderRadius:10,background:"var(--s)",border:"1px solid var(--b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,cursor:"pointer",transition:"all .2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,.3)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--b)"}
                >{icon}</div>
              ))}
            </div>
          </div>
          {[
            { title:"Company", items:[["Home","/"],["About","/about"],["Articles","/articles"],["Contact","/contact"]] },
            { title:"Platform", items:[["Dashboard","/dashboard"],["Products","/products"],["Services","/services"]] },
            { title:"Services", items:[["Web Development","/services"],["Android Apps","/services"],["AI & ML","/services"],["Trading Bots","/services"],["Design","/services"]] }
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:"var(--fm)",fontSize:10,color:"#a855f7",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem" }}>{col.title}</div>
              {col.items.map(([l,p]) => (
                <button key={l} onClick={() => navigate(p)} style={{ display:"block",background:"none",border:"none",cursor:"pointer",fontFamily:"var(--fb)",fontSize:13.5,color:"var(--t3)",padding:"5px 0",textAlign:"left",transition:"color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--t3)")}
                >{l}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"1.75rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem" }}>
          <span style={{ fontFamily:"var(--fb)",fontSize:12.5,color:"var(--t3)" }}>© 2026 Yobby Technologies Solutions. Built in Nakuru, Kenya 🇰🇪</span>
          <div style={{ display:"flex",gap:"1.5rem",alignItems:"center" }}>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div className="sdot" style={{ color:"#00e5b4",background:"#00e5b4" }} />
              <span style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)" }}>All systems operational</span>
            </div>
            <span style={{ fontFamily:"var(--fm)",fontSize:11,color:"var(--t3)" }}>v3.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}