import React from "react";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
        <ContactForm />
      </div>
    </div>
  );
}

export default App;