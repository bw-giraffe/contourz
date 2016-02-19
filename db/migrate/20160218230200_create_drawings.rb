class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.attachment :image

      t.timestamps null: false
    end
  end
end
