require 'pry'

class UsersController < ApplicationController
    def index
        @users = User.list
        if @users
            render json: @users
        else
            render json: {
                status: 500,
                errors: 'no users found'
            }
        end
    end

    def show
        @user = User.find(params[:id])
        if @user
            render json: @user, only: [:username, :email]
        else
            render json: {
                status: 500,
                errors: 'no users found'
            }
        end
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!
            render json: {
                logged_in: true,
                user: {
                    username: @user.username,
                    email: @user.email
                }
            }.to_json
        else
            render json: {
                status: 500,
                errors: @user.errors.full_messages
            }
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end


end