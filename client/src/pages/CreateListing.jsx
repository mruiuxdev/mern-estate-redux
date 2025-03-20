import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";

export default function CreateListing() {
  return (
    <div className="p-4 mt-5 flex flex-col items-center justify-center">
      <form className="flex max-w-md w-full flex-col gap-4">
        <h1 className="mb-2 text-2xl font-bold text-center">Sign In</h1>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="name"
            maxLength={60}
            minLength={10}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea id="description" rows={4} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="address" value="Address" />
          </div>
          <TextInput id="address" type="text" required />
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <Checkbox id="sell" />
            <Label className="cursor-pointer" htmlFor="sell">
              Sell
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="parking" />
            <Label className="cursor-pointer" htmlFor="parking">
              Parking Spot
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="rent" />
            <Label className="cursor-pointer" htmlFor="rent">
              Rent
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="furnished" />
            <Label className="cursor-pointer" htmlFor="furnished">
              Furnished
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="offer" />
            <Label className="cursor-pointer" htmlFor="offer">
              Offer
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TextInput type="number" min={1} max={10} id="beds" />
              <Label htmlFor="beds">Beds</Label>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TextInput type="number" min={1} max={10} id="paths" />
              <Label htmlFor="paths">Baths</Label>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TextInput type="number" min={1} max={10} id="regularPrice" />
              <Label htmlFor="regularPrice">
                Regular Price <br /> <sub>($/Month)</sub>
              </Label>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <TextInput type="number" min={1} max={10} id="discountPrice" />
              <Label htmlFor="discountPrice">
                Discount Price <br /> <sub>($/Month)</sub>
              </Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-2">
          <Label className="font-normal">
            <span className="font-semibold">Images:</span> The first image will
            be the cover (max 6)
          </Label>
          <Label
            htmlFor="dropzone-file"
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <FileInput
              multiple
              accept="images/*"
              id="dropzone-file"
              className="hidden"
            />
          </Label>
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
