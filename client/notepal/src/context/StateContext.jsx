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

  // Function to update the list of notes after deleting a post
const updateNotesAfterDeletion =(deletedPostId) => {
  // Filter out the deleted post from the current notes
  console.log(deletedPostId)
  const updatedNotes = notes.filter((note) => note._id !== deletedPostId);
  setNotes(updatedNotes);
}



const updateNotesAfterUpdate = (updatedNote) => {
   // Find the index of the note to update in the current state
   const noteIndex = notes.findIndex((note) => note._id === updatedNote._id);

   // If the note exists in the current state, update it
   if (noteIndex !== -1) {
     const updatedNotes = [...notes];
     updatedNotes[noteIndex] = updatedNote;
     setNotes(updatedNotes);
   }
};

const getNotes = async () => {
  const apiUrl = 'http://localhost:8800/notes/';
  const jwtToken = sessionStorage.getItem('jwtToken');
  // consider handling token expiration and user logout scenarios by clearing the session storage when the user logs out or when the token expires
  console.log(jwtToken, "jwt token")
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'authorization': `Bearer ${jwtToken}`
      }
    });
    console.log(response.data,"notes data")
    setNotes(response.data);
    
  } catch (error) {
    setError(error);
    console.error(error);
  }
};

useEffect(() => {
  getNotes();
}, []);

console.log(notes);


const updateNotesAfterDeletions = (checkedIds)=> {
  // Remove the notes with IDs present in the 'checked' array;
  const remainingNotes = notes.filter((note) => !checkedIds.includes(note._id));
  setNotes(remainingNotes);
  // After removing the deleted notes, you might want to refresh the UI or update any other related components
  // For example, if you're using React, you can update the state or trigger a re-render.
}

  return (
    <MyContext.Provider value={{addNote, note, setNote,notes,getNotes,error,updateNotesAfterDeletion,updateNotesAfterUpdate, updateNotesAfterDeletions}}>{children}</MyContext.Provider>
  )
}

export default MyContext;





