import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth.context.jsx';
import { FileProvider } from './providers/file.provider.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <FileProvider>
      <AuthContextProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </AuthContextProvider>
      </FileProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
