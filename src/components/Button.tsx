interface ButtonProps extends  React.ButtonHTMLAttributes<HTMLButtonElement>{
  name: string,
  className?: string
}

const Button = ({name, className, ...restProps}: ButtonProps) => {
  return (
    <>
      <div className="flex justify-center mt-60">
        <button
          type={restProps.type ?? "button"}
          className={`py-10 bg-linear-to-t from-s-light-blue to-s-lighter-blue text-white text-base font-bold rounded-lg hover:opacity-90 ${className}`}
        >
          {name}
        </button>
      </div>
    </>
  )
}

export default Button
