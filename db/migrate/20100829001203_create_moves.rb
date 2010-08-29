class CreateMoves < ActiveRecord::Migration
  def self.up
    create_table :moves do |t|
      t.belongs_to :game
      t.integer :space
      t.string :player
      t.integer :move_number
      t.timestamps
    end
  end

  def self.down
    drop_table :moves
  end
end
