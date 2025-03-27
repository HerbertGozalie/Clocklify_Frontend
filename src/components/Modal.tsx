import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import Success from "../assets/images/Success.png";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message: string;
}

export default function Modal({ open, setOpen, title, message }: ModalProps) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-p-dark-blue/70 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
            <div className="bg-white px-4 pt-15 pb-50">
              <div className="flex flex-col items-center">
                {/* Close button using RxCross2 */}
                <button
                  onClick={() => setOpen(false)}
                  className="self-end mr-[.7rem] text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 className="h-25 w-25" />
                </button>
                <img
                  src={Success}
                  alt="Success"
                  className="h-65 w-65 mb-[1.5rem]"
                />
                <DialogTitle
                  as="h3"
                  className="mt-4 text-2xl font-semibold text-s-dark-blue mb-[1rem]"
                >
                  {title}
                </DialogTitle>
                <p className="mt-2 text-sm text-f-light-grey text-center">
                  {message}
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
