import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initail state', () => {
    expect(reducer(undefined, {})).toEqual({
      auth: {},
      loading: false,
      erorr: null,
      authRedirectPath: '/'
    }); //initialstate
  });

  it('should store token upon login', () => {
    expect(
      reducer(
        {
          auth: {},
          loading: false,
          erorr: null,
          authRedirectPath: '/'
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          authData: {
            idToken: 'x',
            localId: 'y'
          }
        }
      )
    ).toEqual({
      auth: { token: 'x', userId: 'y' },
      loading: false,
      erorr: null,
      authRedirectPath: '/'
    });
  });
});
