import React from "react";
import successImg from "../images/success.png"

const SuccessComponent = ({ success }) => {
  return (
    <div>
      <div className="alert alert-success" role="alert">
        <h3 className="text-center text-success">
          {success}
          <img src={successImg} alt="" />
        </h3>
      </div>
    </div>
  );
};

export default SuccessComponent;
