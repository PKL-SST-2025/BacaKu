import { Component, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiOutlineBook } from 'solid-icons/ai';
import { BsBookmarks, BsPeople } from 'solid-icons/bs';
import { IoSettingsOutline } from 'solid-icons/io';
import { HiOutlineQuestionMarkCircle } from 'solid-icons/hi';
// @ts-ignore
import ApexCharts from 'solid-apexcharts';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri';
import { useNavigate } from '@solidjs/router';

const ProfilePage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;
  const [openMenu, setOpenMenu] = createSignal(false);

  // Dummy data
  const user = {
    name: 'User XIRPL',
    avatar: 'https://i.pravatar.cc/40',
  };
  const stats = {
    dipinjam: 3,
    hariAktif: 4,
    selesai: 5,
  };
  const achievements = [
    { name: 'Achievement 1', progress: 0, total: 10 },
    { name: 'Achievement 2', progress: 0, total: 10 },
  ];
  const books = [
    { title: 'Buku 1', author: 'Penulis A' },
    { title: 'Buku 2', author: 'Penulis B' },
  ];

  return (
    <div class="flex min-h-screen bg-[#f4f4f4]">
      {/* Sidebar Desktop */}
      <div class="hidden md:flex fixed top-0 left-0 bg-[#6db37e] min-h-screen h-full w-20 flex-col items-center py-8 z-20">
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
        <div class="fixed inset-0 bg-black/80 z-40 md:hidden flex">
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
            <A href="/kelola-anggota" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}>
              <BsPeople size={22} /> Kelola Anggota
            </A>
            <button class="mt-8 text-sm text-gray-500 hover:text-[#388e5c]" onClick={() => setOpenMenu(false)}>Tutup</button>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <div class="flex-1 md:ml-20 p-4 pt-20 md:pt-8 flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div class="flex items-center justify-between mb-6">
          <span class="text-3xl font-bold text-[#388e5c]">Profile Saya</span>
          <div class="flex items-center gap-2">
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
            <div class={`flex items-center gap-2 px-4 py-2 rounded-full bg-[#6db37e] text-white font-semibold`}>
              <img src={user.avatar} alt="Admin" class="rounded-full w-9 h-9 object-cover border-2 border-white" />
              Admin
            </div>
          </div>
        </div>
        <hr class="border-gray-300 mb-6" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kiri */}
          <div>
            <div class="flex items-center gap-4 mb-4">
              <img src={user.avatar} alt="User" class="rounded-full w-20 h-20 object-cover border-4 border-[#6db37e] shadow-lg ring-2 ring-[#e1eebc]/80" />
              <span class="text-3xl font-semibold">{user.name}</span>
            </div>
            <div class="mt-2 mb-6">
              <span class="text-xl font-bold">Statistik peminjaman</span>
              <div class="mt-2 p-5 rounded-2xl bg-gradient-to-br from-[#f6fff9]/90 to-[#e7f6ec]/90 border border-[#e1eebc] shadow-lg backdrop-blur-md flex gap-4 justify-between">
                <div class="flex flex-col items-center">
                  <span class="bg-[#6db37e]/90 text-white rounded-xl px-7 py-3 text-2xl font-bold mb-1 shadow">{stats.dipinjam}</span>
                  <span class="font-semibold text-[#388e5c]">Dipinjam</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="bg-[#6db37e]/90 text-white rounded-xl px-7 py-3 text-2xl font-bold mb-1 shadow">{stats.hariAktif}</span>
                  <span class="font-semibold text-[#388e5c]">Hari aktif</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="bg-[#6db37e]/90 text-white rounded-xl px-7 py-3 text-2xl font-bold mb-1 shadow">{stats.selesai}</span>
                  <span class="font-semibold text-[#388e5c]">Buku selesai</span>
                </div>
              </div>
            </div>
            <div>
              <span class="text-xl font-bold">Achievement</span>
              <div class="mt-2 flex flex-col gap-3">
                {achievements.map((a) => (
                  <div class="bg-gradient-to-br from-[#f6fff9]/90 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md flex items-center p-3 gap-4">
                    <div class="w-14 h-14 bg-white rounded-xl flex-shrink-0 shadow" />
                    <div class="flex-1">
                      <span class="font-semibold text-lg text-[#388e5c]">{a.name}</span>
                      <div class="flex items-center gap-2 mt-1">
                        <div class="flex-1 bg-[#bfe3c8] h-2 rounded-full overflow-hidden">
                          <div class="bg-[#6db37e] h-2 rounded-full" style={{ width: `${(a.progress / a.total) * 100}%` }}></div>
                        </div>
                        <span class="text-xs text-gray-500">{a.progress}/{a.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Kanan */}
          <div class="flex flex-col gap-8">
            <div>
              <span class="text-xl font-bold">Riwayat buku dipinjam</span>
              <div class="mt-2 bg-gradient-to-br from-[#f6fff9]/90 to-[#8fcb8c]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-4">
                {books.map((book) => (
                  <div class="flex items-center gap-4 mb-3">
                    <div class="w-14 h-14 bg-white rounded-xl shadow" />
                    <div class="flex flex-col">
                      <span class="text-[#388e5c] font-semibold">{book.title}</span>
                      <span class="text-[#6db37e] text-sm">By: {book.author}</span>
                    </div>
                  </div>
                ))}
                <button class="w-full bg-gradient-to-r from-[#8fcb8c] to-[#6db37e] rounded-lg py-2 mt-2 font-bold text-white hover:brightness-95 hover:scale-[1.01] transition" onClick={() => navigate('/riwayat')}>Lihat semua</button>
              </div>
            </div>
            <div>
              <span class="text-xl font-bold text">Riwayat peminjaman per bulan</span>
              <div class="mt-2 bg-gradient-to-br from-[#f6fff9]/90 to-[#8fcb8c]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-7 flex flex-col items-center justify-center min-h-[260px] w-full">
                {/* SVG Bar Chart modern ala Chart.js */}
                {(() => {
                  const barData = [4, 2, 1, 1, 3, 5, 4];
                  const barLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
                  const colors = Array(barData.length).fill('#fff');
                  const strokeColors = Array(barData.length).fill('#388e5c');
                  const maxVal = Math.max(...barData);
                  const chartHeight = 180;
                  const chartWidth = 520;
                  const yTicks = 5;
                  const barWidth = 28;
                  const gap = (chartWidth - barData.length * barWidth) / (barData.length + 1);
                  // Legend
                  return (
                    <>
                      <div class="flex justify-center items-center mb-2">
                        <div class="flex items-center">
                          <div class="mr-2 rounded" style={{width:'24px',height:'10px',background:'#fff',border:'2px solid #388e5c'}}></div>
                          <span class="text-[#388e5c] text-sm font-semibold">Buku yang dipinjam</span>
                        </div>
                      </div>
                      <svg width={chartWidth} height={chartHeight+40}>
                        {/* Grid Y */}
                        {[...Array(yTicks+1)].map((_,i) => {
                          const y = 20 + (chartHeight-20) * i / yTicks;
                          return <line x1={40} y1={y} x2={chartWidth-10} y2={y} stroke="#eee" stroke-width="1" />
                        })}
                        {/* Y axis labels */}
                        {[...Array(yTicks+1)].map((_,i) => {
                          const val = Math.round((maxVal * (yTicks-i))/yTicks);
                          const y = 20 + (chartHeight-20) * i / yTicks + 4;
                          return <text x={30} y={y} font-size="12" fill="#E1EEBC" text-anchor="end">{val}</text>
                        })}
                        {/* Bars */}
                        {barData.map((val,i) => {
                          const x = 40 + gap + i*(barWidth+gap);
                          const h = (val/maxVal)*(chartHeight-20);
                          return (
                            <g>
                              <rect x={x} y={chartHeight-h} width={barWidth} height={h} fill={colors[i]} stroke={strokeColors[i]} stroke-width="2" rx="5" />
                              {/* Value di atas bar */}
                              <text x={x+barWidth/2} y={chartHeight-h-8} font-size="12" fill="#388e5c" font-weight="bold" text-anchor="middle">{val}</text>
                              {/* Label bawah */}
                              <text x={x+barWidth/2} y={chartHeight+18} font-size="13" fill="#388e5c" text-anchor="middle">{barLabels[i]}</text>
                            </g>
                          );
                        })}
                      </svg>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
