import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Book } from "../types";
import { initialBooks } from "../data";
import { BookGrid } from "./BookGrid";
import { BookOpen, Search, Sparkles, FileText, Share2, Compass, AlertCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/*                      MEMOIZED FEATURED BOOK COMPONENT                      */
/* -------------------------------------------------------------------------- */
interface FeaturedBookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  accentColor: "emerald" | "violet" | "rose" | "amber";
}

const FeaturedBookCard = React.memo<FeaturedBookCardProps>(({ book, onSelect, accentColor }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const coverUrl = book.coverUrl || book.cover_url;
  
  const borderHoverClass =
    accentColor === "rose"
      ? "hover:border-rose-500/30 hover:bg-[#0e0910]"
      : accentColor === "amber"
      ? "hover:border-amber-500/30 hover:bg-[#110c06]"
      : accentColor === "violet"
      ? "hover:border-violet-500/30 hover:bg-[#0a0d17]"
      : "hover:border-emerald-500/30 hover:bg-[#0a0d17]";

  const hoverTextClass =
    accentColor === "rose"
      ? "group-hover:text-rose-400"
      : accentColor === "amber"
      ? "group-hover:text-amber-400"
      : accentColor === "violet"
      ? "group-hover:text-violet-400"
      : "group-hover:text-emerald-400";

  const handleClick = () => {
    onSelect(book);
  };

  const gradientClass =
    accentColor === "rose"
      ? "from-[#1c0812] via-[#2e0f1e] to-[#0b0105]"
      : accentColor === "amber"
      ? "from-[#1c1206] via-[#2d1b08] to-[#0a0601]"
      : accentColor === "violet"
      ? "from-[#0c051a] via-[#150a2e] to-[#040108]"
      : "from-[#0c0f16] via-[#121622] to-[#07090e]";

  const spineLineColor =
    accentColor === "rose"
      ? "border-rose-500/10"
      : accentColor === "amber"
      ? "border-amber-500/10"
      : accentColor === "violet"
      ? "border-violet-500/10"
      : "border-emerald-500/10";

  const spineTextColor =
    accentColor === "rose"
      ? "text-rose-400"
      : accentColor === "amber"
      ? "text-amber-400"
      : accentColor === "violet"
      ? "text-violet-400"
      : "text-emerald-400";

  const labelText =
    accentColor === "rose"
      ? "BESTSELLER"
      : accentColor === "amber"
      ? "MÁGICO"
      : accentColor === "violet"
      ? "DISNEY"
      : "PAMPA";

  const badgeStyles =
    accentColor === "rose"
      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
      : accentColor === "amber"
      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
      : accentColor === "violet"
      ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

  const readNowColor =
    accentColor === "rose"
      ? "text-rose-400 hover:text-rose-300"
      : accentColor === "amber"
      ? "text-amber-400 hover:text-amber-300"
      : accentColor === "violet"
      ? "text-violet-400 hover:text-violet-300"
      : "text-emerald-400 hover:text-emerald-300";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={handleClick}
      className={`group relative cursor-pointer flex flex-col justify-between rounded-xl p-3 bg-white border border-slate-200/60 shadow-sm hover:shadow-md dark:bg-slate-950/60 dark:backdrop-blur-md dark:border-slate-900 transition-all duration-300 ${borderHoverClass}`}
    >
      <div>
        {/* Aspect 3:4 physical book style cover with left spine crease */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-r-lg rounded-l bg-slate-100 dark:bg-gray-950 shadow-[5px_5px_10px_rgba(0,0,0,0.15)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.6)] group-hover:shadow-[5px_5px_12px_rgba(139,92,246,0.12)] transition-shadow">
          {coverUrl && !hasError ? (
            <>
              {imgLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-slate-200 to-gray-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 animate-pulse flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`h-4 w-4 rounded-full border-2 border-t-transparent animate-spin ${
                      accentColor === "rose"
                        ? "border-rose-500"
                        : accentColor === "amber"
                        ? "border-amber-500"
                        : accentColor === "violet"
                        ? "border-violet-500"
                        : "border-emerald-500"
                    }`} />
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
                className={`h-full w-full object-fill transition-opacity duration-300 group-hover:scale-105 ${
                  imgLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
              />
            </>
          ) : (
            /* Beautiful simulated cover if no cover is defined - magical look */
            <div className={`absolute inset-0 bg-gradient-to-br flex flex-col justify-between p-4 text-left border-r border-black/40 ${gradientClass}`}>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-80 pointer-events-none" />
              
              <div className={`border-b pb-1.5 ${spineLineColor}`}>
                <span className={`text-[8px] uppercase tracking-[0.16em] font-mono font-extrabold ${spineTextColor}`}>
                  {book.author}
                </span>
              </div>

              <div className="my-auto py-2 text-center">
                <h4 className={`font-serif text-[11px] leading-tight font-black text-slate-100 tracking-tight uppercase border-y py-3.5 bg-black/25 ${spineLineColor}`}>
                  {book.title}
                </h4>
              </div>

              <div className={`border-t pt-1.5 flex items-center justify-between ${spineLineColor}`}>
                <span className="text-[6px] tracking-[0.15em] font-mono text-gray-500 uppercase font-bold">
                  BIO VIP
                </span>
                <span className={`rounded text-[6px] border px-1 font-bold font-mono ${badgeStyles}`}>
                  {labelText}
                </span>
              </div>
            </div>
          )}
          
          <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/85 via-black/25 to-transparent border-r border-white/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <h4 className={`mt-3 text-sm font-bold text-slate-900 dark:text-white line-clamp-1 transition-colors ${hoverTextClass}`}>
          {book.title}
        </h4>
        <p className="text-[10px] font-mono text-slate-750 dark:text-gray-400 mt-1 uppercase">{book.author}</p>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-gray-900/60 flex items-center justify-between text-[9px] text-slate-755 dark:text-gray-400 font-mono">
        <span>{book.pages} pág.</span>
        <span className={`font-bold hover:underline ${readNowColor}`}>Ver Gratis</span>
      </div>
    </motion.div>
  );
});

FeaturedBookCard.displayName = "FeaturedBookCard";

/* -------------------------------------------------------------------------- */
/*                       MAIN FILE CONTAINER (PARENT)                         */
/* -------------------------------------------------------------------------- */
export const LibraryTab: React.FC = () => {
  const [books] = useState<Book[]>(() => {
    return initialBooks.filter(
      (b) =>
        b.category === "Brian Tracy" ||
        b.category === "Colección Éxito: Brian Tracy" ||
        b.category === "Disney" ||
        b.category === "50 Sombras" ||
        b.category === "Harry Potter" ||
        b.category === "Bridgerton" ||
        b.category === "Terror" ||
        b.category === "Crepúsculo"
    );
  });
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPill, setSelectedPill] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Listen to hash change to support direct link opening from WhatsApp shares
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#book=")) {
        const targetId = hash.replace("#book=", "");
        const matched = books.find((b) => b.id === targetId) || initialBooks.find((b) => b.id === targetId);
        if (matched) {
          setSelectedBook(matched);
        }
      }
    };

    if (books.length > 0) {
      handleHashCheck();
    }
    window.addEventListener("hashchange", handleHashCheck);
    return () => window.removeEventListener("hashchange", handleHashCheck);
  }, [books]);

  // Handle book sharing
  const handleShareBook = useCallback((book: Book) => {
    const shareUrl = `${window.location.origin}/#book=${book.id}`;
    
    let text = "";
    if (book.author === "Brian Tracy" || book.category === "Brian Tracy") {
      text = `¡Mirá este libro gratis de Brian Tracy ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${shareUrl}`;
    } else if (book.category === "Disney") {
      text = `¡Mirá este libro gratis de Disney ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${shareUrl}`;
    } else if (book.category === "50 Sombras") {
      text = `¡Mirá este libro gratis de E. L. James ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${shareUrl}`;
    } else if (book.category === "Harry Potter") {
      text = `¡Mirá este libro gratis de J. K. Rowling ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${shareUrl}`;
    } else {
      text = `¡Mirá este libro gratis de ${book.author} ('${book.title}') que encontré en PampaLearn AI! Accedé acá: ${shareUrl}`;
    }
    
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(book.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  }, []);

  // MEMOIZED CATEGORY ARRAYS TO PREVENT UNNECESSARY ITERATIONS ON RENDER
  const brianTracyBooks = useMemo(() => {
    return books.filter((b) => b.category === "Brian Tracy" || b.category === "Colección Éxito: Brian Tracy");
  }, [books]);

  const disneyBooks = useMemo(() => {
    return books.filter((b) => b.category === "Disney");
  }, [books]);

  const greyBooks = useMemo(() => {
    return books.filter((b) => b.category === "50 Sombras");
  }, [books]);

  const bridgertonBooks = useMemo(() => {
    return books.filter((b) => b.category === "Bridgerton");
  }, [books]);

  const harryPotterBooks = useMemo(() => {
    return books.filter((b) => b.category === "Harry Potter");
  }, [books]);

  const terrorBooks = useMemo(() => {
    return books.filter((b) => b.category === "Terror");
  }, [books]);

  const crepusculoBooks = useMemo(() => {
    return books.filter((b) => b.category === "Crepúsculo");
  }, [books]);

  const categories = useMemo(() => ["All", "Brian Tracy", "Disney", "50 Sombras", "Bridgerton", "Harry Potter", "Crepúsculo", "Terror"], []);

  // MEMOIZED FILTER MATCHES
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" ||
        book.category === selectedCategory ||
        (selectedCategory === "Brian Tracy" && book.category === "Colección Éxito: Brian Tracy");
      
      let matchesPill = true;
      if (selectedPill === "exito") {
        matchesPill = book.category === "Brian Tracy" || book.category === "Colección Éxito: Brian Tracy";
      } else if (selectedPill === "magia") {
        matchesPill = book.category === "Disney" || book.category === "Harry Potter";
      } else if (selectedPill === "interes") {
        matchesPill = book.category === "50 Sombras" || book.category === "Bridgerton" || book.category === "Crepúsculo" || book.category === "Terror";
      }
        
      return matchesSearch && matchesCategory && matchesPill;
    });
  }, [books, searchTerm, selectedCategory, selectedPill]);

  const handleSelectBookInternal = useCallback((b: Book) => {
    setSelectedBook(b);
  }, []);

  return (
    <div className="relative space-y-12">
      {/* Immersive Page Background - Vintage Academic Library with pristine contrast preservation */}
      <div 
        className="fixed inset-0 -z-30 pointer-events-none bg-cover bg-center transition-all duration-500 bg-fixed"
        style={{ 
          backgroundImage: "url('https://i.postimg.cc/Hstp3sth/peter-herrmann-O-DUcg4c-Dlc-unsplash.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Deep, luxurious vignette mask / overlay protecting text readability while maintaining fine details */}
        <div className="absolute inset-0 bg-[#f8fafc]/95 dark:bg-black/80 dark:backdrop-blur-[2px] transition-colors duration-300" />
        <div 
          className="absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100"
          style={{
            background: "linear-gradient(to bottom, #000000 0%, transparent 20%, transparent 80%, #000000 100%), radial-gradient(circle at center, transparent 35%, #000000 95%)"
          }}
        />
      </div>

      {/* Visual Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-205/80 shadow-md text-slate-900 dark:bg-slate-950/60 dark:backdrop-blur-md dark:border-slate-900 dark:shadow-2xl dark:text-white p-8 text-left md:p-12 transition-all duration-300">
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Columna Izquierda: Título y Párrafo */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-500/20 uppercase tracking-wider">
              <Sparkles className="h-3 w-3 animate-pulse" /> Biblioteca Técnica Virtual
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl leading-tight font-sans">
              Librería Abierta de <span className="text-emerald-600 dark:text-emerald-400 font-bold">PampaLearn AI</span>
            </h2>
            <p className="text-sm md:text-base text-slate-800 dark:text-slate-400 leading-relaxed transition-colors duration-300">
              Potencia tu formación técnica y crecimiento personal con nuestra colección de manuales de oficios, guías prácticas y Best-Sellers seleccionados para impulsar tu autonomía y éxito profesional.
            </p>
          </div>

          {/* Columna Derecha: Barra de búsqueda estilizada de estética premium */}
          <div className="w-full relative">
            <div className="relative group">
              <Search className="absolute top-4 left-4 h-5 w-5 text-emerald-400 group-focus-within:animate-pulse transition-all" />
              <input
                type="text"
                placeholder="Buscar cuentos, libros o guías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl bg-[#0f172a]/60 border border-slate-800 focus:border-emerald-500 pl-12 pr-4 py-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
              />
            </div>
            <div className="absolute -bottom-6 right-2 text-[10px] text-slate-800 dark:text-slate-500 font-mono">
              Búsqueda en tiempo real
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE FILTROS POR CATEGORÍA (Pills Selector) */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none transition-all">
        <button
          onClick={() => setSelectedPill("all")}
          className={`rounded-full px-5 py-2 text-sm font-medium border transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            selectedPill === "all"
               ? "bg-emerald-500 text-black border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold scale-[1.02]"
               : "bg-white dark:bg-[#0b0f19]/80 text-slate-750 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:bg-slate-100 dark:hover:bg-[#111726] hover:text-black dark:hover:text-slate-200"
          }`}
        >
          <span>🌐</span> Todos
        </button>
        <button
          onClick={() => setSelectedPill("exito")}
          className={`rounded-full px-5 py-2 text-sm font-medium border transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            selectedPill === "exito"
               ? "bg-emerald-500 text-black border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold scale-[1.02]"
               : "bg-white dark:bg-[#0b0f19]/80 text-slate-750 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:bg-slate-100 dark:hover:bg-[#111726] hover:text-black dark:hover:text-slate-200"
          }`}
        >
          <span>🧠</span> Éxito Personal
        </button>
        <button
          onClick={() => setSelectedPill("magia")}
          className={`rounded-full px-5 py-2 text-sm font-medium border transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            selectedPill === "magia"
               ? "bg-emerald-500 text-black border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold scale-[1.02]"
               : "bg-white dark:bg-[#0b0f19]/80 text-slate-750 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:bg-slate-100 dark:hover:bg-[#111726] hover:text-black dark:hover:text-slate-200"
          }`}
        >
          <span>🏰</span> Magia Infantil
        </button>
        <button
          onClick={() => setSelectedPill("interes")}
          className={`rounded-full px-5 py-2 text-sm font-medium border transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            selectedPill === "interes"
               ? "bg-emerald-500 text-black border-transparent shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold scale-[1.02]"
               : "bg-white dark:bg-[#0b0f19]/80 text-slate-750 dark:text-slate-400 border-slate-200 dark:border-slate-900 hover:bg-slate-100 dark:hover:bg-[#111726] hover:text-black dark:hover:text-slate-200"
          }`}
        >
          <span>📰</span> Interés General
        </button>
      </div>

      {/* BRIAN TRACY - HIGHLIGHTED ROW ON TOP (MEMOIZED GATES) */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "exito") && brianTracyBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 uppercase tracking-widest">
                  VIP Colección
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Colección Éxito: Brian Tracy
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Aprende de manera libre las 5 obras esenciales sobre mentalidad de alto impacto, organización de metas y técnicas excepcionales de venta.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {brianTracyBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="emerald"
              />
            ))}
          </div>
        </div>
      )}

      {/* DISNEY COLLECTION - HIGH-FIDELITY FEATURED ROW ON TOP */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "magia") && disneyBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-violet-50 dark:bg-violet-500/15 border border-violet-200 dark:border-violet-500/30 text-[10px] font-extrabold text-violet-600 dark:text-violet-400 px-2 py-0.5 uppercase tracking-widest">
                  Colección Mágica
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Colección Creativa: Disney
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Explora valiosos guías y manuales formativos sobre narración mágica, creatividad Imagineering y principios de animación clásica.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {disneyBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="violet"
              />
            ))}
          </div>
        </div>
      )}

      {/* 50 SOMBRAS DE GREY COLLECTION - HIGH-FIDELITY FEATURED ROW ON TOP */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "interes") && greyBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 px-2 py-0.5 uppercase tracking-widest">
                  VIP Romance & Drama
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Saga de Éxito Mundial: 50 Sombras
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Explora la exitosa e intensa trilogía escrita por E. L. James, uno de los mayores Best-Sellers literarios contemporáneos de todos los tiempos.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {greyBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="rose"
              />
            ))}
          </div>
        </div>
      )}

      {/* BRIDGERTON COLLECTION - HIGH-FIDELITY FEATURED ROW ON TOP */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "interes") && bridgertonBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 px-2 py-0.5 uppercase tracking-widest">
                  VIP Romance Histórico
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Saga de Éxito Mundial: Los Bridgerton
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Sigue la aclamada saga de Julia Quinn que cautivó al mundo entero. Lee de forma totalmente libre las 8 entregas correspondientes a cada uno de los hermanos de la aristocrática familia.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {bridgertonBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="rose"
              />
            ))}
          </div>
        </div>
      )}

      {/* CREPUSCULO COLLECTION - HIGH-FIDELITY FEATURED ROW ON TOP */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "interes") && crepusculoBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-50 dark:bg-red-500/15 border border-red-200 dark:border-red-500/30 text-[10px] font-extrabold text-red-600 dark:text-red-400 px-2 py-0.5 uppercase tracking-widest">
                  VIP Romance Paranormal
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Saga de Éxito Mundial: Crepúsculo
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Sigue la legendaria saga romántica de Stephenie Meyer que conquistó a generaciones. Leé gratis de forma libre las entregas en el orden recomendado.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {crepusculoBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="red"
              />
            ))}
          </div>
        </div>
      )}

      {/* HARRY POTTER COLLECTION - HIGH-FIDELITY FEATURED ROW ON TOP */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "magia") && harryPotterBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-[10px] font-extrabold text-amber-600 dark:text-amber-400 px-2 py-0.5 uppercase tracking-widest">
                  Fantasía y Magia VIP
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Colección Legendaria: Harry Potter
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Adéntrate en el maravilloso universo fantástico creado por J. K. Rowling. Lee de forma libre y al instante los cuatro tomos emblemáticos de la saga mágica más querida a nivel internacional.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {harryPotterBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="amber"
              />
            ))}
          </div>
        </div>
      )}

      {/* TERROR COLLECTION - HIGH-FIDELITY FEATURED ROW ON TOP */}
      {searchTerm === "" && selectedCategory === "All" && (selectedPill === "all" || selectedPill === "interes") && terrorBooks.length > 0 && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-3 transition-colors duration-300">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 px-2 py-0.5 uppercase tracking-widest">
                  Misterio & Suspenso
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Terror
                </h3>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-400 mt-1 transition-colors duration-300 font-medium">
                Sumergite en historias escalofriantes, leyendas ancestrales, monstruos inolvidables y pesadillas extraordinarias creadas para desafiar tus sentidos.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {terrorBooks.map((book) => (
              <FeaturedBookCard
                key={book.id}
                book={book}
                onSelect={handleSelectBookInternal}
                accentColor="rose"
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Browse Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 text-left border-b border-slate-200 dark:border-slate-900 pb-5 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Explorar Catálogo General
            </h3>
          </div>
          
          {/* Filters & Search bar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400 dark:text-gray-650" />
              <input
                type="text"
                placeholder="Buscar (ej: 101 Dálmatas, Bambi, Alicia, Riqueza, Leyes...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl bg-white dark:bg-[#06080e] border border-slate-200 dark:border-slate-900 pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-605 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </div>

            {/* Category Select Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-emerald-500 text-white dark:text-black font-extrabold shadow-lg shadow-emerald-500/10"
                      : "bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-gray-900 text-slate-800 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {cat === "All" ? "Todos" : cat.replace("Colección Éxito: ", "")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Grid Results */}
        {loading ? (
          <BookGrid
            books={[]}
            onSelectBook={handleSelectBookInternal}
            isLoading={true}
          />
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-24 rounded-2xl bg-white dark:bg-[#090b11] border border-slate-200 dark:border-gray-900 transition-colors duration-300">
            <BookOpen className="mx-auto h-12 w-12 text-slate-300 dark:text-gray-800 mb-4" />
            <p className="text-slate-650 dark:text-gray-450 font-bold">No se encontraron manuales para tu filtro/búsqueda.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-55 dark:bg-emerald-500/5 px-4 py-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-black transition-all"
            >
              Mostrar todos
            </button>
          </div>
        ) : (
          <BookGrid
            books={filteredBooks}
            onSelectBook={handleSelectBookInternal}
            isLoading={false}
          />
        )}
      </div>

      {/* Visor de Lectura Online Modal (SINGLE GLOBAL PORTAL CONTROLLING OVERHEAD RENDERING STATE) */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 dark:bg-black/95 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl rounded-2xl border border-slate-200 dark:border-gray-900 bg-white dark:bg-[#06080e] p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh] text-left transition-colors duration-300"
            >
              {/* Modal and reading controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-gray-950 pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                    <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">{selectedBook.title}</h3>
                    <p className="text-xs text-slate-750 dark:text-gray-400 font-medium">
                      Autor: {selectedBook.author} · {selectedBook.pages} páginas · Licenciamiento Libre de Estudio
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleShareBook(selectedBook)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-gray-805 bg-slate-50 dark:bg-[#0c101b] hover:bg-slate-150 dark:hover:bg-gray-900 px-3.5 py-1.5 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
                    title="Compartir enlace permanente"
                  >
                    <Share2 className="h-3.5 w-3.5" /> Compartir Enlace
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      window.location.hash = "";
                    }}
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 text-xs font-extrabold text-white dark:text-black transition-all active:scale-95 cursor-pointer"
                  >
                    Salir del Visor
                  </button>
                </div>
              </div>

              {/* PDF Preview warning & external link box to avoid any iframe sandbox blocks on mobile */}
              <div className="mt-4 bg-emerald-50/50 dark:bg-[#0a1510] border border-emerald-100 dark:border-emerald-500/10 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                  <span>Si el visor integrado tarda en cargar, puedes abrir el manual directamente en Google Drive en una nueva pestaña.</span>
                </div>
                <a
                  href={`https://drive.google.com/file/d/${selectedBook.driveId}/view?usp=drivesdk`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-emerald-500 text-white dark:text-black px-3 py-1 rounded font-bold hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all flex-shrink-0"
                >
                  <ExternalLink className="h-3 w-3" /> Abrir en Drive
                </a>
              </div>

              {/* Real dynamic PDF reader iframe */}
              <div className="mt-4 flex-1 rounded-xl bg-gray-50 dark:bg-gray-950 overflow-hidden relative border border-slate-205 dark:border-gray-900 min-h-[450px] sm:min-h-[520px]">
                <iframe
                  src={`https://drive.google.com/file/d/${selectedBook.driveId}/preview`}
                  className="absolute inset-0 w-full h-full rounded-xl bg-[#04060b]"
                  title={selectedBook.title}
                  allow="autoplay"
                />
              </div>

              <div className="mt-4 text-center text-[10px] text-slate-750 dark:text-gray-650 font-mono flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-slate-200 dark:border-gray-950 pt-3">
                <span>PampaLearn AI © 2026. Material alojado de manera segura en servidores de prueba de Google Drive.</span>
                <span>Visor interactivo con controles de escala integrados</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
