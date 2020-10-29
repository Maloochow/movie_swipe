require 'pry'

class SessionsController < ApplicationController
    def create
        @user = User.find_by(email: session_params[:email])
        if @user && @user.authenticate(session_params[:password])
            login!
            render json: {
                logged_in: true,
                user: @user
            }
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
                user: current_user
            }
        else
            render json: {
                logged_in: false,
                errors: "no such user"
            }
        end
    end

    def destroy
        session.clear
        cookies.delete :_session_id
        if !logged_in?
            render json: {
                status: 200,
                logged_out: true
            }
        else
            binding.pry
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