import { Link } from 'react-router-dom'
import Brand from '../Brand'

export default function AuthHeader() {
  return (
    <header className='bg-FAFAFD py-4 lg:py-5'>
      <div className='container'>
        <Link to='/' className='flex max-w-max items-center'>
          <Brand />
        </Link>
      </div>
    </header>
  )
}
