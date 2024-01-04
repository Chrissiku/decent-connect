import organizationImg from "../../assets/organizationAuth.jpg";

const Organization = () => {
  return (
    <>
      <section className="w-full rounded-lg">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-5">
          <div className="rounded-xl overflow-hidden w-full h-full relative flex flex-col items-start justify-center">
            <div className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={organizationImg}
                alt="patient auth img"
              />
              <div className="absolute bg-[#000000ac] inset-0 p-5 lg:p-10 gap-5 text-center flex flex-col items-center justify-center bg-">
                <p className="text-white text-[20px] md:text-[25px] lg:text-[30px] font-semibold">
                  Let&apos;s collaborate to create a positive influence on
                  emotional well-being.
                </p>
              </div>
            </div>
          </div>
          <div className="md:p-5 grid grid-cols-1 items-center justify-center space-y-5">
            <h3 className="text-teal font-bold text-[20px]">
              Create a mental health organization, enabling psychologists to
              offer support and connect with individuals in need.
            </h3>
            <form className="space-y-4 md:space-y-6" autoComplete="off">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-[16px] font-medium text-gray-900"
                >
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. John's Medical Center"
                  required=""
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5">
                <div>
                  <label
                    htmlFor="profile"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Organization Logo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="Select logo"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="creation"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Date of Creation
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="creation"
                    id="creation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="Your Date of birth here"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-[16px] font-medium text-gray-900"
                >
                  Organization Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. St. John's Medical Center 123 Health Way Cityville, CA 90210 United States"
                  required=""
                />
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

export default Organization;
