<script>
    import Eye from "./eye.svelte";

    let text = $state('');
    let hidden_text = $derived(text.slice(0, text.length-1).replaceAll(/./g, "•") + text.slice(text.length-1, text.length));
    let showPassword = $state(false);
    let input;
    let trueInput;

    let {value = $bindable()} = $props();

    function ToggleVisability() {
        showPassword = !showPassword; 

        input.value = showPassword ? text : hidden_text;
    }
</script>


<div class="input-wrapper">
    <input class="element" bind:this={input} onkeydown={() => trueInput.focus()} placeholder="Password" />
    <div id="hidden">
        <input bind:this={trueInput} bind:value={text} oninput={() => { input.value = showPassword ? text : hidden_text; value=text; input.focus(); }} />
    </div>
    <div id="eye-icon">
        <Eye {ToggleVisability}  />
    </div>
    
</div>
