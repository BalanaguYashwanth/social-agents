import { useState, useEffect } from 'react';
import * as web3 from '@solana/web3.js';
import bs58 from 'bs58';
import { toast, Toaster } from 'react-hot-toast';
import { LAMPORTS_PER_SOL, Connection, PublicKey } from '@solana/web3.js';
import TradeForm from '../trade-form/trade-form';
import { getAPICredits, sellAPICredits, updateAPICredits } from '@/utils/trade.action';

const WalletConnect = ({
  ownerFid,
  userFid,
  username,
}: {
  ownerFid: number;
  userFid: any;
  username: string;
}) => {
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const [walletAddress, setWalletAddress] = useState(null);
  const [solBalance, setSolBalance] = useState(0);
  const [amountToSend, setAmountToSend] = useState('');
  const [credits, setCredits] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState(
    process.env.NEXT_PUBLIC_SOL_RECIPIENT_ADDRESS
  );

  // Function to connect to Phantom wallet
  const connectPhantomWallet = async () => {
    if ('solana' in window) {
      const wallet = window.solana as any;
      try {
        await wallet.connect();
        const address = wallet.publicKey.toString();
        setWalletAddress(address);
        fetchSolBalance(address);
      } catch (err) {
        console.log('Error connecting Phantom wallet:', err);
      }
    } else {
      alert('Please install Phantom wallet.');
    }
  };

  // Fetch the SOL balance of the wallet
  const fetchSolBalance = async (address: web3.PublicKeyInitData) => {
    if (address) {
      const balance = await connection.getBalance(new PublicKey(address));
      setSolBalance(balance / LAMPORTS_PER_SOL);
      if (balance / LAMPORTS_PER_SOL < 0.000000001) {
        alert('You have insufficient balance to trade.');
      }
    }
  };

  useEffect(() => {
    const fetchCredits = async () => {
      const credits = await getAPICredits({ userFid, ownerFid });
      setCredits(credits || 0);
    };
    fetchCredits();
  }, [userFid, ownerFid]);

  const sendSol = async (amountToSend: any) => {
    try {
      if (amountToSend < 0.1) {
        alert('You need to send at least 0.1 SOL');
        return;
      }
      if (!('solana' in window)) {
        alert('Please install Phantom wallet.');
        return;
      }
      toast.loading('Processing...');
      // Get the wallet adapter
      const wallet = window.solana as any;

      if (!wallet || !wallet.publicKey) {
        throw new Error('Please connect your wallet!');
      }

      if (!walletAddress || !recipientAddress || !amountToSend) {
        throw new Error('Please provide all the fields.');
      }

      // Create transaction
      const transaction = new web3.Transaction();

      // Add recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      // Set fee payer
      transaction.feePayer = wallet.publicKey;

      // Create transfer instruction
      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(walletAddress),
        toPubkey: new web3.PublicKey(recipientAddress),
        lamports: LAMPORTS_PER_SOL * amountToSend,
      });

      transaction.add(sendSolInstruction);

      // Request signature from wallet
      const signed = await wallet.signTransaction(transaction);

      // Send and confirm transaction
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      console.log('Transaction successful:', signature);
      if (signature) {
        const response = (await updateAPICredits({
          userFid,
          ownerFid,
          amount: amountToSend,
        })) as any;
        console.log('response', response);
        toast.dismiss();
        if (response?.credits) {
          toast.success(`Tx successful. Total ${response.credits} coins added.`);
          setCredits(Number(credits) + Number(response.credits));
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      }
      return signature;
    } catch (err) {
      toast.dismiss();
      console.error('Error sending SOL:', err);
      throw err;
    }
  };

  const refundSol = async (creditsAmount: any) => {
    try {
      if (creditsAmount > credits) {
        toast.error('You have insufficient coins to sell.');
        return;
      }
      toast.loading('Processing...');
      const calculateRefundAmount = creditsAmount / 10;
      const secretKey = bs58.decode(process.env.NEXT_PUBLIC_SOL_PRIVATE_KEY || '');
      var from = web3.Keypair.fromSecretKey(secretKey);
      var to = new web3.PublicKey(walletAddress as any);
      var transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: from.publicKey,
          toPubkey: to,
          lamports: web3.LAMPORTS_PER_SOL * calculateRefundAmount,
        })
      );
      // Sign transaction, broadcast, and confirm
      var signature = await web3.sendAndConfirmTransaction(connection, transaction, [from]);
      console.log('SIGNATURE', signature);
      if (signature) {
        toast.success('Transaction successful');
        const response = await sellAPICredits({
          userFid,
          ownerFid,
          creditsAmount,
        });
        toast.dismiss();
        if (response?.credits) {
          toast.success(`Tx successful. Total ${response.credits} remaining coins.`);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        toast.error('Transaction failed');
      }
    } catch (err) {
      toast.dismiss();
      console.error('Error refunding SOL:', err);
      throw err;
    }
  };

  return (
    <div className="space-y-4">
      {/* <Toaster /> */}
      {!walletAddress && (
        <button
          className="my-2 px-2 py-1 text-black border border-black rounded text-sm"
          onClick={connectPhantomWallet}
        >
          Connect wallet to trade
        </button>
      )}
      {walletAddress && (
        <div>
          {/* <h3>Wallet Address: {walletAddress}</h3> */}
          <h4>Balance: {solBalance?.toFixed(2)} SOL</h4>
          <h3>
            {`${username}Coins`}: {credits}
          </h3>
        </div>
      )}

      {walletAddress && solBalance > 0 && (
        <TradeForm
          walletAddress={walletAddress}
          balance={solBalance}
          credits={credits}
          sendSol={sendSol}
          refundSol={refundSol}
        />
      )}
    </div>
  );
};

export default WalletConnect;
