import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 12,
        category: "general"
    }

    // in capital PropTypes it is imported from prop-types
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("constructor from news component ");
        this.state = {
            articles: [],
            loading: true,
            page: 1, 
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFews`;
    }


    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9265ad73a5149459a67f4a380f7088d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        this.props.setProgress(30);
        let parsedData = await data.json();

        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({ loading: false });
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        })
        this.props.setProgress(100);
    }

    // This will run after the render method 
    async componentDidMount() {
        // let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9265ad73a5149459a67f4a380f7088d&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // // yhaa p hum apne fetched data ko articles array k andr le rhe honge 
        // this.setState({loading:false});
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        // })
        this.updateNews();
    }

    fetchMoreData = async () => { 
        this.setState({
            page: this.state.page+1,
        })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9265ad73a5149459a67f4a380f7088d&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData); 
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };

    handlePrevClick = async () => {

        // let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9265ad73a5149459a67f4a380f7088d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({loading:false});
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        // })

        this.setState({
            page: this.state.page - 1,
        })
        //to reuse the code we will be writing the fnction for this and then calling it after updating the page
        this.updateNews();
    }

    handleNextClick = async () => {

        // if(!(this.state.page+1 >= Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9265ad73a5149459a67f4a380f7088d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({loading:false}); 
        //     this.setState({
        //         page: this.state.page+1,
        //         articles: parsedData.articles,
        //     })
        // }

        this.setState({
            page: this.state.page + 1,
        })
        this.updateNews();
    }

    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0px' }}>News Fews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

                {this.state.loading && <Spinner/>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                    <div className="row">
                        {/* yhaan element hi likha tha phle jis se console me error dera tha to frr isko change kra or map kra index se  */}
                        {this.state.articles.map((element, index) => {
                            return <div className="col-md-4" key={index}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>

                    <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div> */}
            </>
        )
    }
}

export default News