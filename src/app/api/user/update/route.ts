import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// User update schema
const userUpdateSchema = z.object({
  name: z.string().optional(),
  nik: z.string().optional(),
  address: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
});

export async function PUT(request: Request) {
  try {
    // Get the session to check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Tidak diizinkan" },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = userUpdateSchema.parse(body);
    
    // Update user data
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: validatedData.name,
        nik: validatedData.nik,
        address: validatedData.address,
        age: validatedData.age,
        gender: validatedData.gender,
      },
    });
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json({
      user: userWithoutPassword,
      message: "Data pengguna berhasil diperbarui"
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui data pengguna" },
      { status: 500 }
    );
  }
} 