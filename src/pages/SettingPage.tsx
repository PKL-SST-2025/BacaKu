import { Component, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiOutlineBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople } from 'solid-icons/bs';
import { IoSettingsOutline, IoSettingsSharp } from 'solid-icons/io';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri';

const SettingPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = createSignal(false);
  const [showModal, setShowModal] = createSignal<string>('');
  const [notifPengingat, setNotifPengingat] = createSignal<boolean>(true);
  const [notifInfo, setNotifInfo] = createSignal<boolean>(true);
  const [theme, setTheme] = createSignal<'terang' | 'gelap'>('terang');
  const [bahasa, setBahasa] = createSignal<'indo' | 'en'>('indo');

  return (
    <>
      {/* Sidebar */}
      <div class="hidden md:flex fixed top-0 left-0 bg-[#6db37e] min-h-screen h-full w-20 flex-col items-center py-8 z-20">
  <div class="flex flex-col items-center gap-y-10 mt-14">
    <A href="/home" class="mb-4"><AiOutlineHome size={28} class="text-white" /></A>
    <A href="/katalog" class="mb-4"><AiOutlineBook size={28} class="text-white" /></A>
    <A href="/riwayat" class="mb-4"><RiDocumentFileHistoryLine size={28} class="text-white" /></A>
    <A href="/settings" class="mb-4"><IoSettingsSharp size={28} class="text-white" /></A>
    <A href="/kelola-buku" class="mb-4"><BsBookmarks size={28} class="text-white" /></A>
    <A href="/kelola-anggota" class="mb-4"><BsPeople size={28} class="text-white" /></A>
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
        <div class="fixed inset-0 bg-black/80 z-40 md:hidden flex">
          <div class="bg-white w-56 h-full p-6 flex flex-col gap-y-8 shadow-xl">
            <A href="/home" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><AiOutlineHome size={22} /> Home</A>
            <A href="/katalog" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><AiOutlineBook size={22} /> Katalog</A>
            <A href="/riwayat" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><RiDocumentFileHistoryLine size={22} /> Riwayat</A>
            <A href="/settings" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><IoSettingsSharp size={22} /> Settings</A>
            <A href="/kelola-buku" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><BsBookmarks size={22} /> Kelola Buku</A>
            <A href="/kelola-anggota" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><BsPeople size={22} /> Kelola Anggota</A>
            <button class="mt-8 text-sm text-gray-500 hover:text-[#388e5c]" onClick={() => setOpenMenu(false)}>Tutup</button>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <div class="flex-1 md:ml-20 p-4 pt-20 md:pt-8 flex flex-col min-h-screen bg-white">
        {/* Header + Garis */}
        <div class="pl-4 md:pl-4">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold text-[#388e5c]">Settings</h1>
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
                     <button class="px-8 py-2 rounded bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 text-white font-semibold mt-2 hover:bg-[#219150] transition" onClick={() => setShowNotifModal(false)}>OK</button>
                   </div>
                 </div>
               )}
             </div>
             <A href="/profile" class="flex items-center space-x-4 hover:bg-[#e1eebc]/20 px-2 py-1 rounded-full transition">
               <span class="font-medium text-[#388e5c]">Admin</span>
               <img src="https://i.pravatar.cc/40" alt="Admin" class="rounded-full w-10 h-10"/>
             </A>
           </div>
          </div>
          <hr class="border-gray-300 mb-6 w-full max-w-[14udah00px] mx-0" />
        </div>

        {/* Setting Sections */}
        <div class="flex flex-col gap-10 w-full max-w-4xl mx-auto">
          {/* Seting Akun */}
          <div class="bg-gradient-to-br from-[#f6fff9]/90 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6">
            <div class="text-xl font-bold text-center mb-2 text-[#388e5c] tracking-wide drop-shadow-sm">Seting Akun</div>
            <div class="flex flex-col gap-2 mb-2">
              <div class="flex items-center justify-between">
                <div class="font-semibold">Ganti Email</div>
                <button class="px-3 py-1 rounded bg-[#e1eebc] text-[#388e5c] hover:bg-[#cbe7a7] transition text-sm font-medium">Ubah</button>
              </div>
              <div class="flex items-center justify-between">
                <div class="font-semibold">Ganti Password</div>
                <button class="px-3 py-1 rounded bg-[#e1eebc] text-[#388e5c] hover:bg-[#cbe7a7] transition text-sm font-medium">Ubah</button>
              </div>
            </div>
            <hr class="border-[#e1eebc] my-2" />
          </div>

          {/* Tampilan */}
          <div class="bg-gradient-to-br from-[#f6fff9]/90 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6">
            <div class="text-xl font-bold text-center mb-2 text-[#388e5c] tracking-wide drop-shadow-sm">Tampilan</div>
            <div class="flex flex-col gap-2 mb-2">
              <div class="flex items-center justify-between">
                <div class="font-semibold">Tema aplikasi</div>
                <button class="px-3 py-1 rounded bg-[#e1eebc] text-[#388e5c] hover:bg-[#cbe7a7] transition text-sm font-medium" onClick={() => setShowModal('tema')}>Ganti</button>
              </div>
              <div class="flex items-center justify-between">
                <div class="font-semibold">Bahasa aplikasi</div>
                <button class="px-3 py-1 rounded bg-[#e1eebc] text-[#388e5c] hover:bg-[#cbe7a7] transition text-sm font-medium" onClick={() => setShowModal('bahasa')}>Ganti</button>
              </div>
            </div>
            <hr class="border-[#e1eebc] my-2" />
          </div>

          {/* Notifikasi */}
          <div class="bg-gradient-to-br from-[#f6fff9]/90 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6">
            <div class="text-xl font-bold text-center mb-2 text-[#388e5c] tracking-wide drop-shadow-sm">Notifikasi</div>
            <div class="flex flex-col gap-2 mb-2">
              <div class="flex items-center justify-between">
                <div class="font-semibold">Pengingat pengembalian buku</div>
                <button class={`w-14 h-7 flex items-center rounded-full px-1.5 transition shadow ${notifPengingat() ? 'bg-[#8fcb8c]' : 'bg-gray-300'}`} onClick={() => setNotifPengingat(v => !v)}>
                  <span class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${notifPengingat() ? 'translate-x-7' : ''}`}></span>
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div class="font-semibold">Info kegiatan & event</div>
                <button class={`w-14 h-7 flex items-center rounded-full px-1.5 transition shadow ${notifInfo() ? 'bg-[#8fcb8c]' : 'bg-gray-300'}`} onClick={() => setNotifInfo(v => !v)}>
                  <span class={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${notifInfo() ? 'translate-x-7' : ''}`}></span>
                </button>
              </div>
            </div>
            <hr class="border-[#e1eebc] my-2" />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div class="flex flex-col gap-4 max-w-lg mx-auto mt-8">
          <button
            class="w-full px-40 py-3 rounded-lg bg-gradient-to-r from-[#ff5c5c] to-[#e04a4a] text-white font-bold text-lg shadow hover:brightness-95 hover:scale-[1.01] transition"
            onClick={() => setShowModal('hapus')}
          >
            Hapus Akun
          </button>
          <button
            class="w-full px-40 py-3 rounded-lg bg-gradient-to-r from-[#8fcb8c] to-[#6db37e] text-white font-bold text-lg shadow hover:brightness-95 hover:scale-[1.01] transition"
            onClick={() => setShowModal('ganti')}
          >
            Ganti Akun
          </button>
          <button
            class="w-full px-40 py-3 rounded-lg bg-gradient-to-r from-[#8fcb8c] to-[#6db37e] text-white font-bold text-lg shadow hover:brightness-95 hover:scale-[1.01] transition"
            onClick={() => setShowModal('simpan')}
          >
            Simpan Perubahan
          </button>
        </div>

        {/* Modal Popups */}
        {showModal() === 'hapus' && (
          <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
              <div class="font-bold text-lg mb-4 text-center">Anda yakin ingin menghapus akun ini?</div>
              <div class="flex gap-4 mt-2">
                <button class="px-6 py-2 rounded bg-[#ff5c5c] text-white font-semibold hover:bg-[#c0392b] transition" onClick={() => { setShowModal(''); navigate('/login'); }}>Ya</button>
                <button class="px-6 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 transition" onClick={() => setShowModal('')}>Tidak</button>
              </div>
            </div>
          </div>
        )}
        {showModal() === 'ganti' && (
          <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
              <div class="font-bold text-lg mb-4 text-center">Anda yakin ingin mengganti akun?</div>
              <div class="flex gap-4 mt-2">
                <button class="px-6 py-2 rounded bg-[#8fcb8c] text-white font-semibold hover:bg-[#388e5c] transition" onClick={() => { setShowModal(''); navigate('/login'); }}>Ya</button>
                <button class="px-6 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 transition" onClick={() => setShowModal('')}>Tidak</button>
              </div>
            </div>
          </div>
        )}
        {showModal() === 'simpan' && (
          <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
              <div class="font-bold text-lg mb-4 text-center">Perubahan berhasil disimpan!</div>
              <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => setShowModal('')}>OK</button>
            </div>
          </div>
        )}
        {/* Modal Tema */}
        {showModal() === 'tema' && (
          <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div class="bg-white rounded-xl shadow-lg p-6 max-w-xs w-full flex flex-col items-center">
              <div class="font-bold text-lg mb-4 text-center">Pilih Tema</div>
              <div class="flex gap-4 mb-4">
                <button class={`px-4 py-2 rounded-lg font-semibold border ${theme() === 'terang' ? 'bg-[#e1eebc] text-[#388e5c] border-[#8fcb8c]' : 'bg-white text-gray-700 border-gray-300'}`} onClick={() => { setTheme('terang'); setShowModal(''); }}>Terang</button>
                <button class={`px-4 py-2 rounded-lg font-semibold border ${theme() === 'gelap' ? 'bg-[#e1eebc] text-[#388e5c] border-[#8fcb8c]' : 'bg-white text-gray-700 border-gray-300'}`} onClick={() => { setTheme('gelap'); setShowModal(''); }}>Gelap</button>
              </div>
              <button class="px-8 py-2 rounded bg-gray-200 text-gray-700 font-semibold mt-2" onClick={() => setShowModal('')}>Batal</button>
            </div>
          </div>
        )}
        {/* Modal Bahasa */}
        {showModal() === 'bahasa' && (
          <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div class="bg-white rounded-xl shadow-lg p-6 max-w-xs w-full flex flex-col items-center">
              <div class="font-bold text-lg mb-4 text-center">Pilih Bahasa</div>
              <div class="flex gap-4 mb-4">
                <button class={`px-4 py-2 rounded-lg font-semibold border ${bahasa() === 'indo' ? 'bg-[#e1eebc] text-[#388e5c] border-[#8fcb8c]' : 'bg-white text-gray-700 border-gray-300'}`} onClick={() => { setBahasa('indo'); setShowModal(''); }}>Indonesia</button>
                <button class={`px-4 py-2 rounded-lg font-semibold border ${bahasa() === 'en' ? 'bg-[#e1eebc] text-[#388e5c] border-[#8fcb8c]' : 'bg-white text-gray-700 border-gray-300'}`} onClick={() => { setBahasa('en'); setShowModal(''); }}>English</button>
              </div>
              <button class="px-8 py-2 rounded bg-gray-200 text-gray-700 font-semibold mt-2" onClick={() => setShowModal('')}>Batal</button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default SettingPage;
