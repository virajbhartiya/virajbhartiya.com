
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { shareIcons, routeList } from '@/data/navbarData'
import { UnderlineHover } from '../custom/UnderlineHover'

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const location = useLocation()


  const handleMenuClick = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="flex items-center justify-between pb-4">
      <div className="flex flex-col gap-2">
        <Link to={''}>
          <UnderlineHover text='virajbhartiya.com'/>
        </Link>
        <div className="flex gap-4">
          {shareIcons.map((shareIcon, index) => (
            <Link key={index} to={shareIcon.link}>
              {shareIcon.icon}
            </Link>
          ))}
        </div>
      </div>
      <nav className="hidden sm:flex gap-4 sm:gap-6">
        {routeList.map(({ href, label }) => (
          <Link key={label} to={href}>
            <Button
              variant="link"
              className={location.pathname === href ? 'accent' : ''}
            >
              {label}
            </Button>
          </Link>
        ))}
      </nav>
      <span className="flex lg:hidden">
        <Sheet open={isOpen} onOpenChange={handleMenuClick}>
          <SheetTrigger className="px-2" onClick={handleMenuClick}>
            <Menu className="flex lg:hidden h-5 w-5">
              <span className="sr-only">Menu Icon</span>
            </Menu>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle className="text-start accent font-light text-base">
                virajbhartiya.com
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-4 items-start">
              {routeList.map(({ href, label }) => (
                <Link
                  key={label}
                  to={href}
                  onClick={handleCloseMenu}
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  <Button
                    variant="link"
                    className={location.pathname === href ? 'accent' : ''}
                  >
                    {label}
                  </Button>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </span>
    </header>
  )
}

export default Header
