import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#152745]">
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
        className="object-contain"
      />
      <p className="mt-4 text-[#fff] text-lg">
        Oops… page not found.
      </p>
       <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-[#1a8656] cursor-pointer font-[700] text-[#fff] mt-2 px-4 py-2 rounded "
              >
                Return Back
              </button>
    </div>
  );
}


export default Error