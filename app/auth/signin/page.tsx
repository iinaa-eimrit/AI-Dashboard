"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to access your dashboard
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </Card>
    </div>
  );
}