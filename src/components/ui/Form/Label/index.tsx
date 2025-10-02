export type Props = {
  children: React.ReactNode;
};

const Label: React.FC<Props> = ({ children }) => {
  return <label className="label">{children}</label>;
};

export default Label;
