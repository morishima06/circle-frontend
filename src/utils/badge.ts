type BadgeConfig = {
  label: string;
  className: string;
};

export const ORDER_STATUS_BADGE: Record<string, BadgeConfig> = {
  confirmed: {
    label: "新規受付",
    className: "rounded bg-blue-50 text-blue-700 border-blue-200",
  },
  onHold: {
    label: "対応保留",
    className: "rounded bg-blue-50 text-blue-700 border-blue-200",
  },
  shipped: {
    label: "出荷済",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200",
  },
  delivered: {
    label: "配達完了",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200",
  },
  cancelled: {
    label: "キャンセル",
    className: "rounded bg-red-50 text-red-600 border-red-200",
  },
};

export const PAYMENT_STATUS_BADGE: Record<string, BadgeConfig> = {
  pending: {
    label: "未払い",
    className: "rounded bg-orange-100 text-orange-600 border-orange-200",
  },
  paid: {
    label: "支払い済",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200",
  },
  refunded: {
    label: "返金済",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200",
  },
};

export const SHIPMENT_STATUS_BADGE: Record<string, BadgeConfig> = {
  preparing: {
    label: "未発送",
    className: "rounded bg-orange-100 text-orange-600 border-orange-200",
  },
  shipped: {
    label: "発送済",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200",
  },
};

export const CUSTOMER_STATUS_BADGE: Record<string, BadgeConfig> = {
  active: {
    label: "有効",
    className: "rounded bg-gray-900 text-white border-gray-800",
  },
  suspended: {
    label: "停止",
    className: "rounded bg-gray-50 text-gray-700 border-gray-200",
  },
  withdrawn: {
    label: "退会",
    className: "rounded bg-orange-100 text-orange-600 border-orange-200",
  },
  banned: {
    label: "利用禁止",
    className: "rounded bg-orange-100 text-orange-600 border-orange-200",
  },
};

export const PUBLISH_STATUS_BADGE: Record<string, BadgeConfig> = {
  published: {
    label: "公開中",
    className: "rounded bg-green-200 bg-green-100 text-green-700",
  },
  unpublished: {
    label: "非公開",
    className: "rounded bg-gray-50 text-gray-700 border-gray-200",
  },
};

export const PAYMENT_METHOD_BADGE: Record<string, BadgeConfig> = {
  cod: {
    label: "代金引換",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200",
  },
  card: {
    label: "カード決済",
    className: "rounded bg-gray-200 text-gray-700 border-gray-200 ",
  },
};
