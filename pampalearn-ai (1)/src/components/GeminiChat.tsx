import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, RefreshCw, AlertCircle, CircleDashed, Copy, Check } from "lucide-react";

interface GeminiChatProps {
  courseId: string;
  courseTitle: string;
  aiInstruction?: string;
  currentLessonTitle?: string;
  isAcademicTheme?: boolean;
}

export const GeminiChat: React.FC<GeminiChatProps> = ({
  courseId,
  courseTitle,
  aiInstruction,
  currentLessonTitle = "Introducción",
  isAcademicTheme = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const bottomChatRef = useRef<HTMLDivElement | null>(null);

  // Initialize helper welcome chat
  useEffect(() => {
    setMessages([
      {
        role: "model",
        content: `¡Hola! Soy tu **Asistente Especializado** para el curso *"${courseTitle}"*. 
        
Estoy listo para responder tus dudas técnicas sobre el contenido de esta sesión${currentLessonTitle ? ` (**"${currentLessonTitle}"**)` : ""}. ¿En qué te gustaría profundizar hoy?`,
        timestamp: new Date(),
      }
    ]);
    setErrorText(null);
  }, [courseId, courseTitle, currentLessonTitle]);

  // Handle scrolling to bottom
  useEffect(() => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);
    setErrorText(null);

    // Filter and map conversation history
    const historyPayload = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: historyPayload,
          contextCourse: courseTitle,
          contextLesson: currentLessonTitle,
          customInstruction: aiInstruction, // Firestore-derived tutoring personality
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Ocurrió un error al contactar al asistente de IA.");
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        role: "model",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Gemini Assistant Failure:", err);
      
      const emergencyResponse: ChatMessage = {
        role: "model",
        content: `⚠️ **[Conexión Limitada]** No se pudo obtener respuesta del servidor en tiempo real. 
        
Asegúrate de que la variable de entorno \`GEMINI_API_KEY\` esté configurada correctamente en el panel de Secrets de tu entorno académico.
        
Mientras se restablece, ten en cuenta esta pauta para el curso *"${courseTitle}"*:
- Revisa rigurosamente las técnicas mostradas en el video.
- Realiza anotaciones detalladas y prueba las fórmulas/estrategias de forma incremental para consolidar tus habilidades.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, emergencyResponse]);
      setErrorText("Interrupción de red. Asegúrate de registrar tu GEMINI_API_KEY.");
    } finally {
      setIsSending(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "model",
        content: `Sesión de chat reiniciada. ¿Qué preguntas tienes acerca de *"${courseTitle}"*?`,
        timestamp: new Date(),
      }
    ]);
    setErrorText(null);
  };

  const handleCopyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }).catch(err => {
      console.error("No se pudo copiar el texto:", err);
    });
  };

  const isPortTheme = courseId === "portugues-principiantes";

  return (
    <div 
      className={`flex flex-col h-full border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300 ${
        isPortTheme
          ? "border-[#009739]/25 bg-[#fcfdfa] text-[#063f1d]"
          : isAcademicTheme 
            ? "border-[#1a365d]/25 bg-[#fdfaf4] text-[#1a365d]" 
            : "border-slate-200 dark:border-gray-800/80 bg-white dark:bg-[#11141d]/90 text-slate-900 dark:text-white"
      }`} 
      id={`gemini-sidebar-${courseId}`}
    >
      {/* Sidebar Header */}
      <div className={`px-4 py-3.5 flex items-center justify-between border-b ${
        isPortTheme
          ? "bg-[#009739] border-[#009739]/20 text-[#fcfdfa]"
          : isAcademicTheme
            ? "bg-[#1a365d] border-[#1a365d]/20 text-[#fdfaf4]"
            : "bg-slate-50 dark:bg-[#151a26]/90 border-slate-205 dark:border-gray-850 text-slate-900 dark:text-white"
      }`}>
        <div className="flex items-center gap-2.5">
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-xl p-0.5" 
            style={{ 
              background: isPortTheme
                ? "linear-gradient(135deg, #009739 0%, #063f1d 100%)"
                : isAcademicTheme 
                  ? "linear-gradient(135deg, #2b6cb0 0%, #1a365d 100%)" 
                  : "linear-gradient(135deg, #ff7f7f 0%, #f43f5e 100%)" 
            }}
          >
            <div className={`flex h-full w-full items-center justify-center rounded-[10px] ${isPortTheme ? "bg-[#fcfdfa]" : isAcademicTheme ? "bg-[#fdfaf4]" : "bg-[#0d0f14]"}`}>
              <Sparkles className={`h-4 w-4 ${isPortTheme ? "text-[#009739]" : isAcademicTheme ? "text-[#1a365d]" : "text-[#ff7f7f] animate-pulse"}`} />
            </div>
          </div>
          <div className="text-left">
            <h4 className={`text-xs font-black tracking-wide text-slate-900 dark:text-white`}>
              {isPortTheme ? "Tutor de Portugués IA" : isAcademicTheme ? "Tutor de Francés IA" : "Tutor Personal IP"}
            </h4>
            <p className={`text-[9px] font-mono tracking-wider font-bold uppercase ${isPortTheme ? "text-[#FEDD00]" : isAcademicTheme ? "text-sky-200" : "text-red-500 dark:text-[#ff7f7f]"}`}>
              {isPortTheme ? "Inmersión Rápida" : isAcademicTheme ? "Inmersión Lingüística" : "Gemini 3.5 Flash · Especializado"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetChat}
          className={`rounded-lg p-1.5 transition-colors ${
            isPortTheme
              ? "text-emerald-100 hover:bg-[#007f30] hover:text-white"
              : isAcademicTheme 
                ? "text-sky-100 hover:bg-[#2b6cb0] hover:text-white" 
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-905 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          }`}
          title="Reiniciar conversación"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Warning banner */}
      {errorText && (
        <div className={`px-4 py-2 flex items-start gap-2 border-b text-left ${
          isPortTheme
            ? "bg-[#f0fbf2] border-emerald-200"
            : isAcademicTheme 
              ? "bg-[#fffbeb] border-amber-200" 
              : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30"
        }`}>
          <AlertCircle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isPortTheme ? "text-[#009739]" : isAcademicTheme ? "text-amber-600" : "text-red-500 dark:text-rose-405"}`} />
          <p className={`text-[10px] leading-relaxed font-medium ${isPortTheme ? "text-[#063f1d]" : isAcademicTheme ? "text-amber-800" : "text-rose-950 dark:text-rose-300"}`}>
            Por favor, revisa tus Secrets en AI Studio para activar las respuestas completas de la IA.
          </p>
        </div>
      )}

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin text-left">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed border ${
                m.role === "user"
                  ? isPortTheme
                    ? "bg-[#e2fce6] border-[#009739]/10 text-[#063f1d] rounded-br-none"
                    : isAcademicTheme
                      ? "bg-[#e2eafc] border-[#1a365d]/10 text-[#1a365d] rounded-br-none"
                      : "bg-slate-100 dark:bg-[#1f2937]/95 border-slate-205 dark:border-gray-700/50 text-slate-900 dark:text-white rounded-br-none"
                  : isPortTheme
                    ? "bg-[#f0fbf2] border-[#009739]/15 text-[#063f1d] rounded-bl-none shadow-sm"
                    : isAcademicTheme
                      ? "bg-[#f5efe6] border-[#1a365d]/15 text-[#1b2a4a] rounded-bl-none shadow-sm"
                      : "bg-slate-50 dark:bg-[#181f30] border-slate-200 dark:border-gray-800/80 text-slate-800 dark:text-gray-100 rounded-bl-none shadow-sm dark:shadow-md"
              }`}
            >
              <div className="space-y-2 whitespace-pre-wrap font-sans">
                {m.content.split("\n\n").map((para, paraIdx) => {
                  let formatted = para;
                  
                  // Format markdown bold
                  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                  // Format code chunks styled for dark/light themes
                  const codeClass = isPortTheme
                     ? "bg-[#e2fce6] text-[#009739] px-1 py-0.5 rounded font-mono text-[10px]"
                     : isAcademicTheme 
                       ? "bg-[#ebd9cc] text-[#1a365d] px-1 py-0.5 rounded font-mono text-[10px]"
                       : "bg-slate-200 text-red-650 dark:bg-[#090b11] dark:text-[#ff7f7f] px-1 py-0.5 rounded font-mono text-[10px]";
                  formatted = formatted.replace(/`(.*?)`/g, `<code class="${codeClass}">$1</code>`);
                  
                  if (para.trim().startsWith("- ") || para.trim().startsWith("1. ")) {
                    const listItems = para.split("\n");
                    return (
                      <ul key={paraIdx} className={`list-disc pl-4 space-y-1.5 my-1 ${isPortTheme ? "text-[#063f1d]" : isAcademicTheme ? "text-[#1b2a4a]" : "text-slate-750 dark:text-gray-300"}`}>
                        {listItems.map((item, liIdx) => {
                          let cleanItem = item.replace(/^(-\s*|\d+\.\s*)/, "");
                          cleanItem = cleanItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          cleanItem = cleanItem.replace(/`(.*?)`/g, `<code class="${codeClass}">$1</code>`);
                          return <li key={liIdx} dangerouslySetInnerHTML={{ __html: cleanItem }} />;
                        })}
                      </ul>
                    );
                  }

                  return (
                    <p 
                      key={paraIdx} 
                      className={isPortTheme ? "text-[#063f1d]" : isAcademicTheme ? "text-[#1b2a4a]" : "text-slate-800 dark:text-gray-200"} 
                      dangerouslySetInnerHTML={{ __html: formatted }} 
                    />
                  );
                })}
              </div>

              {/* Bottom bar inside message: copy utility + time */}
              <div className={`mt-2 pt-1.5 border-t flex items-center justify-between ${
                isPortTheme ? "border-[#009739]/10" : isAcademicTheme ? "border-[#1a365d]/10" : "border-slate-200 dark:border-gray-800/40"
              }`}>
                <button
                  type="button"
                  onClick={() => handleCopyText(m.content, index)}
                  className={`text-[9px] font-bold flex items-center gap-1 transition-colors ${
                    isPortTheme
                      ? "text-[#009739]/70 hover:text-[#009739]"
                      : isAcademicTheme 
                        ? "text-[#1a365d]/70 hover:text-[#1a365d]" 
                        : "text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                  title="Copiar frase al portapapeles"
                >
                  {copiedIdx === index ? (
                    <>
                      <Check className={`h-3 w-3 ${isPortTheme ? "text-[#009739]" : isAcademicTheme ? "text-emerald-600" : "text-neon-lime"}`} />
                      <span className={isPortTheme ? "text-[#009739] font-extrabold" : isAcademicTheme ? "text-emerald-700 font-extrabold" : "text-neon-lime"}>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copiar frase</span>
                    </>
                  )}
                </button>

                <div className={`text-[8px] uppercase font-mono font-bold tracking-wider ${
                  isPortTheme ? "text-[#009739]/50" : isAcademicTheme ? "text-[#1a365d]/50" : "text-slate-500 dark:text-gray-500"
                }`}>
                  {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className={`border p-3.5 rounded-2xl rounded-bl-none flex items-center gap-2 ${
              isPortTheme
                ? "bg-[#f0fbf2] border-[#009739]/15 text-[#009739]"
                : isAcademicTheme 
                  ? "bg-[#f5efe6] border-[#1a365d]/15 text-[#1a365d]" 
                  : "bg-slate-50 dark:bg-[#181f30] border border-slate-200 dark:border-gray-800/80 text-slate-800 dark:text-gray-100"
            }`}>
              <CircleDashed className={`h-4.5 w-4.5 animate-spin ${isPortTheme ? "text-[#009739]" : isAcademicTheme ? "text-[#1a365d]" : "text-[#ff7f7f]"}`} />
              <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${
                isPortTheme ? "text-[#009739]/60" : isAcademicTheme ? "text-[#1a365d]/60" : "text-slate-600 dark:text-gray-505"
              }`}>
                Tutor redactando respuesta...
              </span>
            </div>
          </div>
        )}
        
        <div ref={bottomChatRef} />
      </div>

      {/* Input controls form */}
      <form 
        onSubmit={handleSend} 
        className={`p-3 border-t flex gap-2 ${
          isPortTheme
            ? "bg-[#f0fdf2] border-[#009739]/12"
            : isAcademicTheme 
              ? "bg-[#fcf8f2] border-[#1a365d]/12" 
              : "bg-slate-50 dark:bg-[#141822]/90 border-slate-205 dark:border-gray-850"
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isSending}
          placeholder={isPortTheme ? "Faz uma pergunta em português ou espanhol..." : isAcademicTheme ? "Pose una pregunta en francés o español..." : "Escribe tu pregunta sobre esta clase..."}
          className={`flex-1 rounded-xl px-4 py-3 text-xs focus:outline-none transition-all disabled:opacity-50 border ${
            isPortTheme
              ? "bg-[#fcfdfa] border-[#009739]/20 text-[#063f1d] placeholder-[#009739]/45 focus:border-[#009739]"
              : isAcademicTheme
                ? "bg-[#fefdfb] border-[#1a365d]/20 text-[#1a365d] placeholder-[#1a365d]/45 focus:border-[#1a365d]"
                : "bg-white dark:bg-[#090b11] border-slate-205 dark:border-gray-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-505 focus:border-[#ff7f7f]"
          }`}
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="rounded-xl p-3 hover:scale-[1.03] transition-all disabled:opacity-20 flex items-center justify-center shrink-0"
          style={{ 
            background: input.trim() && !isSending 
              ? isPortTheme
                ? "#009739"
                : isAcademicTheme
                  ? "#1a365d"
                  : "linear-gradient(135deg, #ff7f7f 0%, #f43f5e 100%)" 
              : "rgba(0,0,0,0.02)" 
          }}
        >
          <Send className={`h-4.5 w-4.5 ${
            input.trim() && !isSending 
              ? "text-white" 
              : isPortTheme
                ? "text-[#009739]/30"
                : isAcademicTheme 
                  ? "text-[#1a365d]/30" 
                  : "text-slate-400 dark:text-gray-505"
          }`} />
        </button>
      </form>
    </div>
  );
};
