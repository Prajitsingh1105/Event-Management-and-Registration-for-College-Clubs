import toast, { Toaster } from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

export const notify = {
  success: (msg) =>
    toast.custom((t) => (
      <div
        className={`max-w-sm w-full border-2 border-green-900 bg-green-300  text-black shadow-lg rounded-lg p-4 flex items-center space-x-3`}
      >
        <FaCheckCircle size={24} />
        <span>{msg}</span>
      </div>
    ),
      { duration: 3000 }
    ),
  error: (msg) =>
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"
          } max-w-sm w-full bg-red-300 border-2 border-red-800 text-black shadow-lg rounded-lg p-4 flex items-center space-x-3`}
      >
        <FaTimesCircle size={24} />
        <span>{msg}</span>
      </div>
    ),
      { duration: 3000 }
    ),
  info: (msg) =>
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"
          } max-w-sm w-full bg-blue-300 border-2 border-blue-800 text-black shadow-lg rounded-lg p-4 flex items-center space-x-3`}
      >
        <FaInfoCircle size={24} />
        <span>{msg}</span>
      </div>
    ),
      { duration: 3000 }
    ),
};

export function ToastWrapper() {
  return <Toaster position="top-right" />;
}
