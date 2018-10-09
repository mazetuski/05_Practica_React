import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './Main';
import Loading from './Loading';

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      author: null,
    };
  }

  refreshAuthor = (props) => {
    const id = props.match.params.id || props.user.login.uuid;
    const author = this.props.authors.filter(author =>
        author.login.uuid === id)[0];
    this.setState({author: author});
  };

  componentWillMount(){
    this.refreshAuthor(this.props);
  }

  componentWillReceiveProps(newProps){
    this.refreshAuthor(newProps);
  }

  render() {
    if(!this.state.author){
      return <Main>
        <Loading/>
      </Main>
    }
    return <Main>
      <img src={this.state.author.picture.medium} alt=""/>
      <h2>{this.state.author.name.first} {this.state.author.name.last}</h2>
    </Main>
  }
}

export default connect(state => ({
  user: state.auth.user,
  authors: state.author.authors,
}))(Profile);