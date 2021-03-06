require 'pry'

class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    before_action :set_csrf_cookie

    helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!, :set_user

    def login!
        session[:user_id] = @user.id
    end

    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @current_user ||= User.find_by_id(session[:user_id])
    end

    def authorized_user?
        @user == current_user
    end

    def set_user
        @user = User.find_by(id: session[:user_id])
    end

    private

    def set_csrf_cookie
        cookies["CSRF-TOKEN"] = form_authenticity_token
    end
end