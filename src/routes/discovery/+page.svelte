<script>
  import Modal from "../../lib/modal.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let isMobile = $state(false);
  let useBase64 = $state(false);
  
  let exclusion = $state([]);
  // Media query check with proper cleanup
  onMount(async () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => (isMobile = mediaQuery.matches);
    fetchImages()

  
    updateMobile();
    temp = await fetch_content();
    return () => mediaQuery.removeEventListener("change", updateMobile);
  });

  async function fetch_content(){
    const payload = { exclusion }
    const res = await fetch('/api/content', {
      method: 'POST',
      credentials: 'include',
      headers: {
                    'Content-Type': 'application/json',
                },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    useBase64 = true;
    exclusion = json[0].content.exclusion;
    let users = json[0].content.items;
    
    users.forEach(user => {
      user.name = `${user.first_name} ${user.last_name}`;
      delete user.first_name;
      delete user.last_name;
    });
    return users;
  }

  async function fetchImages() {
    try {
        const response = await fetch('https://randomuser.me/api/?inc=picture&results=20');
        const data = await response.json();

        temp = temp.map((user, i) => {
          if (data.results[i]?.picture?.large) {
            user.profile_img = data.results[i].picture.large;
        }
          return user;
});
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

  let showModal = $state(false);
  let selected_card = $state(0);
  let showLoginModal = $state(false);

  let temp = $state([
    {
      name: "Jonanson Smith",
      description:
        "A passionate graphic designer specializing in digital art and branding.",
      tags: ["Senior", "Sigma"],
    },
    {
      name: "Jane Smith",
      description:
        "A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Alex Johnson",
      description:
        "A data scientist with expertise in machine learning and artificial intelligence.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Emily Davis",
      description:
        "A software engineer focusing on front-end development with a love for UX/UI design.",
      tags: ["Python", "Senior", "Sigma","Python", "Senior", "Sigma","Python", "Senior", "Sigma","Python", "Senior", "Sigma"],
    },
    {
      name: "Chris Lee",
      description:
        "A product manager with a background in business analysis and project leadership.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.A passionate graphic designer specializing in digital art and branding.",
      tags: ["Python", "Senior", "Sigma","Python", "Senior"],
    },
    {
      name: "Samantha Green",
      description:
        "A creative writer and content strategist with a flair for storytelling.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Jane Smith",
      description:
        "A passionate graphic designer specializing in digital art and branding.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Jane Smith",
      description:
        "A passionate graphic designer specializing in digital art and branding.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Alex Johnson",
      description:
        "A data scientist with expertise in machine learning and artificial intelligence.",
      tags: ["Senior"],
    },
    {
      name: "Emily Davis",
      description:
        "A software engineer focusing on front-end development with a love for UX/UI design.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Chris Lee",
      description:
        "A product manager with a background in business analysis and project leadership.",
      tags: ["Python", "Senior", "Sigma"],
    },
    {
      name: "Samantha Green",
      description:
        "A creative writer and content strategist with a flair for storytelling.",
      tags: ["Python", "Senior", "Sigma"],
    },
  ]);

  let category = $state("Recommended Users");
  let userID = $state(123);
  function handleCardClick(card_id) {
    userID = temp[card_id].user_id;
    if (isMobile) {
      if (useBase64){
        goto(`/profile/${userID}`);
      }
      else {
          showLoginModal = true;
      }
      
    } 
    else {
      showModal = true;
      selected_card = card_id;
    }
    
  }
  function handleCategoryChange(event) {
    category = event.target.value;
  }
  // Count is just used to convey the button dissapears when there are no more cards to show
  // Simulates loading more users atm
  let count = $state(10);
    async function ShowMore() {
    try {
      const newUsers = await fetch_content();
      if (newUsers && newUsers.length > 0) {
        temp = [...temp, ...newUsers];
        count -= newUsers.length;
      } else {
        count = 0;
      }
      console.log(cot)
    } catch (error) {
      count = 0;
      console.error("Error fetching new content:", error);
    }
  }
</script>

<div class="page-container">
  <h1 class="main-header">Discovery</h1>
  <div class="search">
    <h2 class="category">{category}</h2>
    <div class="sort">
      <label for="sort">Sort By:</label>
      <select value={category} onchange={handleCategoryChange}>
        <option value="Recommended Users" selected>Recommended</option>
        <option value="Most Popular Users">Most Popular</option>
        <option value="Closest Users">Closest</option>
      </select>
    </div>
  </div>
  <div class="main-grid-container">
    {#key temp}
      {#each temp as tile, id}
        <button {id} class="card" onclick={() => handleCardClick(id)}>
          <div class="card-image">
            {#if useBase64}
              <img
                src="data:image/png;base64,{tile.profile_img}"
                width="150"
                height="150"
                alt="Profile"
              />
            {:else}
              <img
                src={tile.profile_img}
                width="150"
                height="150"
                alt="Profile"
              />
            {/if}
          </div>
          <div class="description"><p class="description-text">{tile.description}</p></div>
          <div class="name">{tile.name}</div>
          <div class="tags-container">
            {#if tile.tags.length > 3}
            <div class="tag">{tile.tags[0]}</div>
            <div class="tag">{tile.tags[1]}</div>
            <div class="tag">{"..."}</div>
            {:else}
            {#each tile.tags as tag}
              <div class="tag">{tag}</div>
            {/each}
            {/if}
          </div>
        </button>
      {/each}
    {/key}
  </div>
</div>
{#if count != 0}
<div class="show-more">
  <button class="show-more-btn" onclick={() => ShowMore()}>
    {"Show More"}
  </button>
</div>
{:else}
<p>No more users to show :(</p>
{/if}
<Modal bind:showModal userID={userID} canRedirect={useBase64}>
  {#snippet header()}
    <h2 class="category">Profile</h2>
  {/snippet}
  <div class="modal-container">
    <div class="card-image">
      {#if useBase64}
        <img
          src="data:image/png;base64,{temp[selected_card].profile_img}"
          width="150"
          height="150"
          alt="Profile"
        />
      {:else}
        <img
          src={temp[selected_card].profile_img}
          width="150"
          height="150"
          alt="Profile"
        />
      {/if}
    </div>
    <div class="name">{temp[selected_card].name}</div>
    <div class="modal-description">{temp[selected_card].description}</div>
    <div class="tags-container">
      {#each temp[selected_card].tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>
  </div>
</Modal>

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

  .category {
    text-transform: uppercase;
    text-align: start;
    font-size: clamp(1rem, 1.7vh, 2rem);
    font-weight: 600;
    color: #363434;
    border-bottom: px solid #ececec;
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
  .main-grid-container {
    color: #000;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
    row-gap: 1.5rem;
    column-gap: 0.5rem;

    place-content: center;
    margin-bottom: 10px;
  }
  .modal-container {
    display: grid;
    flex-direction: column;
  }
  .card {
    color: black;
    width: 100%;
    height: 300px;
    font-family: "Arial";
    padding: 1rem;
    cursor: pointer;
    border: 0px;
    border-radius: 0.75rem;
    background: #f7f7f8;
    box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 20%);
    place-content: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.2rem;
    grid-row-gap: 0px;
    overflow: hidden;
  }
  .card:hover {
    box-shadow: 0px 8px 16px 0px hwb(0 0% 100% / 0.1);
    transform: translateY(-2px);
    transition: all 0.3s ease-in-out;
  }
  .card-image {
    grid-column: 1;
    grid-row: 1;
    /* From W3Schools */
    mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0) 50%);
  }
  .name {
    color: black;
    grid-column: 2;
    grid-row: 1;
    align-self: center;
    font-size: 28px;
    font-weight: 600;
  }
  .description {
    grid-column: 1 / span 2;
    grid-row: 2;
    max-width: 400px;
    max-height: 2.7rem;
    align-content: center;
    padding: 0 0 30px 0; /*t r b l*/
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;  
    line-clamp:3;      /* Limit to 3 lines of text */
    -webkit-box-orient: vertical;
  }
  .modal-description {
    grid-column: 1 / span 3;
    grid-row: 2;
    text-align: left;
    margin: 0 0 10px 0;
    overflow: hidden;
  }
  .tags-container {
    grid-column: 1 / span 3;
    grid-row: 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .tag {
    background-color: #333333;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 5px;
    text-transform: capitalize;
    place-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
