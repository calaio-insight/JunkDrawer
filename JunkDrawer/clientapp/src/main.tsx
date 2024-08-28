import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserWrapper} from "./contexts/user.context.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="1038302492508-tlu4o4n6aa21oq9386ktesf6hj0t8vna.apps.googleusercontent.com">
        <StrictMode>
          <BrowserRouter>
              <UserWrapper>              
                  <App />
              </UserWrapper>
          </BrowserRouter>        
      </StrictMode>,
    </GoogleOAuthProvider>
)
