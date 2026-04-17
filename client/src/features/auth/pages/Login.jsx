import React from "react";
import Left from "../components/Left.Login";
import Right from "../components/Right.Login";

const Login = () => {
  return (
    <main className="min-h-screen bg-[#131313] text-white flex flex-col p-2">
      <div className="flex flex-1 flex-col lg:flex-row">
        <Left />
        <Right />
      </div>
    </main>
  );
};

export default Login;
