import { useEffect, useState } from "react";

interface MetaSyntaxHighlighterProps {
  code: string;
  className?: string;
}

const MetaSyntaxHighlighter = ({ code, className = "" }: MetaSyntaxHighlighterProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const highlightSyntax = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Comments
      if (line.trim().startsWith("#")) {
        return (
          <div key={idx} className="text-green-600 dark:text-green-400">
            {line}
          </div>
        );
      }

      // Environment tags (@env, @common, @features, @api, @services)
      if (line.trim().startsWith("@")) {
        const parts = line.split(" ");
        return (
          <div key={idx}>
            <span className="text-purple-500 dark:text-purple-400 font-semibold">{parts[0]}</span>
            {parts.length > 1 && <span className="text-foreground"> {parts.slice(1).join(" ")}</span>}
          </div>
        );
      }

      // Key-value pairs with types
      const keyValueMatch = line.match(/^(\s*)([a-z_]+):(string|int|bool|float|env)\s+(.+)$/);
      if (keyValueMatch) {
        const [, indent, key, type, value] = keyValueMatch;
        
        // Check if value contains $ENV
        const envMatch = value.match(/\$ENV\(([^)]+)\)/);
        if (envMatch) {
          return (
            <div key={idx}>
              {indent}
              <span className="text-amber-500 dark:text-amber-400">{key}</span>
              <span className="text-gray-500 dark:text-gray-400">:</span>
              <span className="text-blue-500 dark:text-blue-400">{type}</span>
              <span className="text-foreground"> </span>
              <span className="text-gray-700 dark:text-gray-300">{value.substring(0, value.indexOf("$ENV"))}</span>
              <span className="text-emerald-500 dark:text-emerald-400">$ENV</span>
              <span className="text-gray-500 dark:text-gray-400">(</span>
              <span className="text-gray-700 dark:text-gray-300">{envMatch[1]}</span>
              <span className="text-gray-500 dark:text-gray-400">)</span>
              <span className="text-gray-700 dark:text-gray-300">{value.substring(value.indexOf(")") + 1)}</span>
            </div>
          );
        }

        // Boolean values
        if (type === "bool") {
          return (
            <div key={idx}>
              {indent}
              <span className="text-amber-500 dark:text-amber-400">{key}</span>
              <span className="text-gray-500 dark:text-gray-400">:</span>
              <span className="text-blue-500 dark:text-blue-400">{type}</span>
              <span className="text-foreground"> </span>
              <span className="text-emerald-500 dark:text-emerald-400 font-medium">{value}</span>
            </div>
          );
        }

        // String values
        if (type === "string") {
          return (
            <div key={idx}>
              {indent}
              <span className="text-amber-500 dark:text-amber-400">{key}</span>
              <span className="text-gray-500 dark:text-gray-400">:</span>
              <span className="text-blue-500 dark:text-blue-400">{type}</span>
              <span className="text-foreground"> </span>
              <span className="text-gray-900 dark:text-gray-100">{value}</span>
            </div>
          );
        }

        // Numbers
        return (
          <div key={idx}>
            {indent}
            <span className="text-amber-500 dark:text-amber-400">{key}</span>
            <span className="text-gray-500 dark:text-gray-400">:</span>
            <span className="text-blue-500 dark:text-blue-400">{type}</span>
            <span className="text-foreground"> </span>
            <span className="text-emerald-500 dark:text-emerald-400">{value}</span>
          </div>
        );
      }

      // Empty lines
      if (line.trim() === "") {
        return <div key={idx}>&nbsp;</div>;
      }

      // Default
      return <div key={idx} className="text-foreground">{line}</div>;
    });
  };

  return (
    <div
      className={`bg-card font-mono text-sm overflow-x-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      <div className="text-foreground">
        {highlightSyntax(code)}
      </div>
    </div>
  );
};

export default MetaSyntaxHighlighter;