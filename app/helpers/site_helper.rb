module SiteHelper
  
  def link_to_void(name, options={}, html_options=nil)
    link_to name, 'javascript:void(0)', options, html_options
  end
  
  def link_to_external(name, url=nil, options={}, html_options=nil)
    link_to name, url || name, options.merge(:target => '_blank'), html_options
  end
  
end