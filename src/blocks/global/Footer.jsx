import React from 'react'
import footer from "@/globalData/footer.json"
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='w-screen bg-white px-6 py-4 text-black border border-t-red-500'>
        <div className="flex gap-2">
        {footer.bottomNavLinks.map((link) => {
          return (
            <div>
              <Link href={link.link}>
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}
