class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :artists, :password, :password_digest
  end
end
