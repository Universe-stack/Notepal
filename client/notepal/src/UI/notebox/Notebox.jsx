import React ,{useContext,useState,useEffect}from 'react';
import './Notebox.css';
import MyContext from '../../context/StateContext';

import axios from "axios"

const Notebox = () => {

  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1); // Set the desired page size here

  console.log(notes)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/notes/allPosts', {
          params: {
            page: page,
            pageSize: pageSize,
          },
        });
        setNotes(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [page, pageSize]);

  // Function to handle changing the page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className='Notebox-outer'>
      <div className='Notebox'>
      {/* Render your posts here */}
      {notes.map((note) => (
           <div className="product-box" key={note._id}>
           <div className="note-title">
             <span>{note.title}</span>
           </div>
           <div className="note-body">
             <div>{note.message}</div>
           </div>
           <div className='note-pic'>
           {note.images && (
  <img
    src={`http://localhost:8800/${note.images.replace(/\\/g, '/')}`}
    alt=""
  />
)}
           </div>
         </div>
      ))}
    </div>

    {/* Pagination Controls */}
   <span> <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="pagination-button">
        Previous Page
      </button>
      <button onClick={() => handlePageChange(page + 1)}  className="pagination-button">Next Page</button></span>
    </div>
  )
}

export default Notebox
