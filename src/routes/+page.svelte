<script lang="js">
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    if (browser) {
    (async () => {
        try {
            const res = await fetch('api/auth', {
                method: 'GET',
                credentials: 'include',
            });
            
            //This checks whether HTTP response is valid or not.
            //If HTTP code is 2##, user is loged in automatically
            //Else user is redirected to the login page
            if (res.ok) {
                const data = await res.json();
                const { user_id } = data[0]; //user_id for personalised content
                goto('/discovery'); 
            }
            else{
                goto('/login');
            }

        } catch (error) {
            console.error('Error fetching auth:', error);
        }
    })();
}

</script>