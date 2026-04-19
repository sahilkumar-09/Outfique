import React from "react";
import Left from "../components/Left.Login";
import Right from "../components/Right.Login";

const Login = () => {
  return (
    <main className="min-h-screen bg-[#f0ede8] flex flex-row">
      <Left />
      <Right />
    </main>
  );
};

export default Login;
