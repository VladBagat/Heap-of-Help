<script lang="js">
    
    let login = $state('');
    let password = $state('');

    let is_remember = $state(false);

    async function Login() {
        console.log(login);
        console.log(password);

        const payload = { username: login, password: password, remember:is_remember };

        const res = await fetch('https://hoh-api-24174ce192a4.herokuapp.com/login', {
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
    

    import { goto } from '$app/navigation';

    function RegisterRedirect(){
        goto('/register');
    }

    function IndexRedirect(){
        goto('/index')
    }

 // Function to handle the "Chat" button click
 function handleChat() {
        console.log('Chat button clicked');
        // Add chat functionality here
    }
    // Function to handle the "Edit" button click
    function handleEdit() {
        console.log('Edit button clicked');
        // Add edit profile functionality here
    }
</script>

<div class="profile-container">
    <img src="profile.avif" alt="Profile Image" class="profile-image" id="profileImage">
    <div class="text-container">
        <div class="username" id="username">My name!</div>
        <div class="description" id="description">Some description</div>
        <div class="tags" id="tags">tag1, tag2, tag3</div>
        <div class="button-container">
            <button class="chat-button" on:click={handleChat}>Chat</button>
            <button class="edit-button" on:click={handleEdit}>Edit</button>
        </div>
    </div>
</div>

<style>
    body {
     font-family:Arial, sans-serif;
     background-color:#f0f0f0;
     margin: 0;
     padding: 0;
    }
    .profile-container {
     display: flex; /* row aligning */
     align-items: center; 
     width:500px;
     margin: 50px 0 50px 20px; /* shifted left */
     padding: 20px;
     background-color: #fff;
     border-radius: 10px;
    }
    .profile-image {
     width: 300px;
     height: 300px;
     border-radius:50%;
     margin-right: 15px;
    }
   .button-container {
        display: flex;
        gap: 10px; /* Space between buttons */
        margin-top: 15px; /* Space above the buttons */
    }
    .chat-button, .edit-button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    .chat-button {
        background-color: #4CAF50; /* Green */
        color: white;
    }
    .edit-button {
        background-color: #008CBA; /* Blue */
        color: white;
    }
    .chat-button:hover {
        background-color: #45a049; /* Darker green */
    }
    .edit-button:hover {
        background-color: #007B9E; /* Darker blue */
    }
    
    .text-container {
    display: flex;
    flex-direction: column; /*stacking username and description */
    align-items: flex-start;
    
    }
   .username { 
    font-size: 30px;
    color: #666;
    font-weight: bold;
    margin-bottom: 5px;
    margin-bottom: 10px;
    }
   .description {
    font-size: 20px;
    color: #666;
    margin-bottom: 5px;
    }
   
   .tags {
    font-size: 20px;
    color: #888;
    margin-bottom: 20px;
    }
   
</style>