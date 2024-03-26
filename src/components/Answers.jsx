import { useRef } from "react";
export default function Answers({answers,selectedAnswer,answerState,handleSelectAnswer}){
    const shuffledAnswers = useRef();
        //shuffling answers to avoid bias
    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5); //shuffling answers using sort method 
    }
    return (
        <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            const isSelected = selectedAnswer === answer; //checking if the answer is selected
            let cssClasses = '';

            if(answerState === 'answered' && isSelected){
                cssClasses = 'selected';
            }

            if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                cssClasses = answerState;
            }

            return <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)} className={cssClasses}>{answer}</button>
                    </li>
        })}
    </ul>
    )
}