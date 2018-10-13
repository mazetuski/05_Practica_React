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
    if(subscription.length === 0) return null;

    return subscription[0];
  };

  componentWillMount() {
    const id =  this.props.match.params.id || this.props.user.login.uuid;
    refreshAuthor(this, id, this.props.authors);
  }

  componentWillReceiveProps(newProps) {
    const id =  newProps.match.params.id || newProps.user.login.uuid;
    refreshAuthor(this, id, this.props.authors);
  }

  render() {
    if (!this.state.author) {
      return <Main>
        <Loading/>
      </Main>
    }

    const isLoggedUser = this.state.author.login.uuid === this.props.user.login.uuid;
    const subscription = this.getSubscription();
    const isSubscriptor = subscription && subscription.status === STATUS_ACCEPTED;
    return <Main>
      <img src={this.state.author.picture.medium} alt=""/>
      <h2>{this.state.author.name.first} {this.state.author.name.last}</h2>
      {/* if the page is the user profile then render his articles and a form */}
      { isLoggedUser &&
      <div>
        <ArticleList userId={this.state.author.login.uuid}/>
        <ArticleForm userId={this.state.author.login.uuid}/>
        <SubscriptionList/>
      </div>
      }
      {/* if the page is not the user profile then render article list or subscription button */}
      { (!isLoggedUser && isSubscriptor) &&
        <ArticleList userId={this.state.author.login.uuid}/>
      }
      { (!isLoggedUser && !subscription) &&
          <button onClick={this.createSubscription}>Suscribirse</button>
      }
    </Main>
  }
}

export default connect(state => ({
  user: state.auth.user,
  authors: state.author.authors,
  subscriptions: state.subscription.subscriptions
}), dispatch => ({
  addSubscription: subscription => dispatch(addSubscriptions(subscription))
}))(Profile);