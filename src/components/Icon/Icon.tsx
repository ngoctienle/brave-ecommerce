export function Logo(Props: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>) {
  return (
    <svg {...Props} viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
      <path
        {...Props}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.79999 0H27.2L32 8V30.4C32 31.2837 31.2837 32 30.4 32H1.6C0.716344 32 0 31.2837 0 30.4V8L4.79999 0ZM2.79886 8H29.2011L25.8411 2.4H6.15888L2.79886 8ZM8 12.4C8.66272 12.4 9.2 12.9373 9.2 13.6C9.2 17.3555 12.2445 20.4 16 20.4C19.7555 20.4 22.8 17.3555 22.8 13.6C22.8 12.9373 23.3373 12.4 24 12.4C24.6627 12.4 25.2 12.9373 25.2 13.6C25.2 18.681 21.081 22.8 16 22.8C10.919 22.8 6.8 18.681 6.8 13.6C6.8 12.9373 7.33728 12.4 8 12.4Z'
      />
    </svg>
  )
}

export function ArrowLeft(Props: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>) {
  return (
    <svg {...Props} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        {...Props}
        d='M15.5 19L8.5 12L15.5 5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export function ArrowRight(Props: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>) {
  return (
    <svg {...Props} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        {...Props}
        d='M8.5 5L15.5 12L8.5 19'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export function ArrowDown(Props: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>) {
  return (
    <svg {...Props} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        {...Props}
        d='M19 8.5L12 15.5L5 8.5'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export function Check(Props: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>) {
  return (
    <svg {...Props} fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
    </svg>
  )
}

export function User(Props: React.SVGProps<SVGSVGElement> & React.SVGProps<SVGPathElement>) {
  return (
    <svg {...Props} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='Iconly/Light/Profile'>
        <g id='Profile'>
          <path
            {...Props}
            id='Stroke 1'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.9848 15.3457C8.11716 15.3457 4.8143 15.9305 4.8143 18.2724C4.8143 20.6143 8.0962 21.22 11.9848 21.22C15.8524 21.22 19.1543 20.6343 19.1543 18.2933C19.1543 15.9524 15.8733 15.3457 11.9848 15.3457Z'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            id='Stroke 3'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.9848 12.0059C14.5229 12.0059 16.58 9.94779 16.58 7.40969C16.58 4.8716 14.5229 2.81445 11.9848 2.81445C9.44667 2.81445 7.38858 4.8716 7.38858 7.40969C7.38001 9.93922 9.42382 11.9973 11.9524 12.0059H11.9848Z'
            {...Props}
            strokeWidth='1.42857'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </g>
    </svg>
  )
}
