import { Component, createSignal, createEffect, onMount } from 'solid-js';
import '../aggrid-custom.css';
import { A, useLocation } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiFillHome, AiOutlineBook, AiFillBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople } from 'solid-icons/bs';
import { IoSettingsOutline, IoSettingsSharp } from 'solid-icons/io';
import { RiDocumentFileHistoryLine, RiDocumentFileHistoryFill } from 'solid-icons/ri';

const bookCovers = [
  'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajGX7bOk3u1XHDMn3kZ6UE1tqtzNFGrFtrordlzGZ5YTT1WQEvlV0XiL11kUpRdzB8hU&usqp=CAU',
  'https://lh3.googleusercontent.com/HGtwKYxay4SUYyrY1xV1KoMM47lVgqoULcoqIs7Mq-djSfWxCTNCT5cj--h7clrauEgeEieopwfajzzoc7Z9NylfTTRWTFZzioDWGKyPxAZMvdls1qzR-iA5415ajg=e365-rj-l80-w364',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-book-cover-design-template-a279ac8786047179622597ba498de354_screen.jpg?ts=1701320480'
];
const avatarUrls = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/78.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
];
function getRandomCover() {
  return bookCovers[Math.floor(Math.random() * bookCovers.length)];
}
function getRandomAvatar() {
  return avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
}
const dummyBooks = [
  {
    id: 1,
    title: 'Matematika Kelas 7',
    borrower: 'Andi Pratama',
    avatar: getRandomAvatar(),
    borrowDate: '2025-07-06',
    due: '2025-07-13',
    status: 'Hari Ini',
    genre: 'Pelajaran',
    img: getRandomCover(),
  },
  {
    id: 2,
    title: 'IPA Terpadu',
    borrower: 'Siti Rahma',
    avatar: getRandomAvatar(),
    borrowDate: '2025-07-07',
    due: '2025-07-14',
    status: 'Besok',
    genre: 'Pelajaran',
    img: getRandomCover(),
  },
  {
    id: 3,
    title: 'Kisah Nusantara',
    borrower: 'Budi Santoso',
    avatar: getRandomAvatar(),
    borrowDate: '2025-07-01',
    due: '2025-07-10',
    status: 'Lewat Tempo',
    genre: 'Cerita',
    img: getRandomCover(),
  },
  {
    id: 4,
    title: 'Komik Sains Seru',
    borrower: 'Dian Putri',
    avatar: getRandomAvatar(),
    borrowDate: '2025-07-10',
    due: '2025-07-15',
    status: 'Dalam 2 Hari',
    genre: 'Komik',
    img: getRandomCover(),
  },
  {
    id: 5,
    title: 'Bahasa Indonesia',
    borrower: 'Aris Nugroho',
    avatar: getRandomAvatar(),
    borrowDate: '2025-07-03',
    due: '2025-07-14',
    status: 'Besok',
    genre: 'Pelajaran',
    img: getRandomCover(),
  },
  {
    id: 6,
    title: 'Atlas Dunia',
    borrower: 'Lilis Sari',
    avatar: getRandomAvatar(),
    borrowDate: '2025-07-08',
    due: '2025-07-16',
    status: 'Dalam 3 Hari',
    genre: 'Ensiklopedia',
    img: getRandomCover(),
  },
];

// Deklarasi agar TypeScript mengenali window.agGrid dan __agGridInstance pada gridRef
declare global {
  interface Window {
    agGrid: any;
  }
  interface HTMLDivElement {
    __agGridInstance?: any;
  }
}

const JadwalPengembalianBukuPage: Component = () => {
  let gridRef: HTMLDivElement | undefined;

  // Definisi kolom ag-Grid
  const columnDefs = [
    { headerName: 'Judul Buku', field: 'title', flex: 1, minWidth: 160 },
    { headerName: 'Peminjam', field: 'borrower', flex: 1, minWidth: 160 },
    { headerName: 'Tanggal Pinjam', field: 'borrowDate', flex: 1, minWidth: 160 },
    { headerName: 'Tanggal Jatuh Tempo', field: 'due', flex: 1, minWidth: 160 },
    {
      headerName: 'Status',
      field: 'status',
      flex: 1,
      minWidth: 160,
      cellRenderer: (params: any) => {
        if (params.value === 'Hari Ini') return `<span class='bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold'>Jatuh tempo hari ini</span>`;
        if (params.value === 'Besok') return `<span class='bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold'>Jatuh tempo besok</span>`;
        if (params.value === 'Lewat Tempo') {
          // Hitung hari keterlambatan
          const dueDate = new Date(params.data.due);
          const now = new Date();
          const daysLate = Math.abs(Math.floor((now.getTime() - dueDate.getTime()) / (1000*60*60*24)));
          return `<span class='bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-semibold'>Terlambat ${daysLate} hari</span>`;
        }
        if (typeof params.value === 'string' && params.value.startsWith('Dalam')) {
          return `<span class='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold'>Jatuh tempo ${params.value.replace('Dalam ', 'dalam ')}</span>`;
        }
        return params.value;
      }
    },
    {
      headerName: 'Detail',
      field: 'id',
      flex: 1,
      minWidth: 160,
      cellRenderer: (params: any) => `<a href='/riwayat/${params.value}' class='inline-block px-4 py-1 rounded bg-[#388e5c] text-white text-xs font-semibold hover:bg-[#219150] transition'>Detail</a>`
    }
  ];

  // Data hasil filter untuk ag-Grid
  const getFilteredBooks = () => filteredBooks();

  let gridInstance: any = null;

  // Inisialisasi ag-Grid saat mount
  onMount(() => {
    if (gridRef && window.agGrid && window.agGrid.Grid) {
      const gridOptions = {
        columnDefs,
        rowData: getFilteredBooks(),
        defaultColDef: { resizable: true, sortable: true },
        domLayout: 'autoHeight',
        suppressRowClickSelection: true,
        headerHeight: 40,
        rowHeight: 38,
      };
      gridInstance = new window.agGrid.Grid(gridRef, gridOptions);
      gridRef.__agGridInstance = gridInstance;
    }
  }); // tambahkan kurung kurawal penutup di sini

  // Update grid data saja jika filter/search berubah
  createEffect(() => {
    if (gridRef && gridRef.__agGridInstance && gridRef.__agGridInstance.api) {
      gridRef.__agGridInstance.api.setRowData(getFilteredBooks());
    }
  });
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
    <div class="flex min-h-screen overflow-x-hidden">
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
        <div class="mb-4 mt-auto">
          <img src="/LOGO.svg" alt="Logo" class="w-10 h-10 object-contain mx-auto filter invert" style="filter: brightness(0) invert(1);" />
        </div>
      </div>
       {/* Navbar atas (mobile) */}
       <div class="flex md:hidden w-full bg-[#6db37e] h-14 items-center fixed top-0 left-0 z-30">
         <div class="flex items-center w-full justify-between">
           <button onClick={() => setOpenMenu(true)} class="z-10 flex-shrink-0 pl-4">
             <FiMenu size={28} class="text-white" />
           </button>
           <img src="/LOGO_BacaKu.svg" alt="Logo BacaKu" class="h-8 object-contain filter invert mx-auto" style="filter: brightness(0) invert(1);" />
           <div class="flex-shrink-0 mr-11">
             {/* Profil user jika ingin tetap di kanan, bisa tambahkan di sini */}
           </div>
         </div>
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
      <div class="flex-1 p-8 pt-20 md:pt-8 md:ml-20 max-w-full overflow-x-hidden">
        {/* Header */}
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold text-[#388e5c]">Jadwal Pengembalian Buku</h1>
          <div class="flex items-center space-x-2 ml-6 pr-8">
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
        {/* Table diganti ag-Grid */}
        <div
          ref={gridRef}
          class="ag-theme-alpine"
          style="width:100%;min-height:350px;height:auto;"
        ></div>
      </div>
    </div>
  );
};

export default JadwalPengembalianBukuPage;
