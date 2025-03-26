import { FaEye, FaEyeSlash } from "react-icons/fa";

interface EyeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  visible: boolean;
}
const EyeButton = ({ visible, ...props }: EyeButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={props.onClick}
        className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
        text-f-light-grey
          focus:outline-none
        "
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
      </button>
    </>
  );
};

export default EyeButton;
