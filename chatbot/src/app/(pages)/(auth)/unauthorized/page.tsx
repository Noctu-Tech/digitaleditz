import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[380px]">
                <CardHeader>
                    <CardTitle>Unauthorized Access</CardTitle>
                    <CardDescription>
                        You don't have permission to access this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                        Please sign in with appropriate credentials or contact your administrator
                        for access.
                    </p>
                    <Link href="/">
                        <Button className="w-full">Return to Home</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}