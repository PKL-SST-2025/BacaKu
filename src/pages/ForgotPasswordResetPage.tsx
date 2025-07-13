import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { BsEyeFill, BsEyeSlashFill } from 'solid-icons/bs';

const ForgotPasswordResetPage: Component = () => {
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [error, setError] = createSignal('');
  const [showModal, setShowModal] = createSignal(false);
  const navigate = useNavigate();
  const isValid = () => {
    if (!password() || !confirmPassword()) return false;
    if (password().length < 6) return false;
    if (password() !== confirmPassword()) return false;
    return true;
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!password() || !confirmPassword()) {
      setError('Semua field wajib diisi.');
      return;
    }
    if (password().length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    if (password() !== confirmPassword()) {
      setError('Konfirmasi password tidak sama.');
      return;
    }
    setError('');
    // TODO: Tambahkan proses reset password di sini
    setShowModal(true);
  };
  return (
    <>
      <div class="min-h-screen flex items-center justify-center bg-[#dadada] p-4">
        <div class="w-full max-w-4xl h-[90vh] flex bg-white rounded-2xl overflow-hidden">
          {/* Kiri: Gradasi hijau */}
          <div class="hidden md:block w-1/2 h-full bg-gradient-to-br from-[#6db37e] to-[#c2e3c0] rounded-l-2xl" />
          {/* Kanan: Form Reset Password */}
          <div class="w-full md:w-1/2 flex flex-col justify-center items-center rounded-r-2xl">
            <div class="w-full max-w-sm flex flex-col items-center">
              <h2 class="text-4xl font-bold mb-9 text-center">Reset Password</h2>
              <form class="w-full" onSubmit={handleSubmit} autocomplete="off">
                <label class="block text-base mb-1 font-medium" for="new-password">New Password:</label>
                <div class="relative mb-4">
                  <input
                    id="new-password"
                    type={showPassword() ? 'text' : 'password'}
                    class="w-full pl-3 pr-10 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                    placeholder="New Password"
                    value={password()}
                    onInput={e => setPassword(e.currentTarget.value)}
                    autocomplete="new-password"
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
                <label class="block text-base mb-1 font-medium" for="confirm-password">Confirm New Password:</label>
                <div class="relative mb-8">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword() ? 'text' : 'password'}
                    class="w-full pl-3 pr-10 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6db37e]"
                    placeholder="Confirm New Password"
                    value={confirmPassword()}
                    onInput={e => setConfirmPassword(e.currentTarget.value)}
                    autocomplete="new-password"
                  />
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword())}
                    tabindex="-1"
                  >
                    {showConfirmPassword() ? (
                      <BsEyeSlashFill size={20} />
                    ) : (
                      <BsEyeFill size={20} />
                    )}
                  </button>
                </div>
                {error() && (
                  <div class="text-red-600 text-sm mb-2">{error()}</div>
                )}
                <button
                  type="submit"
                  class="w-full bg-[#6db37e] hover:bg-[#5aa76a] text-white font-bold py-2 rounded-md transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={!isValid()}
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Sukses Reset Password */}
      {showModal() && (
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
            <div class="font-bold text-lg mb-4 text-center">Reset password berhasil!</div>
            <button class="px-8 py-2 rounded bg-[#8fcb8c] text-white font-semibold mt-2 hover:bg-[#388e5c] transition" onClick={() => { setShowModal(false); navigate('/login'); }}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordResetPage;
