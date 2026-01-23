import AdminDashboard from "@/components/AdminDashboard";
import DeleteButton from "@/components/DeleteButton";

export default function AdminPage(){

    return(
         <div className="p-4 lg:p-8 xl:p-12 flex flex-col gap-y-5 justify-center min-h-[85vh] w-[calc(100%-2rem)] font-[family-name:var(--font-geist-sans)] text-xl">
            <AdminDashboard />

            <div className="mb-6 mt-10 lg:mt-14 flex flex-col gap-y-4 lg:gap-y-6 xl:gap-y-8 rounded-lg bg-neutral-surface p-6 lg:p-10 xl:p-12 shadow-md">
                <div>
                    <h1 className="text-3xl font-semibold">
                        DeleteUser...
                    </h1>
                </div>
                <div>
                    <p>
                        To delete a user, you can use the <code>DELETE</code> HTTP method on the endpoint:
                    </p>DELETE on http://localhost:8080/api/delete`
                    <p>
                        Note: Make sure to handle this operation carefully as it will permanently remove the user and their associated data.
                    </p>
                </div>
                <div>
                    <DeleteButton />
                </div>
            </div>
        </div>
    );
}