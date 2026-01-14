import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel';

export default defineConfig(({ mode }) => {
  // 환경변수 로드 (VITE_ 접두사 포함)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [vercel(), react()],
    server: {
      host: true,
      port: 3000
    },
    preview: {
      host: true,
      port: 4173
    },
    define: {
      // Vercel 빌드 시 환경변수를 전역 상수로 정의
      __VITE_BACKEND_URI__: JSON.stringify(env.VITE_BACKEND_URI),
      __VITE_GOOGLE_CLIENT_ID__: JSON.stringify(env.VITE_GOOGLE_CLIENT_ID),
      __VITE_NAVER_CLIENT_ID__: JSON.stringify(env.VITE_NAVER_CLIENT_ID),
      __VITE_NAVER_REDIRECT_URI__: JSON.stringify(env.VITE_NAVER_REDIRECT_URI),
      __VITE_GROQ_API_KEY__: JSON.stringify(env.VITE_GROQ_API_KEY),
    }
  };
});
