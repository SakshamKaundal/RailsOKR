# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_25_104634) do
  create_table "key_results", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "current_value", default: 0
    t.string "description", null: false
    t.boolean "is_completed", default: false
    t.string "metric", default: "%"
    t.integer "objective_id", null: false
    t.integer "target_value", default: 100
    t.datetime "updated_at", null: false
    t.index ["objective_id"], name: "index_key_results_on_objective_id"
  end

  create_table "objectives", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "title"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "key_results", "objectives", on_delete: :cascade
end
