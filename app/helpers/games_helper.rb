module GamesHelper
  
  def other_ai_select_options
    return [['No AI, Student Interaction', nil]] unless current_user.present?
    options = [['No AI, Student Interaction', nil]]
    User.with(:ai_implementations).where(['users.id != ? and ai_implementations.published = ?', current_user.id, true]).all.each do |user|
      user.ai_implementations.each do |ai|
       options.push(["#{user.login} - #{ai.name}", ai.code])
      end
    end
    return options
  end
end
