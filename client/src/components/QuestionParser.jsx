import React, { useEffect, useState } from "react";

const QuestionParser = ({ text ,questions,setQuestions}) => {

  useEffect(() => {
    const parsedQuestions = text.split(/\d+\./).filter(Boolean).map((q) => {
      const [question, ...options] = q.trim().split(/\n?\s*(?=\([(a-e)]\))/i);
      return {
        question: question.trim(),
        options: options.map((opt) => opt.trim()).filter(Boolean)
      };
    });
    setQuestions(parsedQuestions);
  }, [text]);
};

export default QuestionParser;
