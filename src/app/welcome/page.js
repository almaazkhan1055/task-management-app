import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ToggleTheme from "@/components/ui/toggleTheme";

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Task Management</CardTitle>
          <CardDescription>you can manage your task easily</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-6">
          <Link href="/login">
            <Button>Login Now</Button>
          </Link>
          <Link href="/signup">
            <Button>Create an account?</Button>
          </Link>
          <ToggleTheme />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
