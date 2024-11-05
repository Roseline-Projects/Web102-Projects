import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from '../routes/Layout.jsx'
import CharDetails from './components/CharDetails.jsx'
import CreateForm from './components/CreateForm.jsx'
import Gallery from './components/Gallery.jsx'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} path='/' element={<App />}/>
          <Route index={false} path='/charDetails/:character' element={<CharDetails />}/>
          <Route index={false} path='/create' element={<CreateForm type={'new'}/>} />
          <Route index={false} path='/gallery' element={<Gallery />} />
        </Route>
        <Route index={false} path='/edit/:character' element={<CreateForm type={'edit'} />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
