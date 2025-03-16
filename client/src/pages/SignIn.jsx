import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="h-[93vh] flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md w-full flex-col gap-4"
      >
        <h1 className="mb-2 text-2xl font-bold text-center">Sign In</h1>
        {error && (
          <Alert color="failure">
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" onChange={handleChange} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" onChange={handleChange} />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? "Signing in" : "Sign in"}
        </Button>
      </form>
      <div className="flex flex-col mt-4 max-w-md w-full">
        <OAuth />
        <p className="text-center text-sm font-normal mt-2">
          Don't have an account?{" "}
          <span className="font-medium">
            <Link to="/sign-up" className="text-primary underline">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
