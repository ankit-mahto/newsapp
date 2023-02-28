import React, { Component } from "react";
import NewsItem from "./NewsItem";



export class News extends Component {
    articles=[
        
    ]
    constructor(){
        super();
        console.log("Hello I am a constructor from News component");
        this.state ={
            articles: this.articles,
            loading: false }
        }

  render() {
    return (
      <div className="container my-4">
        <h2>News Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title='mytitle' description='mydesc'/>
          </div>
          <div className="col-md-4">
            <NewsItem title='mytitle' description='mydesc'/>
          </div>
          <div className="col-md-4">
            <NewsItem title='mytitle' description='mydesc'/>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
