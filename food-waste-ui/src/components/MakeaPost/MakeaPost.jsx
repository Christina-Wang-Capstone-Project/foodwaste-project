import * as React from "react";
import { FormField, FileUploader, TextInputField, Button } from "evergreen-ui";
import "./MakeaPost.css";

export default function MakeaPost(setAllProducts) {
  const productName = React.createRef();
  const productDescription = React.createRef();
  const URL = "http://localhost:3001";

  const handleOnSubmit = (event) => {
    //setAllProducts([]);
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <h1>Make a Post</h1>
      <FormField onSubmit={handleOnSubmit}>
        <TextInputField
          className="name"
          placeholder="Name of Item"
          label="Name of Product"
          validationMessage="This field is required"
        ></TextInputField>
        {/* <FileUploader
          label="Image of Product"
          validationMessage="This field is required"
        ></FileUploader> */}
        <TextInputField
          className="description"
          placeholder="Description of Product"
          label="Description"
          validationMessage="This field is required"
        ></TextInputField>
        {/* <TextInputField
          className="expiration"
          placeholder="Expiration Date"
          label="Expiration Date"
          validationMessage="This field is required"
        ></TextInputField> */}
      </FormField>
      <Button> Submit</Button>
    </div>
  );
}
