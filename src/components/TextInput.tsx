interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  children?: React.ReactNode;
}

const TextInput = ({label, error, touched, children, ...inputProps}: TextInputProps) => {
  return (
    <>
      <div className={`relative flex-1`}>
        {label && (
          <label htmlFor={inputProps.id} className="block text-white text-sm font-bold mb-2"> 
            {label} 
          </label>
          )}
          <input 
            {...inputProps}
            className={`w-full text-sm py-2 px-2 focus:outline-none border-b-2 ${inputProps.className}`}
          />
          {touched && error && 
            <p className="text-red-500 font-bold text-xs mt-1 absolute left-0">
              {error}
            </p>
          }
          {children}
      </div>
    </>
  )
}

export default TextInput
