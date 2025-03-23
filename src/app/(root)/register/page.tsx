"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

// Add a style tag for custom animations
const pulseAnimation = `
@keyframes gentle-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.pulse-animation {
  animation: gentle-pulse 2s infinite ease-in-out;
  animation-delay: 1s;
}
`;

type FormStep = 'personal1' | 'personal2' | 'emergency' | 'success';

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('personal1');
  const [showIcon, setShowIcon] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nik: "",
    address: "",
    age: "",
    gender: "",
    emergencyContacts: [
      {
        name: "",
        phone: "",
        relation: ""
      }
    ]
  });

  useEffect(() => {
    if (currentStep === 'success') {
      setShowIcon(true);
    }
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmergencyContactChange = (index: number, field: string, value: string) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      emergencyContacts: updatedContacts
    }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", phone: "", relation: "" }
      ]
    }));
  };

  const goToNextStep = () => {
    if (currentStep === 'personal1') {
      setCurrentStep('personal2');
    } else if (currentStep === 'personal2') {
      setCurrentStep('emergency');
    } else if (currentStep === 'emergency') {
      setCurrentStep('success');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 'personal2') {
      setCurrentStep('personal1');
    } else if (currentStep === 'emergency') {
      setCurrentStep('personal2');
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto w-full max-w-md">
          

          <div className="my-12">
            {currentStep !== 'success' && (
              <h1 className="text-3xl font-bold mb-1">Registrasi</h1>
            )}
            {currentStep !== 'success' && (
              <p className="text-gray-600">
                {currentStep === 'personal1' ? 'Data Pribadi' : 
                 currentStep === 'personal2' ? 'Data Pribadi' : 'Data Kontak Darurat'}
              </p>
            )}
          </div>

          {currentStep === 'personal1' && (
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>

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
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Button 
                  type="button" 
                  onClick={goToNextStep}
                  className="bg-black hover:bg-black/90 text-white rounded-lg px-6 py-3"
                >
                  Lanjut
                </Button>
              </div>
            </form>
          )}

          {currentStep === 'personal2' && (
            <form className="space-y-6">
              <div>
                <label htmlFor="nik" className="block text-sm font-medium mb-2">
                  NIK
                </label>
                <input
                  id="nik"
                  name="nik"
                  type="text"
                  value={formData.nik}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Alamat
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-2">
                  Usia
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Jenis Kelamin
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="male"
                      name="gender"
                      type="radio"
                      checked={formData.gender === "Laki-laki"}
                      onChange={() => handleGenderChange("Laki-laki")}
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <label htmlFor="male" className="ml-2 text-sm text-gray-700">
                      Laki-laki
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="female"
                      name="gender"
                      type="radio"
                      checked={formData.gender === "Perempuan"}
                      onChange={() => handleGenderChange("Perempuan")}
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <label htmlFor="female" className="ml-2 text-sm text-gray-700">
                      Perempuan
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between space-x-4 mt-8">
                <Button 
                  type="button" 
                  onClick={goToPreviousStep}
                  variant="outline"
                  className="text-black rounded-lg px-6 py-3"
                >
                  Kembali
                </Button>
                <Button 
                  type="button" 
                  onClick={goToNextStep}
                  className="bg-black hover:bg-black/90 text-white rounded-lg px-6 py-3"
                >
                  Lanjut
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Emergency Contacts */}
          {currentStep === 'emergency' && (
            <form className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-semibold mb-2">Data Kontak Darurat</h2>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={addEmergencyContact}
                  className="text-sm py-2 px-4"
                >
                  + Tambah Kontak
                </Button>
              </div>

              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-md font-medium">Kontak {index + 1}</h3>
                  <div>
                    <label htmlFor={`contact-name-${index}`} className="block text-sm font-medium mb-2">
                      Nama
                    </label>
                    <input
                      id={`contact-name-${index}`}
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor={`contact-phone-${index}`} className="block text-sm font-medium mb-2">
                      Nomor HP
                    </label>
                    <input
                      id={`contact-phone-${index}`}
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor={`contact-relation-${index}`} className="block text-sm font-medium mb-2">
                      Hubungan
                    </label>
                    <input
                      id={`contact-relation-${index}`}
                      type="text"
                      value={contact.relation}
                      onChange={(e) => handleEmergencyContactChange(index, 'relation', e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between space-x-4 mt-8">
                <Button 
                  type="button" 
                  onClick={goToPreviousStep}
                  variant="outline"
                  className="text-black rounded-lg px-6 py-3"
                >
                  Kembali
                </Button>
                <Button 
                  type="button" 
                  onClick={goToNextStep}
                  className="bg-black hover:bg-black/90 text-white rounded-lg px-6 py-3"
                >
                  Kirim
                </Button>
              </div>
            </form>
          )}

          {/* Success Screen */}
          {currentStep === 'success' && (
            <div className="text-center flex flex-col justify-center items-center h-[60vh]">
              <style>{pulseAnimation}</style>
              <div className={`transition-all duration-1000 ease-in-out transform ${showIcon ? 'scale-100 opacity-100 pulse-animation' : 'scale-50 opacity-0'} mb-6`}>
                <CheckCircle2 className="h-20 w-20 text-green-500" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Registrasi Berhasil</h2>
              <p className="text-gray-600 mb-8">
                Cek email untuk melihat status verifikasi!
              </p>
              <Button 
                onClick={handleLogin}
                className="w-full bg-black hover:bg-black/90 text-white rounded-lg py-3"
              >
                Kembali ke Menu Login
              </Button>
            </div>
          )}

          {currentStep === 'personal1' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Sudah mempunyai akun?{" "}
                <Link href="/login" className="font-medium text-black hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}