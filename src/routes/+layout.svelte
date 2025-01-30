<script>
    let menuOpen = false;
  </script>
  
  <header class="header">
    <div class="container">
      <a href="/" class="logo">Heap of Help</a>
      
      <nav class="nav" class:open={menuOpen}>
        <a href="/" class="nav-link">Page....</a>
        <a href="/" class="nav-link">Page</a>
        <a href="/login" class="nav-link">Login</a>
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

  