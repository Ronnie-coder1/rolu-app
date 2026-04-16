// components/cart/CartIcon.tsx
import { useCartStore } from "@/stores/cartStore";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ position: "relative", cursor: "pointer" }}>
      🛒
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
}