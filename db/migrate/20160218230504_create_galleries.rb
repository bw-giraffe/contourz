class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.string :theme

      t.timestamps null: false
    end
  end
end
