import * as React from "react";
import MarketCard from "../MarketCard/MarketCard";
import "./MyPosts.css";

("use strict");

export default function MyPosts({ myProducts }) {
  return (
    <>
      <div className="my-posts-wrapper">
        <div className="message">My Posts</div>
        {myProducts.length != 0 ? (
          <div className="my-posts-container">
            {myProducts.map((item) => {
              return <MarketCard product={item} key={item.objectId} />;
            })}
          </div>
        ) : (
          <div className="no-products">
            You have not made any posts yet. Make a post to start sharing with
            your friends!
          </div>
        )}
      </div>
    </>
  );
}
