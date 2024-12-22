import React from 'react';
import LinkPreviewWrapper from '../../../../common/LinkPreviewWrapper';

interface GenericLinkEmbedProps {
  embed: {
    url: string;
  };
}

const GenericLinkEmbed: React.FC<GenericLinkEmbedProps> = ({ embed }) => {
  return <LinkPreviewWrapper url={embed.url} />;
};

export default GenericLinkEmbed;
