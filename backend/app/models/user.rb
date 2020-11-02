class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, length: {minimum: 4}
    validates :email, presence: true, uniqueness: {case_sensitive: false}
    # devise :database_authenticatable, :recoverable, :rememberable
         
    # def authenticatable_salt
    #   "#{super}#{session_token}"
    # end
  
    # def invalidate_all_sessions!
    #   self.session_token = SecureRandom.hex
    # end
end
