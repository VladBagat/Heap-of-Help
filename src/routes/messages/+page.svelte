<script lang="js">
  // import Drawer from "../../lib/drawer.svelte";

  const toggleMenu = () => {
    show_list = !show_list;
  };


  let show_list = true;
  let users = [];
  // let messages = [];
  // Simulates a user list
  for (let x = 0; x < 10; x++) {
    users[x] = x;
  }
</script>

<main class="page-container">
  <div class="chat-list">
    {#if users.length > 0}
    <!-- <button class="hamburger" on:click={toggleMenu}>
      <i class="fas fa-bars"></i> <!-- Font Awesome hamburger icon -->
    <!-- </button>  -->
      {:else}
      <p>No chats yet</p>
    {/if}
  </div>
  <div class="messages-container">
    <h1 class="chat-header">Select a chat to start messaging</h1>
    <!-- {#each messages as message}
      <div>messages</div>
    {/each}
    <div class="input-wrap">
      <p>
        <span class="textarea" role="textbox" autofocus contenteditable="true"
        ></span>
      </p>
    </div> -->
  </div>
</main>

<style>
  .page-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
  }

  :root {
    --drawer-width: 400px;
  }
  /* Chats Area */
  .chat-list {
    position: relative;
    background-color: #111;
    max-width: 450px;
    height: 100%;
    transition: all 0.3s ease-in-out;
    overflow-y: hidden;
    display: flex;

    max-width: 450px;
    /* flex-direction: column; */
  }

  /*Messaging Area */
  .messages-container {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chat-header {
    font-size: clamp(1.5rem, 2.5vw, 3rem);
    font-weight: 600;
    color: #363434;
    border-bottom: px solid #ececec;
    font-family: sans-serif;
  }
  .textarea {
    background-color: white;
    font: black;
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: inherit;
    padding: 1px 6px;
  }

  .textarea {
    display: block;
    width: 100%;
    overflow: hidden;
    resize: none;
    min-height: 40px;
    line-height: 20px;
    border-radius: 10px;
    padding: 10px 5px 10px 5px;
  }

  .textarea[contenteditable]:empty::before {
    content: "Type a message...";
    color: gray;
  }
</style>
