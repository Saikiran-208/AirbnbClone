import React from 'react'
import useCountries from '@/hooks/useCountries'
import Select from 'react-select';
import Flag from 'react-world-flags';

function CountrySelect({ value, onChange }) {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Select a country"
        inClearable
        options={getAll()}
        value={value}
        onChange={value => onChange(value)}
        formatOptionLabel={(option) => (
          <div className='flex items-center gap-2 py-1'>
            <Flag code={option.value} className="w-5" />
            {option.label}, {option.region}
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg"
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#f43f5e',
          }
        })}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menu: (base) => ({ ...base, zIndex: 9999 })
        }}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      />
    </div>
  )
}

export default CountrySelect
