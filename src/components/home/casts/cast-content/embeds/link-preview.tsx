import React from 'react';
import LinkPreviewWrapper from '../../../../common/LinkPreviewWrapper';

interface LinkPreviewProps {
  url: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  return <LinkPreviewWrapper url={url} />;
};

export default LinkPreview;
