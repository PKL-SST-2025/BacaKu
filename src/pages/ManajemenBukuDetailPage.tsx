import { Component, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { FiMenu } from 'solid-icons/fi';
import { AiOutlineHome, AiOutlineBook, AiOutlineCalendar } from 'solid-icons/ai';
import { BsBookmarksFill, BsPeople, BsBook, BsBookmarks } from 'solid-icons/bs';
import { IoSettingsOutline } from 'solid-icons/io';
import { RiDocumentFileHistoryLine } from 'solid-icons/ri';

const ManajemenBukuDetailPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = createSignal(false);
  // Daftar gambar buku
  const bookCovers = [
    'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajGX7bOk3u1XHDMn3kZ6UE1tqtzNFGrFtrordlzGZ5YTT1WQEvlV0XiL11kUpRdzB8hU&usqp=CAU',
    'https://lh3.googleusercontent.com/HGtwKYxay4SUYyrY1xV1KoMM47lVgqoULcoqIs7Mq-djSfWxCTNCT5cj--h7clrauEgeEieopwfajzzoc7Z9NylfTTRWTFZzioDWGKyPxAZMvdls1qzR-iA5415ajg=e365-rj-l80-w364',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-book-cover-design-template-a279ac8786047179622597ba498de354_screen.jpg?ts=1701320480'
  ];

  // Fungsi untuk mendapatkan gambar acak
  const getRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * bookCovers.length);
    return bookCovers[randomIndex];
  };

  const [jumlahSalinan, setJumlahSalinan] = createSignal(0);
  const [coverUrl, setCoverUrl] = createSignal(getRandomCover());
  const [fileName, setFileName] = createSignal('');

  // State untuk input buku
  const [judul, setJudul] = createSignal('Matematika Kelas 7');
  const [penulis, setPenulis] = createSignal('Rina');
  const [tahun, setTahun] = createSignal('2021');
  const [genre, setGenre] = createSignal('Pelajaran');
  const [ringkasan, setRingkasan] = createSignal('Buku pelajaran matematika untuk siswa kelas 7 SMP.');

  // State popup
  const [showPopup, setShowPopup] = createSignal(false);
  const [popupMsg, setPopupMsg] = createSignal('');
  const [showModal, setShowModal] = createSignal('');

  // Dummy data buku
  const bookData = {
    title: 'Matematika Kelas 7',
    author: 'Rina',
    year: 2021,
    genre: 'Pelajaran',
    summary: 'Buku pelajaran matematika untuk siswa kelas 7 SMP.',
    status: 'Tersedia',
    publisher: 'Erlangga',
    coverUrl: getRandomCover(),
    tersedia: 12,
    terpinjam: 3,
  };

  return (
    <div class="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar kiri - Desktop */}
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
      <div class="flex-1 p-8 pt-20 md:pt-6 md:ml-20 w-full">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <h1 class="text-3xl font-bold text-[#388e5c]">Manajemen Edit Buku</h1>
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
        <hr class="border-gray-300 mb-6" />

        {/* Card: Edit Form */}
        <div class="bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-stretch transition-all duration-200 hover:shadow-2xl hover:ring-2 hover:ring-black/10">
          <div class="flex flex-col items-center justify-center h-full md:justify-center md:h-auto">
            <div class="w-[120px] h-[160px] bg-gray-200 rounded-lg shadow flex items-center justify-center">
              <img src={coverUrl() || bookData.coverUrl || ''} alt="Cover Buku" class="w-full h-full object-cover rounded-lg" />
            </div>
            {/* Input Link & Upload Cover */}
            <div class="mt-4 flex flex-col gap-2 w-[120px]">
              <input
                type="text"
                class="border rounded px-2 py-1 text-xs"
                placeholder="Tempel link gambar..."
                onInput={e => setCoverUrl((e.target as HTMLInputElement).value)}
              />
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                class="hidden"
                onChange={e => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    setFileName(file.name);
                    const reader = new FileReader();
                    reader.onload = ev => setCoverUrl(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setFileName('');
                  }
                }}
              />
              <button
                type="button"
                class="px-2 py-1 bg-[#e1eebc] text-[#388e5c] rounded text-xs font-semibold hover:bg-[#cbe7a7] transition"
                onClick={() => document.getElementById('cover-upload')?.click()}
              >
                Pilih
              </button>
              {fileName() && <span class="text-[10px] text-gray-500 truncate">{fileName()}</span>}
              <span class="text-[10px] text-gray-400">Bisa pakai link atau upload file</span>
            </div>
          </div>
          <div class="flex-1 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-semibold text-[#388e5c] flex items-center gap-2"><BsBook class="text-[#6db37e]" /> Judul Buku:</label>
              <input type="text" placeholder="Tulis judul buku disini..." class="border rounded px-3 py-2" value={judul()} onInput={e => setJudul(e.currentTarget.value)} />
              <label class="font-semibold text-[#388e5c] flex items-center gap-2"><AiOutlineBook class="text-[#6db37e]" /> Penulis:</label>
              <input type="text" placeholder="Tulis nama penulis disini..." class="border rounded px-3 py-2" value={penulis()} onInput={e => setPenulis(e.currentTarget.value)} />
              <label class="font-semibold text-[#388e5c] flex items-center gap-2"><AiOutlineCalendar class="text-[#6db37e]" /> Publikasi:</label>
              <input type="text" placeholder="Tulis tahun buku disini..." class="border rounded px-3 py-2" value={tahun()} onInput={e => setTahun(e.currentTarget.value)} />
              <label class="font-semibold text-[#388e5c] flex items-center gap-2"><BsBookmarks class="text-[#6db37e]" /> Genre:</label>
              <input type="text" placeholder="Tulis genre buku disini..." class="border rounded px-3 py-2" value={genre()} onInput={e => setGenre(e.currentTarget.value)} />
            </div>
          </div>
        </div>

        {/* Card: Ringkasan Buku */}
        <div class="bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6 mb-8">
          <span class="text-xl font-bold text-[#388e5c] block mb-2">Ringkasan Buku</span>
          <textarea placeholder="Tulis deskripsi buku disini..." class="w-full border rounded px-3 py-2 min-h-[80px]" value={ringkasan() || bookData.summary || ''} onInput={e => setRingkasan(e.currentTarget.value)} />
        </div>

        {/* Card: Salinan Buku */}
        <div class="bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div class="flex-1 flex flex-col gap-2">
            <span class="font-semibold text-[#388e5c]">Salinan buku tersisa: <span class="text-black">{bookData.tersedia}</span></span>
            <span class="font-semibold text-[#388e5c]">Salinan buku terpinjam: <span class="text-black">{bookData.terpinjam}</span></span>
          </div>
          <div class="flex items-center gap-4">
            <span class="font-semibold text-[#388e5c]">Tambahkan Salinan</span>
            <button onClick={() => setJumlahSalinan(Math.max(0, jumlahSalinan() - 1))} class="px-3 py-1 rounded bg-[#e1eebc] text-[#388e5c] text-xl">-</button>
            <span class="font-bold text-xl">{jumlahSalinan()}</span>
            <button onClick={() => setJumlahSalinan(jumlahSalinan() + 1)} class="px-3 py-1 rounded bg-[#e1eebc] text-[#388e5c] text-xl">+</button>
          </div>
        </div>
        {/* Tombol Aksi di luar box */}
        <div class="flex gap-6 mb-8 mt-8">
          <button 
            class="flex-1 bg-[#6db37e] text-white font-bold py-3 rounded-xl text-xl hover:bg-[#388e5c] transition"
            onClick={() => {
              if (!judul() || !penulis() || !tahun() || !genre() || !ringkasan()) {
                setPopupMsg('Semua data harus diisi!');
                setShowPopup(true);
              } else {
                setShowModal('konfirmasi');
              }
            }}
          >
            Update Data Buku
          </button>
          <button onClick={() => navigate(-1)} class="flex-1 bg-[#6db37e] text-white font-bold py-3 rounded-xl text-xl hover:bg-[#388e5c] transition">Kembali</button>
        </div>
      </div>
    {/* Modal Konfirmasi Update */}
    {showModal() === 'konfirmasi' && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">Anda yakin ingin update data buku?</div>
          <div class="flex gap-4 mt-2">
            <button
              class="px-6 py-2 rounded bg-[#8fcb8c] text-white font-semibold hover:bg-[#388e5c] transition"
              onClick={() => {
                setShowModal('');
                setPopupMsg('Update data buku berhasil!');
                setShowPopup(true);
              }}
            >
              Yakin
            </button>
            <button
              class="px-6 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 transition"
              onClick={() => setShowModal('')}
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    )}
    {/* Popup Modal */}
    {showPopup() && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">{popupMsg()}</div>
          <div class="flex gap-4 mt-2">
            <button
              class="px-6 py-2 rounded bg-[#8fcb8c] text-white font-semibold hover:bg-[#388e5c] transition"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default ManajemenBukuDetailPage;
