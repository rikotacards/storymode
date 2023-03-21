import React from 'react';
import Image from 'next/image'

import testImage from '../../../public/test.jpg'
export const PostImageContent: React.FC = () => {
  return (
    <div>
      <Image width={469} alt='michael' src={testImage}/>
    </div>
  )
}
