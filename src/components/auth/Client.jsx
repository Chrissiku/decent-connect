import clientImg from "../../assets/clientAuth.jpg";

const Client = () => {
  return (
    <>
      <section className="w-full rounded-lg">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-5">
          <div className="rounded-xl overflow-hidden w-full h-full relative flex flex-col items-start justify-center">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={clientImg}
                alt="patient auth img"
              />
              <div className="absolute bg-[#000000ac] inset-0 p-5 lg:p-10 gap-5 text-center flex flex-col items-center justify-center bg-">
                <p className="text-white text-[20px] md:text-[25px] lg:text-[30px] font-semibold">
                  Embark on your path to emotional and mental well-being.
                </p>
              </div>
            </div>
          </div>
          <div className="md:p-5 grid grid-cols-1 items-center justify-center space-y-5">
            <h3 className="text-teal font-bold text-[20px]">
              Sign up to start your transformative journey.
            </h3>
            <form className="space-y-4 md:space-y-6" autoComplete="off">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-[16px] font-medium text-gray-900"
                >
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. John Doe"
                  required=""
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5">
                <div>
                  <label
                    htmlFor="profile"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Your profile picture <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="eg. John Doe"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Your Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="Your Date of birth here"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-[16px] font-medium text-gray-900"
                >
                  Select Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 "
                >
                  <option defaultValue="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="button"
                className="w-full text-white bg-teal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Client;
