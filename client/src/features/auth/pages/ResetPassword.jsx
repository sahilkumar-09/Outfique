import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

    const resetToken = useParams()

  const { handleResetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length < 6) {
      toast.error("Enter the 6-digit code sent to your email.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await handleResetPassword({ otp, password, confirmPassword });

      toast.success("Password changed.", {
        description: "You can now sign in with your new credentials.",
        duration: 3000,
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#f7f7f7] dark:bg-[#0a0a0a] text-[#111] dark:text-white"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* ── HERO HEADER ─────────────────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 pt-10 pb-0">
        <p
          className="text-[9px] tracking-[0.28em] uppercase text-[#aaa] dark:text-[#555] mb-4"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          ACCOUNT SECURITY
        </p>

        {/* stacked display title */}
        {["RESET", "ACCESS"].map((word, i) => (
          <div
            key={i}
            className="select-none leading-[0.88] text-[#111] dark:text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(58px, 18vw, 130px)",
              letterSpacing: "-0.01em",
            }}
          >
            {word}
          </div>
        ))}

        <p
          className="mt-5 text-[11px] tracking-[0.18em] uppercase text-[#999] dark:text-[#555] max-w-xs leading-relaxed"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Enter the verification code sent to your registered address, then set
          your new credentials.
        </p>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="h-px bg-[#e0e0e0] dark:bg-[#1e1e1e] mx-5 md:mx-10 lg:mx-16 mt-10 mb-10" />

      {/* ── FORM ────────────────────────────────────────────────────── */}
      <section className="px-5 md:px-10 lg:px-16 pb-24 flex-1">
        <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-10">
          {/* ── OTP BLOCK ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-[18px] bg-[#e63b1f] flex-shrink-0" />
              <span
                className="text-[14px] tracking-[0.2em] uppercase text-[#111] dark:text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Verification Code
              </span>
            </div>

            <p
              className="text-[9px] tracking-[0.18em] uppercase text-[#999] dark:text-[#555]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              6-digit code — check your inbox
            </p>

            {/* OTP INPUT — shadcn component, re-styled via wrapper */}
            <div className="[&_input]:bg-transparent [&_input]:border-0 [&_input]:border-b [&_input]:border-[#ccc] dark:[&_input]:border-[#333] [&_input]:rounded-none [&_input]:text-[#111] dark:[&_input]:text-white [&_input]:font-[Bebas_Neue] [&_input]:text-xl [&_input]:tracking-widest [&_input]:focus:border-[#e63b1f] [&_input]:focus:ring-0 [&_input]:transition-colors [&_input]:duration-200 [&_input]:caret-[#e63b1f] [&_input]:h-12 [&_input]:w-10">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator className="text-[#ccc] dark:text-[#333] mx-1" />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator className="text-[#ccc] dark:text-[#333] mx-1" />
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="h-px bg-[#e0e0e0] dark:bg-[#1e1e1e]" />

          {/* ── NEW PASSWORD ── */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[8.5px] tracking-[0.26em] uppercase text-[#999] dark:text-[#555]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="MIN 8 CHARACTERS"
                className="
                  w-full bg-transparent border-0 border-b
                  border-[#ccc] dark:border-[#222]
                  focus:border-[#e63b1f] dark:focus:border-[#e63b1f]
                  py-3 pr-10 pl-0 outline-none
                  text-[15px] tracking-[0.1em]
                  text-[#111] dark:text-white
                  placeholder:text-[#ccc] dark:placeholder:text-[#2a2a2a]
                  transition-colors duration-200
                "
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#bbb] dark:text-[#444] hover:text-[#e63b1f] transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              >
                <i
                  className={`${showPassword ? "ri-eye-off-line" : "ri-eye-line"} text-base`}
                />
              </button>
            </div>
          </div>

          {/* ── CONFIRM PASSWORD ── */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[8.5px] tracking-[0.26em] uppercase text-[#999] dark:text-[#555]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="REPEAT NEW PASSWORD"
                className="
                  w-full bg-transparent border-0 border-b
                  border-[#ccc] dark:border-[#222]
                  focus:border-[#e63b1f] dark:focus:border-[#e63b1f]
                  py-3 pr-10 pl-0 outline-none
                  text-[15px] tracking-[0.1em]
                  text-[#111] dark:text-white
                  placeholder:text-[#ccc] dark:placeholder:text-[#2a2a2a]
                  transition-colors duration-200
                "
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#bbb] dark:text-[#444] hover:text-[#e63b1f] transition-colors duration-200 bg-transparent border-0 cursor-pointer"
              >
                <i
                  className={`${showConfirm ? "ri-eye-off-line" : "ri-eye-line"} text-base`}
                />
              </button>
            </div>

            {/* live match indicator */}
            {confirmPassword.length > 0 && (
              <p
                className={`text-[8px] tracking-[0.2em] uppercase mt-1 transition-colors duration-200 ${
                  password === confirmPassword
                    ? "text-emerald-500"
                    : "text-[#e63b1f]"
                }`}
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {password === confirmPassword
                  ? "✓ PASSWORDS MATCH"
                  : "✗ DOES NOT MATCH"}
              </p>
            )}
          </div>

          {/* ── SUBMIT ── */}
          <button
            type="submit"
            disabled={loading}
            className="
              flex items-center justify-between
              px-6 py-5 w-full border-0 cursor-pointer
              bg-[#111] dark:bg-white
              text-white dark:text-black
              hover:bg-[#333] dark:hover:bg-[#f5f0e8]
              disabled:opacity-40 disabled:cursor-not-allowed
              active:scale-[0.99] transition-all duration-200
            "
          >
            <span
              className="text-[15px] tracking-[4px]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {loading ? "UPDATING..." : "CONFIRM RESET"}
            </span>
            {loading ? (
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="ml-6"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>

          {/* ── BACK TO LOGIN ── */}
          <button
            type="button"
            onClick={() => navigate("/auth/user/login")}
            className="
              flex items-center gap-2 self-start
              bg-transparent border-0 cursor-pointer
              text-[9px] tracking-[0.22em] uppercase
              text-[#aaa] dark:text-[#555]
              hover:text-[#111] dark:hover:text-white
              transition-colors duration-200
            "
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to login
          </button>
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;
