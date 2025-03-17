<script lang="js">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
    const id = $page.params.id; 


let isEditing = false;
let rating = 5.0;
let isowner = false;
let isTutor = false;  
let user = {
    forename: "",
    surname: "",
    email: "",
    age: "",
    education: "",
    language: "",
    timezone: "",
    description: "",
    profile_img: ""
};

let errorMessage = "";
let loading = true;

    async function fetchProfile() {
    try {
        const tutorRes = await fetch(`/api/get_tutor_profile?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        const tutorJson = await tutorRes.json();

        if (tutorJson.success) {
            isTutor = true;  // Mark user as tutor
            setUserProfile(tutorJson.data);
            return;
        }

        // If tutor profile is not found, try fetching as a tutee
        const tuteeRes = await fetch(`/api/get_tutee_profile?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        const tuteeJson = await tuteeRes.json();

        if (tuteeJson.success) {
            isTutor = false;  // Mark user as tutee
            setUserProfile(tuteeJson.data);
        } else {
            errorMessage = "Profile not found.";
        }
    } catch (error) {
        console.error("Failed to fetch profile:", error);
    } finally {
        loading = false;
    }
}

async function ownerCheck() {
    const res = await fetch('/api/auth', {
        method: 'GET',
        credentials: 'include',
    });

    const json = await res.json();

    if (json.success && json.user_id == id) {
        isowner = true;
    } else {
        isowner = false;
    }
}

function setUserProfile(data) {
    user = {
        forename: data.first_name,
        surname: data.last_name,
        email: data.email,
        age: data.age || "",
        education: data.education || "",
        language: data.language || "",
        timezone: data.timezone || "",
        description: data.description || "",
        profile_img: data.profile_img ? `data:image/png;base64,${data.profile_img}` : "/default-profile.jpg"
    };
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

        const res = await fetch('/api/update_profile', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();

        if (json.success) {
            console.log("Profile updated successfully");
        } else {
            console.error("Failed to update profile:", json.message);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }

    isEditing = false;
    await fetchProfile();  // Refresh profile data after saving
}

onMount(() => {
    fetchProfile();
    ownerCheck();
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
            </div>
        {:else}
            <div class="profile-header">
                <img src="{user.profile_img}" alt="Profile" class="profile-image">  
                <div class="user-info">
                    <h2 class="username">{user.forename} {user.surname}</h2>
                    <p class="email">📧 {user.email}</p>
                    <p class="age">🎂 Age: {user.age}</p>
                    <p class="education">🎓 {user.education}</p>
                    <p class="language">🗣️ {user.language}</p>
                    <p class="timezone">⏰ {user.timezone}</p>

                    <div class="content">
                        <h3>Description</h3>
                        <p>{user.description}</p>
                    </div>

                    {#if isowner}
                        <button class="btn" on:click={editProfile}> Edit Profile</button>
                    {/if}
                </div>
            </div>
        {/if}
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