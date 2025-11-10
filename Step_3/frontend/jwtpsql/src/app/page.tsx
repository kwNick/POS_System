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
            <Link href={'#'} className='uppercase'>
              Get Started
            </Link>
            <Link href={'#'} className='uppercase'>
              Learn More
            </Link>
          </div>
          
        </section>

        {/* info section */}
        <section className="min-h-[110vh] w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold underline">
            POS System
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Manage your sales, inventory, and customers all in one place.
          </h2>

          {/* <div className="flex gap-5 ">
            <div className="w-40 h-80 bg-neutral-surface rounded-lg -rotate-20">
              <Image src={""} width={300} height={600} alt="Picture of POS UI" />
            </div>
            <div className="w-40 h-80 bg-neutral-surface rounded-lg -rotate-20 -translate-x-20 -translate-y-5">
              <Image src={""} width={300} height={600} alt="Picture of POS UI" />
            </div>
          </div> */}

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
