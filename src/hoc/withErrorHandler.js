import React from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './Aux';
import useHttpError from '../hooks/https-error-handler';
const withErrorHandler = (WrapperComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] = useHttpError(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrapperComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
