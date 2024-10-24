interface ParamsType {
  params: {
    subjectName: string;
  };
}

const SubjectWiseNote = ({ params }: ParamsType) => {
  return <div>{params.subjectName}</div>;
};

export default SubjectWiseNote;
