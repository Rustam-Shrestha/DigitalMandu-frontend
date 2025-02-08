import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/authSlice";
import { STATUSES } from "../../../globals/miscellanouous/statuses";
import { useNavigate } from "react-router-dom";

// import Form from "../../../globals/components/forms/form"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //retriving token data from auth slice
    const { token, status, data } = useSelector((state) => state.auth);

    //.repo for storing email and password for login
    const [userData, setUserData] = useState({
        userEmail: "",
        userPassword: "",
    })
    //on change or any change in input handle it
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }
    //on submit of form handle it
    const handleOnSubmit = (e) => {
        //stop page refresh
        e.preventDefault();
        console.log(userData)
        //dispatching loginUser action by giving it userData for logging in
        dispatch(loginUser(userData));
            // navigate("/");
        window.location.href = "/"
        if (status === STATUSES.ERROR) {
            alert("an error occured")
            return;
        }

    }
    return (
        <div className="flex items-center justify-center h-screen overflow-hidden bg-yellow-50">
            <div className="mt-20 bg-white w-17/12 lg:w-5/12 md:6/12 shadow-3xl ">

                <div className="absolute p-4 transform -translate-x-1/2 -translate-y-1/2 bg-orange-900   rounded-full left-1/2 md:p-2">
                    <span className="text-white text-lg font-bold">
                        <img src="src\assets\digitalManduLogo.png" alt="mandu logo" width="80" height="80" />
                    </span>
                </div>
                <form className="p-3 md:p-10" onSubmit={handleOnSubmit}>
                    <div className="flex items-center mb-6 text-lg md:mb-8">
                        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                            <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                        </svg>
                        <input type="text" id="userEmail" name="userEmail" onChange={handleChange} className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none" placeholder="Email" />
                    </div>
                    <div className="flex items-center mb-6 text-lg md:mb-8">
                        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                        </svg>
                        <input type="password" id="password" name="userPassword" onChange={handleChange} className="w-full py-2 pl-12 bg-gray-200 md:py-4 focus:outline-none" placeholder="Password" />
                    </div>
                    <button className="w-full p-2 font-medium text-white uppercase bg-gradient-to-b from-orange-700 to-orange-900 md:p-4">Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login