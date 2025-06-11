import { useCallback } from "react";

export function MemoAction() {
  // useCallback is a custom built-in hook which allows to memoize a function
  // It is used to prevent unnecessary re-renders of a component

  const memoizedAction = useCallback(() => {
    console.log("Memoized action");
  }, []);

  return (
    <div>
      <button onClick={memoizedAction}>Memoized Action</button>
    </div>
  );
}
