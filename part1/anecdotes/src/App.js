import { useState } from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Display = ({ text, number }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {number} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const MostPopularAnecdote = ({ content, finalVotes }) => {
  const max = Math.max(...finalVotes)
  const index = finalVotes.indexOf(max)

  if (max === 0) {
    return (
      <p>Click vote button to display anecdote with most votes</p>
    )
  }
  
  return (
    <div>
      <Display text={content[index]} number={max} /> 
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const points = new Uint8Array(anecdotes.length)
 

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)


  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header title='Anecdote of the day'/>
      <Display text={anecdotes[selected]} number={votes[selected]}/>
      <Button handleClick={handleVoteClick} text="vote"/> 
      <Button handleClick={handleNextClick} text='next anecdote'/>
      <Header title='Anecdote with most votes'/>
      <MostPopularAnecdote content={anecdotes} finalVotes={votes}/> 
    </div>
  )
}

export default App