import { NextRequest, NextResponse } from "next/server";
import PYQ from "@/models/pyq.model";
import { Resource } from "@/models/note.model"; // Ensure this is the correct model for your resources
import { connect } from "@/config/dbConnect";
import { IPYQ } from "@/models/pyq.model";

// Establish database connection before handling the request
connect();

export async function POST(request: NextRequest) {
  try {
    const { subjectFullNameId, title, description, url, session, year } =
      (await request.json()) as IPYQ; // Use the interface for type safety
    
    // Validate input fields
    if (
      !subjectFullNameId ||
      !title ||
      !description ||
      !url ||
      !session ||
      !year
    ) {
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
    const savedNotes = await PYQ.create({
      subjectFullNameId,
      title,
      description,
      url,
      session,
      year
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
    subject.pyqs.push(savedNotes._id);
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
