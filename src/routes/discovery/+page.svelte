<script>
  const temp = [
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
      tags: ["Python", "Senior", "Sigma"],
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
  ];
  //Proposed data model
  //data = [{"name":"John", "profile-img":blob, "image":blob, "description":"some limited description"}, ...]

  let { category } = $props();
</script>

<div class="page-container">
  <h1 class="main-header">Discovery</h1>
  <h2 class="category">Recommended</h2>
  <div class="main-grid-container">
    {#each temp as tile}
      <div class="card">
        <div class="card-image">
          <img
          src="https://picsum.photos/id/1005/400/300"
          width="150"
          height="150"
          alt="Profile"
        />
        </div>
        <div class="description">{tile.description}</div>
        <div class="name">{tile.name}</div>
        <div class="tags-container">
          {#each tile.tags as tag}
            <div class="tag">{tag}</div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <h2 class="category">Most Popular</h2>
  <div class="main-grid-container">
    {#each temp as tile}
      <div class="card">
        <div class="card-image">
          <img
          src="https://picsum.photos/id/1005/400/300"
          width="150"
          height="150"
          alt="Profile"
        />
        </div>
        <div class="description">{tile.description}</div>
        <div class="name">{tile.name}</div>
        <div class="tags-container">
          {#each tile.tags as tag}
            <div class="tag">{tag}</div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .page-container {
    margin: 0 auto;
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
    padding: 5px 7px 10px;
    font-family: sans-serif;
    border-bottom: px solid #ececec;
  }
  .main-grid-container {
    color: #000;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
    row-gap: 1.5rem;
    column-gap: 0.5rem;
  
    justify-content: center;
    margin-bottom: 10px;
  }
  .card {
    width: 90%;
    height: 250px;
    font-family: "Arial";
    padding: 1rem;
    cursor: pointer;
    border-radius: 0.75rem;
    background: #f7f7f8;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    place-content: center;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.2rem;
    grid-row-gap: 0px;
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
  grid-column: 2; 
  grid-row: 1;     
  place-content: center;
}
  .description {
  grid-column: 1 / span 2; 
  grid-row: 2;            
  max-width: 400px;
  align-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
}
  .tags-container {
  grid-column: 1 / span 2; 
  grid-row: 3;             
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.tag{
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
