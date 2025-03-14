<script lang="js">
    import { goto } from '$app/navigation';

    // Function to redirect to the first page
    function redirectToStudentReg() {
        goto('/student_registration');
    }

    // Function to redirect to the second page
    function redirectToTutorReg() {
        goto('/tutor_registration');
    }
</script>

<div id="button-page">
    <div id="container">
        <button class="redirect-button" on:click={redirectToStudentReg}> Register as a Student</button>
        <button class="redirect-button" on:click={redirectToTutorReg}> Register as a Tutor</button>
    </div>
</div>

<style>
    #button-page {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }

    .redirect-button {
        padding: 15px 30px;
        font-size: 1.25em;
        color: #333;
        background-color: #e0e0e0;
        border: 2px solid #333;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .redirect-button:hover {
        background-color: #333;
        color: #fff;
        border-color: #e0e0e0;
    }
</style>