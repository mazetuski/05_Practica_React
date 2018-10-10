import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addArticles} from '../../actions';
const uuidv1 = require('uuid/v1');

class ArticleForm extends Component{
  state = {
    title: '',
    description: ''
  };

  validate = () => {
    return this.state.title && this.state.description;
  };

  handleInput = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = () => {
    // check form inputs
    if(!this.validate()) return;
    // create article an add
    const article = {
      id: uuidv1(),
      title: this.state.title,
      description: this.state.description,
      user: this.props.userId
    };
    this.props.addArticle(article);
  };

  render(){
    console.log(this.props.userId);
    return <div>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' value={this.state.title} onChange={this.handleInput}/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id='description' value={this.state.description} onChange={this.handleInput}/>
      </div>
      <button onClick={this.handleSubmit}>Create</button>
    </div>
  }
}

export default connect((state, props) => ({
  userId: props.userId
}), dispatch => ({
  addArticle: article => dispatch(addArticles(article))
}))(ArticleForm);