"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as RPNInput from "react-phone-number-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/PhoneNumberInput";
import { Button } from "./ui/button";
import { Loader } from "./Loader";

const WaitlistFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." }),
});

export const WaitlistForm = () => {
  const [pending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof WaitlistFormSchema>>({
    resolver: zodResolver(WaitlistFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof WaitlistFormSchema>) {
    startTransition(async () => {
      try {
        await axios.post("/api/waitlist", values);
        toast.success("You're on the list!", {
          description: "We'll be in touch soon with exclusive updates.",
        });
        setIsSubmitted(true);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data.error);
      }
    });
  }

  return (
    <div className="bg-black text-white py-10">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isSubmitted ? (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 mx-auto mb-6 rounded-md bg-primary/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to Ekovibe!</h3>
            <p className="text-muted-foreground-foreground mb-6">
              You&apos;re officially on our exclusive waitlist. We&apos;ll send
              you updates and early access information soon.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
            >
              Add Another Person
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <h2 className="font-semibold text-3xl lg:text-4xl">
                Join us now!
              </h2>
              <p className="text-base mt-1.5 text-gray-300">
                Don't miss out on the full experience ekovibes brings. Join our
                waitlist list today!
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <RPNInput.default
                          className="flex rounded-md shadow-xs"
                          international
                          flagComponent={FlagComponent}
                          countrySelectComponent={CountrySelect}
                          inputComponent={PhoneInput}
                          placeholder="8012345679"
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={pending} className="w-full">
                  {pending ? <Loader text="Saving..." /> : "Continue"}
                </Button>
              </form>
            </Form>
          </div>
        )}

        <div>
          <Image
            src={"/assets/waitlist.png"}
            alt="Waitlist soon"
            width={1000}
            height={1000}
            className="size-full object-cover opacity-95
          [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
          [-webkit-mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
        "
          />
        </div>
      </div>
    </div>
  );
};
