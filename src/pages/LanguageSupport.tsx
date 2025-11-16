import { useState } from "react";
import { Code, CheckCircle, Clock, ExternalLink, Github, Twitter, ChevronRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const LanguageSupport = () => {
  const [email, setEmail] = useState("");

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      alert(`Thank you! We'll notify you when updates are available for ${email}`);
      setEmail("");
    }
  };

  const languages = [
    {
      name: "JavaScript/Node.js",
      status: "stable",
      version: "1.0.0",
      description: "Full support for Node.js applications with Express, Fastify, and other frameworks",
      features: ["Config loading", "Environment variables", "Type validation", "CLI tools"],
    },
    {
      name: "Python",
      status: "in-development",
      version: "0.0.0",
      description: "Coming soon! Python SDK for Flask, Django, and FastAPI applications",
      features: ["Config loading", "Environment variables", "Type validation", "CLI tools"],
    },
    {
      name: "Go",
      status: "in-development",
      version: "0.0.0",
      description: "Coming soon! Go SDK for building high-performance applications",
      features: ["Config loading", "Environment variables", "Type validation", "CLI tools"],
    },
    {
      name: "C++",
      status: "in-development",
      version: "0.0.0",
      description: "Coming soon! C++ SDK for system-level applications",
      features: ["Config loading", "Environment variables", "Type validation"],
    },
    {
      name: "C",
      status: "in-development",
      version: "0.0.0",
      description: "Coming soon! C SDK for embedded and low-level applications",
      features: ["Config loading", "Environment variables", "Type validation"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border mb-6">
              <Code className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Language Support</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meta-Lang is expanding to support multiple programming languages
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {languages.map((language, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{language.name}</h3>
                  {language.status === "stable" ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Stable</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Clock className="h-5 w-5" />
                      <span className="text-sm font-medium">In Development</span>
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4">{language.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Features:</p>
                  <ul className="space-y-1">
                    {language.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">v{language.version}</span>
                  {language.status === "stable" ? (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Docs
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to be notified when new language SDKs are released
            </p>
            <form onSubmit={handleNotify} className="flex gap-2 flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background border border-border rounded-md px-4 py-2 text-foreground"
                required
              />
              <Button type="submit" variant="default">
                Notify Me
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                meta-lang
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A new configuration standard for modern applications.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/ashavijit/meta" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/know-meta" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Know Meta
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/ashavijit/meta" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://github.com/ashavijit" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Developer: ashavijit
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Subscribe</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get updates on new features and releases.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground"
                />
                <Button className="rounded-r-lg rounded-l-none bg-foreground text-background hover:bg-muted-foreground">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Meta-Lang — Built for developers who love clean configs ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LanguageSupport;