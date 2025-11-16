import { useState } from "react";
import { Copy, Check, Download, Upload, FileText, Github, Twitter, ChevronRight, Send, FileJson, FileCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Playground = () => {
  const [inputContent, setInputContent] = useState("");
  const [metaContent, setMetaContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [inputFormat, setInputFormat] = useState("env"); // env, json, yaml

  // Helper function to infer type
  const inferType = (value: any): string => {
    if (typeof value === "boolean") return "bool";
    if (typeof value === "number") {
      return Number.isInteger(value) ? "int" : "float";
    }
    if (typeof value === "string") {
      // Check for environment variables
      if (value.includes("$") || value.includes("${")) return "env";
      // Check for numbers in strings
      if (/^-?\d+$/.test(value)) return "int";
      if (/^-?\d*\.\d+$/.test(value)) return "float";
      // Check for booleans in strings
      if (value.toLowerCase() === "true" || value.toLowerCase() === "false") return "bool";
      return "string";
    }
    return "string";
  };

  // Convert flat key-value pairs to meta format
  const convertToMeta = (obj: Record<string, any>, prefix = ""): string[] => {
    const lines: string[] = [];
    
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}_${key}` : key;
      
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // Handle nested objects
        lines.push(...convertToMeta(value, fullKey));
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            lines.push(...convertToMeta(item, `${fullKey}_${index}`));
          } else {
            const type = inferType(item);
            lines.push(`${fullKey}_${index}:${type} ${item}`);
          }
        });
      } else {
        // Handle primitive values
        const type = inferType(value);
        lines.push(`${fullKey.toLowerCase()}:${type} ${value}`);
      }
    });
    
    return lines;
  };

  const convertEnvToMeta = () => {
    if (!inputContent.trim()) {
      setMetaContent("");
      return;
    }

    try {
      const lines = inputContent.split("\n");
      const metaLines = [
        "# ===============================",
        "# Auto-converted from .env to .meta format",
        "# ===============================",
        "",
        "@common",
        "@v 1.0.0"
      ];

      lines.forEach(line => {
        line = line.trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith("#")) {
          return;
        }

        // Handle key=value pairs
        if (line.includes("=")) {
          const [key, ...valueParts] = line.split("=");
          const value = valueParts.join("=").trim();
          
          // Try to infer type
          let type = "string";
          let formattedValue = value;
          
          // Remove quotes if present
          if (formattedValue.startsWith('"') && formattedValue.endsWith('"')) {
            formattedValue = formattedValue.slice(1, -1);
          } else if (formattedValue.startsWith("'") && formattedValue.endsWith("'")) {
            formattedValue = formattedValue.slice(1, -1);
          }
          
          // Check for boolean values
          if (formattedValue.toLowerCase() === "true" || formattedValue.toLowerCase() === "false") {
            type = "bool";
            formattedValue = formattedValue.toLowerCase();
          } 
          // Check for numbers
          else if (/^-?\d+$/.test(formattedValue)) {
            type = "int";
          } else if (/^-?\d*\.\d+$/.test(formattedValue)) {
            type = "float";
          }
          // Check for environment variables
          else if (formattedValue.includes("$") || formattedValue.includes("${")) {
            type = "env";
          }
          
          metaLines.push(`${key.toLowerCase()}:${type} ${formattedValue}`);
        }
      });

      metaLines.push("");
      setMetaContent(metaLines.join("\n"));
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to convert .env to .meta format. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const convertJsonToMeta = () => {
    if (!inputContent.trim()) {
      setMetaContent("");
      return;
    }

    try {
      const jsonObj = JSON.parse(inputContent);
      const metaLines = [
        "# ===============================",
        "# Auto-converted from JSON to .meta format",
        "# ===============================",
        "",
        "@common",
        "@v 1.0.0"
      ];

      metaLines.push(...convertToMeta(jsonObj));
      metaLines.push("");
      setMetaContent(metaLines.join("\n"));
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to parse JSON. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const convertYamlToMeta = () => {
    if (!inputContent.trim()) {
      setMetaContent("");
      return;
    }

    try {
      // Simple YAML parser for basic key-value pairs
      const lines = inputContent.split("\n");
      const metaLines = [
        "# ===============================",
        "# Auto-converted from YAML to .meta format",
        "# ===============================",
        "",
        "@common",
        "@v 1.0.0"
      ];

      lines.forEach(line => {
        line = line.trim();
        
        // Skip empty lines and comments
        if (!line || line.startsWith("#")) {
          return;
        }

        // Handle key: value pairs (simple cases)
        if (line.includes(":")) {
          const [key, ...valueParts] = line.split(":");
          const value = valueParts.join(":").trim();
          
          // Try to infer type
          let type = "string";
          let formattedValue = value;
          
          // Remove quotes if present
          if (formattedValue.startsWith('"') && formattedValue.endsWith('"')) {
            formattedValue = formattedValue.slice(1, -1);
          } else if (formattedValue.startsWith("'") && formattedValue.endsWith("'")) {
            formattedValue = formattedValue.slice(1, -1);
          }
          
          // Check for boolean values
          if (formattedValue.toLowerCase() === "true" || formattedValue.toLowerCase() === "false") {
            type = "bool";
            formattedValue = formattedValue.toLowerCase();
          } 
          // Check for numbers
          else if (/^-?\d+$/.test(formattedValue)) {
            type = "int";
          } else if (/^-?\d*\.\d+$/.test(formattedValue)) {
            type = "float";
          }
          // Check for environment variables
          else if (formattedValue.includes("$") || formattedValue.includes("${")) {
            type = "env";
          }
          
          metaLines.push(`${key.trim().toLowerCase()}:${type} ${formattedValue}`);
        }
      });

      metaLines.push("");
      setMetaContent(metaLines.join("\n"));
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to parse YAML. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const handleConvert = () => {
    switch (inputFormat) {
      case "env":
        convertEnvToMeta();
        break;
      case "json":
        convertJsonToMeta();
        break;
      case "yaml":
        convertYamlToMeta();
        break;
      default:
        convertEnvToMeta();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(metaContent);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The .meta content has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([metaContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.meta";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputContent(content);
      
      // Try to detect format from file extension
      if (file.name.endsWith(".json")) {
        setInputFormat("json");
      } else if (file.name.endsWith(".yaml") || file.name.endsWith(".yml")) {
        setInputFormat("yaml");
      } else if (file.name.endsWith(".env")) {
        setInputFormat("env");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border mb-6">
              <FileText className="h-8 w-8 text-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Config Format Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert .env, JSON, and YAML configurations to the modern .meta format
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              variant={inputFormat === "env" ? "default" : "outline"}
              onClick={() => setInputFormat("env")}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              .env
            </Button>
            <Button
              variant={inputFormat === "json" ? "default" : "outline"}
              onClick={() => setInputFormat("json")}
              className="flex items-center gap-2"
            >
              <FileJson className="h-4 w-4" />
              JSON
            </Button>
            <Button
              variant={inputFormat === "yaml" ? "default" : "outline"}
              onClick={() => setInputFormat("yaml")}
              className="flex items-center gap-2"
            >
              <FileCode className="h-4 w-4" />
              YAML
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {inputFormat === "env" && ".env Content"}
                  {inputFormat === "json" && "JSON Content"}
                  {inputFormat === "yaml" && "YAML Content"}
                </h2>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept=".env,.txt,.json,.yaml,.yml"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
              <Textarea
                placeholder={
                  inputFormat === "env" 
                    ? "# Paste your .env content here\nAPI_KEY=sk-1234567890\nDATABASE_URL=postgresql://user:pass@localhost/db\nDEBUG=true\nPORT=3000"
                    : inputFormat === "json"
                    ? "{\n  \"api_key\": \"sk-1234567890\",\n  \"database_url\": \"postgresql://user:pass@localhost/db\",\n  \"debug\": true,\n  \"port\": 3000\n}"
                    : "# Paste your YAML content here\napi_key: sk-1234567890\ndatabase_url: postgresql://user:pass@localhost/db\ndebug: true\nport: 3000"
                }
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm bg-background"
              />
              <Button 
                onClick={handleConvert} 
                className="w-full mt-4"
                disabled={!inputContent.trim()}
              >
                Convert to .meta
              </Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">.meta Output</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    disabled={!metaContent}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownload}
                    disabled={!metaContent}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                value={metaContent}
                readOnly
                className="min-h-[400px] font-mono text-sm bg-background"
                placeholder="# Your converted .meta content will appear here"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-foreground">1</div>
                <h3 className="text-lg font-semibold">Select Format</h3>
                <p className="text-muted-foreground">
                  Choose between .env, JSON, or YAML input formats.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-foreground">2</div>
                <h3 className="text-lg font-semibold">Convert</h3>
                <p className="text-muted-foreground">
                  Paste your configuration or upload a file, then click convert.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-muted-foreground">3</div>
                <h3 className="text-lg font-semibold">Use</h3>
                <p className="text-muted-foreground">
                  Copy the result or download as a .meta file to use in your Meta-Lang projects.
                </p>
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
                  <Link to="/language-support" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-foreground" />
                    Language Support
                  </Link>
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

export default Playground;