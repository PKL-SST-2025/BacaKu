import { AiOutlineHome, AiOutlineBook } from 'solid-icons/ai';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri';
import { IoSettingsOutline } from 'solid-icons/io';
import { BsBookmarksFill, BsPeople } from 'solid-icons/bs';
import { FiMenu } from 'solid-icons/fi';
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

const bookCovers = [
  'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajGX7bOk3u1XHDMn3kZ6UE1tqtzNFGrFtrordlzGZ5YTT1WQEvlV0XiL11kUpRdzB8hU&usqp=CAU',
  'https://lh3.googleusercontent.com/HGtwKYxay4SUYyrY1xV1KoMM47lVgqoULcoqIs7Mq-djSfWxCTNCT5cj--h7clrauEgeEieopwfajzzoc7Z9NylfTTRWTFZzioDWGKyPxAZMvdls1qzR-iA5415ajg=e365-rj-l80-w364',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-book-cover-design-template-a279ac8786047179622597ba498de354_screen.jpg?ts=1701320480'
];
const getRandomCover = () => {
  const randomIndex = Math.floor(Math.random() * bookCovers.length);
  return bookCovers[randomIndex];
};

const dummyBooks = [
  {
    id: 1,
    title: 'Matematika Kelas 7',
    author: 'Rina',
    status: 'Tersedia',
    genre: 'Pelajaran',
    publisher: 'Erlangga',
    year: 2021,
    summary: 'Buku pelajaran matematika untuk siswa kelas 7 SMP.',
    statusClass: 'bg-[#7bc47f] text-white',
    img: getRandomCover(),
  },
  {
    id: 2,
    title: 'IPA Terpadu',
    author: 'Dedi',
    status: 'Dipinjam',
    genre: 'Pelajaran',
    publisher: 'Yudhistira',
    year: 2020,
    summary: 'Buku pelajaran IPA Terpadu untuk SMP.',
    statusClass: 'bg-yellow-100 text-yellow-700',
    img: getRandomCover(),
  },
  {
    id: 3,
    title: 'Kisah Nusantara',
    author: 'Sari',
    status: 'Tersedia',
    genre: 'Cerita',
    publisher: 'Gramedia',
    year: 2018,
    summary: 'Kumpulan cerita rakyat dari berbagai daerah di Indonesia.',
    statusClass: 'bg-[#7bc47f] text-white',
    img: getRandomCover(),
  },
  {
    id: 4,
    title: 'Ensiklopedia Hewan',
    author: 'Joko',
    status: 'Rusak',
    genre: 'Ensiklopedia',
    publisher: 'Bintang Ilmu',
    year: 2017,
    summary: 'Ensiklopedia lengkap tentang dunia hewan.',
    statusClass: 'bg-red-100 text-red-600',
    img: getRandomCover(),
  },
  {
    id: 5,
    title: 'Komik Sains Seru',
    author: 'Dian',
    status: 'Tidak Tersedia',
    genre: 'Komik',
    publisher: 'Mizan',
    year: 2019,
    summary: 'Komik edukasi sains untuk anak-anak.',
    statusClass: 'bg-[#757575] text-white',
    img: getRandomCover(),
  },
  {
    id: 6,
    title: 'Bahasa Indonesia',
    author: 'Aris',
    status: 'Dikembalikan',
    genre: 'Pelajaran',
    publisher: 'Erlangga',
    year: 2022,
    summary: 'Buku pelajaran Bahasa Indonesia untuk SMP.',
    statusClass: 'bg-[#b3b3b3] text-white',
    img: getRandomCover(),
  },
  {
    id: 7,
    title: 'Cerita Petualangan Si Kancil',
    author: 'Nana',
    status: 'Tersedia',
    genre: 'Cerita',
    publisher: 'Gramedia',
    year: 2016,
    summary: 'Cerita petualangan hewan cerdik Si Kancil.',
    statusClass: 'bg-[#7bc47f] text-white',
    img: getRandomCover(),
  },
  {
    id: 8,
    title: 'Pendidikan Pancasila',
    author: 'Yoga',
    status: 'Dipinjam',
    genre: 'Pelajaran',
    publisher: 'Yudhistira',
    year: 2021,
    summary: 'Buku Pendidikan Pancasila dan Kewarganegaraan.',
    statusClass: 'bg-yellow-100 text-yellow-700',
    img: getRandomCover(),
  },
  {
    id: 9,
    title: 'Atlas Dunia',
    author: 'Lilis',
    status: 'Tersedia',
    genre: 'Ensiklopedia',
    publisher: 'Bintang Ilmu',
    year: 2015,
    summary: 'Atlas lengkap peta dunia untuk pelajar.',
    statusClass: 'bg-[#7bc47f] text-white',
    img: getRandomCover(),
  },
  {
    id: 10,
    title: 'Komik Detektif Sekolah',
    author: 'Fajar',
    status: 'Dipesan',
    genre: 'Komik',
    publisher: 'Mizan',
    year: 2020,
    summary: 'Komik detektif seru di lingkungan sekolah.',
    statusClass: 'bg-blue-100 text-blue-700',
    img: getRandomCover(),
  },
];

const ManajemenBukuPage = () => {
  // Sinyal dan state utama
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const [openMenu, setOpenMenu] = createSignal(false);
  const [activeFilter, setActiveFilter] = createSignal('semua');
  const [search, setSearch] = createSignal('');
  const [genre, setGenre] = createSignal('');
  const [status, setStatus] = createSignal('');

  // Genre dan status unik dari dummyBooks
  const genres = Array.from(new Set(dummyBooks.map(b => b.genre)));
  const statuses = Array.from(new Set(dummyBooks.map(b => b.status)));

  // Filter utama buku
  const filteredBooks = () => dummyBooks.filter(b => {
    // Filter search
    if (search() && !b.title.toLowerCase().includes(search().toLowerCase()) && !b.author.toLowerCase().includes(search().toLowerCase())) return false;
    // Filter genre
    if (genre() && b.genre !== genre()) return false;
    // Tombol filter atas
    if (activeFilter() === 'rusak') {
      return b.status === 'Rusak';
    }
    if (activeFilter() === 'dipinjam') {
      return b.status === 'Dipinjam';
    }
    if (activeFilter() === 'tersedia') {
      return b.status === 'Tersedia';
    }
    // Filter status dropdown
    if (status() && b.status !== status()) return false;
    return true;
  });

  return (
    <div class="flex min-h-screen">
      {/* Sidebar kiri */}
      <div class="hidden md:flex fixed top-0 left-0 bg-[#6db37e] min-h-screen h-full w-20 flex-col items-center py-8 z-20">
        <div class="flex flex-col items-center gap-y-10 mt-14">
          <A href="/home" class="mb-4"><AiOutlineHome size={28} class="text-white" /></A>
          <A href="/katalog" class="mb-4"><AiOutlineBook size={28} class="text-white" /></A>
          <A href="/riwayat" class="mb-4"><RiDocumentFileHistoryLine size={28} class="text-white" /></A>
          <A href="/settings" class="mb-4"><IoSettingsOutline size={28} class="text-white" /></A>
          <A href="/kelola-buku" class="mb-4"><BsBookmarksFill size={28} class="text-white" /></A>
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
              <AiOutlineHome size={22} /> Home
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
              <BsBookmarksFill size={22} /> Kelola Buku
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
          <h1 class="text-3xl font-bold text-[#388e5c]">Manajemen Buku</h1>
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
            class={`px-8 py-2 rounded-full font-semibold transition ${activeFilter() === 'semua' ? 'bg-[#388e5c] text-white shadow' : 'bg-[#6db37e] text-[#E1EEBC]'}`}
            onClick={() => setActiveFilter('semua')}
          >
            Semua Buku
          </button>
          <button
            class={`px-8 py-2 rounded-full font-semibold transition ${activeFilter() === 'dipinjam' ? 'bg-[#388e5c] text-white shadow' : 'bg-[#6db37e] text-[#E1EEBC]'}`}
            onClick={() => setActiveFilter('dipinjam')}
          >
            Dipinjam
          </button>
          <button
            class={`px-8 py-2 rounded-full font-semibold transition ${activeFilter() === 'tersedia' ? 'bg-[#388e5c] text-white shadow' : 'bg-[#6db37e] text-[#E1EEBC]'}`}
            onClick={() => setActiveFilter('tersedia')}
          >
            Tersedia
          </button>
          <button
            class={`px-8 py-2 rounded-full font-semibold transition ${activeFilter() === 'rusak' ? 'bg-[#388e5c] text-white shadow' : 'bg-[#6db37e] text-[#E1EEBC]'}`}
            onClick={() => setActiveFilter('rusak')}
          >
            Rusak
          </button>
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
            class="px-3 py-2 rounded border border-gray-300 bg-white text-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e] max-w-xs w-full sm:w-auto"
            value={status()}
            onInput={e => setStatus(e.currentTarget.value)}
          >
            <option value="">Semua Status</option>
            {statuses.map(s => (
              <option value={s}>{s}</option>
            ))}
          </select>
        </div>
        {/* Grid Card Manajemen Buku */}
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
                <A href={`/kelola-buku/${b.id}`}
                  class="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 text-white font-semibold text-center shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                >
                  Edit
                </A>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManajemenBukuPage;
