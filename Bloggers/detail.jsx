import React from 'react';

class Detail extends React.Component {

  constructor(props) {

    super(props)
    this.state = { data: [] }
    this.increaseLike = this.increaseLike.bind(this);
  }
 
  loadData() {

    fetch('blogdata.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data })

      })
      .catch(err => console.error(this.props.url, err.toString()))
  }
  componentDidMount() {
    this.loadData()
  }
  increaseLike(count) {
    console.log(this.count++)
  }
  render() {
    const projectName = this.props.match.params.name;
   
    const block=this.state.data.map((item, i) => {
     
   
        if (item.Name == projectName) {
           var comms = item.comments.map((cmm) => 
           {
                var replies = comms.replies.map((rep) => {
          return <div>{rep}</div>
          })
          return <div>{cmm}</div>;
          })
           
      
          return (<div className="row" key={i}>
                      <div className="col l1 m1">&nbsp;</div>
                      <div className="col s12 m10 l10"><div className="card" >
                      <div className="card-content">
                            <div className="title">
                               <span>{item.Name}</span><br />
                            </div>
                               <span>{item.detail}</span><br />

                              <div className="comment-block">

                                    <div className="row">
                                    <div className="portfolio-item">
                                    <span className="desc">User:</span> <span>{comms.user}<i className="material-icons" >thumb_up</i></span><br />
                                    <span>{comms.desc}</span>
                                    <span>{comms.like}</span>
                                  
                                     </div>
                                       </div>
                                     
                              </div>
                             </div>
                        
                       </div> 
                       </div>  
                       </div>)



        }

      })
    return (<div>
      {
        block
      }

    </div>)

  }

}


export default Detail;