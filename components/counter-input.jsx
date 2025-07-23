import { CircleMinus, CirclePlus } from 'lucide-react';
import React from 'react'
import { useCallback } from 'react';

function Counter({value,onChange}) {
    const onAdd = useCallback(()=>{
        onChange(value + 1)
    }, [value, onChange]);
    const onReduce = useCallback(()=>{
        if (value === 1) return;
        onChange(value - 1)
    }, [value, onChange]);
  return (
    <div className='flex flex-col items-center w-fit bg-gray-200 p-4 gap-2 rounded-lg border-2 border-gray-300'>
      <div className='cursor-pointer' onClick={onAdd}>
        <CirclePlus/>
      </div>
      {value}
      <div className='cursor-pointer' onClick={onReduce}>
        <CircleMinus/>
      </div>
    </div>
  )
}

export default Counter
