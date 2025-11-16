import { useState, useEffect } from "react";
import { ExternalLink, Github, Calendar, Star, GitBranch, Eye, RefreshCw, Twitter, ChevronRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface GitHubRepoData {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
    html_url: string;
  };
  language: string;
  topics: string[];
}

const KnowMeta = () => {
  const [repoData, setRepoData] = useState<GitHubRepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchRepoData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we have cached data
      const cachedData = localStorage.getItem('metaRepoData');
      const cacheTimestamp = localStorage.getItem('metaRepoDataTimestamp');
      
      // Use cached data if it's less than 5 minutes old
      if (cachedData && cacheTimestamp) {
        const ageInMinutes = (Date.now() - parseInt(cacheTimestamp)) / (1000 * 60);
        if (ageInMinutes < 5) {
          setRepoData(JSON.parse(cachedData));
          setLastUpdated(new Date(parseInt(cacheTimestamp)).toLocaleString());
          setLoading(false);
          return;
        }
      }
      
      // Fetch fresh data from GitHub API
      const response = await fetch('https://api.github.com/repos/ashavijit/meta');
      
      // Handle rate limiting
      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        if (resetTime) {
          const resetDate = new Date(parseInt(resetTime) * 1000);
          setError(`GitHub API rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}`);
        } else {
          setError('GitHub API rate limit exceeded. Please try again later.');
        }
        // Use cached data if available
        if (cachedData) {
          setRepoData(JSON.parse(cachedData));
        }
        return;
      }
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data: GitHubRepoData = await response.json();
      
      // Cache the data
      localStorage.setItem('metaRepoData', JSON.stringify(data));
      localStorage.setItem('metaRepoDataTimestamp', Date.now().toString());
      
      setRepoData(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error('Error fetching repository data:', err);
      setError('Failed to fetch repository information. Please try again later.');
      
      // Try to use cached data
      const cachedData = localStorage.getItem('metaRepoData');
      if (cachedData) {
        setRepoData(JSON.parse(cachedData));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepoData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Know Meta</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover everything about the Meta-Lang project on GitHub
            </p>
          </div>

          {loading && !repoData && (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading repository information...</p>
            </div>
          )}

          {error && (
            <div className="bg-card border border-border rounded-xl p-8 text-center mb-8">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchRepoData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          {repoData && (
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <Github className="h-6 w-6" />
                      {repoData.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">{repoData.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {repoData.topics.map((topic, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button asChild>
                    <a 
                      href={repoData.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on GitHub
                    </a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Star className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                    <p className="text-2xl font-bold">{repoData.stargazers_count}</p>
                    <p className="text-sm text-muted-foreground">Stars</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <GitBranch className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{repoData.forks_count}</p>
                    <p className="text-sm text-muted-foreground">Forks</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Eye className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">{repoData.watchers_count}</p>
                    <p className="text-sm text-muted-foreground">Watchers</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <p className="text-2xl font-bold">{new Date(repoData.created_at).getFullYear()}</p>
                    <p className="text-sm text-muted-foreground">Created</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Language:</span> {repoData.language}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {formatDate(repoData.created_at)}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> {formatDate(repoData.updated_at)}
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">Developer</h3>
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center">
                    <Github className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{repoData.owner.login}</h4>
                    <p className="text-muted-foreground">
                      Lead developer and creator of Meta-Lang
                    </p>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <a 
                        href={repoData.owner.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                        GitHub Profile
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {lastUpdated && (
                <div className="text-center text-sm text-muted-foreground">
                  Last updated: {lastUpdated}
                </div>
              )}
            </div>
          )}
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

export default KnowMeta;