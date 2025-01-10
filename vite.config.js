import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});

//This alters the api redirection from target to "/api/". Meaning http://localhost:5000/login can be reached via /api/login endpoint. 
//Same works on production. Please see vercel.json for clarification.
//This is done in order to provide same-origin mechanism. It is done due to browsers' extensive security policies.
//They include inability to file cross-domain cookies (JWT) and make it complicated to setup CORS policies. 