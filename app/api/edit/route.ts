import {getAIProvider} from "@/lib/ai";
import type {EditInput} from "@/lib/ai/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EditInput;
    if (!body.prompt?.trim()) return Response.json({error:"Edit instruction is required."},{status:400});
    const result = await getAIProvider().edit(body);
    if (result.provider === "unconfigured") return Response.json(result,{status:501});
    return Response.json(result);
  } catch {
    return Response.json({error:"Invalid request."},{status:400});
  }
}