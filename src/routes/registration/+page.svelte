<script lang="js">
    let profile = $state('');
    let forename = $state('');
    let surname = $state('');
    let age = $state('');
    let county = $state('');
    let email = $state('');
    let phonenumber = $state('');
    let language = $state('');
    let timezone = $state('');
    let username = $state('');
    let password = $state('');
    let confirm_password = $state('');
    let description = $state('');

    let currentStage = $state(1);
  
    function nextStage() {
      if (currentStage < 3) {
        currentStage += 1;
      }
    }

    function previousStage() {
      if (currentStage > 1) {
        currentStage -= 1;
      }
    }

    import Password from '$lib/password.svelte';

    async function registration()
     {
        console.log(profile)
        console.log(forename)
        console.log(surname)
        console.log(email)
        console.log(phonenumber)
        console.log(language)
        console.log(timezone)
        console.log(username)
        console.log(password)
        console.log(confirm_password)
        console.log0(description)

        // If pass not valid, user isn't registered
        let valid = Password_Validation(password, confirm_password)
        if (valid === ''){
            document.getElementById("error").innerHTML = ''
            const payload = { profile: profile, forename: forename, surname: surname, email: email, phonenumber: phonenumber, language: language, timezone: timezone, username: username,  password: password, confirm_password: confirm_password, description: description};

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
  
  <div id="registration">
    <div id="container">
      <!-- Sidebar -->
      <div id="sidebar">
        <h3>Sidebar</h3>
        <p>Current Stage: {currentStage}</p>
        <button class="redirect" onclick={LoginRedirect}>Already on Heap of Help?</button>
      </div>
  
      <div id="form-content">
        {#if currentStage === 1}
          <h2>Step 1: Personal Details </h2>
          <form>
            <select id="selection" class="element">
              <option value="" disabled selected>Select Tutor/Student</option>
              <option value="tutor">Tutor</option>
              <option value="tutee">Student</option>
            </select>
            <input class="element" type="text" bind:value={forename} placeholder="Forename" />
            <input class="element" type="text" bind:value={surname} placeholder="Surname" /> 
            <input class="element" type="text" bind:value={email} placeholder="Email" /> 
            <input class="element" type="text" bind:value={phonenumber} placeholder="Telephone" />
            <input class="element" type="text" bind:value={age} placeholder="Age" />
            <input class="element" type="text" placeholder="Education" />
            <input class="element" type="text" bind:value={language} placeholder="Language" />
            <input class="element" type="text" bind:value={timezone} placeholder="Time Zone" />
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 2}
          <h2>Step 2: Account Setup</h2>
          <form>
            <input class="element" type="text" bind:value={username} placeholder="Username" />
            <div id="pass-inp" type= "text">
              <Password class="element" bind:value={password}/>
              <Password class="element" bind:value={confirm_password}/>
            </div>
            <input class="element" type="file" id="profile-pic" accept="image/*" />
            <input class="element" type="text" bind:value={description} placeholder="Description" />
            <button type="button" onclick={previousStage}>Back</button>
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 3}
          <h2>Step 3: Selecting Tags </h2>
          <form onsubmit={submitForm}>
            <div id="tags">
              <button class="tag_btn" data-value="Option 1">Option 1</button>
              <button class="tag_btn" data-value="Option 2">Option 2</button>
              <button class="tag_btn" data-value="Option 3">Option 3</button>
              <button class="tag_btn" data-value="Option 4">Option 3</button>
            </div>
            <button type="button" onclick={previousStage}>Back</button>
            <button type="submit">Submit</button>
          </form>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

    #registration {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background-color: #f8f8f8;
      height: 100vh;
    }

    #selection {
      padding: 10px;
      border: 1px solid #aaa;
      font-size: 15px;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      cursor: pointer;
    }

    #tags {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    .tag_btn {
      padding: 12px 20px;
      background-color: grey;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: background-color 0.3s ease, transform 0.1s ease;
    }

    .tag_btn:hover {
      background-color: #2980b9;
      transform: scale(1.05);
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
      background-color: #e0e0e0;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border: 1px solid #ccc;
      font-family: 'Poppins', sans-serif;
    }
  
    #form-content {
      flex-grow: 1;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 2px 2px 10px 
      rgba(0, 0, 0, 0.1);
    }

    #pass-inp {
      display: flex;
      flex-direction: column;
      gap: 13px;
      width: 100%;
    }

    #pass-inp .element {
      padding: 11px;
      border: 1px solid #aaa;
      font-size: 15px;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 13px;
    }
  
    .element {
      padding: 11px;
      border: 1px solid #aaa;
      font-size: 15px;
      border-radius: 5px;
    }

    h2 {
      font-family: 'Poppins', sans-serif;
      font-size: 23px;
      color: #333;
      margin-bottom: 15px;
    }

    h3 {
      font-family: 'Poppins', sans-serif;
      font-size: 23px;
      color: #333;
      margin-bottom: 15px;
    }
  
    button {
      padding: 12px;
      background-color: #d3d3d3;
      color: #333;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease, transform 0.1s ease;
    }
  
    button:hover {
      background-color: #b0b0b0;
      transform: scale(1.02);
    }

  </style>
