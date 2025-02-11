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
    <!-- <div class="box">a</div>
    <div class="box">b</div>
    <div class="box">c</div>
    <div class="box">d</div>
    <div class="box">e</div>
    <div class="box">f</div> -->
    {#each temp as tile}
      <div class="box">
        <div class="card-image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="175"
            height="175"
          >
            <defs>
              <mask id="mask">
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="50%"
                  ry="50%"
                  fill="white"
                  filter="url(#filter)"
                ></ellipse>
              </mask>
            </defs>

            <image
              xlink:href="https://picsum.photos/id/1005/400/300"
              width="150"
              height="150"
              mask="url(#mask)"
            ></image>
          </svg>
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
      <div class="box">
        <div class="card-image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="175"
            height="175"
          >
            <defs>
              <mask id="mask">
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="50%"
                  ry="50%"
                  fill="white"
                  filter="url(#filter)"
                ></ellipse>
              </mask>
            </defs>

            <image
              xlink:href="https://picsum.photos/id/1005/400/300"
              width="150"
              height="150"
              mask="url(#mask)"
            ></image>
          </svg>
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
    padding: 10px 7px 0;
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
    grid-template-columns: 1fr;
    gap: 0.5rem;
    place-content: center;
    padding: 0px 0px 5px;
  }
  .box {
    width: 92%;
    height: 300px;
    font-family: "Arial";
    padding: 1rem;
    cursor: pointer;
    border-radius: 0.75rem;
    background: #f7f7f8;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0.2rem;
    grid-row-gap: 0px;
  }
  .box:hover {
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 10%);
    transform: translateY(-2px);
    transition: all 0.3s ease-in-out;
  }
  .card-image {
    width: 100px;
    height: 100px;
    border-radius: 6px 6px 0 0;
    border-radius: 50%;
    margin-right: 15px;
    mask-image: radial-gradient(circle, black 50%, rgba(0, 0, 0, 0) 50%);
  }

  /* For Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 700px) {
    .main-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }

  /* For Medium and large devices (landscape tablets and desktops, 768px and up) */
  @media only screen and (min-width: 1200px) {
    .main-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5rem;
    }
  }
</style>
