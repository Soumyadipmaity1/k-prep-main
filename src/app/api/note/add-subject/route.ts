import { NextRequest, NextResponse } from "next/server";
import {Resource} from "@/models/note.model";
import { connect } from "@/config/dbConnect";
import { isAuthenticated } from "@/lib/Auth";

// Establish database connection before handling the request
connect();

export async function POST(request: NextRequest) {
  try {
    // const status = await isAuthenticated(request);
    // if (!status) {
    //   return NextResponse.json(
    //     {
    //       message: "Unauthorized user",
    //     },
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    // Parse JSON request body
    const {
      subjectFullname,

      credit,
      subjectcode,
      year,
      semister,
      scheme,
    } = await request.json();
    console.log(
      subjectFullname,

      credit,
      subjectcode,
      year,
      semister,
      scheme
    );
    if (
      !subjectFullname ||
      credit === undefined || // Check for credit as a number field
      !subjectcode ||
      !year ||
      !semister
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Create and save new resource document
    const newResource = new Resource({
      subjectFullname,
      credit,
      subjectcode,
      year,
      semister,
      scheme,
    });

    await newResource.save();

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: "Resource added successfully",
        resource: newResource,
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
