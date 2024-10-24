import mongoose, { ObjectId, Schema, model, models } from "mongoose";

interface IResource {
  subjectFullNameId: ObjectId;
  resourceTitle: string;
  description: string;
  url: string;
  rating?: number;
}

// Define Mongoose Schema
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

// Create the model only if it doesn't already exist
const Notes = models.Notes || model<IResource>("Notes", NotesSchema); // Changed model name to 'Notes'

// Export the model
export default Notes;
