import React, { useState, useCallback } from "react";
import { Book } from "../types";
import { BookOpen, Share2, Check } from "lucide-react";
import { motion } from "motion/react";

interface BookGridProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  isLoading: boolean;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, onSelectBook, isLoading }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShareWhatsApp = useCallback((e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    const appUrl = `${window.location.origin}/#book=${book.id}`;
    
    let text = "";
    if (book.author === "Brian Tracy" || book.category === "Brian Tracy") {
      text = `¡Mirá este libro gratis de Brian Tracy ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${appUrl}`;
    } else if (book.category === "Disney") {
      text = `¡Mirá este libro gratis de Disney ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${appUrl}`;
    } else {
      text = `¡Mirá este libro gratis de ${book.author} ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${appUrl}`;
    }
    
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Copy exact requested message to Clipboard as well for multi-purpose sharing
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(book.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  }, []);

  const handleCardSelect = useCallback((book: Book) => {
    onSelectBook(book);
  }, [onSelectBook]);

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`shimmer-${i}`} className="flex flex-col gap-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm dark:bg-[#090b11] dark:border-gray-900 animate-pulse p-4">
            <div className="aspect-[3/4] w-full rounded-r-xl rounded-l-md bg-slate-100 dark:bg-gray-800/80" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-gray-800 rounded" />
            <div className="h-3 w-1/2 bg-slate-200 dark:bg-gray-800 rounded" />
            <div className="h-8 w-full bg-slate-200 dark:bg-gray-800 rounded-lg mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSelect={handleCardSelect}
          onShare={handleShareWhatsApp}
          copied={copiedId === book.id}
        />
      ))}
    </div>
  );
};

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onShare: (e: React.MouseEvent, book: Book) => void;
  copied: boolean;
}

const BookCard = React.memo<BookCardProps>(({ book, onSelect, onShare, copied }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const coverUrl = book.coverUrl || book.cover_url;

  const handleSelectClick = () => {
    onSelect(book);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    onShare(e, book);
  };

  const showCover = coverUrl && !hasError;

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      onClick={handleSelectClick}
      className="group relative flex flex-col justify-between cursor-pointer rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md hover:bg-slate-50 dark:bg-slate-950/60 dark:backdrop-blur-md dark:border-slate-900 transition-all duration-300 p-4"
    >
      <div>
        {/* Book Spine 3:4 Shadow Cover Container with physical book aesthetics */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-r-xl rounded-l-sm bg-slate-100 dark:bg-[#05070c] shadow-[8px_8px_16px_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.7)] group-hover:shadow-[10px_10px_20px_rgba(34,197,94,0.15)] transition-all duration-300">
          
          {showCover ? (
            <>
              {/* Skeleton placeholder shown during load state */}
              {imgLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-slate-200 to-gray-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 animate-pulse flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                    <span className="text-[10px] font-mono text-slate-650 dark:text-gray-400">Cargando Tapa...</span>
                  </div>
                </div>
              )}

              <img
                src={coverUrl}
                alt={book.title}
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoading(false)}
                onError={() => {
                  setImgLoading(false);
                  setHasError(true);
                }}
                decoding="async"
                className={`h-full w-full object-fill transition-opacity duration-300 group-hover:scale-[1.03] ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
              />
            </>
          ) : (
            /* Elegant Physical Book Spine & Cover Simulator for Development phase (when coverUrl is undefined or error occurs) */
            <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-slate-100 to-slate-200 dark:from-[#0c0f16] dark:via-[#121622] dark:to-[#07090e] flex flex-col justify-between p-5 text-left border-r border-[#e2e8f0]/40 dark:border-black/40">
              {/* Subtle visual canvas noise gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Top area */}
              <div className="border-b border-slate-200 dark:border-emerald-500/10 pb-2.5">
                <span className="text-[9px] uppercase tracking-[0.18em] font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  {book.author}
                </span>
              </div>

              {/* Middle Title Display (Stylized serif emulating a physically printed cover) */}
              <div className="my-auto py-3 text-center">
                <h3 className="font-serif text-sm sm:text-base leading-tight font-black text-slate-800 dark:text-slate-100 tracking-tight uppercase border-y border-slate-200 dark:border-emerald-500/10 py-5 bg-black/5 dark:bg-black/25">
                  {book.title}
                </h3>
              </div>

              {/* Bottom publisher info */}
              <div className="border-t border-slate-200 dark:border-emerald-500/10 pt-2.5 flex items-center justify-between">
                <span className="text-[8px] tracking-[0.2em] font-mono text-slate-650 dark:text-gray-500 uppercase font-bold">
                  BIBLIOTECA VIP
                </span>
                <span className="rounded bg-emerald-50 dark:bg-emerald-500/10 text-[7px] text-emerald-600 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-500/20 px-1 py-0.5 font-bold uppercase font-mono">
                  PAMPA
                </span>
              </div>
            </div>
          )}

          {/* Sutil Degradado del Borde Izquierdo - Efecto de Lomo Físico */}
          <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/90 via-black/30 to-transparent border-r border-white/5 pointer-events-none" />
          
          {/* Sutil brillo / textura */}
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute top-2.5 right-2.5 rounded bg-white/95 dark:bg-black/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-emerald-500/25 uppercase transition-colors duration-300">
            {book.category.replace("Colección Éxito: ", "")}
          </div>
        </div>

        {/* Text information */}
        <div className="mt-4 text-left">
          <span className="text-[10px] font-mono tracking-wide text-slate-750 dark:text-gray-500 font-medium uppercase">
            {book.author}
          </span>
          <h3 className="mt-1 line-clamp-1 text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {book.title}
          </h3>
          <p className="mt-2 text-xs text-slate-800 dark:text-slate-400 line-clamp-3 leading-relaxed transition-colors duration-300">
            {book.description}
          </p>
        </div>
      </div>

      {/* Action Buttons inside footer box */}
      <div className="mt-5 space-y-2.5 border-t border-slate-200 dark:border-gray-900 pt-3">
        <div className="flex items-center justify-between text-[10px] text-slate-750 dark:text-gray-500 font-mono">
          <span>Páginas: {book.pages}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">PDF Completo</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectClick();
            }}
            className="col-span-4 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 py-2 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-black hover:border-emerald-500 dark:hover:border-emerald-500 transition-all active:scale-95 cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5" /> Estudiar Libro
          </button>

          <button
            onClick={handleShareClick}
            title="Compartir en WhatsApp"
            className={`col-span-1 flex items-center justify-center rounded-lg border transition-all active:scale-90 cursor-pointer ${
              copied
                ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "bg-white dark:bg-[#0b0f19] border-slate-205 dark:border-gray-800 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-350 dark:hover:border-gray-750"
            }`}
          >
            {copied ? (
              <Check className="h-4 w-4 animate-bounce" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

BookCard.displayName = "BookCard";
