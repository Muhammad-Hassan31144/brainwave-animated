import { loading } from "../assets";

const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center gap-1 h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <svg
        className="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <h1
        className="relative w-[max-content] font-mono 
  before:absolute before:inset-0 before:animate-typewriter before:bg-white 
  after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-white"
      >
        AI is Generating
      </h1>
    </div>
  );
};

export default Generating;
