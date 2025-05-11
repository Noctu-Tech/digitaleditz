import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { handleDemo } from "@/lib/functionapis/public";
import { toast } from "sonner";
import { useCallback } from "react";

export default function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const {mutate,isPending} = useMutation({
    mutationFn: handleDemo,
    onSuccess: () => {
      form.reset();
      const message="Our team will contact you soon through the given contact details"
      toast.success("Message Sent Successfully",{id:"handle-demo",description:message})
    },
    onError: (e: any) => {
      toast.error("Something Went Wrong",{id:"handle-demo",description:e})
    },
  });
 const onSubmit = useCallback((values:any) => {
     toast.loading("Storing Information...", {id: "handle-demo"});
     mutate(values)
   }, [mutate])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <Label>Name</Label>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          rules={{ required: "Message is required" }}
          render={({ field }) => (
            <FormItem>
              <Label>Message</Label>
              <FormControl>
                <Textarea placeholder="Your message" {...field} className="h-32" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
