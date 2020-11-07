require 'rails_helper'

RSpec.describe User, :type => :model do
    let(:user) {
      User.create(
        :username => "Mindy",
        :email => "Mindy@gmail.com",
        :password => "password",
        :password_confirmation => "password"
      )
    }

    let(:userInvalid) {
      User.create(
        :username => "Mindy",
        :email => "mindy@gmail.com",
        :password => "password",
        :password_confirmation => "password"
      )
    }

    let(:userInvalid2) {
      User.create(
        :username => "test",
        :email => "test@gmail.com",
        :password => "password",
        :password_confirmation => "password123"
      )
    }

    it "is valid with a name, email, password, password confirmation" do
        expect(user).to be_valid
    end

    it "is not valid without a password" do
        expect(User.new(username: "Mindy", email: "mindy@gmail.com")).not_to be_valid
    end

    it "is not valid when using the same email with different letter case" do
        user
        expect(userInvalid).not_to be_valid
    end

    it "is not valid when password confirmation is not the same as password" do
        expect(userInvalid2).not_to be_valid
    end


end  