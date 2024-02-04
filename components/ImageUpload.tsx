import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadInterface {
  value: string;
  disable: boolean;
  onChange: (image: string) => void;
  label: string;
}

const ImageUpload: React.FC<ImageUploadInterface> = ({
  value,
  onChange,
  disable,
  label,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [base64]
  );

  const handleDrop = useCallback((files: any) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled: disable,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  console.log({ base64 });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted cursor-pointer",
      })}>
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height={100} width={100} alt="Upload image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
