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
            Remember me
        </label>
        <button class="redirect" onclick={RegRedirect}> Not on Heap of Help? </button>
    </div>
</div>


<style>
    #login-form{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;

        border: 2px solid black;
        padding: 7.5%; 
        border-radius: 10px; 
    }

    .element{
        font-size: 1.25em;
    }

    .redirect{
        background: none!important;
        border: none;
        padding: 0!important;
        font-family: arial, sans-serif;
        color: #069;
        text-decoration: underline;
        cursor: pointer;
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