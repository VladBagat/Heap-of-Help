<script>
  import Fa from "svelte-fa";
  import { faTimes, faChevronRight  } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let { showDrawer = $bindable(), users } = $props();
  let drawer;

  let isMobile = $state(false);
  onMount(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => (isMobile = mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);

    return () => mediaQuery.removeEventListener("change", updateMobile);
  });
  
</script>


{#if showDrawer}
  <div class="drawer-container"  class:is-mobile={isMobile}>
    <button class="close-btn" onclick={() => (showDrawer = !showDrawer)} alt="Close Drawer">
      <svg viewBox="0 0 48 48" class="close-svg"
        ><Fa
          icon={faTimes}
          color="#ffffff"
          scale={2}
        /></svg
      ></button
    > 
    <div class="drawer-content">
    {#if users.length > 0}
   
      {#each users as user, id}
        <button
          {id}
          class="list-item"  class:is-mobile={isMobile}
          onclick={() => goto(`/messages/${user.id}`).then(() => { window.location.reload(); })}
        alt={`Open Chat with ${user.name}`}>
          <div class="profile-text">
            <div class="name">{user.name}</div>
            <div class="last-message">
              <p>{user.last_message}</p>
              <p class="last-message-time">{user.last_messaged}</p>
            </div>
          </div>
        </button>
      {/each}

    {:else}
      <p class="no-chats">No chats yet</p>
    {/if}
  </div>
  </div>
  
{:else}

  <button class="drawer-btn" class:is-mobile={isMobile} onclick={() => (showDrawer = !showDrawer)} alt="Open Drawer">  
        <svg viewBox="0 0 24 24" class="open-svg"
    ><Fa
      icon={faChevronRight}
      color="#ffffff"
      scale={1}
    /></svg
  > </button>

{/if}

<style>
  .drawer-container {
    display: flex;
    flex-direction: column;
    min-width: fit-content;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100%;
    background-color: #111;
  }
  .drawer-container.is-mobile {
    width: 100vw;
  }


  .drawer-content{
    overflow-y: scroll;
    background-color: #111;
    margin: 0 0 10px 0;
  }
  
  .close-btn {
    width: 60px;
    height: 60px;
    align-self: flex-end;
  }
  
  .list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    
    border-bottom: 1px solid #838383;
    border-radius: 0%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-align: start;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
  .list-item.is-mobile{
    width: 90vw;
  }
  .last-message{
    font-size: 0.8rem;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
  .last-message-time{
    font-size: 0.8rem;
    text-overflow: ellipsis;
    overflow-x: hidden;
    color: #ccc;
  }
  
  .profile-text{
    margin: 0 0 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 250px;
  }
  .name{
    font-size: 1.2rem;
    }
  .last-message{
    font-size: 0.8rem;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
  .drawer-btn{
    background-color: #111;
    width: 60px;
    height: 60px;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .open-svg{
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0 0 0 0;
  }

  .drawer-btn.is-mobile{
    width: 40px;
    height: 40px;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  } 
  button {
    background-color: #111;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  button:hover {
    background-color: #292929;
    color: #ececec;
  }
  .no-chats{
    color: white;
    font-size: 1.5rem;
    text-align: center;
    padding: 20px;

  }
</style>
