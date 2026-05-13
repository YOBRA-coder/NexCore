export const G = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#05060f;--bg2:#080a18;--bg3:#0c0e22;
  --s:rgba(255,255,255,0.028);--sh:rgba(255,255,255,0.052);
  --b:rgba(255,255,255,0.07);--ba:rgba(139,92,246,0.22);
  --t:#ffffff;--t2:rgba(255,255,255,0.6);--t3:rgba(255,255,255,0.32);
  --v:#7c3aed;--v2:#a855f7;--teal:#00e5b4;--gold:#f5a623;
  --fd:'Clash Display',sans-serif;--fb:'Plus Jakarta Sans',sans-serif;--fm:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--t);font-family:var(--fb);overflow-x:hidden;}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.28);border-radius:99px}
::selection{background:rgba(139,92,246,0.3);color:#fff}
::placeholder{color:rgba(255,255,255,0.18)!important}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-16px) rotate(1.5deg)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse2{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.4}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes scanUp{0%{top:100%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:-10%;opacity:0}}
.au{animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both}
.au1{animation:fadeUp .65s .1s cubic-bezier(.22,1,.36,1) both}
.au2{animation:fadeUp .65s .22s cubic-bezier(.22,1,.36,1) both}
.au3{animation:fadeUp .65s .36s cubic-bezier(.22,1,.36,1) both}
.au4{animation:fadeUp .65s .52s cubic-bezier(.22,1,.36,1) both}
.gtext{background:linear-gradient(130deg,#c084fc 0%,#7c3aed 45%,#00e5b4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gtext-gold{background:linear-gradient(130deg,#f5a623 0%,#ffd166 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.btn-p{background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;cursor:pointer;color:#fff;font-family:var(--fb);font-weight:700;font-size:14px;padding:12px 26px;border-radius:10px;transition:all .25s;position:relative;overflow:hidden;letter-spacing:.01em}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(124,58,237,.42)}
.btn-g{background:transparent;border:1px solid var(--b);cursor:pointer;color:var(--t2);font-family:var(--fb);font-weight:500;font-size:14px;padding:11px 22px;border-radius:10px;transition:all .25s}
.btn-g:hover{border-color:rgba(139,92,246,.35);color:#fff;background:rgba(139,92,246,.06)}
.chip{display:inline-flex;align-items:center;gap:7px;background:rgba(139,92,246,.07);border:1px solid rgba(139,92,246,.18);border-radius:99px;padding:5px 15px;font-family:var(--fm);font-size:11px;color:#a855f7;letter-spacing:.07em;text-transform:uppercase}
.sdot{width:6px;height:6px;border-radius:50%;display:inline-block;position:relative;flex-shrink:0}
.sdot::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid currentColor;animation:pulse2 2.2s infinite}
.card{background:var(--s);border:1px solid var(--b);border-radius:20px;transition:all .3s cubic-bezier(.22,1,.36,1)}
.card:hover{background:var(--sh);transform:translateY(-5px)}
.ticker-wrap{overflow:hidden;white-space:nowrap}
.ticker-inner{display:inline-flex;animation:ticker 28s linear infinite;width:max-content}
.ticker-inner:hover{animation-play-state:paused}
.noise{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:.022;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.mesh{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.mesh::before{content:'';position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 68%);top:-250px;left:-200px}
.mesh::after{content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,180,.07) 0%,transparent 68%);bottom:-150px;right:-100px}
.grid-bg{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(139,92,246,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.035) 1px,transparent 1px);background-size:68px 68px}
input,textarea,select{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--b);border-radius:10px;padding:12px 15px;color:var(--t);font-family:var(--fb);font-size:14px;outline:none;transition:border-color .2s}
input:focus,textarea:focus,select:focus{border-color:rgba(139,92,246,.45)}
select option{background:#0c0e22;color:#fff}
textarea{resize:vertical}
@media(max-width:900px){
  .hm{display:none!important}
  .g2{grid-template-columns:1fr!important}
  .g3{grid-template-columns:1fr!important}
  .g4{grid-template-columns:1fr 1fr!important}
  .mmb{display:flex!important}
}
`;