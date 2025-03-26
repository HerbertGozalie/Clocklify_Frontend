interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <>
      <div className="flex justify-center mt-60">
        <button
          {...props}
          className={`py-10 bg-linear-to-t from-s-light-blue to-s-lighter-blue text-white text-base font-bold rounded-lg hover:opacity-90 ${props.className}`}
        >
          {children}
        </button>
      </div>
    </>
  );
};

export default Button;
