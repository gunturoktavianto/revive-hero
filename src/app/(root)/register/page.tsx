"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

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

type ValidationErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  nik?: string;
  age?: string;
  emergencyContacts?: Array<{
    name?: string;
    phone?: string;
    relation?: string;
  }>;
};

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('personal1');
  const [showIcon, setShowIcon] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
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

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        error = !value ? 'Nama harus diisi' : '';
        break;
      case 'email':
        error = !value 
          ? 'Email harus diisi' 
          : !/\S+@\S+\.\S+/.test(value) 
            ? 'Format email tidak valid' 
            : '';
        break;
      case 'password':
        error = !value 
          ? 'Kata sandi harus diisi' 
          : value.length < 6 
            ? 'Kata sandi minimal 6 karakter' 
            : '';
        break;
      case 'confirmPassword':
        error = !value 
          ? 'Konfirmasi kata sandi harus diisi' 
          : value !== formData.password 
            ? 'Kata sandi tidak cocok' 
            : '';
        break;
      case 'nik':
        error = !value ? 'NIK harus diisi' : '';
        break;
      case 'age':
        const age = parseInt(value);
        error = !value 
          ? 'Usia harus diisi' 
          : isNaN(age) || age <= 0 
            ? 'Usia harus berupa angka yang valid' 
            : '';
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
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

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [`emergencyContacts.${index}.${field}`]: true
    }));

    // Validate emergency contact fields
    let errorMessage = '';
    if (field === 'name' && !value) {
      errorMessage = 'Nama kontak harus diisi';
    } else if (field === 'phone' && !value) {
      errorMessage = 'Nomor telepon harus diisi';
    } else if (field === 'relation' && !value) {
      errorMessage = 'Hubungan harus diisi';
    }

    // Update errors for emergency contacts
    const contactErrors = [...(errors.emergencyContacts || [])];
    if (!contactErrors[index]) {
      contactErrors[index] = {};
    }
    contactErrors[index] = {
      ...contactErrors[index],
      [field]: errorMessage
    };

    setErrors(prev => ({
      ...prev,
      emergencyContacts: contactErrors
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

  const removeEmergencyContact = (index: number) => {
    if (formData.emergencyContacts.length > 1) {
      const updatedContacts = [...formData.emergencyContacts];
      updatedContacts.splice(index, 1);
      
      setFormData(prev => ({
        ...prev,
        emergencyContacts: updatedContacts
      }));

      // Clean up errors and touched state for the removed contact
      const updatedErrors = { ...errors };
      if (updatedErrors.emergencyContacts?.length) {
        updatedErrors.emergencyContacts = updatedErrors.emergencyContacts.filter((_, i) => i !== index);
      }
      setErrors(updatedErrors);

      // Update touched state
      const newTouched = { ...touched };
      Object.keys(newTouched).forEach(key => {
        if (key.startsWith(`emergencyContacts.${index}.`)) {
          delete newTouched[key];
        }
      });
      setTouched(newTouched);
    } else {
      toast.error("Minimal satu kontak darurat diperlukan");
    }
  };

  const validateStep = (step: FormStep): boolean => {
    let isValid = true;
    const newErrors: ValidationErrors = {};
    
    let newTouched = { ...touched };
    
    if (step === 'personal1') {
      ['name', 'email', 'password', 'confirmPassword'].forEach(field => {
        newTouched[field] = true;
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        if (error) {
          (newErrors as any)[field] = error;
          isValid = false;
        }
      });
    } else if (step === 'personal2') {
      // Validate NIK and age
      ['nik', 'age'].forEach(field => {
        newTouched[field] = true;
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        if (error) {
          (newErrors as any)[field] = error;
          isValid = false;
        }
      });
    } else if (step === 'emergency') {
      // Validate at least one emergency contact
      if (formData.emergencyContacts.length === 0) {
        isValid = false;
        toast.error("Mohon tambahkan minimal satu kontak darurat");
      } else {
        // Validate all emergency contacts
        const contactErrors: Array<{ name?: string; phone?: string; relation?: string }> = [];
        
        formData.emergencyContacts.forEach((contact, index) => {
          contactErrors[index] = {};
          newTouched[`emergencyContacts.${index}.name`] = true;
          newTouched[`emergencyContacts.${index}.phone`] = true;
          newTouched[`emergencyContacts.${index}.relation`] = true;
          
          if (!contact.name) {
            contactErrors[index].name = 'Nama kontak harus diisi';
            isValid = false;
          }
          
          if (!contact.phone) {
            contactErrors[index].phone = 'Nomor telepon harus diisi';
            isValid = false;
          }
          
          if (!contact.relation) {
            contactErrors[index].relation = 'Hubungan harus diisi';
            isValid = false;
          }
        });
        
        if (!isValid) {
          newErrors.emergencyContacts = contactErrors;
        }
      }
    }
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    return isValid;
  };

  const goToNextStep = () => {
    if (currentStep === 'personal1') {
      if (validateStep('personal1')) {
        setCurrentStep('personal2');
      } else {
        toast.error("Mohon isi semua kolom yang diperlukan dengan benar");
      }
    } else if (currentStep === 'personal2') {
      if (validateStep('personal2')) {
        setCurrentStep('emergency');
      } else {
        toast.error("Mohon isi semua kolom yang diperlukan dengan benar");
      }
    } else if (currentStep === 'emergency') {
      if (validateStep('emergency')) {
        handleRegister();
      } else {
        toast.error("Mohon isi semua detail kontak darurat dengan benar");
      }
    }
  };

  const handleRegister = async () => {
    try {
      // Filter out empty emergency contacts
      const validEmergencyContacts = formData.emergencyContacts.filter(
        contact => contact.name && contact.phone && contact.relation
      );
      
      // Convert age string to number for API
      const ageValue = formData.age ? parseInt(formData.age, 10) : undefined;
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          nik: formData.nik,
          address: formData.address,
          age: formData.age,
          gender: formData.gender,
          emergencyContacts: validEmergencyContacts.length > 0 ? validEmergencyContacts : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          toast.error(typeof data.error === 'string' ? data.error : 'Registrasi gagal');
        } else {
          toast.error('Registrasi gagal');
        }
        return;
      }

      // Registration successful, show success state
      toast.success('Registrasi berhasil! Mengalihkan ke halaman login...');
      setCurrentStep('success');
      
      // After showing success page for 3 seconds, redirect to login
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
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

  // Error display component
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    
    return (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
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
                  className={`appearance-none block w-full px-3 py-3 border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                />
                {touched.name && errors.name && <ErrorMessage error={errors.name} />}
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
                  className={`appearance-none block w-full px-3 py-3 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                />
                {touched.email && errors.email && <ErrorMessage error={errors.email} />}
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
                  className={`appearance-none block w-full px-3 py-3 border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                />
                {touched.password && errors.password && <ErrorMessage error={errors.password} />}
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
                  className={`appearance-none block w-full px-3 py-3 border ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                />
                {touched.confirmPassword && errors.confirmPassword && <ErrorMessage error={errors.confirmPassword} />}
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
                  className={`appearance-none block w-full px-3 py-3 border ${touched.nik && errors.nik ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                />
                {touched.nik && errors.nik && <ErrorMessage error={errors.nik} />}
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
                  className={`appearance-none block w-full px-3 py-3 border ${touched.age && errors.age ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                />
                {touched.age && errors.age && <ErrorMessage error={errors.age} />}
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium">Kontak {index + 1}</h3>
                    {formData.emergencyContacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmergencyContact(index)}
                        className="border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 rounded-lg px-4 py-1 flex items-center gap-2 text-sm"
                      >
                        <X size={16} />
                        Hapus Kontak
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nama Kontak Darurat
                    </label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                      className={`appearance-none block w-full px-3 py-3 border ${
                        touched[`emergencyContacts.${index}.name`] && errors.emergencyContacts?.[index]?.name 
                          ? 'border-red-500' 
                          : 'border-gray-300'
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                    />
                    {touched[`emergencyContacts.${index}.name`] && errors.emergencyContacts?.[index]?.name && (
                      <ErrorMessage error={errors.emergencyContacts[index].name} />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                      className={`appearance-none block w-full px-3 py-3 border ${
                        touched[`emergencyContacts.${index}.phone`] && errors.emergencyContacts?.[index]?.phone 
                          ? 'border-red-500' 
                          : 'border-gray-300'
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                    />
                    {touched[`emergencyContacts.${index}.phone`] && errors.emergencyContacts?.[index]?.phone && (
                      <ErrorMessage error={errors.emergencyContacts[index].phone} />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Hubungan
                    </label>
                    <input
                      type="text"
                      value={contact.relation}
                      onChange={(e) => handleEmergencyContactChange(index, 'relation', e.target.value)}
                      className={`appearance-none block w-full px-3 py-3 border ${
                        touched[`emergencyContacts.${index}.relation`] && errors.emergencyContacts?.[index]?.relation 
                          ? 'border-red-500' 
                          : 'border-gray-300'
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black`}
                    />
                    {touched[`emergencyContacts.${index}.relation`] && errors.emergencyContacts?.[index]?.relation && (
                      <ErrorMessage error={errors.emergencyContacts[index].relation} />
                    )}
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