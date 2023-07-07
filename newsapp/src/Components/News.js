import React, { useEffect, useState } from "react";
import Newsitem from "./NewsItem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //document.title=  this.capitalizeFirstLetter(`${this.props.category}-NewsMonkey`);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /*constructor(props) {
    super(props);
    console.log("hlw i'm constructor");
    
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    };
    document.title=  this.capitalizeFirstLetter(`${this.props.category}-NewsMonkey`);
  }
*/
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  /*async componentDidMount() {
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c32592c8e14040fbad506e4b0b3b947f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.updateNews();
  }*/

  const fetchMoreData = async () => {
    
    //this.setState({page:this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${ props.country}&category=${
      props.category}&apiKey=c32592c8e14040fbad506e4b0b3b947f&page=${ page + 1
}&pageSize=${props.pageSize}`;
setPage(page + 1);

    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);

    /*this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
      
    });*/
  };

  const onClickPrevious = async () => {
    /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c32592c8e14040fbad506e4b0b3b947f&page=${
      this.state.page - 1
    } &pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading:false
    });*/
    setPage(page - 1);
    //this.setState({ page: this.state.page - 1 });
    updateNews();
  };

 const onClickNext = async () => {
    /* if (!(this.state.page+1> Math.ceil(this.state.totalResults /this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c32592c8e14040fbad506e4b0b3b947f&page=${
        this.state.page + 1
      } &pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading:false
      });
    } */
    setPage(page + 1);
    //this.setState({ page: this.state.page + 1 });

    updateNews();
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop:'90px' }}>
        NewsMonkey-Daily Headline From{" "}
        {capitalizeFirstLetter(`${props.category}-Category`)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        style={{ overflow: "hidden" }}
      >
        <div className="container">
          <div className="row">
            {articles &&
              /*!this.state.loading &&*/
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      tittle={element.title ? element.title.slice(0, 45) : " "}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : " "
                      }
                      url={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.onClickPrevious}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.onClickNext}
          >
            Next &rarr;
          </button>
          </div>*/}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
