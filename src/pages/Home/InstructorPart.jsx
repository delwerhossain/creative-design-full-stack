const InstructorPart = ({instructor}) => {
  return (
    <>
      <div className=" px-6 py-6 text-center ">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
          <div className=" flex items-center justify-center bg-grey-light mx-auto mb-8 ">
            <img
              src={instructor.img}
              alt="Image"
              className="rounded-full border h-64 w-64"
            />
          </div>
          <div className="font-bold text-xl mb-2">{instructor.name}</div>
          <p className="text-grey-darker text-base mb-4">
            Senior Designer, Co-Founder
          </p>
          <button className="btn ">
            Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default InstructorPart;
