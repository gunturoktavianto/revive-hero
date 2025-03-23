import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

// Define emergency contact schema
const emergencyContactSchema = z.object({
  name: z.string().min(1, "Nama kontak diperlukan"),
  phone: z.string().min(1, "Nomor telepon diperlukan"),
  relation: z.string().min(1, "Hubungan diperlukan"),
});

// Updated user schema with all fields
const userSchema = z.object({
  name: z.string().min(1, "Nama diperlukan"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  nik: z.string().optional(),
  address: z.string().optional(),
  age: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
  gender: z.string().optional(),
  emergencyContacts: z.array(emergencyContactSchema).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = userSchema.parse(body);
    
    const { 
      name, 
      email, 
      password, 
      nik, 
      address, 
      age, 
      gender, 
      emergencyContacts 
    } = validatedData;

    // Check if user with this email already exists
    const existingUserEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUserEmail) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // If NIK is provided, check if user with this NIK already exists
    if (nik) {
      const existingUserNik = await prisma.user.findUnique({
        where: { nik }
      });

      if (existingUserNik) {
        return NextResponse.json(
          { error: "NIK sudah terdaftar" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with all fields
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        nik,
        address,
        age,
        gender,
        // Create emergency contacts if provided
        ...(emergencyContacts && emergencyContacts.length > 0
          ? {
              emergencyContacts: {
                create: emergencyContacts.map(contact => ({
                  name: contact.name,
                  phone: contact.phone,
                  relation: contact.relation
                }))
              }
            }
          : {})
      },
      include: {
        emergencyContacts: true
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        user: userWithoutPassword,
        message: "Pendaftaran berhasil" 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
} 