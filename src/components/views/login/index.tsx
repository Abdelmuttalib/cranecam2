import * as React from "react";

import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
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
import { LogInIcon } from "lucide-react";
import { LoginFormFields } from "@/schema/types";
import { loginFormSchema } from "@/schema";

import { LoginLayout } from "@/components/layout/login";
import Seo from "@/components/seo";
import Link from "next/link";
import { appPaths } from "@/config/app";

export function LoginPageView() {
  const { data: session, status } = useSession();

  console.log("session", session);

  return (
    <>
      <Seo title="Sign in" />

      <LoginLayout>
        <div className="flex w-full max-w-sm flex-col rounded-lg">
          <Card>
            <LoginForm />
          </Card>
        </div>
      </LoginLayout>
    </>
  );
}

function LoginForm() {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
    })
      .then(async (response) => {
        if (response?.ok) {
          toast.success("logged in successfully");
          if (response.url) {
            await push(appPaths.index);
          }
        }
        if (!response?.ok) {
          toast.error("Something went wrong, kindly try again");
        }
      })
      .catch(() => {
        toast.error("Something went wrong, kindly try again");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Card>
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <Typography as="h1" variant="display-xs/bold">
            Sign in
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
                          disabled={isLoading}
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
                          disabled={isLoading}
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
                    Object.keys(form.formState.errors).length > 0 || isLoading
                  }
                  isLoading={isLoading}
                  rightIcon={<LogInIcon className="h-4 w-4" />}
                >
                  Sign in
                </Button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href={appPaths.register}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
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
