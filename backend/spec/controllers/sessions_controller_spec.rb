require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

    let(:user_login) {
        User.create(username: "Mindy",
            email: "Mindy@gmail.com",
            password: "password",
            password_confirmation: "password")
        post :create, params: {:user => {
            email: "Mindy@gmail.com",
            password: "password"
          }, :format => :json }
    }
  
    let(:user_logout) {
        user_login
        post :destroy
    }
  
    let(:is_logged_in_when_logged_in) {
        user_login()
        get :is_logged_in?, params: {withCredentials: true}
    }
  
    let(:is_logged_in_when_false) {
        get :is_logged_in?, params: {withCredentials: true}
    }
  
    describe 'Get /logged_in' do

        it 'returns a hash of username and email when logged in' do
            is_logged_in_when_logged_in
            expect(JSON.parse(response.body)['user']).to contain_exactly(
                ["email", "Mindy@gmail.com"], ["username", "Mindy"]
            )
        end

        it 'returns false when not logged in' do
            is_logged_in_when_false
            expect(JSON.parse(response.body)['logged_in']).to eq(false)
        end
    end

    describe 'Post /login' do

        before do
            user_login
        end

        it 'returns a hash of username and email' do
            expect(JSON.parse(response.body)['user']).to contain_exactly(
                ["email", "Mindy@gmail.com"], ["username", "Mindy"]
            )
        end

        it 'saves user info in the session' do
            get("is_logged_in?")
            expect(session[:user_id]).to be_present
        end
    end

    describe 'Post /logout' do

        before do
            user_login
            user_logout
        end

        it 'clears the session' do
            expect(JSON.parse(response.body)['logged_out']).to eq(true)
            expect(session[:user_id]).to be nil
        end

        it 'shows no login after refresh' do
            get :is_logged_in?, params: {withCredentials: true}
            expect(JSON.parse(response.body)['logged_in']).to eq(false)
        end
    end

end