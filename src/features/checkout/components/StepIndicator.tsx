type Props = {
  currentStep: string | null;
};

export const StepIndicator = ({ currentStep }: Props) => {
  const steps = [
    { step: "1", label: "配送" },
    { step: "2", label: "確認＆お支払い" },
    { step: "3", label: "完了" },
  ];

  return (
    <div className="flex items-center justify-center space-x-20">
      {steps.map((s, index) => {
        const isCompleted = Number(currentStep) > Number(s.step);
        const isCurrent = currentStep === s.step;

        // 左の線も必要かどうか
        const showLeftLine = index > 0;

        // 線の色を決定：現在のステップ以上なら色をつける
        const shouldColorLeftLine = Number(currentStep) >= Number(s.step);

        return (
          <div key={s.step} className="flex flex-col items-center">
            <div className="relative flex items-center">
              {/* 左側の線（必要な場合） */}
              {showLeftLine && (
                <div
                  className={`absolute top-1/2 right-full z-0 h-0.5 w-32 -translate-y-1/2 transform ${shouldColorLeftLine ? "bg-green-700" : "bg-gray-300"}`}
                />
              )}

              {/* 丸 */}
              <div
                className={`z-10 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white ${isCompleted ? "bg-green-700" : isCurrent ? "bg-green-700" : "bg-gray-300"}`}
              >
                {isCompleted ? "✓" : s.step}
              </div>

              {/* 右側の線（最後以外） */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 left-full z-0 h-0.5 w-20 -translate-y-1/2 transform bg-gray-300" />
              )}
            </div>

            {/* ラベル */}
            <div className="mt-2 text-center text-sm whitespace-nowrap">
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
