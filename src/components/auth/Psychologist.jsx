import { useContext, useState } from "react";
import psychologistImg from "../../assets/psychologistAuth.jpg";
import { AppContext } from "../../context/ContextProvider";
import useImageUploader from "../../utils/imageUploader";
import { v4 as uidv4 } from "uuid";
import Process from "../common/Process";

const Psychologist = () => {
  const {
    web5,
    did,
    protocolDefinition,
    toggleUserType,
    togglePsy,
    organizationList,
    publicDid,
  } = useContext(AppContext);

  const { picture: profile, handleImageChange } = useImageUploader();
  const [name, setName] = useState("");
  const [experience, setExperience] = useState(1);
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = {
    id: uidv4(),
    did: did,
    name,
    profile,
    experience,
    gender,
    specialization,
    organization,
  };

  const createPsy = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      !formData.name ||
      !formData.profile ||
      !formData.experience ||
      !formData.gender ||
      !formData.specialization
    ) {
      alert("Please fill in all the required fields !");
    } else {
      try {
        const { record, status } = await web5.dwn.records.create({
          data: formData,
          message: {
            protocol: protocolDefinition.protocol,
            protocolPath: "psychologistProfile",
            schema: protocolDefinition.types.psychologistProfile.schema,
            recipient: did,
            published: true,
          },
        });

        // await record.send(publicDid);
        const DIDs = [did, publicDid];
        await Promise.all(
          DIDs.map(async (did) => {
            await record.send(did);
          })
        );

        if (status.code === 202 && status.detail === "Accepted") {
          setName("");
          setGender("");
          setExperience(1);
          setOrganization("");
          setOrganization("");
          toggleUserType("psychologist");
          togglePsy(true);
          setLoading(false);
        }
        return await record.send(did);
      } catch (error) {
        console.error("Error Creating this profile : ", error);
        setLoading(false);
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
                src={psychologistImg}
                alt="patient auth img"
              />
              <div className="absolute bg-[#000000ac] inset-0 p-5 lg:p-10 gap-5 text-center flex flex-col items-center justify-center bg-">
                <p className="text-white text-[20px] md:text-[25px] lg:text-[30px] font-semibold">
                  Together, let&apos;s make a positive impact on emotional
                  well-being
                </p>
              </div>
            </div>
          </div>
          {loading ? (
            <Process />
          ) : (
            <div className="md:p-5 grid grid-cols-1 items-center justify-center space-y-5">
              <h3 className="text-teal font-bold text-[20px]">
                Join our mental health community to support and connect with
                those in need.
              </h3>
              <form
                className="space-y-4 md:space-y-6"
                autoComplete="off"
                onSubmit={createPsy}
              >
                {/* Name */}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="eg. John Doe"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5">
                  {/* Profile */}
                  <div>
                    <label
                      htmlFor="profile"
                      className="block mb-2 text-[16px] font-medium text-gray-900"
                    >
                      Your profile picture{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      onChange={handleImageChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                      placeholder="eg. John Doe"
                      required
                    />
                  </div>
                  {/* experience */}
                  <div>
                    <label
                      htmlFor="experience"
                      className="block mb-2 text-[16px] font-medium text-gray-900"
                    >
                      Year(s) of experience{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="experience"
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                      placeholder="Your Date of birth here"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-5">
                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-[16px] font-medium text-gray-900"
                    >
                      Select Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 "
                    >
                      <option defaultValue="">...</option>
                      <option defaultValue="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {/* Specialization */}
                  <div>
                    <label
                      htmlFor="specialization"
                      className="block mb-2 text-[16px] font-medium text-gray-900"
                    >
                      Select Specialization{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="specialization"
                      name="specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 "
                    >
                      <option defaultValue="generalist" value="Generalist">Generalist</option>
                      <option value="Clinical">Clinical Psychologist</option>
                      <option value="Counseling">
                        Counseling Psychologist
                      </option>
                      <option value="School">School Psychologist</option>
                      <option value="Forensic">Forensic Psychologist</option>
                      <option value="Industrial-Organizational">
                        Industrial-Organizational Psychologist
                      </option>
                      <option value="Neuropsychologist">
                        Neuropsychologist
                      </option>
                      <option value="Sports">Sports Psychologist</option>
                      <option value="Health">Health Psychologist</option>
                      <option value="Developmental">
                        Developmental Psychologist
                      </option>
                      <option value="Social">Social Psychologist</option>
                      <option value="Experimental">
                        Experimental Psychologist
                      </option>
                      <option value="Cognitive">Cognitive Psychologist</option>
                      <option value="Educational">
                        Educational Psychologist
                      </option>
                      <option value="Geriatric">Geriatric Psychologist</option>
                      <option value="Child">Child Psychologist</option>
                      <option value="Environmental">
                        Environmental Psychologist
                      </option>
                      <option value="Rehabilitation">
                        Rehabilitation Psychologist
                      </option>
                      <option value="Cross">Cross Psychologist-Cultural</option>
                      <option value="Positive">Positive Psychologist</option>
                      <option value="Media">Media Psychologist</option>
                    </select>
                  </div>
                </div>
                {/* Organization */}
                <div>
                  <label
                    htmlFor="organization"
                    className="block mb-2 text-[16px] font-medium text-gray-900"
                  >
                    Select Your Organization{" "}
                    <span className="text-red-300">(Optional)</span>
                  </label>
                  <select
                    id="organization"
                    name="organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 "
                  >
                    <option defaultValue="self" value="self">
                      Self Employed
                    </option>
                    {organizationList?.map((organization) => (
                      <option
                        key={organization.id}
                        value={organization.recordId}
                      >
                        {organization.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-teal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Psychologist;
