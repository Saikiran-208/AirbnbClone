import { uploadToBlob } from '@/utils/uploadToBlob'
import React from 'react'

function ImageUploadComponent() {
const handleImageUpload = async (e) => {
   const file = e.target.files[0]
   const response = await uploadToBlob(file)
   console.log(response)
}
  return (
    <div>
        <label > 
            <div className='py-5 border-2 border-dashed flex justify-center items-center text-lg cursor-pointer' >
                Upload an image
            </div>
            <input type="file" onChange={handleImageUpload} hidden/></label>
     
    </div>
  )
}

export default ImageUploadComponent
