<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button on:click={navigateToNewRoute()}>
	Go to Login page
</button>

<script lang="js">
    import { goto } from '$app/navigation';
  
    function navigateToNewRoute() {
      goto('/login');
    }
</script>

<!--This is an index page. It has HTML button and text + a JavaScript function.
JS function uses SveltKit's "goto" to redirect user to the login page -->