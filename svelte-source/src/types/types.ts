import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const iconNames = [
  "voice",
  "health",
  "armor",
  "hunger",
  "thirst",
  "stress",
  "oxygen",
  "armed",
  "parachute",
  "engine",
  "harness",
  "cruise",
  "nitro",
  "dev",
] as const;
export type iconNamesKind = (typeof iconNames)[number];

export const dynamicOptionIconNames = [
  "armor",
  "engine",
  "health",
  "hunger",
  "nitro",
  "oxygen",
  "stress",
  "thirst",
] as const;
export type dynamicIconNamesKind = (typeof dynamicOptionIconNames)[number];

export type playerHudIcons = {
  [key in iconNamesKind]: optionalHudIconType;
};

export type dynamicIcons = {
  [key in dynamicIconNamesKind]: boolean;
};

export const iconLayouts = [
  "standard",
  "bottom-right-row",
  "center-bottom-row",
  "left-bottom-column",
  "right-bottom-column",
  "top-left-row",
  "top-right-row",
] as const;
export type layoutIconKind = (typeof iconLayouts)[number];

export const layoutPresets = ["esx-hud-hard-to-let-go"];
export type layoutPresetKind = (typeof layoutPresets)[number];

export const shapes = [
  "badge",
  "circle-ring",
  "circle-ring-whole",
  "circle-circle-fill",
  "circle-square-fill",
  "circle-whole", //"cylinder",
  "diamond-ring",
  "diamond-whole",
  "hexagon-ring",
  "hexagon-whole",
  "horizontal-bar", //"icon",
  "icon-percentage",
  "pill-ring",
  "pill-whole",
  "square-circular-fill",
  "square-ring",
  "square-whole",
  "star-ring",
  "triangle-ring",
  "split-circle",
  "inner-circle",
  "rotated-square",
  "regular-square",
  "circle-fill",
  "square-fill",
  "rotated-square-fill",
  "transparent",
] as const;
export type shapekind = (typeof shapes)[number];

export interface baseIconInfo {
  isShowing: boolean;
  name: string;
  shape: shapekind;
}

export interface baseIconProps extends baseIconInfo {
  height: number;
  icon: IconDefinition;
  iconScaling: number;
  iconTranslateX: number;
  iconTranslateY: number;
  progressValue: number;
  rotateDegree: number;
  translateX: number;
  translateY: number;
  width: number;
  iconRotateDegree: number;
}

export interface borderIconProps {
  borderColor: string;
  borderSize: number;
}

export interface ringIconProps {
  displayOutline: boolean;
  iconRotateDegree: number;
  ringSize: number;
  borderGap: number;
}

export interface fillIconProps {
  borderSize: number;
}

export interface roundEndIconProps {
  xAxisRound: number;
  yAxisRound: number;
  barHeight: number;
}

export interface notchedIconProps {
  dashes: number;
  gap: number;
  borderGap: number;
}

export interface textIcon {
  conditionalText: (val: number) => string;
}

export class baseIcon implements baseIconProps {
  height = 50;
  icon = null;
  iconScaling = 0.4;
  iconTranslateX = 0;
  iconTranslateY = 0;
  isShowing = true;
  name = "";
  progressValue = 100;
  shape: shapekind = "inner-circle";
  rotateDegree = 0;
  translateX = 0;
  translateY = 0;
  width = 50;
  iconRotateDegree = 0;

  constructor(
    shape: shapekind,
    { icon = null, isShowing = false, name = "", progressValue = 100 } = {}
  ) {
    switch (shape) {
      case "inner-circle":
        break;
      case "rotated-square":
        this.rotateDegree = 45;
        this.height = 40;
        this.width = 40;
        break;
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
      case "horizontal-bar":
        this.iconScaling = 0.6;
        break;
    }
    this.shape = shape;
    this.icon = icon;
    this.isShowing = isShowing;
    this.name = name;
    this.progressValue = progressValue;
  }
}

export class ringIcon extends baseIcon implements ringIconProps {
  displayOutline = true;
  iconRotateDegree = 0;
  ringSize = 2.5;
  borderGap = 0.85;

  constructor(shape: shapekind, optionalProps = {}) {
    super(shape, optionalProps);
    switch (shape) {
      case "inner-circle":
        this.iconScaling = 0.45;
        this.ringSize = 3.5;
        break;
      case "rotated-square":
        this.iconScaling = 0.4;
        this.ringSize = 2.5;
        this.borderGap = 0.8;
        this.iconRotateDegree = 315;
        break;
      case "regular-square":
        this.iconScaling = 0.4;
        this.ringSize = 2.5;
        this.borderGap = 0.8;
        break;
      case "circle-ring":
      case "circle-ring-whole":
        this.iconScaling = 0.4;
        this.ringSize = 6;
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
        this.iconScaling = 0.3;
        this.iconTranslateY = 0.09;
        this.ringSize = 3;
        break;
    }
  }
}

export const absoluteMapDimensions: Array<number> = [
  67, 111, 112, 121, 114, 105, 103, 104, 116, 32, 169, 32, 50, 48, 50, 50, 32,
  80, 114, 111, 106, 101, 99, 116, 32, 83, 108, 111, 116, 104, 46, 32, 65, 108,
  108, 32, 114, 105, 103, 104, 116, 115, 32, 114, 101, 115, 101, 114, 118, 101,
  100, 46,
];

export class roundEndIcon extends baseIcon implements roundEndIconProps {
  xAxisRound = 5;
  yAxisRound = 20;
  barHeight = 4;

  constructor(shape: shapekind, optionalProps = {}) {
    super(shape, optionalProps);
    switch (shape) {
      case "badge":
        this.height = 4;
        this.width = 35;
        this.iconScaling = 1.4;
        this.xAxisRound = 2;
        this.yAxisRound = 0;
        this.barHeight = 4;
        break;
      case "transparent":
        this.height = 55;
        this.width = 45;
        this.iconScaling = 0.38;
        this.xAxisRound = 0;
        this.yAxisRound = 0;
        this.barHeight = 5;
        break;
      case "pill-whole":
        this.height = 75;
        this.width = 42;
        this.iconScaling = 0.55;
        this.xAxisRound = 25;
        this.yAxisRound = 25;
        this.barHeight = 5;
        break;
    }
  }
}

export class notchedIcon extends ringIcon implements notchedIconProps {
  dashes = 8;
  gap = 4;
  borderGap = 0.8;

  constructor(shape: shapekind, optionalProps = {}) {
    super(shape, optionalProps);
    switch (shape) {
      case "split-circle":
        this.dashes = 8;
        this.gap = 2.5;
        this.borderGap = 0.9;
        break;
    }
  }
}

export class fillIcon extends baseIcon implements fillIconProps {
  borderSize = 4;

  constructor(shape: shapekind, optionalprops = {}) {
    super(shape, optionalprops);
    switch (shape) {
      case "circle-fill":
        this.borderSize = 3;
        break;
      case "rotated-square-fill":
        // this.rotateDegree = 45;
        this.height = 50;
        this.width = 50;
        this.borderSize = 3.5;
        this.iconScaling = 0.3;
        // this.iconRotateDegree = 315;
        break;
    }
  }
}

export class pillRingIcon extends ringIcon implements roundEndIconProps {
  xAxisRound = 5;
  yAxisRound = 20;
  constructor(shape: shapekind, optionalProps = {}) {
    super(shape, optionalProps);
    switch (shape) {
      case "pill-ring":
        this.height = 80;
        this.width = 50;
        this.iconScaling = 0.4;
        this.xAxisRound = 18;
        this.yAxisRound = 18;
        this.ringSize = 6.5;
    }
  }
}

export function createShapeIcon(
  shape: shapekind,
  optionalProps = {}
): optionalHudIconType {
  switch (shape) {
    case "inner-circle":
    case "rotated-square":
    case "regular-square":
      return new ringIcon(shape, optionalProps);
    case "split-circle":
      return new notchedIcon(shape, optionalProps);
    case "circle-fill":
    case "square-fill":
    case "rotated-square-fill":
      return new fillIcon(shape, optionalProps);
    case "pill-whole":
    case "badge":
    case "transparent":
      return new roundEndIcon(shape, optionalProps);
    case "circle-circle-fill":
    case "circle-square-fill":
    case "circle-whole":
    case "diamond-whole":
    case "hexagon-whole":
    case "horizontal-bar":
    case "square-circular-fill":
      return new baseIcon(shape, optionalProps);
    case "circle-ring":
    case "circle-ring-whole":
    case "diamond-ring":
    case "hexagon-ring":
    case "square-ring":
    case "star-ring":
    case "triangle-ring":
    case "square-whole":
      return new ringIcon(shape, optionalProps);
    case "pill-ring":
      return new pillRingIcon(shape, optionalProps);
    default:
      return new baseIcon(shape, optionalProps);
  }
}

export interface shapeIcons {
  "horizontal-bar": textIcon;
  "icon-percentage": baseIconProps;
}

export type optionalHudIconType = Partial<
  baseIconProps &
    ringIconProps &
    roundEndIcon &
    notchedIconProps &
    fillIconProps &
    borderIconProps &
    pillRingIcon
>;
export type optionalHudIconMetaShapeType = optionalHudIconType &
  Partial<colorNameObj>;

export type optionalPlayerHudIconsType = Partial<{
  [Property in keyof playerHudIcons]: optionalHudIconType;
}>;

const DEFAULTICONSHAPE: shapekind = "inner-circle";

export function defaultHudIcon(
  name: string = "",
  showing: boolean = false,
  icon: object = null
): any {
  return createShapeIcon(DEFAULTICONSHAPE, {
    isShowing: showing,
    icon: icon,
    name: name,
  });
}

export type shapePropsType = Omit<
  optionalHudIconType,
  "shape" | "isShowing" | "name"
>;

export const colorNames = [
  "iconColor",
  "iconDropShadowAmount",
  "iconContrast",
  "innerColor",
  "outlineColor",
  "outlineContrast",
  "outlineDropShadowAmount",
  "progressColor",
  "progressDropShadowAmount",
  "progressContrast",
] as const;
export type colorNamesKind = (typeof colorNames)[number];

interface colorNameObj {
  iconColor: string;
  iconDropShadowAmount: number;
  iconContrast: number;
  innerColor: string;
  outlineColor: string;
  outlineContrast: number;
  outlineDropShadowAmount: number;
  progressColor: string;
  progressContrast: number;
  progressDropShadowAmount: number;
}

export type globalEditableColorsType = colorNameObj & {
  editableColors: { [key: string]: boolean };
} & { editSingleIconName: iconNamesKind; editSingleIconStage: number };

export type editableColorsType = {
  [key in colorNamesKind]: boolean;
};

export interface colorEffect extends colorNameObj {
  name: string;
}

export type iconColorEffect = {
  currentEffect: number;
  colorEffects: Array<colorEffect>;
  editableColors: { [key: string]: boolean };
};

export type playerHudColorEffects = {
  [key in iconNamesKind]: iconColorEffect;
};

const percentToHex = (percentage: number): string => {
  const normalizedPercent: number = Math.max(0, Math.min(100, percentage));
  const intValue: number = Math.round((normalizedPercent / 100) * 255);
  const hexValue: string = intValue.toString(16);
  return hexValue.padStart(2, "0").toUpperCase();
};

export function defaultColorEffect(
  name: string,
  progressColor: string,
  outlineColor: string = "",
  iconColor: string = "#FFFFFFFF",
  innerColor: string = "#212121FF"
): colorEffect {
  return {
    iconColor: iconColor,
    iconContrast: 100,
    iconDropShadowAmount: 0,
    innerColor: innerColor,
    name: name,
    outlineColor: outlineColor || progressColor + percentToHex(40),
    outlineContrast: 100,
    outlineDropShadowAmount: 0,
    progressColor: progressColor,
    progressContrast: 100,
    progressDropShadowAmount: 0,
  };
}

export function defaultEditableColor() {
  return createEditableColor(DEFAULTICONSHAPE);
}

export function createEditableColor(
  shape: shapekind
): Partial<editableColorsType> {
  let editOptions: Partial<editableColorsType> = {};
  switch (shape) {
    case "inner-circle":
    case "split-circle":
    case "badge":
    case "circle-ring":
    case "diamond-ring":
    case "hexagon-ring":
    case "pill-ring":
    case "square-ring":
    case "square-whole":
    case "star-ring":
    case "triangle-ring":
      editOptions.innerColor = true;
      break;
  }
  return editOptions;
}

export const menuStoreLocalStorageName: string = "PSHudMenu";
export const playerStoreLocalStorageName: string = "PSHudPlayerStatus";
export const layoutStoreLocalStorageName: string = "PSHudLayout";
export const colorStoreLocalStorageName: string = "PSHudColor";
export const profileLocalStorageName: string = "PSHudProfile";

export function capAmountToHundred(num: number) {
  return Math.min(num, 100);
}
