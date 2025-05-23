"use client";

import type { RawClimb, PostClimbProps } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  zone: z.string(),
  color: z.string(),
  grade: z.string().min(1, { message: "Please select a V-Grade." }),
  notes: z.string(),
});

const AddClimb = ({ username }: { username: string }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grade: "V0",
      color: "purple",
      zone: "hummingbird",
      notes: "",
    },
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (props: PostClimbProps): Promise<RawClimb> =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/climbs/${props.user_id}`,
        { method: "POST", body: JSON.stringify(props) }
      ).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [username, "climbs"],
      });
      toast({
        description: "Climb added.",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addMutation.mutate({
      grade: values.grade,
      color: values.color,
      zone: values.zone,
      notes: values.notes,
      user_id: username,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[90%] max-w-[320px] space-y-2"
      >
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>V-Grade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="0" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">V0</SelectItem>
                  <SelectItem value="1">V1</SelectItem>
                  <SelectItem value="2">V2</SelectItem>
                  <SelectItem value="3">V3</SelectItem>
                  <SelectItem value="4">V4</SelectItem>
                  <SelectItem value="5">V5</SelectItem>
                  <SelectItem value="6">V6</SelectItem>
                  <SelectItem value="7">V7</SelectItem>
                  <SelectItem value="8">V8</SelectItem>
                  <SelectItem value="9">V9</SelectItem>
                  <SelectItem value="10">V10</SelectItem>
                  <SelectItem value="11">V11</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="arch">Arch</SelectItem>
                  <SelectItem value="geo">Geo</SelectItem>
                  <SelectItem value="hummingbird">Hummingbird</SelectItem>
                  <SelectItem value="pearl">Pearl</SelectItem>
                  <SelectItem value="comp-wall">Comp Wall</SelectItem>
                  <SelectItem value="wave-wall">Wave Wall</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="add any notes here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={addMutation.isPending}
          className="w-full"
        >
          {addMutation.isPending ? "Loading..." : "Add Climb"}
        </Button>
      </form>
    </Form>
  );
};

export default AddClimb;
