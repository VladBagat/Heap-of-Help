<script>
    let menuOpen = false;
    import "../styles.css";
  </script>
  
  <header class="header">
    <div class="container">
      <a href="/" class="logo">Heap of Help</a>
      
      <nav class="nav" class:open={menuOpen}>
        <a href="/" class="nav-link">Tutors</a>
        <a href="/" class="nav-link">Chat</a>
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
  

  