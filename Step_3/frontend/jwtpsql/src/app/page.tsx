import VideoClient from '@/components/VideoClient';
import { Features } from '@/lib/Features';
import { PricingPlans } from '@/lib/Pricing';
import { UseCases } from '@/lib/UseCases';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[120vh] font-[family-name:var(--font-geist-sans)]">

      {/* landing page */}
        <section className="relative h-[100vh] w-full flex flex-col gap-y-25 items-center justify-center">
          <div className='absolute w-1/2 h-1/2 top-[50vh-50%] left-[50vw-50%] rounded-lg bg-primary-purple blur-2xl perspective-origin-bottom perspective-midrange transform-3d -rotate-x-35 z-[-3] mix-blend-color'/>
          <div className='absolute w-1/2 h-1/2 top-[50vh-50%] left-[50vw-50%] rounded-lg bg-neutral-black blur-2xl perspective-origin-bottom perspective-midrange transform-3d -rotate-x-35 z-[-2] mix-blend-color'/>
          <div className='absolute w-1/2 h-1/2 top-[50vh-50%] left-[50vw-50%] rounded-lg bg-white blur-3xl perspective-origin-bottom perspective-midrange transform-3d -rotate-x-35 z-[-1] mix-blend-color'/>

          <div className='flex flex-col items-center justify-center gap-y-12'>
            <h1 className=" text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
            POS
          </h1>
          <h1 className="absolute inline-block top-0 left-[-10%] text-primary-purple text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
            POS
          </h1>
          <h2 className="text-neutral-gray text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase">
            Sales never been easier
          </h2>
          </div>

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
        <section className="h-[110vh] w-full flex flex-col gap-y-8 items-center justify-center bg-neutral-surface z-[-1]">
          <div className='relative w-full flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-primary-purple text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw] uppercase">
              Use Cases
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
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
                  // onLoadedMetadata={(e) => (e.currentTarget.playbackRate=0.5)}
                  className="rounded-xl absolute inset-0 w-full h-full object-cover z-[-1] opacity-80 brightness-75"
                />
                {/* <VideoClient idx={idx} /> */}
                
                <h3 className="text-xl font-semibold ml-4 mb-4">{useCase.title}</h3>
                <p className='text-center text-neutral-gray'>{useCase.description}</p>
              </div>
            ))}
          </div>

        </section>

        {/* features section */}
        <section className=" h-[240vh] w-full flex flex-col items-center justify-center">
          <div className='relative w-full h-[10%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple'>
            <h1 className="text-primary-purple text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw] uppercase">
              Features
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              Everything you need to run your business.
            </h2>
          </div>

          <div className='w-full h-full flex flex-col items-center justify-center gap-y-20 p-10'>
            {
              Features.map((feature) => (
                <div key={feature.title} className='w-3/4 h-1/5 flex flex-col items-start justify-center border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-cta hover:scale-105 duration-300'>
                  <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'>{feature.title}</h3>
                  <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                </div>
              ))
            }
          </div>

        </section>
        
        {/* info section*/}
        <section className="h-[110vh] w-full flex flex-col items-center justify-center bg-neutral-surface">
          <div className='relative w-full flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-primary-purple text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw] uppercase">
              Pricing
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              View Our Rates
            </h2>
          </div>

          <div className='flex items-center justify-center w-full h-full p-10'>
            {PricingPlans.map((plan) => (
              <div key={plan.name} className='relative flex flex-col items-center justify-start w-1/3 h-4/5 bg-neutral-black border-r-1 border-primary-purple p-5'>
                <h3 className='text-primary-purple text-xl xl:text-2xl font-semibold mb-10'>{plan.name}</h3>
                <p className='text-xl lg:text-2xl xl:text-4xl font-bold mb-6'>{plan.price}</p>
                <ul className='w-full flex flex-col items-start justify-center gap-y-6 text-lg lg:text-xl xl:text-2xl mb-6'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='text-neutral-gray'>• {feature}</li>
                  ))}
                </ul>
                <Link href={'#'} className='mt-auto p-3 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-md hover:text-shadow-cta hover:shadow-md hover:shadow-cta hover:scale-118 duration-300'>
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>

        </section>

        {/* closing section/call-to-action */}
        <section className="min-h-[90vh] w-full flex flex-col items-center justify-center">
          <div className='relative w-full flex flex-col gap-y-4 items-center justify-center p-5'>

            <h1 className="text-primary-purple text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold uppercase tracking-widest">
              Get <span className='text-neutral-white font-semibold hover:text-cta-hover duration-300'>Started</span> <br/>
              <span className='text-primary-blue font-semibold hover:text-cta duration-300'>Free</span> Today
            </h1>
            {/* <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
              View Our Options.
            </h2> */}

            <Link href={'#'} className='mt-5 p-4 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-md hover:text-shadow-cta hover:shadow-md hover:shadow-cta hover:scale-118 duration-300'>
              Sign Up
            </Link>
          </div>
        </section>

    </div>
  );
}
