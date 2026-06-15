import React, { useState, useEffect } from "react";
import { Course } from "../types";
import { GeminiChat } from "./GeminiChat";
import { 
  ChevronLeft, 
  FileText, 
  Download, 
  Sparkles, 
  Play, 
  Volume2, 
  Layers, 
  Lock, 
  BadgeAlert,
  ArrowRight,
  UserCheck,
  CheckCircle,
  Clock,
  ShieldCheck,
  Wrench,
  Plane,
  Music,
  Compass
} from "lucide-react";

interface CourseViewProps {
  course: Course;
  isOwned: boolean;
  onBack: () => void;
  onBuy: (courseId: string) => void;
}

export const CourseView: React.FC<CourseViewProps> = ({
  course,
  isOwned,
  onBack,
  onBuy,
}) => {
  const isMotos = course.id === "mecanica-motos";
  const isPortugues = course.id === "portugues-principiantes";
  const isIngles = course.id === "ingles-desde-cero";
  const isFrances = course.id === "frances-desde-cero";

  // Helpers to fetch information completely offline/locally
  const getInitialVideos = () => {
    if (course.id === "mecanica-motos") {
      return [
        { id: "p1", title: "Parte 1: El Corazón Mecánico y Motor", url: "https://drive.google.com/file/d/1Lp7wUgQTC-6nmtr_f3jRVc3aWdEE9oab/view?usp=drive_link" },
        { id: "p2", title: "Parte 2: Sistemas Eléctricos y Chasis", url: "https://drive.google.com/file/d/1dhLROci5FfWKXkhPspudSkVdg-8j14Is/view?usp=drive_link" }
      ];
    }
    if (course.id === "frances-desde-cero") {
      return [
        { id: "p1", title: "Parte 1: Fonética y Saludos Iniciales", url: "https://drive.google.com/file/d/1y2R-YgEuSJOx1yxAAxIituZHA7-5Cqq6/view?usp=drive_link" },
        { id: "p2", title: "Parte 2: Gramática y Estructura", url: "https://drive.google.com/file/d/1lefAkoL_Xfjuow8SydYcsdZcvfid4YqQ/view?usp=drive_link" },
        { id: "p3", title: "Parte 3: Conversación y Situaciones Reales", url: "https://drive.google.com/file/d/1GjSC3UNSz7tbRqvmaQa6Uwyi5U1GJh5k/view?usp=drive_link" }
      ];
    }
    if (course.id === "portugues-principiantes") {
      return [
        { id: "p1", title: "Parte 1: Pronunciación y Vocabulario Esencial", url: "https://drive.google.com/file/d/15fuymagrM41jhpzOeRmgl7povwdLqw_a/view?usp=drive_link" }
      ];
    }
    if (course.id === "ingles-desde-cero") {
      return [
        { id: "p1", title: "Parte 1: Fundamentos y Estructura", url: "https://drive.google.com/file/d/1fGXkoYanCsRkc-mejMkJC5sWU7Fqs_lC/view?usp=drive_link" },
        { id: "p2", title: "Parte 2: Conversación y Fluidez", url: "https://drive.google.com/file/d/12KfyrtrlkvnGv2qiuR3s7Dov1kea8mtG/view?usp=drive_link" }
      ];
    }

    const list: any[] = [];
    if (course.syllabus) {
      course.syllabus.forEach(mod => {
        mod.lessons.forEach(l => {
          if (l.type === "video") {
            list.push({
              id: l.id,
              title: l.title,
              url: l.video_drive_url
            });
          }
        });
      });
    }
    return list.length > 0 ? list : [{ id: "p1", title: "Clase 1", url: course.syllabus?.[0]?.lessons?.[0]?.video_drive_url || "" }];
  };

  const getInitialVideoUrl = () => {
    if (course.id === "instagram-masterclass") return "https://drive.google.com/file/d/1xFUqejFG2NPVlAZejifXLzJb2Cv2B4xA/preview";
    if (course.id === "facebook-ads-2025") return "https://drive.google.com/file/d/1O75hYKIR2JjLP5-02SZCXrFM0-ybGWfe/preview";
    if (course.id === "virtual-dj-basics") return "https://drive.google.com/file/d/1BBKdCtzEPEsPSLwESogmxcgr3Bo-h_IB/preview";
    if (course.id === "mecanica-motos") return "https://drive.google.com/file/d/1Lp7wUgQTC-6nmtr_f3jRVc3aWdEE9oab/preview";
    if (course.id === "frances-desde-cero") return "https://drive.google.com/file/d/1y2R-YgEuSJOx1yxAAxIituZHA7-5Cqq6/preview";
    if (course.id === "portugues-principiantes") return "https://drive.google.com/file/d/15fuymagrM41jhpzOeRmgl7povwdLqw_a/preview";
    if (course.id === "ingles-desde-cero") return "https://drive.google.com/file/d/1fGXkoYanCsRkc-mejMkJC5sWU7Fqs_lC/preview";
    return course.syllabus?.[0]?.lessons?.[0]?.video_drive_url || "";
  };

  const getInitialBrief = () => {
    if (course.id === "instagram-masterclass") return "Usa el poder del algoritmo a tu favor de la mano de un experto en conversión directa por DM. Aprende ganchos magnéticos y flujos de embudos automatizados.";
    if (course.id === "facebook-ads-2025") return "Aprende las estrategias de pauta publicitaria para el 2025. Configuración de campañas, segmentación avanzada con IA de Meta, y optimización de presupuestos para maximizar ventas.";
    if (course.id === "virtual-dj-basics") return "Domina el arte de la mezcla desde cero. Aprende a manejar decks, ecualización básica, beatmatching y efectos esenciales en Virtual DJ.";
    if (course.id === "mecanica-motos") return "Aprende el funcionamiento, desarme, diagnóstico y mantenimiento de motores y sistemas de motocicletas desde cero.";
    if (course.id === "frances-desde-cero") return "Aprende el idioma del amor y los negocios desde las bases. Fonética, gramática esencial y conversación fluida en 3 niveles detallados.";
    if (course.id === "portugues-principiantes") return "Iníciate en el idioma más alegre del mundo. Aprende fonética, saludos, verbos básicos y evita las trampas del portuñol en una sola Masterclass.";
    if (course.id === "ingles-desde-cero") return "El curso definitivo para hablar inglés. Desde los sonidos básicos hasta conversaciones fluidas. Aprende gramática, listening y speaking con soporte de IA.";
    return course.headline || course.description;
  };

  const getInitialAiInstruction = () => {
    if (course.id === "instagram-masterclass") return "Eres un experto en crecimiento de Instagram y automatización de embudos de ventas. Solo respondes preguntas sobre el video actual y estrategias de redes sociales. No respondas sobre otros temas.";
    if (course.id === "facebook-ads-2025") return "Eres un experto en Performance Marketing and Media Buying. Tu especialidad es Facebook Ads 2025. Responde dudas técnicas sobre Píxel de Meta, API de Conversiones, estructuras CBO/ABO y métricas de ROAS basándote en el video. Si el alumno pregunta algo fuera de publicidad paga, redirígelo amablemente al tema del curso.";
    if (course.id === "virtual-dj-basics") return "Eres un Pro DJ experto con años de experiencia en clubes. Tu misión es enseñar a usar Virtual DJ basándote en este video. Responde dudas sobre BPM, Sync, ganancia, ecualización y cómo leer la onda de sonido (waveform). Mantén un lenguaje 'cool', motivador y muy técnico.";
    if (course.id === "mecanica-motos") return "Eres un Mecánico de Motos Senior con años de experiencia en talleres de alta competencia. Tu objetivo es guiar al alumno en base a los dos videos del curso. Responde dudas técnicas sobre motores de 2 y 4 tiempos, reglaje de válvulas, sistemas eléctricos, carburación e inyección electrónica. Usa un tono práctico, claro e instructivo.";
    if (course.id === "frances-desde-cero") return "Eres un tutor de francés nativo y paciente. Tu misión es ayudar al alumno con el contenido de los 3 videos del curso. Responde dudas sobre pronunciación, conjugación de verbos (être, avoir, etc.), vocabulario y cultura francesa. Responde siempre de forma amable, proporcionando ejemplos bilingües (Francés/Español) y transcripciones fonéticas si es necesario.";
    if (course.id === "portugues-principiantes") return "Eres un tutor nativo de Brasil, alegre, paciente y experto en enseñanza para hispanohablantes. Tu misión es ayudar al alumno con el video de Portugués. Enfócate en corregir errores comunes de 'Portuñol', explicar la pronunciación de las vocales nasales y enseñar frases útiles para viajes o negocios. Responde de forma motivadora y usa expresiones brasileñas reales.";
    if (course.id === "ingles-desde-cero") return "Eres un tutor de inglés nativo, amable y dinámico. Tu misión es ayudar al alumno con el contenido de los dos videos del curso. Responde dudas sobre gramática, vocabulario, modismos y pronunciación. Proporciona ejemplos claros y, cuando el alumno escriba en inglés, corrígelo de forma constructiva. Fomenta que el alumno intente escribir sus dudas en inglés si se siente capaz.";
    return `Eres un tutor de Inteligencia Artificial experto del curso "${course.title}". Guía y asiste al estudiante.`;
  };

  // State initialized instantly and fully offline
  const [videoUrl] = useState<string>(getInitialVideoUrl());
  const [briefInfo] = useState<string>(getInitialBrief());
  const [aiInstruction] = useState<string>(getInitialAiInstruction());
  const [playlistVideos] = useState<any[]>(getInitialVideos());
  const [selectedVideoId, setSelectedVideoId] = useState<string>("p1");
  const [isLoading] = useState(false);
  const [fetchError] = useState<string | null>(null);

  // Fallback calculations in case of empty fields
  const finalBriefInfo = briefInfo || course.headline || course.description;
  
  // Playlist elements calculation
  const activePlaylistVideo = playlistVideos.length > 0 ? playlistVideos.find(v => v.id === selectedVideoId) : null;
  const currentVideoUrl = activePlaylistVideo ? activePlaylistVideo.url : videoUrl;

  // Clean drive link for iframe display
  const originalVidUrl = currentVideoUrl || (course.syllabus[0]?.lessons[0]?.video_drive_url) || "";
  let embedVideoUrl = originalVidUrl;
  if (embedVideoUrl.includes("/view")) {
    embedVideoUrl = embedVideoUrl.split("/view")[0] + "/preview";
  } else if (embedVideoUrl.includes("drive.google.com/file/d/")) {
    const parts = embedVideoUrl.split("/file/d/");
    if (parts[1]) {
      const fileId = parts[1].split("/")[0];
      embedVideoUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  // Related PDF URL download fallback
  const pdfDownloadUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  // Customize tutor instructions context for multiple videos
  const activeInstruction = isMotos
    ? `${aiInstruction || "Eres un Mecánico de Motos Senior con años de experiencia en talleres de alta competencia. Tu objetivo es guiar al alumno en base a los dos videos del curso. Responde dudas técnicas sobre motores de 2 y 4 tiempos, reglaje de válvulas, sistemas eléctricos, carburación e inyección electrónica. Usa un tono práctico, claro e instructivo."} El alumno está estudiando actualmente la sesión: "${activePlaylistVideo ? activePlaylistVideo.title : "Parte 1: El Corazón Mecánico y Motor"}". Enfoca tus explicaciones técnicas y sugerencias operativas con prioridad en esta sesión, adaptando tus respuestas al contexto de este material de video.`
    : isIngles
    ? `${aiInstruction || "Eres un tutor de inglés nativo, amable y dinámico. Tu misión es ayudar al alumno con el contenido de los dos videos del curso."} El alumno está estudiando actualmente la sesión: "${activePlaylistVideo ? activePlaylistVideo.title : "Parte 1: Fundamentos y Estructura"}". Enfoca tus explicaciones y ejemplos en esta lección, ayudándole a resolver dudas afines.`
    : aiInstruction;

  return (
    <div 
      className={`space-y-6 rounded-3xl transition-all duration-500 ${
        isFrances 
          ? "bg-[#fdfaf4] p-5 sm:p-8 text-[#1a365d] border border-amber-100 shadow-lg" 
          : isPortugues
            ? "bg-[#fcfdfa] p-5 sm:p-8 text-[#063f1d] border border-emerald-100 shadow-lg"
            : isIngles
              ? "bg-white p-5 sm:p-8 text-[#1a365d] border border-slate-100 shadow-xl"
              : "text-white"
      }`} 
      id={`course-detail-view-${course.id}`}
    >
      
      {/* Top Breadcrumbs Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={onBack}
          className={`group flex items-center gap-2 text-xs font-bold transition-colors self-start ${
            isFrances || isIngles
              ? "text-[#1a365d]/75 hover:text-[#1a365d]" 
              : isPortugues
                ? "text-[#009739]/80 hover:text-[#009739]"
                : "text-gray-400 hover:text-white"
          }`}
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver al Catálogo Académico
        </button>

        <div className={`flex items-center gap-2 self-start font-mono text-[10px] uppercase font-bold px-3 py-1.5 rounded-xl border ${
          isFrances || isIngles
            ? "text-[#1a365d]/85 bg-slate-100 border-[#1a365d]/20" 
            : isPortugues
              ? "text-[#009739] bg-[#f0fcf2] border-[#009739]/20"
              : "text-gray-400 bg-[#11141d]/75 border-gray-850"
        }`}>
          <span>ID de Curso: {course.id}</span>
          <span>•</span>
          <span className={isMotos ? "text-[#f97316]" : (isFrances || isIngles) ? "text-[#1a365d] animate-pulse" : isPortugues ? "text-[#009739] animate-pulse" : "text-neon-lime"}>
            {isFrances || isIngles ? "Academia Activa" : isPortugues ? "Inmersión Activa" : "Sincronización Cloud Activa"}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className={`h-10 w-10 rounded-full border-4 animate-spin ${
            isMotos 
              ? "border-gray-800 border-t-[#f97316]" 
              : (isFrances || isIngles) 
                ? "border-[#ebd9cc] border-t-[#1a365d]" 
                : isPortugues
                  ? "border-emerald-100 border-t-[#009739]"
                  : "border-gray-800 border-t-[#ff7f7f]"
          }`} />
          <p className={`text-xs font-mono tracking-widest uppercase ${
            isMotos ? "text-[#f97316]" : (isFrances || isIngles) ? "text-[#1a365d]" : isPortugues ? "text-[#009739]" : "text-[#ff7f7f]"
          }`}>
            Cargando entorno de Sala de Aprendizaje...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Cinema Screen Panel (Left Column) */}
          <div className="lg:col-span-2 space-y-6 text-left">
            
            {/* Header Area */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`rounded border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                  isMotos
                    ? "bg-[#f97316]/10 border-[#f97316]/40 text-[#f97316]"
                    : (isFrances || isIngles)
                    ? "bg-[#1a365d]/10 border-[#1a365d]/30 text-[#1a365d]"
                    : isPortugues
                    ? "bg-[#009739]/10 border-[#009739]/30 text-[#009739]"
                    : "bg-[#ff7f7f]/10 border-[#f43f5e]/40 text-[#ff6b6b]"
                }`}>
                  {isMotos ? "Mecánica Avanzada · Elite" : (isFrances || isIngles) ? "Curso Académico · Inmersión de Idiomas" : isPortugues ? "Masterclass · Inmersión Rápida" : "Detalle del Curso Premium"}
                </span>
                <span className={`font-mono text-[10px] flex items-center gap-1 ${(isFrances || isIngles) ? "text-[#1a365d]/85" : isPortugues ? "text-[#0a4d1f]/85" : "text-slate-600 dark:text-gray-400"}`}>
                  <Clock className={`h-3 w-3 ${isMotos ? "text-[#f97316]" : (isFrances || isIngles) ? "text-[#1a365d]" : isPortugues ? "text-[#009739]" : "text-[#ff7f7f]"}`} /> {course.total_lessons} Clases de Alta Definición
                </span>
              </div>
              <h1 className={`text-2xl md:text-3.5xl font-extrabold tracking-tight leading-tight ${(isFrances || isIngles) ? "text-[#1a365d]" : isPortugues ? "text-[#063f1d]" : "text-slate-900 dark:text-white"}`}>
                {course.title}
              </h1>
              
              {/* Brief Executive Info Block */}
              <div className={`rounded-xl border p-3.5 md:p-5 mt-1.5 md:mt-2 shadow-inner ${
                isMotos
                  ? "border-[#f97316]/20 dark:border-[#f97316]/30 bg-orange-50/50 dark:bg-black/60 shadow-inner"
                  : (isFrances || isIngles)
                  ? "border-slate-200 bg-slate-100/50 shadow-sm"
                  : isPortugues
                  ? "border-[#009739]/20 bg-[#f1fcf3]/60 shadow-sm"
                  : course.id === "virtual-dj-basics"
                  ? "border-[#1ed760]/20 dark:border-[#1ed760]/30 bg-emerald-50/50 dark:bg-black/60 shadow-inner"
                  : "border-slate-205 dark:border-gray-800/80 bg-slate-100/50 dark:bg-[#11141d]/60"
              }`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                  <div className="flex-1">
                    <p className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                      isMotos ? "text-[#f97316]" : (isFrances || isIngles) ? "text-[#1a365d]" : isPortugues ? "text-[#009739]" : course.id === "virtual-dj-basics" ? "text-[#1ed760]" : "text-[#ff7f7f]"
                    }`}>
                      Resumen Ejecutivo
                    </p>
                    <p className={`text-xs md:text-sm mt-1 leading-relaxed font-sans ${(isFrances || isPortugues || isIngles) ? "text-slate-900 font-medium" : "text-slate-800 dark:text-gray-300"}`}>
                      {finalBriefInfo}
                    </p>
                  </div>
                  {isPortugues && (
                    <div className="hidden md:block md:w-64 border-t md:border-t-0 md:border-l border-[#009739]/20 pt-4 md:pt-0 md:pl-6 shrink-0 text-left">
                      <p className="text-xs font-mono uppercase tracking-widest text-[#009739] font-bold mb-3 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 animate-pulse text-[#FEDD00]" /> Focos Brasileños
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-[#063f1d] font-medium">
                        <li className="flex items-start gap-1.5">
                          <Plane className="h-3.5 w-3.5 text-[#009739] shrink-0 mt-0.5" />
                          <span>Pronunciación y Nasales</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Music className="h-3.5 w-3.5 text-[#009739] shrink-0 mt-0.5" />
                          <span>Adiós al 'Portuñol'</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Compass className="h-3.5 w-3.5 text-[#009739] shrink-0 mt-0.5" />
                          <span>Frases de Supervivencia</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {isFrances && (
                    <div className="hidden md:block md:w-64 border-t md:border-t-0 md:border-l border-[#1a365d]/20 pt-4 md:pt-0 md:pl-6 shrink-0 text-left">
                      <p className="text-xs font-mono uppercase tracking-widest text-[#1a365d] font-bold mb-3 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 animate-pulse" /> Focos de Estudio
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-gray-800">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#1a365d] font-bold font-mono">1.</span>
                          <span>Fonética Francesa</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#1a365d] font-bold font-mono">2.</span>
                          <span>Estructuras y Verbos</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#1a365d] font-bold font-mono">3.</span>
                          <span>Conversación Fluida</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {isIngles && (
                    <div className="hidden md:block md:w-64 border-t md:border-t-0 md:border-l border-[#1a365d]/20 pt-4 md:pt-0 md:pl-6 shrink-0 text-left">
                      <p className="text-xs font-mono uppercase tracking-widest text-[#e63946] font-bold mb-3 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 animate-pulse text-[#e63946]" /> Focos de Estudio
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-gray-800">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#e63946] font-bold font-mono">1.</span>
                          <span>Fundamentos y Estructura</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#e63946] font-bold font-mono">2.</span>
                          <span>Listening y Speaking</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#e63946] font-bold font-mono">3.</span>
                          <span>Vocabulario de Viajero</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {course.id === "virtual-dj-basics" && (
                    <div className="hidden md:block md:w-64 border-t md:border-t-0 md:border-l border-[#1ed760]/20 pt-4 md:pt-0 md:pl-6 shrink-0 text-left">
                      <p className="text-xs font-mono uppercase tracking-widest text-[#1ed760] font-bold mb-3 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 animate-pulse" /> Puntos Clave
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-800 dark:text-gray-200">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#1ed760] font-bold">1.</span>
                          <span>Interfaz de Decks</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#1ed760] font-bold">2.</span>
                          <span>El Mixer y EQ</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#1ed760] font-bold">3.</span>
                          <span>Crossfader y Loops</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {isMotos && (
                    <div className="hidden md:block md:w-64 border-t md:border-t-0 md:border-l border-[#f97316]/20 pt-4 md:pt-0 md:pl-6 shrink-0 text-left">
                      <p className="text-xs font-mono uppercase tracking-widest text-[#f97316] font-bold mb-3 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 animate-pulse" /> Focos Técnicos
                      </p>
                      <ul className="space-y-2 text-xs md:text-sm text-slate-800 dark:text-gray-200">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#f97316] font-bold">1.</span>
                          <span>Funcionamiento de Motores</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#f97316] font-bold">2.</span>
                          <span>Sistemas de Encendido</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#f97316] font-bold">3.</span>
                          <span>Carburación e Inyección</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!isOwned ? (
              /* Locked Content Cover */
              <div className={`relative aspect-video w-full rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-5 shadow-inner overflow-hidden border ${
                isFrances || isIngles
                  ? "bg-slate-100 border-dashed border-[#1a365d]/30" 
                  : isPortugues
                    ? "bg-[#f1fcf3]/80 border-dashed border-[#009739]/35"
                    : "bg-slate-50 dark:bg-[#11141d] border-dashed border-slate-205 dark:border-gray-850 shadow-xl dark:shadow-2xl"
              }`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,54,93,0.03),transparent)] pointer-events-none" />
                <div className={`h-14 w-14 rounded-full flex items-center justify-center ${
                  isFrances || isIngles
                    ? "bg-[#1a365d]/10 border border-[#1a365d]/30 text-[#1a365d]" 
                    : isPortugues
                      ? "bg-[#009739]/10 border border-[#009739]/30 text-[#009739]"
                      : "bg-[#f43f5e]/10 border border-[#f43f5e]/30 text-[#ff6b6b] animate-pulse"
                }`}>
                  <Lock className="h-6 w-6" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className={`text-lg font-black ${isFrances || isIngles ? "text-[#1a365d]" : isPortugues ? "text-[#063f1d]" : "text-slate-900 dark:text-white"}`}>Sesiones Académicas Bloqueadas</h3>
                  <p className={`text-xs leading-relaxed ${isFrances || isIngles ? "text-[#1a365d]/85" : isPortugues ? "text-[#0a4d1f]/85" : "text-slate-700 dark:text-gray-400"}`}>
                    Aún no cuentas con este programa en tu catálogo de estudio. Matricúlate de forma vitalicia para reproducir las lecciones de {course.instructor} y contar con soporte de Tutoría IA.
                  </p>
                </div>
                <button
                  onClick={() => onBuy(course.id)}
                  className={`rounded-xl hover:scale-[1.02] px-6 py-3 text-xs font-black shadow-md transition-all flex items-center gap-2 ${
                    isMotos 
                      ? "bg-[#f97316] text-white" 
                      : (isFrances || isIngles) 
                        ? "bg-[#e63946] text-[#fdfaf4] hover:bg-[#c92a3a]" 
                        : isPortugues
                          ? "bg-[#009739] text-[#fcfdfa] hover:bg-[#007f30]"
                          : "bg-neon-lime text-black"
                  }`}
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> Matricularse y Desbloquear por $1.500 ARS
                </button>
              </div>
            ) : (
              /* Immersive Live Cinema Player */
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* LEFT SIDEBAR: If isFrances or isIngles, show Progreso de Lecciones */}
                  {(isFrances || isIngles) && playlistVideos.length > 0 && (
                    <div className={`md:col-span-4 flex flex-col justify-between rounded-3xl border p-4 space-y-4 text-left font-sans shadow-sm ${
                      isFrances 
                        ? "border-[#1a365d]/20 bg-[#f4efe6]/80 text-[#1a365d]" 
                        : "border-slate-200 bg-slate-100/90 text-[#1a365d]"
                    }`}>
                      <div className={`border-b pb-2.5 font-sans ${isFrances ? "border-[#1a365d]/20" : "border-slate-200"}`}>
                        <p className="text-[10px] font-mono font-black uppercase tracking-widest text-[#1a365d]">
                          Progreso de Lecciones
                        </p>
                        <h4 className="text-xs font-bold text-[#1a365d]/70 mt-1">
                          {isFrances ? "Inmersión en 3 Niveles" : "Dominio Global (2 Partes)"}
                        </h4>
                      </div>

                      <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
                        {playlistVideos.map((vid, idx) => {
                          const isSelected = vid.id === selectedVideoId;
                          return (
                            <button
                              key={vid.id}
                              onClick={() => setSelectedVideoId(vid.id)}
                              className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-250 flex items-center justify-between gap-3 text-xs ${
                                isSelected
                                  ? "bg-[#1a365d] border-[#1a365d] text-white font-black shadow-md"
                                  : isFrances
                                    ? "bg-[#fefdfb] border-[#1a365d]/12 text-[#1a365d] hover:bg-[#ebd9cc]/30"
                                    : "bg-white border-slate-200 text-[#1a365d] hover:bg-slate-200/50"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`flex h-6.5 w-6.5 items-center justify-center rounded-xl text-[10px] font-mono font-black shrink-0 ${
                                  isSelected
                                    ? isFrances
                                      ? "bg-white text-[#1a365d]"
                                      : "bg-[#e63946] text-white"
                                    : isFrances
                                      ? "bg-[#ebd9cc] text-[#1a365d]"
                                      : "bg-slate-200 text-[#1a365d]"
                                }`}>
                                  L{idx + 1}
                                </div>
                                <div className="truncate text-left leading-tight">
                                  <p className="text-[9px] font-bold uppercase tracking-wide opacity-80">Parte {idx + 1}</p>
                                  <span className="truncate block font-semibold">{vid.title.replace("Parte " + (idx+1) + ": ", "")}</span>
                                </div>
                              </div>
                              <div className="shrink-0 flex items-center justify-center">
                                <CheckCircle className={`h-4.5 w-4.5 ${
                                  isSelected
                                    ? "text-white"
                                    : "text-[#1a365d]/40"
                                }`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className={`p-3 rounded-2xl border text-[10px] leading-relaxed font-sans ${
                        isFrances 
                          ? "bg-[#ebd9cc]/30 border-[#1a365d]/10 text-[#1a365d]/85" 
                          : "bg-slate-200/40 border-slate-200 text-[#1a365d]/80"
                      }`}>
                        💡 Las lecciones cargan de forma instantánea al actualizar los niveles en esta barra lateral izquierda.
                      </div>
                    </div>
                  )}

                  <div className={`${(playlistVideos.length > 0 && !isPortugues) ? "md:col-span-8" : "md:col-span-12"} space-y-4`}>
                    <div className={`relative aspect-video w-full overflow-hidden rounded-3xl bg-black border transition-all duration-500 group ${
                      isFrances || isIngles
                        ? "border-[#1a365d]/35 shadow-[#1a365d]/5 shadow-xl"
                        : isMotos
                        ? "border-[#f97316]/40 shadow-[0_0_30px_rgba(249,115,22,0.25)]"
                        : isPortugues
                        ? "border-[#009739]/35 shadow-[0_0_25px_rgba(0,151,57,0.12)] bg-[#031d0b]"
                        : course.id === "virtual-dj-basics"
                        ? "border-[#1ed760]/40 shadow-[0_0_30px_rgba(30,215,96,0.25)]"
                        : "border-gray-800 shadow-2xl"
                    }`}>
                      {/* Glass Glare */}
                      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />
                      
                      {embedVideoUrl ? (
                        <iframe
                           src={embedVideoUrl}
                          title={activePlaylistVideo ? activePlaylistVideo.title : course.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full border-0 absolute inset-0 rounded-3xl"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs p-6">
                          No se cargó URL de transmisión. Intenta sembrar Firestore de nuevo en la base del catálogo.
                        </div>
                      )}
                    </div>

                    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border text-xs ${
                      isFrances || isIngles
                        ? "bg-slate-100 border-[#1a365d]/18 text-[#1a365d]" 
                        : isPortugues
                          ? "bg-[#f0fcf2] border-[#009739]/18 text-[#0a4d1f]"
                          : "bg-[#0d0f14]/80 border-gray-850 text-gray-400"
                    }`}>
                      <div className="flex items-center gap-2">
                        <UserCheck className={`h-4 w-4 ${isFrances || isIngles ? "text-[#1a365d]" : isMotos ? "text-[#f97316]" : isPortugues ? "text-[#009739]" : "text-neon-lime"}`} />
                        <span>Clase autorizada para: <strong>Estudiante Registrado</strong></span>
                      </div>
                      <div className={`flex items-center gap-1 text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded border ${
                        isFrances || isIngles
                          ? "bg-[#ebd9cc] text-[#1a365d] border-[#1a365d]/10" 
                          : isPortugues
                            ? "bg-[#FEDD00]/20 text-[#009739] border-[#009739]/10"
                            : "bg-gray-950 border-gray-850 text-neon-cyan"
                      }`}>
                        <Volume2 className="h-3.5 w-3.5 shrink-0" /> Audio Limpio Multicanal
                      </div>
                    </div>
                  </div>

                  {/* STANDARD RIGHT SIDEBAR (only if playlist exists and it's NOT French, NOT English and NOT Portuguese) */}
                  {!isFrances && !isIngles && !isPortugues && playlistVideos.length > 0 && (
                    <div className="md:col-span-4 flex flex-col justify-between rounded-3xl border border-slate-205 dark:border-gray-800/80 bg-slate-50 dark:bg-[#11141d]/85 p-4 space-y-4 text-left font-sans">
                      <div className="border-b border-gray-850 pb-2.5">
                        <p className={`text-[9px] font-mono font-black uppercase tracking-widest ${isMotos ? "text-[#f97316]" : "text-[#1ed760]"}`}>
                          Curso Multi-Parte ({playlistVideos.length} Sesiones)
                        </p>
                        <h4 className="text-xs font-bold text-slate-705 dark:text-gray-400 mt-1">Playlist de Clases</h4>
                      </div>

                      <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1">
                        {playlistVideos.map((vid) => {
                          const isSelected = vid.id === selectedVideoId;
                          return (
                            <button
                              key={vid.id}
                              onClick={() => setSelectedVideoId(vid.id)}
                              className={`w-full text-left p-3 rounded-2xl border transition-all duration-250 flex items-center justify-between gap-3 text-xs ${
                                isSelected
                                  ? isMotos
                                    ? "bg-[#f97316]/15 border-[#f97316]/50 text-slate-900 dark:text-white font-extrabold animate-pulse"
                                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-white font-bold"
                                  : "bg-slate-100 dark:bg-gray-950/40 border-slate-200 dark:border-gray-900/80 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-gray-850"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-mono font-bold shrink-0 ${
                                  isSelected
                                    ? isMotos
                                      ? "bg-[#f97316] text-white"
                                      : "bg-neon-lime text-black"
                                    : "bg-slate-205 dark:bg-gray-850 text-slate-500 dark:text-gray-500"
                                }`}>
                                  {vid.id.toUpperCase()}
                                </div>
                                <span className="truncate leading-tight">{vid.title}</span>
                              </div>
                              <div className="shrink-0 flex items-center justify-center">
                                <ShieldCheck className={`h-4 w-4 ${
                                  isSelected
                                    ? isMotos
                                      ? "text-[#f97316]"
                                      : "text-neon-lime"
                                    : "text-gray-600"
                                }`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="bg-slate-100 dark:bg-[#0c0d13] p-3 rounded-2xl border border-slate-200 dark:border-gray-850 text-[10px] text-slate-700 dark:text-gray-400 leading-relaxed">
                        💡 Haz clic en cualquier parte de la playlist para actualizar instantáneamente las clases técnicas.
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* Course Resources Download area */}
            <div className={`rounded-3xl border p-6 space-y-4 font-sans ${
              isFrances || isIngles
                ? "bg-[#fefeaf]/5 border-slate-200" 
                : isPortugues
                ? "bg-[#f1fcf3]/60 border-[#009739]/18"
                : "border-slate-200 dark:border-gray-800/80 bg-slate-50 dark:bg-[#11141d]/40"
            }`}>
              <div className={`flex items-center justify-between border-b pb-3 ${
                isFrances || isIngles ? "border-slate-200" : isPortugues ? "border-[#009739]/25" : "border-slate-205 dark:border-gray-850"
              }`}>
                <div className="flex items-center gap-2">
                  <Layers className={`h-5 w-5 ${isFrances || isIngles ? "text-[#1a365d]" : isMotos ? "text-[#f97316]" : isPortugues ? "text-[#009739]" : "text-neon-lime"}`} />
                  <h3 className={`text-base font-bold ${isFrances || isIngles ? "text-[#1a365d]" : isPortugues ? "text-[#063f1d]" : "text-slate-900 dark:text-white"}`}>Recursos de Aprendizaje Desbloqueados</h3>
                </div>
                <span className={`text-[10px] font-mono font-bold uppercase border px-2.5 py-0.5 rounded-lg ${
                  isMotos 
                    ? "bg-[#f97316]/10 border-[#f97316]/35 text-[#f97316]" 
                    : isFrances || isIngles
                    ? "bg-[#1a365d]/10 border-[#1a365d]/35 text-[#1a365d]"
                    : isPortugues
                    ? "bg-[#009739]/10 border-[#009739]/35 text-[#009739]"
                    : "bg-[#ff7f7f]/10 border-[#f43f5e]/20 text-[#ff7f7f]"
                }`}>
                  Material Descargable
                </span>
              </div>

              {/* Dynamic list rendering */}
              <div className="space-y-3">
                {(isMotos ? [
                  {
                    id: "moto-res-1",
                    title: "Manual Completo de Despiece de Motores 2T y 4T (PDF)",
                    description: "Diagramas técnicos detallados, torque de espárragos, calibración de válvulas de admisión y escape, y tolerancias de fabricante.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Manual_Despiece_Torques_Motores.pdf",
                    type: "pdf"
                  },
                  {
                    id: "moto-res-2",
                    title: "Diagrama Eléctrico de Motocicletas (PDF)",
                    description: "Guía a todo color del circuito del alternador, regulador de voltaje, módulo CDI, sistema de encendido y cableado del alternador.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Diagrama_Electrico_Motos_CDI.pdf",
                    type: "pdf"
                  }
                ] : isFrances ? [
                  {
                    id: "fr-res-1",
                    title: "Guía de Pronunciación Francesa (PDF)",
                    description: "Domina las vocales nasales, consonantes mudas and la liaison para hablar con acento nativo y fluidez.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Guia_Pronunciacion_Francesa.pdf",
                    type: "pdf"
                  },
                  {
                    id: "fr-res-2",
                    title: "Lista de los 100 verbos más usados (PDF)",
                    description: "Compendio esencial con las conjugaciones de être, avoir, aller, faire y los verbos regulares más comunes en presente, pasado y futuro.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Lista_100_Verbos_Mas_Usados_Frances.pdf",
                    type: "pdf"
                  }
                ] : isIngles ? [
                  {
                    id: "en-res-1",
                    title: "Guía de Supervivencia: Inglés para Viajeros (PDF)",
                    description: "Vocabulario de supervivencia fundamental, expresiones idiomáticas clave para aeropuertos, hoteles, restaurantes y direcciones urbanas.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Guia_Supervivencia_Ingles_Viajeros.pdf",
                    type: "pdf"
                  },
                  {
                    id: "en-res-2",
                    title: "Tablas de Tiempos Verbales Esenciales (PDF)",
                    description: "Infografía estructurada comparando el presente simple, pasado simple, presente perfecto y estructuras del futuro de manera práctica y visual.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Tablas_Tiempos_Verbales_Esenciales.pdf",
                    type: "pdf"
                  }
                ] : course.id === "virtual-dj-basics" ? [
                  {
                    id: "vdj-res-1",
                    title: "Guía rápida de Shortcuts de Teclado (PDF)",
                    description: "Optimiza tus tiempos de respuesta con accesos directos clave para disparar efectos, loops directos y hot cues sin usar el mouse.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Guia_Shortcuts_Teclado_VirtualDJ.pdf",
                    type: "pdf"
                  },
                  {
                    id: "vdj-res-2",
                    title: "Pack de Samplers básicos para tu primera mezcla (ZIP)",
                    description: "Colección curada de efectos de sonido acapellas, bocinas (horns) y transiciones cortas de batería listos para cargar en tu sampler de Virtual DJ.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Pack_Samplers_VirtualDJ_Basicos.zip",
                    type: "zip"
                  }
                ] : course.id === "facebook-ads-2025" ? [
                  {
                    id: "fb-res-1",
                    title: "Checklist de Lanzamiento de Campaña 2025 (PDF)",
                    description: "Guía operativa paso a paso para verificar la configuración de tu píxel, audiencias, copys y creativos antes de encender tus anuncios.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Checklist_Lanzamiento_Campaña_2025.pdf",
                    type: "pdf"
                  },
                  {
                    id: "fb-res-2",
                    title: "Plantilla de Cálculo de Retorno de Inversión (Excel)",
                    description: "Calculadora financiera para definir presupuestos de pauta, costo por adquisición (CPA) ideal y ROAS mínimo viable por producto.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Plantilla_Calculo_Retorno_Inversion_2025.xlsx",
                    type: "excel"
                  }
                ] : isPortugues ? [
                  {
                    id: "pt-res-1",
                    title: "Guía de Supervivencia: 50 frases para Brasil (PDF)",
                    description: "El manual imprescindible con saludos rituales, expresiones cotidianas, vocabulario de viaje y frases infalibles para interactuar sanamente.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Guia_Supervivencia_Brasil_50_Frases.pdf",
                    type: "pdf"
                  },
                  {
                    id: "pt-res-2",
                    title: "Diccionario de Falsos Amigos Portugués-Español (PDF)",
                    description: "Evita enredos y momentos vergonzosos. Identifica las palabras que suenan igual pero tienen un significado completamente opuesto.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Diccionario_Falsos_Amigos_Portugues.pdf",
                    type: "pdf"
                  }
                ] : course.id === "instagram-masterclass" ? [
                  {
                    id: "ig-res-1",
                    title: "Guía de Automatización Reels & Embudo por DM (PDF)",
                    description: "Estructura detallada de ganchos de alta retención y flujos de automatización para convertir visualizaciones de Reels a leads calificados por DM.",
                    download_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    file_name: "Guia_Automatizacion_Instagram_Embudo.pdf",
                    type: "pdf"
                  }
                ] : [
                  {
                    id: "gen-res-1",
                    title: `${course.title} - Guía Teórica de Alto Rendimiento (PDF)`,
                    description: "Compendio teórico explicativo, glosarios técnicos y guías suplementarias diseñadas especialmente por el instructor.",
                    download_url: pdfDownloadUrl,
                    file_name: `${course.title.replace(/\s+/g, "_")}_Guia_Doc.pdf`,
                    type: "pdf"
                  }
                ]).map((resource) => (
                  <div key={resource.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border transition-colors gap-4 ${
                    isFrances || isIngles
                      ? "bg-white border-slate-250 hover:border-[#1a365d]/40"
                      : isPortugues
                      ? "bg-[#fcfdfa] border-[#009739]/18 hover:border-[#009739]/40"
                      : "bg-white dark:bg-gray-950/60 border border-slate-205 dark:border-gray-850/70 hover:border-slate-300 dark:hover:border-gray-850"
                  }`}>
                    <div className="flex items-start gap-4 text-left">
                      <div className={`p-3 rounded-xl border ${
                        resource.type === "excel" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-[#10b981]" 
                          : resource.type === "zip"
                          ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                          : isFrances || isIngles
                          ? "bg-[#ebd9cc]/40 border-[#1a365d]/25 text-[#1a365d]"
                          : isPortugues
                          ? "bg-[#f0fbf2] border-[#009739]/20 text-[#009739]"
                          : "bg-rose-500/10 border-rose-500/20 text-[#f43f5e]"
                      }`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold leading-snug ${isFrances || isIngles ? "text-[#1a365d]" : isPortugues ? "text-[#063f1d]" : "text-slate-900 dark:text-white"}`}>
                          {resource.title}
                        </h4>
                        <p className={`text-xs mt-1 leading-relaxed font-sans ${isFrances || isPortugues || isIngles ? "text-slate-800" : "text-slate-750 dark:text-gray-400"}`}>
                          {resource.description}
                        </p>
                      </div>
                    </div>

                    <a
                      href={resource.download_url}
                      download={resource.file_name}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-1.5 shrink-0 rounded-xl px-4.5 py-2.5 text-xs font-bold transition-all w-full sm:w-auto justify-center border ${
                        isFrances || isIngles
                          ? "bg-[#1a365d] hover:bg-[#2b6cb0] border-[#1a365d] text-white"
                          : isPortugues
                          ? "bg-[#009739] hover:bg-[#007f30] border-[#009739] text-[#fcfdfa]"
                          : "bg-slate-100 hover:bg-slate-200 dark:bg-[#1b2234] dark:hover:bg-[#252f47] border border-slate-200 dark:border-gray-850 text-slate-800 dark:text-gray-200 hover:text-[#111] dark:hover:text-white"
                      }`}
                    >
                      <Download className="h-4 w-4" />
                      Descargar
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive AI Assistant Sidebar (Right Column) */}
          <div className="lg:col-span-1 h-[600px] lg:h-[calc(100vh-160px)] min-h-[500px]">
            <GeminiChat
              courseId={course.id}
              courseTitle={course.title}
              aiInstruction={activeInstruction}
              currentLessonTitle={activePlaylistVideo ? activePlaylistVideo.title : (course.syllabus[0]?.lessons[0]?.title || "Introducción")}
              isAcademicTheme={isFrances || isPortugues || isIngles}
            />
          </div>

        </div>
      )}

    </div>
  );
};
