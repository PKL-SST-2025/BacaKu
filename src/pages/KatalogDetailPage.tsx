import { Component, createSignal } from 'solid-js';
import { A, useParams, useNavigate } from '@solidjs/router';
import { FiMenu, FiArrowLeft } from 'solid-icons/fi';
import { AiOutlineHome, AiFillHome, AiOutlineBook, AiFillBook, AiOutlineCalendar } from 'solid-icons/ai';
import { BsBookmarks, BsPeople, BsBook } from 'solid-icons/bs';
import { IoSettingsOutline, IoSettingsSharp } from 'solid-icons/io';
import { RiDocumentFileHistoryLine, RiDocumentFileHistoryFill } from 'solid-icons/ri';

const KatalogDetailPage: Component = () => {
  const [showNotifModal, setShowNotifModal] = createSignal(false);
  const params = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = createSignal(false);
  const [pinjamSekarang, setPinjamSekarang] = createSignal(false);
  const [pesanNanti, setPesanNanti] = createSignal(false);
  const [tanggalPesan, setTanggalPesan] = createSignal('');
  // Modal state
  const [showModal, setShowModal] = createSignal('');

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

  // Data buku dummy (samakan dengan katalog)
const books = [
  { id: 1, title: 'Matematika Kelas 7', author: 'Rina', status: 'Tersedia', genre: 'Pelajaran', publisher: 'Erlangga', year: 2021, summary: 'Buku pelajaran matematika untuk siswa kelas 7 SMP.' },
  { id: 2, title: 'IPA Terpadu', author: 'Dedi', status: 'Dipinjam', genre: 'Pelajaran', publisher: 'Yudhistira', year: 2020, summary: 'Buku pelajaran IPA Terpadu untuk SMP.' },
  { id: 3, title: 'Kisah Nusantara', author: 'Sari', status: 'Tersedia', genre: 'Cerita', publisher: 'Gramedia', year: 2018, summary: 'Kumpulan cerita rakyat dari berbagai daerah di Indonesia.' },
  { id: 4, title: 'Ensiklopedia Hewan', author: 'Joko', status: 'Rusak', genre: 'Ensiklopedia', publisher: 'Bintang Ilmu', year: 2017, summary: 'Ensiklopedia lengkap tentang dunia hewan.' },
  { id: 5, title: 'Komik Sains Seru', author: 'Dian', status: 'Tidak Tersedia', genre: 'Komik', publisher: 'Mizan', year: 2019, summary: 'Komik edukasi sains untuk anak-anak.' },
  { id: 6, title: 'Bahasa Indonesia', author: 'Aris', status: 'Dikembalikan', genre: 'Pelajaran', publisher: 'Erlangga', year: 2022, summary: 'Buku pelajaran Bahasa Indonesia untuk SMP.' },
  { id: 7, title: 'Cerita Petualangan Si Kancil', author: 'Nana', status: 'Tersedia', genre: 'Cerita', publisher: 'Gramedia', year: 2016, summary: 'Cerita petualangan hewan cerdik Si Kancil.' },
  { id: 8, title: 'Pendidikan Pancasila', author: 'Yoga', status: 'Dipinjam', genre: 'Pelajaran', publisher: 'Yudhistira', year: 2021, summary: 'Buku Pendidikan Pancasila dan Kewarganegaraan.' },
  { id: 9, title: 'Atlas Dunia', author: 'Lilis', status: 'Tersedia', genre: 'Ensiklopedia', publisher: 'Bintang Ilmu', year: 2015, summary: 'Atlas lengkap peta dunia untuk pelajar.' },
  { id: 10, title: 'Komik Detektif Sekolah', author: 'Fajar', status: 'Tersedia', genre: 'Komik', publisher: 'Mizan', year: 2020, summary: 'Komik detektif seru di lingkungan sekolah.' },
];

const book = books.find(b => String(b.id) === params.id);

if (!book) {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h2 class="text-2xl font-bold text-red-600 mb-4">Buku tidak ditemukan</h2>
      <A href="/katalog" class="text-[#388e5c] underline">Kembali ke Katalog</A>
    </div>
  );
}

const bookData = {
  ...book,
  coverUrl: getRandomCover(),
};

  return (
    <>
      {/* Sidebar kiri (desktop/tablet) */}
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
        <div class="fixed inset-0 bg-black/80 z-40 md:hidden flex">
          <div class="bg-white w-56 h-full p-6 flex flex-col gap-y-8 shadow-xl">
            <A href="/home" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><AiOutlineHome size={22} /> Home</A>
            <A href="/katalog" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><AiFillBook size={22} /> Katalog</A>
            <A href="/riwayat" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><RiDocumentFileHistoryLine size={22} /> Riwayat</A>
            <A href="/settings" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><IoSettingsOutline size={22} /> Settings</A>
            <A href="/kelola-buku" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><BsBookmarks size={22} /> Kelola Buku</A>
            <A href="/kelola-anggota" class="flex items-center gap-3 text-[#388e5c] font-semibold" onClick={() => setOpenMenu(false)}><BsPeople size={22} /> Kelola Anggota</A>
            <button class="mt-8 text-sm text-gray-500 hover:text-[#388e5c]" onClick={() => setOpenMenu(false)}>Tutup</button>
          </div>
          <div class="flex-1" onClick={() => setOpenMenu(false)}></div>
        </div>
      )}

      {/* Main content */}
      <div class="flex-1 md:ml-20 p-4 pt-20 md:pt-9 flex flex-col min-h-screen bg-white">
        {/* Header + Garis */}
        <div class="pl-4 md:pl-4">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold text-[#388e5c]">Detail Katalog Buku</h1>
            <div class="flex items-center space-x-2 ml-6">
              {/* Bell Icon & Modal */}
              <div class="relative">
                <button onClick={() => setShowNotifModal(true)} class="relative p-2 rounded-full hover:bg-[#e1eebc]/50 transition">
                  {/* Bell Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#388e5c" class="w-7 h-7">
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
              {/* Profile Link */}
              <A href="/profile" class="flex items-center space-x-4">
                <span class="font-medium text-[#388e5c]">Admin</span>
                <img src="https://i.pravatar.cc/40" alt="Admin" class="rounded-full w-10 h-10" />
              </A>
            </div>
          </div>
          <hr class="border-gray-300 mb-6 w-full max-w-[1400px] mx-0" />
        </div>

        {/* Card 1: Info Buku */}
        <div class="bg-gradient-to-br from-[#f6fff9]/90 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-xl backdrop-blur-md p-8 flex flex-col md:flex-row items-center gap-8 mb-8 transition-all duration-200 hover:shadow-2xl">
          <div class="w-32 h-48 bg-white/70 rounded-xl flex items-center justify-center shadow-lg mr-0 md:mr-8 overflow-hidden border-2 border-[#e1eebc]">
            <img src={bookData.coverUrl} alt="cover" class="w-28 h-44 object-cover rounded" />
          </div>
          <div class="flex-1 flex flex-col items-start gap-2">
            <span class="text-3xl font-bold text-[#388e5c] mb-2 flex items-center gap-2">
              <BsBook class="inline-block text-[#6db37e] text-2xl" /> {bookData.title}
            </span>
            <span class="flex items-center gap-2 text-gray-700 mb-1"><AiOutlineBook class="text-[#6db37e]" /> Penulis: <span class="font-medium">{bookData.author}</span></span>
            <span class="flex items-center gap-2 text-gray-700 mb-1"><AiOutlineCalendar class="text-[#6db37e]" /> Publikasi: <span class="font-medium">{bookData.year}</span></span>
            <span class="flex items-center gap-2 text-gray-700 mb-1"><BsBookmarks class="text-[#6db37e]" /> Genre: <span class="font-medium">{bookData.genre}</span></span>
            {/* Status badge */}
            <span class={`mt-1 px-4 py-1 rounded-full text-xs font-semibold shadow-sm
              ${bookData.status === 'Tersedia' ? 'bg-[#e6fbee] text-[#27ae60]' :
                bookData.status === 'Dipinjam' ? 'bg-yellow-100 text-yellow-700' :
                bookData.status === 'Dipesan' ? 'bg-blue-100 text-blue-700' :
                bookData.status === 'Rusak' ? 'bg-red-100 text-red-600' :
                'bg-gray-200 text-gray-500'}`}>{bookData.status || 'Status Tidak Diketahui'}</span>
          </div>
        </div>

        {/* Card 2: Ringkasan Buku */}
        <div class="bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6 mb-8">
          <span class="text-xl font-bold text-[#388e5c] block mb-2">Ringkasan Buku</span>
          <p class="text-gray-700 text-justify leading-relaxed">{bookData.summary}</p>
        </div>

        {/* Card 3: Form Peminjaman */}
        <div class="bg-gradient-to-br from-[#f6fff9]/80 to-[#e7f6ec]/90 rounded-2xl border border-[#e1eebc] shadow-lg backdrop-blur-md p-6 mb-8">
          <span class="text-base font-bold text-[#388e5c] block mb-4">Ajukan peminjaman buku:</span>
          <div class="flex flex-col gap-3 mb-4">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pinjamSekarang()}
                onInput={e => {
                  setPinjamSekarang(e.currentTarget.checked);
                  if (e.currentTarget.checked) setPesanNanti(false);
                }}
                class="accent-[#6db37e] w-5 h-5 rounded focus:ring-2 focus:ring-[#6db37e] transition"
              />
              <span class="text-base font-medium">Pinjam sekarang</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pesanNanti()}
                onInput={e => {
                  setPesanNanti(e.currentTarget.checked);
                  if (e.currentTarget.checked) setPinjamSekarang(false);
                }}
                class="accent-[#6db37e] w-5 h-5 rounded focus:ring-2 focus:ring-[#6db37e] transition"
              />
              <span class="text-base font-medium">Pesan untuk nanti</span>
            </label>
            <input type="date" value={tanggalPesan()} onInput={e => setTanggalPesan(e.currentTarget.value)} placeholder="Masukkan tanggal pemesanan..." class="border rounded px-3 py-2 text-gray-700 mt-1 w-full max-w-xs disabled:bg-gray-100 focus:ring-2 focus:ring-[#6db37e] transition" disabled={!pesanNanti()} />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div class="flex flex-col items-center w-full mb-4">
          <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
            <button class="w-full md:w-110 px-8 py-3 rounded-xl bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-[#388e5c] transition-all duration-200" onClick={() => {
              if (!pinjamSekarang() && !pesanNanti()) setShowModal('pilih-dulu');
              else if (pesanNanti() && !tanggalPesan()) setShowModal('pilih-tanggal');
              else setShowModal('konfirmasi');
            }}>Konfirmasi</button>
            <button class="w-full md:w-110 px-8 py-3 rounded-xl bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-[#388e5c] transition-all duration-200" onClick={() => navigate('/kelola-buku')}>Edit Buku</button>
            <button class="w-full md:w-110 px-8 py-3 rounded-xl bg-gradient-to-r from-[#8fcb8c]/90 to-[#6db37e]/90 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-[#388e5c] transition-all duration-200" onClick={() => navigate('/katalog')}>Kembali</button>
          </div>
        </div>
      </div>
    {/* Modal Popups */}
    {showModal() === 'pilih-tanggal' && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">Silakan pilih tanggal pemesanan terlebih dahulu.</div>
          <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => setShowModal('')}>OK</button>
        </div>
      </div>
    )}
    {showModal() === 'pilih-dulu' && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">Silakan pilih salah satu opsi peminjaman/pemesanan terlebih dahulu.</div>
          <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => setShowModal('')}>OK</button>
        </div>
      </div>
    )}
    {showModal() === 'konfirmasi' && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">Anda yakin ingin meminjam?</div>
          <div class="flex gap-4 mt-2">
            <button class="px-6 py-2 rounded bg-[#8fcb8c] text-white font-semibold hover:bg-[#388e5c] transition" onClick={() => {
              if (pinjamSekarang()) setShowModal('berhasil-pinjam');
              else if (pesanNanti()) setShowModal('berhasil-pesan');
              else setShowModal('');
            }}>Yakin</button>
            <button class="px-6 py-2 rounded bg-gray-200 font-semibold hover:bg-gray-300 transition" onClick={() => setShowModal('')}>Tidak</button>
          </div>
        </div>
      </div>
    )}
    {showModal() === 'berhasil-pinjam' && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">Peminjaman buku berhasil!</div>
          <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => setShowModal('')}>OK</button>
        </div>
      </div>
    )}
    {showModal() === 'berhasil-pesan' && (
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
          <div class="font-bold text-lg mb-4 text-center">Pemesanan buku berhasil! silahkan pinjam dan ambil buku sesuai tanggal</div>
          <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => setShowModal('')}>OK</button>
        </div>
      </div>
    )}
    </>
  );
};

export default KatalogDetailPage;
