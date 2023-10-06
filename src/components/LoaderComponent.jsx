import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <>  
            <h4>Loading...</h4>
            <Spinner animation="border" role="status" style={{width:100, height: 100, marginTop:'100px', margin:"auto", display: 'block'}}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    )
}

export default Loader;