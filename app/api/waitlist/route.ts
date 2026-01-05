import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  sendWaitlistConfirmationEmail,
  sendAdminNotificationEmail,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { firstName, lastName, email, phoneNumber } = body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    // Create new entry
    const newEntry = await prisma.waitlist.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        phoneNumber,
      },
    });

    // Prepare email data
    const emailData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber,
    };

    // Send emails in parallel (don't block the response)
    Promise.all([
      sendWaitlistConfirmationEmail(emailData),
      sendAdminNotificationEmail(emailData),
    ]).catch((error) => {
      console.error("Email sending failed:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully added to waitlist",
        id: newEntry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch all waitlist entries, ordered by most recent
    const waitlistEntries = await prisma.waitlist.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get statistics
    const stats = {
      total: waitlistEntries.length,
      recentSignups: waitlistEntries.filter((e) => {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 1);
        return new Date(e.createdAt) > dayAgo;
      }).length,
    };

    return NextResponse.json({
      entries: waitlistEntries,
      stats,
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist data" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE endpoint to remove entries
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.waitlist.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting waitlist entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
