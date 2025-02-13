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

<div class="container">
    <img src="profile.avif" alt="Profile Image" class="profile-image" id="profileImage" style="width:100%">  
    <div class="username"><h2>John Doe</h2></div>
    <div class="tags"><a href="#">tag 1</a><br><a href="#">tag 2</a><br><a href="#">tag 3</a></div>
    <div class="content"><h3>Description</h3><p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ridiculus sit nisl laoreet facilisis aliquet. Potenti dignissim litora eget montes rhoncus sapien neque urna. Cursus libero sapien integer magnis ligula lobortis quam ut.</p></div>
    <div class="footer"><h4>Footer</h4></div>
  </div>

<style>
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "menu content"
    "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 1px;
  background-color: #000000;
  padding: 1px;
  max-width: 1000px;
}
.container > div {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
}
.container > div.header {
  grid-area: header;
  text-align: center;
}
.container > div.menu {
  grid-area: menu;
}
.container > div.content {
  grid-area: content;
}
.container > div.footer {
  grid-area: footer;
}
.container > div.profile-image {
    width: 100px;
}
   
</style>