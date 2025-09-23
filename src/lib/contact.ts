export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContact(payload: ContactPayload) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    let err = "Failed to send";
    try {
      const data = await res.json();
      err = data?.error || err;
    } catch {}
    throw new Error(err);
  }
  return res.json();
}
