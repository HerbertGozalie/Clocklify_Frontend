import MoonLoader from "react-spinners/MoonLoader";

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div
      className="
        absolute top-1/2 left-1/2
        transform -translate-x-1/2 -translate-y-1/2
        pointer-events-none
      "
    >
      <MoonLoader loading={true} color="#ffffff" />
    </div>
  );
};

export default Loader;
