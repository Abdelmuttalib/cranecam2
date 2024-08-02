import * as React from "react";

import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LogIn, LogInIcon } from "lucide-react";
import { LoginFormFields, RegisterFormFields } from "@/schema/types";
import { loginFormSchema, registerFormSchema } from "@/schema";

import { LoginLayout } from "@/components/layout/login";
import Seo from "@/components/seo";
import { ButtonLink } from "@/components/ui/button";
import Link from "next/link";
import { appPaths } from "@/config/app";
import { api } from "@/lib/api";

export function RegisterPageView() {
  return (
    <>
      <Seo title="Sign in" />

      <LoginLayout>
        <div className="flex w-full max-w-sm flex-col rounded-lg">
          <Card>
            <RegisterForm />
          </Card>
        </div>
      </LoginLayout>
    </>
  );
}

function RegisterForm() {
  const router = useRouter();

  const registerUserMutation = api.user.register.useMutation({
    onSuccess: async (data) => {
      toast.success("User registered successfully");
      await router.push(appPaths.login);
    },
    onError: (error) => {
      toast.error("Something went wrong, kindly try again");
    },
  });

  const form = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormSchema),
  });

  function onSubmit(data: RegisterFormFields) {
    registerUserMutation.mutate({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  }

  return (
    <>
      <Card>
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <Typography as="h1" variant="display-xs/bold">
            Register
          </Typography>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          inputMode="email"
                          placeholder="email@mail.com"
                          className="mt-1 h-12"
                          disabled={registerUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          inputMode="text"
                          placeholder="name"
                          className="mt-1 h-12"
                          disabled={registerUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="password"
                          className="mt-1 h-12"
                          disabled={registerUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="confirm password"
                          className="mt-1 h-12"
                          disabled={registerUserMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <Button
                  type="submit"
                  className="w-full sm:w-full"
                  disabled={
                    Object.keys(form.formState.errors).length > 0 ||
                    registerUserMutation.isPending
                  }
                  isLoading={registerUserMutation.isPending}
                  rightIcon={<LogInIcon className="h-4 w-4" />}
                >
                  Register
                </Button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href={appPaths.login}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </Card>
    </>
  );
}

function Card({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full rounded-lg bg-white shadow dark:border dark:border-neutral-800 dark:bg-neutral-800/20 md:mt-0 xl:p-0",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
