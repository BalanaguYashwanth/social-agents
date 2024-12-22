'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LinkPreview from './embeds/link-preview';
import { Skeleton } from '@/components/ui/skeleton';

interface CastTextProps {
  text?: string;
  mentionedProfiles?: MentionedProfile[];
  maxChars?: number;
  castHash?: string;
  className?: string;
  loading?: boolean;
  readMore?: boolean;
}

interface MentionedProfile {
  fid: number;
  username: string;
}

const CastText: React.FC<CastTextProps> = ({
  text,
  mentionedProfiles,
  maxChars = 220,
  castHash,
  className,
  loading = false,
  readMore = true,
}) => {
  const { content, needsTruncation, lastLink } = useMemo(() => {
    if (!text) {
      return { content: [], needsTruncation: false, lastLink: null };
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const usernameRegex = /(@\w+)/g;
    const hashtagRegex = /(#\w+)/g;
    const channelRegex = /(?<!\S)(\/[\w-]+)/g;
    const dollarTagRegex = /(\$\w+)/g;
    const newlineRegex = /(\n)/g;

    const matches = [
      ...Array.from(text.matchAll(urlRegex)),
      ...Array.from(text.matchAll(usernameRegex)),
      ...Array.from(text.matchAll(hashtagRegex)),
      ...Array.from(text.matchAll(channelRegex)),
      ...Array.from(text.matchAll(dollarTagRegex)),
      ...Array.from(text.matchAll(newlineRegex)),
    ].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

    let lastLink: string | null = null;
    let processedParts: (string | React.ReactNode)[] = [];
    let charCount = 0;
    let lastIndex = 0;

    const shortenUrl = (url: string) => {
      const maxLength = 30;
      return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
    };

    for (let i = 0; i < matches.length && charCount < maxChars; i++) {
      const match = matches[i];
      if (match.index !== undefined) {
        // Add text before the match
        const preMatchText = text.slice(lastIndex, match.index);
        const remainingChars = maxChars - charCount;
        if (preMatchText.length > remainingChars) {
          processedParts.push(preMatchText.slice(0, remainingChars));
          charCount += remainingChars;
          break;
        }
        processedParts.push(preMatchText);
        charCount += preMatchText.length;

        const [fullMatch] = match;
        if (charCount + fullMatch.length > maxChars) {
          break;
        }

        if (fullMatch.match(urlRegex)) {
          if (i === matches.length - 1) {
            lastLink = fullMatch;
          } else {
            processedParts.push(
              <Link
                key={`link-${i}`}
                href={fullMatch}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenUrl(fullMatch)}
              </Link>
            );
          }
        } else if (fullMatch.match(usernameRegex)) {
          processedParts.push(
            <Link
              key={`username-${i}`}
              href={`/user/${fullMatch.slice(1)}`}
              className="text-blue-500 hover:underline"
            >
              {fullMatch}
            </Link>
          );
        } else if (fullMatch.match(hashtagRegex)) {
          processedParts.push(
            <Link
              key={`hashtag-${i}`}
              href={`/hashtag/${fullMatch.slice(1)}`}
              className="text-blue-500 hover:underline"
            >
              {fullMatch}
            </Link>
          );
        } else if (fullMatch.match(channelRegex)) {
          processedParts.push(
            <span key={`channel-${i}`} className="text-green-500">
              {fullMatch}
            </span>
          );
        } else if (fullMatch.match(dollarTagRegex)) {
          processedParts.push(
            <Link
              key={`dollartag-${i}`}
              href={`/tag/${fullMatch.slice(1)}`}
              className="text-yellow-500 hover:underline"
            >
              {fullMatch}
            </Link>
          );
        } else if (fullMatch.match(newlineRegex)) {
          processedParts.push(<br key={`newline-${i}`} />);
        }

        charCount += fullMatch.length;
        lastIndex = match.index + fullMatch.length;
      }
    }

    // Add any remaining text after the last match, up to maxChars
    if (lastIndex < text.length && charCount < maxChars) {
      const remainingText = text.slice(lastIndex, lastIndex + (maxChars - charCount));
      processedParts.push(remainingText);
      charCount += remainingText.length;
    }

    const needsTruncation = text.length > maxChars;

    return {
      content: processedParts,
      needsTruncation,
      lastLink,
    };
  }, [text, mentionedProfiles, maxChars]);

  if (loading) {
    return (
      <div className={cn('text-sm', className)}>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!text) {
    return <div className="" />;
  }

  return (
    <div className={cn('text-sm md:text-base', className)}>
      {readMore
        ? content
        : text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < text.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
      {lastLink && <LinkPreview url={lastLink} />}
      {needsTruncation && readMore && castHash && (
        <Link
          as={'span'}
          href={`/cast/${castHash}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          {' '}
          ...Read more
        </Link>
      )}
    </div>
  );
};

export default CastText;
