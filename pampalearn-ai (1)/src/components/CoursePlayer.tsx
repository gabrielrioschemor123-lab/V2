import React, { useState, useEffect, useRef } from "react";
import { Course, Lesson, ChatMessage } from "../types";
import { ChevronLeft, Send, Sparkles, AlertCircle, RotateCcw, Video, List, MessagesSquare, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CoursePlayerProps {
  course: Course;
  onBack: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, onBack }) => {
  // Find first lesson for initial load
  const firstLesson = course.syllabus[0]?.lessons[0];
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(firstLesson || null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Tutor welcome message when lesson changes
  useEffect(() => {
    if (currentLesson) {
      setChatMessages([
        {
          role: "model",
          content: `¡Hola! Soy tu **Tutor de IA** para el curso *"${course.title}"*. 
          
He cargado el contexto técnico para la lección de hoy: **"${currentLesson.title}"** ("${currentLesson.duration}").

¿Tienes alguna duda sobre este tema, necesitas una explicación paso a paso o quieres recomendaciones de práctica/seguridad? ¡Pregúntame con confianza!`,
          timestamp: new Date()
        }
      ]);
      setApiError(null);
    }
  }, [currentLesson, course.title]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isSending]);

  const toggleLessonCompletion = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending || !currentLesson) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsSending(true);
    setApiError(null);

    // Prepare history to send to server. Filter out initial welcome if wanted, but standard keeps conversation context
    const currentHistory = chatMessages.map((m) => ({
      role: m.role,
      content: m.content
    }));

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          history: currentHistory,
          contextCourse: course.title,
          contextLesson: currentLesson.title
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ocurrió un error al contactar al tutor.");
      }

      const data = await response.json();
      
      const machineMsg: ChatMessage = {
        role: "model",
        content: data.reply,
        timestamp: new Date()
      };

      setChatMessages((prev) => [...prev, machineMsg]);
    } catch (err: any) {
      console.error(err);
      
      // Handle missing API key or connection failures gracefully for a bulletproof UX
      const fallbackMsg: ChatMessage = {
        role: "model",
        content: `⚠️ **[Modo de Emergencia Activado]** No se pudo comunicar con el servidor de la API de Gemini (Verifica que la variable \`GEMINI_API_KEY\` esté configurada en los Secrets del entorno).
        
Para garantizar que tu experiencia continúe perfecta, aquí tienes una respuesta de orientación general sobre **"${currentLesson.title}"**:
        
1. **Consejo del Tutor de IA**: Asegúrate de repasar detenidamente este tema. Si es sobre oficios, implementa con mucho cuidado las normas de seguridad (EPP, guantes, gafas). Si es sobre fitness, concéntrate en realizar la fase excéntrica lenta (3 segundos) para reclutar apropiadamente el mayor número de fibras intramusculares.
2. ¿Deseas hacer otra pregunta o reinstaurar la conexión?`,
        timestamp: new Date()
      };
      
      setChatMessages((prev) => [...prev, fallbackMsg]);
      setApiError("No se pudo conectar con Gemini API. Asegúrate de configurar GEMINI_API_KEY en Secrets de AI Studio.");
    } finally {
      setIsSending(false);
    }
  };

  const clearChat = () => {
    if (!currentLesson) return;
    setChatMessages([
      {
        role: "model",
        content: `Conversación reiniciada. ¿En qué puedo ayudarte sobre **"${currentLesson.title}"**?`,
        timestamp: new Date()
      }
    ]);
    setApiError(null);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] xl:flex-row gap-6">
      {/* LEFT COLUMN: Player & Syllabus */}
      <div className="flex-1 space-y-6 text-left">
        
        {/* Back Link Group */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver a Cursos Premium
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Progreso:</span>
            <span className="rounded-full bg-[#1b2234] px-3 py-1 font-mono text-[11px] font-bold text-neon-lime">
              {completedLessons.length} / {course.total_lessons} Hechas
            </span>
          </div>
        </div>

        {/* Video Area Container */}
        {currentLesson ? (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-gray-800 shadow-2xl">
              {/* Overlay styling for top control clipping */}
              <div className="absolute top-0 inset-x-0 h-1 z-10 bg-gradient-to-b from-[#0d0f14] to-transparent pointer-events-none" />
              
              <iframe
                src={currentLesson.video_drive_url}
                title={currentLesson.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0 absolute inset-0"
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-2 border-b border-gray-850">
              <div>
                <span className="text-xs font-mono text-neon-cyan uppercase font-bold tracking-wider">
                  Reproduciendo Ahora · Unidad Instructiva
                </span>
                <h2 className="text-xl font-extrabold text-white mt-0.5">
                  {currentLesson.title}
                </h2>
              </div>

              <div>
                <button
                  onClick={() => toggleLessonCompletion(currentLesson.id)}
                  className={`flex items-center gap-2 rounded-xl text-xs font-bold px-4 py-2.5 transition-all ${
                    completedLessons.includes(currentLesson.id)
                      ? "bg-emerald-950/40 border border-emerald-500 text-neon-lime"
                      : "bg-[#1f2937]/70 text-gray-300 border border-gray-800 hover:bg-[#1f2937]"
                  }`}
                >
                  <CheckCircle className={`h-4.5 w-4.5 ${completedLessons.includes(currentLesson.id) ? "text-neon-lime fill-neon-lime" : ""}`} />
                  {completedLessons.includes(currentLesson.id) ? "Clase Completada!" : "Marcar como Completada"}
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              En esta sección estarás acompañado por material gráfico y nuestro Tutor de IA interactivo de la derecha. El reproductor optimiza el ancho de banda dinámicamente. Al finalizar la lección puedes resolver dudas o pedir casos prácticos avanzados al tutor.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-800 bg-[#11141d]/50 p-20 text-center text-gray-500">
            Selecciona una lección del temario para iniciar la transmisión.
          </div>
        )}

        {/* Syllabus Module List */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <List className="h-5 w-5 text-neon-cyan" /> Temario del Programa Académico
          </h3>

          <div className="space-y-4">
            {course.syllabus.map((mod) => (
              <div key={mod.id} className="rounded-xl border border-gray-800 bg-[#11141d] overflow-hidden">
                <div className="bg-[#151925] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                  <h4 className="text-xs font-extrabold font-display uppercase tracking-wider text-gray-300">
                    {mod.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {mod.lessons.length} clases
                  </span>
                </div>

                <div className="divide-y divide-gray-800/50">
                  {mod.lessons.map((les) => {
                    const isSelected = currentLesson?.id === les.id;
                    const isCompleted = completedLessons.includes(les.id);
                    return (
                      <button
                        key={les.id}
                        onClick={() => setCurrentLesson(les)}
                        className={`w-full text-left flex items-center justify-between px-4 py-3.5 transition-colors ${
                          isSelected
                            ? "bg-[#181f30] text-neon-cyan"
                            : "hover:bg-[#131824] text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle
                            onClick={(e) => {
                              // Prevent activating selector when checkmark is toggled directly
                              e.stopPropagation();
                              toggleLessonCompletion(les.id);
                            }}
                            className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                              isCompleted
                                ? "text-neon-lime fill-[#0a0f12]"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          />
                          <span className={`text-xs font-semibold ${isSelected ? "text-neon-cyan" : "text-gray-300"}`}>
                            {les.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-gray-500 font-semibold bg-[#0d0f14] px-2 py-0.5 rounded border border-gray-800/45">
                            {les.duration}
                          </span>
                          <ArrowRight className={`h-3 w-3 text-gray-500 transition-transform ${isSelected ? "translate-x-1" : "group-hover:translate-x-0.5"}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: AI Tutor Interactive Chat */}
      <div className="w-full xl:w-[420px] shrink-0 border border-gray-800 rounded-3xl bg-[#11141d] flex flex-col h-[650px] xl:h-[calc(100vh-120px)] relative overflow-hidden shadow-2xl">
        
        {/* Tutor Header */}
        <div className="bg-[#151a26] border-b border-gray-800 px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0d0f14]">
                <Sparkles className="h-4.5 w-4.5 text-neon-lime animate-pulse" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                Tutor de IA Inteligente
              </h4>
              <p className="text-[10px] font-mono tracking-wide text-neon-lime uppercase font-semibold">
                Activo · Gemini 3.5 Flash
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            title="Reiniciar chat"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Api Missing Warning Banner if applicable */}
        {apiError && (
          <div className="bg-amber-950/40 border-b border-amber-500/30 px-4 py-2.5 flex items-start gap-2 text-left">
            <AlertCircle className="h-4 w-4 text-neon-orange shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-300 leading-normal">
              Usando respuestas tutor de respaldo. Puedes habilitar respuestas de red configurando la clave API en secrets.
            </p>
          </div>
        )}

        {/* Message Panel Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin text-left">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-tr from-[#134e4a] to-emerald-900 border border-teal-800/50 text-white rounded-br-none"
                    : "bg-[#161c28]/90 border border-gray-800/80 text-gray-100 rounded-bl-none shadow-sm shadow-black/10"
                }`}
              >
                {/* Formatted Text rendering to emulate Markdown simply */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.content.split("\n\n").map((para, pIdx) => {
                    // Simple replacement of markdown patterns like **bold** and *italic* and `code`
                    let formatted = para;
                    
                    // Bold replacer
                    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    // Italic replacer
                    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    // Code block or bullet lists
                    formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-gray-950 text-neon-cyan px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>');
                    
                    // List replacer
                    if (para.trim().startsWith("- ") || para.trim().startsWith("1. ")) {
                      const listItems = para.split("\n");
                      return (
                        <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1">
                          {listItems.map((item, liIdx) => {
                            let itemFormatted = item.replace(/^(-\s*|\d+\.\s*)/, "");
                            itemFormatted = itemFormatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                            itemFormatted = itemFormatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
                            itemFormatted = itemFormatted.replace(/`(.*?)`/g, '<code class="bg-gray-950 text-neon-cyan px-1 py-0.5 rounded font-mono text-[9px]">$1</code>');
                            return (
                              <li key={liIdx} dangerouslySetInnerHTML={{ __html: itemFormatted }} />
                            );
                          })}
                        </ul>
                      );
                    }

                    return (
                      <p
                        key={pIdx}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                      />
                    );
                  })}
                </div>
                
                <span className="block mt-1.5 text-[9px] text-gray-500 text-right uppercase font-mono font-bold">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-[#161c28]/90 border border-gray-800 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="h-1.5 w-1.5 bg-neon-lime rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="h-1.5 w-1.5 bg-neon-lime rounded-full animate-bounce" style={{ animationDelay: '155ms' }} />
                  <div className="h-1.5 w-1.5 bg-neon-lime rounded-full animate-bounce" style={{ animationDelay: '310ms' }} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                  Tutor analizando...
                </span>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Message Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 border-t border-gray-800 bg-[#141822]/90 flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSending || !currentLesson}
            placeholder={
              currentLesson 
                ? "Pregunta sobre esta lección..." 
                : "Selecciona una lección para chatear..."
            }
            className="flex-1 rounded-xl bg-[#090b11] border border-gray-800 px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-lime transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isSending || !currentLesson}
            className="rounded-xl bg-neon-lime p-2.5 text-[#0d0f14] hover:scale-103 transition-all disabled:opacity-30 flex items-center justify-center shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
