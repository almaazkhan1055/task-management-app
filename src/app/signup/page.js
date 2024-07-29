"use client";

import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    console.log("user", user);
    if (user) router.push("/home");
    if (!user) router.push("/signup");
  }, []);

  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>To Continue...</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 my-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit" className="my-5 hover:bg-green-600">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <CardTitle>Already have an account?</CardTitle>
          <Link href="/login">
            <Button className="hover:bg-green-600">Login Now</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
