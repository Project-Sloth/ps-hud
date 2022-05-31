<script lang="ts">
  import Button from '../atoms/button.svelte';
  import Panel from '../atoms/panel.svelte';
  import TextInput from '../atoms/textInput.svelte';
  // @ts-ignore
  import OutClick from 'svelte-outclick';
  import { faUser } from '@fortawesome/free-solid-svg-icons';
  import ProfileStore from '../../stores/profileStore';

  export let group: string = "";
</script>

<Panel name={'Customization Profiles'} icon={faUser} color={"white"} bind:group>
  <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
    {#each $ProfileStore as profile, i}
      <div class="flex flex-col justify-end items-center border-2 rounded-lg p-3 border-[#029772] my-3">
        {#if !profile.editingName }
          <p class="text-xl font-semibold text-center cursor-pointer"
            on:click={() => profile.editingName = true}>
            {profile.name}
          </p>
        {:else}
          <OutClick on:outclick={() => profile.editingName = false}>
            <TextInput bind:value={profile.name}/>
          </OutClick>
        {/if}
        <Button name="Save HUD to Profile" on:click={() => ProfileStore.saveHUDToProfile(i)}/>
        <Button name="Apply Profile to HUD" on:click={() => ProfileStore.applyProfileToHud(i)}/>
        <Button name="Delete Profile" buttonClass="hover:bg-red-600" on:click={() => ProfileStore.deleteProfile(i)}/>
      </div>
    {/each}
    {#if $ProfileStore.length < 6}
      <div class="flex flex-col">
        <Button name="Add New Profile" buttonClass="w-[100px]" on:click={() => ProfileStore.addNewProfile()}/>
      </div>
    {/if}
  </div>
</Panel>
<hr>