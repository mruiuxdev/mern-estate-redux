import {
  Alert,
  Avatar,
  Button,
  FileInput,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { RiImageCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserInSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserInSuccess,
  updateUserFailure,
  updateUserInSuccess,
  updateUserStart,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorImage, setErrorImage] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    avatar: currentUser.avatar,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageUpload = async (images) => {
    setUploadingImage(true);
    const formData = new FormData();

    try {
      formData.append("file", images[0]);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploadingImage(false);
      setImage(data.secure_url);
      setFormData({ ...formData, avatar: data.secure_url });
    } catch (error) {
      setUploadingImage(false);
      setErrorImage(error);
      console.log(error, "Uploading failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserInSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserInSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserInSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="h-[93vh] flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md w-full flex-col gap-4"
      >
        {error ? (
          <Alert color="failure" className="mt-20">
            <span className="font-medium">{error}</span>
          </Alert>
        ) : (
          ""
        )}
        <Label
          htmlFor="image"
          className="relative w-fit mx-auto cursor-pointer"
        >
          <Avatar
            img={image || currentUser.avatar}
            alt={currentUser.username}
            size="lg"
            rounded
          />
          <div className="absolute -bottom-3 w-[40px] h-[40px] rounded-full bg-slate-900 flex items-center justify-center">
            <RiImageCircleFill size={25} color="white" />
            <FileInput
              id="image"
              className="hidden"
              accept="image/*"
              name="image"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
          </div>
        </Label>
        {uploadingImage && (
          <Alert color="info" className="w-fit mx-auto mt-2">
            <div className=" flex space-x-2 items-center">
              <Spinner aria-label="Default status example" />
              <span className="font-medium">Updating Profile</span>
            </div>
          </Alert>
        )}
        {errorImage && (
          <Alert
            color="failure"
            className="w-fit mx-auto mt-2"
            icon={HiInformationCircle}
          >
            <div className=" flex space-x-2 items-center">
              <span className="font-medium">{errorImage}</span>
            </div>
          </Alert>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="text" value="Your username" />
          </div>
          <TextInput
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? "Updating" : "Update"}
        </Button>
      </form>
      <div className="flex justify-between max-w-md w-full  mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteAccount}
        >
          {loading ? "Deleting" : "Delete account"}{" "}
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          {" "}
          {loading ? "Signing out" : "Sign out"}{" "}
        </span>
      </div>
    </div>
  );
}
