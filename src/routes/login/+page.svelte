<script lang="js">
    
    let login = $state('');
    let password = $state('');

    let is_remember = $state(false);

    import Eye from "../../lib/eye.svelte";
    import Password from '$lib/password.svelte';

    let showPassword = $state(false);
    
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    async function Login() {
        console.log(login);
        console.log(password);

        const payload = { username: login, password: password, remember:is_remember };

        const res = await fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        const user_id = json.id
        if (json.success) {
            goto(`/profile/${user_id}`)
        }
    }

    import { goto } from '$app/navigation';

    function RegRedirect(){
        goto('/registration');
    }


</script>

<div id="login-form">
    <div id="container">
        <input class="element" type="text" bind:value={login} placeholder="Username" />
        <div class="password-field">
            <input class="element" type={showPassword ? "text" : "password"} bind:value={password} placeholder="Password" /> 
            <div class="eye">
                <Eye ToggleVisability={togglePasswordVisibility} />
            </div>
        </div>
        <button class="element" onclick={Login}> Login </button>
        <label>
            <input type="checkbox" bind:checked={is_remember}/>
            <span>Remember me</span>
        </label>
        <button class="redirect" on:click={RegRedirect}>Not on Heap of Help?</button>
    </div>
</div>

<style>
    #login-form {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f5f5;
    }

    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        background-color: white;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        padding: 50px 45px;
        border-radius: 12px;
        min-width: 240px;
        max-width: 480px;
        width: 90%;
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

    /* password visibility */

    .password-field {
        position: relative;
    }

    .password-field .element {
        width: 76%;
        padding-right: 34px;
    }
    
    .eye {
        position: absolute;
        right: 30px;
        top: 50%;
    }

</style>