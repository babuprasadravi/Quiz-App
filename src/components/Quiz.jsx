import { useCallback, useState } from "react"
import QUESTIONS from '../questions.js'
import quizComplete from '../assets/quiz-complete.png'
import Question from "./Question.jsx";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUseranswers] = useState([]);
    //activeQuestionIndex derived from userAnswers so that we manage with little state as possible
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Define the hooks outside the conditional return

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUseranswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });
        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }
        // setting answer state to empty string after 2 seconds so that it could move to next question.
        setTimeout(() => {
            setAnswerState('');
        } ,1000)
        }, 1000);
    },[activeQuestionIndex]);

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




    return (
        <>
        <Question questionText={QUESTIONS[activeQuestionIndex].text}
        key={activeQuestionIndex}
         answers={QUESTIONS[activeQuestionIndex].answers}
         onSelectAnswer={handleSelectAnswer}
         answerState={answerState}
         selectedAnswer={userAnswers[userAnswers.length - 1]}
         onSkipAnswer={handleSkipQuestion} />
        </>
    )
}  
