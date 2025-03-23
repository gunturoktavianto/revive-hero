"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User, Save, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Define a type for the user data structure
type UserData = {
  nama_lengkap: string;
  email: string;
  nik: string;
  alamat: string;
  usia: string;
  jenis_kelamin: string;
  emergency_contacts: Array<{
    nama: string;
    nomor_hp: string;
    hubungan: string;
  }>;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  
  // Initialize with empty data
  const [userData, setUserData] = useState<UserData>({
    nama_lengkap: "",
    email: "",
    nik: "",
    alamat: "",
    usia: "",
    jenis_kelamin: "",
    emergency_contacts: []
  });

  const [editData, setEditData] = useState<UserData>({ ...userData });
  const [editEmergencyData, setEditEmergencyData] = useState({ 
    emergency_contacts: [...userData.emergency_contacts] 
  });

  // Fetch user data when session is ready
  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/user?email=${session.user.email}`);
          
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          
          const data = await response.json();
          
          // Transform data from API format to UI format
          const transformedData: UserData = {
            nama_lengkap: data.name || "",
            email: data.email || "",
            nik: data.nik || "",
            alamat: data.address || "",
            usia: data.age ? data.age.toString() : "",
            jenis_kelamin: data.gender || "",
            emergency_contacts: data.emergencyContacts ? data.emergencyContacts.map((contact: any) => ({
              nama: contact.name || "",
              nomor_hp: contact.phone || "",
              hubungan: contact.relation || ""
            })) : []
          };
          
          setUserData(transformedData);
          setEditData(transformedData);
          setEditEmergencyData({ 
            emergency_contacts: [...transformedData.emergency_contacts] 
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Gagal memuat data pengguna");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchUserData();
  }, [session, status]);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({ ...userData }); // Reset to original data if canceling
    }
    setIsEditing(!isEditing);
  };

  const handleEmergencyEditToggle = () => {
    if (isEditingEmergency) {
      setEditEmergencyData({ 
        emergency_contacts: [...userData.emergency_contacts] 
      }); // Reset to original data if canceling
    }
    setIsEditingEmergency(!isEditingEmergency);
  };

  const handleSave = async () => {
    try {
      // Transform data from UI format to API format
      const apiData = {
        name: editData.nama_lengkap,
        nik: editData.nik,
        address: editData.alamat,
        age: editData.usia ? parseInt(editData.usia) : undefined,
        gender: editData.jenis_kelamin,
      };
      
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      
      // Update the local state with the edited data
      setUserData({ ...editData });
      setIsEditing(false);
      toast.success("Data berhasil disimpan");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Gagal menyimpan data");
    }
  };

  const handleEmergencySave = async () => {
    try {
      // Transform data from UI format to API format
      const apiData = {
        emergencyContacts: editEmergencyData.emergency_contacts.map(contact => ({
          name: contact.nama,
          phone: contact.nomor_hp,
          relation: contact.hubungan
        }))
      };
      
      const response = await fetch('/api/user/emergency-contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update emergency contacts");
      }
      
      // Update the local state with the edited data
      setUserData(prev => ({
        ...prev,
        emergency_contacts: [...editEmergencyData.emergency_contacts]
      }));
      setIsEditingEmergency(false);
      toast.success("Kontak darurat berhasil disimpan");
    } catch (error) {
      console.error("Error updating emergency contacts:", error);
      toast.error("Gagal menyimpan kontak darurat");
    }
  };

  const addEmergencyContact = () => {
    setEditEmergencyData(prev => ({
      ...prev,
      emergency_contacts: [
        ...prev.emergency_contacts,
        { nama: "", nomor_hp: "", hubungan: "" }
      ]
    }));
  };

  const removeEmergencyContact = (index: number) => {
    if (editEmergencyData.emergency_contacts.length > 1) {
      const updatedContacts = [...editEmergencyData.emergency_contacts];
      updatedContacts.splice(index, 1);
      
      setEditEmergencyData(prev => ({
        ...prev,
        emergency_contacts: updatedContacts
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedContacts = [...editEmergencyData.emergency_contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [name]: value
    };
    
    setEditEmergencyData(prev => ({
      ...prev,
      emergency_contacts: updatedContacts
    }));
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[220px] bg-black text-white flex flex-col">
        <div className="p-4 flex justify-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        
        <div className="flex-1 py-8">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 px-4 py-3 bg-white/10 border-l-4 border-white"
              >
                <User size={20} />
                <span>Informasi Pengguna</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 relative group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Beranda</span>
                <motion.span
                  layoutId="sidebar-home"
                  className="absolute inset-0 z-0 bg-white/5 rounded-md pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="p-4">
          <button 
            onClick={handleSignOut} 
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 rounded-md group relative"
          >
            <LogOut size={20} />
            <span className="relative z-10 font-medium transition-colors">Keluar</span>
            <motion.span
              layoutId="sidebar-logout"
              className="absolute inset-0 z-0 bg-white/5 rounded-md pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {/* Header with logo only */}
        <header className="bg-white p-4 flex items-center border-b">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Revive Hero Logo" 
              width={40} 
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold">Revive Hero</span>
          </div>
        </header>

        <main className="p-6">
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Memuat data pengguna...</p>
            </div>
          ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Informasi Pengguna</h2>
              
              {isEditing ? (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSave}
                    className="bg-black hover:bg-black/90 text-white rounded-lg px-4 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Simpan
                  </Button>
                  <Button 
                    onClick={handleEditToggle}
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 rounded-lg px-4 flex items-center gap-2 "
                  >
                    <X size={16} />
                    Batal
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleEditToggle}
                  variant="outline" 
                  className="border-black/20 hover:bg-black/5 rounded-lg px-4"
                >
                  Edit
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Nama</p>
                  {isEditing ? (
                    <input
                      name="nama_lengkap"
                      value={editData.nama_lengkap}
                      onChange={handleInputChange}
                      className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                    />
                  ) : (
                    <p className="font-semibold text-lg">{userData.nama_lengkap || "-"}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">NIK</p>
                  {isEditing ? (
                    <input
                      name="nik"
                      value={editData.nik}
                      onChange={handleInputChange}
                      className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                    />
                  ) : (
                    <p className="font-semibold text-lg">{userData.nik || "-"}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Jenis Kelamin</p>
                  {isEditing ? (
                    <select
                      name="jenis_kelamin"
                      value={editData.jenis_kelamin}
                      onChange={(e) => setEditData({...editData, jenis_kelamin: e.target.value})}
                      className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    <p className="font-semibold text-lg">{userData.jenis_kelamin || "-"}</p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-lg">{userData.email || "-"}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Usia</p>
                  {isEditing ? (
                    <input
                      name="usia"
                      type="number"
                      value={editData.usia}
                      onChange={handleInputChange}
                      className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                    />
                  ) : (
                    <p className="font-semibold text-lg">{userData.usia ? `${userData.usia} tahun` : "-"}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Alamat</p>
                  {isEditing ? (
                    <textarea
                      name="alamat"
                      value={editData.alamat}
                      onChange={handleInputChange}
                      className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                      rows={3}
                    />
                  ) : (
                    <p className="font-semibold text-lg whitespace-pre-line">{userData.alamat || "-"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          )}
          
          {!isLoading && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Kontak Darurat</h2>
              
              {isEditingEmergency ? (
                <div className="flex gap-2">
                  <Button 
                    onClick={handleEmergencySave}
                    className="bg-black hover:bg-black/90 text-white rounded-lg px-4 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Simpan
                  </Button>
                  <Button 
                    onClick={handleEmergencyEditToggle}
                    variant="outline" 
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 rounded-lg px-4 flex items-center gap-2"
                  >
                    <X size={16} />
                    Batal
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleEmergencyEditToggle}
                  variant="outline" 
                  className="border-black/20 hover:bg-black/5 rounded-lg px-4"
                >
                  Edit
                </Button>
              )}
            </div>
            
            {userData.emergency_contacts.length === 0 ? (
              <p className="text-gray-500 italic">Tidak ada kontak darurat yang terdaftar</p>
            ) : (
              <>
                {editEmergencyData.emergency_contacts.map((contact, index) => (
                  <div key={index} className="mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                    {index > 0 && isEditingEmergency && (
                      <button
                        onClick={() => removeEmergencyContact(index)}
                        className="text-red-500 hover:text-red-700 text-sm mb-2 flex items-center"
                      >
                        <X size={16} className="mr-1" />
                        Hapus kontak
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Nama</p>
                        {isEditingEmergency ? (
                          <input
                            name="nama"
                            value={contact.nama}
                            onChange={(e) => handleContactChange(index, e)}
                            className="font-semibold w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                          />
                        ) : (
                          <p className="font-semibold">{contact.nama}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Nomor HP</p>
                        {isEditingEmergency ? (
                          <input
                            name="nomor_hp"
                            value={contact.nomor_hp}
                            onChange={(e) => handleContactChange(index, e)}
                            className="font-semibold w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                          />
                        ) : (
                          <p className="font-semibold">{contact.nomor_hp}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Hubungan</p>
                        {isEditingEmergency ? (
                          <input
                            name="hubungan"
                            value={contact.hubungan}
                            onChange={(e) => handleContactChange(index, e)}
                            className="font-semibold w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                          />
                        ) : (
                          <p className="font-semibold">{contact.hubungan}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            
            {isEditingEmergency && (
              <Button 
                onClick={addEmergencyContact}
                variant="outline" 
                className="w-full mt-4 border-dashed border-black/20 text-black/70 hover:bg-black/5"
              >
                + Tambah Kontak Darurat
              </Button>
            )}
          </div>
          )}
        </main>
      </div>
    </div>
  );
} 