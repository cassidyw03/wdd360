export function useInlineEdit<T extends Record<string, any>>(
  initial: T,
  onSave: (value: T) => Promise<void> | void
) {
  const draft = $state(structuredClone(initial));
  let original = $state(structuredClone(initial));

  const isDirty = $derived(
    () => JSON.stringify(draft) !== JSON.stringify(original)
  );

  async function save() {
    const snapshot = $state.snapshot(draft) as T;
    await onSave(snapshot);
    original = snapshot;
  }

  function cancel() {
    Object.assign(draft, $state.snapshot(original));
  }

  function reset(newValue: T) {
    Object.assign(draft, structuredClone(newValue));
    original = structuredClone(newValue);
  }

  return {
    draft,
    isDirty,
    save,
    cancel,
    reset
  };
}