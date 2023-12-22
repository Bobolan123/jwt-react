import './Register.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { registerNewUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [checkInput, setCheckInput] = useState(defaultValidInput)
    const handleLogin = () => {
        navigate('/login');
    }

    const isValidInput = () => {
        setCheckInput(defaultValidInput)
        if (!email) {
            toast.error("email is required")
            setCheckInput({...defaultValidInput, isValidEmail: false})
            return false
        }
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setCheckInput({...defaultValidInput, isValidEmail: false})
            toast.error("email invalid")
            return false
        }
        if (!phone) {
            setCheckInput({...defaultValidInput, isValidPhone: false})
            toast.error("phone is required")
            return false
        }
        if (!password) {
            setCheckInput({...defaultValidInput, isValidPassword: false})

            toast.error("password is required")
            return false
        }
        if (password != confirmPassword) {
            setCheckInput({...defaultValidInput, isValidConfirmPassword: false})
            toast.error("password is not the same")
            return false
        }
        
        return true
    }

    const handleRegister = async () => {
        toast.success("wow so easy")
        let check = isValidInput()
        if (check === true) {
            let serverData =  await registerNewUser(email, phone, userName, password)
            if (+serverData.EC === 0) {
                toast.success(serverData.EM)
                navigate('/login');
            } else {
                toast.error(serverData.EM)
            }
        }
        
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
                            <input type='text' className={checkInput.isValidEmail? 'form-control' : 'form-control is-invalid'} placeholder='Email address' 
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className={checkInput.isValidPhone? 'form-control' : 'form-control is-invalid'} placeholder=' Phone number'
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
                            <input type='password' className={checkInput.isValidPassword? 'form-control' : 'form-control is-invalid'} placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type='password' className={checkInput.isValidConfirmPassword? 'form-control' : 'form-control is-invalid'} placeholder='Re-enter Password'
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