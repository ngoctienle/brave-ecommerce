import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
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
                <a
                  href='/'
                  target='_self'
                  className='mt-5 max-w-max rounded-10 bg-secondary-77DAE6 py-4 px-8 text-center text-white'>
                  Take me Home!
                </a>
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

    return this.props.children
  }
}
