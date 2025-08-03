import Panel from '../components/ui/Panel';

const demoVendors = [
  { name: 'G', id: 1 },
  { name: 'T', id: 2 },
  { name: 'O', id: 3 },
];

const Home: React.FC = () => {
  return (
    <div className="flex gap-3 items-start w-full h-full">
      <Panel className="flex flex-col gap-5 w-fit h-full px-3 py-5">
        {demoVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="rounded-lg bg-base-100 w-16 h-16 flex items-center justify-center"
          >
            <span className="text-3xl">{vendor.name}</span>
          </div>
        ))}
        <div className="rounded-full bg-base-100 w-16 h-16 flex items-center justify-center">
          <span className="text-5xl pb-3">+</span>
        </div>
      </Panel>
      <Panel className="flex">span</Panel>
    </div>
  );
};

export default Home;
