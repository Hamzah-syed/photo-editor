import React, { useEffect } from "react";

const UploadImage = ({
  preview,
  setPreview,
  selectedFile,
  setSelectedFile,
}) => {
  console.log(setSelectedFile);
  console.log(preview);
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, setPreview]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div>
      <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> Custom Upload
      </label>
      <input type="file" id="file-upload" onChange={onSelectFile} />
    </div>
  );
};

export default UploadImage;
