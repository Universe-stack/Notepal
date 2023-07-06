import React,{useState, useContext} from 'react';
import * as Form from '@radix-ui/react-form';
import './FormItem.css';
import MyContext  from '../../context/StateContext';
import axios from "axios";


const FormItem = () => {

  const [formData, setFormData] = useState({title: "", message:""});
  const {note, setNote} = useContext(MyContext);
  const [error, setError] = useState()

  const handleInputChange =(e)=>{
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the form data here (e.g., send it to the server)
    console.log(formData);
    setNote((prevArray) => [...prevArray, formData]);
  
    // Send to the server-side
    try {
      const response = await axios.post('http://localhost:8800/notes/new', formData);
      console.log(response.data); // Form data received
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