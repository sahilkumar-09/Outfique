import React from "react";
import Left from "../components/Left.Register";
import Right from "../components/Right.Register";

const Register = () => {
  return (
    <main className="min-h-screen bg-[#131313] text-white flex flex-col">
      <div className="flex flex-1 flex-col lg:flex-row"> 
        <Left />
        <Right />
      </div>
    </main>
  );
};

export default Register;
