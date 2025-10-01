import { useEffect, useState } from 'react';

type Props = {
  title: string;
  label: string;
  contentType: 'word' | 'address';
  mode: 'add' | 'edit';
  onSubmit: (word: string, level: number) => void;
  placeholder?: {
    content: string;
    level: number;
  };
};

const contentMap = {
  word: {
    type: 'text',
    placeholder: '単語を入力',
    errorMessage: '単語は1文字以上で入力してください',
  },
  address: {
    type: 'email',
    placeholder: 'メールアドレスを入力',
    errorMessage: '有効なメールアドレスを入力してください',
  },
};

const PriorityForm: React.FC<Props> = ({
  title,
  label,
  contentType,
  mode,
  onSubmit,
  placeholder,
}) => {
  const [content, setContent] = useState<string | undefined>(
    placeholder?.content
  );
  const [level, setLevel] = useState<number | undefined>(placeholder?.level);
  const _contentType = contentMap[contentType];

  // プレースホルダーが変更された時に状態を更新
  useEffect(() => {
    setContent(placeholder?.content);
    setLevel(placeholder?.level);
  }, [placeholder]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!content || !level) return;
    onSubmit(content, level);
    setContent(undefined);
    setLevel(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <label className="label">{label}</label>
          <div className="flex flex-col gap-1">
            <input
              type={_contentType.type}
              value={content || ''}
              onChange={(e) => setContent(e.target.value)}
              placeholder={_contentType.placeholder}
              className="validator input"
              required
              minLength={1}
              title={_contentType.errorMessage}
            />
            <p className="validator-hint">{_contentType.errorMessage}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="label">レベル</label>
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={level || ''}
              onChange={(e) => setLevel(Number(e.target.value))}
              min={1}
              className="validator input"
              required
              title="レベルは1以上の整数で入力してください"
            />
            <p className="validator-hint">
              登録する単語のレベルは1以上の整数で入力してください
            </p>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {mode === 'add' ? '追加' : '更新'}
        </button>
      </div>
    </form>
  );
};

export default PriorityForm;
