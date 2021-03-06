
require 'pry'

class SessionsController < ApplicationController
    def create
        @user = User.find_by(email: session_params[:email])
        if @user && @user.authenticate(session_params[:password])
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
                status: 401,
                errors: 'no such suser or password is invalid, please try again'
            }
        end
    end

    def is_logged_in?

        if logged_in? && current_user
            render json: {
                logged_in: true,
                user: {
                    username: current_user.username,
                    email: current_user.email
                }
            }
        else
            render json: {
                logged_in: false,
                errors: "no such user"
            }
        end
    end

    def destroy
        session.destroy

        if !logged_in?
            render json: {
                status: 200,
                logged_out: true
            }
        else
            render json: {
            status: 200,
            logged_out: false
        }
        end    
    end

    private

    def session_params
        params.require(:user).permit(:email, :password)
    end

end