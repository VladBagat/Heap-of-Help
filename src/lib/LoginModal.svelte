<script>
    import { goto } from '$app/navigation';
    
    let { showModal = $bindable() } = $props();
    
    let dialog = $state(); // HTMLDialogElement
    
    $effect(() => {
        if (showModal) dialog.showModal();
    });
    
    let login = $state('');
    let password = $state('');
    let is_remember = $state(false);

    async function Login() {
        const payload = { username: login, password: password, remember: is_remember };

        const res = await fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        const user_id = json.id;
        if (json.success) {
            dialog.close();
            goto(`/profile/${user_id}`);
        }
    }

    function RegRedirect() {
        dialog.close();
        goto('/registration');
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
    bind:this={dialog}
    onclose={() => (showModal = false)}
    onclick={(e) => {
        if (e.target === dialog) dialog.close();
    }}
>
    <div id="container">
        <button class="close-btn" onclick={() => dialog.close()}>×</button>
        <h1>Sign In</h1>
        <div class="input-group">
            <input type="text" bind:value={login} placeholder="Username" />
        </div>
        <div class="input-group">
            <input type="password" bind:value={password} placeholder="Password" />
        </div>
        <button class="login-btn" onclick={Login}>Login</button>
        <label class="remember-label">
            <input type="checkbox" bind:checked={is_remember}/>
            <span>Remember me</span>
        </label>
        <button class="redirect" onclick={RegRedirect}>Not on Heap of Help?</button>
    </div>
</dialog>

<style>
    dialog {
        min-width: 240px;
        max-width: 480px;
        width: 100%;
        border: none;
        padding: 0;
        border-radius: 12px;
        background-color: white;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
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
    
    #container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        place-content: center;
        gap: 16px;
        padding: 50px 50px;
        width: 70%;
        margin: 0 auto;
    }
    
    .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        line-height: 1;
        cursor: pointer;
        color: #777;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .close-btn:hover {
        background-color: #f5f5f5;
        color: #333;
    }
    
    h1 {
        margin: 0 0 24px 0;
        font-size: 2em;
        font-weight: 600;
        color: #333;
    }
    
    .input-group {
        width: 100%;
        margin-bottom: 8px;
    }
    
    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 12px 0;
        padding-left: 12px;
        font-size: 1.1em;
        border: none;
        border-bottom: 1px solid #ddd;
        outline: none;
        transition: border-color 0.3s ease;
        background: transparent;
    }
    
    input:focus {
        border-bottom: 2px solid #333;
    }
    
    ::placeholder {
        color: #aaa;
    }
    
    .login-btn {
        width: 100%;
        padding: 16px;
        margin: 20px 0;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1.2em;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .login-btn:hover {
        background-color: #555;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .remember-label {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        font-size: 0.9em;
        color: #555;
        margin-bottom: 8px;
    }
    
    input[type="checkbox"] {
        width: 16px;
        height: 16px;
        accent-color: #333;
    }
    
    .redirect {
        background: none;
        border: none;
        padding: 8px 0;
        color: #444;
        font-size: 0.9em;
        text-decoration: underline;
        cursor: pointer;
        transition: color 0.3s ease;
        margin-top: 8px;
    }
    
    .redirect:hover {
        color: #000;
    }
</style>
