import { ArrowRight, Copy, Layout } from "lucide-react";
interface TemplateInterface {
    color:string,
    title:String,
    description:String,
    usage:String
}
export const TemplateCard=({template}:{template:TemplateInterface})=>{

return (<div className=" rounded-xl shadow-sm hover:shadow-md transition-shadow">
<div className={`h-3 ${template.color} rounded-t-xl`} />
<div className="p-6">
  <div className="flex items-start justify-between mb-4">
    <div className={`w-10 h-10 ${template.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
      <Layout size={20} className={template.color.replace('bg-', 'text-')} />
    </div>
    <button className="text-gray-700 hover:text-gray-600">
      <Copy size={18} />
    </button>
  </div>
  
  <h3 className="text-lg font-medium mb-2">{template.title}</h3>
  <p className="text-gray-500 text-sm mb-4">{template.description}</p>
  
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700">{template.usage}</span>
    <button className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600" onClick={()=>{}}>
      Use template
      <ArrowRight size={16} />
    </button>
  </div>
</div>
</div>
)
}