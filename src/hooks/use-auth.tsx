import useSWR from "swr";

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

import * as React from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/router";

export function useAuth() {
  const { data, error } = useSWR("/api/auth/session", fetcher);

  const [isLoadingLogin, setIsLoadingLogin] = React.useState(false);

  const router = useRouter();

  function onLogin() {
    setIsLoadingLogin(true);
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
            await router.push(response.url);
          }
        }
        if (!response?.ok) {
          toast.error("Something went wrong, kindly try again");
        }
      })
      .catch(() => {
        toast.error("Something went wrong, kindly try again");
      })
      .finally(() => setIsLoadingLogin(false));
  }

  return {
    user: data?.user,
    error,
    isLoading: !data && !error,
    onLogin,
    isLoadingLogin,
  };
}
