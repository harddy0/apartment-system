"use client";
// Softer brutalist login page with improved color balance and animation


export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-yellow-200 dark:from-zinc-900 dark:via-black dark:to-zinc-800">
      {/* Animated, but softer, background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full animate-move-bg" style={{position:'absolute',top:0,left:0}} viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="1440" height="900" fill="#fffbe6"/>
          <rect x="180" y="120" width="420" height="70" fill="#ffb3c6" className="animate-brutal-rect1" rx="18"/>
          <rect x="900" y="320" width="280" height="90" fill="#b3faff" className="animate-brutal-rect2" rx="18"/>
          <rect x="600" y="600" width="180" height="60" fill="#222" className="animate-brutal-rect3" rx="18"/>
        </svg>
      </div>
      <style jsx global>{`
        @keyframes move-bg {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
        .animate-move-bg {
          animation: move-bg 16s linear infinite alternate;
        }
        @keyframes brutal-rect1 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(24px); }
        }
        .animate-brutal-rect1 {
          animation: brutal-rect1 7s cubic-bezier(.68,-0.55,.27,1.55) infinite alternate;
        }
        @keyframes brutal-rect2 {
          0%,100% { transform: translateX(0); }
          50% { transform: translateX(-40px); }
        }
        .animate-brutal-rect2 {
          animation: brutal-rect2 10s cubic-bezier(.68,-0.55,.27,1.55) infinite alternate;
        }
        @keyframes brutal-rect3 {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-brutal-rect3 {
          animation: brutal-rect3 6s cubic-bezier(.68,-0.55,.27,1.55) infinite alternate;
        }
      `}</style>
      <div className="relative z-10 w-full max-w-md p-0">
        <div className="bg-white/95 dark:bg-zinc-900/95 border-2 border-zinc-800 dark:border-yellow-400 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] px-10 py-12 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-zinc-900 dark:bg-yellow-300 text-yellow-300 dark:text-zinc-900 px-6 py-2 text-2xl font-extrabold uppercase tracking-widest border-2 border-yellow-300 dark:border-zinc-900 rounded-lg shadow-[2px_2px_0_0_#ffb3c6]">
              LOG IN
            </div>
            <p className="text-zinc-700 dark:text-yellow-200 text-base font-mono mt-2">Enter your credentials</p>
          </div>
          <form className="flex flex-col gap-5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="bg-yellow-50 border-2 border-zinc-800 dark:bg-zinc-800 dark:border-yellow-400 px-4 py-3 text-zinc-900 dark:text-yellow-200 font-semibold text-base rounded-lg shadow-[1px_1px_0_0_#ffb3c6] focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-400 placeholder:text-zinc-400 dark:placeholder:text-yellow-300"
              placeholder="Email address"
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="bg-yellow-50 border-2 border-zinc-800 dark:bg-zinc-800 dark:border-yellow-400 px-4 py-3 text-zinc-900 dark:text-yellow-200 font-semibold text-base rounded-lg shadow-[1px_1px_0_0_#b3faff] focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-400 placeholder:text-zinc-400 dark:placeholder:text-yellow-300"
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-zinc-900 dark:bg-yellow-300 text-yellow-300 dark:text-zinc-900 border-2 border-yellow-300 dark:border-zinc-900 rounded-lg px-4 py-3 font-extrabold text-base uppercase tracking-widest shadow-[2px_2px_0_0_#b3faff] hover:bg-yellow-300 hover:text-zinc-900 hover:border-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-yellow-300 dark:hover:border-yellow-300 transition"
            >
              Enter
            </button>
          </form>
          <div className="flex flex-col gap-2 mt-2">
            <button className="w-full bg-[#ffb3c6] text-zinc-900 border-2 border-zinc-800 rounded-lg px-4 py-2 font-bold text-base shadow-[1px_1px_0_0_#fffbe6] hover:bg-zinc-900 hover:text-[#ffb3c6] transition">Sign in with Google</button>
            <button className="w-full bg-[#b3faff] text-zinc-900 border-2 border-zinc-800 rounded-lg px-4 py-2 font-bold text-base shadow-[1px_1px_0_0_#fffbe6] hover:bg-zinc-900 hover:text-[#b3faff] transition">Sign in with Twitter</button>
          </div>
          <div className="flex justify-between items-center mt-6">
            <a href="#" className="text-zinc-700 dark:text-yellow-200 font-bold underline hover:text-[#ffb3c6]">Forgot password?</a>
            <a href="#" className="text-zinc-700 dark:text-yellow-200 font-bold underline hover:text-[#b3faff]">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}