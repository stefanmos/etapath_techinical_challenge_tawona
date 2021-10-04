class ApplicationRecord < ActiveRecord::Base
  #protect_from_forgery except: :create
  self.abstract_class = true
end
