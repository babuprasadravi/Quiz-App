import { useCallback, useState } from "react"
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from '../questions.js'
import quizComplete from '../assets/quiz-complete.png'

export default function Quiz() {

    const [userAnswers, setUseranswers] = useState([]);
    //activeQuestionIndex derived from userAnswers so that we manage with little state as possible
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Define the hooks outside the conditional return
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUseranswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })
    },[]);

    const handleSkipQuestion = useCallback(() => {
        handleSelectAnswer(null);
    }, []);

    //if quiz is complete, show summary
    if(quizIsComplete){
        return <div id="summary">
            <img src={quizComplete} alt="Quiz Completed Image" />
            <h2>Quiz Complete!</h2>
        </div>
    }

    //shuffling answers to avoid bias
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5); //shuffling answers using sort method 

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSelectAnswer} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        return <li key={answer} className="answer">
                                    <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                                </li>
                    })}
                </ul>
            </div>
        </div>
    )
}  
