import { Component, createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { FaBrandsGoogle } from 'solid-icons/fa';
import { HiSolidPhone } from 'solid-icons/hi';
import { TbMailFilled } from 'solid-icons/tb';
import { BsEyeFill, BsEyeSlashFill } from 'solid-icons/bs';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const LoginPage: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [showModal, setShowModal] = createSignal(false);
  const [isEmailMode, setIsEmailMode] = createSignal(true);
  const [showPassword, setShowPassword] = createSignal(false);
  const navigate = useNavigate();
  const isValid = () => {
    if (!email() || !password()) return false;
    if (isEmailMode() && !validateEmail(email())) return false;
    return true;
  };

  function validatePhone(phone: string) {
    return /^[0-9]{10,15}$/.test(phone);
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!email() || !password()) {
      setError(isEmailMode() ? 'Email dan password wajib diisi.' : 'Nomor telepon dan password wajib diisi.');
      return;
    }
    if (isEmailMode() && !validateEmail(email())) {
      setError('Format email tidak valid.');
      return;
    }
    if (!isEmailMode() && !validatePhone(email())) {
      setError('Format nomor telepon tidak valid. Gunakan 10-15 digit angka.');
      return;
    }
    setError('');
    // TODO: Tambahkan proses login di sini
    setShowModal(true);
  };

  return (
    <>
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6fff9] to-[#e7f6ec] p-4">
        <div class="w-full max-w-4xl h-[90vh] flex bg-white rounded-2xl overflow-hidden">
          {/* Kiri: Gradasi hijau */}
          <div class="hidden md:block w-1/2 h-full bg-gradient-to-br from-[#6db37e] to-[#c2e3c0] rounded-l-2xl" />
          {/* Kanan: Form Login */}
          <div class="w-full md:w-1/2 flex flex-col justify-center items-center rounded-r-2xl">
            <div class="w-full max-w-sm flex flex-col items-center">
              <h2 class="text-4xl font-bold mb-8 text-center">Log in</h2>
              <form class="w-full" onSubmit={handleSubmit} autocomplete="off">
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-base font-medium" for="email">
                    {isEmailMode() ? 'Enter your Email:' : 'Enter your Phone Number:'}
                  </label>
                  <button 
                    type="button" 
                    class="text-sm text-[#6db37e] hover:underline"
                    onClick={() => setIsEmailMode(!isEmailMode())}
                  >
                    {isEmailMode() ? 'Use phone instead' : 'Use email instead'}
                  </button>
                </div>
                <div class="relative mb-4">
                  <input
                    id="email"
                    type={isEmailMode() ? 'email' : 'tel'}
                    class="w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                    placeholder={isEmailMode() ? 'Email' : 'Phone Number'}
                    value={email()}
                    onInput={e => setEmail(e.currentTarget.value)}
                    autocomplete={isEmailMode() ? 'username' : 'tel'}
                  />
                  <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {isEmailMode() ? (
                      <TbMailFilled class="text-gray-500" />
                    ) : (
                      <HiSolidPhone class="text-gray-500" />
                    )}
                  </div>
                </div>
                <label class="block text-base mb-1 font-medium" for="password">Password:</label>
                <div class="relative mb-2">
                  <input
                    id="password"
                    type={showPassword() ? "text" : "password"}
                    class="w-full pl-3 pr-10 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                    placeholder="Password"
                    value={password()}
                    onInput={e => setPassword(e.currentTarget.value)}
                    autocomplete="current-password"
                  />
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword())}
                    tabindex="-1"
                  >
                    {showPassword() ? (
                      <BsEyeSlashFill size={20} />
                    ) : (
                      <BsEyeFill size={20} />
                    )}
                  </button>
                </div>
                {error() && (
                  <div class="text-red-600 text-sm mb-2">{error()}</div>
                )}
                <div class="w-full flex justify-end mb-4">
                  <A href="/forgot-password" class="text-sm text-[#6db37e] hover:underline font-medium">Forgot password?</A>
                </div>
                <button
                  type="submit"
                  class="w-full bg-[#6db37e] hover:bg-[#5aa76a] text-white font-bold py-2 rounded-md transition mb-3 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!isValid()}
                >
                  Sign in
                </button>
                <div class="text-center text-sm mb-2">
                  Didn't have an account?{' '}
                  <A href="/register" class="text-[#6db37e] hover:underline font-semibold">Register</A>
                </div>
                <div class="flex flex-col items-center mt-4">
                  <span class="text-gray-400 text-xs mb-2">Or...</span>
                  <div class="flex gap-6">
                    <button type="button" class="bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
                      <FaBrandsGoogle size={28} color="#000" />
                    </button>
                    <button 
                      type="button" 
                      class="bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                      onClick={() => setIsEmailMode(!isEmailMode())}
                    >
                      {isEmailMode() ? (
                        <HiSolidPhone size={28} color="#000" />
                      ) : (
                        <TbMailFilled size={28} color="#000" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Sukses Login */}
      {showModal() && (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
            <div class="font-bold text-lg mb-4 text-center">Login berhasil!</div>
            <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => { setShowModal(false); navigate('/home'); }}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
