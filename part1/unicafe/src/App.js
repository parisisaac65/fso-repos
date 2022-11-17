import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: '65px'}}> {text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({ clicks }) => {
  const all = clicks.good + clicks.bad + clicks.neutral 
  const average = ((clicks.good * 1) + (clicks.bad * -1)) / all
  const positive = (clicks.good / all) * 100 

  if (all === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text='good' value={clicks.good}/>
      <StatisticLine text='neutral' value={clicks.neutral}/>
      <StatisticLine text='bad' value={clicks.bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive + ' %'}/>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => {
    setClicks({...clicks, good: clicks.good + 1 })
  }

  const handleNeutralClick = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1 })
  }

  const handleBadClick = () => {
    setClicks({...clicks, bad: clicks.bad + 1 })
  }

  return (
    <div>
      <Header title='give feedback'/> 
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Header title='statistics'/> 
      <Statistics clicks = {clicks} />
    </div>
  )
  
}

export default App