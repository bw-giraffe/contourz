class AddPhotoReferenceToDrawings < ActiveRecord::Migration
  def change
    add_reference :drawings, :photo, index: true, foreign_key: true
  end
end
