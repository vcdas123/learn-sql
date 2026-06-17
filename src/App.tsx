import React, { useState, useMemo, useEffect } from "react";
import { Menu, X, ChevronRight, Terminal, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useParams, 
  Link, 
  useLocation,
  Navigate
} from "react-router-dom";
import MarkdownPreview from "./components/MarkdownPreview";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Note {
  id: string;
  title: string;
  module: string;
  content: string;
}

const AppContent: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const selectedNote = useMemo(() => {
    return notes.find((n) => n.id === moduleId) || notes[0];
  }, [notes, moduleId]);

  const headings = useMemo(() => {
    if (!selectedNote) return [];
    const headingRegex = /^##\s+(.+)$/gm;
    const matches = [...selectedNote.content.matchAll(headingRegex)];
    return matches.map((match) => {
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return { text, id };
    });
  }, [selectedNote]);

  const currentIndex = notes.findIndex((n) => n.id === selectedNote?.id);
  const prevNote = currentIndex > 0 ? notes[currentIndex - 1] : null;
  const nextNote = currentIndex !== -1 && currentIndex < notes.length - 1 ? notes[currentIndex + 1] : null;

  // Handle anchor scrolling on load and hash change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  // Clear hash when scrolling to top manually
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 10 && window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  if (!selectedNote) return null;

  return (
    <div className="min-h-screen bg-background text-slate-400 font-sans overflow-x-hidden w-full">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Terminal className="text-primary w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-tight">
            SQL Guide
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/5 rounded-xl transition-all"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </header>

      <div className="flex w-full overflow-x-hidden pt-16 lg:pt-0">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-80 bg-background border-r border-border transform transition-all duration-300 overflow-y-auto",
            isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
            isDesktopSidebarOpen ? "lg:translate-x-0" : "lg:-translate-x-full"
          )}
        >
          <div className="p-8 pt-0 relative">
            <div className="bg-background pt-8 pb-4 mb-4">
              {/* Desktop Collapse Button */}
              <button
                onClick={() => setIsDesktopSidebarOpen(false)}
                className="hidden lg:flex absolute top-8 right-4 p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"
                title="Collapse Sidebar"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="hidden lg:flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Terminal className="text-primary w-6 h-6" />
                </div>
                <h1 className="text-xl font-black text-white tracking-tight">
                    SQL Guide
                </h1>
              </div>
            </div>

            <nav className="space-y-1.5">
              <div className="bg-background py-4 -mx-4 px-4 mb-2">
                <div className="flex items-center gap-2 px-3">
                  < BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">
                    SQL Modules
                  </span>
                </div>
              </div>
              {notes.map((note) => (
                <div key={note.id} className="relative group/item">
                  <Link
                    to={`/${note.id}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "w-full flex flex-col gap-0.5 px-4 py-3 rounded-xl text-[12px] font-medium transition-all duration-200 group text-left border",
                      selectedNote.id === note.id
                        ? "bg-primary/5 text-primary border-primary/20 shadow-sm"
                        : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] border-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[9px] font-black uppercase tracking-widest transition-all",
                        selectedNote.id === note.id
                          ? "text-primary"
                          : "text-slate-500 group-hover:text-slate-400",
                      )}
                    >
                      Module {note.module}
                    </span>
                    <span className="truncate w-full font-bold">
                      {note.title}
                    </span>
                  </Link>

                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 pointer-events-none opacity-0 group-hover/item:opacity-100 transition-all duration-200 translate-y-2 group-hover/item:translate-y-0 hidden lg:block w-full px-4">
                    <div className="bg-surface border border-border px-3 py-2 rounded-lg shadow-2xl text-center">
                      <span className="text-[11px] font-bold text-white tracking-tight leading-tight">{note.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        <main className={cn(
          "flex-1 min-h-screen w-full overflow-x-hidden transition-all duration-300",
          isDesktopSidebarOpen ? "lg:ml-80" : "lg:ml-0"
        )}>
          {/* Desktop Show Sidebar Button */}
          {!isDesktopSidebarOpen && (
            <button
              onClick={() => setIsDesktopSidebarOpen(true)}
              className="hidden lg:flex fixed top-8 left-8 z-50 p-3 bg-surface border border-border rounded-xl text-slate-400 hover:text-white hover:border-primary/50 transition-all shadow-xl group animate-in fade-in slide-in-from-left-4"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface border border-border rounded-lg text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
                Show Sidebar
              </span>
            </button>
          )}
          <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full h-full">
            <motion.div
              key={selectedNote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="prose w-full h-full"
            >
              <div className="mb-12 flex flex-col gap-2">
                <div className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                  Module {selectedNote.module}
                </div>
                <div className="text-slate-400 font-mono text-xs tracking-tighter uppercase">
                  {selectedNote.id}
                </div>
              </div>

              <MarkdownPreview 
                content={selectedNote.content} 
                moduleId={selectedNote.id} 
              />
            </motion.div>

            {/* Footer Navigation */}
            <div className="mt-24 pt-12 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevNote ? (
                <Link
                  to={`/${prevNote.id}`}
                  className="group flex flex-col items-start p-8 rounded-3xl border border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300 w-full"
                >
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 rotate-180" />
                    Previous Module
                  </span>
                  <div className="text-white font-bold text-sm sm:text-base group-hover:text-primary transition-colors text-left">
                    {prevNote.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextNote ? (
                <Link
                  to={`/${nextNote.id}`}
                  className="group flex flex-col items-end p-8 rounded-3xl border border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300 text-right w-full"
                >
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                    Next Module
                    <ChevronRight className="w-3 h-3" />
                  </span>
                  <div className="text-white font-bold text-sm sm:text-base group-hover:text-primary transition-colors">
                    {nextNote.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Floating Navigation Button */}
      {headings.length > 0 && (
        <button
          onClick={() => setIsNavModalOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Open Chapter Navigation"
        >
          <BookOpen className="w-6 h-6" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface border border-border rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chapter Contents
          </span>
        </button>
      )}

      {/* Navigation Modal */}
      <AnimatePresence>
        {isNavModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNavModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <BookOpen className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Chapter Contents</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Module {selectedNote.module}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsNavModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <nav className="space-y-1">
                  {headings.map((heading) => (
                    <Link
                      key={heading.id}
                      to={`/${selectedNote.id}#${heading.id}`}
                      onClick={() => {
                        setIsNavModalOpen(false);
                        const element = document.getElementById(heading.id);
                        if (element) {
                          setTimeout(() => {
                            element.scrollIntoView({ behavior: "smooth" });
                          }, 10);
                        }
                      }}
                      className="block px-4 py-3.5 rounded-2xl text-[13px] font-medium text-slate-400 hover:text-primary hover:bg-primary/5 transition-all border border-transparent hover:border-primary/20"
                    >
                      {heading.text}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="p-6 bg-background/50 border-t border-border text-center">
                <p className="text-[10px] text-slate-600 font-medium">Click on a section to jump directly to it</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const rawNotes = import.meta.glob("./notes/*.md", {
    query: "?raw",
    eager: true,
    import: "default",
  });

  const notes = useMemo(() => {
    return Object.entries(rawNotes)
      .map(([path, content]) => {
        const filename = path.split("/").pop() || "";
        const id = filename.replace(".md", "");
        
        const match = filename.match(/^(\d+(\.\d+)?)\.\s*(.+)\.md$/);
        let module = "0";
        let rawTitle = filename.replace(".md", "");
        
        if (match) {
          module = match[1];
          rawTitle = match[3];
        }

        const cleanTitle = rawTitle
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const cleanContent = (content as string)
          .replace(/\[.*?Previous\].*?\n/g, "")
          .replace(/\[Home\].*?\n/g, "")
          .replace(/\[.*?Next >\].*?\n/g, "")
          .replace(/## Table of Contents.*?\n---/gs, "")
          .replace(/## Navigation.*/gs, "")
          .replace(/^---\s*\n/gm, "")
          .trim();

        return { id, title: cleanTitle, module, content: cleanContent };
      })
      .sort((a, b) => {
          const aMod = parseFloat(a.module);
          const bMod = parseFloat(b.module);
          return aMod - bMod;
      });
  }, [rawNotes]);

  if (notes.length === 0) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:moduleId" element={<AppContent notes={notes} />} />
        <Route path="/" element={<Navigate to={`/${notes[0].id}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
