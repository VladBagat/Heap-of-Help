<script lang="js">
    let login = $state('');
    let forename = $state('');
    let surname = $state('');
    let dob = $state('');
    // address
    // university
    // degree
    // year
    let email = $state('');
    let phonenumber = $state('');
    let password = $state('');
    let confirm_password = $state('');

    let currentStage = $state(1);
  
    function nextStage() {
      if (currentStage < 3) {
        currentStage += 1;
      }
    }

    import Password from '$lib/password.svelte';

    async function student_registration()
     {
        console.log(username)
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
            const payload = { username: username, forename: forename, surname: surname, email: email, phonenumber: phonenumber, password: password, confirm_password:confirm_password};

            const res = await fetch('api/student-reg', {
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

    function submitForm() {
      alert('Submit!');
    }

</script>
  
  <div id="student_registration">
    <div id="container">
      <!-- Sidebar -->
      <div id="sidebar">
        <h3>Sidebar</h3>
        <p>Current Stage: {currentStage}</p>
        <button class="redirect" onclick={LoginRedirect}>Already on Heap of Help?</button>
      </div>
  
      <!-- Form Content -->
      <div id="form-content">
        {#if currentStage === 1}
          <form>
            <input class="element" type="text" bind:value={forename} placeholder="Forename" />
            <input class="element" type="text" bind:value={surname} placeholder="Surname" /> 
            <input class="element" type="text" bind:value={email} placeholder="Email" /> 
            <input class="element" type="text" bind:value={phonenumber} placeholder="Telephone" />
            <input class="element" type="text" placeholder="DOB" />
            <input class="element" type="text" placeholder="Country" />
            <input class="element" type="text" placeholder="Address Line 1" />
            <input class="element" type="text" placeholder="Address Line 2" />
            <input class="element" type="text" placeholder="Adress Line 3" />
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 2}
          <form>
            <input class="element" type="text" bind:value={login} placeholder="Username" />
            <div id="pass-inp" type= "text">
              <Password bind:value={password}/>
              <Password bind:value={confirm_password}/>
            </div>
            <input class="element" type="text" placeholder="Profile Picture" />
            <input class="element" type="text" placeholder="Description" />
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 3}
          <form onsubmit={submitForm}>
            <input class="element" type="password" placeholder="Tags" />
            <button type="submit">Submit</button>
          </form>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    #student_registration {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      height: 100vh;
    }
  
    #container {
      display: flex;
      justify-content: flex-start;
      gap: 20px;
      width: 80%;
      padding: 20px;
      position: relative;
    }
  
    #sidebar {
      position: sticky;
      top: 0;
      width: 200px;
      height: 100%;
      background-color: #f0f0f0;
      padding: 20px;
      border: 1px solid #ccc;
    }
  
    #form-content {
      flex-grow: 1;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .element {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    button {
      padding: 10px;
      background-color: black;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #035;
    }
  </style>



<!-- 
<style>
  #pass-inp{
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
  }

  #student_registration{
      background-color: #f5f5f5;
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
  width: 60%;
  max-width: 800px;
  background-color: white;
  border: 2px solid black;
  padding: 40px 60px; 
  border-radius: 10px;
  position: relative;

  }

  .element{
      font-size: 1.25vw;
  }

  #register-button {
      position: absolute;
      bottom: 20px;
      right: 20px; 
      padding: 10px 20px;
      background-color:#f5f5f5 ;
      color: #333;
      border: 2px solid black;
      border-radius: 5px;
      cursor: pointer;
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
</style> -->



  
