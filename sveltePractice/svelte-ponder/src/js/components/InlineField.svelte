<script lang="ts">
  import { tick } from "svelte";

  type FieldType = "text" | "email" | "date" | "textarea";

  interface Props {
    label: string;
    value: string;
    type?: FieldType;
  }

  let { label, value = $bindable(""), type = "text" }: Props = $props();

  let isEditing = $state(false);
  let originalValue = "";
  let buttonRef: HTMLButtonElement | undefined = $state();

  function startEdit() {
    originalValue = value;
    isEditing = true;
  }

  async function focusButton() {
    await tick(); // wait for the button to be rendered again
    buttonRef?.focus();
  }

  function commitEdit(returnFocus = false) {
    if (!isEditing) return;
    isEditing = false;
    if (returnFocus) focusButton();
  }

  function cancelEdit() {
    value = originalValue;
    isEditing = false;
    focusButton();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    } else if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      commitEdit(true);
    }
  }
</script>

<div class="field">
  <div class="label">{label}</div>

  {#if isEditing}
    {#if type === "textarea"}
      <!-- svelte-ignore a11y_autofocus -->
      <textarea
        bind:value
        aria-label={label}
        autofocus
        onblur={() => commitEdit()}
        onkeydown={handleKeyDown}
      ></textarea>
    {:else}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        {type}
        bind:value
        aria-label={label}
        autofocus
        onblur={() => commitEdit()}
        onkeydown={handleKeyDown}
      />
    {/if}
  {:else}
    <button
      type="button"
      class="value"
      class:empty={!value}
      aria-label={`Edit ${label}, current value: ${value || "empty"}`}
      bind:this={buttonRef}
      onclick={startEdit}
    >
      {value || `Add ${label.toLowerCase()}`}
    </button>
  {/if}
</div>

<style>
  .field {
    margin-bottom: 1rem;
  }

  .label {
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 0.25rem;
  }

  .value {
    /* make the button look like plain text */
    display: block;
    width: 100%;
    text-align: left;
    font: inherit;
    color: inherit;
    background: none;
    border: 1px dashed transparent;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    white-space: pre-wrap;
  }

  /* signal that it's interactive */
  .value:hover,
  .value:focus-visible {
    border-color: #999;
    background: #f5f5f5;
  }

  .value.empty {
    color: #999;
    font-style: italic;
  }

  input,
  textarea {
    width: 100%;
    font: inherit;
    padding: 0.25rem 0.5rem;
    box-sizing: border-box;
  }

  textarea {
    min-height: 4rem;
  }
</style>