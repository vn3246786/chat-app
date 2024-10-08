import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserContextprovider from './Contexts/UserContext/UserContext.tsx'
import ChatContextprovider from './Contexts/ChatContext/ChatContext.tsx'

createRoot(document.getElementById('root')!).render(
    <UserContextprovider>
      <ChatContextprovider>
    <App />
      </ChatContextprovider>
    </UserContextprovider>
)
