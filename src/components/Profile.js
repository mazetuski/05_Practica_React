import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './Main';
import Loading from './Loading';
import SubscriptionList from './Subscriptions/SubscriptionList';
import ArticleList from './Article/ArticleList';
import ArticleForm from './Article/ArticleForm';
import {addSubscriptions} from "../actions";
import {STATUS_ACCEPTED, STATUS_PENDING} from "../constants/constants";
import {refreshAuthor} from "../utils/utils";
import styled from 'styled-components';

class Profile extends Component {
  state = {
    author: null,
  };

  createSubscription = () => {
    const userId = this.props.user.login.uuid;
    const authorId = this.state.author.login.uuid;
    const subscripton = {
      userCreator: userId,
      userReceiver: authorId,
      status: STATUS_PENDING,
    };
    this.props.addSubscription(subscripton);
  };

  getSubscription = () => {
    const subscriptions = this.props.subscriptions;
    const userId = this.props.user.login.uuid;
    const authorId = this.state.author.login.uuid;
    // get subscription if exists
    let subscription = subscriptions.filter(
        subscription => (userId === subscription.userCreator && authorId === subscription.userReceiver)
    );
    // if not exists return null
    if (subscription.length === 0) return null;

    return subscription[0];
  };

  componentWillMount() {
    const id = this.props.match.params.id || this.props.user.login.uuid;
    refreshAuthor(this, id, this.props.authors);
  }

  componentWillReceiveProps(newProps) {
    const id = newProps.match.params.id || newProps.user.login.uuid;
    refreshAuthor(this, id, this.props.authors);
  }

  render() {
    if (!this.state.author) {
      return <Main className={this.props.className}>
        <Loading/>
      </Main>
    }

    const isLoggedUser = this.state.author.login.uuid === this.props.user.login.uuid;
    const subscription = this.getSubscription();
    const isSubscriptor = subscription && subscription.status === STATUS_ACCEPTED;
    return <Main>
      <div className={this.props.className}>
        <div className='user-info'>
          <img src={this.state.author.picture.large} alt=""/>
          <h3>{this.state.author.name.first} {this.state.author.name.last}</h3>
        </div>
        <div className='user-body'>
          {/* if the page is the user profile then render his articles and a form */}
          {isLoggedUser &&
          <React.Fragment>
            <ArticleList userId={this.state.author.login.uuid}/>
            <div className='form'>
              <ArticleForm userId={this.state.author.login.uuid}/>
            </div>
            <div className='subscription'>
              <SubscriptionList/>
            </div>
          </React.Fragment>
          }
          {/* if the page is not the user profile then render article list or subscription button */}
          {(!isLoggedUser && isSubscriptor) &&
          <ArticleList userId={this.state.author.login.uuid}/>
          }
          {(!isLoggedUser && !subscription) &&
          <div className='subscribe'>
            <button onClick={this.createSubscription}>Suscribirse</button>
          </div>
          }
        </div>
      </div>
    </Main>
  }
}

export default connect(state => ({
  user: state.auth.user,
  authors: state.author.authors,
  subscriptions: state.subscription.subscriptions
}), dispatch => ({
  addSubscription: subscription => dispatch(addSubscriptions(subscription))
}))(styled(Profile)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  & > div {
    flex: 0 0 100%;
    
    &.user-body, & .subscription{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    
    & .subscription > div {
      margin: 0 5px;
      
      & button{
        margin: 0 5px;
      }
    }
    
    & .form, & .subscription {
      flex: 0 0 100%;
    }
    
    & .form {
      text-align: left;
      margin-top: 2rem;
    }
    
    & .subscribe{
       display: block;
    }
    
    @media only screen and (min-width: 900px){
      &.user-info{
        flex: 1;
      }
      
      &.user-body{
        flex: 3;
      }
    }
  }
`);