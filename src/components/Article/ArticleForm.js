import React, {Component} from 'react';
import {connect} from 'react-redux';

class ArticleForm extends Component{
  state = {
    title: '',
    description: ''
  };

  handleInput = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = () => {
    // TODO: do creation of an article
  };

  render(){
    return <form>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' value={this.state.title} onChange={this.handleInput}/>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id='description' value={this.state.description} onChange={this.handleInput}/>
      </div>
      <button onClick={this.handleSubmit}>Create</button>
    </form>
  }
}

export default connect(null, dispatch => ({

}))(ArticleForm);