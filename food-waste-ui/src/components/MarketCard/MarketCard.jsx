export default function MarketCard(product) {
  return (
    <div className="product-card">
      <div className="image">
        {/* TODO: image file upload with link to image*/}
      </div>
      <div className="product-name">{product.productName}</div>
      <div className="product-description">{product.productDescription}</div>
    </div>
  );
}
