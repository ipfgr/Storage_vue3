<template>
    <div >
        <div class="welcome center-align">
            <h4>Please login first</h4>
        </div>
        <div class="form-body" >
            <form>
                <div >
                    <div class="input-field col s4">
                        <input v-model.trim="loginForm.email" id="email" type="email" class="validate">
                        <label for="email">Email</label>
                    </div>
                </div>
                <div >
                    <div class="input-field col s4">
                        <input v-model.trim="loginForm.password" id="password" type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div>
                    <button @click.prevent="login" class="btn green darken-2">Login</button>
                    <router-link class="btn lime darken-2" to="/signin">Sign In</router-link>
                </div>
            </form>
        </div>
        <br/>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                })
            },
        },
    }
</script>

<style scoped>
    .form-body{
        text-align: center;
        display: flex;
        justify-content: center;
        margin: 5px;
    }
    .input-field{
        margin-left: 15px;
        min-width: 500px
    }

    div .btn{
        margin: 15px;
    }

    @media (max-width: 600px){
        .input-field {
            min-width: 350px !important;
        }
    }
</style>