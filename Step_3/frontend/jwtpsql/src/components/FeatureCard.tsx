const FeatureCard = ({feature, idx}: {feature: {title: string, description: string}, idx: number}) => {
  return (
    <div key={feature.title} className='w-[90vw] h-[85vh] flex flex-col items-center justify-center bg-neutral-black border-1 border-primary-purple p-5 rounded-lg hover:shadow-md hover:shadow-primary-blue hover:scale-105 duration-300 overflow-hidden'>
        <h3 className='text-xl lg:text-2xl xl:text-3xl font-semibold mb-4'><sup className='text-sm'>{idx}</sup>{feature.title}</h3>
        <p className='text-lg lg:text-xl xl:text-2xl text-neutral-gray'>{feature.description}</p>
    </div>
  )
}
export default FeatureCard