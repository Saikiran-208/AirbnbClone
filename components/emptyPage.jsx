'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const EmptyPage = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset = true,
  resetLabel = "Remove all filters",
  onReset
}) => {
  const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center text-center'>
      <div className="p-4 bg-gray-100 rounded-full mb-4">
        <Search className="w-8 h-8 text-gray-500" />
      </div>
      <h3 className='text-2xl font-bold text-gray-900'>
        {title}
      </h3>
      <p className='text-gray-500 max-w-sm mb-6'>
        {subtitle}
      </p>
      {showReset && (
        <Button
          variant="outline"
          onClick={onReset || (() => router.push('/'))}
          className="border-black text-black hover:bg-gray-100 px-6 py-6 text-lg rounded-lg"
        >
          {resetLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyPage
