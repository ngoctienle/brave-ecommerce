import { Link } from 'react-router-dom'
import paths from 'src/constants/paths'

export default function AsideFilter() {
  return (
    <div className='py-4'>
      <Link to={paths.home} className='flex items-center font-bold'>
        <span>Tất cả danh mục</span>
      </Link>
      <ul>
        <li className='py-2 pl-2'>
          <Link to={paths.home}></Link>
        </li>
      </ul>
    </div>
  )
}
