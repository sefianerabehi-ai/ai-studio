export type GenerationMode = "image" | "video" | "edit";

export type ImageGenerationInput = {
  prompt: string;
  model?: string;
  aspectRatio?: string;
  resolution?: string;
  variations?: number;
};

export type VideoGenerationInput = {
  prompt: string;
  model?: string;
  aspectRatio?: string;
  resolution?: string;
  duration?: number;
  fps?: number;
};

export type EditInput = {
  prompt: string;
  mediaUrl?: string;
};

export type GenerationResult = {
  id: string;
  status: "queued" | "processing" | "completed";
  mode: GenerationMode;
  provider: string;
  outputUrl?: string;
  message?: string;
};

export interface AIProvider {
  readonly name: string;
  generateImage(input: ImageGenerationInput): Promise<GenerationResult>;
  generateVideo(input: VideoGenerationInput): Promise<GenerationResult>;
  edit(input: EditInput): Promise<GenerationResult>;
}