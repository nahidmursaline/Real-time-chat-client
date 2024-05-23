import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AuthProvider from './provider/AuthProvider.jsx'
import { router } from './Routes/Routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<div className='max-w-7xl mx-auto'>
   <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
 </div>
</AuthProvider>
)
