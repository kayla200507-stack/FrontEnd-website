export const DashboardHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="text-blue-800">
      <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
      <p className="text-sm md:text-base">{description}</p>
    </div>
  );
};
