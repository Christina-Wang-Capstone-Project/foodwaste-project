import * as React from "react";
import { FileUploader, FileCard, TextInputField, Button } from "evergreen-ui";
import "./MakeaPost.css";
import axios from "axios";
import { useEffect } from "react";

function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default function MakeaPost({
  currentUser,
  allProducts,
  setAllProducts,
}) {
  const productName = React.createRef();
  const productDescription = React.createRef();
  const [file, setFile] = React.useState();
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
    const addProduct = async () => {
      try {
        //Get array buffer from file
        //TODO CHECK IF FILE IS IMAGE (?)
        const arrayBuffer = await file[0].arrayBuffer();

        //Convert the array to a base64 string
        const base64String = _arrayBufferToBase64(arrayBuffer);

        const res = await axios.post(`${URL}/makeapost`, {
          userId: currentUser.userId,
          productName: productName.current.value,
          productDescription: productDescription.current.value,
          file: base64String,
        });
        setAllProducts([res.data.products].concat(allProducts));
      } catch (error) {
        alert(error);
      }
    };
    addProduct();
  };
  console.log("allProducts", allProducts);

  return (
    <div className="form-container">
      <h1>Make a Post</h1>
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

        <Button type="submit" appearance="default">
          Submit
        </Button>
      </form>
    </div>
  );
}
