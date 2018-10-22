<template>
    <div>
        <div class="alert alert-danger" v-if="myerror && !success">
            <p>There was an error, unable to complete registration.</p>
        </div>
        <div class="alert alert-success" v-if="success">
            <p>Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link></p>
        </div>
        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
            <div class="form-group" v-bind:class="{ 'has-error': myerror && myerrors.name }">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" class="form-control" v-model="name" v-validate="'required'">
                <span>{{ errors.first('name') }}</span>
                <span class="help-block" v-if="myerror && myerrors.name">{{ myerrors.name }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': myerror && myerrors.email }">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="user@example.com" v-model="email" v-validate="'required|email'" >
                <span>{{ errors.first('email') }}</span>
                <span class="help-block" v-if="myerror && myerrors.email">{{ myerrors.email }}</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': myerror && myerrors.password }">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="form-control" v-model="password" v-validate="'required|min:6'">
                <span>{{ errors.first('password') }}</span>
                <span class="help-block" v-if="myerror && myerrors.password">{{ myerrors.password }}</span>
            </div>
            <button type="submit" class="btn btn-default" :disabled="!isFormValid">Submit</button>
        </form>
    </div>
</template>
<script> 
    export default {
        data(){
            return {
                name: '',
                email: '',
                password: '',
                myerror: false,
                myerrors: {},
                success: false
            };
        },
        computed: {
          isFormValid () {
            return !Object.keys(this.fields).some(key => this.fields[key].invalid)
          }
        },
        methods: {
            register(){
                var app = this
                this.$auth.register({
                    data: {
                        name: app.name,
                        email: app.email,
                        password: app.password
                    }, 
                    success: function () {
                        app.success = true
                    },
                    error: function (resp) {
                        app.myerror = true;
                        app.myerrors = resp.response.data.errors;
                    },
                    redirect: null
                });                
            }
        }
    }
</script>