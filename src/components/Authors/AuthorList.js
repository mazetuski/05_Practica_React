import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAuthors} from "../../actions";
import Loading from '../Loading';
import Author from './Author';

class AuthorList extends Component {
  componentWillMount(){
    this.props.updateAuthors();
  }

  render() {
    return <div>
      { this.props.isLoading
          ? <Loading/>
          : this.props.authors.map(author => <Author key={author.login.uuid} image={author.picture.medium} name={author.name.first}/>)}
    </div>
  }
}

export default connect(state => ({
  authors: state.author.authors,
  isLoading: state.author.isLoading
}), dispatch => ({
  updateAuthors: () => dispatch(getAuthors())
}))(AuthorList);
