import React from 'react';
// import { EmbeddedCast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import CastEmbed from './cast-embed';

interface CastEmbedsProps {
  castEmbeds?: any[];
  isNested?: boolean;
}

const CastEmbeds: React.FC<CastEmbedsProps> = ({
  castEmbeds,
  isNested = false, // default value is false
}) => {
  if (!castEmbeds || castEmbeds.length === 0) return null;

  return <CastEmbed embeds={castEmbeds} isNested={isNested} />;
};

export default CastEmbeds;
