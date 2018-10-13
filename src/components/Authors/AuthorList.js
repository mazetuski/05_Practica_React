import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAuthors} from "../../actions";
import Loading from '../Loading';
import Author from './Author';
import styled from 'styled-components';

class AuthorList extends Component {
  componentWillMount() {
    // refresh authors if not exists
    if(!this.props.authors || this.props.authors.length <= 0) {
      this.props.updateAuthors();
    }
  }

  render() {
    return <div className={this.props.className}>
      {this.props.isLoading
          ? <Loading/>
          : this.props.authors.map(author =>
              <Author
                  key={author.login.uuid}
                  id={author.login.uuid}
                  image={author.picture.large}
                  name={author.name.first}
              />
          )}
    </div>
  }
}

export default connect(state => ({
  authors: state.author.authors,
  isLoading: state.author.isLoading
}), dispatch => ({
  updateAuthors: () => dispatch(getAuthors())
}))(styled(AuthorList)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  & > div {
    flex: 1 0 100%;
    box-sizing: border-box;
    
    @media only screen and (min-width: 900px){
       flex: 1 0 32%;
    }
    
    @media only screen and (min-width: 1200px){
       flex: 1 0 24%;
    }
  } 
  
`);
