import mongoose, { Schema, model, models, ObjectId } from "mongoose";

// Define Notes Schema first
interface IResource {
  subjectFullNameId: ObjectId;
  resourceTitle: string;
  description: string;
  url: string;
  rating?: number;
}

// Notes Schema
const NotesSchema = new Schema<IResource>(
  {
    subjectFullNameId: { type: mongoose.Schema.ObjectId, ref: "Resource" },
    resourceTitle: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    rating: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Create Notes model if it doesn't already exist
const Notes = models.Notes || model<IResource>("Notes", NotesSchema);

// Define Resource Schema next
interface IResourceModel {
  subjectFullname: string;
  credit: number;
  subjectcode: string;
  year: string;
  semester: string; // Corrected 'semister' to 'semester'
  scheme?: string;
  notes?: Array<ObjectId>; // Specified type for notes as an array of ObjectId
}

// Resource Schema
const ResourceSchema = new Schema<IResourceModel>(
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
    semester: {
      type: String,
      required: [true, "Please specify the semester."],
    },
    scheme: {
      type: String,
      required: false,
    },
    notes: [{ type: mongoose.Schema.ObjectId, ref: "Notes" }], // Correct ref here
  },
  {
    timestamps: true,
  }
);

// Create Resource model if it doesn't already exist
const Resource =
  models.Resource || model<IResourceModel>("Resource", ResourceSchema);

// Export both models
export { Resource, Notes };
