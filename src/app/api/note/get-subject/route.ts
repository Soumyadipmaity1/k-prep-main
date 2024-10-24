import { NextRequest, NextResponse } from "next/server";
import Resource from "@/models/note.model";
import { connect } from "@/config/dbConnect";
import { isAuthenticated } from "@/lib/Auth";

// Establish database connection before handling the request
connect();

export async function GET(request: NextRequest) {
  try {
    const getSubjectTitles = await Resource.find().select(
      "subjectFullname _id"
    );

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: "Resource added successfully",
        resource: getSubjectTitles,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    // Handle errors and return a failure response
    return NextResponse.json(
      {
        success: false,
        message: `Failed to add resource: ${error.message}`,
      },
      { status: 400 }
    );
  }
}
