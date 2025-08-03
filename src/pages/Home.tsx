import { useState } from 'react';
import Divider from '../components/layout/Divider';
import Panel from '../components/ui/Panel';
import { cn } from '../utils/cn';

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
    <div className="flex gap-3 items-start w-full h-full">
      <Panel className="flex flex-col gap-5 w-fit h-full px-3 py-5">
        {demoVendors.map((vendor) => (
          <button
            key={vendor.id}
            className="rounded-lg bg-base-100 w-16 h-16 flex items-center justify-center"
            onClick={() => setSelectedVendor(vendor)}
          >
            <span className="text-3xl">{vendor.icon}</span>
          </button>
        ))}
        <div className="rounded-full bg-base-100 w-16 h-16 flex items-center justify-center">
          <span className="text-5xl pb-3">+</span>
        </div>
      </Panel>
      <Panel className="flex gap-3 w-fit h-full px-5">
        <div className="flex flex-col items-center min-w-60">
          <h3 className="text-4xl font-bold my-5 py-3 bg-base-100/70 rounded-lg w-full text-center">
            {selectedVendor.name}
          </h3>
          <ul className="flex flex-col w-full">
            {demoFolders.map((folder, i) => (
              <li className="w-full" key={folder.id}>
                <button
                  className={cn(
                    'btn btn-ghost w-full text-3xl rounded py-3',
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
        <div className="flex flex-col min-w-80">
          <h3 className="text-4xl font-bold my-5 py-3 bg-base-100/70 rounded-lg w-full text-center">
            {selectedFolder.name}
          </h3>
          <ul className="flex flex-col rounded-sm bg-base-100 max-h-full overflow-y-auto">
            {demoMails.map((mail, i) => (
              <li key={mail.id}>
                <button
                  className="w-full flex flex-col px-4 py-2 cursor-pointer"
                  onClick={() => setSelectedMail(mail)}
                >
                  <p className="text-sm text-primary text-end">
                    {mail.receivedAt.time}
                  </p>
                  <h4 className="text-xl font-semibold text-start">
                    {mail.subject}
                  </h4>
                  <p className="text-sm text-primary text-start">
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
        <Panel className="flex-1 w-full">
          <div className="flex flex-col items-start gap-3 mb-5 px-10 py-4">
            <h2 className="text-3xl font-bold">{selectedMail.subject}</h2>
            <p className="text-lg">From: {selectedMail.sender_mail}</p>
            <p className="text-lg">
              Received at: {selectedMail.receivedAt.date}{' '}
              {selectedMail.receivedAt.time}
            </p>
          </div>
          <div className="bg-base-100 px-16 py-10 rounded-b-md">
            <p className="text-lg">{selectedMail.content}</p>
          </div>
        </Panel>
      )}
    </div>
  );
};

export default Home;
