import React from 'react';

class Detail extends React.Component {

  constructor(props) {

    super(props)
    this.state = { data: [] }
    this.signOrder = this.signOrder.bind(this);
  }
  signOrder(id) {
    debugger;
    console.log(id);

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
    console.log(this.count++);
  };
  render() {
    const projectName = this.props.match.params.name;

    return (<div>
      {this.state.data.map((item, i) => {
        if (item.Name == projectName) {
          return (<div className="row" key={i}>
            <div className="col l1 m1">&nbsp;</div>
            <div className="col s12 m10 l10"><div className="card" >
              <div className="card-content">
                <div className="title">
                  <span>{item.Name}</span><br />
                </div>
                <span>{item.detail}</span><br />

                <div className="comment-block">
                  {item.comments.map(function (cmm, j) {

                    const temp = () => this.signOrder("test");
                    return (<div className="row" key={j}>
                      <div className="portfolio-item">
                        <span className="desc">User:</span> <span>{cmm.user}<i className="material-icons" onClick={temp}>thumb_up</i></span><br />
                        <span>{cmm.desc}</span>
                        <span>{cmm.like}</span>
                      </div>

                    </div>
                    )
                  })}
                </div>
              </div>

              }
                       </div> </div>  </div>)



        }

      })
      }

    </div>)

  }

}


export default Detail;