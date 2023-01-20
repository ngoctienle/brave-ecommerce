import Brand from '../Brand'

export default function Footer() {
  return (
    <footer className='bg-F6F6F6 py-5 font-brave-ecom'>
      <div className='container'>
        <div className='mb-4 flex items-center justify-center'>
          <Brand />
        </div>
        <p className='text-center text-primary-1A162E'>
          ©2023 - Bản quyền thuộc về BraveThinking Ecosystem
        </p>
      </div>
    </footer>
  )
}
