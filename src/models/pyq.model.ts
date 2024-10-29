import mongoose, { Schema, model, models, ObjectId } from "mongoose";

export interface IPYQ {
  subjectFullNameId: ObjectId;
  title: string;
  description: string;
  url: string;
  session: string;
  year: number;
  semesterType: string;
}

const NotesSchema = new Schema<IPYQ>(
  {
    subjectFullNameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    session: { type: String, required: true },
    year: { type: Number, required: true },
    semesterType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const PYQ = models.Note || model<IPYQ>("Pyqs", NotesSchema);

export default PYQ;
