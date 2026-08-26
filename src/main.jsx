import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ProductDataProvider } from './context/ProductDataContext.jsx'
import { QuotationProvider } from './context/QuotationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ProductDataProvider>
        <QuotationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QuotationProvider>
      </ProductDataProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
