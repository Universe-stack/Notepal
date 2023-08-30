import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StateContextProvider } from './context/StateContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

   <StateContextProvider>
      {/* <AuthContextProvider> */}
      {/* <SearchContextProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>  
      {/* </SearchContextProvider> */}
    {/* </AuthContextProvider> */}
    </StateContextProvider> 
  </React.StrictMode>,
)
