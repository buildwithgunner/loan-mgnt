import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import GlobalBackground from "./components/layout/GlobalBackground";

const ADMIN_ROUTES = [
  "/admin",
  "/admin/users",
  "/admin/applications",
  "/admin/loans",
  "/admin/repayments",
  "/admin/guarantors",
  "/admin/reports",
  "/admin/notifications",
  "/admin/documents",
  "/admin/settings",
  "/admin/security",
];

function App() {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isAdmin = ADMIN_ROUTES.some((r) => location.pathname === r || location.pathname.startsWith(r + "/"));

  // Auto-close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <GlobalBackground />
      {isAdmin ? (
        <div className="min-h-screen relative z-10 flex">
          <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
            <Navbar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
            <main className="pt-20 p-4 md:p-6 lg:p-8">
              <AppRoutes />
            </main>
          </div>
          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[15] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;
