<script lang="js">
  import Drawer from "../../lib/drawer.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
 
  let isMobile = $state(false);
  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => (isMobile = mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);

    return () => mediaQuery.removeEventListener("change", updateMobile);
  });

  const toggleMenu = () => {
    showDrawer = !showDrawer;
  };
  let showDrawer = $state(true);
  let users = $state([]);
  let messages = $state([]);

  async function getChats() {
    try {
      const res = await fetch("/api/chat-list", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      users = await [...users, ...data[0]["content"]];
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  }
  onMount(getChats);
</script>

<main class="page-container">
  <div class="chat-list">
    <Drawer bind:showDrawer {users} />
  </div>
  <div class="messages-container">
    <h1 class="chat-header">Select a chat to start messaging</h1>
  </div>
</main>

<style>
  .page-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
  }


  /* Chats Area */
  .chat-list {
    background-color: #444;
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
</style>
