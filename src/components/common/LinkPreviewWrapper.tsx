import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from '../ui/icon';

interface LinkPreviewWrapperProps {
  url: string;
}

interface PreviewData {
  title: string;
  description: string;
  image: string;
}

const LinkPreviewWrapper: React.FC<LinkPreviewWrapperProps> = ({ url }) => {
  const [data, setData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Failed to fetch preview');
        const previewData: PreviewData = await response.json();
        setData(previewData);
      } catch (err) {
        console.error('Error fetching link preview:', err);
        setError('Failed to fetch link preview');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url]);

  const domain = new URL(url).hostname;

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-start p-0 rounded-xl mt-2 overflow-hidden border-2 h-20 border-gray-100 bg-gray-50">
        <div className="w-full p-4">
          <p className="text-xs text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-row items-center justify-start p-0 rounded-xl mt-2 overflow-hidden border-2 h-20 border-gray-100 bg-gray-50">
        <div className="w-full p-4">
          <p className="text-xs text-gray-600">{domain}</p>
          <p className="text-xs text-red-500">{error || 'Failed to load preview'}</p>
        </div>
      </div>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="flex flex-row items-center justify-start p-0 rounded-xl mt-2 overflow-hidden border-[3px] h-20 border-gray-100 bg-white">
        {data.image ? (
          <div className="flex items-center justify-between bg-gray-100 h-20 min-w-20 w-20">
            <Image
              src={data.image}
              alt={data.title || url}
              width={400}
              height={400}
              objectFit="cover"
              className="object-cover h-full"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center bg-gray-100 h-20 min-w-20 w-20">
            <Icon name="globe" className="w-8 h-8" color="text-gray-200" />
          </div>
        )}
        <div className="w-full p-4">
          {data.title && <p className="text-xs font-semibold line-clamp-1">{data.title}</p>}
          {data.description && (
            <p className="text-xs text-gray-600 line-clamp-1">{data.description}</p>
          )}
          <div className="flex flex-row gap-1 items-center justify-start">
            <Icon
              name="linkSlant"
              className="w-[14px] h-[14px]"
              color="text-gray-400"
              strokeWidth={1.5}
            />
            <span className="font-normal text-xs text-gray-400">{domain}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default LinkPreviewWrapper;
