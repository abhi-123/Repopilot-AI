# 🚀 RepoPilot AI

**AI-Powered Developer Intelligence Platform**

RepoPilot AI is an evolving full-stack developer platform designed to help engineers explore GitHub repositories, understand unfamiliar codebases, investigate bugs, and review pull requests using Retrieval-Augmented Generation (RAG) and AI agents.

The project is being developed incrementally, focusing on practical software architecture, modern frontend engineering, backend scalability, and AI-powered developer workflows.

> **Project Status:** Active Development — Foundation Phase

## ✨ Current Features

### Backend

- REST API built using Node.js and Fastify.
- GitHub REST API integration for public repository metadata.
- Repository-specific in-memory caching with a 5-minute TTL.
- In-flight Promise deduplication to prevent redundant concurrent requests within a single backend process.
- Repository response transformation into a simplified application-specific format.
- Asynchronous error handling and pending-request cleanup.
- Separation of responsibilities between API routes, GitHub client, and repository service.

### Frontend

- React + TypeScript application powered by Vite.
- Repository URL input with controlled React state.
- GitHub URL parsing and basic validation.
- Component-based UI architecture.
- Responsive dark-themed developer interface.
- Repository analysis UI under active development.

## 🛠️ Tech Stack

| Layer              | Technologies                                               |
| ------------------ | ---------------------------------------------------------- |
| Frontend           | React, TypeScript, Vite, CSS                               |
| Backend            | Node.js, Fastify, JavaScript                               |
| External API       | GitHub REST API                                            |
| Package Management | pnpm Workspaces                                            |
| Version Control    | Git, GitHub                                                |
| AI Infrastructure  | Planned: Python, embeddings, vector search, RAG, AI agents |

## 🏗️ Architecture

The application follows a layered architecture:

**React Frontend → Fastify API → Repository Service → GitHub Client → GitHub REST API**

The Repository Service manages:

- Cache lookup and expiration.
- Concurrent request deduplication.
- Repository data transformation.
- Cache population and cleanup.

This keeps GitHub API communication separate from application-specific business logic.

## 📁 Project Structure

- `apps/web/` — React and TypeScript frontend.
- `apps/api/src/server.js` — Fastify API routes and server setup.
- `apps/api/src/clients/` — External API communication.
- `apps/api/src/services/` — Repository business logic and caching.
- `pnpm-workspace.yaml` — Monorepo workspace configuration.

## 🚀 Getting Started

### Prerequisites

- Node.js
- pnpm
- Git

### Install Dependencies

From the project root:

`pnpm install`

### Start the Backend

`node --watch apps/api/src/server.js`

Backend runs locally at:

`http://localhost:3001`

### Start the Frontend

In another terminal:

`pnpm --dir apps/web dev`

Frontend normally runs at:

`http://localhost:5173`

## 🔌 API Reference

### Get Repository Details

**GET** `/api/repos/:owner/:repo`

Example:

`GET http://localhost:3001/api/repos/facebook/react`

The endpoint retrieves and normalizes public repository metadata, including repository name, owner, description, star count, and fork count.

Subsequent requests can reuse cached data until the cache expires.

## 🗺️ Development Roadmap

- [x] Initialize pnpm monorepo.
- [x] Set up Node.js and Fastify backend.
- [x] Integrate GitHub repository metadata API.
- [x] Implement in-memory TTL caching.
- [x] Implement in-flight request deduplication.
- [x] Initialize React + TypeScript frontend.
- [x] Build repository URL input and validation UI.
- [ ] Connect frontend repository analysis to backend API.
- [ ] Display repository details, loading, and error states.
- [ ] Build GitHub repository file explorer.
- [ ] Retrieve and process repository source files.
- [ ] Implement embeddings and vector search.
- [ ] Build source-grounded RAG question answering.
- [ ] Develop AI-assisted pull request reviews.
- [ ] Add AI-powered bug investigation workflows.
- [ ] Introduce agentic orchestration and tool calling.
- [ ] Add automated tests, monitoring, and production deployment.

## ⚙️ Current Limitations

- Repository cache is stored in a single Node.js process and is cleared on restart.
- In-memory deduplication does not coordinate across multiple backend instances.
- GitHub API availability and rate limits may affect requests.
- Advanced AI capabilities are planned and are not yet implemented.

## 🎯 Project Goals

RepoPilot AI aims to combine modern full-stack engineering with practical AI development, emphasizing:

- Maintainable and scalable architecture.
- Strong React and TypeScript patterns.
- Reliable API integration and asynchronous workflows.
- Retrieval-based code understanding.
- Useful, developer-focused AI agents.

---

**Built as an ongoing hands-on engineering project.**
