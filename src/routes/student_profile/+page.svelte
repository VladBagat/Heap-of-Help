<script lang="js">
    import { onMount } from "svelte";

    let tuteeProfile = null;
    let errorMessage = "";
    let loading = true;

    async function fetchTuteeProfile(id) {
        try {
            const response = await fetch('api/get_tutee_profile');
            console.log(response);

            const data = await response.json();

            if (response.ok) {
                tuteeProfile = data.data;
            } else {
                errorMessage = data.message;
            }
        } catch (error) {
            errorMessage = "Failed to connect to the server.";
        } finally {
            loading = false;
        }
    }

    // Call API when component loads
    onMount(() => {
        fetchTuteeProfile(234);  // Fetch profile for tutee with ID 234
    });

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
<div class="profile-page">
    <div class="container">
        <div class="header">
            <img src="profile.avif" alt="Profile Image" class="profile-image" id="profileImage">  
            <div class="user-info">
                <h2 class="username">John Doe</h2>
                <p class="role">Product Designer</p>
                <p class="location">📍 New York, NY</p>
                <p class="rating"><strong>8.6</strong> ⭐⭐⭐⭐☆</p>
                <div class="tags">
                    <p>tag 1, tag 2, tag 3</p>
                </div>
                <div class="content">
                    <h3>Description</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus sit nisl laoreet facilisis aliquet.</p>
                </div>
                <div class="buttons">
                    <button class="btn primary">Send Message</button>
                    <button class="btn secondary">Contacts</button>
                    <button class="btn danger">Report User</button>
                </div> 
            </div>
        </div>

        <div class="work-contact">
            <div class="work">
                <h2>WORK</h2>
                <div>
                    <h3>Google</h3>
                    <p>Software Developer</p>
                </div>
            </div>
            <div class="contact">
                <h2>CONTACT</h2>
                <div>
                    <p><b>Email:</b> qwerty@gmail.com</p>
                    <p><b>Phone:</b> 000000000</p>
                </div>
            </div>
        </div>

        <div class="footer">
            <h4>Footer</h4>
        </div>
    </div>
</div>



<style>
.profile-page {
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center; /* Centers vertically */
    min-height: 100vh; /* Full viewport height */
    background-color: #f8f9fa; /* Light gray background */
    padding: 20px;
}

/* Main Container */
.container {
    width: 90%;
    max-width: 900px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Header Section - Profile Image & User Info */
.header {
    display: flex;
    align-items: center;
    gap: 70px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    padding-left: 50px;
}

.header > h2, p{
    margin: 5px;
}

.profile-image {
    width: 200px;  
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ddd;
}

/* User Info */
.user-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.rating {
    font-size: 14px;
    font-weight: bold;
    color: #444;
}

/* Buttons */
.buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.btn {
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.btn.primary {
    background: #007bff;
    color: white;
}

.btn.secondary {
    background: white;
    color: black;
    border: 1px solid #ddd;
}

.btn.danger {
    background: red;
    color: white;
}

/* Description Section */
.content {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 5px;
}

/* Work & Contact Section */
.work-contact {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 20px;
}

.work, .contact {
    flex: 1;
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Footer */
.footer {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
    color: #777;
}
   
</style>