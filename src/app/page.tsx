"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  username: z.string().min(1, { message: "Select a valid username." }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "chimmychonga",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addMutation.mutate(values.username);
    redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${values.username}`);
  };

  const addMutation = useMutation({
    mutationFn: async (username: string) => {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`, {
        method: "POST",
        body: JSON.stringify({ username }),
      }).then((res) => res.json());
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center font-bold mb-10">
        Welcome to the Century Challenge!
      </h1>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[90%] max-w-[500px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Who are you?</FormLabel>
                  <FormControl>
                    <Input placeholder="chimmychonga" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              Go
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
