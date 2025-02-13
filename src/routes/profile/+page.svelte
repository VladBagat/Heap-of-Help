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
    <div class="header">
        <img src="profile.avif" alt="Profile Image" class="profile-image" id="profileImage" style="width:100%">  
        <div class="username"><h2>John Doe</h2></div>
        <div class="tags"><a href="#">tag 1</a><br><a href="#">tag 2</a><br><a href="#">tag 3</a></div>
        <div class="content"><h3>Description</h3>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ridiculus sit nisl laoreet facilisis aliquet.</p>
        </div>
    </div>

    <div class="work-contact">
        <div class="work"> 
            <h3>Google</h3>
            <p>Software Engineer</p>
        </div>
        <div class="contact">
            <h3>Contact</h3>
            <p><b>Email</b>: qwerth@gmail.com</p>
            <p><b>Phone number</b>: 070000000</p>
        </div>
    </div>

    <div class="footer"><h4>Footer</h4></div>
</div>


<style>
.container {
  display: grid;
  grid-template-areas:
    "header"
    "work-contact"
    "footer";
  gap: 10px;
  background-color: #000000;
  padding: 10px;
  max-width: auto;
  color: white; 
}


.container > div {
  background-color: rgba(255, 255, 255, 0.9); /* Increased contrast */
  padding: 10px;
  border-radius: 5px; /* Added rounded corners */
}

/* Fixed Class Name from `.contianer` to `.container` */
.container > div.header {
  display: grid;
  grid-template-areas: 
    "image username"
    "image content"
    "image tags";
  grid-template-columns: 200px auto; /* Fixed sizes */
  gap: 10px;
  background-color: #222; /* Darker background */
  padding: 10px;
  width: 100%;
}

.container > div.tags {
  grid-area: tags;
}

.container > div.content {
  grid-area: content;
}

.container > div.footer {
  grid-area: footer;
  text-align: center;
}

.container > div.work-contact {
  display: grid;
  grid-template-areas: "work contact";
  grid-template-columns: 800px 500px;
  gap: 10px;
  background-color: #222;
  padding: 10px;
  width: 100%;
}

.container > div.work-contact > div.work {
    grid-area: work;
    background-color: rgba(255, 255, 255, 1);
    padding: 10px;
    color: black;
    border-radius: 5px;
}

.container > div.work-contact > div.contact {
    grid-area: contact;
    background-color: rgba(255, 255, 255, 1);
    padding: 10px;
    color: black;
    border-radius: 5px;
}

</style>