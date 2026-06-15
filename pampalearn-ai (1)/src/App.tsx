import { useEffect, useState } from "react";
import { AppUser, Course, UserProfile } from "./types";
import { initialCourses, initialBooks } from "./data";
import { Header } from "./components/Header";
import { LibraryTab } from "./components/LibraryTab";
import { CoursesTab } from "./components/CoursesTab";
import { PaywallModal } from "./components/PaywallModal";
import { CourseView } from "./components/CourseView";
import { PampaLogo } from "./components/PampaLogo";

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Theme state for Light/Dark mode support using standard Tailwind class-based strategy
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("pampalearn-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    const root = window.document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    const root = window.document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("pampalearn-theme", nextTheme);
  };
  
  // App routing and modals
  const [activeTab, setActiveTab] = useState<"library" | "courses">("library");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [paywallCourse, setPaywallCourse] = useState<Course | null>(null);
  const [isTotalAccessPaywall, setIsTotalAccessPaywall] = useState<boolean>(false);
  
  // Status feedback
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState(false);

  // Load local user profile on startup
  useEffect(() => {
    const savedProfile = localStorage.getItem("pampalearn-profile-v2");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUser({
          uid: parsed.uid,
          displayName: parsed.name,
          email: parsed.email
        });
        setUserProfile(parsed);
      } catch (err) {
        console.error("Error parsing saved profile:", err);
      }
    } else {
      // By default, create an authorized express profile with all courses unlocked!
      const defaultProfile: UserProfile = {
        uid: "pampalearn-standard-student",
        name: "Estudiante de Oficios",
        email: "estudiante@pampalearn.ai",
        purchased_courses: [
          "instagram-masterclass",
          "facebook-ads-2025",
          "virtual-dj-basics",
          "mecanica-motos",
          "frances-desde-cero",
          "portugues-principiantes",
          "ingles-desde-cero"
        ],
        access_total: true,
      };
      localStorage.setItem("pampalearn-profile-v2", JSON.stringify(defaultProfile));
      setUser({
        uid: defaultProfile.uid,
        displayName: defaultProfile.name,
        email: defaultProfile.email
      });
      setUserProfile(defaultProfile);
    }
    setIsAuthLoading(false);
  }, []);

  // Listen to dynamic URL hash changes for deep linking to premium course details
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash;
      if (hash.startsWith("#course/")) {
        const urlId = hash.replace("#course/", "");
        const matched = initialCourses.find(c => c.id === urlId);
        if (matched) {
          setActiveCourse(matched);
          setActiveTab("courses");
        }
      } else if (hash === "" || hash === "#") {
        setActiveCourse(null);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run initial on load check

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Login handler
  const handleLoginGoogle = async () => {
    setIsAuthLoading(true);
    const mockUser: AppUser = {
      uid: "google-estudiante-pampa",
      displayName: "Estudiante Google",
      email: "estudiante.pampa@gmail.com",
    };
    const mockProfile: UserProfile = {
      uid: mockUser.uid,
      name: mockUser.displayName,
      email: mockUser.email || "",
      purchased_courses: [
        "instagram-masterclass",
        "facebook-ads-2025",
        "virtual-dj-basics",
        "mecanica-motos",
        "frances-desde-cero",
        "portugues-principiantes",
        "ingles-desde-cero"
      ],
      access_total: true,
    };
    localStorage.setItem("pampalearn-profile-v2", JSON.stringify(mockProfile));
    setUser(mockUser);
    setUserProfile(mockProfile);
    setIsAuthLoading(false);
  };

  // Demo Bypass Login
  const handleLoginDemo = () => {
    setIsAuthLoading(true);
    const mockUser: AppUser = {
      uid: "demo-estudiante-pampa",
      displayName: "Estudiante de Oficios",
      email: "demo.estudiante@pampalearn.ai",
    };
    const mockProfile: UserProfile = {
      uid: mockUser.uid,
      name: mockUser.displayName,
      email: mockUser.email || "",
      purchased_courses: [
        "instagram-masterclass",
        "facebook-ads-2025",
        "virtual-dj-basics",
        "mecanica-motos",
        "frances-desde-cero",
        "portugues-principiantes",
        "ingles-desde-cero"
      ],
      access_total: true,
    };
    localStorage.setItem("pampalearn-profile-v2", JSON.stringify(mockProfile));
    setUser(mockUser);
    setUserProfile(mockProfile);
    setIsAuthLoading(false);
  };

  // Logout handler
  const handleLogout = async () => {
    setIsAuthLoading(true);
    localStorage.removeItem("pampalearn-profile-v2");
    setUser(null);
    setUserProfile(null);
    setActiveCourse(null);
    setIsAuthLoading(false);
  };

  // Purchase Simulation Handler - Stores locally on client, instantly unlocking
  const handleSimulatePurchase = async (courseId: string) => {
    if (!user || !userProfile) {
      handleLoginDemo();
      return;
    }

    setIsProcessingPurchase(true);
    setTimeout(() => {
      const isTotalPass = courseId === "total-access";
      const nextOwned = [...userProfile.purchased_courses];
      
      if (!isTotalPass && !nextOwned.includes(courseId)) {
        nextOwned.push(courseId);
      }

      const nextProfile: UserProfile = {
        ...userProfile,
        purchased_courses: nextOwned,
        access_total: isTotalPass ? true : (userProfile.access_total || false),
      };
      
      localStorage.setItem("pampalearn-profile-v2", JSON.stringify(nextProfile));
      setUserProfile(nextProfile);
      setIsProcessingPurchase(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#090d16] dark:to-black text-slate-900 dark:text-white transition-colors duration-300 flex flex-col justify-between">
      {/* Dynamic Navigation Header */}
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Close active course player if we switch tabs back
          setActiveCourse(null);
        }}
        onLogin={handleLoginGoogle}
        onLoginDemo={handleLoginDemo}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 md:py-12">
        {isAuthLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <PampaLogo size="xl" showText={false} className="animate-pulse mb-6" />
            <div className="h-5 w-5 rounded-full border-2 border-[#4c7c1a] border-t-transparent animate-spin mb-4" />
            <p className="text-xs font-mono tracking-wider text-gray-500 uppercase">
              Sincronizando portal académico...
            </p>
          </div>
        ) : activeCourse ? (
          /* Dynamic Cinematic Premium Course view */
          <CourseView
            course={activeCourse}
            isOwned={
              userProfile?.access_total === true || 
              String(userProfile?.access_total) === "true" ||
              userProfile?.purchased_courses.includes(activeCourse.id) || 
              false
            }
            onBack={() => {
              setActiveCourse(null);
              window.location.hash = "";
            }}
            onBuy={(courseId) => {
              setPaywallCourse(activeCourse);
            }}
          />
        ) : (
          /* Primary Navigation Views */
          <div>
            <div className="transition-opacity duration-350">
              {activeTab === "library" ? (
                <LibraryTab />
              ) : (
                <CoursesTab
                  userProfile={userProfile}
                  onOpenPaywall={(course) => setPaywallCourse(course)}
                  onOpenTotalAccessPaywall={() => setIsTotalAccessPaywall(true)}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Paywall Overlay Modal */}
      {paywallCourse && (
        <PaywallModal
          course={paywallCourse}
          onClose={() => setPaywallCourse(null)}
          onSimulatePurchase={async (id) => {
            await handleSimulatePurchase(id);
            // close paywall upon transaction success
            setTimeout(() => {
              setPaywallCourse(null);
            }, 1200);
          }}
          isProcessing={isProcessingPurchase}
        />
      )}

      {/* Total Access VIP Paywall Overlay Modal */}
      {isTotalAccessPaywall && (
        <PaywallModal
          course={null}
          isTotalAccess={true}
          onClose={() => setIsTotalAccessPaywall(false)}
          onSimulatePurchase={async (id) => {
            await handleSimulatePurchase(id);
            // close paywall upon transaction success
            setTimeout(() => {
              setIsTotalAccessPaywall(false);
            }, 1200);
          }}
          isProcessing={isProcessingPurchase}
        />
      )}

      {/* Footer copyright */}
      <footer className="border-t border-slate-200 dark:border-gray-950 bg-white dark:bg-[#04060a]/90 py-6 text-center text-xs text-gray-600">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-medium text-gray-500">
            PampaLearn AI © 2026. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 font-bold text-gray-500">
            <span className="hover:text-gray-400">Términos</span>
            <span className="hover:text-gray-400">Privacidad</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
