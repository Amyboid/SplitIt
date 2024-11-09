"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {  SearchBox } from "@/components/search-box";

const formSchema = z.object({
  groupname: z.string().min(3, {
    message: "Group name must be at least 3 characters.",
  }),
  groupdescription: z
    .string()
    .max(30, {
      message: "Description must be in the range of 30 characters.",
    })
    .or(z.literal("")),
    groupmembers: z
    .string()
    .max(30, {
      message: "Description must be in the range of 30 characters.",
    })
    .or(z.literal("")),
});

function GroupForm() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupname: "",
      groupdescription: "",
      groupmembers: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-3">
          <div className="flex flex-col gap-2 group-info bg-secondary p-4 rounded-md">
            <h1 className="font-semibold text-xl mb-1 ">Group Information</h1>
            <FormField
              control={form.control}
              name="groupname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group name</FormLabel>
                  <FormControl>
                    <Input placeholder="Friends" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupdescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe relevant information about group"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* members section */}
          <div className="flex flex-col gap-2 bg-secondary p-4 rounded-md">
            <h1 className="font-semibold text-xl mb-1 ">Group Members</h1> 
            <FormField
              control={form.control}
              name="groupmembers"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Members</FormLabel> */}
                  <FormControl>
                    <SearchBox/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
          </div>
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </>
  );
}

export default function Groups() {
  return (
    <>
      <GroupForm />
    </>
  );
}
