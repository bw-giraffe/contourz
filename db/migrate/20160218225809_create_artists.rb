class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.date :date_joined
      t.string :username
      t.string :email
      t.string :password
      t.string :location

      t.timestamps null: false
    end
  end
end
