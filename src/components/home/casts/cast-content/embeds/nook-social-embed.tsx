import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface NookSocialEmbedProps {
  url: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Array<{ url: string; width: string; height: string }>;
}

const NookSocialEmbed: React.FC<NookSocialEmbedProps> = ({
  url,
  ogTitle,
  ogDescription,
  ogImage,
}) => {
  return (
    <Card className="p-4 max-w-md">
      {ogImage && ogImage[0] && (
        <Image
          src={ogImage[0].url}
          alt={ogTitle || 'Embedded content'}
          width={parseInt(ogImage[0].width) || 1200}
          height={parseInt(ogImage[0].height) || 630}
          layout="responsive"
          objectFit="cover"
          className="rounded-t-lg"
        />
      )}
      <CardContent className="pt-4">
        <h4 className="font-bold text-lg">{ogTitle}</h4>
        <p className="text-sm text-gray-600 mt-2">{ogDescription}</p>
        {/* <Link
          href={url}
          className='text-blue-500 hover:underline mt-2 inline-block'
          target='_blank'
          rel='noopener noreferrer'
        >
          View on Nook Social
        </Link> */}
      </CardContent>
    </Card>
  );
};

export default NookSocialEmbed;
