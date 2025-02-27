import { NEWS_KEY } from "$env/static/private";
let error = null;
let loading = true;
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_KEY}`;

fetch(API_URL).then(async (response) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    const data = await response.json();
    return {
        data: data.articles,
      };
  } catch (err) {
    error = err.message;
  } finally {
    loading = false;
  }
});
