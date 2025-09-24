import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { AppContextProvider } from './context/Context.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
          <App />
          <Toaster/>
    </AppContextProvider>
  </BrowserRouter>
    
    )
