import {HttpProvider} from "./http-provider";
import {UnconfiguredProvider} from "./providers";
import type {AIProvider} from "./types";

let provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (provider) return provider;
  const apiKey=process.env.AI_PROVIDER_API_KEY;
  const imageUrl=process.env.IMAGE_PROVIDER_URL;
  const videoUrl=process.env.VIDEO_PROVIDER_URL;
  const editUrl=process.env.EDIT_PROVIDER_URL;
  provider=(imageUrl||videoUrl||editUrl)?new HttpProvider({imageUrl,videoUrl,editUrl,apiKey}):new UnconfiguredProvider();
  return provider;
}