import { Link } from 'react-router-dom'
import cls from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2

export default function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotsAfter = false
    let dotsBefore = false

    const renderDotsBefore = (index: number) => {
      if (!dotsBefore) {
        dotsBefore = true
        return (
          <button key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </button>
        )
      }
      return null
    }

    const renderDotsAfter = (index: number) => {
      if (!dotsAfter) {
        dotsAfter = true
        return (
          <button key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotsAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotsBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotsAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotsBefore(index)
        }
        return (
          <button
            key={index}
            className={cls('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Prev</button>
      {renderPagination()}
      <button className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>Next</button>
    </div>
  )
}
