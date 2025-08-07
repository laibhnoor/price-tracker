// src/components/auth/ImageUploader.jsx

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onFileAccepted }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      // Pass the file object up to the parent form
      onFileAccepted(file);
      // Create a URL for previewing the image
      setPreview(URL.createObjectURL(file));
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': []
    },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className="image-uploader">
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Profile preview" className="image-preview" />
      ) : (
        <div className="uploader-text">
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>Drag 'n' drop a profile picture here, or click to select</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;