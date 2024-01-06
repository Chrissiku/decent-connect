import ConnectButton from "./common/ConnectButton";

const Journey = () => {
  return (
    <div className="bg-[#F7F8F9] py-8">
      <div className="flex justify-center flex-col gap-y-6">
        <div className="self-center">
          <div className="flex justify-center flex-col gap-y-6">
            <h3 className="text-center text-2xl md:text-3xl font-semibold">
              Ready to Elevate Your Journey?
            </h3>
            <p className="text-center px-10 lg:px-60">
              Sign up now to connect with experienced psychologists ready to
              offer their expertise and support for your mental health and
              personal growth journey.
            </p>
            <div className="self-center">
              <ConnectButton text="Connect Now" start="Connect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
