<script lang="js">
    
    let login = $state('');
    let password = $state('');

    let is_remember = $state(false);

    import Password from '$lib/password.svelte';

    async function Login() {
        console.log(login);
        console.log(password);

        const payload = { username: login, password: password, remember:is_remember };

        const res = await fetch('https://hoh-api-24174ce192a4.herokuapp.com/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        console.log(json)

        if (json[0].success) {
            IndexRedirect()
        }
    }
    

    import { goto } from '$app/navigation';

    function RegRedirect(){
        goto('/register_as');
    }

    function IndexRedirect(){
        goto('/index')
    }

</script>

<div id="login-form">
    <div id="container">
        <input class="element" type="text" bind:value={login} placeholder="Username" />
        <div id="pass-inp">
            <Password bind:value={password}/>
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
</style>