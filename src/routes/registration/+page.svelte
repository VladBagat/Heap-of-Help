<script lang="js">
    let profile = $state('');
    let forename = $state('');
    let surname = $state('');
    let age = $state('');
    let email = $state('');
    let language = $state('');
    let timezone = $state('');
    let education = $state('')
    let username = $state('');
    let password = $state('');
    let confirm_password = $state('');
    let description = $state('');
    let profile_img = $state('');

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

    function pw_length_check() {
      if (password.length >= 7) {
        document.getElementById('pw_length_message').style.color = 'green';
        document.getElementById('pw_length_message').innerHTML = 'Good';
      } else {
        document.getElementById('pw_length_message').style.color = 'red';
        document.getElementById('pw_length_message').innerHTML = 'At least 8 characters';
      }
    }

	function pw_match_check() {
      if (password == confirm_password) {
        document.getElementById('pw_match_message').style.color = 'green';
        document.getElementById('pw_match_message').innerHTML = 'matching';
      } else {
        document.getElementById('pw_match_message').style.color = 'red';
        document.getElementById('pw_match_message').innerHTML = 'not matching';
      }
    }

    import Password from '$lib/password.svelte';

    async function registration()
     {
        console.log(profile)
        console.log(forename)
        console.log(surname)
        console.log(age)
        console.log(email)
        console.log(language)
        console.log(timezone)
        console.log(username)
        console.log(password)
        console.log(confirm_password)
        console.log(description)

        // If pass not valid, user isn't registered
        //let valid = Password_Validation(password, confirm_password)
        if (password == confirm_password) {
            // document.getElementById("error").innerHTML = ''
            const payload = { profile: profile, 
              forename: forename, 
              surname: surname, 
              email: email, 
              age: age,
              language: language, 
              timezone: timezone, 
              username: username,  
              password: password, 
              confirm_password: confirm_password, 
              education: education,
              description: description, 
              profile_img: base64Image};
            console.log(payload);

            const res = await fetch('api/registration', {
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
        goto('/profile')
    }

    function submitForm() {
      alert('Submit!');
    }

    function ProfileRedirect(){
      goto('\profile');
    }

    let base64Image = $state('');

    function handle_profile_img(event) {
        const file = event.target.files[0];
        if (file) {
            profile_img = file;
        } else {
            profile_img = "static/profile.avif"
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            base64Image = e.target.result;  // Get Base64 string
            console.log("Base64 Encoded Image:", base64Image);
        };
        reader.readAsDataURL(file);  // Convert to Base64
    }


	let username_validation = $state(false);

    async function valid_username() {
      if (username.trim() == "") {
        username_validation = false;
      } else if (username_validation){
        username_validation = false;
      } else {
        const payload = {username: username};
        console.log(payload)

        const res = await fetch('api/validate_username', {
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
          username_validation = true;
        } else {
          username_validation = false;
        }
      }
    }


</script>
  
  <div id="registration">
    <div id="container">
      <!-- Sidebar -->
      <div id="sidebar">
        <h3>Creating Account</h3>
        
        <div class="progress-item {currentStage === 1 ? 'current' : ''} {currentStage > 1 ? 'completed' : ''}">
          <span class="progress-number">1</span>
          <span>Personal Details</span>
        </div>

        <div class="progress-item {currentStage === 2 ? 'current' : ''} {currentStage > 2 ? 'completed' : ''}">
          <span class="progress-number">2</span>
          <span>Account Setup</span>
        </div>

        <div class="progress-item {currentStage === 3 ? 'current' : ''} {currentStage > 3 ? 'completed' : ''}">
          <span class="progress-number">3</span>
          <span>Selecting Tags</span>
        </div>
        
        <p>Current Stage: {currentStage}</p>
        <button class="redirect" onclick={LoginRedirect}>Already on Heap of Help?</button>
      </div>
  
      <div id="form-content">
        {#if currentStage === 1}
          <h2>Step 1: Personal Details </h2>
          <form>
            <select id="selection" class="element" bind:value={profile}>
              <option value="" disabled selected>Select Tutor/Student</option>
              <option value="tutor">Tutor</option>
              <option value="tutee">Student</option>
            </select>
            <input class="element" type="text" bind:value={forename} placeholder="Forename" />
            <input class="element" type="text" bind:value={surname} placeholder="Surname" /> 
            <input class="element" type="text" bind:value={email} placeholder="Email" /> 
            <input class="element" type="text" bind:value={education} placeholder="Education" />
            <input class="element" type="number" bind:value={age} placeholder="Age" />
            <input class="element" type="text" bind:value={language} placeholder="Language" />
            <input class="element" type="text" bind:value={timezone} placeholder="Time Zone" />
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 2}
          <h2>Step 2: Account Setup</h2>
          <form>
            <div id="username">
              {#if username_validation}
                <input id="username_in" class="element" type="text" bind:value={username} placeholder="Username" readonly/>
                <button id="valid_username" type="button" onclick={valid_username}>Change</button>
                <span id="username_message" style="color:green;">Valid Username</span>
              {:else}
                <input id="username_in" class="element" type="text" bind:value={username} placeholder="Username" />
                <button id="valid_username" type="button" onclick={valid_username}>CHECK</button>
                <span id="username_message" style="color:red;">Invalid Username</span>
              {/if}
            </div>
            <div id="password" type= "text">
                <input class="element" name="password" id="password_in" type="password" placeholder="Password" bind:value={password} onkeydown={pw_length_check} onkeyup={(pw_match_check)} />
				        <span id='pw_length_message'></span>
			      </div>
			      <div id="password">
                <input class="element" type="password" name="confirm_password" id="confirm_password" placeholder="Confrim Password" bind:value={confirm_password} onkeyup={pw_match_check} /> 
                <span id='pw_match_message'></span>
            </div>
            <input class="element" type="file" id="profile-pic" accept="image/*" onchange={handle_profile_img}/>
            <textarea class="element" bind:value={description} placeholder="Description"></textarea>
            <button type="button" onclick={previousStage}>Back</button>
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}
  
        {#if currentStage === 3}
          <h2>Step 3: Selecting Tags </h2>
          <form>
            <div id="tags">
              <button class="tag_btn" data-value="Theoretical Computer Science"> Theoretical Computer Science</button>
              <button class="tag_btn" data-value="Computer Systems and Architecture"> Computer Systems and Architecture</button>
              <button class="tag_btn" data-value="Artificial Intelligence & Machine Learning"> Artificial Intelligence & Machine Learning</button>
              <button class="tag_btn" data-value="Software Engineering"> Software Engineering</button>
            </div>
            <button type="button" onclick={previousStage}>Back</button>
            <button type="button" onclick={registration}>Submit</button>
          </form>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

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

    #registration {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      background-color: #f8f8f8;
      height: 100vh;
      padding: 20px;
    }

    #container {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 30px;
      width: 80%;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
      position: relative;
    }

    #sidebar {
      width: 250px;
      flex-shrink: 0;
      background-color: #e0e0e0;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      border: 1px solid #ccc;
      font-family: 'Poppins', sans-serif;
      border-radius: 10px;
      height: auto;
      align-self: flex-start;
      color: black;
    }

    #form-content {
      flex-grow: 1;
      padding: 20px;
      min-width: 500px;
      max-width: 700px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    #username {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    #username_in {
      max-width: 550px;
    }

    #valid_username {
      max-width: 100px;
    }

    #password {
		display: flex;
      	align-items: center;
      	gap: 20px;
      	flex-wrap: wrap;
      	margin-top: 10px;
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

    /*for sidebar */

    .progress-item {
      padding: 10px 0;
      display: flex;
      align-items: center;
    }

    .progress-number {
      display: inline-block;
      width: 25px;
      height: 25px;
      background-color: #ccc;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 25px;
      margin-right: 10px;
      font-weight: bold;
    }

    .current .progress-number {
      background-color: blue;
    }

    .completed .progress-number {
      background-color: green;
    }

  </style>
