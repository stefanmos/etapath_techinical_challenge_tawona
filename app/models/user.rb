class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  #Application record db is authenticatable using devise so we can use valid_password?
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :packages
end
