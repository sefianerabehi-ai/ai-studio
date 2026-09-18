"use client";
import {useState} from "react";
import {Image as ImageIcon,Video,WandSparkles,ArrowLeft,Upload,Play} from "lucide-react";
import Link from "next/link";
export default function Create(){
 const [mode,setMode]=useState<"image"|"video"|"edit">("image");
 const [prompt,setPrompt]=useState(""); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
 async function generate(){
  if(!prompt.trim())return setMessage("اكتب وصفًا أولًا.");
  setBusy(true);setMessage("");
  try{const endpoint=mode==="image"?"/api/generate/image":mode==="video"?"/api/generate/video":"/api/edit";
   const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,aspectRatio:"16:9",resolution:"1080p",duration:8})});
   const d=await r.json(); if(!r.ok)throw new Error(d.message||d.error||"تعذر تنفيذ الطلب"); setMessage(d.message||"تم إرسال الطلب بنجاح.");
  }catch(e){setMessage(e instanceof Error?e.message:"حدث خطأ");}finally{setBusy(false)}
 }
 return <main className="page"><header className="pagehead"><Link href="/" className="back"><ArrowLeft size={16}/> Studio</Link><div><h1>Create</h1><p>أنشئ صورًا وفيديوهات وعدّل ملفاتك من مساحة واحدة.</p></div></header>
 <section className="creategrid"><aside className="panel modes">{[["image","Image",ImageIcon],["video","Video",Video],["edit","Edit",WandSparkles]].map(([id,label,Icon])=><button key={id} className={mode===id?"mode active":"mode"} onClick={()=>setMode(id as typeof mode)}><Icon size={20}/><span>{label}</span></button>)}<div className="uploadbox"><Upload size={22}/><b>Upload media</b><small>PNG, JPG, MP4, MOV</small><input type="file" accept="image/*,video/*"/></div></aside>
 <div className="panel composer"><span className="eyebrow">{mode.toUpperCase()}</span><h2>{mode==="image"?"Describe your image":mode==="video"?"Describe your video":"Describe the edit"}</h2><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={mode==="edit"?"Example: remove the background and make the lighting cinematic…":"Example: cinematic futuristic city at night, volumetric light, ultra detailed…"}/><div className="chips"><span>16:9</span><span>1080p</span>{mode==="video"&&<span>8 sec</span>}</div><button className="generate" disabled={busy} onClick={generate}><WandSparkles size={18}/>{busy?"Processing…":"Generate"}<Play size={16}/></button>{message&&<div className="status">{message}</div>}</div></section></main>
}