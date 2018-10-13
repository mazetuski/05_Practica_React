import React, {Component} from 'react';
import {connect} from 'react-redux';
import {STATUS_PENDING} from "../../constants/constants";
import SubscriptionRequest from './SubscriptionRequest';

class SubscriptionList extends Component {

  getSubscriptionsRequest = () => {
    const userId = this.props.user.login.uuid;
    const subscriptions = this.props.subscriptions;
    return subscriptions.filter(subscription =>
        subscription.userReceiver === userId && subscription.status === STATUS_PENDING
    )
  };

  render(){
    const subscriptionsRequest = this.getSubscriptionsRequest();
    return <React.Fragment>
      {subscriptionsRequest.map(subscriptionRequest =>
          <SubscriptionRequest key={subscriptionRequest.userCreator} subscription={subscriptionRequest}/>
      )}
    </React.Fragment>
  }
}

export default connect(state =>({
  user: state.auth.user,
  subscriptions: state.subscription.subscriptions
}))(SubscriptionList);