import React,{useState, useContext,useEffect} from 'react';
import * as Form from '@radix-ui/react-form';
import './FormItem.css';
import MyContext  from '../../context/StateContext';
import axios from "axios";
import DateInput from '../Datepicker/DatePicker';
import { useLocation } from 'react-router-dom';





const FormItem = (props) => {

  const location = useLocation();
  // Extract the ID from the pathname
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1)

  const [formData, setFormData] = useState({images:null,updateId:id,title:`${props.title?props.title:""}`, message:`${props.message?props.message:""}`,date:new Date(), dateSubmit:new Date()});
  const {note, setNote,updateNotesAfterUpdate} = useContext(MyContext);
  const [error, setError] = useState()
  const [updateFormData, setUpdateFormData]= useState();
  const [base64Data, setBase64Data] = useState('');

  const handleInputChange =(e)=>{
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDateChange = (date) => {
    const timestamp = new Date().toISOString();
    const formattedDate = date.toISOString().split('T')[0];
    setFormData({ ...formData, date:formattedDate,dateSubmit:timestamp});
    console.log(formattedDate,date)
  };

  useEffect(() => {
    console.log('Updated formData:', formData);
  }, [formData]);

  const timestamp = new Date().toISOString();
  console.log(timestamp)


  // Handle file change
const handleFileChange = (e) => {
  const file = e.target.files[0];
  console.log(file)
  if (file) {
    setFormData({ ...formData, images: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Data(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

// Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("submiteted:",formData)

  const formDataToSend = new FormData();
  formDataToSend.append("updateId", formData.updateId);
  formDataToSend.append("title", formData.title);
  formDataToSend.append("message", formData.message);
  formDataToSend.append("date", formData.date);
  formDataToSend.append("dateSubmit", formData.dateSubmit);
  formDataToSend.append("images", formData.images); // Append the image file directly

  try {
    // Send to the server-side
    let response;
    if (id) {
      response = await axios.put(`http://localhost:8800/notes/${id}`, formData);
      updateNotesAfterUpdate(response.data);
      console.log(response.data, "Note updated successfully");
    } else {

      const apiUrl = 'http://localhost:8800/notes/new';
      const jwtToken = sessionStorage.getItem('jwtToken');
     // consider handling token expiration and user logout scenarios by clearing the session storage when the user logs out or when the token expires
  
     response = await axios.post(apiUrl, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${jwtToken}`
      }
    })}
  } catch (error) {
    console.error(error);
  }

  await setNote((prevArray) => [...prevArray, formData]);
  await setFormData({ title: '', message: '', dateSubmit: timestamp, images: null });
};


  return(
    <Form.Root className="FormRoot" onSubmit={handleSubmit}>
    <Form.Field className="FormField" name="title">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Form.Label className="FormLabel">Title</Form.Label>
        <Form.Message className="FormMessage_err" match="valueMissing">
          Add a title
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="Input" name='title' type="text" required  value={formData.title} onChange={handleInputChange}/>
      </Form.Control>

      <Form.Label className="FormLabel">Upload Picture</Form.Label>
      <Form.Control asChild>
        <input  name='images' type="file"accept="images/*"
        multiple
        onChange={handleFileChange}
        />
      </Form.Control>

      {formData.images && <p>Selected File: {formData.images.name}</p>}
      {formData.images && (
        <img
          src={base64Data}
          alt="Selected File"
          style={{ maxWidth: '300px', maxHeight: '300px' }}
        />
      )}
    </Form.Field>

    <Form.Field className="FormField" name="date">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Form.Label className="FormLabel">Date:</Form.Label>
      </div>
      <Form.Control asChild>
      <DateInput onChange={handleDateChange} value={formData.date}/>
      </Form.Control>
    </Form.Field>

    <Form.Field className="FormField" name="note">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Form.Label className="FormLabel"> What is on your mind?</Form.Label>
        <Form.Message className="FormMessage_err" match="valueMissing">
          Please enter a note
        </Form.Message>
      </div>
      <Form.Control asChild>
        <textarea className="Textarea" name='message' required value={formData.message} onChange={handleInputChange}/>
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button className="Button" style={{ marginTop: 10 }} type="submit">
        Post question
      </button>
    </Form.Submit>
  </Form.Root>
  )
  };

export default FormItem;

// function convertToBase64(file){
//   return new Promise((resolve,reject)=>{
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = ()=> {
//       resolve(fileReader.result)
//     };
//     fileReader.onerror=(error)=> {
//       reject(error)
//     }
//   })
// }