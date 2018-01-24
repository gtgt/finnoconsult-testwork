import React from 'react';

import StartService from '../../components/opensezame/StartService';
import ServiceStatus from '../../components/opensezame/ServiceStatus';

export default class StartServiceContainer extends React.Component {
  state = {
    isRunning: false,
  };

  // autorun(() => {
  //   //
  //   socket.status = akármi();
  //   if (socket.status ! = this.state.isRunning) {
  //     this.setState({ status: socket.status});
  //   }
  // });

  get isRunning() {
    return this.state.isRunning;
  }

  toggleRunState() {
    this.setState({ isRunning: !this.state.isRunning });
    console.log('Toggling status', this.state.isRunning);
  }

  render() {
    return (
      <div>
        <StartService
          isRunning={this.isRunning}
          toggleRunState={() => this.toggleRunState()}
        />
        {this.isRunning && (
          <ServiceStatus />
        )}
      </div>
    );
  }
}
