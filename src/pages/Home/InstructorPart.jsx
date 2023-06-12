const InstructorPart = ({instructor}) => {
  return (
    <>
      <div className=" px-6 py-6 text-center rounded-2xl ">
        <div className="bg-white rounded shadow-lg overflow-hidden p-8">
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
          <button className="bg-transparent hover:bg-blue text-blue-dark rounded-full font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent ">
            Contact
          </button>
        </div>
      </div>
    </>
  );
};

export default InstructorPart;
