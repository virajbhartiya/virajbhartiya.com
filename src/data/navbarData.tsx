import { IRoute, IShareIcon } from '@/types/interface'
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react'

export const routeList: IRoute[] = [
  {
    href: '/',
    label: '/',
  },
  {
    href: '/projects',
    label: '/projects',
  },
  {
    href: '/courses',
    label: '/courses',
  },
]

export const shareIcons: IShareIcon[] = [
  {
    icon: <Github size={16} />,
    link: '#',
  },
  {
    icon: <Linkedin size={16} />,
    link: '#',
  },
  {
    icon: <Twitter size={16} />,
    link: '#',
  },
  {
    icon: <Youtube size={16} />,
    link: '#',
  },
]
