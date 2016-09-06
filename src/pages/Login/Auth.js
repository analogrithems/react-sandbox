import Ajax from 'dd/lib/ajax'
import Model from 'dd/lib/model'
import apiConf from '../../configs/apiConf'

class Auth extends Model {
	constructor(data) {
		super({
            id: '',
            email: '',
            password: '',
            resetToken: '',
            token: '',
            tokenExpires: '',
            createdAt: '',
            updatedAt: ''
		});
        this.baseurl = apiConf.baseServer;
		this.fill(data);
	}


    login(email,password,rememberMe) {
        Ajax({
            data: {
                email,
                password,
                rememberMe,
            },
            withCredentials: true,
            method: 'POST',
            url: this.baseurl+'/auth/login',
            success: (data) => {
                this.fill(data.auth);
                this.fetchToken();
            },
            error: (err) =>{
                console.log(err);
            }

        });
    }

    fetchToken(){
       
        Ajax({
            withCredentials: true,
            method: 'GET',
            url: this.baseurl+'/user/jwt',
            success: (data) => {
                this.token = data.token,
                this.tokenExpires = data.expires
            },
            error: (err) =>{
                console.log(err);
            }

        });
    }

};

export default Auth;