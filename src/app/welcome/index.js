"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomizedSwitches from "../switch";

const Welcome = () => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    if (user) router.push("/home");
    if (!user) router.push("/");
  }, []);
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
          <CustomizedSwitches />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
