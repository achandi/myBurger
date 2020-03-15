import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Aux';

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.resIntercept = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
      this.reqIntercept = axios.interceptors.request.use(
        req => req,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      console.log('Will unmount', this.reqIntercept, this.resIntercept);
      axios.interceptors.request.eject(this.reqIntercept);
      axios.interceptors.response.eject(this.resIntercept);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
