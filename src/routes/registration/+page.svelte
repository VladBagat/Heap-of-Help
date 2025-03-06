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
      if (validation(currentStage)) {
        currentStage += 1;
      }
    }

    function finalStage() {
      if (validation(currentStage)){
        ProfileRedirect();
      }
    }

    function previousStage() {
      if (currentStage > 1) {
        currentStage -= 1;
      }
    }

    function validation(){
      if (currentStage == 1){
        if (profile === "") {
          alert("Please select if you are a Tutor or Student");
          return false;
        }
        if (forename == "") {
          alert("Please enter your forename");
          return false;
        }
        if (surname.trim() === "") {
          alert("Please enter your surname");
          return false;
        }
        if (email.trim() === "") {
          alert("Please enter your email");
          return false;
        }
        if (education.trim() === "") {
          alert("Please enter your education");
          return false;
        }
        if (age <= 0) {
          alert("Please enter a valid age");
          return false;
        }
        if (language.trim() === "") {
          alert("Please enter your language");
          return false;
        }
        if (timezone.trim() === "") {
          alert("Please enter your time zone");
          return false;
        }
        return true;
        }
      else if (currentStage == 2){
        if (!username || username.trim() === "") {
          alert("Please enter a username");
          return false;
        }
        if (!password || password.trim() === "") {
          alert("Please enter a password");
          return false;
        }
        if (!confirm_password || confirm_password.trim() === "") {
          alert("Please confirm your password");
          return false;
        }
        if (password !== confirm_password) {
          alert("Passwords do not match");
          return false;
        }
        if (!description || description.trim() === "") {
          alert("Please enter a short description");
          return false;
        }
        // Profile picture is optional, so we don't validate it
        return true;
      }

      else if (currentStage == 3){
        if(selectedTags.length == 0){
          alert("Please choose at least 1 tag")
          return false;
        }
        return true;
      }
      return false;
    }

    function pw_check() {
      if (document.getElementById('password').value ==
        document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'matching';
      } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'not matching';
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

    // Use $state() for reactive variables
    let selectedMainCategory = $state(null);
    let selectedSubcategory = $state(null);
    let selectedTags = $state([]);

    const tagData = {
      "Theoretical Computer Science": {
        "Algorithms": ["Graph Algorithms", "Randomized Algorithms", "Approximation Algorithms"],
        "Formal Languages": ["Regular Languages", "Context-Free Languages", "Parsing"],
        "Cryptography": ["Public-Key Cryptography", "Zero-Knowledge Proofs"]
      },
      "Networking & Communications": {
        "Internet Protocols": ["Routing Protocols", "Transport Protocols"],
        "Cloud Computing": ["IaaS", "PaaS", "SaaS"],
        "Wireless Networks": ["WiFi", "Cellular Networks", "Ad Hoc Networks"]
      },
      "Programming Languages": {
        "Language Theory": ["Semantics", "Type Systems"],
        "Compiler Design": ["Lexical Analysis", "Parsing", "Code Optimization"],
        "Concurrency": ["Thread-based", "Message Passing", "Actor Model"]
      }
    };

    const mainCategories = Object.keys(tagData);

    function getSubcategories(mainCategory) {
      return Object.keys(tagData[mainCategory] || {});
    }

    function getFinalTags(mainCategory, subcategory) {
      return tagData[mainCategory]?.[subcategory] || [];
    }

    function selectMainCategory(category) {
      selectedMainCategory = selectedMainCategory === category ? null : category;
      selectedSubcategory = null;
    }

    function selectSubcategory(subcategory) {
      selectedSubcategory = selectedSubcategory === subcategory ? null : subcategory;
    }

    function toggleTag(tag) {
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
      } else if (selectedTags.length < 5){
        selectedTags = [...selectedTags, tag];
      }
    }

    function removeTag(tag) {
      selectedTags = selectedTags.filter(t => t !== tag);
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
            <input class="element" type="text" bind:value={username} placeholder="Username" />
            <div id="pass-inp" type= "text">
              <!-- <Password class="element" id="password" bind:value={password}/>
              <Password class="element" id="confirm_password" bind:value={confirm_password}/> -->
              <label>password :
                <input name="password" id="password" type="password" bind:value={password} onkeyup={pw_check} />
              </label>
              <label>confirm password:
                <input type="password" name="confirm_password" id="confirm_password" bind:value={confirm_password} onkeyup={pw_check} /> 
                <span id='message'></span>
              </label>
            </div>
            <input class="element" type="file" id="profile-pic" accept="image/*" onchange={handle_profile_img}/>
            {#if base64Image}
                <p>Preview:</p>
                <img src={base64Image} alt="Uploaded Image" width="100" />
            {/if}
            <textarea class="element" bind:value={description} placeholder="Description"></textarea>
            <button type="button" onclick={previousStage}>Back</button>
            <button type="button" onclick={nextStage}>Next</button>
          </form>
        {/if}

        {#if currentStage === 3}
        <h2>Step 3: Selecting Tags</h2>
        <form>
          <!-- Main category buttons -->
          <div id="tags">
            {#each mainCategories as category}
              <button 
                type="button" 
                class="tag_btn {selectedMainCategory === category ? 'active' : ''}" 
                onclick={() => selectMainCategory(category)}
              >
                {category}
              </button>
            {/each}
          </div>

          <!-- Subcategory buttons (only shown if main category is selected) -->
          {#if selectedMainCategory}
            <div id="subtags">
              <h3>Subfields in {selectedMainCategory}</h3>
              {#each getSubcategories(selectedMainCategory) as subcategory}
                <button 
                  type="button" 
                  class="tag_btn {selectedSubcategory === subcategory ? 'active' : ''}" 
                  onclick={() => selectSubcategory(subcategory)}
                >
                  {subcategory}
                </button>
              {/each}
            </div>
          {/if}

          <!-- Final tag options (only shown if subcategory is selected) -->
          {#if selectedSubcategory}
            <div id="final-tags">
              <h3>Topics in {selectedSubcategory}</h3>
              {#each getFinalTags(selectedMainCategory, selectedSubcategory) as tag}
                <button 
                  type="button" 
                  class="tag_btn {selectedTags.includes(tag) ? 'selected' : ''}" 
                  onclick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              {/each}
            </div>
          {/if}

          {#if selectedTags.length > 0}
            <div id="selected-tags">
              <h3>Selected Tags:</h3>
              <div class="selected-tag-list">
                <!-- Displaying the tags -->
                {#each selectedTags as tag}
                  <div class="selected-tag">
                    {tag} 
                    <button type="button" class="remove-btn" onclick={() => removeTag(tag)}>×</button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <div class="nav-buttons">
            <button type="button" onclick={previousStage}>Back</button>
            <button type="button" onclick={finalStage}>Submit</button>
          </div>
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

    #pass-inp {
      display: flex;
      flex-direction: column;
      gap: 13px;
      width: 100%;
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

          /* Basic styling */
    #tags, #subtags, #final-tags {
      margin-bottom: 15px;
    }

    .tag_btn {
      padding: 8px 15px;
      margin: 5px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .tag_btn:hover {
      background-color: #e0e0e0;
    }

    .tag_btn.active {
      background-color: #3b82f6;
      color: white;
    }

    .tag_btn.selected {
      background-color: #10b981;
      color: white;
    }

    #selected-tags {
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }

    .selected-tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .selected-tag {
      background-color: #d1fae5;
      color: #065f46;
      padding: 5px 10px;
      border-radius: 20px;
      display: flex;
      align-items: center;
    }

    .remove-btn {
      margin-left: 5px;
      background: none;
      border: none;
      color: #065f46;
      cursor: pointer;
      font-size: 16px;
    }

    .nav-buttons {
      margin-top: 20px;
    }

    .nav-buttons button {
      padding: 8px 16px;
      margin-right: 10px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }

    .nav-buttons button:last-child {
      background-color: #3b82f6;
      color: white;
    }


  </style>
