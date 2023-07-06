import React from 'react';
import { useLocation } from 'react-router-dom';

const NoteDetail = () => {
    const location = useLocation();
     // Extract the ID from the pathname
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1); // Assuming the ID is the part of the pathname following the first character

  return (
    <div>NoteDetail: <p>{id}</p></div>
  )
}

export default NoteDetail