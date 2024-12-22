import React from 'react';
import Image from 'next/image';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface ImagesEmbedProps {
  images: EmbedUrl[];
  isNested?: boolean;
}

const ImagesEmbed: React.FC<ImagesEmbedProps> = ({ images, isNested = false }) => {
  if (!images || images.length === 0) return null;

  return images.length > 1 && !isNested ? (
    <Carousel
      className="w-full max-w-md mx-auto mt-2"
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent className="-ml-2">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-2 basis-3/4 relative">
            <div className="aspect-square w-full h-full relative overflow-hidden rounded-xl">
              <Image
                src={image.url}
                alt={`Embedded image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ) : (
    <div
      className={`mt-2 bg-gray-50 max-h-[360px] overflow-hidden flex items-center justify-center ${
        isNested ? '' : 'rounded-xl border border-gray-50'
      }`}
    >
      <Image
        src={images[0].url}
        alt="Embedded image"
        width={images[0].metadata?.image?.width_px || 500}
        height={images[0].metadata?.image?.height_px || 300}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  );
};

export default ImagesEmbed;
