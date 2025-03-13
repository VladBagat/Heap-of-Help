<script>
  import Fa from "svelte-fa";
  import { faTimes } from "@fortawesome/free-solid-svg-icons";
  import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
  import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
  let { showModal = $bindable(), header, children } = $props();

  let dialog = $state(); // HTMLDialogElement

  $effect(() => {
    if (showModal) dialog.showModal();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div class="modal-container">
    <div class="modal-header">
      {@render header?.()}

      <button class="close-btn" onclick={() => dialog.close()}
        ><svg viewBox="0 0 24 24" class="close-svg"
          ><Fa
            icon={faTimes}
            size="2x"
            color="#000000"
            fw
            pull="left"
            scale={1}
            rotate={90}
            flip="horizontal"
          /></svg
        ></button
      >
    </div>
    {@render children?.()}
    <hr />
    <!-- svelte-ignore a11y_autofocus -->
  </div>
  <div class="modal-footer">
    <button
      type="button"
      class="snd-msg"
      onclick={() => console.log("Send Message")}
      >Send Message
      <svg viewBox="0 0 24 24">
        <Fa
          icon={faPaperPlane}
          color="#FFFFFF"
          scale={1}
          rotate={90}
          flip="horizontal"
        /></svg
      ></button
    >
    <button
      type="button"
      class="see-prf"
      onclick={() => console.log("View Profile")}
    >
      View Profile
      <svg viewBox="0 0 24 24">
        <Fa
          icon={faUserCircle}
          color="#FFFFFF"
          scale={1}
          flip="horizontal"
        /></svg
      ></button
    >
  </div>
</dialog>

<style>
  .modal-container {
    align-items: center;
    justify-content: center;
    padding: 1rem 1.4rem 0rem 1.4rem;
    border-radius: 0.75rem;
  }
  .close-btn {
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    place-content: center;
    width: 90px;
    height: 90px;
  }
  .close-svg {
    transition: all 0.3s ease-in-out;
    place-content: center;
  }
  .close-btn:hover {
    transform: scale(1.2);
    transition: all 0.3s ease-in-out;
    place-content: center;
    width: 90px;
    padding: 20px;
    height: 90px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
  dialog {
    max-width: 32em;
    border-radius: 0.75rem;
    border: none;
    padding: 0;
    place-content: center;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .modal-footer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    align-items: center;
    padding: 0 0 0.5rem 0;
  }
  .snd-msg {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease-in-out;
    place-content: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .snd-msg:hover {
    background-color: #0069d9;
    color: #fff;
    transition: background-color 0.3s ease-in-out;
    place-content: center;
  }
  .see-prf {
    background-color: #000000;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease-in-out;
    place-content: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .see-prf:hover {
    background-color: #272727;
    color: #fff;
    transition: background-color 0.3s ease-in-out;
    place-content: center;
  }
  button {
    display: block;
  }
</style>
