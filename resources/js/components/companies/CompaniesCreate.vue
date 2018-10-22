<template>
    <div>
        <div class="form-group">
            <router-link to="/company" class="btn btn-default">Back</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Create new company</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Company name</label>
                            <input type="text" name="name" v-model="company.name" class="form-control" v-validate="'required'">
                            <span>{{ errors.first('name') }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Company address</label>
                            <input type="text" name="address" v-model="company.address" class="form-control" v-validate="'required'">
                            <span>{{ errors.first('address') }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Company website</label>
                            <input type="text" name="website" v-model="company.website" class="form-control"v-validate="'required|url'">
                            <span>{{ errors.first('website') }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Company email</label>
                            <input type="text" name="email" v-model="company.email" class="form-control" v-validate="'required|email'">
                            <span>{{ errors.first('email') }}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success" :disabled="!isFormValid">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.companyId = id;
            if(id != undefined)
            {
                this.axios.get('/v1/companies/' + id)
                .then(function (resp) {
                    app.company = resp.data;
                })
                .catch(function () {
                    alert("Could not load your company")
                });
            }
        },
        data: function () {
            return {
                companyId: null,
                company: {
                    name: '',
                    address: '',
                    website: '',
                    email: '',
                }
            }
        },
        computed: {
          isFormValid () {
            return !Object.keys(this.fields).some(key => this.fields[key].invalid)
          }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                var app = this;
                var newCompany = app.company;
                
                if(app.companyId == undefined)
                {
                    this.axios.post('/v1/companies', newCompany)
                        .then(function (resp) {
                            app.$router.push({path: '/company'});
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            alert("Could not create your company");
                        });
                }else{
                    this.axios.patch('/v1/companies/' + app.companyId, newCompany)
                        .then(function (resp) {
                            app.$router.push({path: '/company'});
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            alert("Could not update your company");
                        });
                }
            }
        }
    }
</script>