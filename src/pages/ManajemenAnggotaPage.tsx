import { Component, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiOutlineBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople, BsPeopleFill } from 'solid-icons/bs';
import { IoSettingsOutline } from 'solid-icons/io';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri';

const avatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
];
const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

const dummyUsers = [
  {
    id: 1,
    name: 'Andi Saputra',
    avatar: getRandomAvatar(),
    email: 'andi.saputra@email.com',
    kelas: 'XII RPL 1',
    role: 'User',
    aktif: true,
    joinDate: '2024-01-10',
    dipinjam: 2,
    roleClass: 'bg-blue-100 text-blue-700',
    aktifClass: 'bg-green-100 text-green-700',
  },
  {
    id: 2,
    name: 'Rizky Hidayat',
    avatar: getRandomAvatar(),
    email: 'rizky.hidayat@email.com',
    kelas: 'XI RPL 2',
    role: 'User',
    aktif: false,
    joinDate: '2023-07-22',
    dipinjam: 0,
    roleClass: 'bg-blue-100 text-blue-700',
    aktifClass: 'bg-red-100 text-red-700',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    avatar: getRandomAvatar(),
    email: 'budi.santoso@email.com',
    kelas: 'X RPL 3',
    role: 'User',
    aktif: true,
    joinDate: '2024-03-05',
    dipinjam: 1,
    roleClass: 'bg-blue-100 text-blue-700',
    aktifClass: 'bg-green-100 text-green-700',
  },
  {
    id: 4,
    name: 'Irma Sari',
    avatar: getRandomAvatar(),
    email: 'irma.sari@email.com',
    kelas: 'XII RPL 1',
    role: 'Admin',
    aktif: true,
    joinDate: '2022-03-01',
    dipinjam: 0,
    roleClass: 'bg-yellow-100 text-yellow-700',
    aktifClass: 'bg-green-100 text-green-700',
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    avatar: getRandomAvatar(),
    email: 'dewi.lestari@email.com',
    kelas: '-',
    role: 'Admin',
    aktif: true,
    joinDate: '2022-09-15',
    dipinjam: 0,
    roleClass: 'bg-yellow-100 text-yellow-700',
    aktifClass: 'bg-green-100 text-green-700',
  },
  {
    id: 6,
    name: 'Siti Rahmawati',
    avatar: getRandomAvatar(),
    email: 'siti.rahmawati@email.com',
    kelas: '-',
    role: 'Admin',
    aktif: false,
    joinDate: '2023-01-11',
    dipinjam: 0,
    roleClass: 'bg-yellow-100 text-yellow-700',
    aktifClass: 'bg-red-100 text-red-700',
  },
];

const ManajemenAnggotaPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const location = useLocation();
  const activePath = location.pathname;
  const [openMenu, setOpenMenu] = createSignal(false);
  const [search, setSearch] = createSignal('');
  const [kelas, setKelas] = createSignal('');
  const [role, setRole] = createSignal('');

  return (
    <div class="flex min-h-screen">
      {/* Sidebar kiri */}
      <div class="hidden md:flex bg-[#6db37e] h-screen w-20 flex-col items-center py-8 z-20">
  <div class="flex flex-col items-center gap-y-10 mt-14">
    <A href="/home" class="mb-4">
      <AiOutlineHome size={28} class="text-white" />
    </A>
    <A href="/katalog" class="mb-4">
      <AiOutlineBook size={28} class="text-white" />
    </A>
    <A href="/riwayat" class="mb-4">
      <RiDocumentFileHistoryLine size={28} class="text-white" />
    </A>
    <A href="/settings" class="mb-4">
      <IoSettingsOutline size={28} class="text-white" />
    </A>
    <A href="/kelola-buku" class="mb-4">
      <BsBookmarks size={28} class="text-white" />
    </A>
    <A href="/kelola-anggota" class="mb-4">{activePath === '/kelola-anggota' ? <BsPeopleFill size={28} class="text-white" /> : <BsPeople size={28} class="text-white" />}</A>
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
              <BsBookmarks size={22} /> Kelola Buku
            </A>
            <A href="/kelola-anggota" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>{activePath === '/kelola-anggota' ? <BsPeopleFill size={22} /> : <BsPeople size={22} />} Kelola Anggota</A>
            <button class="mt-8 text-sm text-gray-500 hover:text-[#388e5c]" onClick={() => setOpenMenu(false)}>Tutup</button>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}
      {/* Main Content */}
      <div class="flex-1 p-8 pt-20 md:pt-8">
        {/* Header */}
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-3xl font-bold text-[#388e5c]">Manajemen Anggota</h1>
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
        <div class="flex flex-wrap gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search anggota"
            class="px-4 py-2 border rounded-full border-gray-300 flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
            value={search()}
            onInput={(e: InputEvent) => setSearch((e.target as HTMLInputElement).value)}
          />

          <div class="flex items-center gap-2">
            <span>Kelas</span>
            <select class="px-3 py-2 rounded border border-gray-300 bg-white text-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e]" value={kelas()} onInput={(e: InputEvent) => setKelas((e.target as HTMLSelectElement).value)}>
              <option value="">All</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <span>Role</span>
            <select class="px-3 py-2 rounded border border-gray-300 bg-white text-[#388e5c] focus:outline-none focus:ring-2 focus:ring-[#6db37e]" value={role()} onInput={e => setRole(e.currentTarget.value)}>
              <option value="">All</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        {/* Card Anggota */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyUsers
            .filter(u => (role() ? u.role === role() : true))
            .filter(u => (kelas() ? (u.role === 'User' && u.kelas.startsWith(kelas() + ' ')) : true))
            .filter(u => (search() ? u.name.toLowerCase().includes(search().toLowerCase()) : true))
            .map(u => (
              <div class="bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6 flex flex-col gap-2 min-h-[170px] transition-all duration-200 hover:shadow-2xl hover:ring-2 hover:ring-black/10">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#388e5c] text-2xl font-bold shadow">
                    <img src={`https://i.pravatar.cc/40?u=${encodeURIComponent(u.name)}`} alt={u.name} class="w-14 h-14 rounded-full object-cover" />
                  </div>
                  <div>
                    <div class="text-lg text-[#388e5c] font-semibold drop-shadow">{u.name}</div>
                    <div class="text-[#388e5c] text-sm">Buku dipinjam: {u.dipinjam}</div>
                    <div class="text-[#388e5c] text-sm">{u.role === 'Admin' ? 'Guru' : `Kelas: ${u.kelas}`}</div>
                    <div class="text-[#388e5c] text-sm">Role: {u.role}</div>
                  </div>
                </div>
                <div class="flex justify-center w-full mt-auto">
                  <A href="/kelola-anggota/detail" class="bg-gradient-to-r from-[#97cb8a] to-[#6db37e] text-white font-semibold rounded-full py-2 px-8 hover:from-[#388e5c] hover:to-[#8fcb8c] hover:shadow-lg transition-all duration-200 text-center w-full max-w-[160px] ring-1 ring-[#e1eebc]/40">Edit</A>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManajemenAnggotaPage;
