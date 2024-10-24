import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/resources.model"; // Assuming this is correct
import Resource from "@/models/note.model"; // Ensure this is the correct model for your resources
import { connect } from "@/config/dbConnect";

// Establish database connection before handling the request
connect();



interface INoteRequest {
  subjectFullNameId: string;
  resourceTitle: string;
  description: string;
  url: string;
}

export async function POST(request: NextRequest) {
  try {
    const { subjectFullNameId, resourceTitle, description, url } =
      await request.json() as INoteRequest; // Use the interface for type safety
console.log(subjectFullNameId, resourceTitle, description, url)
    // Validate input fields
    if (!subjectFullNameId || !resourceTitle || !description || !url) {
      return NextResponse.json(
        {
          message: "All fields must be provided",
        },
        {
          status: 400, // Bad Request
        }
      );
    }





    // Create the note
    const savedNotes = await Note.create({
      subjectFullNameId,
      resourceTitle,
      description,
      url,
    });

    // Find the subject to update
    const subject = await Resource.findById(subjectFullNameId);

    if (!subject) {
      return NextResponse.json(
        {
          error: "Subject not found",
        },
        {
          status: 404, // Not Found
        }
      );
    }

    // Push the new note's ID to the subject's notes array
    subject.notes.push(savedNotes._id);
    await subject.save();

    return NextResponse.json(
      {
        success: true,
        message: "Note saved successfully",
      },
      {
        status: 201, // Created
      }
    );
  } catch (error: any) {
    console.error("Error adding resource:", error); // Log full error for debugging

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add resource. Please try again.",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
