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
      case "hexagon-whole":
        this.iconScaling = 0.45;
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
      case "hexagon-ring":
        this.iconScaling = 0.4;
        this.ringSize = 2;
        break;
      case "square-ring":
        this.ringSize = 12;
        break;
      case "star-ring":
        this.height = 55;
        this.width = 55;
        this.ringSize = 3;
        this.iconScaling = 0.35;
        this.iconTranslateY = 0.06;
        break;
      case "triangle-ring":
        this.height = 55;
        this.width = 55;
        this.iconScaling = 0.25;
        this.iconTranslateY = 0.09;
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
      case "pill-whole":
        this.height = 75;
        this.width = 50;
        this.iconScaling = 0.55;
        this.xAxisRound = 18;
        this.yAxisRound = 18;
        break;
    }
  }
}

export class pillRingIcon extends ringIcon implements roundEndIconProps {
  xAxisRound = 5;
  yAxisRound = 20;
  constructor(shape: shapekind, optionalProps=null) {
    super(shape, optionalProps);
    switch (shape) {
      case "pill-ring":
        this.height = 80;
        this.width = 50;
        this.iconScaling = 0.40;
        this.xAxisRound = 18;
        this.yAxisRound = 18;
        this.ringSize = 6.5;
    }
  }
}

export function createShapeIcon(shape: shapekind, optionalProps=null): object {
  switch (shape) {
    case "badge":
    case "pill-whole":
      return new roundEndIcon(shape, optionalProps);
    case "circle-circle-fill":
    case "circle-square-fill":
    case "circle-whole":
    case "diamond-whole":
    case "hexagon-whole":
    case "square-circular-fill":
    case "square-whole":
      return new baseIcon(shape, optionalProps);
    case "circle-ring":
    case "diamond-ring":
    case "hexagon-ring":
    case "square-ring":
    case "star-ring":
    case "triangle-ring":
      return new ringIcon(shape, optionalProps);
    case "pill-ring":
      return new pillRingIcon(shape, optionalProps);
    default:
      return new baseIcon(shape, optionalProps);
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