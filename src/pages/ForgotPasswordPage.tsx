import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { HiSolidPhone } from 'solid-icons/hi';
import { TbMailFilled } from 'solid-icons/tb';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[0-9]{10,15}$/.test(phone);
}

const ForgotPasswordPage: Component = () => {
  const [email, setEmail] = createSignal('');
  const [error, setError] = createSignal('');
  const [showModal, setShowModal] = createSignal(false);
  const [isEmailMode, setIsEmailMode] = createSignal(true);
  const navigate = useNavigate();
  
  const isValid = () => {
    if (!email()) return false;
    if (isEmailMode() && !validateEmail(email())) return false;
    if (!isEmailMode() && !validatePhone(email())) return false;
    return true;
  };
  
  const getInputLabel = () => {
    return isEmailMode() ? 'Enter your Email:' : 'Enter your Phone Number:';
  };
  
  const getPlaceholder = () => {
    return isEmailMode() ? 'Email' : 'Phone Number';
  };
  
  const getInputType = () => {
    return isEmailMode() ? 'email' : 'tel';
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!email()) {
      setError(isEmailMode() ? 'Email wajib diisi.' : 'Nomor telepon wajib diisi.');
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
    // TODO: Tambahkan proses forgot password di sini
    setShowModal(true);
  };
  return (
    <>
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6fff9] to-[#e7f6ec] p-4">
        <div class="w-full max-w-4xl h-[90vh] flex bg-white rounded-2xl overflow-hidden">
          {/* Kiri: Gradasi hijau */}
          <div class="hidden md:block w-1/2 h-full bg-gradient-to-br from-[#6db37e] to-[#c2e3c0] rounded-l-2xl" />
          {/* Kanan: Form Forgot Password */}
          <div class="w-full md:w-1/2 flex flex-col justify-center items-center rounded-r-2xl">
            <div class="w-full max-w-sm flex flex-col items-center">
              <h2 class="text-4xl font-bold mb-15 text-center">Forgot Password</h2>
              <form class="w-full" onSubmit={handleSubmit} autocomplete="off">
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-base font-medium" for="email">
                    {getInputLabel()}
                  </label>
                  <button 
                    type="button" 
                    class="text-sm text-[#6db37e] hover:underline flex items-center"
                    onClick={() => {
                      setIsEmailMode(!isEmailMode());
                      setEmail('');
                      setError('');
                    }}
                  >
                    {isEmailMode() ? (
                      <>
                        <HiSolidPhone class="mr-1" size={16} />
                        Gunakan nomor telepon
                      </>
                    ) : (
                      <>
                        <TbMailFilled class="mr-1" size={16} />
                        Gunakan email
                      </>
                    )}
                  </button>
                </div>
                <div class="relative mb-8">
                  <input
                    id="email"
                    type={getInputType()}
                    class="w-full pl-10 pr-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                    placeholder={getPlaceholder()}
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
                {error() && (
                  <div class="text-red-600 text-sm mb-2">{error()}</div>
                )}
                <button
                  type="submit"
                  class="w-full bg-[#6db37e] hover:bg-[#5aa76a] text-white font-bold py-2 rounded-md transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!isValid()}
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Sukses Forgot Password */}
      {showModal() && (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
            <div class="font-bold text-lg mb-4 text-center">
              {isEmailMode() ? 'Email' : 'Nomor telepon'} sesuai!
            </div>
            <div class="text-sm text-gray-600 mb-4 text-center">
              {isEmailMode() 
                ? 'Kami telah mengirimkan tautan reset password ke email Anda.'
                : 'Kami telah mengirimkan kode verifikasi ke nomor telepon Anda.'}
            </div>
            <button 
              class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" 
              onClick={() => { 
                setShowModal(false); 
                navigate('/forgot-password/reset'); 
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
