"use client";

import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(30, "First name must be less than 30 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(30, "Last name must be less than 30 characters"),

  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email."),

  phoneNumber: z.string().min(1, "Mobile number is required"),

  serviceNeed: z
    .string()
    .min(1, "Service need is required")
    .max(100, "Must be less than 100 characters"),

  serviceDetails: z.string().min(1, "Service details are required"),

  seviceStatus: z
    .string()
    .min(1, "Service status is required")
    .max(20, "Must be less than 20 characters"),
});
