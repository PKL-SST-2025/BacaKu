import { Component, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiFillHome, AiOutlineBook, AiFillBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople } from 'solid-icons/bs';
import { IoSettingsOutline, IoSettingsSharp } from 'solid-icons/io';
import { RiDocumentFileHistoryLine, RiDocumentFileHistoryFill } from 'solid-icons/ri';

const dummyBooks = [
  { id: 1, title: 'Judul Buku 1', due: '13 Juli 2025', status: 'Hari Ini', genre: 'Novel' },
  { id: 2, title: 'Judul Buku 2', due: '14 Juli 2025', status: 'Besok', genre: 'Komik' },
  { id: 3, title: 'Judul Buku 3', due: '15 Juli 2025', status: 'Dalam 3 Hari', genre: 'Ensiklopedia' },
];

const JadwalPengembalianBukuPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const location = useLocation();
  const activePath = location.pathname;
  const [openMenu, setOpenMenu] = createSignal(false);
  const [activeFilter, setActiveFilter] = createSignal('semua');
  const [search, setSearch] = createSignal('');
  const [genre, setGenre] = createSignal('');
  const [status, setStatus] = createSignal('');
  const [minggu, setMinggu] = createSignal('Minggu Ini');

  // Genre dan status unik dari data
  const genres = Array.from(new Set(dummyBooks.map(b => b.genre)));
  const statuses = Array.from(new Set(['Dipinjam','Dikembalikan','Dipesan','Rusak','Tidak Tersedia','Tersedia']));

  // Filter buku mirip RiwayatPage
  const filteredBooks = () => dummyBooks.filter(b => {
    if (search() && !b.title.toLowerCase().includes(search().toLowerCase())) return false;
    if (genre() && b.genre !== genre()) return false;
    if (activeFilter() === 'rusak' && b.status !== 'Rusak') return false;
    if (activeFilter() === 'dikembalikan' && b.status !== 'Dikembalikan') return false;
    if (status() && b.status !== status()) return false;
    return true;
  });

  return (
    <div class="flex min-h-screen">
      {/* Sidebar kiri */}
      <div class="hidden md:flex fixed top-0 left-0 bg-[#6db37e] min-h-screen h-full w-20 flex-col items-center py-8 z-20">
        <div class="flex flex-col items-center gap-y-10 mt-14">
          <A href="/home" class="mb-4">{activePath === '/home' ? <AiFillHome size={28} class="text-white" /> : <AiOutlineHome size={28} class="text-white" />}</A>
          <A href="/katalog" class="mb-4">{activePath === '/katalog' ? <AiFillBook size={28} class="text-white" /> : <AiOutlineBook size={28} class="text-white" />}</A>
          <A href="/riwayat" class="mb-4">{activePath === '/riwayat' ? <RiDocumentFileHistoryFill size={28} class="text-white" /> : <RiDocumentFileHistoryFill size={28} class="text-white" />}</A>
          <A href="/settings" class="mb-4">{activePath === '/settings' ? <IoSettingsSharp size={28} class="text-white" /> : <IoSettingsOutline size={28} class="text-white" />}</A>
          <A href="/kelola-buku" class="mb-4"><BsBookmarks size={28} class="text-white" /></A>
          <A href="/kelola-anggota" class="mb-4"><BsPeople size={28} class="text-white" /></A>
        </div>
      </div>
      {/* Navbar atas (mobile) */}
      <div class="flex md:hidden w-full bg-[#6db37e] h-14 items-center px-4 fixed top-0 left-0 z-30">
        <button onClick={() => setOpenMenu(true)}><FiMenu size={28} class="text-white" /></button>
      </div>
      {/* Drawer menu mobile */}
      {openMenu() && (
        <div class="fixed inset-0 bg-black/80 z-30 flex">
          <div class="bg-white w-56 h-full p-6 flex flex-col gap-y-8 shadow-xl">
            <A href="/home" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>{activePath === '/home' ? <AiFillHome size={22} /> : <AiOutlineHome size={22} />} Home</A>
            <A href="/katalog" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>{activePath === '/katalog' ? <AiFillBook size={22} /> : <AiOutlineBook size={22} />} Katalog</A>
            <A href="/riwayat" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>{activePath === '/riwayat' ? <RiDocumentFileHistoryFill size={22} /> : <RiDocumentFileHistoryFill size={22} />} Riwayat</A>
            <A href="/settings" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>{activePath === '/settings' ? <IoSettingsSharp size={22} /> : <IoSettingsOutline size={22} />} Settings</A>
            <A href="/kelola-buku" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><BsBookmarks size={22} /> Kelola Buku</A>
            <A href="/kelola-anggota" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><BsPeople size={22} /> Kelola Anggota</A>
            <button class="mt-8 text-sm text-gray-500 hover:text-[#388e5c]" onClick={() => setOpenMenu(false)}>Tutup</button>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}
      {/* Main Content */}
      <div class="flex-1 p-8 pt-20 md:pt-8 md:ml-20">
        {/* Header */}
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold text-[#388e5c]">Jadwal Pengembalian Buku</h1>
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
              <span class="font-medium text-[#388e5c]">User</span>
              <img src="https://i.pravatar.cc/40" alt="User" class="rounded-full w-10 h-10" />
            </A>
          </div>
        </div>
        <hr class="border-gray-300 mb-6" />
        {/* Filter Minggu */}
        <div class="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <label class="font-semibold text-[#388e5c] mr-2">Periode:</label>
          <select
            class="px-3 py-2 rounded border border-gray-300 bg-white text-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e] w-48"
            value={minggu()}
            onInput={e => setMinggu(e.currentTarget.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Minggu Ini">Minggu Ini</option>
            <option value="Minggu Depan">Minggu Depan</option>
          </select>
        </div>
        {/* Table */}
        <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 mt-4 overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="border-b-2 border-black">
                <th class="text-left py-4 px-4 font-bold">Judul Buku</th>
                <th class="text-left py-4 px-4 font-bold">Genre</th>
                <th class="text-left py-4 px-4 font-bold">Tenggat</th>
                <th class="text-left py-4 px-4 font-bold">Status</th>
                <th class="text-left py-4 px-4 font-bold">Detail Buku</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks().map(b => (
                <tr class="border-b border-gray-200">
                  <td class="py-4 px-4">{b.title}</td>
                  <td class="py-4 px-4">{b.genre}</td>
                  <td class="py-4 px-4">{b.due}</td>
                  <td class="py-4 px-4">{b.status}</td>
                  <td class="py-4 px-4"><A href={`/riwayat/${b.id}`} class="underline text-[#388e5c]">Lihat detail</A></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalPengembalianBukuPage;
