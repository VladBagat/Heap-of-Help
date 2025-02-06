<script lang="js">

    let username = $state('')
    let forename = $state('');
    let surname = $state('');
    let email = $state('');
    // address
    // dob
    // qualifications
    let phonenumber = $state('');
    let password = $state('');
    let confirm_password = $state('');

    async function tutor_registration() {
        console.log(username)
        console.log(forename)
        console.log(surname)
        console.log(email)
        console.log(phonenumber)
        console.log(password);
        console.log(confirm_password)

        // If pass not valid, user isn't registered
        let valid = Password_Validation(password, confirm_password)
        if (valid === ''){
            document.getElementById("error").innerHTML = ''
            const payload = { username: username, forename: forename, surname: surname, email:email, phonenumber:phonenumber, password: password, confirm_password:confirm_password};

            const res = await fetch('/api/tutor-reg', {
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

    // redirection to login page
    function LoginRedirect(){
        goto('/login');
    }

    function TutorRegRedirect(){
        goto('/tutor_reg');
    }

    // redirection to index page
    function IndexRedirect(){
        goto('/index')
    }

</script>

<div id="tutor_registration">
    <div id="container">
        <input class="element" type="text" bind:value={username} placeholder="Username" />
        <input class="element" type="text" bind:value={forename} placeholder="Forename" />
        <input class="element" type="text" bind:value={surname} placeholder="Surname" /> 
        <input class="element" type="text" bind:value={email} placeholder="Email" /> 
        <input class="element" type="text" bind:value={phonenumber} placeholder="Telephone" />
        <div id="pass-inp">
            <Password bind:value={password}/>
            <Password bind:value={confirm_password}/>
        </div>
        <button class="element" onclick={student_registration}>Register</button>
        <p id="error"></p>
        <button class="redirect" onclick={LoginRedirect}>Already on Heap of Help?</button>
    </div>
</div>


<style>
    #pass-inp{
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
    }

    #tutor_registration{
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
        font-size: 1.25vw;
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

