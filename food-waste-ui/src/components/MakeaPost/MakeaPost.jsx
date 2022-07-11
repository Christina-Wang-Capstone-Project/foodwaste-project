import * as React from "react";
import { FileUploader, TextInputField, Button } from "evergreen-ui";
import "./MakeaPost.css";
import axios from "axios";

export default function MakeaPost(currentUser) {
  const productName = React.createRef();
  const productDescription = React.createRef();
  const [allProducts, setAllProducts] = React.useState([]);

  const URL = "http://localhost:3001";

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("form is submitted");
    const addProduct = async () => {
      try {
        console.log("adding product");
        const res = await axios.post(`${URL}/makeapost`, {
          userId: currentUser.userId,
          productName: productName.current.value,
          productDescription: productDescription.current.value,
        });
        setAllProducts([res.data.products].concat(allProducts));
        console.log("allProducts", allProducts);
      } catch (error) {
        alert(error);
      }
    };
    addProduct();
  };

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
        {/* <FileUploader
          label="Image of Product"
          validationMessage="This field is required"
        ></FileUploader> */}
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
