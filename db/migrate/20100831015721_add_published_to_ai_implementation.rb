class AddPublishedToAiImplementation < ActiveRecord::Migration
  def self.up
    add_column :ai_implementations, :published, :boolean, :default => false
  end

  def self.down
    remove_column :ai_implementations, :published
  end
end
