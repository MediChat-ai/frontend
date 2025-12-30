/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URI: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_ID?: string;
  readonly VITE_NAVER_REDIRECT_URI?: string;
  readonly VITE_RUNPOD_API_KEY?: string;
  readonly VITE_RUNPOD_ENDPOINT_ID?: string;
  readonly VITE_MODEL_NAME?: string;
  readonly VITE_GROQ_API_KEY?: string;
  readonly VITE_PUTER_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
