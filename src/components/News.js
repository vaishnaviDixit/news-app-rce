import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(true)
  const[page,setPage]=useState(1)
  const[totalResults,setTotalResults]=useState(0)

   
 const capitalizeFirstLetter = (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }

 
   
  

const updateNews= async ()=>{
  props.setProgress(10);
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data= await fetch(url);
  props.setProgress(30);
  let parsedData= await data.json()
  props.setProgress(70);
  console.log(parsedData);
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)

  props.setProgress(100);
}
   useEffect(()=>{
    document.title=`${capitalizeFirstLetter(props.category)} - NewsHunt`;
    updateNews();
   },[])

  
  

  

const handleNextclick=async()=>{
//   console.log("next");
//   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){

  

//   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
//   this.setState({loading:true})
//   let data= await fetch(url);
//   let parsedData= await data.json()
  
//   this.setState({
//   page: this.state.page + 1,
//   articles:parsedData.articles,
//   loading:false
//   })
// }
setPage(page+ 1);
updateNews();
}

const handlePrevclick= async()=>{
//   console.log("previous");
//   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
//   this.setState({loading:true})
//   let data= await fetch(url);
//   let parsedData= await data.json()
//   console.log(parsedData);
  

// this.setState({
//   page: this.state.page - 1,
//   articles:parsedData.articles,
//   loading:false
// })
setPage(page-1);
updateNews();
}
const fetchMoreData = async() => {
  
 
 const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
 setPage(page+1)
 let data= await fetch(url);
 let parsedData= await data.json()
 setArticles (articles.concat(parsedData.articles))
setTotalResults(parsedData.totalResults)

};


 
    return (
      <>
        <h1 className="text centre" style={{margin: '35px' ,marginTop: '90px'}}>NewsHunt - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
   {loading && <Spinner/>}
  <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          >
  <div className='container'>
        
        <div className='row'>
        {articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>

          <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          

        })}
  
  </div>
  </div>
  </InfiniteScroll>
  {/*<div className="container d-flex justify-content-between">
  <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr; Previous</button>
  <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>

  </div>
      */}
      </>
    )
}

  

News.defaultProps ={
  country: "in",
  pageSize: 8,
  category: 'General'
}
News. propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
 export default News