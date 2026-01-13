import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 min-h-[120vh]">

      <div className="p-10 lg:p-12 xl:p-14 w-3/5 flex flex-col items-center justify-center gap-y-10 bg-neutral-surface ">
        <div className="">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            Login
          </h2>
        </div>

        <LoginForm />

      </div>
    </div>
  );
}
