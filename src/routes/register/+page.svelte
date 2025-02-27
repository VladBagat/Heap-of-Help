<script lang="js">
    let login = $state('');
    let password = $state('');
    let confirm_password = $state('');

    import Password from '$lib/password.svelte';

    async function Register()
     {
        console.log(login);
        console.log(password);
        console.log(confirm_password)
        // If pass not valid, user isn't registered
        let valid = Password_Validation(password, confirm_password)
        if (valid === ''){
            document.getElementById("error").innerHTML = ''
            const payload = { username: login, password: password, confirm_password:confirm_password};

            const res = await fetch('api/register', {
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
        else{
            console.log(valid);
            document.getElementById("error").innerHTML = valid;
        }
    }
    

    import { goto } from '$app/navigation';

    function Password_Validation(password, confirm_password){
        if (password.length < 8){
            return "Minimum password length 8, Try Again.";
        }
        if (password !== confirm_password){
            return "Passwords do not match, Try Again!";
        }       
        return "";
    }

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
        <div id="pass-inp">
            <Password bind:value={password}/>
            <Password bind:value={confirm_password}/>
        </div>
        <button class="element" onclick={Register}>Register</button>
        <p id="error"></p>
        <button class="redirect" onclick={LoginRedirect}>Already on Heap of Help?</button>
    </div>
</div>