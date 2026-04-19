import React from "react";
import Left from "../components/Left.Register";
import Right from "../components/Right.Register";

const Register = () => {
  return (
    <main
      className="min-h-screen bg-[#f0ede8] flex"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <Left />
      <Right />
    </main>
  );
};

export default Register;
