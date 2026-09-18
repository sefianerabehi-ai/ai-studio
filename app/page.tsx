"use client";
import {useState} from "react";
import {motion,AnimatePresence} from "framer-motion";
import {Sparkles,Image as ImageIcon,Video,Upload,Settings2,History,FolderOpen,Layers3,ChevronDown,Plus,Sun,Moon,ArrowUpRight,WandSparkles,Zap,ShieldCheck,SlidersHorizontal,X} from "lucide-react";

const tools=[{id:"image",name:"Image",icon:ImageIcon,desc:"Generate detailed images from text"},{id:"video",name:"Video",icon:Video,desc:"Create cinematic AI videos"},{id:"edit",name:"Edit",icon:WandSparkles,desc:"Transform your images and videos"}];

export default function Home(){
 const [mode,setMode]=useState("image"),[dark,setDark]=useState(true),[prompt,setPrompt]=useState(""),[open,setOpen]=useState(false),[file,setFile]=useState<string|null>(null),[fileName,setFileName]=useState(""),[busy,setBusy]=useState(false),[status,setStatus]=useState("");
 const choose=(e:React.ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(!f)return;setFile(URL.createObjectURL(f));setFileName(f.name)};
 return <main className={dark?"app dark":"app"}>
  <aside className="sidebar">
   <div className="brand"><div className="brandmark"><Sparkles size={18}/></div><span>AI Studio</span></div>
   <button className="newbtn" onClick={()=>{setMode("image");setPrompt("");setFile(null)}}><Plus size={17}/> New creation</button>
   <nav><a className="active" href="/"><Sparkles size={17}/>Create</a><a href="/tools"><Layers3 size={17}/>Tools</a><a href="/projects"><FolderOpen size={17}/>Projects</a><a href="/history"><History size={17}/>History</a></nav>
   <div className="sidebottom"><div className="procard"><Zap size={16}/><div><b>Studio ready</b><span>Provider-ready architecture. Add keys securely on the server.</span></div></div><a href="/settings"><Settings2 size={17}/>Settings</a></div>
  </aside>
  <section className="content">
   <header className="topbar"><div><span className="eyebrow">CREATIVE WORKSPACE</span><h1>What will you create?</h1></div><div className="topactions"><button className="iconbtn" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button className="avatar">SR</button></div></header>
   <div className="workspace">
    <div className="modebar">{tools.map(t=>{const I=t.icon;return <button key={t.id} onClick={()=>setMode(t.id)} className={mode===t.id?"mode active":"mode"}><I size={18}/><span>{t.name}</span></button>})}</div>
    <AnimatePresence mode="wait"><motion.div key={mode} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="editor">
      <div className="editorhead"><div><span className="pill">AI {mode.toUpperCase()}</span><h2>{mode==="image"?"Describe your image":mode==="video"?"Describe your video":"Upload something to transform"}</h2><p>{mode==="image"?"Turn an idea into a polished visual.":mode==="video"?"Create motion, atmosphere and cinematic scenes.":"Upload media and prepare it for AI editing."}</p></div><button className="smallbtn"><SlidersHorizontal size={16}/> Advanced</button></div>
      {mode==="edit"?<div className="dropzone" onClick={()=>document.getElementById("media-upload")?.click()}>
        <input id="media-upload" type="file" accept="image/*,video/*" hidden onChange={choose}/>
        {file?<>{file.match(/\.(mp4|mov|webm)$/i)?<video src={file} controls className="preview"/>:<img src={file} alt="" className="preview"/>}<b>{fileName}</b><span>Click to replace this file</span><button className="browse" onClick={e=>{e.stopPropagation();setFile(null)}}><X size={14}/> Remove</button></>:<><Upload size={30}/><b>Drop an image or video here</b><span>or click to browse • JPG, PNG, WEBP, MP4, MOV</span><button className="browse" onClick={e=>{e.stopPropagation();document.getElementById("media-upload")?.click()}}>Choose file</button></>}
      </div>:
      <><div className="promptbox"><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={mode==="image"?"A cinematic desert city at blue hour, ultra detailed, soft volumetric light...":"A cinematic drone shot flying through a futuristic coastal city at sunset..."}/><div className="promptfoot"><span>{prompt.length}/2000</span><button className="enhance"><WandSparkles size={15}/> Enhance prompt</button></div></div>
      <div className="controls"><label>Model<button onClick={()=>setOpen(!open)}>Creative v1 <ChevronDown size={15}/></button></label><label>Aspect ratio<button>16:9 <ChevronDown size={15}/></button></label><label>{mode==="image"?"Resolution":"Duration"}<button>{mode==="image"?"2048 × 1152":"8 seconds"} <ChevronDown size={15}/></button></label><label>{mode==="image"?"Variations":"Quality"}<button>{mode==="image"?"4 images":"High"} <ChevronDown size={15}/></button></label></div>
      {open&&<div className="menu"><b>Creative v1</b><span>Fast generation</span><b>Detail Pro</b><span>Maximum detail</span><b>Motion Studio</b><span>Designed for video</span></div>}
      <button className="generate" disabled={busy} onClick={async()=>{
 setBusy(true);setStatus("");
 try{
  const endpoint=mode==="image"?"/api/generate/image":mode==="video"?"/api/generate/video":"/api/edit";
  const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,aspectRatio:"16:9",resolution:mode==="image"?"2048x1152":"1080p",duration:8,variations:4,mediaUrl:file})});
  const data=await res.json();
  if(!res.ok) throw new Error(data.message||data.error||"Generation request failed.");
  setStatus(data.message||"Request queued.");
 }catch(error){setStatus(error instanceof Error?error.message:"Something went wrong.");}
 finally{setBusy(false);}
}}><Sparkles size={18}/> {busy?"Preparing…":"Generate"} <span>⌘ ↵</span></button>
{status&&<div className="status" role="status">{status}</div>}</>}
    </motion.div></AnimatePresence>
    <div className="lower"><div className="sectiontitle"><div><span className="eyebrow">WORKFLOW</span><h3>Start with a tool</h3></div><a href="/tools">View all <ArrowUpRight size={15}/></a></div><div className="cards">{tools.map(t=>{const I=t.icon;return <button key={t.id} onClick={()=>setMode(t.id)} className="toolcard"><div className="toolicon"><I size={20}/></div><div><b>{t.name}</b><span>{t.desc}</span></div><ArrowUpRight size={16}/></button>})}</div></div>
    <div className="trust"><ShieldCheck size={17}/><span>Files and provider keys are designed to stay server-side. No secrets in the browser.</span></div>
   </div>
  </section>
 </main>
}