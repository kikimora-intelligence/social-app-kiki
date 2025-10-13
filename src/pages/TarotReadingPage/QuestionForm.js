// QuestionForm.js
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function QuestionForm() {
  useContext(AuthContext);

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    // Call the loginSubmitHandler or registerSubmitHandler as needed
    // Example: loginSubmitHandler(values);
  };

  return (
    <form onSubmit={handleQuestionSubmit}>
      {/* Your form fields go here */}
      <button type="submit">Submit Question</button>
    </form>
  );
}
