<script lang="ts">
  import Button from '../atoms/button.svelte';
  import Panel from '../atoms/panel.svelte';
  import TextInput from '../atoms/textInput.svelte';
  // @ts-ignore
  import OutClick from 'svelte-outclick';
  import { faUser } from '@fortawesome/free-solid-svg-icons';

  export let group: string = "";

  interface profileType {
    name: string,
    edittingName: boolean,
  }

  let profiles: Array<profileType> = []

  function addNewProfile() {
    let length = profiles.length+1;
    let newProfileName = "Profile#"+length;
    profiles = [...profiles, {name: newProfileName, edittingName: false}];
  }

  function deleteProfile(deleteIndex: number) {
    profiles = [...profiles.slice(0, deleteIndex), ...profiles.slice(deleteIndex + 1)]
  }

  function saveHUDToProfile() {

  }

  function applyProfileToHud() {

  }
</script>

<Panel name={'Customization Profiles'} icon={faUser} color={"white"} bind:group>
  <div class="mx-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
    {#each profiles as profile, i}
      <div class="flex flex-col justify-end items-center border-2 rounded-lg p-3 border-[#029772] my-3">
        {#if !profile.edittingName }
          <p class="text-xl font-semibold text-center cursor-pointer"
            on:click={() => profile.edittingName = true}>
            {profile.name}
          </p>
        {:else}
          <OutClick on:outclick={() => profile.edittingName = false}>
            <TextInput bind:value={profile.name}/>
          </OutClick>
        {/if}
        <Button name="Save HUD to Profile"/>
        <Button name="Apply Profile to HUD"/>
        <Button name="Delete Profile" buttonClass="hover:bg-red-600" on:click={() => deleteProfile(i)}/>
      </div>
    {/each}
    {#if profiles?.length < 6}
      <div class="flex flex-col">
        <Button name="Add New Profile" buttonClass="w-[100px]" on:click={() => addNewProfile()}/>
      </div>
    {/if}
  </div>
</Panel>
<hr>