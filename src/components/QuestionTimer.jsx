import { useEffect, useState } from "react"

export default function QuestionTimer({timeout, onTimeout}){
    // state to manage the remaining time
    const [remainingTime, setRemainingTime] = useState(timeout);
    // useEffect to set the timeout function so that when the timeOut is reached, the onTimeout function is called so that the user can move to the next question by skipping it if the user didnt select any answer
    useEffect(() => {
        console.log("Setting timeout")
       const timer = setTimeout(onTimeout, timeout);

       return () => {
           clearTimeout(timer);
       }
    },[timeout,onTimeout])
    // useEffect to set the interval function so that the remaining time is updated every 100ms 
    useEffect(() => {
        console.log("Setting interval")
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100);
        }, 100);
        return () => {
            clearInterval(interval);
        } 
    },[])


    return <progress id="question-time" max={timeout} value={remainingTime}/>
}