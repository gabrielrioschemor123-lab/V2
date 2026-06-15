import React, { useState } from "react";
import { Course } from "../types";
import { Sparkles, Shield, Trophy, FileBadge, PlayCircle, Loader2, CreditCard } from "lucide-react";
import { motion } from "motion/react";

interface PaywallModalProps {
  course?: Course | null;
  isTotalAccess?: boolean;
  onClose: () => void;
  onSimulatePurchase: (id: string) => Promise<void>;
  isProcessing: boolean;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  course,
  isTotalAccess = false,
  onClose,
  onSimulatePurchase,
  isProcessing,
}) => {
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      if (isTotalAccess) {
        await onSimulatePurchase("total-access");
      } else if (course) {
        await onSimulatePurchase(course.id);
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  const currentTitle = isTotalAccess ? "Pase Total Vitalicio" : course?.title || "Programa Premium";
  const currentHeadline = isTotalAccess 
    ? "Acceso ilimitado para siempre a todas las especialidades actuales y futuras." 
    : course?.headline || "";
  const currentThumbnail = isTotalAccess 
    ? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
    : course?.thumbnail || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-800 bg-[#0d0f14] shadow-2xl ring-1 ring-emerald-500/10 text-left"
      >
        {/* Decorative Neon Accent Row */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-lime-500" />

        {/* Hero Header */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-900 md:h-52">
          {currentThumbnail && (
            <img
              src={currentThumbnail}
              alt={currentTitle}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/50 to-transparent" />
          
          <div className="absolute bottom-5 left-6 right-6">
            <span className="inline-block rounded bg-[#10ff7c] px-2 py-0.5 text-[10px] font-black uppercase text-[#0d0f14] tracking-widest">
              {isTotalAccess ? "ACCESO TOTAL ILIMITADO" : "Acceso Vitalicio Garantizado"}
            </span>
            <h3 className="mt-1 text-2xl font-black text-white leading-tight">
              {currentTitle}
            </h3>
            <p className="text-xs text-gray-300 font-medium">{currentHeadline}</p>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 md:p-8 space-y-6">
          {!success ? (
            <>
              {/* Value Pitch */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                  {isTotalAccess ? "¿Qué incluye tu Pase Total VIP?" : "¿Qué incluye tu matrícula única?"}
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex gap-3 rounded-xl border border-gray-800 bg-[#11141d]/60 p-3">
                    <PlayCircle className="h-5 w-5 shrink-0 text-neon-lime" />
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {isTotalAccess ? "Todos los Cursos" : "Video-Lecciones HD"}
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {isTotalAccess ? "Capacitación en Oficios, Idiomas, Música y Meta Ads." : "Módulos prácticos explicados detalladamente."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-xl border border-gray-800 bg-[#11141d]/60 p-3">
                    <Sparkles className="h-5 w-5 shrink-0 text-neon-cyan" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Tutor de IA Integrado</h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">Asistente Gemini 3.5 para tus dudas en tiempo real.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-xl border border-gray-800 bg-[#11141d]/60 p-3">
                    <FileBadge className="h-5 w-5 shrink-0 text-neon-orange" />
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        {isTotalAccess ? "Certificados Múltiples" : "Certificado Oficial"}
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {isTotalAccess ? "Obtén certificados aprobados por cada especialidad." : "Acredita tus habilidades al finalizar."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-xl border border-gray-800 bg-[#11141d]/60 p-3">
                    <Shield className="h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Actualizaciones de por Vida</h5>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {isTotalAccess ? "Acceso gratuito a cualquier nuevo curso lanzado en el futuro." : "Estudia a tu propio ritmo sin mensualidades vagas."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informant Sandbox Check */}
              <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/10 p-4 text-xs text-[#10ff7c]">
                <span className="font-bold flex items-center gap-1">
                  <CreditCard className="h-4 w-4" /> ENTORNO INTEGRADO DE PRUEBAS
                </span>
                <p className="mt-1 text-gray-300">
                  Haz clic en el botón de abajo para simular una pasarela segura (Stripe). Una vez procesado, el sistema registrará los derechos de acceso en tu documento formal de <strong className="text-white">Cloud Firestore</strong>.
                </p>
              </div>

              {/* Action pricing strip */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-800/60 pt-6">
                <div>
                  <span className="text-xs text-gray-400 block font-semibold uppercase font-mono">Inversión Total Única:</span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-3xl font-black text-white">
                      {isTotalAccess ? "$4.999" : "$1.500"}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">ARS</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold ml-2">Ahorro Máximo</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="rounded-xl border border-gray-800 bg-transparent px-5 py-3 text-xs font-bold text-gray-400 hover:text-white hover:bg-gray-800/30 transition-all font-sans"
                  >
                    Volver Atrás
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="flex items-center gap-2 rounded-xl bg-[#10ff7c] px-6 py-3 text-xs font-black text-[#0d0f14] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 uppercase tracking-wider"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Procesando Pago...
                      </>
                    ) : (
                      <>
                        <Trophy className="h-4 w-4 text-[#0d0f14]" /> {isTotalAccess ? "Activar Pase Completo" : "Adquirir Ahora"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500">
                <Trophy className="h-7 w-7 text-neon-lime" />
              </div>
              <h4 className="text-2xl font-black text-white">
                {isTotalAccess ? "¡Pase Total VIP Activado!" : "¡Matrícula Confirmada con Éxito!"}
              </h4>
              <p className="text-sm text-gray-300 max-w-sm mx-auto">
                {isTotalAccess 
                  ? "Felicitaciones, has desbloqueado la totalidad del catálogo académico de por vida en nuestro servidor de Cloud Firestore."
                  : `Registramos tus credenciales para ${currentTitle} en Firestore. El reproductor y el tutor Gemini están listos.`}
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl bg-neon-lime px-6 py-3 text-xs font-black text-[#0d0f14] hover:scale-105 transition-all uppercase tracking-wider"
              >
                Comenzar a Estudiar
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
