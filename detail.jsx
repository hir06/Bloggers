import React from "react";
// import {reactLocalStorage} from 'reactjs-localstorage';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.increaseLike = this.increaseLike.bind(this);
  }

  loadData() {
    fetch("blogdata.json")
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
      })
      .catch(err => console.error(this.props.url, err.toString()));
  }
  componentDidMount() {
    this.loadData();
  }
  increaseLike(e, comment) {
    debugger;
    if(localStorage.getItem(comment.id) == undefined | localStorage.getItem(comment.id) == null)
  {
      comment.like = 0;
      comment.dislike=0;
    } else {
      comment.like = localStorage.getItem(comment.id).split(",")[0];
      comment.dislike = localStorage.getItem(comment.id).split(",")[1];
    }
   
    
   

    if (e.target.textContent == "thumb_up") {
      comment.like = parseInt(comment.like) + 1;
    } else {
      comment.dislike = parseInt(comment.dislike) + 1;
    }
    var conStr = comment.like + "," + comment.dislike;
    localStorage.setItem(comment.id, conStr);
    this.setState({ likes: comment.desc });
    console.log(comment.like);
  }
  render() {
    const projectName = this.props.match.params.name;
   var divStyle = {
  color: "white",
      background:"rgba(0,0,0,0.3)"

};
    const block = () => {
      const item = this.state.data.find(item => item.Name == projectName);

      let foundItem = item || "Not available";
  
      const renderReplies = replies =>
        (replies
          ? replies.map((rep, j) => <div key={j}>
       
          <div className="card-panel" style={divStyle}>
            <span>
             <i className="material-icons">perm_identity </i></span>
{rep.user}<br/>
{rep.des}
          </div>
         </div>)
          :<div className="row"> No replies</div>);
      const temp = () => this.increaseLike(cmm);
    
      const renderComments = comments =>
        (comments
          ? comments.map((cmm, i) => (
              <div className="row" key={i}>
                {/*const todos = localStorage.getItem(cmm.desc); */}
                <div className="portfolio-item">

                  <span className="desc">  <i
                      className="material-icons"
                     
                    >perm_identity </i></span>  {cmm.user}
                  {" "}
                  <div>
                  
                    <span className="right"> ({localStorage.getItem(cmm.id)?localStorage.getItem(cmm.id).split(",")[1]:0 })</span>
                    <i
                      className="material-icons right"
                      onClick={e => this.increaseLike(e, cmm)}
                    >
                      thumb_down
                    </i>
                    <span className="right"> ({localStorage.getItem(cmm.id)?localStorage.getItem(cmm.id).split(",")[0]:0 })</span>
                 
                       <i
                      className="material-icons right"
                      onClick={e => this.increaseLike(e, cmm)}
                    >
                      thumb_up
                    </i>
               
                  </div>
                  <br />
                  <span>

                    </span>
                         <span>

                    </span>
               
                  <span>{cmm.desc}</span>
                  {/*<span>{cmm.like}</span>*/}

                  {renderReplies(cmm.replies)}

                </div>
              </div>
            ))
          : <div className="row"> No Comments</div>);

      return (
        <div className="row">
          <div className="col l1 m1">&nbsp;</div>
          <div className="col s12 m10 l10">
            <div className="card">
              <div className="card-content">
                <div className="title">
                  <h4>{foundItem.Name}</h4><br />
                </div>
                <div>{foundItem.detail}</div><br />

                <h4>
                  Comments ({foundItem.comments && foundItem.comments.length})
                </h4>
                <div className="comment-block">

                  {renderComments(foundItem.comments)}

                </div>
              </div>

            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        {block()}
      </div>
    );
  }
}

export default Detail;
