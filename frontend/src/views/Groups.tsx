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
import { Fullscreen, Maximize2, Minimize2, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";

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
  setIsFormOpen: Function;
}
interface GroupCardProps {
  group: {
    groupname: string;
    groupmembers: string[];
    groupdescription: string;
  };
  deleteIndex: number;
  deleteGroup: (index: number) => void;
}

//this is group card component it has delete,expand feature
function GroupCard({ group, deleteGroup, deleteIndex }: GroupCardProps) {
  console.log("group", group.groupname);
  const [isFullView, setIsFullView] = useState(false);
  function handleFullView() {
    console.log("hie");
    setIsFullView((prev) => !prev);
  }
  function GroupCardFullview() {
    return (
      <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 p-4 py-6 my-4 h-max">
        <div className="z-50 w-72 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none  ml-auto mr-auto relative">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-2xl font-semibold leading-none tracking-tight">
              {group.groupname}
            </div>
            <div className="text-sm text-muted-foreground">
              {group.groupdescription.length > 0
                ? group.groupdescription
                : "no description"}
            </div>
          </div>
          <div className="p-4 pt-0 gap-2 flex flex-wrap items-center">
            {group.groupmembers.map((member: any, index) => {
              return (
                <div
                  key={index}
                  className="shadow-sm rounded-lg bg-secondary text-card-foreground text-sm p-2 "
                >
                  {member.name}
                </div>
              );
            })}
          </div>
          <Minimize2 onClick={() => handleFullView()}
              className="w-5 cursor-pointer absolute right-2 top-2"/>
        </div>
      </div>
    );
  }
  return (
    <>
      {isFullView && <GroupCardFullview />}
      <div className="m-4 rounded-lg border bg-div text-div-foreground shadow-sm flex items-center space-x-4 p-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            {group.groupname}
          </h1>
          <div className="flex justify-between mt-6 relative">
            <div className="flex">
              <Users className="mr-1 w-5 cursor-pointer" />
              {group.groupmembers.length}
            </div>
            <Maximize2 
              onClick={() => handleFullView()}
              className="w-5 cursor-pointer"
            />
            <Trash2
              className="absolute right-8 w-5 text-destructive cursor-pointer"
              onClick={() => deleteGroup(deleteIndex)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

//This is a group form component used for displayin form
function GroupForm({
  setNewGroup,
  setIsGroupExist,
  setIsFormOpen,
}: GroupFormProps) {
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
    setNewGroup((prev: any) => [...prev, values]);
    setIsGroupExist(true);
    setIsFormOpen(false);
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-scroll mb-2">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg border bg-card text-card-foreground shadow-sm m-4 relative space-y-8 p-4"
          >
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
            <Button type="submit">Create</Button>
            <Button
              type="button"
              variant="outline"
              className="ml-4"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </Button>
          </form>
        </Form>
      </div>
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const []
  useEffect(() => {
    if (newGroup.length == 0) {
      setIsGroupExist(false);
    }
    console.log("newGroup", isFormOpen);
  }, [newGroup, isFormOpen]);

  function handleDeleteGroup(index: number) {
    const newReducedGroup = newGroup.filter((_, itemindex) => {
      return itemindex !== index;
    });
    setNewGroup(newReducedGroup);
  }
  function handleFormOpen() {
    setIsFormOpen(true);
  }
  return (
    <>
      {isGroupExist &&
        newGroup.map((group, index) => (
          <GroupCard
            group={group}
            deleteIndex={index}
            deleteGroup={handleDeleteGroup}
          />
        ))}
      {isFormOpen && (
        <GroupForm
          setNewGroup={setNewGroup}
          setIsGroupExist={setIsGroupExist}
          setIsFormOpen={setIsFormOpen}
        />
      )}
      <Button variant="default" className="m-4" onClick={handleFormOpen}>
        Open Form
      </Button>
    </>
  );
}
