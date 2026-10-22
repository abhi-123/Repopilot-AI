export async function fetchRepository(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  console.log("🌐 CALLING GITHUB API:", url);

  let response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "RepoPilotAI",
      },
    });
  } catch (error) {
    const networkError = new Error("Unable to connect to GitHub", {
      cause: error,
    });

    networkError.statusCode = 502;
    throw networkError;
  }

  if (response.status === 404) {
    const error = new Error("Repository not found or inaccessible");
    error.statusCode = 404;
    throw error;
  }

  if (!response.ok) {
    console.error("GitHub API failed:", response.status);

    const error = new Error(`GitHub API returned ${response.status}`);
    error.statusCode = 502;
    throw error;
  }

  return await response.json();
}
