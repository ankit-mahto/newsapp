import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'



export class News extends Component {

      static defaultProps ={
        country: 'us',
        pageSize: 5 ,
        category : 'general'
      }

      static propTypes ={
        country: PropTypes.string,
        pageSize:  PropTypes.number,
        category: PropTypes.string
      }
      capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props);
        console.log("Hello I am a constructor from News component");
        this.state ={
            articles: [],
            loading: false,
          page: 1 }
          document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
          this.props.setProgress(0);
        }

        async componentDidMount() {
          // console.log("cdm");
          this.props.setProgress(30);
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          this.props.setProgress(50);
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData); 
          this.setState({articles: parsedData.articles,
                        totalResults: parsedData.totalResults,
                        loading:false})
                        this.props.setProgress(100);
        }

        handlePrevClick = async()=>{
          console.log("next")
          this.props.setProgress(30);
          let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true})
          this.props.setProgress(50);
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData); 
          this.setState({articles: parsedData.articles,
            page:this.state.page-1,
            loading:false})
            this.props.setProgress(100);
        }

        handleNextClick = async ()=>{
          console.log("next")
          this.props.setProgress(30);
         let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
         this.setState({loading:true})
         this.props.setProgress(50);
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData); 
          this.setState({articles: parsedData.articles,
            page:this.state.page+1,
            loading:false
          })
          this.props.setProgress(100);

        }

  render() {
    return (
      <div className="container my-4">
        <h2 className='text-center' style={{marginTop:'90px', marginBottom:'20px'}}>News Headlines of {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):"click on read more"} imageUrl = {element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url} author ={element.author} date = {element.publishedAt} source={element.source.name}/>
          </div>
          })}
        </div>
        <div className="contianer my-3 d-flex justify-content-between">
        <button type="button" disabled ={this.state.page<=1} className="btn btn-secondary" onClick={this.handlePrevClick}>&larr; Previous</button>
        <h4>showing page {this.state.page} of {Math.ceil(this.state.totalResults/this.props.pageSize)}</h4>
        <button type="button" disabled ={Math.ceil(this.state.totalResults/this.props.pageSize)<=this.state.page} className="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
