export async function fetchRepository(owner, repo) {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    console.log("🌐 CALLING GITHUB API:", url);
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "RepoPilotAI",
      },
    });

    if (!response.ok) {
      throw new Error(`Github API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(`Github API error: ${e}`);
  }
}
