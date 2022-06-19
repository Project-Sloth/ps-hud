import { fetchNui } from '../utils/eventHandler';
import { readable } from 'svelte/store';
import type { localeState } from '../types/types';

function defaultLocales(): localeState {
  return {
      hudSettings: {
        hud_settings: "Hud Settings",
        reset_hud: "Reset Hud",
        reset_hud_desc: "If your hud is acting up, give it a good ol' reset! Or you can do /resethud",
        reset_hud_button_text: "Resetting Hud...",
        reset_hud_settings: "Reset Settings",
        reset_hud_settings_desc: "If you want to reset your settings back to default; click this shiny button!",
        options: "Options",
        show_minimap: "Show Minimap Only in Vehicle",
        show_minimap_desc: "Disabling this will always keep your minimap on your screen",
        show_compass_only: "Show Compass Only in Vehicle",
        show_compass_only_desc: "Disabling this will always keep your compass on your screen",
        show_compass_follow: "Show Compass Follow Cam",
        show_compass_follow_desc: "Disabling this will make it so you can no longer use your mouse to rotate the compass around",
        notifications: "Notifications",
        menu_sound_effect: "Menu Sound Effect Enabled",
        reset_hud_sound_effect: "Reset Hud Sound Effects Enabled",
        gui_sound_effect: "GUI Sound Effects Enabled",
        map_notification: "Map Notifications Enabled",
        low_fuel_alert: "Low Fuel Alert Enabled",
        cinematic_mode_notification: "Cinematic Mode Notifications",
        status: "Status",
        show_health: "Show Health Always",
        show_armor: "Show Armor Always",
        show_hunger: "Show Hunger Always",
        show_thirst: "Show Thirst Always",
        show_stress: "Show Stress Always",
        show_oxygen: "Show Oxygen Always",
        show_player_id: "Show Player ID",
        vehicle: "Vehicle",
        minimap_circle: "Minimap Circle",
        minimap_square: "Minimap Square",
        minimap_choose: "Choose between circle or square minimap",
        minimap_check: "Minimap Enabled",
        minimap_border_check: "Minimap Borders Enabled",
        show_engine: "Show Engine Always",
        show_nitro: "Show Nitro Always",
        compass: "Compass",
        compass_enabled: "Compass Enabled",
        compass_enabled_desc: "Disabling this will make it so you can't see the compass navigation",
        show_street_names: "Show Street Names Enabled",
        show_street_names_desc: "Disabling this will make it so you can't see the street names / locations",
        show_compass_pointer: "Show Compass Pointer Enabled",
        show_compass_pointer_desc: "Disabling this will make it so you can't see your pointer index to pinpoint your exact cardinal directions",
        cinematic_mode: "Cinematic Mode",
        show_cinematic: "Show Cinematic Bars Enabled",
    },
    statusIcons: {
        status_icons: "Status Icons",
        status_icons_settings: "Status Icons Settings",
        design_mode: "Design Mode",
        reset_status_icons: "Reset Status Icon Settings",
        save_changes_to_server: "Save Changes To Server",
        global_status_icons_settings: "Global Status Icons Settings",
        icon_shape: "Icon Shape",
        global_size_position_section: "Global Size & Position Section",
        shapes: [
          "Badge", "Circle Ring", "Circle Ring Whole", "Circle Square Fill", "Circle Whole", "Diamond Ring",
          "Diamond Whole", "Flower", "Hexagon Ring", "Hexagon Whole", "Horizontal Bar", "Icon Percentage",
          "Pill Ring", "Pill Whole", "Square Circular Fill", "Square Ring", "Star Ring", "Triangle Ring",
        ],
        width_size: "Width Size",
        height_size: "Height Size",
        ring_size: "Ring Size",
        show_progress_outline: "Show Progress Outline",
        x_axis_position: "X-axis Position",
        y_axis_position: "Y-axis Position",
        rotation: "Rotation",
        icon_x_axis_position: "Icon X-axis Position",
        icon_y_axis_position: "Icon Y-axis Position",
        icon_size: "Icon Size",
        x_axis_curve: "X-axis Curve",
        y_axis_curve: "Y-axis Curve",
        global_color_section: "Global Color Section",
        progress_color: "Progress Color",
        progress_contrast: "Progress Contrast",
        progress_shadow: "Progress Shadow",
        icon_color: "Icon Color",
        icon_contrast: "Icon Contrast",
        icon_shadow: "Icon Shadow",
        outline_color: "Outline Color",
        outline_contrast: "Outline Contrast",
        outline_shadow: "Outline Shadow",
        inner_color: "Inner Color",
        single_status_icon_settings: "Single Status Icon Settings",
        single_icon_size_position_section: "Single Icon Size & Position Section",
        single_icon_color_section: "Single Icon Color Section",
        icon_state: "Icon State",
        icon_status_to_edit: "Icon Status To Edit",
        status_icon_names: [
          "Voice", "Health", "Armor", "Hunger", "Thirst", "Stress", "Oxygen", "Armed", "Parachute",
          "Engine", "Harness", "Cruise", "Nitro", "Dev", "Playerid"
        ],
        voice_state_strings: ["Not Talking", "Talking", "Radio Talking"],
        health_state_strings: ["Alive", "Dead"],
        armor_state_strings: ["Armor", "No Armor"],
        hunger_state_strings: ["Normal", "Starving"],
        thirst_state_strings: ["Normal", "Thirsty"],
        engine_state_strings: ["No Damage", "Minor Damage", "Major Damage"],
        nitro_state_strings: ["No Nitro", "Active Nitro"],
    },
    layouts: {
        global_status_layout_settings: "Global Status Icon Layout Settings",
        icon_layout: "Icon Layout",
        layout_names: [
          "Standard", "Bottom Right Row", "Center Bottom Row", "Left Bottom Column",
          "Right Bottom Column", "Top Left Row", "Top Right Row"
        ],
        between_icon_spacing: "Between Icon Spacing",
        y_axis_spacing: "Y-Axis Spacing",
        x_axis_spacing: "X-Axis Spacing",
    },
    utilityFunctions: {
        utility_functions: "Utility Functions",
        copy_progress_colors: "Copy Progress Colors To Icon Colors",
    },
    customProfiles: {
        customization_profiles: "Customization Profiles",
        add_new_profile: "Add New Profile",
        profile_name: "Profile",
        save_hud_to_profile: "Save Hud To Profile",
        apply_profile_to_hud: "Appyl Profile To Hud",
        delete_profile: "Delete Profile",
    }
  }
}

const store = () => {
  const initialVal: localeState = defaultLocales();
  const { subscribe } = readable(initialVal, (set) => {
    fetchNui("getLocaleData", {}).then((localeData: {action: string, locales: localeState}) => {
      let fallbackObj = defaultLocales()
      set({
        statusIcons: localeData.locales.statusIcons || fallbackObj.statusIcons,
        hudSettings: localeData.locales.hudSettings || fallbackObj.hudSettings,
        layouts: localeData.locales.layouts || fallbackObj.layouts,
        utilityFunctions: localeData.locales.utilityFunctions || fallbackObj.utilityFunctions,
        customProfiles: localeData.locales.customProfiles || fallbackObj.customProfiles,
      });
    });
  });

  const methods = {
  }

  return {
    subscribe,
    ...methods
  }
}

export default store();