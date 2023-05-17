type ColorSelectorProps = {
  color: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const ColorSelector = ({ className, color, onChange }: ColorSelectorProps) => {
  return (
    <label className={className}>
      <input type="radio" name="color" value={color} onChange={onChange} /> {color}
    </label>
  );
};

export default ColorSelector;