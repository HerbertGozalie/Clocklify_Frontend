import React from "react";

type DescriptionInputProps = {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  createActivityMutation: {
    isPending: boolean;
  };
  children?: React.ReactNode;
};

const DescriptionInput = ({
  description,
  setDescription,
  createActivityMutation,
  children,
}: DescriptionInputProps) => {
  return (
    <>
      <div className="w-full relative flex-1 justify-center">
        <textarea
          name="activity"
          placeholder="Write your activity here ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-96 max-w-md p-10 rounded-lg bg-white text-black text-sm"
          disabled={createActivityMutation.isPending}
        />
        {children}
      </div>
    </>
  );
};

export default DescriptionInput;
