import * as React from "react";
import {
  FileUploader,
  FileCard,
  TextInputField,
  Button,
  Alert,
} from "evergreen-ui";
import "./MakeaPost.css";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import Loading from "../Loading/Loading";
import "react-datepicker/dist/react-datepicker.css";
import { toaster } from "evergreen-ui";

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

export default function MakeaPost({ currentUser, getLocation, coordinates }) {
  const productName = useRef();
  const productDescription = useRef();
  const productQuantity = useRef();
  const [expDate, setExpDate] = React.useState(new Date());
  const [file, setFile] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
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

  const handleDateChange = (date) => {
    setExpDate(date);
  };

  const URL = "http://localhost:3001";

  useEffect(() => {
    getLocation();
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const addProduct = async () => {
      try {
        //Gets array buffer from file
        const itemImageArrayBuffer = await file[0].arrayBuffer();

        //Converts the array to a base64 string
        const imageInBase64 = _arrayBufferToBase64(itemImageArrayBuffer);

        const res = await axios.post(`${URL}/makeapost`, {
          userId: currentUser.userId,
          name: productName.current.value,
          description: productDescription.current.value,
          quantity: productQuantity.current.value,
          file: imageInBase64,
          location: coordinates,
          date: expDate,
          basket: [],
          placedOnHoldBy: [],
        });
        toaster.success("Successfully made a post!");
        setSuccess(true);
      } catch (error) {
        toaster.warning("Error: Could not make a post. Please try again");
      }
    };
    addProduct();
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="form-container">
      <div className="post-title">Post Your Extra Items</div>
      <form onSubmit={handleOnSubmit}>
        <TextInputField
          className="name"
          placeholder="Name of Item"
          label="Name of Product"
          ref={productName}
        ></TextInputField>

        <FileUploader
          label="Upload Image of Product"
          maxFiles={1}
          maxSizeInBytes={50000}
          acceptedMimeTypes={acceptedContent}
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
        <div className="quantity-container">
          Quantity
          <input
            type="number"
            className="quantity"
            placeholder="How much?"
            label="Quantity"
            min="1"
            ref={productQuantity}
          ></input>
        </div>
        <TextInputField
          className="description"
          placeholder="Description of Product"
          label="Description"
          ref={productDescription}
        ></TextInputField>
        <div className="expiration-container">
          <div className="expiration-title">Expiration Date</div>
          <DatePicker
            onChange={handleDateChange}
            expDate={expDate}
            selected={expDate}
          ></DatePicker>
        </div>
        {success ? (
          <>
            <Button disabled type="submit" appearance="default">
              Submit
            </Button>
          </>
        ) : (
          <Button type="submit" appearance="default">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
