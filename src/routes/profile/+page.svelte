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
    <div class="username" id="username">My name!</div>
    <div class="description" id="desscrption">Some description</div>
</div>


<style>
   body {
    font-family:Arial, sans-serif:
    background-color:#f0f0f0;
    margin: 0;
    padding: 0;
   }
   .profile-container {
    width:300px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1):
    tex-align: center;
    border-radius: 10px;
   }
   .profile-image {
    width: 100px;
    height: 100px;
    border-radius:50%;
    margin-bottom: 15px;
   }
   .username { 
    font-size: 16px;
    color: #666;
   }
</style>