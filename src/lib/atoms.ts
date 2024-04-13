import { AtomOptions, DefaultValue, RecoilState, atom, selector } from "recoil";
import {
  DEFAULT_FRAME_FILL,
  DEFAULT_FRAME_STROKE_FILL,
  DEFAULT_IMAGE_STROKE_FILL,
} from "./constants";

export interface ControlCenterState {
  frameDimension: {
    width: number;
    height: number;
  };
  frameRadius: number;
  frameFill: string;
  frameStroke: {
    color: string;
    width: number;
    position: "inside" | "outside";
  };
  imagePosition: {
    x: number;
    y: number;
  };
  imageStroke: {
    color: string;
    width: number;
    position: "inside" | "outside";
  };
  imageRadius: number;
  imageRotation: number;
  imageScale: number;
}

interface VersionHistory {
  position: number;
  timeline: ControlCenterState[];
}

let atoms: Array<RecoilState<any>> = [];
const createAtom = <T>(options: AtomOptions<T>) => {
  const state = atom(options);
  atoms.push(state);
  return state;
};

export const imageSourceState = atom<string | null>({
  key: "imageSource",
  default: null,
});

export const PreviewFrameState = atom<HTMLDivElement | null>({
  key: "PreviewFrame",
  default: null,
});
export const versionHistoryState = atom<VersionHistory>({
  key: "VersionHistory",
  default: { position: -1, timeline: [] },
});

export const frameDimensionState = createAtom<
  ControlCenterState["frameDimension"]
>({
  key: "frameDimension",
  default: {
    width: 0,
    height: 0,
  },
});

export const frameRadiusState = createAtom<ControlCenterState["frameRadius"]>({
  key: "frameRadius",
  default: 20,
});

export const frameFillState = createAtom<ControlCenterState["frameFill"]>({
  key: "frameFill",
  default: DEFAULT_FRAME_FILL,
});

export const frameStrokeState = createAtom<ControlCenterState["frameStroke"]>({
  key: "frameStroke",
  default: {
    color: DEFAULT_FRAME_STROKE_FILL,
    width: 5,
    position: "inside",
  },
});

export const imagePositionState = createAtom<
  ControlCenterState["imagePosition"]
>({
  key: "imagePosition",
  default: {
    x: 0,
    y: 0,
  },
});

export const imageStrokeState = createAtom<ControlCenterState["imageStroke"]>({
  key: "imageStroke",
  default: {
    color: DEFAULT_IMAGE_STROKE_FILL,
    width: 5,
    position: "inside",
  },
});
export const imageRadiusState = createAtom<ControlCenterState["imageRadius"]>({
  key: "imageRadius",
  default: 10,
});
export const imageRotationState = createAtom<
  ControlCenterState["imageRotation"]
>({
  key: "imageRotation",
  default: 0,
});
export const imageScaleState = createAtom<ControlCenterState["imageScale"]>({
  key: "imageScale",
  default: 1,
});

export const controlCenterState = selector<ControlCenterState>({
  key: "controlCenterState",
  get: ({ get }) => {
    const atomsValues = atoms.reduce(
      (acc: Partial<ControlCenterState>, curr) => {
        const value = get(curr);
        acc[curr.key as keyof ControlCenterState] = value;
        return acc;
      },
      {}
    );
    return atomsValues as ControlCenterState;
  },
  set: ({ set }, newValue) => {
    Object.keys(newValue).forEach((key) => {
      set(
        atoms.find((atom) => atom.key === key)!,
        newValue[key as keyof (ControlCenterState | DefaultValue)]
      );
    });
  },
  dangerouslyAllowMutability: true,
});
