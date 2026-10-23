<script lang="ts">
  import InlineField from "../js/components/InlineField.svelte";
  import { useInlineEdit } from "../js/components/useInlineEdit.svelte";

  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    bio: "Frontend developer who loves Svelte."
  };

  async function saveProfile(updated: typeof user) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    Object.assign(user, updated);
    console.log("Profile saved:", user);
  }

  const edit = useInlineEdit(user, saveProfile);
</script>

<h2>User Profile</h2>
<InlineField label="Name" bind:value={edit.draft.name} />
<InlineField label="Email" type="email" bind:value={edit.draft.email} />
<InlineField label="Bio" type="textarea" bind:value={edit.draft.bio} />

{#if edit.isDirty()}
  <button type="button" onclick={edit.save}>Save</button>
  <button type="button" onclick={edit.cancel}>Cancel</button>
{/if}