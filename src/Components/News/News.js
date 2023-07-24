import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "../Spinner/Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitlizeText(props.category)}-TneWs`;

  const capitlizeText = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39133144b1554a91a8bb5dad957c80e0&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(70);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39133144b1554a91a8bb5dad957c80e0&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <>
      <h1 className="text-center mt-5">
        T-neWs - Top headlines on{" "}
        <span className="headlines">
          {(document.title = `${capitlizeText(props.category)}`)}
        </span>
      </h1>{" "}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row sm-1 md-2 lg-4 ">
            {loading && <Spinner />}
            {articles.map((ele) => {
              return (
                <div
                  className="col mt-5 d-flex justify-content-center "
                  key={ele.url}
                >
                  <NewsItem
                    title={ele.title ? ele.title.slice(0, 30) : ""}
                    description={
                      ele.description ? ele.description.slice(0, 80) : ""
                    }
                    imageUrl={ele.urlToImage ? ele.urlToImage : ""}
                    newUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                    src={ele.source.name.slice(0, 10)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* button div  */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
