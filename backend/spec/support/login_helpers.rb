
# module LoginHelper
#     @userSignup = {
#         username: "Mindy",
#         email: "Mindy@gmail.com",
#         password: "password",
#         password_confirmation: "password"
#       }

#     @userLogin = {
#         email: "Mindy@gmail.com",
#         password: "password"
#       }
      
#     def user_signup
#         post('/users', :user => @userSignup, :format => :json)
#     end
  
#     def user_login
#         User.create(@userSignup)
#         post :login, :user => @userLogin, :format => :json
#     end
  
#     def user_logout
#         user_login()
#         post :logout
#     end
  
#     def is_logged_in_when_logged_in
#         user_login()
#         get :logged_in
#     end
  
#     def is_logged_in_when_false
#         get :logged_in
#     end
    
#   end