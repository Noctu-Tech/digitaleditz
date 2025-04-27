import PropertyItemPage from "../../_components/PropertyItemPage";

interface Props {
  params: {productId: string}

}
function page({params}:Props) {
    const {productId} = params;

  return (
   <>
   <PropertyItemPage propertyId={productId}/>
   </>
  )
}

export default page