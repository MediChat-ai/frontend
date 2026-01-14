// Vite 환경변수는 빌드 시 import.meta.env.VITE_* 로 자동 치환됨
// Vercel에서는 대시보드의 Environment Variables에 VITE_ 접두사로 설정 필요

export const env = {
  backend: import.meta.env.VITE_BACKEND_URI as string ?? '',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string ?? '',
  naverClientId: import.meta.env.VITE_NAVER_CLIENT_ID as string | undefined,
  naverRedirectUri: import.meta.env.VITE_NAVER_REDIRECT_URI as string | undefined,
  groqApiKey: import.meta.env.VITE_GROQ_API_KEY as string | undefined,
};
