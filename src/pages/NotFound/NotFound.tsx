import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='container grid h-screen grid-cols-1 gap-12 md:grid-cols-12'>
      <div className='md:col-span-6'>
        <div className='relative h-full'>
          <div className='flex h-full flex-col items-center justify-center md:items-start'>
            <h1 className='fs-30 my-2 text-center font-bold text-primary-1A162E md:text-start'>
              Looks like you have found the doorway to the great nothing
            </h1>
            <p className='my-2 text-center text-primary-1A162E md:text-start'>
              Sorry about that! Please visit our hompage to get where you need to go.
            </p>
            <Link
              to='/'
              className='mt-5 max-w-max rounded-10 bg-secondary-77DAE6 py-4 px-8 text-center text-white'>
              Take me Home!
            </Link>
          </div>
          <img
            src='/assets/404.png'
            alt='Page Not Found'
            title='Page Not Found'
            className='absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-70'
          />
        </div>
      </div>
      <div className='relative hidden md:col-span-6 md:block'>
        <img
          src='/assets/404-Description.png'
          alt='Page Not Found'
          title='Page Not Found'
          className='absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-50'
        />
      </div>
    </div>
  )
}
