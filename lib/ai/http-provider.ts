import type {AIProvider, EditInput, GenerationResult, ImageGenerationInput, VideoGenerationInput} from "./types";

type Config={imageUrl?:string;videoUrl?:string;editUrl?:string;apiKey?:string};

async function call(url:string|undefined,apiKey:string|undefined,mode:GenerationResult["mode"],payload:unknown):Promise<GenerationResult>{
  if(!url)return{id:crypto.randomUUID(),status:"queued",mode,provider:"unconfigured",message:"No endpoint configured for this operation."};
  const response=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json",...(apiKey?{"Authorization":`Bearer ${apiKey}`}: {})},body:JSON.stringify(payload),cache:"no-store"});
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(typeof data?.error==="string"?data.error:`Provider request failed (${response.status}).`);
  return{id:String(data.id??data.job_id??crypto.randomUUID()),status:data.status==="completed"?"completed":data.status==="processing"?"processing":"queued",mode,provider:"http",outputUrl:data.outputUrl??data.output_url,message:data.message};
}

export class HttpProvider implements AIProvider{
  readonly name="http";
  constructor(private config:Config){}
  generateImage(input:ImageGenerationInput){return call(this.config.imageUrl,this.config.apiKey,"image",input)}
  generateVideo(input:VideoGenerationInput){return call(this.config.videoUrl,this.config.apiKey,"video",input)}
  edit(input:EditInput){return call(this.config.editUrl??this.config.imageUrl,this.config.apiKey,"edit",input)}
}