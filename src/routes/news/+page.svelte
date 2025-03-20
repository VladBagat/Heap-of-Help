<script>
  import { onMount } from "svelte";
  let articles;
  let search_term;
  onMount(async () => {
    articles = await fetch("/api/news").then((res) => res.json());
    if (articles.length == 0) {
      can_show_more = false;
    }
  });
  let can_show_more = true;
  let page = 2;
  async function ShowMore() {
    // Appends new articles if there are any, else hides the button
    let new_articles = await fetch(
      `/api/more_news?page=${page}&search=${search_term?search_term:""}`
    ).then((res) => res.json());
    if (new_articles.length == 0) {
      can_show_more = false;
    } else {
      if (sorting == "Descending") {
        articles = [...articles, ...new_articles];
      } else {
        articles = [...new_articles, ...articles];
      }
       page += 1;
    }
  }
  async function SearchNews(search) {
    // Allows user to search for specific news
    page = 1;
    articles = await fetch(
      `/api/search_news?page=${page}&search=${search?search:""}`
    ).then((res) => res.json());
    if (articles.length == 0) {
      can_show_more = false;
    } else {
      can_show_more = true;
      page += 1;
    }
  }

  let sorting = "Descending";
  function handleCategoryChange(event) {
    sorting = event.target.value;
    if (sorting == "Descending") {
      articles = articles.sort((a, b) => b.publishedAt - a.publishedAt);
    } else {
      articles = articles.sort((a, b) => a.publishedAt - b.publishedAt);
    }
  }
</script>

<div class="page-container">
  <h1 class="main-header">News</h1>
  <div class="search">
    <h2>Latest Headlines</h2>
    <div class="search-bar">
      <input type="text" placeholder="Search News"  bind:value={search_term}/>
      <button class="search-btn" onclick={() => SearchNews(search_term)}>Search</button>
    </div>
    <div class="sort">
      <label for="sort">Sort By:</label>
      <select value={sorting} onchange={handleCategoryChange}>
        <option value="Descending" selected>Descending</option>
        <option value="Ascending">Ascending</option>
      </select>
    </div>
  </div>
  <div class="news-container">
    {#each articles as article}
      <div class="news-card">
        <div class="news-text">
          <a class="news-link news-headline" href={article.url}>
            {article.title}
          </a>
          <p class="news-description">{article.description}</p>
          <a class="news-link" href={article.url}>Read More</a>
        </div>
        <div class="news-image">
          <a class="news-link" href={article.url}>
            <img src={article.urlToImage} alt={article.title} />
          </a>
        </div>
      </div>
    {/each}
  </div>
  {#if can_show_more}
    <div class="show-more">
      <button class="show-more-btn" onclick={() => ShowMore()}>
        {"Show More"}
      </button>
    </div>
  {:else}
    <p>No more news to show :(</p>
  {/if}
</div>

<style>
  .page-container {
    margin: 0 auto 25px auto;
    width: 90%;
  }
  .main-header {
    text-align: center;
    font-size: clamp(1.5rem, 2.5vw, 3rem);
    font-weight: 600;
    color: #363434;
    padding: 10px 7px 0px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ececec;
    font-family: sans-serif;
  }

  .news-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
    gap: 0.5rem;
    color: black;
  }
  .news-card {
    background-color: #eeeeee;
    border-top: #a7a7a7 solid 1px;
    border-bottom: #a7a7a7 solid 1px;
    color: black;
    padding: 1rem;
    display: flex;
  }
  .news-headline {
    color: #363434;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    text-align: center;
    font-size: clamp(1rem, 1.7vh, 2rem);
  }

  .news-description {
    font-size: 1.2rem;
  }

  .news-link {
    color: #363434;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .news-link:hover {
    color: #7a7a7a;
  }
  .news-image {
    width: 40%;
    height: 300px;
    display: flex;
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    cursor: pointer;
  }
  .news-image img {
    width: 100%;
    height: 250px;
  }
  .news-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  h2 {
    text-transform: uppercase;
    text-align: start;
    font-size: clamp(1rem, 1.7vh, 2rem);
    font-weight: 600;
    color: #363434;
    border-bottom: px solid #ececec;
  }
  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  .search {
    color: black;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    text-align: start;
    font-family: sans-serif;
    padding: 5px 7px 10px;
  }
  .sort {
    font-size: clamp(0.8rem, 1.5vh, 1.8rem);
  }
</style>
