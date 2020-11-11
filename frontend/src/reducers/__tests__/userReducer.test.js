import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import {act, render, fireEvent, cleanup, waitForElement} from '@testing-library/react';
import axiosMock from "axios";

import * as Reducer from '../userReducer';
import { userLogin, userSignUp } from '../../actions/userActions';
import Home from "../../containers/Home";
import SignUp from '../../containers/SignUp.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as rootReducer from '../rootReducer';


afterEach(cleanup)

describe('test the reducer and actions', () => {
  it('should return the initial state', () => {
    expect(Reducer.initialState).toEqual({username: "", email: "", loading: false, errors: []})
  })

  it('Async axios login request works and add user info', async () => {
    axiosMock.post.mockResolvedValue({data: { user: {username: "test", email: "test@gmail.com"}, logged_in: true } })

        const { getByText, getByTestId, rerender } = render(
            <Provider store={createStore(rootReducer)}>
                <Home />
            </Provider>);
      
        expect(getByTestId("loginForm").toBeInTheDocument())

        Reducer.userReducer(Reducer.initialState, userLogin(
            {username: "test", email: "test@gmail.com"})
        )

        expect(getByText(/Loading/i).textContent).toBe("Loading...")
        
        const resolvedEl = await waitForElement(() => getByTestId("loginForm"));
        
        expect(resolvedEl).not.toBeInTheDocument()
        
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith("http://localhost:8080/login");
    })
    
  it('Async axios signup request works and add user info', async () => {
        const history = createMemoryHistory()
        const { getByText, getByTestId, rerender } = render(
            <Router history={history}>
                <SignUp />
            </Router>)
      
        expect(getByText("Signup").toBeInTheDocument())
        Reducer.userReducer(Reducer.initialState, userSignUp(
            {username: "test", email: "test@gmail.com"})
        )
        
        const resolvedEl = await waitForElement(() => getByTestId("loginForm"));
        
        expect(resolvedEl).not.toBeInTheDocument()
        
        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith("http://localhost:8080/users");
  })
})