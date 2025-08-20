import { useState } from 'react';

import Divider from '@/components/layout/Divider';
import Panel from '@/components/ui/Panel';
import { cn } from '@/utils/cn';

const demoVendors = [
  { name: 'Gmail', id: 1, icon: 'G' },
  { name: 'Thunderbird', id: 2, icon: 'T' },
  { name: 'Outlook', id: 3, icon: 'O' },
];

const demoFolders = [
  { name: 'Inbox', id: 1 },
  { name: 'Sent', id: 2 },
  { name: 'Drafts', id: 3 },
  { name: 'Spam', id: 4 },
  { name: 'Trash', id: 5 },
];

type Mail = {
  subject: string;
  id: number;
  sender_mail: string;
  receivedAt: {
    date: string;
    time: string;
  };
  content: string;
};

const demoMails = [
  {
    subject: 'Hello World',
    id: 1,
    sender_mail: 'alice@example.com',
    receivedAt: {
      date: '2023-10-01',
      time: '10:10',
    },
    content: 'This is a test email.',
  },
  {
    subject: 'Meeting Reminder',
    id: 2,
    sender_mail: 'bob@example.com',
    receivedAt: {
      date: '2023-10-02',
      time: '11:20',
    },
    content: "Don't forget our meeting tomorrow.",
  },
  {
    subject: 'Newsletter',
    id: 3,
    sender_mail: 'charlie@example.com',
    receivedAt: {
      date: '2023-10-03',
      time: '09:15',
    },
    content: 'Check out our latest updates.',
  },
];

const Home: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState(demoVendors[0]);
  const [selectedFolder, setSelectedFolder] = useState(demoFolders[0]);
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);

  return (
    <div className="flex h-full w-full items-start gap-3">
      <Panel className="flex h-full w-fit flex-col gap-5 px-3 py-5">
        {demoVendors.map((vendor) => (
          <button
            key={vendor.id}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-base-100"
            onClick={() => setSelectedVendor(vendor)}
          >
            <span className="text-3xl">{vendor.icon}</span>
          </button>
        ))}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-100">
          <span className="pb-3 text-5xl">+</span>
        </div>
      </Panel>
      <Panel className="flex h-full w-fit gap-3 px-5">
        <div className="flex min-w-60 flex-col items-center">
          <h3 className="my-5 w-full rounded-lg bg-base-100/70 py-3 text-center text-4xl font-bold">
            {selectedVendor.name}
          </h3>
          <ul className="flex w-full flex-col">
            {demoFolders.map((folder, i) => (
              <li className="w-full" key={folder.id}>
                <button
                  className={cn(
                    'btn w-full rounded py-3 text-3xl btn-ghost',
                    selectedFolder.id === folder.id && 'bg-base-100/40'
                  )}
                  onClick={() => setSelectedFolder(folder)}
                >
                  {folder.name}
                </button>
                {i !== demoFolders.length - 1 && (
                  <Divider direction="horizontal" color="secondary" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <Divider direction="vertical" color="primary" />
        <div className="flex min-w-80 flex-col">
          <h3 className="my-5 w-full rounded-lg bg-base-100/70 py-3 text-center text-4xl font-bold">
            {selectedFolder.name}
          </h3>
          <ul className="flex max-h-full flex-col overflow-y-auto rounded-sm bg-base-100">
            {demoMails.map((mail, i) => (
              <li key={mail.id}>
                <button
                  className="flex w-full cursor-pointer flex-col px-4 py-2"
                  onClick={() => setSelectedMail(mail)}
                >
                  <p className="text-end text-sm text-primary">
                    {mail.receivedAt.time}
                  </p>
                  <h4 className="text-start text-xl font-semibold">
                    {mail.subject}
                  </h4>
                  <p className="text-start text-sm text-primary">
                    {mail.sender_mail}
                  </p>
                </button>
                {i !== demoMails.length - 1 && (
                  <Divider direction="horizontal" color="secondary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
      {selectedMail && (
        <Panel className="w-full flex-1">
          <div className="mb-5 flex flex-col items-start gap-3 px-10 py-4">
            <h2 className="text-3xl font-bold">{selectedMail.subject}</h2>
            <p className="text-lg">From: {selectedMail.sender_mail}</p>
            <p className="text-lg">
              Received at: {selectedMail.receivedAt.date}{' '}
              {selectedMail.receivedAt.time}
            </p>
          </div>
          <div className="rounded-b-md bg-base-100 px-16 py-10">
            <p className="text-lg">{selectedMail.content}</p>
          </div>
        </Panel>
      )}
    </div>
  );
};

export default Home;
