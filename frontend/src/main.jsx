import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import GlobalContext from './store/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContext>
    <App />
  </GlobalContext>
)
