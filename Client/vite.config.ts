import { defineConfig, } from 'vite'
import react from '@vitejs/plugin-react'
import {config} from "dotenv"

config()

// https://vitejs.dev/config/
export default defineConfig(({})=>{
  
 return {
    server:{
      proxy:{
        "/api":`https://chat-app-fve1.onrender.com`
      }
    },
    plugins: [react()],
  }
})
