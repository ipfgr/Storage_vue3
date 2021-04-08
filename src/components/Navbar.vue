<!--Component for show navigation menu-->
<template>
    <header>
        <nav class="nav-extended">
            <div class="nav-wrapper blue-grey darken-4">
                <a class="brand-logo" href="#">MyStorage</a>
                <a class="sidenav-trigger" data-target="mobile" href="#"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <section v-show="loggedAs">
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>

                        <li>
                            <router-link to="/dashboard">Dashboard</router-link>
                        </li>
                        <li>
                            <router-link to="/add">Add income</router-link>
                        </li>
                        <li>
                            <router-link to="/add-item">Add item</router-link>
                        </li>
                        <li>Logged as: {{ loggedAs }}</li>
                        <li>
                            <router-link @click="logout" to="#">Logout</router-link>
                        </li>
                    </section>
                </ul>
            </div>
        </nav>
        <!--        Side menu for mobile devices      -->
        <ul class="sidenav" id="mobile" ref="sidenav">
            <li><a class="brand-logo" href="#">MyStorage</a></li>
            <section v-show="loggedAs">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/add">Add income</router-link>
                </li>
                <li>
                    <router-link to="/add-item">Add item</router-link>
                </li>
                <li>Logged as: {{ loggedAs }}</li>
                <li>
                    <router-link @click="logout" to="#">Logout</router-link>
                </li>
            </section>
        </ul>
        <!--        Side menu for mobile devices      -->

    </header>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {}
        },
        mounted() {
            window.M.Sidenav.init(this.$refs.sidenav, {})
        },
        methods: {
            logout() {
                this.$store.dispatch("logout")
            }
        },
        computed: {
            loggedAs() {
                return this.$store.getters.LoggedWithEmail
            }

        }
    }

</script>

<style scoped>
    .brand-logo {
        padding-left: 15px;
        color: white;
    }

    nav ul a {
        color: white;
        transition: all 1s;
    }

    nav ul a:hover {
        border: 1px solid #cdd820;
        color: #cdd820 !important;
    }
</style>