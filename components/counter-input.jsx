import { CircleMinus, CirclePlus } from 'lucide-react';
import React from 'react'
import { useCallback } from 'react';

function Counter({ value, onChange }) {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange]);
  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1)
  }, [value, onChange]);
  return (

    <div className='flex items-center gap-4'>
      <div
        onClick={onReduce}
        className={`
          w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer transition
          hover:opacity-80
          ${value === 1 ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        <CircleMinus size={20} className="text-gray-600" />
      </div>
      <div className="font-light text-xl text-gray-600 w-4 text-center">
        {value}
      </div>
      <div
        onClick={onAdd}
        className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:opacity-80 transition"
      >
        <CirclePlus size={20} className="text-gray-600" />
      </div>
    </div>
  )

}

export default Counter
