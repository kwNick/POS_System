const FeatureCard = ({feature, idx}: {feature: {title: string, description: string}, idx: number}) => {
  return (
    <div key={feature.title} className='w-[clamp(30rem,50vw,50rem)] h-[clamp(20rem,40vh,40rem)] flex flex-col items-center justify-center bg-neutral-surface border-1 border-primary-purple p-5 rounded-lg hover:shadow-lg hover:shadow-neutral-white hover:scale-105 duration-300 '>
      
        <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx}</sup>{feature.title}</h3>
        <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
    </div>
  )
}
export default FeatureCard