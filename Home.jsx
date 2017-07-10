import React from 'react';


import { BrowserHistory } from 'react-router-dom';
import { withRouter, Link } from "react-router-dom";
import { LazyLoad } from 'react-lazy-load';
import { InfiniteScroll } from 'react-infinite-scroll';
import Loader from 'react-loader';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedData:[],
      loading: false
    }
  }

  loadData() {
    fetch('blogdata.json')
      .then(response => response.json())
      .then(data => {
        this.setState({loading: true });
        this.bigData = data;
        setTimeout(() => {
          this.setState({ loadedData: this.bigData.slice(0,15), loading: false })
        },100)
      })
      .catch(err => console.error(this.props.url, err.toString()))

      const $scrollElement = $('.scroll-container');
      $scrollElement.on('scroll', () => {
          const scroll = $scrollElement.height() + $scrollElement.scrollTop();
          const progress = (scroll / ($scrollElement.find('.scroll-element').height())) * 100;
          if (progress >= 100) {
              this.onScrollEnd();
          }
      });
  }


  componentDidMount() {
    this.loadData()
  }

  onScrollEnd(){
    this.setState({loading: true});
    
    setTimeout(()=>{
      const lastIndexOfLoadedItem = this.bigData.indexOf(this.state.loadedData[this.state.loadedData.length-1]);
      const nextSetOfData= this.bigData.slice(0, lastIndexOfLoadedItem + 15);
      this.setState({loadedData: nextSetOfData})
      this.setState({loading: false})
    }, 500)
  }

  render() {

    const blocks = this.state.loadedData.map((item, i) => {

      const onClick = () => this.signOrder(item.name);
      <div className="col l2">&nbsp;</div>
      return <div className="col s12 m4 l3 dashboard" key={i}>
        <div className="card">
          <img src={item.image} />
          <span>{item.timestamp}</span>
          <div className="overlay" >
            <div className="text">
              <h2 className="card-title grey-text text-darken-4">{item.Name}</h2>
              <span key={item.Name}> <Link to={`/detail/${item.Name}`}>View details</Link></span>

            </div>
          </div>




        </div>
      </div>;
    });

    return <div>
      {this.bigData && <h5>Loaded {this.state.loadedData.length} of {this.bigData.length}</h5>}
      <div className="row scroll-container">
        <div className="scroll-element">
          {blocks}
        </div>
        </div>
        
        {this.state.loading && <div className="spinner">
          <Loader loaded={false}/>
        </div>}
    </div>

  }
}


export default withRouter(Home);