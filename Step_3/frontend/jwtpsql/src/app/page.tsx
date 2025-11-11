import VideoClient from '@/components/VideoClient';
import { Features } from '@/lib/Features';
import { PricingPlans } from '@/lib/Pricing';
import { UseCases } from '@/lib/UseCases';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-[family-name:var(--font-geist-sans)]">

      {/* landing page */}
        <section className=" h-[100vh] w-full flex flex-col gap-y-25 items-center justify-center">

          <div className='flex flex-col items-center justify-center gap-y-12'>

            <div className="relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase perspective-near transform-3d -rotate-y-[12.5]">
              POS
              <h1 className="absolute top-0 left-[5%] text-cta text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
                POS
              </h1>
              <h1 className="absolute top-0 left-[10%] text-primary-purple text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
                POS
              </h1>
              <h1 className="absolute top-0 left-[15%] text-primary-blue text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-widest uppercase">
                POS
              </h1>
            </div>

            <h2 className="text-neutral-gray text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase">
              Sales never been easier
            </h2>
          </div>

          <div className='flex gap-5 '>
            <Link href={'#'} className='p-4 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-118 duration-300'>
              Get Started
            </Link>

            <Link href={'#'} className='p-4 border-1 border-primary-purple bg-neutral-white rounded-full uppercase text-primary-purple hover:text-cta hover:bg-neutral-gray hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-118 duration-300'>
              Learn More
            </Link>
          </div>
          
        </section>

        {/* UseCases section */}
        <section className="h-[110vh] w-full flex flex-col gap-y-8 items-center justify-center bg-neutral-surface z-[-1]">
          <div className='relative w-full h-[15%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
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

        {/* Features section */}
        <section className=" h-[300vh] w-full flex flex-col items-center justify-center gap-y-8">
          <div className='relative w-full h-[15%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5'>
            <h1 className="text-primary-purple text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw] uppercase">
              Features
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              Everything you need to run your business.
            </h2>
          </div>

            {/* Vertical Scroll */}
          <div className='w-full h-full flex flex-col items-center justify-center gap-y-8 pt-10'>
            {
              Features.slice(0,2).map((feature, idx) => (
                <div key={feature.title} className='w-[85%] h-[85vh] flex flex-col items-start justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                  <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx}</sup>{feature.title}</h3>
                  <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                </div>
              ))
            }

            
          </div>

            {/* Horizontal Scroll */}
            <div className='w-full h-full overflow-x-hidden flex px-auto py-15'>
              <div className='w-max h-full flex items-center justify-around gap-x-8 p-15'>
                  {
                    Features.slice(2,5).map((feature, idx) => (
                      <div key={feature.title} className='w-[85vw] h-[80vh] flex flex-col items-start justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                        <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx + 2}</sup>{feature.title}</h3>
                        <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                      </div>
                    ))
                  }
              </div>
            </div>

        </section>
        
        {/* Pricing section*/}
        <section className=" h-[100vh] w-full flex flex-col items-center justify-center bg-neutral-surface">
          <div className='relative w-full h-[15%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5'>
            <h1 className="text-primary-purple text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light translate-x-[10vw] uppercase">
              Pricing
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              View Our Rates
            </h2>
          </div>

          <div className='bg-neutral-black flex items-center justify-center gap-x-6 w-[90%] h-full'>
            {PricingPlans.map((plan, idx) => (
              <div key={plan.name} className={`relative flex flex-col items-center justify-around gap-y-20 w-1/3 h-full ${idx == 0 && 'border-l-2'} border-r-2 border-primary-blue p-20`}>
                <div>
                  <h3 className='text-primary-blue text-2xl xl:text-3xl font-semibold underline'>{plan.name}</h3>
                </div>

                <div className='flex flex-col items-center justify-center gap-y-10'>
                  <p className='group text-primary-blue text-xl lg:text-2xl xl:text-4xl font-bold underline underline-offset-4 decoration-neutral-gray decoration-2'>
                    <sup className='text-sm text-neutral-gray group-hover:text-cta duration-300'>
                      {plan.price[0]}
                    </sup>
                    {plan.price.substring(1,plan.price.indexOf("/"))}
                    <span className='text-neutral-gray'>
                      {plan.price.charAt(plan.price.indexOf("/"))}
                    </span>
                    <span className='text-sm text-neutral-gray group-hover:text-cta duration-300'>
                      {plan.price.substring(plan.price.indexOf("/")+1)}
                    </span>
                  </p>

                  <ul className='w-full h-full flex flex-col items-start justify-center gap-y-10 text-lg lg:text-xl xl:text-2xl'>
                    {plan.features.map((feature) => (
                      <li key={feature} className='group text-neutral-gray'><span className='text-primary-blue group-hover:text-cta'>•</span> {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className=''>
                  <Link href={'#'} className=' p-3 border-1 border-primary-blue rounded-full uppercase hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-118 duration-300'>
                  Choose Plan
                </Link>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Closing Section/Call-to-Action */}
        <section className="h-[90vh] w-full flex flex-col items-center justify-center border-t-1 border-primary-purple">
          <div className='relative w-full flex flex-col gap-y-4 items-center justify-center'>

            <h1 className="text-primary-purple text-lg md:text-xl lg:text-lg xl:text-3xl 2xl:text-4xl font-semibold uppercase tracking-widest">
              Get <span className='text-neutral-white font-semibold hover:text-cta-hover scale-115 duration-300'>Started</span> <br/>
              <span className='text-primary-blue font-semibold hover:text-cta scale-115 duration-300'>Free</span> Today
            </h1>

            <Link href={'#'} className='mt-5 p-4 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-primary-blue hover:scale-118 duration-300'>
              Sign Up
            </Link>
          </div>
        </section>

    </div>
  );
}
