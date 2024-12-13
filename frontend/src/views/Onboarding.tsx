import { IdTokenClaims, useLogto } from "@logto/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  avatar: z
    .instanceof(FileList)
    .refine((files) => files.length == 1, {
      message: 'You must upload an avatar',
    })
    .refine((files) => {
      const file = files[0];
      return file.size <= 2 * 1024 * 1024; // Limit to 2MB
    }, {
      message: 'File size must be less than 2MB',
    })
    .refine((files) => {
      const file = files[0];
      return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
    }, {
      message: 'Only JPEG, PNG, and GIF files are allowed',
    }),
});

export default function Onboarding() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { isAuthenticated, getIdTokenClaims } = useLogto();
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<IdTokenClaims>();
  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUser(claims);
      }
    })();
  }, [getIdTokenClaims, isAuthenticated]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Create a URL for the selected file
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set the image preview URL
    }
  };

  useEffect(() => {
    // Cleanup function to revoke the object URL
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setLoading(true); // Set loading state to true
    // try {
    // Create a FormData object to hold the form data
    const formData = new FormData();
    console.log(user);

    formData.append('userid', user?.sub!);
    formData.append('username', values.username);
    formData.append('name', values.name);
    // Append the avatar file to the FormData
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0]); // Append the first file
    }

    // Send the form data to the backend
    const response = await fetch('/api/onboarduser', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setLocation("/dashboard");
    }

    // Handle successful response
    //   const result = await response.json();
    //   console.log('Upload successful:', result);
    //   // Optionally redirect or show a success message
    // } catch (error) {
    //   console.error('Error uploading data:', error);
    //   // Optionally show an error message to the user
    // } finally {
    //   // setLoading(false); // Reset loading state
    // }
  }


  if (!isAuthenticated) setLocation("/");

  return (
    <div className="overflow-y-scroll mb-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card text-card-foreground  border-black m-4 mt-8 relative space-y-8">
          <div className="flex flex-col gap-2 group-info bg-secondary p-4 rounded-md">
            <h1 className="font-semibold text-xl mb-1">Information</h1>
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  {/* Display the selected image using the Avatar component */}
                  {imagePreview && (
                    <div className="mt-4">
                      <Avatar>
                        <AvatarImage src={imagePreview} alt="user avatar" />
                        <AvatarFallback>UA</AvatarFallback>
                      </Avatar>
                    </div>
                  )}

                  <FormLabel>Upload Avatar</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          handleFileChange(e); // Call the custom handler only if files are selected
                          field.onChange(files); // Update react-hook-form state with the selected files
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

