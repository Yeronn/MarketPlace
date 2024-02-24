import './Field.css'

export const Field = ({
  labelClassName, spanClassName, spanChildren,
  inputClassName, inputType, inputplaceholder,
  inputValue, inputName, inputOnChange, isButton = false
}) => {
  return (
    <label className={`form-label ${labelClassName}`}>
      <span className={`form-span ${spanClassName}`}> {spanChildren} </span>
      <input
        className={`form-input ${inputClassName}`}
        type={inputType}
        placeholder={inputplaceholder}
        value={inputValue}
        name={inputName}
        onChange={inputOnChange}
      />
    </label>
  )
}
