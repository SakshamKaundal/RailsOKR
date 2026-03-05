class CreateObjectives < ActiveRecord::Migration[8.1]
  def change
    create_table :objectives do |t|
      t.string :title

      t.timestamps
    end
  end
end
