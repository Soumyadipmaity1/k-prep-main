import { NextRequest, NextResponse } from "next/server";
import PYQ from "@/models/pyq.model";
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
    console.log(id);
    if (id) {
      const pyqs = await PYQ.find({
        subjectFullNameId: id,
      });
      return NextResponse.json(
        {
          pyqs,
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
