import { useState } from "react";
import "./App.css";
// import RepoPreview from "./components/repoPreview/RepoPreview";
import { fetchRepository } from "./api/repository.api";
import type { RepoDataResponse } from "./types/repository.types";
import RepositoryCard from "./components/RepoCard/RepositoryCard";

function App() {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [repoData, setRepoData] = useState<RepoDataResponse | null>(null);

  const handleAnalyze = async () => {
    try {
      setError("");
      setIsLoading(true);
      setRepoData(null);
      const { repo, owner } = ParsedGithubURL(repoUrl);
      console.log(repo, owner);
      const data = await fetchRepository(owner, repo);
      console.log(data);
      setRepoData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const ParsedGithubURL = (url: string) => {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      throw new Error("Invalid URL format");
    }
    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "github.com"
    ) {
      throw new Error("Please enter a valid GitHub HTTPS URL");
    }
    const parts = parsedUrl.pathname.split("/").filter(Boolean);

    if (parts.length !== 2) {
      throw new Error("Invalid GitHub repository path");
    }

    const [owner, repo] = parts;

    return { owner, repo };
  };

  return (
    <main className="app-container">
      <div className="repo-card">
        {/* Header */}
        <header className="top-bar">
          <div className="brand">
            <span className="brand-logo">{"</>"}</span>
            <span>
              RepoPilot <strong>AI</strong>
            </span>
          </div>

          <span className="top-tag">Developer Intelligence</span>
        </header>

        {/* Hero */}
        <section className="hero-section">
          <span className="eyebrow">GITHUB REPOSITORY EXPLORER</span>

          <h1>
            Understand code.
            <br />
            <span>Move faster.</span>
          </h1>

          <p className="subtitle">
            Explore repository insights, understand codebases, and accelerate
            development with AI.
          </p>
        </section>

        {/* Search panel */}
        <section className="search-panel">
          <div className="panel-heading">
            <h2>Analyze a repository</h2>
            <span className="github-tag">GITHUB</span>
          </div>

          <div className="search-section">
            <label htmlFor="repo-url">Repository URL</label>

            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                ↗
              </span>

              <input
                id="repo-url"
                className="repo-input"
                type="text"
                placeholder="https://github.com/facebook/react"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                aria-invalid={Boolean(error)}
              />
            </div>

            {error ? (
              <p className="error-message" role="alert">
                <span aria-hidden="true">!</span>
                {error}
              </p>
            ) : (
              <p className="input-hint">
                Paste a public GitHub repository URL to get started.
              </p>
            )}
          </div>

          <button
            className="analyze-btn"
            type="button"
            onClick={handleAnalyze}
            disabled={!repoUrl.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <span className="button-spinner" aria-hidden="true" />
                <span>Analyzing Repository...</span>
              </>
            ) : (
              <>
                <span>Analyze Repository</span>
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>

          {/* Repository Loading UI */}

          {isLoading && (
            <div className="analysis-loader" role="status" aria-live="polite">
              <div className="loader-header">
                <div className="loader-icon" aria-hidden="true">
                  <span className="loader-spinner" />
                </div>

                <div className="loader-info">
                  <h3>Analyzing repository</h3>
                  <p>Fetching repository metadata from GitHub...</p>
                </div>

                <span className="loader-status-dot" aria-hidden="true" />
              </div>

              <div className="loader-progress" aria-hidden="true">
                <div className="loader-progress-bar" />
              </div>

              <div className="loader-skeleton" aria-hidden="true">
                <div className="skeleton-top">
                  <div className="skeleton-avatar skeleton-shimmer" />

                  <div className="skeleton-content">
                    <div className="skeleton-line skeleton-title skeleton-shimmer" />
                    <div className="skeleton-line skeleton-subtitle skeleton-shimmer" />
                  </div>
                </div>

                <div className="skeleton-line skeleton-full skeleton-shimmer" />
                <div className="skeleton-line skeleton-medium skeleton-shimmer" />

                <div className="skeleton-stats">
                  <div className="skeleton-stat skeleton-shimmer" />
                  <div className="skeleton-stat skeleton-shimmer" />
                </div>
              </div>

              <p className="loader-footer">
                Fetching public repository information...
              </p>
            </div>
          )}

          <div className="panel-divider" />

          {/* <div className="preview-section"> */}
          {/* <span className="preview-label">LIVE INPUT PREVIEW</span> */}

          {/* <RepoPreview url={repoUrl} /> */}
          {repoData && !isLoading && <RepositoryCard repository={repoData} />}
          {/* </div> */}
        </section>

        <p className="footer-note">Built with React, TypeScript & Fastify</p>
      </div>
    </main>
  );
}

export default App;
