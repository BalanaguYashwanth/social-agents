'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dialog, { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PlusIcon, XIcon } from 'lucide-react';
import './create-agent-form.css';
import toast, { Toaster } from 'react-hot-toast';

const AgentDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('');
  const [bio, setBio] = useState([]);
  const [lore, setLore] = useState([]);

  const launchAgent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading('Processing...');

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const twitterUsername = (document.getElementById('twitterUsername') as HTMLInputElement).value;

    const requestData = {
      name,
      username,
      twitterUsername,
      language,
      bio,
      lore,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ELIZA_AGENT_API}/launch-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      toast.dismiss();
      if (data?.error) {
        setResponse(data?.error);
      }
      if (data?.message) {
        const profileUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/${username.toLowerCase()}`;
        setResponse(
          `<p> URL is <a href="${profileUrl}">${profileUrl}</a> <br/> and ${data?.message} </p>`
        );
        toast.success(`Agent created successfully. Generate posts in sometime.`);
        setTimeout(() => {
          router.push(profileUrl);
        }, 4000);
      }
    } catch (error) {
      console.log('launch agent error', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <Toaster /> */}
      <DialogTrigger asChild>
        <div className="h-100 bg-gray-200 rounded-full p-3">
          <PlusIcon onClick={() => setOpen(true)} className="w-15 h-15" />
        </div>
      </DialogTrigger>
      <DialogContent style={{ maxHeight: '85vh', maxWidth: '90vw', overflowY: 'auto' }}>
        <DialogHeader className="flex border-b border-gray-200 pb-2 flex-row justify-between items-center">
          <DialogTitle>Create Agent</DialogTitle>
          <button onClick={() => setOpen(false)} className="absolute top-2 right-5">
            <XIcon className="w-15 h-15" />
          </button>
        </DialogHeader>
        <form
          onSubmit={launchAgent}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <input type="text" placeholder="Enter name of agent" id="name" required />
          <input type="text" placeholder="Enter username of agent" id="username" required />
          <input
            type="text"
            placeholder="Enter twitter username (e.g, elonmusk)"
            id="twitterUsername"
            required
          />

          <select id="language" onChange={(e) => setLanguage(e.target.value)} required>
            <option value="">Select language mode</option>
            <option value="en_US-male-medium">US English Male</option>
            <option value="fen_US-hfc_female-medium">US English Female</option>
          </select>

          <textarea
            placeholder="Enter bio (e.g., I am Russian, and developer)"
            rows={5}
            id="bio"
            onChange={(e) => setBio(e.target.value.split(',') as any)}
            required
          ></textarea>

          <textarea
            placeholder="Enter lore (background, personality, characteristics)"
            rows={5}
            id="lore"
            onChange={(e) => setLore(e.target.value.split(',') as any)}
            required
          ></textarea>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Launch
          </button>
        </form>
        {response && (
          <div
            className="text-center"
            style={{ color: 'green' }}
            dangerouslySetInnerHTML={{ __html: response }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgentDialog;
