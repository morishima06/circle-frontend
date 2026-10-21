import { shipOrder } from "@/api/admin/order";
import { ShipOrderParams } from "@/types/admin/order";

export const useShipOrder = () => {
  const ship = async (params: ShipOrderParams) => {
    await shipOrder(params);
  };

  return {
    ship,
  };
};
