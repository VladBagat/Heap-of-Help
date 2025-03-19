<script lang="js">
    let menuOpen = false;
    import "../styles.css";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    let isLoggedIn = false;
    let user_id = null; // Define user_id at the component level

    async function checkAuth() {
        try {
            const res = await fetch('/api/auth', {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
              const data = await res.json();
              user_id = data[0].user_id; // Assign the user_id from response

              console.log(data[0])
                
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
        await fetch("/api/logout", { method: "POST", credentials: "include" });
        isLoggedIn = false;
        user_id = null;
        goto("/login");
    }

    onMount(() => {
        checkAuth();
    });

    $: if (browser) {
        $page.url.pathname; // Dependency to trigger on route changes
        checkAuth();
    }
</script>
  
<header class="header">
    <div class="container">
      <a href="/" class="logo">Heap of Help</a>
      
      <nav class="nav" class:open={menuOpen}>
        <a href="/discovery" class="nav-link">Tutors</a>
        <a href="/news" class="nav-link">News</a>
        {#if isLoggedIn}
          <a href={`/profile/${user_id}`} class="nav-link">Profile</a>
          <a href="/messages" class="nav-link">Chat</a>
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


