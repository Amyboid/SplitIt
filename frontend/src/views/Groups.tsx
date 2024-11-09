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
import { Fullscreen, Pencil, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface GroupFormProps {
  setNewGroup: Function;
  setIsGroupExist: Function;
}

function GroupCard({ ...group }) {
  console.log("group", group.groupname);
  function handleFullView() {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="">
          <Button variant="outline">Delete</Button>
        </CardFooter>
      </Card>
    );
  }
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center space-x-4 p-4">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {group.groupname}
        </h1>
        <div className="flex justify-between mt-6 ">
          <div className="flex">
            <Users className="mr-1 w-5 cursor-pointer" />
            {group.groupmembers.length}
          </div>
          <Fullscreen onClick={handleFullView} className="w-5 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

//This is a group form component used for displayin form
function GroupForm({ setNewGroup, setIsGroupExist }: GroupFormProps) {
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
    // console.log("",values);
    setNewGroup((prev: any) => [...prev, values]);
    setIsGroupExist(true);
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
                <div
                  key={member.id}
                  className="shadow-sm rounded-lg bg-card text-card-foreground p-3 pl-5 flex justify-between mb-1"
                >
                  <span className="text-sm">{member.name}</span>
                  <Trash2
                    className="w-5 text-delete cursor-pointer"
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
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </>
  );
}

interface Group {
  groupname: string;
  groupdescription: string;
  groupmembers: string[];
}
export default function Groups() {
  const [newGroup, setNewGroup] = useState<Group[]>([]);
  const [isGroupExist, setIsGroupExist] = useState(false);
  // const []
  useEffect(() => {
    if (newGroup.length == 0) {
      setIsGroupExist(false);
    }
    console.log("newGroup", newGroup);
  }, [newGroup]);

  function handleDeleteGroup(index: number) {
    const newReducedGroup = newGroup.filter((item, itemindex) => {
      return itemindex !== index;
    });
    setNewGroup(newReducedGroup);
  }

  return (
    <>
      {isGroupExist && newGroup.map((group, index) => <GroupCard {...group} />)}
      {
        <GroupForm
          setNewGroup={setNewGroup}
          setIsGroupExist={setIsGroupExist}
        />
      }
    </>
  );
}

// (
//   <ul>
//     {newGroup.map((group, index) => (
//       <li key={index}>
//         <h3>{group.groupname}</h3>
//         <p>{group.groupdescription}</p>
//         <p>Members: {group.groupmembers.length}</p>
//         <Button
//           variant="outline"
//           onClick={() => handleDeleteGroup(index)}
//         >
//           delete
//         </Button>
//       </li>
//     ))}
//   </ul>
// )
