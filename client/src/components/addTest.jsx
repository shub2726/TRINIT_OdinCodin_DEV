import React, {useState, useEffect} from "react";
import axios from "axios";
import QuestionParser from "./QuestionParser";
import Cards from "./Cards";

const AddTest = () => {
    const [questions, setQuestions] = useState([])
    const [concatdata, setConcatData] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            let data = new FormData();
            data.append('url', 'https://ncert.nic.in/pdf/publication/exemplarproblem/classIX/science/ieep117.pdf');
            data.append('language', 'eng');
            data.append('scale', 'true');
            data.append('isOverlayRequired', 'false');
            data.append('iscreatesearchablepdf', 'false');
            data.append('issearchablepdfhidetextlayer', 'false');
            data.append('filetype', 'pdf');
            data.append('detectOrientation', 'false');
            data.append('isTable', 'true');

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.ocr.space/parse/image',
                headers: {
                    'apikey': 'K81508780488957',
                    'Content-Type': 'multipart/form-data' // Set the Content-Type manually
                },
                data: data
            };

            try {
                const response = await axios.request(config);
                response.data.ParsedResults.forEach(element => {
                    const type = element.ParsedText
                    console.log(type);
                    setConcatData((prev) => prev + type)
                    //setConcatData(concatdata + type); 
                })
                console.log(concatdata)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure the effect runs only once

    return (
        <div>
            <QuestionParser text={concatdata} questions={questions} setQuestions={setQuestions} />

            <Cards questions={questions} />
        </div>
    );
}

export default AddTest;