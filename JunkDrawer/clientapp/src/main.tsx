import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserWrapper} from "./contexts/user.context.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <UserWrapper>
          <App />
      </UserWrapper>   
  </StrictMode>,
)
