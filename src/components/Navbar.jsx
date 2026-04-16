import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Film, LogOut, Search, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Only show the navigation bar if a user is logged in
  if (!user) return null; 

  return (
  <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/30 backdrop-blur-xl">
    {/* Notice 'max-w-7xl' or 'container' - we want this flex and full width */}
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      
      {/* LEFT SIDE: Brand and Main Links */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-gradient">CORE-HUB</span>
        </Link>
        
        <div className="hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <Search size={16} /> Search
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: Account and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-2">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-primary font-bold leading-none">Member</span>
            <span className="text-[11px] font-medium text-muted-foreground">Premium Access</span>
          </div>
          
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-amber-600 flex items-center justify-center border border-primary/20 shadow-sm">
            <span className="text-sm font-bold text-black">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-border/40 mx-2" />

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
        >
          <LogOut size={18} />
          <span className="hidden lg:inline font-medium">Logout</span>
        </Button>
      </div>
      
    </div>
  </nav>
);

  
          
      
      

};

export default Navbar;