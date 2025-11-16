import { Github, Twitter, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";

const Features = () => {
  const features = [
    {
      category: "🚀 MVP Features",
      status: "In Progress",
      statusColor: "bg-status-degraded",
      description: "Core functionality currently under development",
      items: [
        {
          name: ".meta Parser Engine",
          description: "High-performance parser with error recovery and detailed diagnostics. Supports all Meta-Lang syntax including environment tags, type annotations, and nested configurations.",
        },
        {
          name: "Typed Configuration System",
          description: "Strong typing with support for string, int, float, bool, and env types. Runtime validation ensures type safety across all environments.",
        },
        {
          name: "Environment Injection",
          description: "Dynamic environment variable support with $ENV() syntax. Includes fallback values and secure secret management.",
        },
        {
          name: "Multi-Environment Support",
          description: "Define configurations for @dev, @staging, @prod, and custom environments. Automatic inheritance from @common blocks prevents duplication.",
        },
        {
          name: "Config Loader & Merger",
          description: "Smart configuration loading with environment-specific overrides. Validates and merges configs with clear precedence rules.",
        },
        {
          name: "Version Control SDK",
          description: "Built-in versioning with @v tags. Track configuration changes over time with automatic hash generation and diff support.",
        },
        {
          name: "CLI Tool",
          description: "Command-line interface for init, validate, build, and deploy commands. Interactive prompts for easy configuration management.",
        },
      ],
    },
    {
      category: "📦 Upcoming Features",
      status: "Planned",
      statusColor: "bg-grey-400",
      description: "Next phase of development starting Q2 2025",
      items: [
        {
          name: "Web Dashboard",
          description: "Visual interface for browsing .meta versions, comparing configurations across environments, and managing deployments. Real-time collaboration features included.",
        },
        {
          name: "Syntax Highlighting & Editor Support",
          description: "VS Code extension with IntelliSense, auto-completion, and error highlighting. Plugins for Sublime Text, Vim, and other popular editors.",
        },
        {
          name: "Remote Repository Support",
          description: "Push and pull configurations from remote repositories. Git-like workflow with 'meta remote add origin' and 'meta push' commands.",
        },
        {
          name: "Cloud Config Storage",
          description: "Secure object store backend for configurations. End-to-end encryption with team access control and audit logs.",
        },
        {
          name: "Configuration Templates",
          description: "Pre-built templates for popular frameworks and stacks. Node.js, Python, Go, Kubernetes, and more. One-command initialization.",
        },
        {
          name: "Import & Export Tools",
          description: "Convert existing .env, YAML, JSON, and TOML files to .meta format. Export to various formats for backwards compatibility.",
        },
      ],
    },
    {
      category: "🧪 Experimental",
      status: "Researching",
      statusColor: "bg-grey-500",
      description: "Future possibilities being explored",
      items: [
        {
          name: "AI-Powered Validation",
          description: "Machine learning model that detects configuration anti-patterns, security vulnerabilities, and suggests optimizations based on best practices.",
        },
        {
          name: "Semantic Version Diffing",
          description: "Intelligent diff tool that understands configuration semantics. Highlights meaningful changes and filters out noise like formatting or comment updates.",
        },
        {
          name: "Visual Config Builder",
          description: "Drag-and-drop interface for building configurations. Generate .meta files from visual flowcharts and architecture diagrams.",
        },
        {
          name: "Secrets Rotation",
          description: "Automatic credential rotation with integration to popular secret management systems like Vault, AWS Secrets Manager, and Azure Key Vault.",
        },
        {
          name: "Configuration Testing Framework",
          description: "Write tests for your configurations. Validate that staging configs are proper subsets of production, check for required fields, and more.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Feature Roadmap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track what we&apos;re building and what&apos;s coming next. Meta-Lang is evolving to become the standard for configuration management.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((group, idx) => (
              <div key={idx} className="fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="mb-10 pb-4 border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h2 className="text-3xl font-bold">{group.category}</h2>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${group.statusColor} pulse-dot`} />
                      <span className="text-sm font-medium text-muted-foreground px-3 py-1 bg-card border border-border rounded-full">
                        {group.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground max-w-3xl">{group.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item, itemIdx) => (
                    <FeatureCard
                      key={itemIdx}
                      title={item.name}
                      description={item.description}
                      className="h-full hover:shadow-lg transition-shadow duration-300"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-3">Why These Features?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
                Every feature is designed to solve real problems developers face with configuration management. 
                We&apos;re building Meta-Lang based on feedback from teams managing configs across hundreds of services and environments.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-center">Have a Feature Request?</h3>
              <p className="text-muted-foreground text-center mb-8 text-lg">
                We&apos;re actively listening to the developer community. Share your ideas and vote on features.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors underline font-medium"
                >
                  Open a GitHub Issue
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors underline font-medium"
                >
                  Join Discord Community
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors underline font-medium"
                >
                  Follow on Twitter
                </a>
              </div>
            </div>
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
                  <a href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/know-meta" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Know Meta
                  </a>
                </li>
                <li>
                  <a href="/language-support" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Language Support
                  </a>
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

export default Features;