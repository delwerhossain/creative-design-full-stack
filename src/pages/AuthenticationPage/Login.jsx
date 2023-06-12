import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { userInsert } from "./commonAuth";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  // context api
  const { signIn, googleSignIn, gitSignIn } = useAuth();
  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // location
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  // state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        setSuccess("login success");
        setError("");
        userInsert(
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        );
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });
  };

  const handleGooglePopup = () => {
    return googleSignIn()
      .then((result) => {
        setError("");
        setSuccess("login success - Google");
        userInsert(
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        );
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;

        setError(errorMessage);
        setSuccess("");
      });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, []);

  return loading ? (
    <div className="grid justify-center items-center">
      <Loading></Loading>
    </div>
  ) : (
    <div className="hero min-h-screen bg-white">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img
            loading="lazy"
            src="https://i.ibb.co/T1JLD7q/vecteezy-smartphone-app-layout.jpg"
            alt=""
          />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body text-primary">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
              <input
                required
                type="email"
                name="email"
                placeholder="email"
                className={`input input-bordered mb-4 w-full${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}

              <input
                required
                type="password"
                name="password"
                placeholder="password"
                className={`input input-bordered mb-4 w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>

              <div className="divider">OR</div>

              <div className="mt-4 flex gap-x-2">
                <a
                  onClick={handleGooglePopup}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-600 p-2 hover:bg-orange-300 focus:ring-2 focus:ring-violet-600 focus:ring-offset-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </a>
              </div>
            </form>

            <p className="text-2xl text-red-600">{error}</p>
            <p className="text-2xl text-teal-600">{success}</p>
            <p className="my-4 font-semibold text-center">
              You are New -
              <Link className="text-orange-600 font-bold" to="/register">
                Sign Up
              </Link>
            </p>
            <p className="font-semibold underline text-secondary text-center">
              <Link to={"/"}> Home page</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
