import RegisterForm from "@/components/RegisterForm";


export default function RegisterPage() {

    return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 min-h-[120vh]">
      <div className="p-10 lg:p-12 xl:p-14 flex flex-col items-center justify-center gap-y-10 w-4/5 bg-neutral-surface">
          <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            Register
          </h2>
        </div>

        <RegisterForm />
      </div>
    </div>
    );
}
