"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User, Save, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEmergency, setIsEditingEmergency] = useState(false);
  // This would typically come from an API call or context
  const [userData, setUserData] = useState({
    nama_lengkap: "John Doe",
    email: "john.doe@example.com",
    nik: "3173054607040003",
    alamat: "Jalan Semangka\nMelon Mangga No. 50",
    usia: "35",
    jenis_kelamin: "Laki-laki",
    emergency_contacts: [{ nama: "Kontak Darurat", nomor_hp: "08123456789", hubungan: "Keluarga" }]
  });

  const [editData, setEditData] = useState({ ...userData });
  const [editEmergencyData, setEditEmergencyData] = useState({ 
    emergency_contacts: [...userData.emergency_contacts] 
  });

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

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleEmergencySave = () => {
    setUserData(prev => ({
      ...prev,
      emergency_contacts: [...editEmergencyData.emergency_contacts]
    }));
    setIsEditingEmergency(false);
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
                    <p className="font-semibold text-lg">{userData.nama_lengkap}</p>
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
                    <p className="font-semibold text-lg">{userData.nik}</p>
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
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    <p className="font-semibold text-lg">{userData.jenis_kelamin}</p>
                  )}
                </div>
              </div>
              
              <div>
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
                    <p className="font-semibold text-lg">{userData.usia} tahun</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Alamat</p>
                  {isEditing ? (
                    <textarea
                      name="alamat"
                      value={editData.alamat}
                      onChange={handleInputChange}
                      rows={3}
                      className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                    />
                  ) : (
                    <p className="font-semibold text-lg whitespace-pre-line">{userData.alamat}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Data Kontak Darurat</h2>
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
            
            {editEmergencyData.emergency_contacts.map((contact, index) => (
              <div key={index} className="mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                {index > 0 && isEditingEmergency && (
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={() => removeEmergencyContact(index)}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 rounded-lg px-4 flex items-center gap-2"
                    >
                      <X size={16} />
                      Hapus Kontak
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nama</p>
                    {isEditingEmergency ? (
                      <input
                        name="nama"
                        value={editEmergencyData.emergency_contacts[index].nama}
                        onChange={(e) => handleContactChange(index, e)}
                        className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <p className="font-semibold text-lg">{userData.emergency_contacts[index]?.nama || ""}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nomor HP</p>
                    {isEditingEmergency ? (
                      <input
                        name="nomor_hp"
                        value={editEmergencyData.emergency_contacts[index].nomor_hp}
                        onChange={(e) => handleContactChange(index, e)}
                        className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <p className="font-semibold text-lg">{userData.emergency_contacts[index]?.nomor_hp || ""}</p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hubungan</p>
                    {isEditingEmergency ? (
                      <input
                        name="hubungan"
                        value={editEmergencyData.emergency_contacts[index].hubungan}
                        onChange={(e) => handleContactChange(index, e)}
                        className="font-semibold text-lg w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-black focus:border-black"
                      />
                    ) : (
                      <p className="font-semibold text-lg">{userData.emergency_contacts[index]?.hubungan || ""}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isEditingEmergency && (
              <div className="mt-6">
                <Button
                  onClick={addEmergencyContact}
                  variant="outline"
                  className="border-black/20 hover:bg-black/5 rounded-lg px-4 flex items-center gap-2"
                >
                  + Tambah Kontak Darurat
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 