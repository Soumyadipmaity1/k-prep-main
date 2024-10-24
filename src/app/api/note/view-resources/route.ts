import { NextRequest, NextResponse } from "next/server";
import Notes from "@/models/resources.model";
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

    let id = searchParams.get("id");
    if (id) {
      const notes = await Notes.find({ subjectFullNameId: id });
      return NextResponse.json(
        {
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
