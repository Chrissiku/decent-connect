import { useContext, useState } from "react";
import organizationImg from "../../assets/organizationAuth.jpg";
import { getTodayDate } from "../../utils/constant";
import useImageUploader from "../../utils/imageUploader";
import { v4 as uidv4 } from "uuid";
import { AppContext } from "../../context/ContextProvider";

const Organization = () => {
  const {
    web5,
    did,
    publicDid,
    protocolDefinition,
    toggleUserType,
    toggleOrganization,
  } = useContext(AppContext);
  const [name, setName] = useState("");
  const { picture: logo, handleImageChange } = useImageUploader();
  const [creationDate, setCreationDate] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const formData = {
    id: uidv4(),
    did: did,
    name,
    logo,
    creationDate,
    description,
    address,
  };

  const createOrganization = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.logo ||
      !formData.creationDate ||
      !formData.address
    ) {
      alert("Please Fill all required fields !!");
      return;
    } else {
      try {
        const { record, status } = await web5.dwn.records.create({
          data: formData,
          message: {
            protocol: protocolDefinition.protocol,
            protocolPath: "organizationProfile",
            schema: protocolDefinition.types.organizationProfile.schema,
            recipient: did,
            published: true,
          },
        });

        const DIDs = [did, publicDid];
        await Promise.all(
          DIDs.map(async (did) => {
            await record.send(did);
          })
        );

        if (status.code === 202 && status.detail === "Accepted") {
          setName("");
          setCreationDate("");
          setAddress("");
          setDescription("");
          toggleUserType("organization"), toggleOrganization(true);
        }
      } catch (error) {
        console.error("Error creating the organization : ", error);
      }
    }
  };

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
            <form
              className="space-y-4 md:space-y-6"
              autoComplete="off"
              onSubmit={createOrganization}
            >
              {/* Name */}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. John's Medical Center"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5">
                {/* Logo */}
                <div>
                  <label
                    htmlFor="logo"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Organization Logo <span className="text-red-500">*</span>
                    <span className="text-teal text-[10px]">
                      (Maximum 700kb)
                    </span>
                  </label>
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="Select logo"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                {/* creationDate */}
                <div>
                  <label
                    htmlFor="creationDate"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Date of Creation
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="creationDate"
                    id="creationDate"
                    value={creationDate}
                    onChange={(e) => setCreationDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="Your Date of birth here"
                    required
                    max={getTodayDate()}
                  />
                </div>
              </div>
              {/* About organization */}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-[16px] font-medium text-gray-900"
                >
                  About the Organization{" "}
                  <span className="text-red-300">(optional)</span>
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. St. John's Medical Center, a leading healthcare institution dedicated to providing exceptional medical services and ..."
                />
              </div>
              {/* Address */}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. St. John's Medical Center 123 Health Way Cityville, CA 90210 United States"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-teal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an Organization
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Organization;
