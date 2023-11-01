
<script>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
    <header>
        <nav class="container">
            <div class="branding">
                <img src="../assets/Vue_Logo_Black.png" alt="">
                <h1>
                    Treechart
                </h1>
            </div>
            <ul class="nav-routes">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/tree">Tree</RouterLink>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    background-color: aliceblue;
    border-bottom: 2px solid black; 
}

header nav {
    display: flex;
    align-items: center;
    padding: 10px 12px;
}

header .branding {
    display: flex;
    align-items: center;
    gap: 18px;
}

header .branding img {
    max-width: 50px;
}

header .branding h1 {
    font-size: 24px;
}

header .nav-routes {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 12px;
    list-style: none;
}

header .nav-routes a {
    text-decoration: none;
    color: inherit;
}
</style>
