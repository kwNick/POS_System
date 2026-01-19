import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  
  return (
    <div className="p-5 lg:p-8 xl:p-12 w-full flex items-start justify-around h-[125vh]">

      <div className="relative p-5 w-[clamp(400px,2rem+38vw,700px)] h-[clamp(700px,2rem+60vh,1000px)] flex flex-col items-center justify-center gap-y-4 lg:gap-y-6 xl:gap-y-8 bg-neutral-surface shadow-md shadow-neutral-white rounded-md ">

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-blue to-accent-purple opacity-10 rounded-md z-0 pointer-events-none"/>

        <div className="text-left flex flex-col gap-y-4 lg:gap-y-6 xl:gap-y-8">
          <div className="group relative duration-300 py-2 px-4 perspective-near transform-3d text-4xl lg:text-6xl xl:text-7xl font-bold">
            <h1 className="group-hover:animate-rotatey-repeat">
                POS
            </h1>
            <h1 className="opacity-0 absolute top-[0%] left-[5%] text-primary-blue py-2 px-4 group-hover:opacity-100 duration-300 group-hover:animate-rotatey-repeat" >
                POS
            </h1>
            <h1 className="opacity-0 absolute top-0 left-[10%] text-primary-purple py-2 px-4 group-hover:opacity-100 duration-300 group-hover:animate-rotatey-repeat" >
                POS
            </h1>
            <h1 className="opacity-0 absolute top-0 left-[15%] text-cta py-2 px-4 group-hover:opacity-100 duration-300 group-hover:animate-rotatey-repeat" >
                POS
            </h1>
          </div>
        </div>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold">Get Back To Your Sales!</h2>

        <div className="flex flex-col items-start justify-center gap-y-6 lg:gap-y-8 text-md lg:text-lg xl:text-xl ">
          <p className="group"><span className='text-primary-blue group-hover:text-cta'>•</span> View inventory!</p>
          <p className="group"><span className='text-primary-blue group-hover:text-cta'>•</span> Manage customers!</p>
          <p className="group"><span className='text-primary-blue group-hover:text-cta'>•</span> Track sales!</p>
          <p className="group"><span className='text-primary-blue group-hover:text-cta'>•</span> Generate reports!</p>
        </div>
      
      </div>

      <LoginForm />
    
    </div>
  );
}
