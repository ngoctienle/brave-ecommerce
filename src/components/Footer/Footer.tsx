import Brand from '../Brand'

export default function Footer() {
  return (
    <footer className='bg-FAFAFD py-5 font-brave-ecom'>
      <div className='container'>
        <div className='mb-2 flex items-center justify-center lg:mb-4'>
          <Brand />
        </div>
        <p className='fs-14 text-center text-primary-1A162E lg:fs-16'>
          ©2023 - Bản quyền thuộc về BraveThinking Ecosystem
        </p>
      </div>
    </footer>
  )
}
