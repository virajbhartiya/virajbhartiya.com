import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row w-full shrink-0 items-center justify-center py-2 px-4 md:px-6">
      <p className="">
        Made with love by <Link to={'/'}>Viraj Bhartiya</Link>
      </p>
    </footer>
  )
}
