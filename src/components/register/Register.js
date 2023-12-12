import './Register.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleLogin = () => {
        window.location.href="/login"
    }

    useEffect(() => {
        // axios.get("http://localhost:3001/api/test-api").then(data => {
        //     console.log("Check data >>>", data)
        // })

    }, [])

    const isValidInput = () => {
        if (!email) {
            toast.error("email is required")
            return false
        }
        if (!phone) {
            toast.error("phone is required")
            return false
        }
        if (!password) {
            toast.error("password is required")
            return false
        }
        if (password != confirmPassword) {
            toast.error("password is not the same")
            return false
        }
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            toast.error("email invalid")
            return false
        }
        return true
    }

    const handleRegister = () => {
        toast.success("wow so easy")
        let check = isValidInput()
        let userData = {email,phone,userName,password, confirmPassword}
        console.log(userData)
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
                            <input type='text' className='form-control'         placeholder='Email address' 
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className='form-control' placeholder=' Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>User name:</label>
                            <input type='text' className='form-control' placeholder=' User name'
                                value={userName} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type='password' className='form-control' placeholder='Re-enter Password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                       
                        
                        <button className='btn btn-primary btn-lg' onClick={handleRegister}>Register</button>

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