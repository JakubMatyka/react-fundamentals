import { useActionState } from "react";
import { increment } from "../action";

export function StatefulForm() {
  // useActionState needs to be called at top level of component
  // First argument is the function to call when the form is submitted
  // Second argument is the initial state
  // Returns a tuple with the current state and the form action function
  // I don't totally understand the third attribute which is the permalink
  // isPending is set to true as soon as the form is submitted
  // and is set to false when the action is complete
  const [state, formAction, isPending] = useActionState(increment, {
    success: true,
    error: false,
    value: 0,
  });

  console.log(`⌛ ${isPending}`);

  return (
    <form style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <input type="hidden" name="itemID" value={"1"} />
      <button formAction={formAction}>Increment</button>
      <p style={{ margin: 0, color: state.success ? "green" : "red" }}>
        {state.value}
      </p>
      <p style={{ margin: 0, color: state.success ? "green" : "red" }}>
        {state.success ? "Success" : "Failed"}
      </p>
      <p style={{ margin: 0, color: state.error ? "red" : "green" }}>
        {state.error ? "Error" : "No Error"}
      </p>
    </form>
  );
}
