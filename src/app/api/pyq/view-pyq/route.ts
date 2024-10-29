import { NextRequest, NextResponse } from "next/server";
import PYQ from "@/models/pyq.model";
import { connect } from "@/config/dbConnect";
import { getToken } from "next-auth/jwt";
import { isAuthenticated } from "@/lib/Auth";
import { Resource } from "@/models/note.model";

// Establish database connection before handling the request
connect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let year = searchParams.get("year");
    // let scheme = searchParams.get("scheme");

    if (year) {
      const notes = await Resource.find({
        year: year,
      })
        .populate({
          path: "pyqs", // Populates notes
          populate: {
            path: "subjectFullNameId",
            select: "credit subjectcode subjectFullname",
          },
        })
        .select("notes");

      let data: any[] = [];
      notes.forEach((item) => {
        if (item.notes && item.notes.length > 0) {
          data.push(...item.notes); // Use spread operator to push individual notes into the array
        }
      });

      // Return the response with the populated notes
      return NextResponse.json(
        {
          success: true,
          notes: data,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error: any) {
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
