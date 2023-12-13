import { useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";

const UserLogin = (props) => {
  const handleCreateNewAccount = () => {
    window.location.href = "/register";
  };

  const [valLogin, setValLogin] = useState("");
  const [password, setPassword] = useState("");

  const defaultObjectValidInput = {
    isValidInput:true,
    isValidPassword:true
  }
  const [objectValidInput, setObjectValidInput] = useState(defaultObjectValidInput)
  const handleLogin = async () => {
        setObjectValidInput(defaultObjectValidInput)
        if (!valLogin) {
            setObjectValidInput({...defaultObjectValidInput, isValidInput:false})
            toast.error("enter email address or phone number")
            return
        } 
        if (!password) {
            setObjectValidInput({...defaultObjectValidInput, isValidPassword:false})
            toast.error("enter password")
            return
        } 

        let response = await loginUser(valLogin, password)
        if (response && response.data && +response.data.EC === 0) {
            let data = {
                isAuthenticated:true,
                token: "fake token"
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            //success
            window.location.href="/users"

        }
        if (response && response.data && +response.data.EC !== 0) {
            //success
            toast.error(response.data.EM)
        }
  }
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-sm-7 d-none d-sm-block">
            <div className="brand">Lan</div>
            <div className="detail">Reactjs for life</div>
          </div>
          <div className="content-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3 mg-sm-0 mg-3">
            <div className="brand d-sm-none d-block text-center">Lan</div>
            <input
              type="text"
              className= {objectValidInput.isValidInput? "form-control" : "form-control is-invalid"} 
              placeholder="Email or phone number"
              value={valLogin}
              onChange={(event) => {setValLogin(event.target.value)}}
            />
            <input
              type="password"
              className= {objectValidInput.isValidPassword? "form-control" : "form-control is-invalid"} 
              placeholder="Password"
              value={password}
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <button className="btn btn-primary btn-lg" onClick={handleLogin}>Login</button>
            <span className="text-center">
              <a href="#" className="forget-password">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={handleCreateNewAccount}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
