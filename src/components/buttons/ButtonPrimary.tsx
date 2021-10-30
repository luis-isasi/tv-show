const ButtonPrimary: React.FC<{
  onClick: () => void
}> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="max-w-max rounded-md bg-indigo-600 hover:bg-indigo-500 py-1 px-3 text-white"
    >
      {children}
    </button>
  )
}

export default ButtonPrimary
