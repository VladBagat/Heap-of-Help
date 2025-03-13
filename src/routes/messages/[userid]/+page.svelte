<script lang="js">
  let show_list = true;
  let users = [];
  let messages = [];
  for (let x = 0; x < 100; x++) {
    users[x] = x;
  }
</script>

<main class="page-container">
  <!-- Can be opened/Closed -->
  <div class="contact-list">
    {#if users.length > 0}
      <input type="checkbox" checked id="drawer-toggle" name="drawer-toggle" />
      <label for="drawer-toggle" id="drawer-toggle-label"></label>
      <nav id="drawer">
        {#each users as user, id}
          <button
            {id}
            class="list-item"
            onclick={() => console.log(`clicked! ${id}`)}
          >
            <div class="profile-image">
              <img
                src="https://picsum.photos/id/1005/400/300"
                width="100"
                height="100"
                alt="Profile"
              />
            </div>
            <div class="profile-text">
              <div class="name">Chris Lee</div>
              <div class="last-message">
                Helloawedawdawawawdawdawdawdawdawdawdawdwd
              </div>
            </div>
          </button>
        {/each}
      </nav>
    {:else}
      <p>No chats yet</p>
    {/if}
  </div>
  <div class="messages-container">
    {#each messages as message}
      <div>messages</div>
    {/each}
    <div class="input-wrap">
      <p>
        <span class="textarea" role="textbox" autofocus contenteditable="true"
        ></span>
      </p>
    </div>
  </div>
</main>

<style>
  .page-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
  }
  .contact-list {
    width: 20%;
    height: 100%;
    margin-left: 0px;
    overflow-y: scroll;
    background-color: #333;
    display: flex;
    flex-direction: column;
    border: 0 0 0 0;
  }

  #drawer-toggle {
    position: absolute;
    display: none;
  }

  #drawer-toggle-label {
    left: 0px;
    transition: all 0.3s ease-in-out;
    height: 50px;
    width: 50px;
    display: block;
    position: fixed;
    background: transparent;
    z-index: 1;
  }
  #drawer-toggle-label:before {
    content: "";
    display: block;
    position: absolute;
    height: 2px;
    width: 24px;
    background: #8d8d8d;
    left: 13px;
    top: 18px;
    /* Hamburger menu */
    box-shadow:
      0 6px 0 #8d8d8d,
      0 12px 0 #8d8d8d;
  }

  #drawer {
    position: absolute;
    transition: all 0.3s ease-in-out;
    top: 100px;
    left: -400px;
    overflow-y: scroll;
    height: calc(100% - 40px); 
    max-width: 300px; 
    background: none; 
  }
  #drawer-toggle:checked ~ #drawer-toggle-label {
    left: 200px;
    background: rgba(255, 255, 255, 0.8);
  }

  #drawer-toggle:checked ~ #drawer-toggle-label {
    background-color: black;
  }

  #drawer-toggle:checked ~ #drawer {
    left: 0px;
  }

  .list-item {
    width: 100%;
    display: flex;
    padding: 0;
    border: 0;
  }
  .profile-image {
    width: 50%;
    /* From W3Schools */
    mask-image: radial-gradient(circle, black 45%, rgba(0, 0, 0, 0) 0%);
    justify-self: start;
  }
  .profile-text {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-right: 50px;
    text-overflow: ellipsis;
  }
  .last-message {
    align-self: start;
    text-overflow: ellipsis;
    overflow-x: hidden;
    border-color: red;
    border-width: 10px;
    width: 100px;
  }

  .messages-container {
    width: 80%;
    height: 100vh;
    overflow-y: scroll;
    background-color: aliceblue;
    display: flex;
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
