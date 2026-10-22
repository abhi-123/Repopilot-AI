import type { RepositoryCardProps } from "../../types/repository.types";
import "./RepositoryCard.css";

function RepositoryCard({ repository }: RepositoryCardProps) {
  const githubUrl = `https://github.com/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}`;

  return (
    <section className="repository-details-card">
      <div className="repository-topbar">
        <div className="repository-loaded">
          <span className="repository-loaded-dot" />
          REPOSITORY LOADED
        </div>

        <span className="repository-type">GITHUB REPOSITORY</span>
      </div>

      <div className="repository-header">
        <div className="repository-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 1.8 3.19 1.27.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.07-1.15 3.07-1.15.61 1.54.23 2.68.12 2.96.72.78 1.14 1.78 1.14 3 0 4.3-2.61 5.25-5.1 5.53.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
          </svg>
        </div>

        <div className="repository-heading">
          <h2>{repository.name}</h2>
          <p>
            <span>{repository.owner}</span>
            <span className="repository-separator">/</span>
            <span>{repository.name}</span>
          </p>
        </div>

        <a
          className="repository-open-icon"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${repository.name} on GitHub`}
          title="Open on GitHub"
        >
          ↗
        </a>
      </div>

      <p className="repository-description">
        {repository.description ??
          "No description available for this repository."}
      </p>

      <div className="repository-divider" />

      <div className="repository-stats">
        <div className="repository-stat-box">
          <div className="repository-stat-label">
            <span className="repository-star-icon" aria-hidden="true">
              ★
            </span>
            <span>Stars</span>
          </div>

          <strong>{repository.stars.toLocaleString("en-US")}</strong>
          <small>GitHub stars</small>
        </div>

        <div className="repository-stat-box">
          <div className="repository-stat-label">
            <span className="repository-fork-icon" aria-hidden="true">
              ⑂
            </span>
            <span>Forks</span>
          </div>

          <strong>{repository.forks.toLocaleString("en-US")}</strong>
          <small>Repository forks</small>
        </div>
      </div>

      <div className="repository-footer">
        <span className="repository-source">
          <span className="repository-source-dot" />
          Fetched from GitHub
        </span>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="repository-github-link"
        >
          View on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export default RepositoryCard;
