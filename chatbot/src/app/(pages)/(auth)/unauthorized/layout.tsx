import { ModeToggle } from "@/components/mode-toggle";


export default function UnauthorizedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <div className="fixed top-4 right-4">
                <ModeToggle />
            </div>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}