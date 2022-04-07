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

export type hudIconType = {
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
  translateX: number,
  translateY: number,
  width: number
}

export interface baseIconInfo {
  defaultColor: string,
  isShowing: boolean,
  name: string,
  shape: shapekind,
}

export interface baseIconProps extends baseIconInfo {
  height: number,
  icon: IconDefinition,
  iconColor: string,
  iconScaling: number,
  iconTranslateX: number,
  iconTranslateY: number,
  innerColor: string,
  innerColorOpacity: number,
  progressColor: string,
  progressValue: number,
  rotateDegree: number,
  translateX: number,
  translateY: number,
  width: number
}

export interface borderIconProps extends baseIconProps {
  borderColor: string,
  borderSize: number,
}

export interface ringIconProps extends baseIconProps {
  iconRotateDegree: number,
  outlineColor: string,
  outlineColorOpacity: number,
  ringSize: number,
}

export interface roundEndIconProps extends baseIconProps {
  xAxisRound: number,
  yAxisRound: number 
}

export interface textIcon extends baseIconProps {
  conditionalText: (val: number) => string,
}

export class baseIcon implements baseIconProps {
  defaultColor = "orange";
  height = 50;
  icon = null;
  iconColor = "orange";
  iconScaling = 0.40;
  iconTranslateX = 0;
  iconTranslateY = 0;
  innerColor = "#212121";
  innerColorOpacity = 1;
  isShowing = true;
  name = "";
  progressColor = "";
  progressValue = 100;
  shape: shapekind = "circle-whole";
  rotateDegree = 0;
  translateX = 0;
  translateY = 0;
  width = 50;

  // { defaultColor: string; icon: IconDefinition; iconColor: string, isShowing: boolean, innerColor: string, progressColor: string }) {

  constructor(shape: shapekind,
    { defaultColor="", icon=null, iconColor="", isShowing=false, innerColor="orange", progressColor="orange", name="" }={}) {

    switch (shape) {
      case "circle-circle-fill":
      case "circle-square-fill":
      case "circle-whole":        
        this.iconScaling = 0.55;
        break;
      case "diamond-whole":
        this.height = 60;
        this.width = 60;
        this.iconScaling = 0.35;
        break;
    }
    this.shape = shape;
    this.defaultColor = defaultColor;
    this.icon = icon;
    this.iconColor = iconColor;
    this.isShowing = isShowing;
    this.innerColor = innerColor;
    this.progressColor = progressColor;
    this.name = name;
  }
}

export class ringIcon extends baseIcon implements ringIconProps {
  iconRotateDegree = 0;
  outlineColor = "";
  outlineColorOpacity = 0.4;
  ringSize = 4;

  constructor(shape: shapekind, optionalProps=null) {
    super(shape, optionalProps);
    switch (shape) {
      case "circle-ring":
        this.iconScaling = 0.4;
        this.ringSize = 5;
        break;
      case "diamond-ring":
        this.height = 60;
        this.width = 60;
        this.iconScaling = 0.3;
        this.ringSize = 1.5;
        break;
    }
  }
}

export class roundEndIcon extends baseIcon implements roundEndIconProps {
  xAxisRound = 5;
  yAxisRound = 20;

  constructor(shape: shapekind, optionalProps=null) {
    super(shape, optionalProps);
    switch (shape) {
      case "badge":
        this.height = 4;
        this.width = 35;
        this.iconScaling = 1.4;
        this.xAxisRound = 5;
        this.yAxisRound = 20;
        break;
    }
  }
}

export function createShapeIcon(shape: shapekind, optionalProps=null): object {
  switch (shape) {
    case "badge":
      return new roundEndIcon(shape, optionalProps);
    case "circle-circle-fill":
    case "circle-square-fill":
    case "circle-whole":
    case "diamond-whole":
    case "hexagon-whole":
      return new baseIcon(shape, optionalProps);
    case "circle-ring":
    case "diamond-ring":
    case "hexagon-ring":
      return new ringIcon(shape, optionalProps);
    default:
      return null;
  }
}

export interface shapeIcons {
  "horizontal-bar": textIcon,
  "icon-percentage": baseIconProps,
}

export type optionalHudIconType = Partial<hudIconType>;

export type optionalPlayerHudIconsType = Partial<{ [Property in keyof playerHudIcons]: optionalHudIconType }>;

export type IconDefaultType = Partial<{ [key in shapekind]: optionalHudIconType }>

export function defaultHudIcon(name = "", showing=false, color="red", icon=null): any {
  return createShapeIcon("circle-ring",
    { defaultColor: color, iconColor: color, isShowing: showing, icon: icon,
      innerColor: "#212121", progressColor: color, name: name
    });
}

export type shapePropsType =  Omit<hudIconType, "shape" | "isShowing" | "name" >;

export type customizableShapePropsType = Omit<hudIconType, "isShowing" | "name" | "progressValue" | "icon" >;

export function defaultShapeProps(): shapePropsType {
  return (({ shape, isShowing, name, ...o }) => o)(defaultHudIcon());
}