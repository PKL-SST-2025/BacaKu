import { Component, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { FaSolidQuestion, FaSolidBook, FaSolidUser } from 'solid-icons/fa';
import { TiArrowBack } from 'solid-icons/ti';
import { AiOutlineHome, AiOutlineBook } from 'solid-icons/ai';
import { BsBookmarksFill, BsPeople } from 'solid-icons/bs';
import { IoSettingsOutline } from 'solid-icons/io';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri';
import { useLocation } from '@solidjs/router';

const HelpPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = createSignal(false);
  const activePath = location.pathname;

  return (
    <div class="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar kiri - Desktop */}
      <div class="hidden md:flex md:flex-col md:w-20 bg-[#6db37e] fixed h-full z-20">
        <div class="flex flex-col items-center gap-y-10 mt-4 py-8">
          <button class="mb-4 bg-[#6db37e] cursor-pointer" onClick={() => navigate('/home')}>
            <TiArrowBack size={36} class="text-white" />
          </button>
        </div>
      </div>

      {/* Navbar atas - Mobile */}
      <div class="md:hidden w-full bg-[#6db37e] h-14 flex items-center px-4 fixed top-0 left-0 z-30">
        <button onClick={() => navigate('/home')} class="text-white">
          <TiArrowBack size={28} />
        </button>
      </div>

      {/* Drawer menu mobile */}
      {openMenu() && (
        <div class="fixed inset-0 bg-black/80 z-40 flex md:hidden">
          <div class="bg-white w-4/5 max-w-sm h-full p-6 flex flex-col gap-y-6 shadow-xl animate-slide-in">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-[#388e5c]">Menu</h2>
              <button 
                onClick={() => setOpenMenu(false)}
                class="text-gray-500 hover:text-[#388e5c]"
              >
                ✕
              </button>
            </div>
            <A href="/home" class="flex items-center gap-3 p-2 text-[#388e5c] font-medium rounded-lg hover:bg-[#e1eebc] transition" onClick={() => setOpenMenu(false)}>
              <AiOutlineHome size={22} /> Home
            </A>
            <A href="/katalog" class="flex items-center gap-3 p-2 text-[#388e5c] font-medium rounded-lg hover:bg-[#e1eebc] transition" onClick={() => setOpenMenu(false)}>
              <AiOutlineBook size={22} /> Katalog
            </A>
            <A href="/riwayat" class="flex items-center gap-3 p-2 text-[#388e5c] font-medium rounded-lg hover:bg-[#e1eebc] transition" onClick={() => setOpenMenu(false)}>
              <RiDocumentFileHistoryLine size={22} /> Riwayat
            </A>
            <A href="/settings" class="flex items-center gap-3 p-2 text-[#388e5c] font-medium rounded-lg hover:bg-[#e1eebc] transition" onClick={() => setOpenMenu(false)}>
              <IoSettingsOutline size={22} /> Settings
            </A>
            <button 
              class="flex items-center gap-3 p-2 text-[#388e5c] font-medium rounded-lg hover:bg-[#e1eebc] transition text-left w-full" 
              onClick={() => { setOpenMenu(false); navigate('/kelola-buku'); }}
            >
              <BsBookmarksFill size={22} /> Kelola Buku
            </button>
            <A href="/kelola-anggota" class="flex items-center gap-3 p-2 text-[#388e5c] font-medium rounded-lg hover:bg-[#e1eebc] transition" onClick={() => setOpenMenu(false)}>
              <BsPeople size={22} /> Kelola Anggota
            </A>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <div class="flex-1 p-8 pt-20 md:pt-8 md:ml-20 bg-gradient-to-br from-[#f6fff9] to-[#e7f6ec]">
        {/* Header */}
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold text-[#388e5c]">Pusat Bantuan</h1>
           <div class="hidden md:flex items-center space-x-2 ml-6">
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
        <hr class="border-gray-300 mb-6" />

        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-[#e1eebc] bg-gradient-to-br from-[#f6fff9] to-[#e7f6ec]">
          <div class="flex flex-col items-center mb-8">
            <img src="/LOGO_BacaKu.svg" alt="BacaKu Logo" class="w-20 h-20 mb-4 drop-shadow" />
            <h1 class="text-3xl md:text-4xl font-extrabold text-[#388e5c] mb-2 text-center">Pusat Bantuan BacaKu</h1>
            <p class="text-lg text-[#388e5c] font-semibold mb-2 text-center">Solusi mudah untuk setiap pertanyaanmu!</p>
          </div>

          <div class="mb-8">
            <h2 class="text-xl font-bold mb-2 text-[#388e5c] flex items-center gap-2">
              <FaSolidBook class="inline-block text-[#388e5c] text-2xl" /> Apa itu BacaKu?
            </h2>
            <p class="text-gray-700 text-base md:text-lg mb-2">
              <span class="font-bold text-[#388e5c]">BacaKu</span> adalah aplikasi pinjam buku dari perpustakaan secara online. Dengan BacaKu, kamu bisa mencari, meminjam, dan mengelola buku perpustakaan dari mana saja, kapan saja, dengan mudah dan cepat.
            </p>
          </div>

          <hr class="my-8 border-[#e1eebc]" />

          <h2 class="text-xl font-semibold mb-4">Panduan Penggunaan</h2>

          <A 
            href="/katalog"
            class="block p-4 rounded-lg hover:bg-[#e1eebc]/20 cursor-pointer border border-transparent hover:border-[#6db37e] transition-all duration-200"
          >
            <div class="flex items-center">
              <div class="bg-[#6db37e]/20 p-2 rounded-full">
                <FaSolidBook class="text-[#388e5c] text-xl" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-[#2c3e50]">Menjelajahi Katalog Buku</h3>
                <p class="text-sm text-gray-600">Temukan dan cari buku yang tersedia di perpustakaan kami</p>
              </div>
            </div>
          </A>

          <A 
            href="/peminjaman"
            class="block p-4 rounded-lg hover:bg-[#e1eebc]/20 cursor-pointer border border-transparent hover:border-[#6db37e] transition-all duration-200"
          >
            <div class="flex items-center">
              <div class="bg-[#6db37e]/20 p-2 rounded-full">
                <FaSolidBook class="text-[#388e5c] text-xl" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-[#2c3e50]">Peminjaman Buku</h3>
                <p class="text-sm text-gray-600">Proses peminjaman dan pengembalian buku</p>
              </div>
            </div>
          </A>
          
          <A 
            href="/riwayat"
            class="block p-4 rounded-lg hover:bg-[#e1eebc]/20 cursor-pointer border border-transparent hover:border-[#6db37e] transition-all duration-200"
          >
            <div class="flex items-center">
              <div class="bg-[#6db37e]/20 p-2 rounded-full">
                <FaSolidBook class="text-[#388e5c] text-xl" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-[#2c3e50]">Riwayat Peminjaman</h3>
                <p class="text-sm text-gray-600">Lihat riwayat peminjaman buku Anda</p>
              </div>
            </div>
          </A>
          
          <A 
            href="/profile"
            class="block p-4 rounded-lg hover:bg-[#e1eebc]/20 cursor-pointer border border-transparent hover:border-[#6db37e] transition-all duration-200"
          >
            <div class="flex items-center">
              <div class="bg-[#6db37e]/20 p-2 rounded-full">
                <FaSolidUser class="text-[#388e5c] text-xl" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-[#2c3e50]">Profil Akun</h3>
                <p class="text-sm text-gray-600">Kelola informasi akun dan data pribadi Anda</p>
              </div>
            </div>
          </A>
        </div>

        <hr class="my-6 border-gray-200" />

        <h2 class="text-xl font-semibold mb-4">Pertanyaan Umum</h2>

        <div class="space-y-4 mb-6">
          <div class="p-6 bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-xl border border-[#e1eebc] shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
            <h3 class="font-medium text-[#2c3e50]">Bagaimana cara meminjam buku?</h3>
            <p class="text-sm text-gray-600 mt-1">Pilih buku dari katalog, klik tombol 'Pinjam', dan ikuti petunjuk yang muncul.</p>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-xl border border-[#e1eebc] shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
            <h3 class="font-medium text-[#2c3e50]">Berapa lama durasi peminjaman?</h3>
            <p class="text-sm text-gray-600 mt-1">Durasi standar peminjaman adalah 7 hari. Dapat diperpanjang jika tidak ada waiting list.</p>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-xl border border-[#e1eebc] shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
            <h3 class="font-medium text-[#2c3e50]">Bagaimana jika buku terlambat dikembalikan?</h3>
            <p class="text-sm text-gray-600 mt-1">Akan dikenakan denda sesuai ketentuan yang berlaku di perpustakaan.</p>
          </div>
        </div>

        <hr class="my-6 border-gray-200" />

        <h2 class="text-xl font-semibold mb-4">Butuh Bantuan Lebih Lanjut?</h2>
        <div class="bg-[#e3f7ea] rounded-lg p-6 border border-[#c3e6d4] shadow-md">
          <p class="mb-4 text-gray-700">
            Jika Anda memiliki pertanyaan atau kendala lainnya, silakan hubungi tim dukungan kami:
          </p>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#6db37e] text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
              <span>Email: <a href="mailto:support@bacaku.id" class="text-[#388e5c] hover:underline font-medium">support@bacaku.id</a></span>
            </li>
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#6db37e] text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
              <span>Telepon: <a href="tel:02112345678" class="text-[#388e5c] hover:underline font-medium">+62 856-2446-1018</a></span>
            </li>
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#6db37e] text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
              <span>Jam Operasional: <span class="font-medium">Senin - Jumat, 08.00 - 17.00 WIB</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
