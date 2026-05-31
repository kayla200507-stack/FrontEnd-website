type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={`bg-[#3D5DA8] text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};
