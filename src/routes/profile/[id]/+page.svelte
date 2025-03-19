<script lang="js">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
    const id = $page.params.id; 

    let isEditing = false;
    let rating =3;
    let isowner=true;
let user = {
    forename: "name",
    surname: "",
    email: "",
    age: "",
    education: "",
    language: "",
    timezone: "",
    description: "",
    profile_img: ""
};



    let tutorProfile = {};
    let isTutor = false;  

    let errorMessage = "";
    let loading = true;

async function fetchProfile() {
    try {
        console.log("Fetching profile for ID:", id);

        // First, try fetching tutor profile
        let res = await fetch(`/api/get_tutor_profile?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        let json = await res.json();
        console.log("Tutor Profile Response:", json);

        if (json.success) {
            isTutor = true;
            user = {
                forename: json.data.forename,
                surname: json.data.surname,
                email: json.data.email,
                age: json.data.age,
                education: json.data.education,
                language: json.data.language,
                timezone: json.data.timezone,
                description: json.data.description,
                profile_img: json.data.profile_img
            };
            return;
        }

        // If tutor profile is not found, try tutee profile
        res = await fetch(`/api/get_tutee_profile?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        json = await res.json();
        console.log("Tutee Profile Response:", json);

        if (json.success) {
            isTutor = false;
            user = {
                forename: data.forename,
                surname: data.surname,
                email: data.email,
                age: data.age,
                education: data.education,
                language: data.language,
                timezone: data.timezone,
                description: data.description,
                profile_img: data.profile_img
            };
        } else {
            console.error("Profile not found.");
            errorMessage = "Profile not found.";
        }
    } catch (error) {
        console.error("Failed to fetch profile:", error);
    } finally {
        loading = false;
    }
}


    async function ownerCheck() {

        const payload = { user_id: id };

        const res = await fetch('/api/pageowner', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (res.ok) {
            isowner = true;
        }
        else {
            isowner = false;
        }
    }

    function editProfile() {
        isEditing = !isEditing;
    }

async function saveChanges() {
    try {
        const payload = {
            forename: user.forename,
            surname: user.surname,
            email: user.email,
            age: user.age,
            education: user.education,
            language: user.language,
            timezone: user.timezone,
            description: user.description
        };

        console.log("Sending profile update:", payload);

        const res = await fetch('/api/update_profile', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();
        console.log("Profile update response:", json);

        if (json.success) {
            console.log("Profile updated successfully");
            isEditing = false;  // Exit edit mode
            fetchProfile();  // Refresh profile data
        } else {
            console.error("Failed to update profile:", json.message);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}

let en_rating = $state(false)

async function enable_rating() {
    const payload = {tutor_id: id};
    
    const res = await fetch('/api/enable_rating', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

    console.log(res)

    if (res.success) {
        console.log("can rate this tutor");
        en_rating = true;  // Exit edit mode
    } else {
        en_rating = false;
        console.log("cannot rate this tutor");
    }
}


onMount(() => {
    console.log("Running onMount()");
    fetchProfile();
    ownerCheck();
    enable_rating();
});


</script>

 <svelte:head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<div class="profile-page">
    <div class="profile-container">
        {#if isEditing}
            <div class="edit-profile">
                <h2>Edit Profile</h2>

                <div>First Name:</div>
                <input type="text" bind:value={user.forename} />

                <div>Last Name:</div>
                <input type="text" bind:value={user.surname} />

                <div>Email:</div>
                <input type="email" bind:value={user.email} />

                <div>Age:</div>
                <input type="number" bind:value={user.age} />

                <div>Education:</div>
                <input type="text" bind:value={user.education} />

                <div>Language:</div>
                <input type="text" bind:value={user.language} />

                <div>Timezone:</div>
                <input type="text" bind:value={user.timezone} />

                <div>Description:</div>
                <textarea bind:value={user.description}></textarea>

                <button class="btn save" on:click={saveChanges}> Save </button>
                <button class="btn cancel" on:click={editProfile}> Cancel </button>
            </div>
        {:else}
            <div class="profile-header">
                <img src="data:image/png;base64, {user.profile_img}" alt="Profile" class="profile-image">  
                <div class="user-info">
                    <h2 class="username">{user.forename} {user.surname}</h2>
                    <p class="age"> Age: {user.age}</p>
                    <p class="education">Education:{user.education}</p>
                    <p class="language"> Languages:{user.language}</p>
                    <p class="timezone"> Timezone:{user.timezone}</p>

                    <div class="content">
                        <h3>Description</h3>
                        <p>{user.description}</p>
                    </div>

                    <div class="rating">
                        {#each Array(5) as _, i}
                          {#if i < Math.floor(rating)}
                            <!-- Full star -->
                            <span class="fa fa-star checked"></span>
                          {:else if i === Math.floor(rating) && (rating - Math.floor(rating) > 0)}
                            <!-- Half star -->
                            <span class="fa fa-star-half-o checked"></span>
                          {:else}
                            <!-- Empty star -->
                            <span class="fa fa-star-o"></span>
                          {/if}
                        {/each}
                      </div>
                      

                    <div class="buttons">
                        {#if isowner}
                            <button class="btn edit" on:click={editProfile}> Edit Profile</button>
                        {/if}
                        <button class="btn primary">Send Message</button>
                        <button class="btn secondary">Contacts</button>
                        <button class="btn danger">Report User</button>
                    </div> 
                </div>
            </div>
        {/if}

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
                    <p><b>Email:</b> {user.email}</p>
                </div>
            </div>
        </div>    
    </div>
</div>    




<style>
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.profile-page {
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center; /* Centers vertically */
    min-height: 100vh; /* Full viewport height */
    background-color: #f8f9fa; /* Light gray background */
    padding: 20px;
}

/* Main Container */
.profile-container {
    width: 90%;
    max-width: 900px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    color: #333; /* Add default text color for better readability */
}

/* Header Section - Profile Image & User Info */
.profile-header {
    display: flex;
    align-items: center;
    gap: 70px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    padding-left: 50px;
}

.profile-header > .div > h2, p{
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
    color:#fffa86;
    font-size: 30px;
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

/* Fix heading and paragraph styling */
h2, h3 {
    color: #222; /* Darker color for headings */
    margin-bottom: 10px;
}

p {
    color: #333; /* Ensure paragraph text is readable */
    line-height: 1.5;
}

/* Description Section */
.content {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 5px;
}

/* Fix for content area */
.content p {
    color: #333; /* Ensure description text is readable */
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
    color: #333; /* Ensure text is readable in these sections */
}
    
</style>