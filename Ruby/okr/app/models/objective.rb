class Objective < ApplicationRecord
  has_many :key_results, dependent: :destroy
end
