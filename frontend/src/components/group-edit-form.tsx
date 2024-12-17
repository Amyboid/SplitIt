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
import { useAtom } from "jotai";
import { currentGroupAtom, newGroupArrayAtom } from "@/lib/states";
import { Link, useLocation } from "wouter";
import { userAtom } from "@/lib/user";
import { useEffect } from "react";

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
  groupmembers: z.array(userObj),
});

export default function GroupEditForm() {
  const [currentGroup,] = useAtom(currentGroupAtom);
  const [, setLocation] = useLocation();
  const [, setNewGroupArray] = useAtom(newGroupArrayAtom);
  const [user] = useAtom(userAtom);
  const GroupId = currentGroup?.GroupId
  const member = currentGroup?.GroupMembers.filter(i => i !== currentGroup.CreatorName).map(i => ({ name: i }))
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupname: currentGroup?.GroupName,
      groupdescription: currentGroup?.Description,
      groupmembers: member,
    },
  });



  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupmembers",
  });

  useEffect(() => {
    console.log("current G", currentGroup, user?.username);
  }, [currentGroup])

  const handleAddMember = (memberName: string) => {
    console.log("newly added memberName: ", memberName);
    console.log("fields", fields);
    const exist = fields.some(element => element.name === memberName)
    exist ? alert('member already exist') : (user?.username === memberName ? alert(`${user.username} is the creator`)
      : append({ name: memberName }))
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.groupmembers = [...values.groupmembers, { name: user?.username as string }]
    const newValues = { ...values, creatorname: user?.username }
    console.log("values", values, GroupId);
    await fetch(`/api/update/group/${GroupId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(newValues)
    });

  }

  return (
    currentGroup && <>
      <div className="overflow-y-scroll mb-2">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card text-card-foreground  border-black m-4 mt-8 relative space-y-8"
          >
            <div className="flex flex-col gap-2 group-info bg-secondary p-4 rounded-md">
              <h1 className="font-semibold text-xl mb-1">Group Information</h1>
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
              <div>
                {fields.map((member, index) => (
                  <div
                    key={member.id}
                    className="shadow-sm rounded-lg bg-card text-card-foreground p-3 pl-5 flex justify-between mb-1"
                  >
                    <span className="text-sm">{member.name}</span>
                    <Trash2
                      className="w-5 text-destructive cursor-pointer"
                      onClick={() => remove(index)}
                    />
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
            <Button type="submit">Update</Button>
            <Button type="button" variant="outline" className="ml-4" onClick={() => { form.reset() }}>
              Reset
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
