/**
 * Button
 *
 * Props:   name - string
 *          handleClick - function
 *
 * State:
 *
 * Game -> Button
 */
function Button({ name, handleClick }) {
  return (
    <button className="Button" onClick={handleClick}>
      {name}
    </button>
  );
}
export default Button;
