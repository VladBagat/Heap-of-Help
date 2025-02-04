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

</script>

<div class="profile-container">
    <img src="profile.avif" alt="Profile Image" class="profile-image" id="profileImage">
    <div class="text-container">
        <div class="username" id="username">My name!</div>
        <div class="description" id="description">Some description</div>
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
   }

   .description {
    font-size: 16px;
    color: #888
   }
</style>