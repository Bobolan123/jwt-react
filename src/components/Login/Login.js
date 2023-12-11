import './Login.scss'

const UserLogin = (props) => {
    
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-sm-7 d-none d-sm-block">
                        <div className='brand'>
                            Lan
                        </div>
                        <div className='detail'>
                            Reactjs for life
                        </div>
                    </div>
                    <div className="content-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3 mg-sm-0 mg-3">
                        <div className='brand d-sm-none d-block text-center'>
                            Lan
                        </div>
                        <input type='text' className='form-control' placeholder='Email or phone number'/>
                        <input type='password' className='form-control' placeholder='Password'/>
                        <button className='btn btn-primary btn-lg'>Login</button>
                        <span className='text-center'><a href='#' className='forget-password'>Forgot your password?</a></span>
                        <hr/>
                        <div className='text-center'>
                            <button className="btn btn-success">Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin