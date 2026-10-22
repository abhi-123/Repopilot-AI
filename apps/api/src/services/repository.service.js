import { fetchRepository } from "../clients/github.client.js";

const repoCacheMap = new Map();
const responsePromiseMap = new Map();

const CACHE_TTL = 5 * 60 * 1000;

export async function getRepository(owner, repo) {
  const key = `${owner}/${repo}`;

  // Step 1: Check valid cached data

  if (repoCacheMap.has(key)) {
    const cachedRepository = repoCacheMap.get(key);
    const diffInMs = Date.now() - cachedRepository.cachedAt;

    const isWithin5Minutes = diffInMs <= CACHE_TTL;
    if (isWithin5Minutes) {
      console.log("✅ CACHE HIT:", key);
      return cachedRepository.data;
    } else {
      console.log("⌛ CACHE EXPIRED:", key);
      repoCacheMap.delete(key);
    }
  }
  // Step 2: Check existing pending request
  if (responsePromiseMap.has(key)) {
    console.log("🔄 REUSING PENDING PROMISE:", key);
    return responsePromiseMap.get(key);
  }

  try {
    console.log("❌ CACHE MISS:", key);
    const responsePromise = fetchRepository(owner, repo).then((response) => {
      // const data = await response.json();
      const transformedData = {
        name: response.name,
        owner: response.owner.login,
        description: response.description,
        stars: response.stargazers_count,
        forks: response.forks_count,
      };

      repoCacheMap.set(key, {
        data: transformedData,
        cachedAt: Date.now(),
      });

      return transformedData;
    });
    responsePromiseMap.set(key, responsePromise);
    return await responsePromise;
  } catch (error) {
    console.error("Failed to fetch repository:", error);
    throw error;
  } finally {
    // 6. Allow future requests
    responsePromiseMap.delete(key);
  }
}
