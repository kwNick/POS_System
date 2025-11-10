import { UseCases } from '@/lib/UseCases';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[120vh] font-[family-name:var(--font-geist-sans)]">

      {/* landing page */}
        <section className="relative h-[100vh] w-full flex flex-col gap-y-5 items-center justify-center">
          <div className='absolute w-1/2 h-1/2 top-[50vh-50%] left-[50vw-50%] rounded-lg bg-primary-purple blur-2xl perspective-origin-bottom perspective-midrange transform-3d -rotate-x-35 z-[-3] mix-blend-color'/>
          <div className='absolute w-1/2 h-1/2 top-[50vh-50%] left-[50vw-50%] rounded-lg bg-neutral-black blur-2xl perspective-origin-bottom perspective-midrange transform-3d -rotate-x-35 z-[-2] mix-blend-color'/>
          <div className='absolute w-1/2 h-1/2 top-[50vh-50%] left-[50vw-50%] rounded-lg bg-white blur-3xl perspective-origin-bottom perspective-midrange transform-3d -rotate-x-35 z-[-1] mix-blend-color'/>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase">
            Sales never been easier
          </h1>

          <div className='flex gap-5 '>
            <Link href={'#'} className='p-4 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-md hover:text-shadow-cta hover:shadow-md hover:shadow-cta hover:scale-118 duration-300'>
              Get Started
            </Link>

            <Link href={'#'} className='p-4 border-1 border-primary-purple bg-neutral-white rounded-full uppercase text-primary-purple hover:text-cta hover:bg-neutral-gray hover:text-shadow-md hover:text-shadow-cta hover:shadow-md hover:shadow-cta hover:scale-118 duration-300'>
              Learn More
            </Link>
          </div>
          
        </section>

        {/* info section */}
        <section className="h-[110vh] w-full flex flex-col gap-y-8 items-center justify-center">
          <div className='relative w-full flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-primary-purple text-left text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw] uppercase">
              Use Cases
            </h1>
            <h2 className="text-neutral-gray text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw]">
              We understand your situation.
            </h2>
          </div>

          <div className="flex gap-8 lg:gap-12 items-center justify-center w-4/5 h-4/5">
            {UseCases.map((useCase, idx) => (
              <div key={useCase.title} className="relative flex flex-col items-start justify-end min-w-1/8 max-w-1/5 h-4/5 border-1 border-primary-purple [box-shadow:_2px_2px_3px_2px_var(--primary-purple)] p-5 rounded-xl">
                <video
                  src={`videos/pos-${idx+1}.mp4`}
                  // controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl absolute inset-0 w-full h-full object-cover z-[-1] opacity-80 brightness-75"
                />
                
                <h3 className="text-xl font-semibold ml-4 mb-4">{useCase.title}</h3>
                <p className='text-center text-neutral-gray'>{useCase.description}</p>
              </div>
            ))}
          </div>

        </section>

        {/* features section */}
        <section className="h-[240vh] w-full flex flex-col items-center justify-center ">
          <div className='relative w-full flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-primary-purple text-left text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw] uppercase">
              Features
            </h1>
            <h2 className="text-neutral-gray text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw]">
              Everything you need to run your business.
            </h2>
          </div>

          <div>

          </div>
          
        </section>
        
        {/* info section*/}
        <section className="min-h-[110vh] w-full flex flex-col items-center justify-center">
          <div className='relative w-full flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-primary-purple text-left text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw] uppercase">
              Pricing
            </h1>
            <h2 className="text-neutral-gray text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw]">
              View Our Options.
            </h2>
          </div>

          <div>

          </div>

        </section>

        {/* closing section/call-to-action */}
        <section className="min-h-[90vh] w-full flex flex-col items-center justify-center">
          <div className='relative w-full flex flex-col gap-y-4 items-center justify-center p-5'>
            <h1 className="text-primary-purple text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold uppercase">
              Get <span className='text-primary-purple font-semibold hover:text-cta-hover duration-300'>Started</span> <br/>
              <span className='text-primary-blue font-semibold hover:text-cta duration-300'>Free</span> Today
            </h1>
            <h2 className="text-neutral-gray text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light">
              View Our Options.
            </h2>

            <Link href={'#'} className='mt-5 p-4 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-md hover:text-shadow-cta hover:shadow-md hover:shadow-cta hover:scale-118 duration-300'>
              Sign Up
            </Link>
          </div>
        </section>

    </div>
  );
}
