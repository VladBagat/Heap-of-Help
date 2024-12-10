<script lang="js">
    
    let login = $state('');
    let password = $state('');
    let confirm_password = $state('');

    async function Register()
     {
        console.log(login);
        console.log(password);
        console.log(confirm_password)

        const payload = { username: login, password: password, confirm_password:confirm_password};

        // const res = await fetch('https://hoh-api-24174ce192a4.herokuapp.com/register', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(payload),
        // });

        const json = await res.json();

        console.log(json)

        if (json[0].success) {
            IndexRedirect()
        }
    }
    

    import { goto } from '$app/navigation';

    function LoginRedirect(){
        goto('/login');
    }

    function IndexRedirect(){
        goto('/index')
    }

</script>

<div id="register-form">
    <div id="container">
        <input class="element" type="text" bind:value={login} placeholder="Username" />
        <input class="element" type="password" bind:value={password} placeholder="Password" /> 
        <input class="element" type="password" bind:value={confirm_password} placeholder="Confirm Password" /> 
        <button class="element" onclick={Register}> Register </button>
        
        <button class="redirect" onclick={LoginRedirect}> Already on Heap of Help? </button>
    </div>
</div>


<style>
    #register-form{
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