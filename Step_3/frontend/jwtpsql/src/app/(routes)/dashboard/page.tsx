import DeleteButton from "@/components/DeleteButton";
import ProfileDashboard from "@/components/ProfileDashboard";

export default function ProfilePage() {

  return (
    <div className="p-4 flex flex-col gap-y-5 justify-center min-h-[85vh] w-[calc(100%-2rem)] font-[family-name:var(--font-geist-sans)] text-xl">
      <div className="p-10 lg:p-14 xl:p-16 flex flex-col items-center justify-center gap-y-6 w-[clamp(300px, 100%, 800px)] ">
          <ProfileDashboard />
        
        <div className="mb-6 mt-10 lg:mt-14 flex flex-col gap-y-4 lg:gap-y-6 xl:gap-y-8 w-[clamp(300px, 100%, 800px)] rounded-lg bg-neutral-surface p-6 lg:p-10 xl:p-12 shadow-md">
          <div>
            <h1 className="text-3xl font-semibold">DeleteUser...</h1>
          </div>
          <div>
            <p>To delete a user, use the <code>DELETE</code> HTTP method on the endpoint: <code>DELETE http://localhost:8080/api/delete</code></p>
            <p>Note: This will permanently remove the user and all associated data.</p>
          </div>
          <div>
            <DeleteButton />
          </div>
        </div>
      </div>
      
    </div>
  );
}
