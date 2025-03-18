<script lang="js">
import { onMount } from "svelte";
import { goto } from '$app/navigation';
import { page } from '$app/stores'; 
import { writable, get } from 'svelte/store'; 
const id = get(page).params.id;  // Ensure `id` is properly fetched

let isEditing = writable(false);
let rating = writable(5.0);
let isowner = writable(false);
let isTutor = writable(false);  
let user = writable({
    forename: "test",
    surname: "",
    email: "test",
    age: "test",
    education: "",
    language: "",
    timezone: "",
    description: "",
    profile_img: "/static/profile.avif"
});

let errorMessage = writable("");
let loading = writable(true);

async function fetchProfile() {
    console.log("Fetching profile for ID:", id);  // Log the request

    try {
        const tutorRes = await fetch(`/api/get_tutor_profile?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        const tutorJson = await tutorRes.json();
        console.log("Tutor profile response:", tutorJson);

        if (tutorJson.success) {
            isTutor.set(true);
            setUserProfile(tutorJson.data);
            return;
        }

        const tuteeRes = await fetch(`/api/get_tutee_profile?id=${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        const tuteeJson = await tuteeRes.json();
        console.log("Tutee profile response:", tuteeJson);

        if (tuteeJson.success) {
            isTutor.set(false);
            setUserProfile(tuteeJson.data);
        } else {
            console.warn("Profile not found.");
            errorMessage.set("Profile not found.");
        }
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        errorMessage.set("Error fetching profile.");
    } finally {
        loading.set(false);
    }
}

function editProfile() {
    isEditing = !isEditing;
}

async function ownerCheck() {
    try {
        const res = await fetch('/api/auth', {
            method: 'GET',
            credentials: 'include',
        });

        const json = await res.json();
        console.log("Owner check data:", json);

        if (json.success && json.user_id == id) {
            isowner.set(true);
        } else {
            isowner.set(false);
        }
    } catch (error) {
        console.error("Failed to check ownership:", error);
        isowner.set(false);
    }
}

async function saveChanges() {
    try {
        const updatedUser = get(user);
        const payload = {
            forename: updatedUser.forename,
            surname: updatedUser.surname,
            email: updatedUser.email,
            age: updatedUser.age,
            education: updatedUser.education,
            language: updatedUser.language,
            timezone: updatedUser.timezone,
            description: updatedUser.description
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
        console.log("Profile update response:", json);

        if (json.success) {
            console.log("Profile updated successfully");
            await fetchProfile();  // Refresh profile data
        } else {
            console.error("Failed to update profile:", json.message);
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }

    isEditing.set(false);
}
function setUserProfile(data) {
    console.log("Setting user profile:", data); // Debugging log

    user.set({
        forename: data.first_name || "",
        surname: data.last_name || "",
        email: data.email || "",
        age: data.age || "",
        education: data.education || "",
        language: data.language || "",
        timezone: data.timezone || "",
        description: data.description || "",
        profile_img: data.profile_img ? `data:image/png;base64,${data.profile_img}` : "/default-profile.jpg"
    });
}

onMount(() => {
    console.log("Running onMount()");
    fetchProfile();  // Force profile fetch (please work)
    ownerCheck();
});

</script>

 <svelte:head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>
<div class="profile-page">
    <div class="profile-container">
        {#if $loading}
            <p>Loading profile...</p>
        {:else if $errorMessage}
            <p class="error">{$errorMessage}</p>
        {:else}
            {#if $isEditing}
                <div class="edit-profile">
                    <h2>Edit Profile</h2>

                    <div>First Name:</div>
                    <input type="text" bind:value={$user.forename} />

                    <div>Last Name:</div>
                    <input type="text" bind:value={$user.surname} />

                    <div>Email:</div>
                    <input type="email" bind:value={$user.email} />

                    <div>Age:</div>
                    <input type="number" bind:value={$user.age} />

                    <div>Education:</div>
                    <input type="text" bind:value={$user.education} />

                    <div>Language:</div>
                    <input type="text" bind:value={$user.language} />

                    <div>Timezone:</div>
                    <input type="text" bind:value={$user.timezone} />

                    <div>Description:</div>
                    <textarea bind:value={$user.description}></textarea>

                    <button class="btn save" on:click={saveChanges}> Save </button>
                    <button class="btn cancel" on:click={() => isEditing.set(false)}> Cancel </button>
                </div>
            {:else}
                <div class="profile-header">
                    <img src="{$user.profile_img}" alt="Profile" class="profile-image">  
                    <div class="user-info">
                        <h2 class="username">{$user.forename} {$user.surname}</h2>
                        <p class="email">📧 {$user.email}</p>
                        <p class="age">🎂 Age: {$user.age}</p>
                        <p class="education">🎓 {$user.education}</p>
                        <p class="language">🗣️ {$user.language}</p>
                        <p class="timezone">⏰ {$user.timezone}</p>

                        <div class="content">
                            <h3>Description</h3>
                            <p>{$user.description}</p>
                        </div>

                        <div class="rating-container">
                            <h3>Rating:</h3>
                            <img src="/stars/{$rating}s.jpg" alt="Rating" class="rating">
                        </div>

                        {#if $isowner}
                            <button class="btn" on:click={() => isEditing.set(true)}> Edit Profile</button>
                        {/if}
                    </div>
                </div>
            {/if}
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