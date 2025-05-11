import PropertyItemPage from "../../_components/PropertyItemPage";

interface Props {
  params: Promise<{ productId: string }>;
}


export default async function Page({ params }: Props) {
  const { productId } = await params;
  return <PropertyItemPage propertyId={productId} />;
}
