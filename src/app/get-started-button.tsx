"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";

const GetStartedButton = () => {
  return (
    <div className="mt-2 flex place-items-center justify-center">
      <Button
        className="self-center"
        variant={"secondary"}
        onClick={async () => {
          await signIn("google", { callbackUrl: "/logger" });
        }}
      >
        {"Get started here"}
      </Button>
    </div>
  );
};

export default GetStartedButton;
