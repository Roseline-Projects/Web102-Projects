import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from '../routes/Layout.jsx'
import DetailView from '../routes/DetailView.jsx'
import NotFound from '../routes/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} path='/' element={<App />} />
          <Route index={false} path='/LocationDetail/:loc' element={<DetailView />}></Route>
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
