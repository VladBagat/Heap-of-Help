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
