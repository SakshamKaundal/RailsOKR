class KeyResult < ApplicationRecord
  validates :description, presence: true
  belongs_to :objective
end

