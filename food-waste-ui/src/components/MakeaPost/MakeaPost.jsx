import * as React from "react";
import { FileUploader, FileCard, TextInputField, Button } from "evergreen-ui"; //FILEPICKER TODO or use stream
import "./MakeaPost.css";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
("use strict");

function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default function MakeaPost({ currentUser }) {
  const productName = useRef();
  const productDescription = useRef();
  const productQuantity = useRef();

  const [file, setFile] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false); //TODO fix into loading state and display success message with link to market or make a new post which refreshes page
  const acceptedContent = ["image/png", "image/jpeg"];
  const [success, setSuccess] = React.useState(false);
  const [fileRejections, setFileRejections] = React.useState([]);
  const handleChange = React.useCallback((file) => setFile([file[0]]), []);
  const handleRejected = React.useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = React.useCallback(() => {
    setFile([]);
    setFileRejections([]);
  }, []);

  const URL = "http://localhost:3001";

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const addProduct = async () => {
      try {
        //Get array buffer from file
        const arrayBuffer = await file[0].arrayBuffer();

        //Convert the array to a base64 string
        const base64String = _arrayBufferToBase64(arrayBuffer);

        const res = await axios.post(`${URL}/makeapost`, {
          userId: currentUser.userId,
          name: productName.current.value,
          description: productDescription.current.value,
          quantity: productQuantity.current.value,
          file: base64String,
        });
      } catch (error) {
        alert(error);
      }
    };
    addProduct();
    setSuccess(true);
  };

  return (
    <div className="form-container">
      <h1>Post Your Extra Items</h1>
      <form onSubmit={handleOnSubmit}>
        <TextInputField
          className="name"
          placeholder="Name of Item"
          label="Name of Product"
          ref={productName}
          validationMessage="This field is required"
        ></TextInputField>

        <FileUploader
          label="Upload Image of Product"
          maxFiles={1}
          maxSizeInBytes={50000}
          acceptedMimeTypes={acceptedContent}
          validationMessage="This field is required"
          onChange={handleChange}
          onRejected={handleRejected}
          renderFile={(file) => {
            const { name, size, type } = file;
            const fileRejection = fileRejections.find(
              (fileRejection) => fileRejection.file === file
            );
            const { message } = fileRejection || {};
            return (
              <FileCard
                key={name}
                isInvalid={fileRejection != null}
                name={name}
                onRemove={handleRemove}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
              />
            );
          }}
          values={file}
        ></FileUploader>
        <input
          type="number"
          className="quantity"
          placeholder="How much?"
          label="Quantity"
          ref={productQuantity}
          validationMessage="This field is required"
        ></input>
        <TextInputField
          className="description"
          placeholder="Description of Product"
          label="Description"
          ref={productDescription}
          validationMessage="This field is required"
        ></TextInputField>

        {/* <TextInputField
          className="expiration"
          placeholder="Expiration Date"
          label="Expiration Date"
          validationMessage="This field is required"
        ></TextInputField> */}
        {isLoading ? (
          <Button disabled type="submit" appearance="default">
            Submit
          </Button>
        ) : (
          <Button type="submit" appearance="default">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
