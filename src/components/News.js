import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'


export class News extends Component {
    
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state ={
            articles: [],
            loading: false,
          page: 1 }
        }

        async componentDidMount() {
          // console.log("cdm");
          let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=3158d6c76dbe4e33b5ae04e165c143b6&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData); 
          this.setState({articles: parsedData.articles,
                        totalResults: parsedData.totalResults,
                        loading:false})
        }

        handlePrevClick = async()=>{
          console.log("next")
          let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=3158d6c76dbe4e33b5ae04e165c143b6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
          this.setState({loading:true})
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData); 
          this.setState({articles: parsedData.articles,
            page:this.state.page-1,
            loading:false})
        }

        handleNextClick = async ()=>{
          console.log("next")
         let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=3158d6c76dbe4e33b5ae04e165c143b6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
         this.setState({loading:true})
          let data = await fetch(url);
          let parsedData = await data.json()
          console.log(parsedData); 
          this.setState({articles: parsedData.articles,
            page:this.state.page+1,
            loading:false
          })

        }

  render() {
    return (
      <div className="container my-4">
        <h2 className='text-center'>News Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):"click on read more"} imageUrl = {element.urlToImage?element.urlToImage:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url}/>
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
