<!--Register new user form component-->
<template>
    <div>
        <div class="welcome center-align">
            <h4>Not yet have account?</h4>
        </div>
        <div class="form-body">
            <form>
                <div>
                    <div class="input-field col s4">
                        <input class="validate" id="email" type="email" v-model.trim="RegisterForm.email">
                        <label for="email">Email</label>
                    </div>
                </div>

                <div>
                    <div class="input-field col s4">
                        <input class="validate" id="password" type="password" v-model.trim="RegisterForm.password">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div>
                    <div class="input-field col s4">
                        <input class="validate" id="repeat-password" type="password"
                               v-model.trim="RegisterForm.repeatPassword">
                        <label for="repeat-password">Repeat Password</label>
                    </div>
                </div>
                <div>
                    <button @click.prevent="Register" class="btn green darken-2">Register</button>
                    <router-link class="btn lime darken-2" to="/login">Login</router-link>
                </div>
            </form>
        </div>
        <br/>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                RegisterForm: {
                    email: '',
                    password: '',
                    repeatPassword: '',
                }
            }
        },
        methods: {
            Register() {
                const email = this.RegisterForm.email
                const password = this.RegisterForm.password
                const repPassword = this.RegisterForm.repeatPassword
                if (password !== repPassword) {
                    alert("passwords password and repeat password dosn't match")
                }
                if (!email || !password) {
                    alert("Please enter correct information to register")
                } else {
                    this.$store.dispatch('Register', {
                        email: email,
                        password: password
                    })
                }
            }
        },

    }
</script>

<style scoped>
    .form-body {
        text-align: center;
        display: flex;
        justify-content: center;
        margin: 5px;
    }

    .input-field {
        min-width: 400px !important;
    }

    div .btn {
        margin: 15px;
    }
</style>