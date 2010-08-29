module SiteHelper
  
  def link_to_void(name, options={})
    link_to name, 'javascript:void(0)', options
  end
  
end