import { datamuseApi } from "@/app/api/dataMuseApi/route";
import { useState } from 'react';
import { Button } from "./ui/button";

export default function Suggestions() {
    const [MeanLike, setWordsMeanLike] = useState([]);
    const [Adjectives, setAdjectives] = useState([]);
    const [ComprisesOf, setComprisesOf] = useState([]);
    const [GeneralThan, setWordsMoreGeneralThan] = useState([]);

    const getRandomWords = (array, count) => {
        const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, count);
    };

    const getSentence = () => {
        const sentence = MeanLike
            .concat(Adjectives, ComprisesOf, GeneralThan)
            .map(item => item.word)
            .join(' ');

            console.log(sentence);
            return sentence;

        
    };

    const handlePrintRandomWords = async () => {
        try {
            const responseMeanLike = await datamuseApi.getWordsMeanLike("ask Rocky Bolba");
            setWordsMeanLike(responseMeanLike);
            console.log(responseMeanLike);
            
            const responseAdjectives = await datamuseApi.getWordsAdjectives("fought who");
            setAdjectives(responseAdjectives);
            console.log(responseAdjectives);

            const responseComprisesOf = await datamuseApi.getWordsComprisesOf("if boxer");
            setComprisesOf(responseComprisesOf);
            console.log(responseComprisesOf);

            const responseGeneralThan = await datamuseApi.getWordsMoreGeneralThan("question how film");
            setWordsMoreGeneralThan(responseGeneralThan);
            console.log(responseGeneralThan);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        const sentence = getSentence();
        const randomWords = getRandomWords(sentence.split(' '), 4);
        console.log(randomWords.join(' '));
    };

    return (
        <div>
            <Button variant="secondary" onClick={handlePrintRandomWords}>
                Print Four Random Words
            </Button>

            <ul>
                {getRandomWords(getSentence().split(' '), 4).map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    );
}
