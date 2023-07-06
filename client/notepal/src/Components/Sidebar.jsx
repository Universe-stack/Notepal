import React from 'react';

const Sidebar = (props) => {

    let attachedClasses =['Sidebar','Close'].join();

    if(props.showBackdrop){
        attachedClasses=['Sidebar','Open'].join();
    }
  return (
    <>
        <div className={attachedClasses}>
            <div className='ms-logo'>
                LOGO
            </div>
        
        </div>
    </>
  )
}

export default Sidebar