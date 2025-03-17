import { Avatar, Button, FileInput, Label, TextInput } from "flowbite-react";
import { useRef } from "react";
import { RiImageCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();

  return (
    <div className="h-[93vh] flex flex-col items-center justify-center">
      <form className="flex max-w-md w-full flex-col gap-4">
        <Label
          htmlFor="dropzone-file"
          className="relative w-fit mx-auto  cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          <Avatar
            img={currentUser.avatar}
            alt={currentUser.username}
            size="lg"
            rounded
          />
          <Label className="absolute -bottom-3 w-[40px] h-[40px] rounded-full bg-slate-900 flex items-center justify-center">
            <RiImageCircleFill size={25} color="white" />
            <FileInput
              id="dropzone-file"
              className="hidden"
              ref={fileRef}
              accept="image/*"
            />
          </Label>
        </Label>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="text" value="Your username" />
          </div>
          <TextInput id="username" type="email" value={currentUser.username} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput id="email" type="email" value={currentUser.email} />
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
