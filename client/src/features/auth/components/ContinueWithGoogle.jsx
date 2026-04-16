import React from 'react'

const ContinueWithGoogle = () => {
  return (
    <div className="w-full flex flex-col gap-4 my-6">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 h-px bg-linear-to-r from-transparent to-zinc-700"></div>
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.2em]">
          Or Continue With
        </span>
        <div className="flex-1 h-px bg-linear-to-l from-transparent to-zinc-700"></div>
      </div>

      <button
        type="button"
        onClick={() => (window.location.href = "/api/auth/google")}
        className="group relative w-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-700/80 hover:border-zinc-500 rounded-xl overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] bg-zinc-900/50 hover:bg-zinc-800/80 active:scale-[0.98]"
      >
        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/4 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <svg
          className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span className="relative z-10 text-sm font-semibold text-zinc-300 tracking-wide group-hover:text-white transition-colors duration-300">
          Continue with Google
        </span>
      </button>
    </div>
  );
}

export default ContinueWithGoogle
