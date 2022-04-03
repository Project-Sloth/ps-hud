import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export type playerHudIcons = {
  voice: hudIconType,
  health: hudIconType,
  armor: hudIconType,
  hunger: hudIconType,
  thirst: hudIconType,
  stress: hudIconType,
  oxygen: hudIconType,
  armed: hudIconType,
  parachute: hudIconType,
  engine: hudIconType,
  harness: hudIconType,
  cruise: hudIconType,
  nos: hudIconType,
  dev: hudIconType,
}

export const layouts = ["standard", "left-bottom-column", "right-column", "center-bottom",
"bottom-right", "top-left-row", "esx-hud-hard-to-let-go" ] as const;

export type layoutkind = typeof layouts[number];

export const shapes = [
  "badge", "circle-ring", "circle-circle-fill", "circle-square-fill", "circle-whole", "cylinder",
  "diamond-ring", "diamond-whole", "hexagon-ring", "hexagon-whole", "horizontal-bar",
  "icon-percentage", "pill-ring", "pill-whole",
  "square-circular-fill", "square-ring", "square-whole", "star-ring", "triangle-ring", 
  "vertical-bar",
] as const;

export type shapekind = typeof shapes[number];

// Text is only on Horizontal bar, TODO; create sub/parent types
export type hudIconType = {
  // borderColor: string,
  // borderSize: number,
  // conditionalText: (val: number) => string,
  defaultColor: string,
  height: number,
  icon: IconDefinition,
  iconColor: string,
  iconScaling: number,
  iconTranslateX: number,
  iconTranslateY: number,
  isShowing: boolean,
  innerColor: string,
  name: string,
  outlineColor: string,
  outlineColorOpacity: number,
  progressColor: string,
  progressValue: number,
  ringSize: number,
  rotateDegree: number,
  shape: shapekind,
  // text: string,
  translateX: number,
  translateY: number,
  width: number
}

export type optionalHudIconType = Partial<hudIconType>;

export type optionalPlayerHudIconsType = Partial<{ [Property in keyof playerHudIcons]: optionalHudIconType }>;

export function defaultHudIcon(name = "", showing=false, color="red", icon=null,): hudIconType {
  return {
    // borderColor: "black",
    // borderSize: 0,
    // conditionalText: null,
    defaultColor: color,
    height: 50,
    icon: icon,
    iconColor: color,
    iconScaling: 0.40,
    iconTranslateX: 0,
    iconTranslateY: 0,
    isShowing: showing,
    innerColor: "#212121",
    name: name,
    outlineColor: "",
    outlineColorOpacity: 0.4,
    progressColor: color,
    progressValue: 100,
    ringSize: 5,
    rotateDegree: 0,
    shape: "circle-ring",
    // text: "",
    translateX: 0,
    translateY: 0,
    width: 50,
  }
}

export type shapePropsType =  Omit<hudIconType, "shape" | "isShowing" | "name" >;
export type customizableShapePropsType = Omit<hudIconType, "isShowing" | "name" | "progressValue" | "icon" >;

export function defaultShapeProps(): shapePropsType {
  return (({ shape, isShowing, name, ...o }) => o)(defaultHudIcon());
}