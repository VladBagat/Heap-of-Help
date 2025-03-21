<script lang="js">
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';  
    import { browser } from '$app/environment';
    import Modal from "$lib/modal.svelte";
    import { faSortNumericAsc } from "@fortawesome/free-solid-svg-icons";

    const id = $page.params.id; 

    let isEditing = $state(false);
    let ratingValue = $state(5);
    let ratedValue = $state();
    let isowner=$state(false);

    let user = $state([])

    let tutorProfile = {};
    let isTutor = false;  

    let errorMessage = "";
    let loading = true;

    function ratingalert() {
        // pop up where start appear and user can rate
    }

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
            setUserProfile(json.data);
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
            setUserProfile(json.data);
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
        console.log(json)
        if (json.success) {
            isowner = true;
            console.log("owner");
        } else {
            isowner = false;
            console.log("not owner");
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
function setUserProfile(data) {
    user = {
        forename: data.forename || "",
        surname: data.surname || "",
        email: data.email || "",
        age: data.age || "",
        education: data.education || "",
        language: data.language || "",
        timezone: data.timezone || "",
        description: data.description || "",
        profile_img: data.profile_img ? `data:image/png;base64,${data.profile_img}` : "/default-profile.jpg"
    };
}

let en_rating = $state(false)

async function message()  {
    goto (`/messages/${id}`)
}

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

    const json = await res.json();
    console.log(json)

    if (json.success) {
        console.log("can rate this tutor");
        en_rating = true;  // Exit edit mode
    } else {
        en_rating = false;
        console.log("cannot rate this tutor");
    }
}

    let showRatingPopup = $state(false);
    let rating_before = $state(false);
    let average_rating = $state(0);

    async function load_rating() {
        const payload = {tutor_id: id};
    
        const res = await fetch('/api/rating_check', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

        const json = await res.json();
        console.log(json)

        if (json.success) {
            rating_before = false;
            console.log("not rated");
        } else {
            rating_before = true;
            console.log("rated");
            ratedValue = json.rating
        }
        average_rating = json.average;
    }

    async function show_rating() {
        showRatingPopup= true;
    }

    async function close_rating() {
        showRatingPopup= false;
        console.log(ratingValue);
        const payload = {tutor_id: id, rated: rating_before, rating: ratingValue};
        console.log(payload);
        const res = await fetch('/api/rating', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

        const json = await res.json();
        console.log(json)

        if (json.success) {
            console.log("successfully rate the tutor");
        } else {
            console.log("fail to rate");
        }
        load_rating()
    }



onMount(() => {
    console.log("Running onMount()");
    fetchProfile();
    ownerCheck();
    enable_rating();
    load_rating();
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

                <button class="btn save" onclick={saveChanges}> Save </button>
                <button class="btn cancel" onclick={editProfile}> Cancel </button>
            </div>
        {:else}
            <div class="profile-header">
                <img src="{user.profile_img}" alt="Profile" class="profile-image">  
                <div class="user-info">
                    <h2 class="username">{user.forename} {user.surname}</h2>
                    <p class="age"> Age: {user.age}</p>
                    <p class="language"> Languages:{user.language}</p>
                    <p class="timezone"> Timezone:{user.timezone}</p>

                    <div class="content">
                        <h3>Description</h3>
                        <p>{user.description}</p>
                    </div>

                    <div class="rating">
                        {#each Array(5) as _, i}
                          {#if i < Math.floor(average_rating)}
                            <!-- Full star -->
                            <span class="fa fa-star checked"></span>
                          {:else if i === Math.floor(average_rating) && (average_rating - Math.floor(average_rating) > 0)}
                            <!-- Half star -->
                            <span class="fa fa-star-half-o checked"></span>
                          {:else}
                            <!-- Empty star -->
                            <span class="fa fa-star-o"></span>
                          {/if}
                        {/each}
                      </div>

                      {#if showRatingPopup}
                      <!-- Overlay for the modal -->
                            <!-- Modal content (stop propagation so clicks inside don't close it) -->
                            <div class="modal">
                                {#if rating_before}
                                    <h3>You have rated {user.forename} with {ratedValue} stars</h3>
                                    <h3>You can change the rating</h3>
                                {:else}
                                    <h3>Rate {user.forename}</h3>
                                {/if}
                                <div id="half-stars">
                                    <div class="rating-group">
                                      <input bind:group={ratingValue} class="rating__input rating__input--none" name="rating2" id="rating2-0" value="0" type="radio"/>
                                      <label aria-label="0 stars" class="rating__label" for="rating2-0">&nbsp;</label>
                                  
                                      <label aria-label="0.5 stars" class="rating__label rating__label--half" for="rating2-05">
                                        <i class="rating__icon rating__icon--star fa fa-star-half"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-05" value="0.5" type="radio" />
                                  
                                      <label aria-label="1 star" class="rating__label" for="rating2-10">
                                        <i class="rating__icon rating__icon--star fa fa-star"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-10" value="1" type="radio" />
                                  
                                      <label aria-label="1.5 stars" class="rating__label rating__label--half" for="rating2-15">
                                        <i class="rating__icon rating__icon--star fa fa-star-half"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-15" value="1.5" type="radio" />
                                  
                                      <label aria-label="2 stars" class="rating__label" for="rating2-20">
                                        <i class="rating__icon rating__icon--star fa fa-star"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-20" value="2" type="radio" />
                                  
                                      <label aria-label="2.5 stars" class="rating__label rating__label--half" for="rating2-25">
                                        <i class="rating__icon rating__icon--star fa fa-star-half"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-25" value="2.5" type="radio" />
                                  
                                      <label aria-label="3 stars" class="rating__label" for="rating2-30">
                                        <i class="rating__icon rating__icon--star fa fa-star"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-30" value="3" type="radio" />
                                  
                                      <label aria-label="3.5 stars" class="rating__label rating__label--half" for="rating2-35">
                                        <i class="rating__icon rating__icon--star fa fa-star-half"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-35" value="3.5" type="radio" />
                                  
                                      <label aria-label="4 stars" class="rating__label" for="rating2-40">
                                        <i class="rating__icon rating__icon--star fa fa-star"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-40" value="4" type="radio" />
                                  
                                      <label aria-label="4.5 stars" class="rating__label rating__label--half" for="rating2-45">
                                        <i class="rating__icon rating__icon--star fa fa-star-half"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-45" value="4.5" type="radio" />
                                  
                                      <label aria-label="5 stars" class="rating__label" for="rating2-50">
                                        <i class="rating__icon rating__icon--star fa fa-star"></i>
                                      </label>
                                      <input bind:group={ratingValue} class="rating__input" name="rating2" id="rating2-50" value="5" type="radio" checked />
                                    </div>
                                  </div>
                                <p class="desc" style="margin-bottom: 2rem; font-family: sans-serif; font-size:0.9rem"></p>
                                <button onclick={close_rating}>Submit</button>
                            </div>

                      {/if}

                    <div class="buttons">
                        {#if isowner}
                            <button class="btn edit" onclick={editProfile}> Edit Profile</button>
                        {/if}
                      
                        <button class="btn primary" onclick={message}>Send Message</button>

                        {#if en_rating}
                            <button class="btn rating" onclick={show_rating}>Rate</button>
                        {/if}
                        <button class="btn danger">Report User</button>
                    </div> 
                </div>
            </div>
        {/if}

        <div class="work-contact">
            <div class="work">
                <h2>Education</h2>
                <div>
                    <p>{user.education}</p>
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
    width: 95%;
    max-width: 1200px;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    color: #333; 
}

/* Header Section - Profile Image & User Info */
.profile-header {
    display: flex;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap;
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    padding-left: 50px;
}

.profile-header > .div > h2, p{
    margin: 5px;
}

.profile-image {
    width: 150px;  
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ddd;
    max-width: 100%
}

/* User Info */
.user-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.rating {
    padding: 0 0.1em;
    font-size: 2rem;
    color: orange;
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

/*scaling for smaller screens */

@media (max-width: 768px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }
    .profile-image {
        width: 120px;
        height: 120px;
    }
    .buttons {
        flex-direction: column;
        width: 100%
    }
    .btn {
        width: 100%;
        padding: 10px;
    }
    .work-contact{
        flex-direction: column;
    }
}

#half-stars {

/* use display:inline-flex to prevent whitespace issues. alternatively, you can put all the children of .rating-group on a single line */
.rating-group {
  display: inline-flex;
}

/* make hover effect work properly in IE */
.rating__icon {
  pointer-events: none;
}

/* hide radio inputs */
.rating__input {
 position: absolute !important;
 left: -9999px !important;
}

/* set icon padding and size */
.rating__label {
  cursor: pointer;
  /* if you change the left/right padding, update the margin-right property of .rating__label--half as well. */
  padding: 0 0.1em;
  font-size: 2rem;
}

/* add padding and positioning to half star labels */
.rating__label--half {
  padding-right: 0;
  margin-right: -0.6em;
  z-index: 2;
}

/* set default star color */
.rating__icon--star {
  color: orange;
}

/* set color of none icon when unchecked */
.rating__icon--none {
  color: #eee;
}

/* if none icon is checked, make it red */
.rating__input--none:checked + .rating__label .rating__icon--none {
  color: red;
}

/* if any input is checked, make its following siblings grey */
.rating__input:checked ~ .rating__label .rating__icon--star {
  color: #ddd;
}

/* make all stars orange on rating group hover */
.rating-group:hover .rating__label .rating__icon--star,
.rating-group:hover .rating__label--half .rating__icon--star {
  color: orange;
}

/* make hovered input's following siblings grey on hover */
.rating__input:hover ~ .rating__label .rating__icon--star,
.rating__input:hover ~ .rating__label--half .rating__icon--star {
  color: #ddd;
}

/* make none icon grey on rating group hover */
.rating-group:hover .rating__input--none:not(:hover) + .rating__label .rating__icon--none {
   color: #eee;
}

/* make none icon red on hover */
.rating__input--none:hover + .rating__label .rating__icon--none {
  color: red;
}
}
    
</style>