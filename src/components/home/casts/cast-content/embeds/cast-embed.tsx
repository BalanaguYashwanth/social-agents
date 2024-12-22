import React from 'react';
import { EmbedUrl } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import ImagesEmbed from './image-embed';
import NookSocialEmbed from './nook-social-embed';
import GenericLinkEmbed from './generic-link-embed';
import RecastCard from './recast-card';

interface CastEmbedProps {
  embeds: any[];
  isNested: boolean;
}

const CastEmbed: React.FC<CastEmbedProps> = ({ embeds, isNested }) => {
  if (!embeds || embeds.length === 0) return null;

  const imageEmbeds = embeds.filter(
    (embed): embed is EmbedUrl =>
      'url' in embed && embed.metadata?.content_type?.startsWith('image/') === true
  );

  if (imageEmbeds.length > 0) {
    return <ImagesEmbed images={imageEmbeds} isNested={isNested} />;
  }

  if (isNested) return null;

  // Handle other embed types
  for (const embed of embeds) {
    if ('url' in embed) {
      if (embed.metadata?.content_type === 'text/html') {
        return <GenericLinkEmbed embed={embed} />;
      }
    }
    if ('cast_id' in embed) {
      return <RecastCard castId={embed.cast_id} isNested={true} />;
    }
  }

  return null;
};

export default CastEmbed;
