<script lang="js">
    
    let login = ''

    let password = ''

    async function Login() {
        console.log(login);
        console.log(password);

        const payload = { username: login, password: password };

        const res = await fetch('https://hoh-api-24174ce192a4.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (json.success) {
            IndexRedirect()
        }
    }
    

    import { goto } from '$app/navigation';

    function RegisterRedirect(){
        goto('/register');
    }

    function IndexRedirect(){
        goto('/index')
    }

</script>

<div id="login-form">
    <div id="container">
        <input class="element" type="text" bind:value={login} placeholder="Username" />
        <input class="element" type="text" bind:value={password} placeholder="Password" /> 
        <button class="element" on:click={Login}> Login </button>
        <button class="redirect" on:click={RegisterRedirect}> Not on Heap of Help? </button>
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