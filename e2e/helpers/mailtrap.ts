type MailtrapMessage = {
  id: number;
  subject?: string;
  to_email?: string;
  created_at?: string;
};

const findLatestMail = async (
  email: string,
  since: Date,
): Promise<MailtrapMessage | null> => {
  const accountId = process.env.MAILTRAP_ACCOUNT_ID;
  const inboxId = process.env.MAILTRAP_INBOX_ID;
  const apiToken = process.env.MAILTRAP_API_TOKEN;

  if (!accountId || !inboxId || !apiToken) {
    throw new Error("Mailtrapの環境変数が設定されていません");
  }

  const response = await fetch(
    `https://mailtrap.io/api/accounts/${accountId}/inboxes/${inboxId}/messages`,
    {
      headers: {
        "Api-Token": apiToken,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`Mailtrap API error: ${response.status} ${body}`);
  }

  const messages: MailtrapMessage[] = await response.json();

  const targetMessages = messages
    .filter((message) => {
      if (!message.to_email || !message.created_at) {
        return false;
      }

      return (
        message.to_email === email && new Date(message.created_at) >= since
      );
    })
    .sort(
      (a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
    );

  return targetMessages[0] ?? null;
};

const getMailBody = async (messageId: number): Promise<string> => {
  const accountId = process.env.MAILTRAP_ACCOUNT_ID;
  const inboxId = process.env.MAILTRAP_INBOX_ID;
  const apiToken = process.env.MAILTRAP_API_TOKEN;

  if (!accountId || !inboxId || !apiToken) {
    throw new Error("Mailtrapの環境変数が設定されていません");
  }

  const response = await fetch(
    `https://mailtrap.io/api/accounts/${accountId}/inboxes/${inboxId}/messages/${messageId}/body.txt`,
    {
      headers: {
        "Api-Token": apiToken,
        Accept: "text/plain",
      },
    },
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`Mailtrap API error: ${response.status} ${body}`);
  }

  return response.text();
};

const extractOtp = (text: string): string => {
  const match = text.match(/\b\d{6}\b/);

  if (!match) {
    throw new Error("メール本文からOTPを取得できませんでした");
  }

  return match[0];
};

const getOtpFromMailtrap = async (
  email: string,
  since: Date,
): Promise<string> => {
  for (let i = 0; i < 20; i++) {
    const mail = await findLatestMail(email, since);

    if (mail) {
      const body = await getMailBody(mail.id);

      return extractOtp(body);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("OTPメールが届きませんでした");
};

export { getOtpFromMailtrap };
