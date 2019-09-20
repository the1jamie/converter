import React from 'react'

const CurrencyInput = (props) => {

  const options = props.currList.map((curr, i) => {
    return (<option key={i}>{curr}</option>)
  })

  return (
    <div className='formSection'>
      <input type="number" id={props.id} placeholder="0.00" step="1.00" min="0" onChange={props.onValueChange} value={props.conversion}/>
      <select onChange={props.onCurrChange} id={props.id}>
        {options}
      </select>
    </div>
  )

}
export default CurrencyInput;