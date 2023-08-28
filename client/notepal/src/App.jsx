import { React } from 'react'
import './App.css'

import{Routes,Route, Navigate} from "react-router-dom"
import Login from './pages/Login'
import { useContext } from 'react'
import {AuthContext} from "./context/AuthContext";

import Home from './pages/Home';
import AllNotes from './pages/AllNotes';
import NoteDetail from './pages/NoteDetail';
import SharedLayout from './Components/sharedLayout/SharedLayout'


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
 