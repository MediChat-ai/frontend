// Vite 환경변수 (import.meta.env) 또는 전역 상수 (__VITE_*__) 사용
// Vercel 빌드 시 둘 다 지원하도록 폴백 처리
declare const __VITE_BACKEND_URI__: string | undefined;
declare const __VITE_GOOGLE_CLIENT_ID__: string | undefined;
declare const __VITE_NAVER_CLIENT_ID__: string | undefined;
declare const __VITE_NAVER_REDIRECT_URI__: string | undefined;
declare const __VITE_GROQ_API_KEY__: string | undefined;

export const env = {
  backend: import.meta.env.VITE_BACKEND_URI || (typeof __VITE_BACKEND_URI__ !== 'undefined' ? __VITE_BACKEND_URI__ : ''),
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || (typeof __VITE_GOOGLE_CLIENT_ID__ !== 'undefined' ? __VITE_GOOGLE_CLIENT_ID__ : ''),
  naverClientId: import.meta.env.VITE_NAVER_CLIENT_ID || (typeof __VITE_NAVER_CLIENT_ID__ !== 'undefined' ? __VITE_NAVER_CLIENT_ID__ : undefined),
  naverRedirectUri: import.meta.env.VITE_NAVER_REDIRECT_URI || (typeof __VITE_NAVER_REDIRECT_URI__ !== 'undefined' ? __VITE_NAVER_REDIRECT_URI__ : undefined),
  groqApiKey: import.meta.env.VITE_GROQ_API_KEY || (typeof __VITE_GROQ_API_KEY__ !== 'undefined' ? __VITE_GROQ_API_KEY__ : undefined),
};
