export interface RepoDataResponse {
  name: string;
  owner: string;
  stars: number;
  forks: number;
  description: string | null;
}
export interface RepositoryCardProps {
  repository: RepoDataResponse;
}
