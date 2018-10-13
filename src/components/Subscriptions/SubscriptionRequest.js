import React, {Component} from 'react';
import {connect} from 'react-redux';
import {acceptSubscription, declineSubscription} from "../../actions";
import {refreshAuthor} from "../../utils/utils";
import Loading from '../Loading';

class SubscriptionRequest extends Component{
  state = {
    author: null
  };

  componentWillMount(){
    refreshAuthor(this, this.props.subscription.userCreator, this.props.authors);
  }

  acceptSubscription = () => {
    this.props.acceptSubscription(this.props.subscription);
  };

  declineSubscription = ()=> {
    this.props.declineSubscription(this.props.subscription);
  };

  render() {
    if (!this.state.author) {
      return <div>
        <Loading/>
      </div>
    }

    return <div>
      <img src={this.state.author.picture.medium} alt={this.state.author.name.first}/>
      <p>{this.state.author.name.first}</p>
      <button onClick={this.acceptSubscription}>Aceptar</button>
      <button onClick={this.declineSubscription}>Cancelar</button>
    </div>
  }
}

export default connect(state => ({
  authors: state.author.authors
}), dispatch => ({
  acceptSubscription: subscription => dispatch(acceptSubscription(subscription)),
  declineSubscription: subscription => dispatch(declineSubscription(subscription))
}))(SubscriptionRequest);