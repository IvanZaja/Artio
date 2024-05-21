import { Button, Image } from '@nextui-org/react'
import { useRef, useState } from 'react';

function DragAndDropCover() {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
  
    function handleChange(e) {
      e.preventDefault();
      console.log("File has been added");
      if (e.target.files && e.target.files[0]) {
        console.log(e.target.files);
        for (let i = 0; i < e.target.files["length"]; i++) {
          setFiles((prevState) => [...prevState, e.target.files[i]]);
        }
      }
      const file = event.target.files[0];
      if (!file) {
        setPreviewUrl(null);
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  
    function handleSubmitFile(e) {
      if (files.length === 0) {
        // no file has been submitted
      } else {
        // write submit logic here
      }
    }
  
    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
          setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
        }
      }
    }
  
    function handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    }
  
    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    }
  
    function handleDragEnter(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    }
  
    function removeFile(fileName, idx) {
      const newArr = [...files];
      newArr.splice(idx, 1);
      setFiles([]);
      setFiles(newArr);
    }
  
    function openFileExplorer() {
      inputRef.current.value = "";
      inputRef.current.click();
    }

  return (
    <div className="flex flex-col items-center w-full ">
        <div
          onChange={handleChange}
          onClick={openFileExplorer}
          onDragEnter={handleDragEnter}
          onSubmit={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver} className={previewUrl ? 'hidden' : "flex w-full rounded-xl h-80 border-2 border-dashed border-gray-400 flex-col items-center justify-center "}>
          <UploadCloudIcon className="h-20 w-20 text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400 text-center">Drag & Drop the<br/>cover image or<br/>click here.</p>
        </div>
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={handleChange}
          accept="image/*"
        />
      <div className="w-full flex items-center justify-center">
        {files.map((file, idx) => (
          <div key={idx} className="flex flex-col items-center">
          {previewUrl && <Image src={previewUrl} className='flex w-full rounded-xl h-80 object-cover border-2 border-dashed border-gray-400' alt="Preview" />}
            <Button
              variant='bordered'
              className="text-red-500 cursor-pointer mt-5 rounded-full transition ease-in-out hover:shadow-lg hover:bg-red-500 hover:text-white hover:scale-105 duration-200"
              onClick={() => {
                removeFile(file.name, idx)
                setPreviewUrl('')
                }}
            >
             Delete image
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function UploadCloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>)}

export default DragAndDropCover