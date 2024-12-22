import React from 'react';
import { formatDistance } from 'date-fns';

interface CustomCastTimestampProps {
  timestamp: string | number | Date;
}

const CustomCastTimestamp: React.FC<CustomCastTimestampProps> = ({ timestamp }) => {
  const timeAgo = formatDistance(new Date(timestamp), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  // Customize the output
  const formattedTime = timeAgo
    .replace('about ', '')
    .replace('less than a minute ago', 'just now')
    .replace('minute', 'm')
    .replace('hour', 'h')
    .replace('day', 'd')
    .replace('month', 'mo')
    .replace('year', 'y');

  return (
    <div>
      <p className="text-sm md:text-base font-normal opacity-[40%] w-fit min-w-12  ">
        {formattedTime}
      </p>
    </div>
  );
};

export default CustomCastTimestamp;
