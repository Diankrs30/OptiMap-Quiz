import { CountdownCircleTimer } from 
    'react-countdown-circle-timer'
  
export default function Timer(){
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={900}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[900, 600, 300, 0]}
        size={50}
        strokeWidth={6}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
    
  )
}