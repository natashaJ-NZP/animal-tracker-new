import React from 'react';
import Link from "next/link"
import { DrupalMenuLinkContent } from "next-drupal"
import { useRouter } from "next/router"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'   

interface MenuHeaderProps {
  items: DrupalMenuLinkContent[]
}

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}


export function Header({items, ...props}: MenuHeaderProps) {
  return (
    <div>
    {/*DRUPAL MAIN NAVIGATION */ }
    <nav {...props}>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.url} passHref>
              <a className="text-sm font-semibold transition-colors hover:bg-black hover:underline">
                {item.title}
              </a>
            </Link>
          </li>
        ))}
    </nav>
    </div>               
  );
}
 