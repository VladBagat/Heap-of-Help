<script lang="js">
  import Drawer from "../../../lib/drawer.svelte";
  import { onMount } from "svelte";
  import { goto, onNavigate } from "$app/navigation";
 
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
  let showDrawer = $state(false);
  let users = $state([]);
  let messages = $state([]);
  let messagesContainer;

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

  async function getMessages() {
    try {
      const recipient = window.location.pathname.split("/").pop();
      const res = await fetch(`/api/message-history?recipient=${recipient}`, {
        method: "GET",
        credentials: "include",
      });
      let data = await res.json();
      if (data[1] == 404 || data[1] == 401) {
        goto("/messages");
        return;
      }
      const newMessages = [
        ...data[0]["content"]["received"].map(item => [0, item.content, item.timestamp]),
        ...data[0]["content"]["sent"].map(item => [1, item.content, item.timestamp]),
      ];

      // Only append messages with timestamps not already present
      messages = [
        ...messages,
        ...newMessages.filter(newMsg => !messages.some(oldMsg => oldMsg[2] === newMsg[2]))
      ];
      messages.sort((a, b) => new Date(a[2]) - new Date(b[2]));
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  }

  let message = $state("");
  let isMsgValid = $state(false);
  let messageBox;
  onMount(() => {
    getChats()
    getMessages()
    const interval = setInterval(getMessages, (Math.random()+0.1)*10000); 

    onNavigate(() => {
      clearInterval(interval);
  })
  }
    
  );
  async function SendMessage() {
    handleInput();
    if (isMsgValid) {
      let recip = window.location.pathname.split("/").pop();
      try{
        const res = await fetch(`/api/send-message`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: recip,
          content: message,
        }),
      });
      }
      catch(err){
        console.error(err);
      }
      messages = [...messages, [1, message, new Date(Date.now()).toISOString().slice(0, 19).replace("T", " ")]];
      messageBox.innerText = "";
      handleInput();
     } else {
      alert("Message is too long");
    }
  }
  
  let charcnt = $state(0);
  function handleInput(event) {
    message = messageBox.textContent;
    if (message.length > 2000 || message.length < 1) {
      isMsgValid = false;
    } else {
      isMsgValid = true;
    }
    charcnt = message.length;
  }
</script>

<main class="page-container">
  <div class="chat-list">
    <Drawer bind:showDrawer {users} />
  </div>

  <div class="messages-area">
    {#if messages.length === 0}
      <h1 class="chat-header">Send the First Message</h1>
      <h2 class="chat-subhead">Remember to be polite :)</h2>
    {/if}
    <div class="messages-container">
      {#each messages as message, msg_id}
        {#if message[0] == 1}
        <div class="timestamp" class:sender={true}>{message[2]}</div>
          <div class="bubble" class:sender={true}>
            {message[1]}
          </div>
        {:else}
          <div class="timestamp" class:receiver={true}>{message[2]}</div>
          <div class="bubble" class:receiver={true}>
            {message[1]}
          </div>
        {/if}
      {/each}
    </div>
    <div class="input-wrap">
      <span
        class="textarea"
        class:is-mobile={isMobile}
        id="message-box"
        role="textbox"
        maxlength="2000"
        autofocus
        bind:this={messageBox}
        contenteditable="true"
        oninput={handleInput}
      ></span>

      <button class="send-btn" onclick={() => SendMessage()}>SEND</button>
    </div>
    <div class="char-count">
      {#if charcnt > 0}
        <p class:is-msg-valid={!isMsgValid}>
          {charcnt}/{2000}
        </p>
      {:else}
        <p>0/2000</p>
      {/if}
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

  /* Chats Area */
  .chat-list {
    background-color: #444;
  }

  /*Messaging Area */
  .messages-area {
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .input-wrap {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: end;
    width: 90%;
    margin: 0 0 10px 0;
  }
  .send-btn {
    background-color: #111;
    color: white;
    height: 50px;
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    margin: 0 0 5px 5px;
  }

  .send-btn:hover {
    background-color: #222;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    .send-btn {
      width: 70%;
      margin-top: 10px;
    }
  }

  .send-btn:hover {
    background-color: #333;
  }
  .chat-header {
    font-size: clamp(1.5rem, 2.5vw, 3rem);
    font-weight: 700;
    color: #333;
    font-family: "Inter", sans-serif;
    text-align: center;
    padding-bottom: 2px;
    margin: 10px 0 5px 0;
    border-bottom: 2px solid #ececec;
  }

  .chat-subhead {
    font-size: clamp(1rem, 1.5vw, 1.4rem);
    font-weight: 500;
    color: #222;
    font-family: "Inter", sans-serif;
    text-align: center;
    margin-top: 3px;
    padding: 0 20px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.4;
  }
  .textarea {
    background-color: white;
    font: black;
    color: #111;
    border: 1px solid #ccc;
    font-family: inherit;
    font-size: inherit;
    padding: 1px 6px;
    display: block;
    min-width: 50vw;
    width: 60vw;
    overflow: hidden;
    resize: none;
    min-height: 40px;
    max-height: 30vh;
    line-height: 20px;
    border-radius: 10px;
    padding: 10px 5px 10px 5px;
  }

  .textarea.is-mobile {
    max-width: 60vw;
  }
  .textarea:focus {
    border-color: #525252;
  }

  .textarea[contenteditable]:empty::before {
    content: "Type a message...";
    color: gray;
  }

  .char-count {
    padding: 0;
    margin: 0 0 10px 0;
    font-size: 0.8rem;
    color: #333;
    width: 55%;
    display: flex;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }
  .is-msg-valid {
    color: #f00;
    font-weight: 600;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px auto 10px auto;
    overflow-y: scroll;
    height: 90vh;
    width: 80vw;
    justify-content: flex-start; 
  }
  .bubble {
    max-width: 80%;
    padding: 12px;
    border-radius: 20px;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
    white-space: normal;
    display: block;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .bubble.sender {
    background-color: #f2f2f2;
    color: #333;
    align-self: flex-end;
    
    border-bottom-right-radius: 0;
    margin-right: 5px;
  }
  .bubble.receiver {
    background-color: #333;
    color: #ececec;
    align-self: flex-start;
    border-bottom-left-radius: 0;
  }
  .timestamp{
    font-size: 0.8rem;
    color: #111;
    margin-top: 5px;
    margin-left: 5px;
  }
</style>