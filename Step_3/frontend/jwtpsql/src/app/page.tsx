import VideoClient from '@/components/VideoClient';
import { Features } from '@/lib/lists/Features';
import { PricingPlans } from '@/lib/lists/Pricing';
import { UseCases } from '@/lib/lists/UseCases';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-[family-name:var(--font-geist-sans)]">

      {/* landing page */}
        <section className=" h-[110vh] w-full flex flex-col gap-y-25 items-center justify-center">

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
        <section className="h-[110vh] w-full flex flex-col gap-y-8 items-center justify-center py-[2.5%]">
          <div className='relative w-full h-[15%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
              Use Cases
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              We understand your situation.
            </h2>
          </div>

          <div className="flex gap-8 lg:gap-12 items-center justify-center w-4/5 h-4/5">
            {UseCases.map((useCase, idx) => (
              <Link href={"#"} key={useCase.title} className="group relative flex flex-col items-start justify-end min-w-1/8 max-w-1/5 h-4/5 border-1 border-primary-purple [box-shadow:_2px_2px_3px_2px_var(--primary-purple)] hover:scale-105 duration-300 p-5 rounded-xl cursor-pointer z-10">
                <VideoClient idx={idx} />

                <div className='absolute inset-0 rounded-xl bg-gradient-to-t from-0% from-neutral-black to-transparent to-50% pointer-events-none' />
                
                <h3 className="relative text-xl font-semibold group-hover:translate-y-[-10px] duration-300 ml-4 mb-4 z-10 overflow-hidden before:absolute before:bottom-[2%] before:left-0 before:w-full before:h-[2%] before:bg-primary-purple before:translate-x-[-100%] group-hover:before:translate-x-[0] before:duration-300">{useCase.title}</h3>
                <p className='text-center text-neutral-gray z-10'>{useCase.description}</p>
              </Link>
            ))}
          </div>

        </section>

        {/* Features section */}
        <section className=" h-[300vh] w-full flex flex-col items-center justify-center gap-y-8 py-[2.5%]">
          <div className='relative w-full h-[15%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5'>
            <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
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
                <div key={feature.title} className='w-[90%] h-[85vh] flex flex-col items-start justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                  <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx}</sup>{feature.title}</h3>
                  <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                </div>
              ))
            }
          </div>

          {/* Horizontal Scroll */}
          <div className='w-full h-full overflow-x-hidden flex '>
            <div className='w-max h-full flex items-center justify-around gap-x-8 px-[5%] '>
                {
                  Features.slice(2,5).map((feature, idx) => (
                    <div key={feature.title} className='w-[90vw] h-[80vh] flex flex-col items-start justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
                      <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx + 2}</sup>{feature.title}</h3>
                      <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
                    </div>
                  ))
                }
            </div>
          </div>

        </section>
        
        {/* Pricing section*/}
        <section className=" h-[110vh] w-full flex flex-col items-center justify-center pt-[2.5%]">
          <div className='relative w-full h-[15%] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5'>
            <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
              Pricing
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              View Our Rates
            </h2>
          </div>

          <div className='bg-neutral-black flex items-center justify-center gap-x-6 w-[90%] h-full'>
            {PricingPlans.map((plan, idx) => (
              <div key={plan.name} className={`relative flex flex-col items-center justify-around gap-y-10 w-1/3 h-full ${idx == 0 && 'border-l-2'} border-r-2 border-primary-blue p-10`}>
                <div>
                  <h3 className='text-neutral-white text-2xl xl:text-3xl font-semibold underline underline-offset-4 decoration-primary-blue'>{plan.name}</h3>
                </div>

                <div className='flex flex-col items-center justify-center gap-y-8'>
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
                      <li key={feature} className='group text-neutral-white'><span className='text-primary-blue group-hover:text-cta'>•</span> {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className=''>
                  <Link href={'#'} className=' p-3 border-1 border-primary-blue rounded-full uppercase hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-118 duration-300'>
                  Choose {plan.name}
                </Link>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Closing Section/Call-to-Action */}
        <section className="h-[110vh] w-full flex flex-col items-center justify-center border-t-1 border-primary-purple">
          <div className='relative w-full flex flex-col gap-y-4 items-center justify-center'>

            <h1 className="text-primary-purple text-lg md:text-xl lg:text-lg xl:text-3xl 2xl:text-4xl font-semibold uppercase tracking-widest">
              Get <span className='text-neutral-white font-semibold hover:text-cta-hover hover:text-shadow-sm hover:text-shadow-neutral-white scale-115 duration-500'>Started</span> <br/>
              <span className='text-primary-blue font-semibold hover:text-cta hover:text-shadow-sm hover:text-shadow-primary-blue scale-115 duration-500'>Free</span> Today
            </h1>

            <Link href={'#'} className='mt-5 p-4 border-1 border-primary-purple rounded-full uppercase hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-primary-blue hover:scale-118 duration-300'>
              Sign Up
            </Link>
          </div>
        </section>

    </div>
  );
}
