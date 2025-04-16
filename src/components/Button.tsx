interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  const baseStyles =
    "py-10 cursor-pointer text-base font-bold rounded-lg hover:opacity-90";
  const variantStyles = {
    primary: "bg-linear-to-t from-s-light-blue to-s-lighter-blue text-white",
    secondary: "bg-white text-f-light-grey",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;
