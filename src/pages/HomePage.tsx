import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { A, useLocation } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiFillHome, AiOutlineBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople } from 'solid-icons/bs';
import { IoSettingsOutline, IoSettingsSharp } from 'solid-icons/io';
import { HiOutlineQuestionMarkCircle } from 'solid-icons/hi';
import { RiBusinessCustomerServiceFill } from 'solid-icons/ri';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri'; // Riwayat (History) icon


const HomePage: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const [openMenu, setOpenMenu] = createSignal(false);
  const [showHelpText, setShowHelpText] = createSignal(false);
  const [showServiceText, setShowServiceText] = createSignal(false);
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  return (
    <div class="flex min-h-screen">
      {/* Sidebar */}
      {/* Sidebar utama, selalu hijau, responsif */}
      {/* Sidebar kiri (desktop/tablet) */}
      <div class="hidden md:flex bg-[#6db37e] h-screen w-20 flex-col items-center py-8 z-20">
        <div class="flex flex-col items-center gap-y-10 mt-14 flex-1">
          {/* Home */}
          <A href="/home" class="mb-4">
            {activePath === '/home' ? (
              <AiFillHome size={28} class="text-white" />
            ) : (
              <AiOutlineHome size={28} class="text-white" />
            )}
          </A>
          {/* Katalog */}
          <A href="/katalog" class="mb-4">
            <AiOutlineBook size={28} class="text-white" />
          </A>
          {/* Riwayat */}
          <A href="/riwayat" class="mb-4">
            <RiDocumentFileHistoryLine size={28} class="text-white" />
          </A>
          {/* Settings */}
          <A href="/settings" class="mb-4">
            {activePath === '/settings' ? (
              <IoSettingsSharp size={28} class="text-white" />
            ) : (
              <IoSettingsOutline size={28} class="text-white" />
            )}
          </A>
          {/* Kelola Buku */}
          <A href="/kelola-buku" class="mb-4">
            <BsBookmarks size={28} class="text-white" />
          </A>
          {/* Kelola Anggota */}
          <A href="/kelola-anggota" class="mb-4">
            <BsPeople size={28} class="text-white" />
          </A>
        </div>
        <div class="mb-4 mt-auto">
          <img src="/LOGO.svg" alt="Logo" class="w-10 h-10 object-contain mx-auto filter invert" style="filter: brightness(0) invert(1);" />
        </div>
      </div>

      {/* Navbar atas (mobile) */}
      <div class="flex md:hidden w-full bg-[#6db37e] h-14 items-center fixed top-0 left-0 z-30">
  <div class="flex items-center w-full relative">
    <button onClick={() => setOpenMenu(true)} class="z-10 flex-shrink-0 ml-4">
      <FiMenu size={28} class="text-white" />
    </button>
    <div class="flex-1 flex justify-center absolute left-0 right-0 pointer-events-none">
      <img src="/LOGO_BacaKu.svg" alt="Logo BacaKu" class="h-8 object-contain filter invert" style="filter: brightness(0) invert(1);" />
    </div>
  </div>
</div>

      {/* Drawer menu mobile */}
      {openMenu() && (
        <div class="fixed inset-0 bg-black/80 z-30 flex">
          <div class="bg-white w-56 h-full p-6 flex flex-col gap-y-8 shadow-xl">
            <A href="/home" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <AiFillHome size={22} /> Home
            </A>
            <A href="/katalog" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <AiOutlineBook size={22} /> Katalog
            </A>
            <A href="/riwayat" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <RiDocumentFileHistoryLine size={22} /> Riwayat
            </A>
            <A href="/settings" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <IoSettingsOutline size={22} /> Settings
            </A>
            <A href="/kelola-buku" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <BsBookmarks size={22} /> Kelola Buku
            </A>
            <A href="/kelola-anggota" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <BsPeople size={22} /> Kelola Anggota
            </A>
            <button class="mt-8 text-sm text-gray-500 hover:text-[#388e5c]" onClick={() => setOpenMenu(false)}>Tutup</button>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <div class="flex-1 p-8 pt-20 md:pt-8 min-h-screen bg-gradient-to-br from-[#f6fff9] to-[#e7f6ec]">

        {/* Header */}
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1 flex items-center">
            <div class="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search books"
                class="w-full pl-5 pr-12 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6db37e] text-gray-700 shadow-sm"
              />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#388e5c]">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2" d="M21 21l-4.35-4.35m2.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-2 ml-6">
            <div class="relative">
              <button onClick={() => setShowNotifModal(true)} class="relative p-2 rounded-full hover:bg-[#e1eebc]/50 transition">
                {/* Bell Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-[#388e5c]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a2.25 2.25 0 01-4.714 0M6.75 8.25a5.25 5.25 0 1110.5 0c0 1.172.26 2.318.637 3.283.373.955.813 1.876.813 2.717v.284a2.25 2.25 0 01-2.25 2.25H7.5a2.25 2.25 0 01-2.25-2.25v-.284c0-.841.44-1.762.813-2.717.377-.965.637-2.111.637-3.283z" />
                </svg>
              </button>
              {showNotifModal() && (
                <div class="absolute right-0 mt-1 z-10 w-64 max-w-xs">
                  {/* Panah ke atas */}
                  <div class="flex justify-end pr-2">
                    <div style="width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:10px solid #fff;"></div>
                  </div>
                  <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col items-center relative">
                    <button class="absolute top-2 right-2 text-gray-600 hover:text-[#27ae60] text-2xl" onClick={() => setShowNotifModal(false)}>&times;</button>
                    <div class="font-bold text-lg mb-3 text-center text-black">Notifikasi</div>
                    <ul class="mb-4 w-full">
                      <li class="mb-2 p-2 bg-[#f0fdf4] rounded text-[#219150] text-sm">Buku "Matematika" harus dikembalikan besok.</li>
                      <li class="mb-2 p-2 bg-[#f0fdf4] rounded text-[#219150] text-sm">Cek buku terbaru di perpustakaan!</li>
                      <li class="mb-2 p-2 bg-[#f0fdf4] rounded text-[#219150] text-sm">Ada update fitur baru di aplikasi.</li>
                    </ul>
                    <button class="px-8 py-2 rounded bg-[#27ae60] text-white font-semibold mt-2 hover:bg-[#219150] transition" onClick={() => setShowNotifModal(false)}>OK</button>
                  </div>
                </div>
              )}
            </div>
            <A href="/profile" class="flex items-center space-x-4 hover:bg-[#e1eebc]/20 px-2 py-1 rounded-full transition">
              <span class="font-medium text-[#388e5c]">Admin</span>
              <img src="https://i.pravatar.cc/40" alt="Admin" class="rounded-full w-10 h-10" />
            </A>
          </div>
        </div>
        {/* Garis pemisah */}
        <hr class="border-[#e1eebc] mb-8" />
        {/* Welcome text */}
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-[#388e5c] mb-1">Welcome back, Admin</h1>
          <p class="text-base font-medium text-black">Cari dan kelola pinjaman buku Anda.</p>
        </div>
        {/* Konten utama, bisa dikembangkan sesuai kebutuhan */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white rounded-2xl shadow-lg p-6 col-span-1 cursor-pointer border border-[#e1eebc] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 hover:bg-[#eafbe7] flex flex-col gap-2" onClick={() => navigate('/jadwal-pengembalian-buku')}>
  <div class="flex items-center gap-2 mb-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#388e5c" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6m7-8v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2.5m9 0H19a2 2 0 012 2z" /></svg>
    <div class="font-bold text-[#388e5c]">Pengembalian mendatang</div>
  </div>
            <div class="font-bold text-[#388e5c] mb-3">Waktu pengembalian bukumu!</div>
            <div class="text-sm mt-2">Sel, 24 Juni<br/>Book: Esok Hari</div>
          </div>
          <div class="bg-white rounded-2xl shadow-lg p-6 col-span-1 cursor-pointer border border-[#e1eebc] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 hover:bg-[#eafbe7] flex flex-col gap-2" onClick={() => navigate('/katalog')}>
  <div class="flex items-center gap-2 mb-3">
    <AiOutlineBook size={24} class="text-[#388e5c]" />
    <div class="font-bold text-[#388e5c]">Buku Terbaru</div>
  </div>
            <div class="font-bold text-[#388e5c] mb-3">Ada buku terbaru!</div>
            <div class="text-sm mt-2">Lihat koleksi buku terbaru yang tersedia di perpustakaan kami</div>
          </div>
          <div class="flex gap-6 justify-center items-center col-span-1 hidden md:flex">
  <button class="w-20 h-20 rounded-xl bg-gradient-to-br from-[#6db37e]/90 to-[#388e5c]/80 flex flex-col items-center justify-center shadow-lg border border-white/40 backdrop-blur-md hover:scale-105 hover:shadow-2xl transition-all duration-200 group" onClick={() => navigate('/help')}>
    <HiOutlineQuestionMarkCircle size={40} class="text-white drop-shadow group-hover:scale-110 transition-all duration-200" />
    <span class="text-white mt-2 block text-sm font-semibold tracking-wide">Help</span>
  </button>
  <button class="w-20 h-20 rounded-xl bg-gradient-to-br from-[#6db37e]/90 to-[#388e5c]/80 flex flex-col items-center justify-center shadow-lg border border-white/40 backdrop-blur-md hover:scale-105 hover:shadow-2xl transition-all duration-200 group" onClick={() => window.open('https://wa.me/6285624461018?text=hi', '_blank')}>
    <RiBusinessCustomerServiceFill size={40} class="text-white drop-shadow group-hover:scale-110 transition-all duration-200" />
    <span class="text-white mt-2 block text-sm font-semibold tracking-wide">Service</span>
  </button>
</div>

{/* Floating help & service button for mobile */}
<div class="fixed bottom-8 right-6 flex flex-col gap-4 md:hidden z-50">
  <div class="relative">
    <button
      class="w-14 h-14 rounded-full bg-gradient-to-br from-[#6db37e]/90 to-[#388e5c]/80 shadow-lg border border-white/40 backdrop-blur-md flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-200 group"
      onMouseEnter={() => setShowHelpText(true)}
      onMouseLeave={() => setShowHelpText(false)}
      onTouchStart={() => setShowHelpText(true)}
      onTouchEnd={() => setShowHelpText(false)}
      onClick={() => navigate('/help')}
    >
      <HiOutlineQuestionMarkCircle size={32} class="text-white drop-shadow group-hover:scale-110 transition-all duration-200" />
    </button>
    {showHelpText() && (
      <div class="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white/90 text-[#388e5c] shadow-xl px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap border border-[#e1eebc] flex items-center gap-2 animate-fade-in">
        <span>Butuh bantuan?</span>
        <span class='block w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white/90 ml-2'></span>
      </div>
    )}
  </div>
  <div class="relative">
    <button
      class="w-14 h-14 rounded-full bg-gradient-to-br from-[#6db37e]/90 to-[#388e5c]/80 shadow-lg border border-white/40 backdrop-blur-md flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-200 group"
      onMouseEnter={() => setShowServiceText(true)}
      onMouseLeave={() => setShowServiceText(false)}
      onTouchStart={() => setShowServiceText(true)}
      onTouchEnd={() => setShowServiceText(false)}
      onClick={() => window.open('https://wa.me/6285624461018?text=hi', '_blank')}
    >
      <RiBusinessCustomerServiceFill size={32} class="text-white drop-shadow group-hover:scale-110 transition-all duration-200" />
    </button>
    {showServiceText() && (
      <div class="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white/90 text-[#388e5c] shadow-xl px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap border border-[#e1eebc] flex items-center gap-2 animate-fade-in">
        <span>Hubungi kami untuk membantu</span>
        <span class='block w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white/90 ml-2'></span>
      </div>
    )}
  </div>
</div>
        </div>
        <div class="flex gap-8 flex-col md:flex-row">
          <div class="flex-1">
            <div class="font-bold mb-3">Peminjaman ku</div>
            <div class="bg-white rounded-xl shadow p-4">
              <div class="font-semibold text-[#388e5c] mb-7">2 Peminjaman aktif</div>
              <div class="flex items-center mb-5">
                <img src="https://i.pravatar.cc/28" class="rounded-full mr-4" />
                <span>Admin - Membawa "Esok Hari"</span>
                <span class="ml-auto text-gray-500 text-xs">Tenggat</span>
              </div>
              <div class="flex items-center mb-6">
                <img src="https://i.pravatar.cc/28" class="rounded-full mr-4" />
                <span>Admin - Mengembalikan buku</span>
                <span class="ml-auto text-gray-500 text-xs">Besok</span>
              </div>
            </div>
          </div>
          <div class="flex-1">
            <div class="font-bold mb-3">Pengembalian mendatang</div>
            <div class="bg-white rounded-xl shadow p-4">
              <div class="mb-4 flex items-center">
                <span class="bg-[#e6e6e6] text-[#90C67C] rounded px-3 py-3 mr-2 font-bold text-xl">25</span>
                <span>Buku Matematika - 25 Juni - 14:00</span>
              </div>
              <div class="flex items-center">
                <span class="bg-[#e6e6e6] text-[#90C67C] rounded px-3 py-3 mr-2 font-bold text-xl">26</span>
                <span>Jurnal Sains - 27 Juni - 10:30</span>
              </div>
              <button class="w-full bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 hover:bg-[#5aa76a] text-white font-bold py-2 rounded-md mt-4" onClick={() => navigate('/jadwal-pengembalian-buku')}>Lihat semua</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
