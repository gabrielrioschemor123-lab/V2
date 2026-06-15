import React, { useEffect, useState } from "react";
import { Course, UserProfile } from "../types";
import { initialCourses } from "../data";
import { GraduationCap, Database, Sparkles, AlertCircle } from "lucide-react";
import { CourseCard } from "./CourseCard";

interface CoursesTabProps {
  userProfile: UserProfile | null;
  onOpenPaywall: (course: Course) => void;
  onOpenTotalAccessPaywall: () => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({
  userProfile,
  onOpenPaywall,
  onOpenTotalAccessPaywall,
}) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "TODOS" | "OFICIOS" | "MARKETING DIGITAL / VENTAS" | "MÚSICA / DJING" | "MECÁNICA" | "IDIOMAS"
  >("TODOS");

  const hasTotalAccess = userProfile?.access_total === true || String(userProfile?.access_total) === "true";

  // Removed Firebase data fetching - fully offline responsive catalog
  useEffect(() => {
    setCourses(initialCourses);
    setLoading(false);
  }, []);

  const isCourseOwned = (courseId: string) => {
    if (!userProfile) return false;
    if (hasTotalAccess) return true;
    return userProfile.purchased_courses.includes(courseId);
  };

  // Normalizer matcher to filter courses robustly
  const matchCategory = (courseCategory: string, selected: string) => {
    if (selected === "TODOS") return true;

    const normCourse = (courseCategory || "").toLowerCase().trim();
    const normSelected = selected.toLowerCase().trim();

    if (normCourse === normSelected) return true;

    // Custom normalized groupings based on specifications
    if (normSelected === "marketing digital / ventas") {
      return (
        normCourse.includes("marketing") ||
        normCourse.includes("ventas") ||
        normCourse === "marketing digital / ventas"
      );
    }
    if (normSelected === "música / djing") {
      return (
        normCourse.includes("música") ||
        normCourse.includes("djing") ||
        normCourse.includes("dj") ||
        normCourse === "música / djing"
      );
    }
    if (normSelected === "mecánica") {
      return normCourse.includes("mecánica") || normCourse === "mecanica";
    }
    if (normSelected === "idiomas") {
      return normCourse.includes("idiomas") || normCourse === "idioma";
    }
    if (normSelected === "oficios") {
      return normCourse.includes("oficios");
    }

    return false;
  };

  const filteredCourses = courses.filter((course) => {
    return matchCategory(course.category, selectedCategory);
  });

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 2. HERO BANNER (Card Central Principal) */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0c0f16] via-[#091524] to-[#041c2c] border border-emerald-500/10 p-8 text-left md:p-14 shadow-2xl shadow-black/80">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#10ff7c]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00ff66]/10 px-4 py-1.5 text-xs font-black text-neon-lime border border-[#00ff66]/20">
            <GraduationCap className="h-4 w-4" /> 🎓 Programas Técnicos Certificados
          </span>
          
          <h1 className="text-3xl font-black md:text-5xl text-white tracking-tight leading-tight uppercase font-sans">
            Desarrolla Competencias <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-lime via-[#24ff86] to-[#00f0ff] animate-pulse">
              Técnicas y Profesionales
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed font-sans font-medium">
            Adquiere capacitación especializada en oficios modernos, herramientas digitales e idiomas. 
            Potencia tus habilidades prácticas con metodologías orientadas al trabajo y el desarrollo independiente.
          </p>
        </div>
      </div>

      {/* 2.5 BANNER "PASO TOTAL VIP" (Glow Banner) */}
      {!hasTotalAccess && (
        <div 
          id="vip-glow-banner"
          className="relative overflow-hidden rounded-3xl bg-[#090b11] border-2 border-[#10ff7c]/30 p-6 md:p-8 shadow-[0_0_20px_rgba(16,255,124,0.08)] flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-[#10ff7c]/50 hover:shadow-[0_0_30px_rgba(16,255,124,0.15)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-lime-500/5 to-transparent pointer-events-none" />
          <div className="relative space-y-2 text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#10ff7c]/15 border border-[#10ff7c]/30 px-3 py-1 text-[10px] font-black text-neon-lime uppercase tracking-widest leading-none">
              ⚡ OPORTUNIDAD VITALICIA
            </span>
            <div className="text-sm md:text-base font-semibold text-gray-200">
              <span className="text-white font-black text-neon-lime">¡Acceso Total Pampeano Vitalicio!</span> Libera TODOS los cursos actuales y futuros (Mecánica, Idiomas, DJ, Marketing) por un único pago de <span className="font-mono font-bold text-white bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">$4.999 ARS</span>.
            </div>
          </div>
          <button
            onClick={onOpenTotalAccessPaywall}
            id="btn-activate-total-access"
            className="relative shrink-0 overflow-hidden rounded-xl bg-[#10ff7c] hover:bg-[#10ff7c]/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 px-6 py-4 text-xs font-black text-[#07090e] uppercase tracking-wider shadow-lg shadow-emerald-500/25 flex items-center gap-2"
          >
            Activar Pase Completo
          </button>
        </div>
      )}

      {/* 3. BARRA DE FILTRADO (Categorías Inferiores) */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-neon-lime" /> Catálogo de Especializaciones
          </h3>
        </div>

        {/* Responsive horizontal list */}
        <div className="flex bg-[#07090e] p-1.5 rounded-2xl border border-gray-900/80 overflow-x-auto gap-1 scrollbar-none shadow-inner">
          {(["TODOS", "OFICIOS", "MARKETING DIGITAL / VENTAS", "MÚSICA / DJING", "MECÁNICA", "IDIOMAS"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-xl px-5 py-3 text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-neon-lime text-[#040609] shadow-lg shadow-emerald-500/10 scale-[1.02]"
                  : "text-gray-400 hover:text-white hover:bg-[#111420]/30"
              }`}
            >
              {cat === "TODOS" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. CONEXIÓN DINÁMICA A FIREBASE (Firestore - Grid View) */}
      {loading ? (
        /* Aesthetic premium skeletons if loading */
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-3xl border border-gray-950 bg-[#07090e]/80 p-5 space-y-4 animate-pulse">
              <div className="aspect-video w-full rounded-2xl bg-gray-900" />
              <div className="h-4 w-3/4 rounded bg-gray-900" />
              <div className="h-3 w-1/2 rounded bg-gray-900" />
              <div className="flex justify-between pt-4 border-t border-gray-950/40">
                <div className="h-4 w-12 rounded bg-gray-900" />
                <div className="h-8 w-20 rounded-xl bg-gray-900" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-24 rounded-[32px] border border-gray-950 bg-[#07090e]/50 space-y-4">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-700 animate-bounce" />
          <p className="text-gray-400 font-bold">No se encontraron programas disponibles bajo la categoría seleccionada.</p>
          <button
            onClick={() => setSelectedCategory("TODOS")}
            className="text-xs font-bold text-neon-lime hover:underline uppercase tracking-wider"
          >
            Reestablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const owned = isCourseOwned(course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                isOwned={owned}
                onOpenPaywall={onOpenPaywall}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
