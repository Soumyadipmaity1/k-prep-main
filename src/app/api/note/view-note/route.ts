import { NextRequest, NextResponse } from "next/server";
import { Resource } from "@/models/note.model";
import { connect } from "@/config/dbConnect";
import { getToken } from "next-auth/jwt";
import { isAuthenticated } from "@/lib/Auth";

// Establish database connection before handling the request
connect();

export async function GET(request: NextRequest) {
  try {
    // const secret = process.env.TOKEN_SECRET!;
    // const authorize = await getToken({ req: request, secret });
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
    const { searchParams } = new URL(request.url);
    // console.log(searchParams);
    let year = searchParams.get("year");
    let sem = searchParams.get("sem");
    let scheme = searchParams.get("scheme");
    let id = searchParams.get("id");
    if (year && scheme) {
      const notes = await Resource.find({
        year: year,
        scheme: scheme,
      });
      return NextResponse.json(
        {
          success: true,
          notes,
        },
        {
          status: 200,
        }
      );
    } else if (year && sem) {
      // console.log(year, sem);
      const notes = await Resource.find({
        year: year,
        semister: new RegExp(sem),
      });
      // console.log(notes)
      return NextResponse.json(
        {
          success: true,
          notes,
        },
        {
          status: 200,
        }
      );
    } else if (year) {
      const notes = await Resource.find({
        year: year,
      })
        .populate({
          path: "notes", // Populates notes
          populate: {
            path: "subjectFullNameId",
            select:"credit subjectcode subjectFullname"
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
      
    } else if (id) {
      const notes = await Resource.findById(id);
      return NextResponse.json(
        {
          notes,
        },
        {
          status: 200,
        }
      );
    } else {
      const notes = await Resource.find()
        .select("subjectFullname year semister")
        .sort({ createdAt: -1 });

      return NextResponse.json(
        {
          success: true,
          notes,
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
