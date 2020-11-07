class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, length: {minimum: 4}
    validates :email, presence: true, uniqueness: {case_sensitive: false}

    def self.list
        User.all.map do |user|
            {
                username: user.username,
                email: user.email
            }
        end
    end

end
