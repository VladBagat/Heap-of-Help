<script lang="js">
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    if (browser) {
    (async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/auth', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
              goto('/register');
            }

            const json = await res.json();
            console.log(json);

            if (json[0].success) {
                goto('/index'); 
            } else {
                
            }
        } catch (error) {
            console.error('Error fetching auth:', error);
        }
    })();
}

</script>