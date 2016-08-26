import Ajax from 'dd/lib/ajax'
import Model from 'dd/lib/model'

let Auth = (data) =>{
    let baseurl = 'http://localhost:1337';
    let self = Model({
        id: '',
        email: '',
        password: '',
        resetToken: '',
        token: '',
        tokenExpires: '',
        createdAt: '',
        updatedAt: ''
    }).fill(data);

    self.login = (email,password,rememberMe) => {



        Ajax({
            data: {
                email,
                password,
                rememberMe,
            },
            method: 'POST',
            url: baseurl+'/auth/login',
            success: (data) => {
                self.fill(data.auth);
                self.fetchToken();
            },
            error: (err) =>{
                console.log(err);
            }

        });
    }

    self.fetchToken = () =>{
        self.email = email;
        self.password = password;

        Ajax({
            data: {
                email: self.email,
                password: self.password
            },
            method: 'POST',
            url: baseurl+'/user/jwt',
            success: (data) => {
                self.token = data.token,
                self.tokenExpires = data.expires
            },
            error: (err) =>{
                console.log(err);
            }

        });
    }

    return self;
};

export default Auth;