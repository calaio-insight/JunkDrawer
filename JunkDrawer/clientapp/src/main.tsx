import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserWrapper} from "./contexts/user.context.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <UserWrapper>              
              <App />
          </UserWrapper>
      </BrowserRouter>        
  </StrictMode>,
)
