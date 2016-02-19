class AddArtistReferenceToDrawings < ActiveRecord::Migration
  def change
    add_reference :drawings, :artist, index: true, foreign_key: true
  end
end
