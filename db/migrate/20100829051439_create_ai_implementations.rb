class CreateAiImplementations < ActiveRecord::Migration
  def self.up
    create_table :ai_implementations do |t|
      t.belongs_to :user
      t.text :code
      t.string :name
      t.timestamps
    end
  end

  def self.down
    drop_table :ai_implementations
  end
end
