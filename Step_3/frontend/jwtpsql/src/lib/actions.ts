'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    location: z.string()
});

export type State = {
    errors?: {
        name?: string[];
        location?: string[];
    } | undefined;
    message?: string | null;
}

const CreateShop = FormSchema.omit({ id: true });
export async function createShop(prevState: State, formData: FormData) {
    const validatedData = CreateShop.safeParse({
        name: formData.get("name"),
        location: formData.get("location")
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: "Validation failed. Please check the form fields. Add Shop failed."
        };
    }

    const { name, location } = validatedData.data;

    try {
        await fetch('');

    } catch (error) {
        return {
            errors: undefined,
            message: "Database Error: Failed to Add Shop."+error
        };

    }
    revalidatePath('/admin');
    redirect('/admin');
}