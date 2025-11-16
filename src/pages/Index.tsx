import { useState, useEffect } from "react";
import { Github, Mail, Twitter, ChevronRight, Send, Sparkles, Shield, Zap, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const [email, setEmail] = useState("");
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for your interest!",
        description: "We'll notify you when Meta-Lang is ready.",
      });
      setEmail("");
    }
  };

  // CLI commands and their outputs
  const cliCommands = [
    { 
      command: "meta init", 
      output: [
        "Initializing Meta-Lang project...",
        "Creating app.config.meta...",
        "Creating .meta/ directory...",
        "Installing meta-lang SDK...",
        "Project initialized successfully!",
        ""
      ]
    },
    { 
      command: "meta validate app.config.meta", 
      output: [
        "Validating configuration...",
        "Checking syntax... ✓",
        "Validating types... ✓",
        "Checking environments... ✓",
        "Validation successful!",
        ""
      ]
    },
    { 
      command: "meta build --env prod", 
      output: [
        "Building for production...",
        "Loading configuration...",
        "Compiling assets...",
        "Optimizing bundle...",
        "Build completed in 2.4s",
        ""
      ]
    },
    { 
      command: "meta deploy --target staging", 
      output: [
        "Deploying to staging...",
        "Connecting to staging server...",
        "Uploading configuration...",
        "Restarting services...",
        "Deployment successful!",
        "View at: https://staging.myapp.com",
        ""
      ]
    }
  ];

  // Effect for CLI animation
  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1500;

    const handleTyping = () => {
      const currentCmd = cliCommands[currentCommand];
      
      if (!isDeleting && !showOutput) {
        // Typing the command
        if (displayedText.length < currentCmd.command.length) {
          setDisplayedText(currentCmd.command.substring(0, displayedText.length + 1));
        } else {
          // Finished typing, pause before showing output
          setTimeout(() => {
            setShowOutput(true);
            setOutputLines(currentCmd.output);
          }, pauseTime);
        }
      } else if (showOutput) {
        // Showing output, pause before deleting
        setTimeout(() => setIsDeleting(true), pauseTime * 2);
      } else if (isDeleting) {
        // Deleting the command and output
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        } else {
          // Finished deleting, move to next command
          setIsDeleting(false);
          setShowOutput(false);
          setOutputLines([]);
          setCurrentCommand((prev) => (prev + 1) % cliCommands.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, showOutput, currentCommand, cliCommands]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in">
            <div className="inline-flex items-center justify-center px-4 py-1 text-sm bg-card border border-border rounded-full mb-6">
              <Sparkles className="h-4 w-4 mr-2 text-accent" />
              <span className="text-foreground">Coming Soon</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              meta-lang
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              A new configuration standard is coming.
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Human-first. Typed. Immutable. Versioned.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-16 slide-up">
            <form onSubmit={handleNotify} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-64 bg-card border-border"
                required
              />
              <Button type="submit" variant="default">
                Notify Me
              </Button>
            </form>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                Star on GitHub
              </Button>
            </a>
          </div>

          {/* CLI Animation with Full Output */}
          <div className="slide-up max-w-2xl mx-auto mb-16">
            <div className="bg-card border border-border rounded-xl p-6 shadow-2xl">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-muted-foreground ml-2">terminal</div>
              </div>
              <div className="font-mono text-left">
                <div className="text-muted-foreground">$ <span className="text-foreground">{displayedText}</span><span className="ml-1 inline-block w-2 h-5 bg-foreground animate-pulse"></span></div>
                {showOutput && outputLines.map((line, index) => (
                  <div key={index} className={`mt-1 ${line.includes("✓") ? "text-green-500" : line.includes("https://") ? "text-blue-500 underline" : "text-foreground"}`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="slide-up max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              CLI tools for validation, building, and deployment
            </p>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-20 px-6 border-t border-border bg-gradient-to-b from-background to-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Developers Love Meta-Lang
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern applications with developer experience in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Human-friendly Syntax"
              description="Write configs that read like documentation. No more cryptic YAML or verbose JSON."
              icon={
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Code className="h-6 w-6 text-foreground" />
                </div>
              }
            />
            <FeatureCard
              title="Built-in Type Safety"
              description="Catch configuration errors at compile time with built-in type checking."
              icon={
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Shield className="h-6 w-6 text-foreground" />
                </div>
              }
            />
            <FeatureCard
              title="Lightning Fast"
              description="Zero-runtime overhead with compile-time validation and optimization."
              icon={
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Zap className="h-6 w-6 text-foreground" />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Environment-Aware Configuration
              </h2>
              <p className="text-muted-foreground mb-6">
                Define configurations for different environments with zero duplication. 
                Meta-Lang automatically merges common settings with environment-specific overrides.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-foreground"></div>
                  </div>
                  <span className="ml-3 text-foreground">Multi-environment support (@dev, @prod, @staging)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-foreground"></div>
                  </div>
                  <span className="ml-3 text-foreground">Automatic environment detection</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary flex items-center justify-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-foreground"></div>
                  </div>
                  <span className="ml-3 text-foreground">Zero-config deployment</span>
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <pre className="text-sm text-muted-foreground">
{`# Define common settings
@common
app_name:string MyApp
debug:bool false

# Override for development
@env dev
debug:bool true
port:int 3000

# Override for production
@env prod
port:int 8080`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Banner */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card border border-border rounded-2xl p-12 shadow-xl">
            <Mail className="h-12 w-12 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">
              Be first to try meta-lang
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the waitlist and get early access when we launch.
            </p>
            <form onSubmit={handleNotify} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background border-border"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Documentation
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
                  <Link to="/know-meta" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Know Meta
                  </Link>
                </li>
                <li>
                  <Link to="/language-support" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Language Support
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

export default Index;