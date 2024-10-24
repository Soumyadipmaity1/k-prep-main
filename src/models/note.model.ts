import mongoose, { Schema, model, models, ObjectId } from "mongoose";

// TypeScript interface to define the document structure
interface IResource {
  subjectFullname: string;
  credit: number;
  subjectcode: string;
  year: string;
  semister: string; // Corrected 'semister' to 'semester'
  scheme?: string;
  notes?: Array<ObjectId>; // Specified type for notes as an array of ObjectId
}

// Define Mongoose Schema
const ResourceSchema = new Schema<IResource>(
  {
    subjectFullname: {
      type: String,
      required: [true, "Please provide the full name of the subject."],
    },
    credit: {
      type: Number,
      required: [true, "Please provide the credit value for the subject."],
    },
    subjectcode: {
      type: String,
      required: [true, "Please provide the subject code."],
    },
    year: {
      type: String,
      required: [true, "Please specify the year."],
    },
    semister: {
      // Changed 'semister' to 'semester'
      type: String,
      required: [true, "Please specify the semester."],
    },
    scheme: {
      type: String,
      required: false,
    },
    notes: [{ type: mongoose.Schema.ObjectId, ref: "Notes" }], 
  },
  {
    timestamps: true, 
  }
);

// Create the model only if it doesn't already exist
const Resource =
  models.Resource || model<IResource>("Resource", ResourceSchema);

// Export the model
export default Resource;
