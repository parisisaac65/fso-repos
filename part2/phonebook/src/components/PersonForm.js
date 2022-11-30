const PersonForm = ({ handleSubmit, text1, text2, name, number, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>{text1}: <input value={name} onChange={handleNameChange}/></div>
            <div>{text2}: <input value={number} onChange={handleNumberChange}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}


export default PersonForm 