// app/[userId]/page.tsx
export default function UserPage({ params }: { params: { userId: string } }) {
  return (
    <div>
      <h1>Welcome {params.userId}</h1>
    </div>
  )
}