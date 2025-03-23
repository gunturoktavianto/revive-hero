import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Get the session to check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Tidak diizinkan" },
        { status: 401 }
      );
    }
    
    // Get email from query parameter
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    
    if (!email) {
      return NextResponse.json(
        { error: "Email diperlukan" },
        { status: 400 }
      );
    }
    
    // Check if the email matches the authenticated user's email
    if (email !== session.user.email) {
      return NextResponse.json(
        { error: "Tidak diizinkan mengakses data pengguna lain" },
        { status: 403 }
      );
    }
    
    // Fetch the user data
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        emergencyContacts: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memuat data pengguna" },
      { status: 500 }
    );
  }
} 