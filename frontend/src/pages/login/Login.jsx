import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  function togglePasswordVisibility() {
    setPasswordShown(!passwordShown);
  }

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login <span className='text-blue-500'>ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full input input-bordered h-10'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input with Eye Icon Inside */}
          <div className="relative">
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <div className="relative w-full">
              <input
                type={passwordShown ? "text" : "password"}
                placeholder='Enter Password'
                className='w-full input input-bordered h-10 pr-10' // pr-10 to make space for the icon
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Eye icon inside input field */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-white hover:text-gray-700" // Remove bg and style the icon
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
