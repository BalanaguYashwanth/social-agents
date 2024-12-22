import React, { useState } from 'react';
import Dialog, { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { XIcon } from 'lucide-react';
import './trade-form.css';

const TradeForm = ({
  walletAddress,
  balance,
  credits,
  sendSol,
  refundSol,
}: {
  walletAddress: any;
  balance: any;
  credits: any;
  sendSol: any;
  refundSol: any;
}) => {
  const [open, setOpen] = useState(true);
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);

  const handleBuy = () => {
    sendSol(buyAmount);
  };

  const handleSell = () => {
    refundSol(sellAmount);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent style={{ maxHeight: '85vh', maxWidth: '90vw', overflowY: 'auto' }}>
        <DialogHeader className="flex border-b border-gray-200 pb-2 flex-row justify-between items-center">
          <DialogTitle>Trade Agent</DialogTitle>
          <button onClick={() => setOpen(false)} className="absolute top-2 right-5">
            <XIcon className="w-15 h-15" />
          </button>
        </DialogHeader>

        <div
          className="flex flex-row justify-between items-center border border-gray-200 rounded-lg p-2"
          style={{
            marginBottom: '10px',
            maxWidth: '500px',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <h3>Wallet: {balance.toFixed(2)} SOL</h3>
          <h3>Coins: {credits}</h3>
        </div>

        {walletAddress && (
          <div>
            <div className="grid grid-cols-3 gap-4">
              <p>Buy </p>
              <input
                type="number"
                placeholder="Sol Amount"
                onChange={(e) => setBuyAmount(Number(e.target.value))}
              />
              <button className=" text-black border border-gray-400 rounded" onClick={handleBuy}>
                Buy
              </button>
            </div>
            <div className="border border-gray-200 m-4"></div>
            <div className="grid grid-cols-3 gap-4">
              <p>Sell</p>
              <input
                type="number"
                placeholder="Coins"
                onChange={(e) => setSellAmount(Number(e.target.value))}
              />
              <button className=" text-black border border-gray-400 rounded" onClick={handleSell}>
                Sell
              </button>
            </div>
            <p className="text-sm text-gray-500 my-4">Note: 1 coins = 0.1 SOL</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TradeForm;
