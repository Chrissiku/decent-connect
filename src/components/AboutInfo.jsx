const AboutInfo = () => {
  const aboutCards = [
    {
      title: "Mission",
      text: "Unite mentors and mentees for transformative connections.",
    },
    {
      title: "Vision",
      text: "Foster growth through dynamic mentorship.",
    },
    {
      title: "Benefits",
      text: "Elevate careers with personalized guidance and shared expertise.",
    },
  ];

  return (
    <div className="md:p-10 mx-auto">
      <div className="flex flex-col items-center justify-between w-full space-y-5 md:space-y-8">
        {aboutCards.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-[#FFFFFF01] w-full
           shadow-lg border-l-8 border-shade rounded-lg p-5 space-y-3 hover:bg-light-gray"
          >
            <h3 className="text-teal text-[20px]">{item.title}</h3>
            <p className="text-gray-400">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutInfo;
