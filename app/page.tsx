"use client";
import { useState } from "react";

const STYLES = [
  { id: "realistic", name: "Realistic", icon: "📷" },
  { id: "anime", name: "Anime", icon: "🎌" },
  { id: "oil", name: "Oil Painting", icon: "🎨" },
  { id: "pixel", name: "Pixel Art", icon: "👾" },
  { id: "3d", name: "3D Render", icon: "🧊" },
  { id: "watercolor", name: "Watercolor", icon: "🖌️" },
];

const SAMPLES = [
  "A magical forest with glowing mushrooms at twilight",
  "Cyberpunk city skyline with neon reflections",
  "A cozy coffee shop interior on a rainy day",
  "Space explorer standing on an alien planet",
  "Underwater kingdom with bioluminescent creatures",
  "Steampunk airship floating above clouds",
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1024x1024");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState(5);

  const generate = () => {
    if (!prompt || credits <= 0) return;
    setLoading(true);
    setCredits(c => c - 1);
    // Simulated generation
    setTimeout(() => {
      const colors = ["#667eea","#764ba2","#f093fb","#f5576c","#4facfe","#00f2fe"];
      const newImages = Array(4).fill(null).map((_, i) => ({
        id: Date.now() + i,
        url: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${colors[i]}"/><stop offset="100%" style="stop-color:${colors[(i+2)%6]}"/></linearGradient></defs><rect width="512" height="512" fill="url(#g${i})"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="20" font-family="sans-serif">${style} #${i+1}</text></svg>`)}`,
        prompt: prompt
      }));
      setImages(prev => [...newImages, ...prev]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0c0c1d 0%,#1a1a2e 50%,#16213e 100%)",fontFamily:"system-ui"}}>
      <header style={{padding:"16px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>🎨</span>
          <h1 style={{color:"white",fontSize:22,fontWeight:700,margin:0}}>AI Image Studio</h1>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <span style={{color:"#ffd700",fontWeight:600}}>⚡ {credits} credits</span>
          <button style={{padding:"8px 20px",borderRadius:20,border:"none",background:"linear-gradient(135deg,#667eea,#764ba2)",color:"white",cursor:"pointer",fontWeight:600}}>Get More Credits</button>
        </div>
      </header>
      <main style={{maxWidth:1100,margin:"0 auto",padding:"32px 20px"}}>
        <div style={{textAlign:"center",color:"white",marginBottom:36}}>
          <h2 style={{fontSize:36,fontWeight:800,marginBottom:8,background:"linear-gradient(135deg,#667eea,#f093fb)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Create Stunning Images with AI</h2>
          <p style={{color:"#8892b0",fontSize:16}}>Transform your ideas into beautiful artwork in seconds</p>
        </div>
        <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:28,border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(10px)"}}>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe the image you want to create..." rows={3}
            style={{width:"100%",padding:"14px 18px",borderRadius:12,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(0,0,0,0.3)",color:"white",fontSize:16,resize:"none",boxSizing:"border-box",fontFamily:"system-ui"}} />
          <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"16px 0"}}>
            {SAMPLES.map((s,i) => (
              <button key={i} onClick={() => setPrompt(s)}
                style={{padding:"6px 14px",borderRadius:20,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.05)",color:"#8892b0",fontSize:12,cursor:"pointer"}}>
                {s.slice(0,40)}...
              </button>
            ))}
          </div>
          <div style={{margin:"16px 0"}}>
            <p style={{color:"#8892b0",fontSize:13,marginBottom:8}}>Style</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {STYLES.map(s => (
                <button key={s.id} onClick={() => setStyle(s.id)}
                  style={{padding:"8px 16px",borderRadius:10,border:style===s.id?"2px solid #667eea":"1px solid rgba(255,255,255,0.1)",background:style===s.id?"rgba(102,126,234,0.2)":"rgba(255,255,255,0.05)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                  <span>{s.icon}</span><span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{margin:"16px 0"}}>
            <p style={{color:"#8892b0",fontSize:13,marginBottom:8}}>Size</p>
            <div style={{display:"flex",gap:8}}>
              {["512x512","1024x1024","1024x768","768x1024"].map(s => (
                <button key={s} onClick={() => setSize(s)}
                  style={{padding:"6px 14px",borderRadius:8,border:size===s?"2px solid #667eea":"1px solid rgba(255,255,255,0.1)",background:size===s?"rgba(102,126,234,0.2)":"transparent",color:"white",fontSize:13,cursor:"pointer"}}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={generate} disabled={loading || !prompt || credits <= 0}
            style={{width:"100%",padding:"16px",borderRadius:12,border:"none",
              background:loading||!prompt||credits<=0?"#333":"linear-gradient(135deg,#667eea,#764ba2)",
              color:"white",fontSize:18,fontWeight:700,cursor:loading||!prompt||credits<=0?"not-allowed":"pointer",marginTop:8}}>
            {loading ? "⏳ Generating..." : credits <= 0 ? "🔒 No credits - Upgrade to Pro" : "🎨 Generate Image (1 credit)"}
          </button>
        </div>
        {images.length > 0 && (
          <div style={{marginTop:32}}>
            <h3 style={{color:"white",marginBottom:16}}>Your Creations</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {images.map(img => (
                <div key={img.id} style={{borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer"}}>
                  <img src={img.url} alt={img.prompt} style={{width:"100%",display:"block"}} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginTop:48,color:"white"}}>
          {[
            {name:"Free",price:"$0",features:["5 images/day","All styles","512x512 only","Watermark"]},
            {name:"Pro",price:"$12/mo",features:["200 images/month","All styles","Up to 2048x2048","No watermark","Priority queue"]},
            {name:"Business",price:"$39/mo",features:["1000 images/month","API access","Custom styles","Commercial license","Team accounts"]},
          ].map(plan => (
            <div key={plan.name} style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:24,border:plan.name==="Pro"?"2px solid #667eea":"1px solid rgba(255,255,255,0.1)",position:"relative"}}>
              {plan.name==="Pro" && <span style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"#667eea",padding:"3px 14px",borderRadius:12,fontSize:11,fontWeight:700}}>BEST VALUE</span>}
              <h3 style={{fontSize:18,marginBottom:4}}>{plan.name}</h3>
              <p style={{fontSize:32,fontWeight:800,margin:"4px 0 16px"}}>{plan.price}</p>
              <ul style={{listStyle:"none",padding:0,lineHeight:2}}>
                {plan.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
