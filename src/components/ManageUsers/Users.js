import { useEffect } from "react"
import Navigate from "../Nav/Nav"

const Users = (props) => {
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            window.location.href = "/login";
        }
    }, [])
    return (
        <div>
            <Navigate></Navigate>
            asdf
        </div>
    )
}

export default Users