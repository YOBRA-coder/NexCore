import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getInitialTheme } from './components/ThemeToggle.tsx'

document.documentElement.setAttribute('data-theme', getInitialTheme());

const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
