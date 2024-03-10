import React, { useEffect, useState } from "react";

const AnswerParser = ({ text, answers, setAnswers }) => {

    useEffect(() => {
        const parsedAns = text.split(/\d+\./).filter(Boolean).map((q) => {
            const [question, ans] = q.trim().split(/\n?\s*(?=[a-e])/i);
            return {
                qn: question.trim(),
                //answer: ans
            };
        });
        setAnswers(parsedAns);
    }, [text]);
};

export default AnswerParser;