<script>
    const temp = [
  {"name": "Jonanson Smith", "description": "A passionate graphic designer specializing in digital art and branding.", "tags":["Senior", "Sigma"]},
  {"name": "Jane Smith", "description": "A passionate graphic designer specializing in digital art and branding.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Alex Johnson", "description": "A data scientist with expertise in machine learning and artificial intelligence.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Emily Davis", "description": "A software engineer focusing on front-end development with a love for UX/UI design.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Chris Lee", "description": "A product manager with a background in business analysis and project leadership.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Samantha Green", "description": "A creative writer and content strategist with a flair for storytelling.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Jane Smith", "description": "A passionate graphic designer specializing in digital art and branding.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Jane Smith", "description": "A passionate graphic designer specializing in digital art and branding.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Alex Johnson", "description": "A data scientist with expertise in machine learning and artificial intelligence.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Emily Davis", "description": "A software engineer focusing on front-end development with a love for UX/UI design.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Chris Lee", "description": "A product manager with a background in business analysis and project leadership.", "tags":["Python", "Senior", "Sigma"]},
  {"name": "Samantha Green", "description": "A creative writer and content strategist with a flair for storytelling.", "tags":["Python", "Senior", "Sigma"]} 
]
    //Proposed data model
    //data = [{"name":"John", "profile-img":blob, "image":blob, "description":"some limited description"}, ...]

  let { category } = $props();

</script>

<div class="container">
  <h1>{category}</h1>
  <div class="card-container">
    {#each temp as tile}
    <div class="card">
        <div class="card-image"></div>
        <div class="category">{tile.name}</div>
        <div class="description">{tile.description}</div>
        <div class="tags-container">
            {#each tile.tags as tag}
                <div class="tag">{tag}</div>
            {/each}
        </div>
    </div>
    {/each}
  </div>
  <div class="padding"></div>
</div>


<style>
.container{
  margin: 0 auto;
  width: 90%;
}

.card-container {
  overflow-x: auto;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-columns: minmax(180px, 1fr);
  grid-auto-flow: column;
  scroll-snap-type: x mandatory;
  padding: 0.5em;
  
  gap: 1.5em;
  margin: 0 auto;
}

.card {
  background: rgb(196, 194, 194);
  padding: .4em;
  border-radius: 6px;
  width: 180px;
  max-height: 300px;
  flex-shrink: 0;
  scroll-snap-align: start;
}

.card-image {
  background-color: rgb(236, 236, 236);
  width: 100%;
  height: 130px;
  border-radius: 6px 6px 0 0;
}

.category {
  text-transform: uppercase;
  font-size: clamp(0.75rem, 1.7vh, 1.15rem);
  font-weight: 600;
  color: rgb(54, 52, 52);
  padding: 10px 7px 0;
}

.description {
  font-weight: 600;
  color: rgb(88, 87, 87);
  padding: 7px 7px 0 7px;
  height: 86px;
}

.tags-container {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  padding: 7px;
}

.tag {
  border-radius: 10px;
  background-color: #2775c3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  padding: 0.35rem 0.4rem 0.35rem 0.4rem;
  font-family: 'Andale Mono', monospace;
  color: aliceblue;
  white-space: nowrap;
}

.padding {
  padding-bottom: 2em;
}

@media (max-width: 768px) {
  .container {
    width: 95%;
    gap: 8px;
  }
  
  .card {
    width: 160px;
  }

  .tag {
    padding: 0.35rem 0.3rem 0.35rem 0.3rem;
  }

  .card-image{
    height: 100px;
  }

  .tags-container {
    gap: 6px;
    padding: 7px 3px 0px 3px;
    justify-content: left;
    align-items: center;
  }

  .description{
    font-size: 0.9rem;
  }
}
</style>