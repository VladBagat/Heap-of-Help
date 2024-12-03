<script lang="js">
    
    let login = ''

    let password = ''

    function Login(){
        console.log(login)
        console.log(password)
        //This can use API POST (log, passw) request to query database
    }

</script>

<div id="login-form">
    <div id="container">
        <input class="element" type="text" bind:value={login} placeholder="Username" />
        <input class="element" type="text" bind:value={password} placeholder="Password" /> 
        <button class="element" on:click={Login}> Login </button>
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
</style>