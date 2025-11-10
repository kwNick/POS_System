import { UseCases } from '@/lib/UseCases';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[120vh] font-[family-name:var(--font-geist-sans)]">

      {/* landing page */}
        <section className="min-h-[100vh] w-full flex flex-col gap-y-5 items-center justify-center">

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase">
            Sales never been easier
          </h1>

          <div className='flex gap-5 '>
            <Link href={'#'} className='uppercase hover:text-cta duration-300'>
              Get Started
            </Link>

            <Link href={'#'} className='uppercase hover:text-cta duration-300'>
              Learn More
            </Link>
          </div>
          
        </section>

        {/* info section */}
        <section className="min-h-[110vh] w-full flex flex-col gap-y-8 items-center justify-center">
          <div className='w-full flex flex-col gap-y-4 items-start justify-center border-b-2 border-primary-purple p-5'>
            <h1 className="text-primary-purple text-left text-base md:text-lg lg:text-xl xl:text-2xl ">
              Use Cases
            </h1>
            <h2 className="text-neutral-gray text-sm md:text-base lg:text-lg xl:text-xl">
              We've got what your looking for.
            </h2>
          </div>

          <div className="flex gap-8 items-center justify-center w-3/4 h-4/5">
            {UseCases.map((useCase) => (
              <div key={useCase.title} className=" min-w-1/8 max-w-1/5 h-4/5 border-1 border-primary-purple [box-shadow:_3px_3px_3px_3px_var(--primary-purple)] p-5 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className='text-neutral-gray'>{useCase.description}</p>
              </div>
            ))}
          </div>

        </section>

        {/* features section */}
        <section className="min-h-[240vh] w-full flex flex-col items-center justify-center ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            POS System
          </h1>
        </section>
        
        {/* info section*/}
        <section className="min-h-[110vh] w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            POS System
          </h1>
        </section>

        {/* closing section/call-to-action */}
        <section className="min-h-[90vh] w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            POS System
          </h1>
        </section>

    </div>
  );
}
