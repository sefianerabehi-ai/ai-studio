import type {AIProvider, EditInput, GenerationResult, ImageGenerationInput, VideoGenerationInput} from "./types";

const notConfigured = (mode: GenerationResult["mode"]): GenerationResult => ({
  id: crypto.randomUUID(),
  status: "queued",
  mode,
  provider: "unconfigured",
  message: "No AI provider is configured. Add a server-side provider adapter and credentials."
});

export class UnconfiguredProvider implements AIProvider {
  readonly name = "unconfigured";
  async generateImage(_: ImageGenerationInput){ return notConfigured("image"); }
  async generateVideo(_: VideoGenerationInput){ return notConfigured("video"); }
  async edit(_: EditInput){ return notConfigured("edit"); }
}