<script lang="js">

    let forename = $state('');
    let surname = $state('');
    // let dob = $state('');
    // address
    // university
    // degree
    // year
    let email = $state('');
    let phonenumber = $state('');
    let password = $state('');
    let confirm_password = $state('');

    async function student_registration() {
        console.log(forename)
        console.log(surname)
        //console.log(dob)
        console.log(email)
        console.log(phonenumber)
        console.log(password);
        console.log(confirm_password)

        // If pass not valid, user isn't registered
        let valid = Password_Validation(password, confirm_password)
        if (valid === ''){
            document.getElementById("error").innerHTML = ''
            const payload = { username: login, password: password, confirm_password:confirm_password};

            const res = await fetch('/api/student-reg', {
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
            return "Passwords do not match, Try Again";
        }       
        return "";
    }

    function ToggleVisability(fieldId) {
        const field = document.getElementById(fieldId);
        // ? is a ternary operator, basically a one line if statement
        // If password hidden when the toggle is pressed it wil be shown, otherwise it will be hidden
        document.getElementById(fieldId).type = (field.type === "password") ? "text" : "password";
    }

    function LoginRedirect(){
        goto('/login');
    }

    function IndexRedirect(){
        goto('/index')
    }

</script>

<div id="student_registration">
    <div id="container">
        <input class="element" type="text" bind:value={forename} placeholder="Forename" />
        <input class="element" type="text" bind:value={surname} placeholder="Surname" /> 
        <input class="element" type="text" bind:value={email} placeholder="Email" /> 
        <input class="element" type="text" bind:value={phonenumber} placeholder="Telephone" />

        <input id="pass" class="element" type="password" bind:value={password} placeholder="Password" /> 
        <button class="element" onclick={() => ToggleVisability("pass")}>Toggle Pass Visibility</button>
        <input  id="conf_pass" class="element" type="password" bind:value={confirm_password} placeholder="Confirm Password" /> 
        <button class="element" onclick={() => ToggleVisability("conf_pass")}>Toggle Pass Visibility</button>


        <button class="element" onclick={student_registration}> Register </button>
        <button class="redirect" onclick={LoginRedirect}> Already on Heap of Help? </button>
    </div>
</div>


<style>
    #student_registration{
        height: 200vh;
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