import mongoose, { Schema, model, models } from "mongoose";

// TypeScript interface to define the document structure
interface IResource {
  subjectFullname: string; 
  credit: number; 
  subjectcode: string; 
  year: string; 
  semister: string; 
  scheme?: string; 
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
      type: String,
      required: [true, "Please specify the semester."],
    },
    scheme: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the model only if it doesn't already exist
const Resource = models.Resource || model<IResource>("Resource", ResourceSchema);

// Export the model
export default Resource;
