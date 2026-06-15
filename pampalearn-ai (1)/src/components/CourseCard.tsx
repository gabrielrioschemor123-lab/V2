import React from "react";
import { Course } from "../types";
import { Sparkles, Play, Lock, Star, Tag, Megaphone, TrendingUp, Headphones, Wrench } from "lucide-react";
import { motion } from "motion/react";

interface CourseCardProps {
  course: Course;
  isOwned: boolean;
  onOpenPaywall: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isOwned,
  onOpenPaywall,
}) => {
  const handleCardClick = () => {
    // Navigate using dynamic URL hash
    window.location.hash = `#course/${course.id}`;
  };

  const isMetaAds = course.id === "facebook-ads-2025";
  const isDJ = course.id === "virtual-dj-basics";
  const isMotos = course.id === "mecanica-motos";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 shadow-lg cursor-pointer ${
        isMotos
          ? "border-[#f97316]/20 dark:border-[#f97316]/20 bg-white dark:bg-[#121212] hover:border-[#f97316] hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] dark:hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] duration-500"
          : isDJ
          ? "border-[#1ed760]/20 dark:border-[#1ed760]/20 bg-white dark:bg-black hover:border-[#1ed760] hover:shadow-[0_0_25px_rgba(30,215,96,0.25)] dark:hover:shadow-[0_0_25px_rgba(30,215,96,0.35)] duration-500"
          : isMetaAds
          ? "border-[#0668E1]/20 dark:border-[#0668E1]/30 bg-white dark:bg-gradient-to-b dark:from-[#11141d]/95 dark:via-[#00469b]/5 dark:to-[#0668E1]/10 hover:border-[#0668E1]/70 dark:hover:bg-[#12162a]"
          : "border-slate-205 dark:border-gray-800/85 bg-white dark:bg-[#11141d]/90 hover:border-slate-300 dark:hover:border-gray-700 hover:bg-slate-50 dark:hover:bg-[#121622]"
      }`}
      onClick={handleCardClick}
      id={`course-card-${course.id}`}
    >
      {/* Thumbnail with Rounded Corners and Soft Shadow */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-950">
        <img
          src={course.thumbnail}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12]/90 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge & Publicidad/Growth Custom Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          <span className="rounded bg-[#0d0f14]/85 border border-gray-800 px-3 py-1 text-[10px] font-black text-gray-300 uppercase tracking-wider">
            {course.category}
          </span>
          {isMetaAds && (
            <span className="rounded bg-gradient-to-r from-[#0668E1] to-[#00469b] border border-[#0668E1]/50 px-2.5 py-1 text-[10px] font-black text-white flex items-center gap-1 shadow-md">
              <TrendingUp className="h-3 w-3 text-sky-400" /> +ROI Target
            </span>
          )}
          {isDJ && (
            <span className="rounded bg-gradient-to-r from-[#1ed760] to-[#128a3d] border border-[#1ed760]/40 px-2.5 py-1 text-[10px] font-black text-white flex items-center gap-1 shadow-md shadow-[#1ed760]/10">
              <Headphones className="h-3 w-3 text-[#0d0f14]" /> +BPM Booth
            </span>
          )}
          {isMotos && (
            <span className="rounded bg-gradient-to-r from-[#f97316] to-[#ea580c] border border-[#f97316]/40 px-2.5 py-1 text-[10px] font-black text-white flex items-center gap-1 shadow-md shadow-[#f97316]/10">
              <Wrench className="h-3 w-3 text-white" /> +Garage Tech
            </span>
          )}
        </div>

        {/* Coral-Colored Premium Label */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <span className="flex items-center gap-1 rounded bg-[#ff7f7f]/10 border border-[#f43f5e]/50 px-2.5 py-1 text-[10px] font-black text-[#ff6b6b] uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-[#ff6b6b] animate-pulse" />
            Premium
          </span>
        </div>

        {/* Footer info inside thumbnail */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300 font-medium">
          <div className="flex items-center gap-1 bg-[#0d0f14]/65 px-2 py-1 rounded backdrop-blur-xs text-[10px] font-mono">
            <span>Instructor: {course.instructor}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#0d0f14]/65 px-2 py-1 rounded backdrop-blur-xs text-[10px] font-mono">
            <span>{course.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Main Text Content */}
      <div className="p-6 text-left flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className={`text-lg font-bold text-slate-900 dark:text-white transition-colors leading-snug flex items-center gap-2 ${
            isMotos ? "group-hover:text-[#f97316]" : isDJ ? "group-hover:text-[#1ed760]" : isMetaAds ? "group-hover:text-sky-400" : "group-hover:text-neon-lime"
          }`}>
            {isMetaAds && <Megaphone className="h-4 w-4 text-[#0668E1] flex-shrink-0" />}
            {isDJ && <Headphones className="h-4 w-4 text-[#1ed760] flex-shrink-0" />}
            {isMotos && <Wrench className="h-4 w-4 text-[#f97316] flex-shrink-0" />}
            {course.title}
          </h3>
          <p className="text-xs text-slate-705 dark:text-gray-400 leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Trigger and Price Block */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-gray-850 pt-4">
          <div className="text-left">
            <p className="text-[10px] font-mono text-slate-555 dark:text-gray-500 uppercase tracking-widest leading-none">Matrícula</p>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-1">
              $1.500 ARS
            </p>
          </div>

          <div>
            {isOwned ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
                className={`flex items-center gap-1 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isMotos
                    ? "bg-[#f97316]/10 border border-[#f97316]/20 text-[#f97316] hover:bg-[#f97316]/20"
                    : isDJ
                    ? "bg-[#1ed760]/10 border border-[#1ed760]/20 text-[#1ed760] hover:bg-[#1ed760]/20"
                    : isMetaAds
                    ? "bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20"
                    : "bg-emerald-500/10 border border-emerald-500/20 text-neon-lime hover:bg-emerald-500/20"
                }`}
              >
                <Play className={`h-3 w-3 fill-current text-neon-lime`} /> Ingresar
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPaywall(course);
                }}
                className={`flex items-center gap-1.5 rounded-xl hover:scale-[1.02] px-4 py-2 text-xs font-black transition-all ${
                  isMotos
                    ? "bg-[#f97316] text-white shadow-lg shadow-[#f97316]/25 border border-[#f97316]/50"
                    : isDJ
                    ? "bg-[#1ed760] text-black shadow-lg shadow-[#1ed760]/25 border border-[#1ed760]/50"
                    : isMetaAds
                    ? "bg-gradient-to-r from-[#0668E1] to-[#00469b] text-white shadow-lg shadow-[#0668E1]/20 border border-[#0668E1]/50"
                    : "bg-neon-lime text-[#0d0f14] shadow-md hover:shadow-[#10ff7c]/20"
                }`}
              >
                <Lock className="h-3.5 w-3.5" /> Adquirir por $1.500
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
