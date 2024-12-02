<script>
    let message = '';

    async function fetch_msg(){
        const response = await fetch('https://hoh-api-24174ce192a4.herokuapp.com/hello')
        message = await response.text()
    };
</script>

<h1>This is a Login page</h1>

<h2>{message}</h2>

<button on:click={fetch_msg}>Click to get a message!</button>