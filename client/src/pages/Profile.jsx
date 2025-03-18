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
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorImage, setErrorImage] = useState(null);

  const handleImageUpload = async (images) => {
    setUploadingImage(true);
    const formData = new FormData();

    try {
      formData.append("file", images[0]);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDIANRY_UPLOAD_PRSEST
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
    } catch (error) {
      setUploadingImage(false);
      setErrorImage(error);
      console.log(error, "Uploading failed");
    }
  };

  return (
    <div className="h-[93vh] flex flex-col items-center justify-center">
      <form className="flex max-w-md w-full flex-col gap-4">
        <Label
          htmlFor="dropzone-file"
          className="relative w-fit mx-auto cursor-pointer"
        >
          <Avatar
            img={image ?? currentUser.avatar}
            alt={currentUser.username}
            size="lg"
            rounded
          />
          <div className="absolute -bottom-3 w-[40px] h-[40px] rounded-full bg-slate-900 flex items-center justify-center">
            <RiImageCircleFill size={25} color="white" />
            <FileInput
              id="dropzone-file"
              className="hidden"
              accept="image/*"
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
          <TextInput id="username" type="email" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput id="password" type="password" />
        </div>
        <Button type="submit">Update</Button>
      </form>
      <div className="flex justify-between max-w-md w-full  mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
