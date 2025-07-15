import { Component, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiFillHome, AiOutlineBook, AiFillBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople, BsBook } from 'solid-icons/bs';
import { IoSettingsOutline, IoSettingsSharp } from 'solid-icons/io';
import { RiDocumentFileHistoryLine, RiDocumentFileHistoryFill } from 'solid-icons/ri';

const [role] = createSignal<'admin' | 'user'>('user');

const KatalogPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const location = useLocation();
  const activePath = location.pathname;
  const [openMenu, setOpenMenu] = createSignal(false);
  const [activeFilter, setActiveFilter] = createSignal('semua');
  const [search, setSearch] = createSignal('');
  const [genre, setGenre] = createSignal('');
  const [status, setStatus] = createSignal('');

  // Data buku
  const books = [
  { id: 1, title: 'Matematika Kelas 7', author: 'Rina', status: 'Tersedia', genre: 'Pelajaran', publisher: 'Erlangga', year: 2021 },
  { id: 2, title: 'IPA Terpadu', author: 'Dedi', status: 'Dipinjam', genre: 'Pelajaran', publisher: 'Yudhistira', year: 2020 },
  { id: 3, title: 'Kisah Nusantara', author: 'Sari', status: 'Tersedia', genre: 'Cerita', publisher: 'Gramedia', year: 2018 },
  { id: 4, title: 'Ensiklopedia Hewan', author: 'Joko', status: 'Rusak', genre: 'Ensiklopedia', publisher: 'Bintang Ilmu', year: 2017 },
  { id: 5, title: 'Komik Sains Seru', author: 'Dian', status: 'Tidak Tersedia', genre: 'Komik', publisher: 'Mizan', year: 2019 },
  { id: 6, title: 'Bahasa Indonesia', author: 'Aris', status: 'Dikembalikan', genre: 'Pelajaran', publisher: 'Erlangga', year: 2022 },
  { id: 7, title: 'Cerita Petualangan Si Kancil', author: 'Nana', status: 'Tersedia', genre: 'Cerita', publisher: 'Gramedia', year: 2016 },
  { id: 8, title: 'Pendidikan Pancasila', author: 'Yoga', status: 'Dipinjam', genre: 'Pelajaran', publisher: 'Yudhistira', year: 2021 },
  { id: 9, title: 'Atlas Dunia', author: 'Lilis', status: 'Tersedia', genre: 'Ensiklopedia', publisher: 'Bintang Ilmu', year: 2015 },
  { id: 10, title: 'Komik Detektif Sekolah', author: 'Fajar', status: 'Tersedia', genre: 'Komik', publisher: 'Mizan', year: 2020 },
];

  // Genre unik
  const genres = Array.from(new Set(books.map(b => b.genre)));
  // Status unik
  const statuses = Array.from(new Set(books.map(b => b.status)));

  // Filter buku
  const filteredBooks = () => books.filter(b => {
    // Filter search
    if (search() && !b.title.toLowerCase().includes(search().toLowerCase()) && !b.author.toLowerCase().includes(search().toLowerCase())) return false;
    // Filter genre
    if (genre() && b.genre !== genre()) return false;
    // Filter tombol atas
    if (activeFilter() === 'rusak') {
      return b.status === 'Rusak'; // hanya tampil buku rusak, abaikan filter status dropdown
    }
    // Filter status (jika bukan filter rusak)
    if (status() && b.status !== status()) return false;
    return true;
  });

  return (
    <div class="flex min-h-screen">
      {/* Sidebar kiri */}
      <div class="hidden md:flex fixed top-0 left-0 bg-[#6db37e] min-h-screen h-full w-20 flex-col items-center py-8 z-20">
        <div class="flex flex-col items-center gap-y-10 mt-14">
          <A href="/home" class="mb-4"><AiOutlineHome size={28} class="text-white" /></A>
          <A href="/katalog" class="mb-4"><AiFillBook size={28} class="text-white" /></A>
          <A href="/riwayat" class="mb-4"><RiDocumentFileHistoryLine size={28} class="text-white" /></A>
          <A href="/settings" class="mb-4"><IoSettingsOutline size={28} class="text-white" /></A>
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
        <div class="fixed inset-0 bg-black/80 z-30 flex">
          <div class="bg-white w-56 h-full p-6 flex flex-col gap-y-8 shadow-xl">
            <A href="/home" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              {activePath === '/home' ? <AiFillHome size={22} /> : <AiOutlineHome size={22} />} Home
            </A>
            <A href="/katalog" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              {activePath === '/katalog' ? <AiFillBook size={22} /> : <AiOutlineBook size={22} />} Katalog
            </A>
            <A href="/riwayat" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              {activePath === '/riwayat' ? <RiDocumentFileHistoryFill size={22} /> : <RiDocumentFileHistoryLine size={22} />} Riwayat
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
      <div class="flex-1 md:ml-20 p-8 pt-20 md:pt-8">
        {/* Header */}
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold text-[#388e5c]">Katalog Buku</h1>
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
        <hr class="border-gray-300 mb-6" />
        {/* Filter & Search */}
        <div class="flex flex-wrap gap-4 mb-6">
          <button
            class={`px-8 py-2 rounded-full font-semibold transition ${activeFilter() === 'semua' ? (status() && status() !== '' ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'bg-[#388e5c] text-white shadow') : 'bg-[#6db37e] text-[#E1EEBC]'} ${status() && status() !== '' ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => setActiveFilter('semua')}
            disabled={!!status() && status() !== ''}
          >
            Semua Buku
          </button>
          <button
            class={`px-8 py-2 rounded-full font-semibold transition ${activeFilter() === 'rusak' ? 'bg-[#388e5c] text-white shadow' : (status() && status() !== '' ? 'bg-gray-300 text-gray-400 opacity-50 cursor-not-allowed' : 'bg-[#6db37e] text-[#E1EEBC]')}`}
            onClick={() => {
              if (!(status() && status() !== '')) setActiveFilter('rusak');
            }}
            disabled={!!status()}
          >
            Rusak
          </button>
          <A href="/riwayat" class={`px-8 py-2 rounded-full font-semibold transition bg-[#6db37e] text-[#E1EEBC] hover:bg-[#388e5c] hover:text-white`}>Riwayat</A>
          <A href="/jadwal-pengembalian-buku" class={`px-8 py-2 rounded-full font-semibold transition bg-[#6db37e] text-[#E1EEBC] hover:bg-[#388e5c] hover:text-white`}>Jadwal Pengembalian</A>
        </div>
        <div class="flex items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari buku atau penulis"
            class="px-4 py-2 border rounded-full border border-gray-300 flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
            value={search()}
            onInput={e => setSearch(e.currentTarget.value)}
          />
          <select
            class="px-3 py-2 rounded border border-gray-300 bg-white text-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e] max-w-xs w-full sm:w-auto"
            value={genre()}
            onInput={e => setGenre(e.currentTarget.value)}
          >
            <option value="">Semua Genre</option>
            {genres.map(g => (
              <option value={g}>{g}</option>
            ))}
          </select>
          <select
            class={`px-3 py-2 rounded border border-gray-300 bg-white text-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e] max-w-xs w-full sm:w-auto ${activeFilter() === 'rusak' ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
            value={status()}
            onInput={e => setStatus(e.currentTarget.value)}
            disabled={activeFilter() === 'rusak'}
          >
            <option value="">Semua Status</option>
            {statuses.map(s => (
              <option value={s} disabled={activeFilter() === 'rusak' && s === 'Rusak'}>{s}</option>
            ))}
          </select>
        </div>
        {/* Grid Card Katalog Buku */}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {filteredBooks().length === 0 ? (
            <div class="col-span-full text-center py-12 text-gray-400 text-lg">Tidak ada buku ditemukan</div>
          ) : (
            filteredBooks().map(b => (
              <div
                class="p-6 bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col gap-3"
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-lg font-bold text-[#388e5c] flex-1 truncate">{b.title}</span>
                  {/* Status badge */}
                  <span class={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                    ${b.status === 'Tersedia' ? 'bg-[#e6fbee] text-[#27ae60]' :
                      b.status === 'Dipinjam' ? 'bg-yellow-100 text-yellow-700' :
                      b.status === 'Dipesan' ? 'bg-blue-100 text-blue-700' :
                      b.status === 'Rusak' ? 'bg-red-100 text-red-600' :
                      'bg-gray-200 text-gray-500'}`}>{b.status}</span>
                </div>
                <div class="text-sm text-gray-700 mb-1">Penulis: <span class="font-medium">{b.author}</span></div>
                <div class="flex-1"></div>
                <A href={`/katalog/${b.id}`}
                  class="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 text-white font-semibold text-center shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                >
                  Detail
                </A>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KatalogPage;
