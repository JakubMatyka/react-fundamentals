"use server";

export async function increment(
  previousState: { value: number; success: boolean; error: boolean },
  formData: FormData
) {
  console.log(`🔥 ${formData.get("itemID")}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (previousState.value === null) {
    return { value: 1, success: false, error: false };
  }

  if (previousState.value % 2 === 0) {
    return { value: previousState.value + 1, success: false, error: true };
  }

  return { value: previousState.value + 1, success: true, error: false };
}

export async function updateTextAction(
  previousState: { text: string; success: boolean; error: boolean },
  formData: FormData
) {
  const newText = formData.get("text") as string;
  console.log(`📝 Updating text to: ${newText}`);

  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!newText || newText.trim() === "") {
    return { text: previousState.text, success: false, error: true };
  }

  return { text: newText.trim(), success: true, error: false };
}
