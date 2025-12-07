import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/title.png";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  loginAsync,
  registerAsync,
  selectAuth,
} from "../../store/slices/authSlice";
import { projectCreateAsync } from "../../store/slices/parameterSlice";

export function Login() {
  const dispatch = useAppDispatch();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const navigate = useNavigate();
  const { error } = useAppSelector(selectAuth);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    passwordConf: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const toggleTab = (isLogin: boolean) => {
    setIsLoginTab(isLogin);
    if (isLogin) {
      setRegisterData({ email: "", password: "", passwordConf: "" });
    } else {
      setLoginData({ email: "", password: "" });
    }
  };

  const handleLoginSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const { email, password } = loginData;

    // const defaultProject = {
    //   title: "Base Project - EA1 - 1301 - Fleet (NatG)",
    //   description: "",
    //   clone_id: 135,
    // };

    if (!email.toString().toLowerCase().includes("@natpower.com")) {
      toast.error("Email should contain '@natpower.com'");
      return;
    }

    if (email === "" || password === "") {
      toast.error("Email and Password are required fields!");
    } else {
      dispatch(loginAsync({ email, password }))
        .unwrap()
        .then(() => {
          navigate("/my_projects");
          // dispatch(projectCreateAsync(defaultProject))
          // .unwrap()
          // .then(() => {
          //   console.log("Default project created!");
          // })
          // .catch((e) => {
          //   console.log("Base project create error!");
          //   console.log("error", e);
          // });
          window.location.reload();
        })
        .catch(() => { });
    }
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const { email, password, passwordConf } = registerData;

    if (password.length < 8) {
      toast.error("Password length should be more than 8 characters!");
      return;
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      toast.error(
        "Invalid password! Password must contain uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== passwordConf) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(registerAsync({ email, password, passwordConf }))
      .unwrap()
      .then(() => {
        navigate("/login");
        window.location.reload();
      })
      .catch(() => { });
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-1/2 bg-[#1f2937] flex flex-col justify-center items-center text-white">
          <img src={Logo} alt="Logo" className="w-96 h-24 mb-4" />
        </div>
        <div className="w-1/2 flex justify-center items-center bg-gray-100">
          <div className="bg-white shadow-lg p-8 rounded-lg w-[360px]">
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 border-b-2 ${isLoginTab
                    ? "bg-[#1f2937] text-white rounded-tl-lg"
                    : "bg-gray-100 text-gray-500"
                  }`}
                onClick={() => toggleTab(true)}
              >
                Log In
              </button>
              <button
                className={`flex-1 py-2 border-b-2 ${!isLoginTab
                    ? "bg-[#1f2937] text-white rounded-tr-lg"
                    : "bg-gray-100 text-gray-500"
                  }`}
                onClick={() => toggleTab(false)}
              >
                Register
              </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {isLoginTab ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="name@NatPower.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Remember Me
                  </label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-blue-500"
                  >
                    Forgot password
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  Log In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="passwordConf"
                    value={registerData.passwordConf}
                    onChange={handleRegisterChange}
                    placeholder="Repeat Password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  Sign Up
                </button>

                <div className="mt-4 text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={() => toggleTab(true)}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
