import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx';
import { StateContextProvider } from './context/StateContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import {disableReactDevtools} from '@fvilers/disable-react-devtools'


if(process.env.NODE_ENV === 'production') disableReactDevtools()

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
