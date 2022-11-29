/**
 * Card
 *
 * Props:   image - string
 *          code - string
 *
 * State:
 *
 * Game -> Card
 */
function Card({ image, code, rotation }) {
  return (
    <div
      className="Card"
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        transform: `rotate(${rotation}turn)`,
      }}
    >
      <img src={image} alt={code} />
    </div>
  );
}
export default Card;
