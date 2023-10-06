import React from 'react';
import {useSearchParams} from "react-router-dom";

const PaymentComponent = () => {
    const searchQuery = useSearchParams([0]);
    const referenceNum = searchQuery.get("reference")
  return (
    <div>
      Payment Successful
      <h1>Reference No: {referenceNum}</h1>
    </div>
  )
}

export default PaymentComponent
