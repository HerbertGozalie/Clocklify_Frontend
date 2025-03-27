interface ErrorMessageProps {
  children: React.ReactNode;
  error: boolean;
}

const ErrorText = ({ children, error }: ErrorMessageProps) => {
  return (
    <>
      <p
        className={`
                  ${!error ? "hidden" : ""} 
                  text-red-500 font-bold text-xs mt-1 absolute left-0`}
      >
        {children}
      </p>
    </>
  );
};

export default ErrorText;
