require 'rails_helper'

RSpec.describe UsersController, type: :controller do

    let(:user_signup) {
        post 'create', params: { :user => {
        username: "Mindy",
        email: "Mindy@gmail.com",
        password: "password",
        password_confirmation: "password"
      }, :format => :json }
      }
    
  describe 'Post /users' do

    before do
      user_signup
    end

    it 'creates a new user' do
      expect(User.all.length).to eq(1)
    end

    it 'returns a hash of username and email' do
      expect(JSON.parse(response.body)['user']).to contain_exactly(
        ["email", "Mindy@gmail.com"], ["username", "Mindy"]
      )
    end

    it 'saves user id in the session' do
      expect(session[:user_id]).to eq(User.first.id)
    end
  
  end

end