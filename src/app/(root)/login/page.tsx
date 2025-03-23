"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          

          <div className="my-12">
            <h1 className="text-3xl font-bold mb-1">Masuk</h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
              />
              
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-black/90 text-white rounded-lg py-3"
              >
                Masuk
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Belum mempunyai akun?{" "}
              <Link href="/register" className="font-medium text-black hover:underline">
                Registrasi di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 