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
  
  <style>
    .header {
      background: #333;
      color: white;
      padding: 1rem;
    }
    
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      color: white;
    }
  
    .nav {
      display: flex;
      gap: 1rem;
    }
  
    .nav-link {
      color: white;
      text-decoration: none;
    }
  
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
  
    @media (max-width: 768px) {
      .nav {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 20px;
        background: #444;
        padding: 1rem;
        border-radius: 5px;
      }
  
      .nav.open {
        display: flex;
      }
  
      .menu-toggle {
        display: block;
      }
    }
  </style>
  