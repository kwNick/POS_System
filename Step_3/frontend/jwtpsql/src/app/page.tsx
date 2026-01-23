import BgGradientCta from '@/components/BgGradientCta';
import BgPricingSection from '@/components/BgPricingSection';
import FeaturesSection from '@/components/FeaturesSection';
import LandingFadeIn from '@/components/LandingFadeIn';
import LandingImages from '@/components/LandingImages';
import VideoClient from '@/components/VideoClient';
import { PricingPlans } from '@/lib/lists/Pricing';
import { UseCases } from '@/lib/lists/UseCases';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-[family-name:var(--font-geist-sans)]">

      {/* landing page */}
        <section className="relative h-[110vh] w-full flex flex-col gap-y-25 items-center justify-center">
          <span className='absolute inset-0 w-full h-full bg-neutral-white z-[-10]'/>
          <Image src={'/mesh-gradient.png'} width={400} height={500} alt="mesh-gradient-blue-purple" className='absolute inset-0 w-full h-full z-[-10] [filter:_blur(50px)] mix-blend-color'/>

          <LandingImages />

          <Link href="https://storyset.com/business" className='absolute bottom-0 right-0 text-xs text-neutral-black'>Business illustrations by Storyset</Link>

          <LandingFadeIn />

          {/* <div className='absolute inset-0 bg-gradient-to-t from-0% from-neutral-white to-transparent to-40% pointer-events-none' /> */}
          <div className='absolute inset-0 bg-gradient-to-t from-0% from-neutral-surface to-transparent to-35% pointer-events-none' />
          <div className='absolute inset-0 bg-gradient-to-t from-0% from-primary-blue/35 to-transparent to-25% pointer-events-none' />
          <div className='absolute inset-0 bg-gradient-to-t from-0% from-neutral-black/50 to-transparent to-15% pointer-events-none' />
        </section>

        {/* UseCases section */}
        <section className="h-[140vh] w-full flex flex-col gap-y-8 items-center justify-center py-[2.5%] ">
          {/* <Image src={'/stacked-steps.svg'} width={400} height={500} alt="coolbackground" className='absolute top-0 left-0 w-full h-full z-[-10]'/> */}

          <div className='w-full h-[15vh] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
              Use Cases
            </h1>
            <h2 className="text-neutral-gray text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              We understand your situation.
            </h2>
          </div>

          <div className="flex gap-8 lg:gap-12 items-center justify-center w-4/5 h-4/5">
            {UseCases.map((useCase, idx) => (
              <Link href={"#"} key={useCase.title} className="group relative flex flex-col items-start justify-end w-[clamp(300px,20vw+4rem,500px)] h-[clamp(500px,60vh+4rem,900px)] border-1 border-primary-purple [box-shadow:_2px_2px_3px_2px_var(--primary-purple)] hover:scale-105 hover:[box-shadow:_2px_2px_3px_2px_var(--neutral-white)] duration-300 p-5 rounded-xl cursor-pointer z-10 overflow-hidden">
                <VideoClient idx={idx} />

                <div className='absolute inset-0 rounded-xl bg-gradient-to-t from-0% from-neutral-black to-transparent to-50% pointer-events-none' />

                <div className="absolute inset-0 translate-y-[25%] rounded-xl bg-gradient-to-t from-0% from-neutral-white to-transparent to-50% pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-400" />
                <div className="absolute inset-0 translate-y-[25%] rounded-xl bg-gradient-to-t from-0% from-primary-purple to-transparent to-65% pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-400" />

                <h3 className="relative text-xl font-semibold text-shadow-neutral-black text-shadow-md group-hover:translate-y-[-10px] duration-300 ml-4 mb-4 z-10 overflow-hidden before:absolute before:bottom-[2%] before:left-0 before:w-full before:h-[2%] before:bg-primary-purple before:translate-x-[-100%] group-hover:before:translate-x-[0] before:duration-300">{useCase.title}</h3>
                <p className='text-center text-neutral-gray z-10 group-hover:text-shadow-neutral-black group-hover:text-shadow-md'>{useCase.description}</p>
              </Link>
            ))}
          </div>

        </section>

        {/* Features section */}
        <FeaturesSection />
        
        {/* Pricing section*/}
        <section className="relative h-[140vh] w-full flex flex-col items-center justify-center pt-[2.5%] ">

          <BgPricingSection />

        {/* <div className='absolute inset-0 bg-gradient-to-b from-neutral-white to-transparent opacity-50'/> */}

          <div className='w-full h-[15vh] flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-blue p-5'>
            <h1 className="text-neutral-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-light underline underline-offset-4 decoration-primary-purple decoration-2 translate-x-[10vw] uppercase">
              Pricing
            </h1>
            <h2 className="text-neutral-black text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold translate-x-[10vw]">
              View Our Rates
            </h2>
          </div>

          <div className=' flex items-center justify-center gap-x-6 w-[90%] h-[80%]'>
            {PricingPlans.map((plan, idx) => (
              <div key={plan.name} className={`relative flex flex-col items-center justify-around gap-y-10 w-1/3 h-full ${idx == 0 && 'border-l-2'} border-r-2 border-primary-blue p-10`}>
                <div>
                  <h3 className='text-neutral-white text-4xl xl:text-5xl font-semibold underline underline-offset-4 decoration-primary-blue hover:text-cta'>{plan.name}</h3>
                </div>

                <div className='flex flex-col items-center justify-center gap-y-8'>
                  <p className='group text-primary-blue text-2xl lg:text-3xl xl:text-5xl font-bold underline underline-offset-4 decoration-neutral-gray decoration-2'>
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

                  <ul className='w-full h-full flex flex-col items-start justify-center gap-y-10 lg:gap-y-14 xl:gap-y-16 text-xl lg:text-2xl xl:text-3xl'>
                    {plan.features.map((feature) => (
                      <li key={feature} className='group text-neutral-white'><span className='text-primary-blue group-hover:text-cta'>•</span> {feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className=''>
                  <Link href={'#'} className=' p-5 lg:p-7 xl:p-9 lg:text-lg xl:text-xl  border-1 border-primary-blue rounded-full uppercase hover:bg-neutral-surface hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-cta hover:scale-120 duration-300'>
                  Choose {plan.name}
                </Link>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Closing Section/Call-to-Action */}
        <section className="relative h-[130vh] w-full flex flex-col items-center justify-center ">
          <BgGradientCta />

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='absolute bottom-0 '>
            <path fill="#450693" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='origin-bottom scale-90 absolute bottom-0 translate-y-[15%]'>
            <path fill="#0046ff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>

          <div className='relative w-full flex flex-col gap-y-4 items-center justify-center'>

            <h1 className="text-primary-purple text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-semibold uppercase tracking-widest">
              Get <span className='text-neutral-white font-semibold hover:text-cta-hover hover:text-shadow-sm hover:text-shadow-neutral-white scale-115 duration-500'>Started</span> <br/>
              <span className='text-primary-blue font-semibold hover:text-cta hover:text-shadow-sm hover:text-shadow-primary-blue scale-115 duration-500'>Free</span> Today
            </h1>

            <Link href={'#'} className='mt-5 p-8 border-1 border-primary-purple rounded-full uppercase text-xl lg:text-2xl xl:text-3xl hover:text-cta hover:text-shadow-sm hover:text-shadow-cta hover:shadow-sm hover:shadow-primary-blue hover:scale-118 duration-300'>
              Sign Up
            </Link>
          </div>
        </section> 

    </div>
  );
}
