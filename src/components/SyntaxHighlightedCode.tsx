import { useEffect, useState } from "react";

interface SyntaxHighlightedCodeProps {
  code: string;
  className?: string;
  // Added lintErrors prop for linting indicators
  lintErrors?: Array<{
    line: number;
    message: string;
    type: 'error' | 'warning';
  }>;
}

const SyntaxHighlightedCode = ({ code, className = "", lintErrors = [] }: SyntaxHighlightedCodeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create a map of lint errors by line number for quick lookup
  const lintErrorMap = lintErrors.reduce((acc, error) => {
    acc[error.line] = error;
    return acc;
  }, {} as Record<number, { message: string; type: 'error' | 'warning' }>);

  const highlightSyntax = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Check if there's a lint error for this line
      const lintError = lintErrorMap[idx + 1]; // Lines are 1-indexed in lint errors
      
      // Render lint indicator if there's an error
      const renderLintIndicator = () => {
        if (!lintError) return null;
        
        return (
          <div className="absolute left-0 top-0 bottom-0 flex items-center -ml-6">
            <div 
              className={`w-3 h-3 rounded-full ${
                lintError.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`}
              title={lintError.message}
            />
          </div>
        );
      };

      // Comments
      if (line.trim().startsWith("#")) {
        return (
          <div key={idx} className="relative">
            {renderLintIndicator()}
            <div className="text-muted-foreground">
              {line}
            </div>
          </div>
        );
      }

      // Environment tags (@env, @common, @features, @api, @services)
      if (line.trim().startsWith("@")) {
        const parts = line.split(" ");
        return (
          <div key={idx} className="relative">
            {renderLintIndicator()}
            <div>
              <span className="text-accent font-semibold">{parts[0]}</span>
              {parts.length > 1 && <span className="text-foreground"> {parts.slice(1).join(" ")}</span>}
            </div>
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
            <div key={idx} className="relative">
              {renderLintIndicator()}
              <div>
                {indent}
                <span className="text-grey-700">{key}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-grey-500">{type}</span>
                <span className="text-foreground"> </span>
                <span className="text-grey-600">{value.substring(0, value.indexOf("$ENV"))}</span>
                <span className="text-accent">$ENV</span>
                <span className="text-muted-foreground">(</span>
                <span className="text-grey-700">{envMatch[1]}</span>
                <span className="text-muted-foreground">)</span>
                <span className="text-grey-600">{value.substring(value.indexOf(")") + 1)}</span>
              </div>
            </div>
          );
        }

        // Boolean values
        if (type === "bool") {
          return (
            <div key={idx} className="relative">
              {renderLintIndicator()}
              <div>
                {indent}
                <span className="text-grey-700">{key}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-grey-500">{type}</span>
                <span className="text-foreground"> </span>
                <span className="text-accent font-medium">{value}</span>
              </div>
            </div>
          );
        }

        // String values
        if (type === "string") {
          return (
            <div key={idx} className="relative">
              {renderLintIndicator()}
              <div>
                {indent}
                <span className="text-grey-700">{key}</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-grey-500">{type}</span>
                <span className="text-foreground"> </span>
                <span className="text-grey-800">{value}</span>
              </div>
            </div>
          );
        }

        // Numbers
        return (
          <div key={idx} className="relative">
            {renderLintIndicator()}
            <div>
              {indent}
              <span className="text-grey-700">{key}</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-grey-500">{type}</span>
              <span className="text-foreground"> </span>
              <span className="text-accent">{value}</span>
            </div>
          </div>
        );
      }

      // Empty lines
      if (line.trim() === "") {
        return (
          <div key={idx} className="relative">
            {renderLintIndicator()}
            <div>&nbsp;</div>
          </div>
        );
      }

      // Default
      return (
        <div key={idx} className="relative">
          {renderLintIndicator()}
          <div>{line}</div>
        </div>
      );
    });
  };

  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 font-mono text-sm overflow-x-auto transition-all duration-500 relative ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      <div className="text-foreground">
        {highlightSyntax(code)}
      </div>
    </div>
  );
};

export default SyntaxHighlightedCode;