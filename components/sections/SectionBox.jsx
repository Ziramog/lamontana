const SectionBox = ({ children, className = '', id }) => {
  return (
    <div className={`bg-[#2A2A2A] w-full ${className}`} id={id}>
      {children}
    </div>
  );
};

export default SectionBox;