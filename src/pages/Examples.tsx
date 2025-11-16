import { useState } from "react";
import { Code, Copy, Check, Github, Twitter, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MetaSyntaxHighlighter from "@/components/MetaSyntaxHighlighter";

const Examples = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const exampleCode = `/**
 * Simple Express App using meta-lang SDK
 * Demonstrates how to use meta-lang for configuration management
 */

const express = require('express');
const config = require('./src/app-config');

// Initialize config (loads app.config.meta)
config.initConfig({
  configPath: './app.config.meta',
  env: 'prod',
  setEnv: true, // Auto-set process.env variables
  warnOnMissing: true
}); 

// Create Express app
const app = express();

// Get config values
const port = config.get('port', 3000);
const host = config.get('host', 'localhost');
const appName = config.get('app_name', 'Meta App');
const debug = config.get('debug', false);

// Middleware
app.use(express.json());

// Logging middleware (if debug is enabled)
if (debug) {
  app.use((req, res, next) => {
    console.log([\${new Date().toISOString()}] \${req.method} \${req.path});
    next();
  });
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: \`Welcome to \${appName}\`,
    environment: process.env.NODE_ENV || 'dev',
    config: {
      app_name: config.get('app_name'),
      version: config.get('version'),
      debug: config.get('debug'),
      port: config.get('port'),
      host: config.get('host')
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'dev'
  });
});

app.get('/config', (req, res) => {
  // Return non-sensitive config
  const safeConfig = {
    app_name: config.get('app_name'),
    version: config.get('version'),
    description: config.get('description'),
    debug: config.get('debug'),
    log_level: config.get('log_level'),
    timeout: config.get('timeout'),
    port: config.get('port'),
    host: config.get('host'),
    database_driver: config.get('database_driver'),
    database_host: config.get('database_host'),
    cache_enabled: config.get('cache_enabled'),
    cache_host: config.get('cache_host'),
    cache_port: config.get('cache_port')
  };
  res.json(safeConfig);
});

// Start server
app.listen(port, host, () => {
  console.log(\`
🚀 \${appName} is running!
📍 Server: http://\${host}:\${port}
🌍 Environment: \${process.env.NODE_ENV || 'dev'}
🐛 Debug mode: \${debug}
\`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down gracefully...');
  process.exit(0);
});`;

  const metaConfigExample = `# ===============================
# Meta Configuration File
# Production-ready replacement for .env files
# ===============================

# Common settings (shared across all environments)
@common
@v 1.0.0
app_name:string MyApp
version:float 1.0.0
description:string A production-ready Node.js application

# Application settings
@common
debug:bool false
log_level:string info
timeout:int 30

# Database configuration (common)
@common
database_driver:string postgresql
database_pool_min:int 2
database_pool_max:int 10

# Cache configuration (common)
@common
cache_ttl:int 3600
cache_prefix:string app

# ===============================
# Development Environment
# ===============================

@env dev
debug:bool true
log_level:string debug
port:int 3000
host:string localhost

# Development database
@env dev
database_host:string localhost
database_port:int 5432
database_name:string myapp_dev
database_user:string dev_user
database_password:env $ENV(DB_PASS_DEV, "dev_password")
database_ssl:bool false

# Development cache
@env dev
cache_enabled:bool true
cache_host:string localhost
cache_port:int 6379
cache_password:env $ENV(REDIS_PASS_DEV, "")

# ===============================
# Production Environment
# ===============================

@env prod
debug:bool false
log_level:string warn
port:int 8080
host:string api.myapp.com

# Production database
@env prod
database_host:string prod.db.myapp.com
database_port:int 5432
database_name:string myapp_prod
database_user:env $ENV(DB_USER_PROD)
database_password:env $ENV(DB_PASS_PROD)
database_ssl:bool true

# Production cache
@env prod
cache_enabled:bool true
cache_host:string cache.prod.myapp.com
cache_port:int 6379
cache_password:env $ENV(REDIS_PASS_PROD)`;

  const handleCopy = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    toast({
      title: "Copied to clipboard!",
      description: `The ${name} code has been copied to your clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border mb-6">
              <Code className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Examples</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Meta-Lang can simplify your configuration management
            </p>
          </div>

          <div className="space-y-20">
            {/* Express.js Example */}
            <div className="fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Express.js Integration</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Learn how to integrate Meta-Lang with Express.js for powerful configuration management.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex justify-between items-center px-6 py-3 border-b border-border bg-muted/50">
                  <h3 className="font-medium">express-app.js</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(exampleCode, "Express.js")}
                  >
                    {copied === "Express.js" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied === "Express.js" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="p-6 overflow-x-auto">
                  <SyntaxHighlighter 
                    language="javascript" 
                    style={document.documentElement.classList.contains('dark') ? oneDark : oneLight}
                    customStyle={{
                      backgroundColor: 'transparent',
                      padding: '0',
                      margin: '0',
                      fontSize: '0.875rem',
                      borderRadius: '0.5rem',
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

                      }
                    }}
                  >
                    {exampleCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>

            {/* Meta Config Example */}
            <div className="fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Meta Configuration File</h2>
                <p className="text-muted-foreground max-w-3xl">
                  This is what a complete .meta configuration file looks like with multiple environments.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex justify-between items-center px-6 py-3 border-b border-border bg-muted/50">
                  <h3 className="font-medium">app.config.meta</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(metaConfigExample, "Meta Config")}
                  >
                    {copied === "Meta Config" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied === "Meta Config" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="p-6 overflow-x-auto">
                  <MetaSyntaxHighlighter code={metaConfigExample} />
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="fade-in bg-card border border-border rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Why Meta-Lang?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Before Meta-Lang</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>Multiple .env files for different environments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>No type safety for configuration values</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>Manual environment variable management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>No built-in version control for configs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">With Meta-Lang</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>Single .meta file with typed configurations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>Automatic environment variable injection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>Built-in versioning with @v tags</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-accent">•</span>
                      <span>Environment-specific overrides with inheritance</span>
                    </li>
                  </ul>
                </div>
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
                  <a href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Features
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

export default Examples;