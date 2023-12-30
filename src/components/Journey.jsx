import ConnectButton from "./common/ConnectButton";

const Journey = () => {
  return (
    <div className="bg-[#F7F8F9] py-8">
      <div className="flex justify-center flex-col gap-y-6">
        <h3 className="text-center text-2xl md:text-3xl font-semibold">
          Ready to Elevate Your Journey?
        </h3>
        <p className="text-center">
          Sign up now to discover mentors across professions who can shape your
          success.
        </p>
        <div className="self-center">
          <ConnectButton text="Connect Now" start="Connect" />
        </div>
      </div>
    </div>
  );
};

export default Journey;
