import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Film, LogOut, User } from 'lucide-react';

const Layout = ({ children }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* 1. THE BACKGROUND GLOWS */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[5%] h-[400px] w-[500px] rounded-full bg-amber-600/5 blur-[100px]" />
      </div>

      {/* 2. THE GLASS SIDEBAR */}
      <aside className="w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl h-screen sticky top-0 flex flex-col">
        <div className="p-8">
          <h1 className="font-display text-2xl font-bold text-gradient">CORE-HUB</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/movies" className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all">
            <Film size={20} />
            <span className="font-medium">My Movies</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-border/40 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-amber-600 flex items-center justify-center text-xs font-bold text-black">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium truncate">{user?.email}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;