import React,{useState,useEffect} from 'react'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css';
import FormItem from '../Form/FormItem';


const Modal = (props) => {

  const [show, setShow] =useState(false);
  
  
  useEffect(() => {
    if (props.clicked) {
      console.log("modal"+props.clicked)
      setShow(true);
    }
  }, [props.clicked]);

  const handleClick=()=>{
    setShow(false)
    props.sendDataToParent(show)
    console.log(show+"modalx")
    return
  }

  let attachedClasses=['Modal','Close'].join(' ');
  if(show){
      attachedClasses=['Modal','Open'].join(' ');
  }

  return (
    <>
      {show ? <Backdrop /> : null}
      <div className={attachedClasses} closedModal={show}>
        <span className='btn_Close'><button onClick={handleClick}>X</button></span>
        <FormItem title={props.title} message={props.message}/>
      </div>
    </>
    
  )
}

export default Modal