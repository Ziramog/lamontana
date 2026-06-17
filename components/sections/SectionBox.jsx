const SectionBox = ({ children, className = '', id }) => {
  return (
    <div className={`bg-transparent w-full ${className}`} id={id}>
      {children}
    </div>
  );
};

export default SectionBox;