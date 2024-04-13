import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import { LoadingProvider } from './components/LoadingContext.jsx'





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoadingProvider>
      <App />
    </LoadingProvider>
 
    </BrowserRouter>

  </React.StrictMode>,
)
