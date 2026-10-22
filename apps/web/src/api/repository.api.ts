import type { RepoDataResponse } from "../types/repository.types";

export const fetchRepository = async (
  owner: string,
  repo: string,
): Promise<RepoDataResponse> => {
  const response = await fetch(
    `/api/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Repository not found or inaccessible. Please check the GitHub URL.",
      );
    }

    if (response.status === 502) {
      throw new Error("Unable to retrieve data from GitHub. Please try again.");
    }

    throw new Error(`Unable to analyze repository (${response.status})`);
  }

  const data: RepoDataResponse = await response.json();

  return data;
};
