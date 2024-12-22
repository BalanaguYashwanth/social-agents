'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer'; // Adjust the import path as needed
import { Bookmark, EyeOff, UserMinus, UserX, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import Icon from '@/components/ui/icon';

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface CastOptionsDrawerProps {
  castHash: string;
}

const CastOptionsDrawer: React.FC<CastOptionsDrawerProps> = ({ castHash }) => {
  const actions: Action[] = [
    {
      label: 'Save',
      icon: <Bookmark size={20} />,
      onClick: () => console.log('Save', castHash),
    },
    {
      label: 'Not interested',
      icon: <EyeOff size={20} />,
      onClick: () => console.log('Not interested', castHash),
    },
    {
      label: 'Mute',
      icon: <UserMinus size={20} />,
      onClick: () => console.log('Mute', castHash),
    },
    {
      label: 'Block',
      icon: <UserX size={20} />,
      onClick: () => console.log('Block', castHash),
      color: 'text-red-500',
    },
    {
      label: 'Report',
      icon: <AlertTriangle size={20} />,
      onClick: () => console.log('Report', castHash),
      color: 'text-red-500',
    },
    {
      label: 'Copy link',
      icon: <LinkIcon size={20} />,
      onClick: () => console.log('Copy link', castHash),
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="p-0 rounded-full hover:bg-gray-100">
          <Icon name="menuHorizontal" className="w-4 h-4" color="text-gray-400" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
        <div className="max-w-md mx-auto">
          {actions.map((action, index) => (
            <DrawerClose asChild key={index}>
              <button
                onClick={action.onClick}
                className={`w-full flex items-center justify-between p-3 ${
                  action.color ? action.color : 'text-gray-700'
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                <span className="font-medium">{action.label}</span>
                {action.icon}
              </button>
            </DrawerClose>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CastOptionsDrawer;
