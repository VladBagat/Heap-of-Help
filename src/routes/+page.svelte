<script lang="js">
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    if (browser){
      goto('/index');
    }
      
</script>

<!--This is an entry point. It redirects user to the index page-->