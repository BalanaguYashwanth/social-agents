import { NeynarAPIClient } from '@neynar/nodejs-sdk';

let neynarClient: NeynarAPIClient | null = null;

export function getNeynarClient(): NeynarAPIClient {
  if (!neynarClient) {
    neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY as string);
  }
  return neynarClient;
}
