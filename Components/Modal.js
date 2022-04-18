import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../ATOMS/modalAtom";
import { Transition, Dialog } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";

function Modal() {
  const [open, setOpen] = useRecoilState(modalState);

  const [loading, setLoading] = useState(null);
  //For rapid click handling

  //User
  const { data: session } = useSession();

  //Selected File
  const [selectedFile, setSelectedFile] = useState(null);

  //File Picker Ref
  const filePickerRef = useRef(null);

  //Caption Ref
  const captionRef = useRef(null);

  //Upload Post
  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    //Create a Post and add to Firestore (Post collection)
    const docRef = await addDoc(collection(db, `posts`), {
      username: session?.user.username,
      caption: captionRef.current.value,
      profileImg: session?.user.image,
      timestamp: serverTimestamp(),
    });

    //We get Post Id after that

    //Upload to Storage with Post ID
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    //Get Download URL from Storage and update Post
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        //Update Doc.
        await updateDoc(doc(db, `posts`, docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (event) => {
    const Reader = new FileReader();
    if (event.target.files[0]) {
      //Get the file user selected
      Reader.readAsDataURL(event.target.files[0]);
    }

    Reader.onload = (readerEvent) => {
      //Trigger onload once browser done reading the file
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Content */}
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></Dialog.Overlay>
          </Transition.Child>

          {/* Centering Model Content */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
            &#8203;
          </span>

          {/* Another Transition Child */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:align-middle">
              {/* Content */}
              <div>
                {selectedFile ? (
                  <img
                    className="w-full cursor-pointer object-contain"
                    alt=""
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                  ></img>
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
                  >
                    <CameraIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    ></CameraIcon>
                  </div>
                )}
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addImageToPost}
                      ></input>
                    </div>
                  </div>

                  <div className="mt-2">
                    <input
                      className="w-full border-none text-center focus:ring-0"
                      type="text"
                      ref={captionRef}
                      placeholder="Please enter a caption..."
                    ></input>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-5 sm:mt-6">
                  <button
                    disabled={!selectedFile}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
