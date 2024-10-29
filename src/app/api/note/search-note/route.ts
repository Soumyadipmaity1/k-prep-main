import { connect } from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Notes } from "@/models/note.model";

connect();

export async function GET(request: NextRequest) {
  try {
    // Extract the 'query' parameter from the URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")!;

    // Find notes based on the query parameter
    const results = await Notes.find({
      description: new RegExp(query, "i") // 'i' flag makes the search case-insensitive
    })
      .select("resourceTitle url")
      .populate("subjectFullNameId");

    return NextResponse.json(
      { results },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to retrieve notes: ${error.message}`,
      },
      { status: 400 }
    );
  }
}
