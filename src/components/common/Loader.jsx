const Loader = () => {
  return (
    <div className="bg-gray-100 w-full h-screen mx-auto text-center text-black p-10 inline-flex items-center justify-center">
      <svg
        className="animate-spin h-8 w-8 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="50"
        height="50"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#8B7EF8"
          strokeWidth="8"
          fill="none"
          strokeDasharray="160 80"
          strokeDashoffset="70"
        ></circle>
      </svg>
      <span>Loading </span>
    </div>
  );
};

export default Loader;
