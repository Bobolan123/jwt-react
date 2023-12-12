import './Register.scss'
import { Link } from 'react-router-dom'

const Register = (props) => {
    const handleLogin = () => {
        window.location.href="/login"
    }

    return (
        <div className="register-container">
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
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className='form-control' placeholder='Email or phone number'/>
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className='form-control' placeholder=' Phone number'/>
                        </div>
                        <div className='form-group'>
                            <label>User name:</label>
                            <input type='text' className='form-control' placeholder=' User name'/>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Password'/>
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type='password' className='form-control' placeholder='Re-enter Password'/>
                        </div>
                       
                        
                        <button className='btn btn-primary btn-lg'>Register</button>

                        <hr/>
                        <div className='text-center'>
                            <button className="btn btn-success" onClick={handleLogin}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register