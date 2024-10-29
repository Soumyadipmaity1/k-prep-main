import SubjectButton from "@/components/Subjects/2nd-year/3rdSenSubject";

const ThirdSem = () => {
  return (
    <div className="w-full h-full bg-[#f8e9f4] overflow-y-auto border rounded-xl border-gray-300">
      <div className="max-h-screen font-bold p-5 sm:p-10">
        <h1 className="text-center text-4xl">
          <span className="modal-text">Pick a subject for PYQs!</span>
        </h1>
        <div className="mt-10">
          <SubjectButton year={2} sem={4} />
        </div>
      </div>
    </div>
  );
};

export default ThirdSem;

