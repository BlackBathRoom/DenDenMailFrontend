import { useState } from 'react';

import Form from '@/components/ui/Form';

type Props = {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

const ChatInput: React.FC<Props> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'メッセージを入力してください...',
}) => {
  const [message, setMessage] = useState<string>('');

  const send = (): void => {
    const trimMessage = message.trim();
    if (trimMessage && !disabled) {
      onSendMessage(trimMessage);
      setMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    send();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="flex gap-2 p-4 border-t border-base-300"
    >
      <textarea
        value={message}
        onChange={(e): void => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="textarea textarea-bordered flex-1 resize-none min-h-[2.5rem] max-h-32"
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="btn btn-primary"
      >
        送信
      </button>
    </Form>
  );
};

export default ChatInput;
