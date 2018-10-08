import React from 'react';
import {connect} from 'react-redux';

const AuthorList = () => {
  return <div>
    {this.props.authors.map(author => console.log(author))}
  </div>
};

export default connect(state => ({
  authors: state.author.authors
}))(AuthorList);
