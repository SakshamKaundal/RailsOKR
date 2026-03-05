class CreateKeyResults < ActiveRecord::Migration[8.1]
  def change
    create_table :key_results do |t|
      t.timestamps
    end
  end
end
