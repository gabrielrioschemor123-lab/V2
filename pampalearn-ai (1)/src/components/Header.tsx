import React from "react";
import { AppUser } from "../types";
import { LogOut, Sparkles, LogIn, BookOpen, GraduationCap, UserCheck, Sun, Moon } from "lucide-react";
import { PampaLogo } from "./PampaLogo";

interface HeaderProps {
  user: AppUser | null;
  activeTab: "library" | "courses";
  setActiveTab: (tab: "library" | "courses") => void;
  onLogin: () => void;
  onLoginDemo: () => void;
  onLogout: () => void;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogin,
  onLoginDemo,
  onLogout,
  theme = "dark",
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 py-4 shadow-md dark:shadow-lg dark:shadow-black/50 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        {/* New Brand Logo Group */}
        <PampaLogo size="md" />

        {/* Tab Selection */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-[#0b0e14] p-1 border border-slate-200 dark:border-gray-800 transition-colors duration-300">
          <button
            onClick={() => setActiveTab("library")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === "library"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-neon-lime shadow-md shadow-emerald-500/5 font-black"
                  : "text-slate-750 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Librería Gratis
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                activeTab === "courses"
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-neon-lime shadow-md shadow-emerald-500/5 font-black"
                  : "text-slate-755 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Cursos Premium
          </button>
        </div>

        {/* Auth & Theme Toggling Controls */}
        <div className="flex items-center gap-3">
          {/* Universal Theme Toggle Switch */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="rounded-xl border border-slate-200 dark:border-gray-805 bg-slate-50 dark:bg-[#0b0e14] p-2 text-slate-750 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
              aria-label="Alternar modo visual"
              title={theme === "dark" ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-emerald-600" />
              )}
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#0b0e14] p-1.5 pr-4 shadow-sm transition-colors duration-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/20 border border-emerald-500/30 font-black text-emerald-600 dark:text-neon-lime uppercase text-sm">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col text-left max-w-[160px]">
                <span className="truncate text-xs font-black text-slate-800 dark:text-white">
                  {user.displayName || "Estudiante"}
                </span>
                <span className="text-[9px] text-emerald-600 dark:text-neon-lime font-mono uppercase tracking-widest font-black -mt-0.5">
                  Estudiante de Oficios
                </span>
                <span className="truncate text-[9px] text-slate-705 dark:text-gray-500 font-mono">
                  {user.email || "demo.estudiante@pampalearn.ai"}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Cerrar Sesión"
                className="ml-2 rounded-lg p-1.5 text-slate-700 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onLoginDemo}
                className="flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 dark:border-emerald-800/60 bg-transparent dark:bg-emerald-950/10 px-3 py-1.5 text-xs font-black text-slate-700 dark:text-neon-lime hover:bg-slate-100 dark:hover:bg-emerald-900/15 transition-colors duration-200"
                title="Acceso instantáneo para pruebas rápidas"
              >
                <LogIn className="h-3.5 w-3.5" />
                Demo Express
              </button>
              <button
                onClick={onLogin}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white dark:bg-emerald-400 dark:text-black px-4 py-2 text-xs font-black shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
