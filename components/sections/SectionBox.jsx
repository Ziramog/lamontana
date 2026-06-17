const SectionBox = ({ children, className = '', id }) => {
  return (
    <div className={`bg-[#2A2A2A] border-y border-white/5 w-full ${className}`} id={id}>
      {children}
    </div>
  );
};

export default SectionBox;