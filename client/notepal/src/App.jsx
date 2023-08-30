import  React  from 'react'
import './App.css'

import{Routes,Route, Navigate} from "react-router-dom"
import Login from './pages/Login'
import { useContext } from 'react'
import {AuthContext} from "./context/AuthContext";


const Home = React.lazy(() => import('./pages/Home'));
const AllNotes = React.lazy(() => import('./pages/AllNotes'))
const NoteDetail = React.lazy(() => import('./pages/NoteDetail'));
const SharedLayout = React.lazy(() => import('./Components/sharedLayout/SharedLayout'))



function App() {

  const ProtectedRoute = ({children})=> {
    const {user} = useContext(AuthContext);

    if(!user) {
      return <Navigate to="./login" />
    }

    return children;
    
  }

  return (
      <Routes>
        <Route path="/" element={<SharedLayout/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/allNote" element={<AllNotes/>} />
          <Route index element={<Home />} />
          <Route path='allNotes/:allNotesId' element={<NoteDetail/>}/>
        </Route> 
      </Routes>
  )
}

export default App;
 