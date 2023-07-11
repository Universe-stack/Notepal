import React,{createContext,useState,useContext,useEffect} from "react";
import axios from "axios";

const MyContext = createContext();

export const StateContextProvider = ({children}) => {

  const [note, setNote] = useState([]);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState()
  console.log(note)

  const addNote=(product)=>{
    setNote(product)
  }

  const getNotes = async () => {
    // get from the server-side
    try {
      const response = await axios.get('http://localhost:8800/notes/');
      setNotes(response.data);

    } catch(error) {
      setError(error)
      console.error(error);
    }
};

useEffect(() => {
  getNotes();
}, []);
console.log(notes)

console.log(notes);


  return (
    <MyContext.Provider value={{addNote, note, setNote,notes,getNotes,error}}>{children}</MyContext.Provider>
  )
}

export default MyContext;





