import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          {/* Username Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Choose a Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="relative">
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <div className="relative w-full">
              <input
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10 pr-10"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-white hover:text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input with Eye Icon */}
          <div className="relative">
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <div className="relative w-full">
              <input
                type={confirmPasswordShown ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10 pr-10"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordShown ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Gender Checkbox */}
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          {/* Login Link */}
          <Link to={"/login"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account?
          </Link>

          {/* Submit Button */}
          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
