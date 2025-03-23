import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Emergency contact schema
const emergencyContactSchema = z.object({
  name: z.string().min(1, "Nama kontak diperlukan"),
  phone: z.string().min(1, "Nomor telepon diperlukan"),
  relation: z.string().min(1, "Hubungan diperlukan"),
});

// Emergency contacts update schema
const emergencyContactsUpdateSchema = z.object({
  emergencyContacts: z.array(emergencyContactSchema),
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
    const validatedData = emergencyContactsUpdateSchema.parse(body);
    
    // Get the user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
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
    
    // Delete existing emergency contacts
    await prisma.emergencyContact.deleteMany({
      where: {
        userId: user.id,
      },
    });
    
    // Create new emergency contacts
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        emergencyContacts: {
          create: validatedData.emergencyContacts.map(contact => ({
            name: contact.name,
            phone: contact.phone,
            relation: contact.relation,
          })),
        },
      },
      include: {
        emergencyContacts: true,
      },
    });
    
    return NextResponse.json({
      message: "Kontak darurat berhasil diperbarui"
    });
  } catch (error) {
    console.error("Error updating emergency contacts:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memperbarui kontak darurat" },
      { status: 500 }
    );
  }
} 