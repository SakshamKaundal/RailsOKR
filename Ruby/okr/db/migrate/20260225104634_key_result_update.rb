class KeyResultUpdate < ActiveRecord::Migration[8.1]
  def change
      change_table :key_results do |t|
         t.string "description", null: false
         t.integer "current_value", default: 0
         t.integer "target_value", default: 100
         t.string "metric", default: "%"
         t.boolean "is_completed", default: false
         t.references :objective, null: false, foreign_key: { on_delete: :cascade }
      end
    end
end
