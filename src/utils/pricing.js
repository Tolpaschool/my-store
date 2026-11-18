export function getShipping(subtotal) {
  return subtotal === 0 || subtotal > 500 ? 0 : 25;
}