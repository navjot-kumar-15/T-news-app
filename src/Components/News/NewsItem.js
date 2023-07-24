import React from "react";
import "./NewsItem.css";

const NewsItem = (props) => {
  let { title, description, imageUrl, newUrl, author, date, src } = props;
  return (
    <div>
      <div
        className="card mt-5  my-5 sm-1 md-2 lg-4  "
        // style={{ width: "18rem", height: "60vh", margin: "2.2rem" }}
        style={{ width: "18rem" }}
      >
        <img
          src={
            !imageUrl
              ? "https://images.livemint.com/img/2023/01/09/600x338/trading_1673224345886_1673224345886.jpg"
              : imageUrl
          }
          className="card-img-top img_size"
          alt="img"
        />
        <div className="card-body ">
          <h5 className="card-title " style={{ lineHeight: "1.9rem" }}>
            {title}
            <span className="position-absolute top-0    start-100  translate-middle badge rounded-pill bg-primary tag">
              {src}
              <span className="visually-hidden">unread messages</span>
            </span>
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-danger">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newUrl}
            className="btn btn-sm btn-primary btn-dark btn-hover"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
