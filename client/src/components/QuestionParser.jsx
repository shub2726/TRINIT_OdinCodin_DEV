import React, { useEffect, useState } from "react";

const QuestionParser = ({ text }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const parsedQuestions = text.split(/\d+\./).filter(Boolean).map((q) => {
      const [question, ...options] = q.trim().split(/\n?\s*(?=\([(a-e)]\))/i); // Pattern to split options
      return {
        question: question.trim(),
        options: options.map((opt) => opt.trim()).filter(Boolean)
      };
    });
    setQuestions(parsedQuestions);
  }, [text]);

  return (
    <div>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionParser;
