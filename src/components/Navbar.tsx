import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, BookOpen, Home, Sparkles, Code, Menu, X, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { path: "/features", label: "Features", icon: <Sparkles className="h-4 w-4" /> },
    { path: "/examples", label: "Examples", icon: <Code className="h-4 w-4" /> },
    { path: "/playground", label: "Playground", icon: <FileText className="h-4 w-4" /> },
    { path: "/docs", label: "Docs", icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/90 backdrop-blur-2xl shadow-xl border-border/40"
          : "bg-card/80 backdrop-blur-xl border-border/30"
      } border rounded-2xl px-4 py-3 max-w-4xl w-[calc(100%-2rem)]`}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold tracking-tight text-foreground">
            meta-lang
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                size="sm"
                className={`rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(item.path) 
                    ? "shadow-md bg-muted text-foreground border border-border" 
                    : "hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            </Link>
          ))}
          <a href="https://github.com/ashavijit/meta" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-sm font-medium border-border hover:bg-muted hover:border-border transition-all duration-300"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </a>

          <div className="w-px h-6 bg-border/40 mx-2" />

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="rounded-xl w-9 h-9 p-0 transition-all duration-300 hover:bg-muted"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="rounded-xl w-9 h-9 p-0 transition-all duration-300 hover:bg-muted"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-xl w-9 h-9 p-0 border-border hover:bg-muted hover:border-border transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-3 py-4 border border-border/40 rounded-2xl bg-card/95 backdrop-blur-2xl shadow-xl">
          <div className="flex flex-col space-y-1 px-3">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  size="sm"
                  className={`w-full justify-start rounded-xl text-sm font-medium my-1 ${
                    isActive(item.path) 
                      ? "shadow-md bg-muted text-foreground border border-border" 
                      : "hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Button>
              </Link>
            ))}
            <a 
              href="https://github.com/ashavijit/meta" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start rounded-xl text-sm font-medium my-1 border-border hover:bg-muted hover:border-border"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;