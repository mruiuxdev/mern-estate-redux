import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="h-[93vh] flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md w-full flex-col gap-4"
      >
        <h1 className="mb-2 text-2xl font-bold text-center">Sign Up</h1>
        {error && (
          <Alert color="failure">
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput id="username" type="text" onChange={handleChange} />
        </div>
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
          {loading ? "Signing up" : "Sign up"}
        </Button>
        <OAuth />
        <p className="text-center text-sm font-normal">
          Already have an account?{" "}
          <span className="font-medium">
            <Link to="/sign-in" className="text-primary underline">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
