import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form
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
    </form>
  );
};

export default ChatInput;
