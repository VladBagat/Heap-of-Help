<script>
  let menuOpen = false;
  import "../styles.css";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  export let isLoggedIn = writable(false);  

  async function checkAuth() {
      try {
          const res = await fetch('api/auth', {
              method: 'GET',
              credentials: 'include',
          });

          if (res.ok) {
              const data = await res.json();
              isLoggedIn = true; // User is authenticated
          } else {
              isLoggedIn = false; // User is not authenticated
          }
      } catch (error) {
          console.error('Error fetching auth:', error);
          isLoggedIn = false;
      }
  }

    
async function logout() {
    try {
        const res = await fetch("/logout", {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            isLoggedIn.set(false);  
            goto("/login");
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

  onMount(() => {
      checkAuth();
  });
</script>

<header class="header">
  <div class="container">
    <a href="/" class="logo">Heap of Help</a>
    
    <nav class="nav" class:open={menuOpen}>
      <a href="/discovery" class="nav-link">Tutors</a>
      <a href="/" class="nav-link">Chat</a>
      {#if isLoggedIn}
        <a href="/profile" class="nav-link">Profile</a>
        <a href = "/" class="nav-link" on:click={logout}>Logout</a>
      {:else}
        <a href="/login" class="nav-link">Login</a>
      {/if}
    </nav>
    
    <!-- Mobile menu toggle -->
    <button class="menu-toggle" on:click={() => menuOpen = !menuOpen}>
      {menuOpen ? '✖' : '☰'}
    </button>
  </div>
</header>

<main>
  <slot />
</main>


<footer class="footer">
  <div class="footer-container">
    <p>&copy; {new Date().getFullYear()} Heap of Help. All rights reserved.</p>
    <nav class="footer-nav">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/privacy-policy">Privacy Policy</a>  
    </nav>
  </div>
</footer>


