# ActionView::Base.field_error_proc = Proc.new do |html_tag, instance_tag|
#   "<span class='field_error'>#{html_tag}</span>"
# end

Formtastic::SemanticFormBuilder.inline_errors = :list
Formtastic::SemanticFormBuilder.inline_order  = [:input, :hints, :errors]