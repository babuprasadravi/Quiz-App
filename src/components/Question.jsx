import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from '../questions.js'
export default function Question ({questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer}) {
    return <div id="question">
                <div id="quiz">
            <div id="question">
                <QuestionTimer answers={answers}  timeout={10000} onTimeout={onSkipAnswer} />
                <h2>{questionText}</h2>
                <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} handleSelectAnswer={onSelectAnswer} />
            </div>
        </div>
    </div>
}