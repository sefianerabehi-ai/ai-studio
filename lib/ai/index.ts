import {UnconfiguredProvider} from "./providers";
import type {AIProvider} from "./types";

let provider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (provider) return provider;
  // Provider selection stays server-side. Add a real adapter here when credentials are available.
  provider = new UnconfiguredProvider();
  return provider;
}