import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export async function checkAuth() {
    try {
        const response = await fetch('/api/auth', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (response.ok) {
            const data = await response.json();
            isLoggedIn.set(true); 
        } else {
            isLoggedIn.set(false); 
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        isLoggedIn.set(false);
    }
}

export async function logout(event) {
    event.preventDefault();

    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include' 
        });

        if (response.ok) {
            localStorage.removeItem("user"); 
            isLoggedIn.set(false); 
            window.location.href = "/index"; 
        } else {
            console.error("Logout failed");
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
}
