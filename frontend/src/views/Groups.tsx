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
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { SearchBox } from "@/components/search-box";
import { Trash2 } from "lucide-react";

const userObj = z.object({
  name: z.string(),
});

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
  groupmembers: z.array(userObj).min(2),
});

function GroupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupname: "",
      groupdescription: "",
      groupmembers: [],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupmembers",
  });

  const handleAddMember = (memberName: string) => {
    console.log("memberName: ", memberName);
    append({ name: memberName });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-3">
          <div className="flex flex-col gap-2 group-info bg-secondary p-4 rounded-md">
            <h1 className="font-semibold text-xl mb-1 ">Group Information</h1>
            <FormField
              control={control}
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
              control={control}
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
            <div className="">
              {fields.map((member, index) => (
                <div key={member.id} className="rounded-md p-3 pl-5 bg-background flex justify-between mb-1">
                  <span className="text-sm">{member.name}</span>
                  <Trash2 className="w-5 text-delete cursor-pointer" onClick={() => remove(index)}/>
                </div>
              ))}
            </div>
            <FormField
              control={control}
              name="groupmembers"
              render={() => (
                <FormItem>
                  <FormControl>
                    <SearchBox onAddMember={handleAddMember} />
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
