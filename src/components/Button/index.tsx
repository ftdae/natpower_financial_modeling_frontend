import clsx from 'clsx';

export default function Index({
  label,
  onClick,
  className,
  children,
  disabled,
  ...props
}: any) {
  return (
    <button
      className={clsx(
        'border border-black rounded-md bg-white text-black px-3 py-2 disabled:border-slate-300 disabled:text-slate-300 focus:outline-none',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
