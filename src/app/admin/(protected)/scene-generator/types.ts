export type AIModel = 'nano-banana' | 'dall-e-3' | 'sora' | 'flow' | 'whisky';

export const AI_MODELS: {
  id: AIModel;
  name: string;
  description: string;
  available: boolean;
}[] = [
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'OpenAI - Alta qualidade, fotorrealismo',
    available: true,
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    description: 'Custom - Estilizado, artístico',
    available: false,
  },
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI - Geração de vídeo (Beta)',
    available: false,
  },
  {
    id: 'flow',
    name: 'Flow',
    description: 'Custom - Fluxo criativo dinâmico',
    available: false,
  },
  {
    id: 'whisky',
    name: 'Whisky',
    description: 'Custom - Estética cinematográfica',
    available: false,
  },
];

export type SceneGeneratorState = {
  success: boolean;
  images?: string[];
  error?: string;
  model?: AIModel;
};
