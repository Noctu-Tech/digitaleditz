interface Props {
  params: Promise<{ ticketId: string }>;
}


export default async function Page({ params }: Props) {
  const { ticketId } = await params;
  return <>{ticketId}</>;
}
