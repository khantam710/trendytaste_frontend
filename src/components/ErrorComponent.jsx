import React from 'react';
import { Image } from 'react-bootstrap';
import errorImg from '../images/error404.jpg'

const ErrorComponent = ({ error }) => {
  console.log(error, "error")
  return (
    <>
      <div className="alert text-center" role='alert'>
        <h2 className='alert-danger p-1'>{error}</h2>
        {/* <Image src={errorImg} className='img-fluid mt-1' style={{height:450,width:750}} /> */}
      </div>
    </>
  )
}

export default ErrorComponent
