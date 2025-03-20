<!--Error page goes here-->
<div class="page-container">
  <div>
    <h1>Oops!</h1>
    <p>Something went wrong!</p>
  </div>
  <a href="/"><button>Back to home</button></a>
</div>

<style>
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  h1 {
    font-size: 5rem;
    font-weight: bold;
    color: #333;
    margin: 0;
    line-height: 1;
  }
  p {
    font-size: 1.5rem;
    line-height: 1.5;
    margin: 0;
  }
  a {
    color: #333;
  }
</style>
