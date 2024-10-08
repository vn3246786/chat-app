import { defineConfig, loadEnv,} from 'vite'
import react from '@vitejs/plugin-react'
import {config} from "dotenv"

config()

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode,process.cwd(),"VITE_")
 return {
    server:{
      proxy:{
        "/api":`${env.VITE_SERVER_URL}`
      }
    },
    plugins: [react()],
  }
})
