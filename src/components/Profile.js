import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './Main';
import Loading from './Loading';
import ArticleList from './Article/ArticleList';
import ArticleForm from './Article/ArticleForm';

class Profile extends Component {
  state = {
    author: null,
  };

  refreshAuthor = (props) => {
    const id = props.match.params.id || props.user.login.uuid;
    const author = this.props.authors.filter(author =>
        author.login.uuid === id)[0];
    this.setState({author: author});
  };

  componentWillMount() {
    this.refreshAuthor(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.refreshAuthor(newProps);
  }

  render() {
    if (!this.state.author) {
      return <Main>
        <Loading/>
      </Main>
    }

    const isLoggedUser = this.state.author.login.uuid === this.props.user.login.uuid;
    return <Main>
      <img src={this.state.author.picture.medium} alt=""/>
      <h2>{this.state.author.name.first} {this.state.author.name.last}</h2>
      {/* if the page is the user profile then render his articles and a form */}
      { isLoggedUser &&
      <div>
        <ArticleForm userId={this.state.author.login.uuid}/>
        <ArticleList userId={this.state.author.login.uuid}/>
      </div>
      }
      {/* if the page is not the user profile then render article list or subscription button */}
      { isLoggedUser &&
      <ArticleList/>
      }
    </Main>
  }
}

export default connect(state => ({
  user: state.auth.user,
  authors: state.author.authors,
}))(Profile);