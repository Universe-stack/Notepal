import React,{useState, useContext} from 'react';
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

  const [formData, setFormData] = useState({updateId:id,title:`${props.title?props.title:""}`, message:`${props.message?props.message:""}`,date:new Date(), dateSubmit:new Date()});
  const {note, setNote,updateNotesAfterUpdate} = useContext(MyContext);
  const [error, setError] = useState()
  const [updateFormData, setUpdateFormData]= useState();

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

  const timestamp = new Date().toISOString();
  console.log(timestamp)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the form data here (e.g., send it to the server)
    console.log(formData);
    await setFormData({ ...formData, dateSubmit:timestamp});

    await setNote((prevArray) => [...prevArray, formData]);
    console.log(formData.date,"datee")
  
    // Send to the server-side
    let response;
    try {
      if (id){
       response = await axios.put(`http://localhost:8800/notes/${id}`, formData);
       updateNotesAfterUpdate(response.data);
       console.log(response.data,"Note updated successfully");
      }else{
       response = await axios.post('http://localhost:8800/notes/new', formData);
       console.log(response.data,"Note added successfully");
      }
    } catch (error) {
      console.error(error);
    }
    setFormData({
      title: '',
      message: ''
    });
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