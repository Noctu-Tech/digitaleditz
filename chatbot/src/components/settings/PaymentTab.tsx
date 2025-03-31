export function PaymentTab() {
  return (
    <div className="space-y-8">
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-full p-3">
                <Check className="h-6 w-6 opacity-75" />
              </div>
              <h2 className="text-xl font-semibold">Current Subscription</h2>
            </div>
            <div className="bg-gray-100 text-sm px-3 py-1.5 rounded-full font-medium">
              Active
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200 hover:border-gray-300 transition-all">
            // ...existing code...
          </div>

          <div className="flex gap-3">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all">
              Upgrade Plan
            </Button>
            <Button variant="outline" className="hover:bg-gray-100 transition-all">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
      // ...existing code...
    </div>
  );
}
