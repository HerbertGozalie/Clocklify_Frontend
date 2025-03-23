import { FaEye, FaEyeSlash } from 'react-icons/fa';

type EyeButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  visible: boolean
}

const EyeButton = ({onClick, visible}: EyeButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
        text-f-light-grey
          focus:outline-none
        "
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
      </button>
    </>
  )
}

export default EyeButton
