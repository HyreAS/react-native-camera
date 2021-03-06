// Type definitions for react-native-camera 1.0
// Definitions by: Felipe Constantino <https://github.com/fconstant>
//                 Trent Jones <https://github.com/FizzBuzz791>
// If you modify this file, put your GitHub info here as well (for easy contacting purposes)

/*
 * Author notes:
 * I've tried to find a easy tool to convert from Flow to Typescript definition files (.d.ts).
 * So we woudn't have to do it manually... Sadly, I haven't found it.
 *
 * If you are seeing this from the future, please, send us your cutting-edge technology :) (if it exists)
 */
import { Component, ReactNode } from 'react';
import { ViewProperties } from 'react-native';

type Orientation = Readonly<{
  auto: any;
  landscapeLeft: any;
  landscapeRight: any;
  portrait: any;
  portraitUpsideDown: any;
}>;
type OrientationNumber = 1 | 2 | 3 | 4;
type AutoFocus = Readonly<{ on: any; off: any }>;
type FlashMode = Readonly<{ on: any; off: any; torch: any; auto: any }>;
type CameraType = Readonly<{ front: any; back: any }>;
type WhiteBalance = Readonly<{
  sunny: any;
  cloudy: any;
  shadow: any;
  incandescent: any;
  fluorescent: any;
  auto: any;
}>;
type BarCodeType = Readonly<{
  aztec: any;
  code128: any;
  code39: any;
  code39mod43: any;
  code93: any;
  ean13: any;
  ean8: any;
  pdf417: any;
  qr: any;
  upce: any;
  interleaved2of5: any;
  itf14: any;
  datamatrix: any;
}>;
type VideoQuality = Readonly<{
  '2160p': any;
  '1080p': any;
  '720p': any;
  '480p': any;
  '4:3': any;
  /** iOS Only. Android not supported. */
  '288p': any;
}>;
type VideoCodec = Readonly<{
  H264: symbol;
  JPEG: symbol;
  HVEC: symbol;
  AppleProRes422: symbol;
  AppleProRes4444: symbol;
}>;

type FaceDetectionClassifications = Readonly<{ all: any; none: any }>;
type FaceDetectionLandmarks = Readonly<{ all: any; none: any }>;
type FaceDetectionMode = Readonly<{ fast: any; accurate: any }>;
type GoogleVisionBarcodeType = Readonly<{
  CODE_128: any;
  CODE_39: any;
  CODABAR: any;
  DATA_MATRIX: any;
  EAN_13: any;
  EAN_8: any;
  ITF: any;
  QR_CODE: any;
  UPC_A: any;
  UPC_E: any;
  PDF417: any;
  AZTEC: any;
}>;
type GoogleVisionBarcodeMode = Readonly<{ NORMAL: any; ALTERNATE: any; INVERTED: any }>;

// FaCC (Function as Child Components)
type Self<T> = { [P in keyof T]: P };
type CameraStatus = Readonly<Self<{ READY: any; PENDING_AUTHORIZATION: any; NOT_AUTHORIZED: any }>>;
type RecordAudioPermissionStatus = Readonly<
  Self<{
    AUTHORIZED: 'AUTHORIZED';
    PENDING_AUTHORIZATION: 'PENDING_AUTHORIZATION';
    NOT_AUTHORIZED: 'NOT_AUTHORIZED';
  }>
>;
type FaCC = (
  params: {
    camera: RNCamera;
    status: keyof CameraStatus;
    recordAudioPermissionStatus: keyof RecordAudioPermissionStatus;
  },
) => JSX.Element;

export interface Constants {
  CameraStatus: CameraStatus;
  AutoFocus: AutoFocus;
  FlashMode: FlashMode;
  VideoCodec: VideoCodec;
  Type: CameraType;
  WhiteBalance: WhiteBalance;
  VideoQuality: VideoQuality;
  BarCodeType: BarCodeType;
  FaceDetection: {
    Classifications: FaceDetectionClassifications;
    Landmarks: FaceDetectionLandmarks;
    Mode: FaceDetectionMode;
  };
  GoogleVisionBarcodeDetection: {
    BarcodeType: GoogleVisionBarcodeType;
    BarcodeMode: GoogleVisionBarcodeMode;
  };
  Orientation: {
    auto: 'auto';
    landscapeLeft: 'landscapeLeft';
    landscapeRight: 'landscapeRight';
    portrait: 'portrait';
    portraitUpsideDown: 'portraitUpsideDown';
  };
}

export interface RNCameraProps {
  children?: ReactNode | FaCC;

  autoFocus?: keyof AutoFocus;
  type?: keyof CameraType;
  flashMode?: keyof FlashMode;
  notAuthorizedView?: JSX.Element;
  pendingAuthorizationView?: JSX.Element;
  useCamera2Api?: boolean;
  whiteBalance?: keyof WhiteBalance;
  captureAudio?: boolean;

  onCameraReady?(): void;
  onStatusChange?(event: { cameraStatus: CameraStatus, recordAudioPermissionStatus: keyof RecordAudioPermissionStatus }): void;
  onMountError?(error: { message: string }): void;

  /** Value: float from 0 to 1.0 */
  zoom?: number;
  /** Value: float from 0 to 1.0 */
  focusDepth?: number;

  // -- BARCODE PROPS
  barCodeTypes?: Array<keyof BarCodeType>;
  googleVisionBarcodeType?: keyof GoogleVisionBarcodeType;
  onBarCodeRead?(event: {
    data: string;
    rawData?: string;
    type: keyof BarCodeType;
    /**
     * @description For Android use `[Point<string>, Point<string>]`
     * @description For iOS use `{ origin: Point<string>, size: Size<string> }`
     */
    bounds: [Point<string>, Point<string>] | { origin: Point<string>; size: Size<string> };
  }): void;

  // -- FACE DETECTION PROPS

  onGoogleVisionBarcodesDetected?(response: { barcodes: Barcode[] }): void;
  onFacesDetected?(response: { faces: Face[] }): void;
  onFaceDetectionError?(response: { isOperational: boolean }): void;
  faceDetectionMode?: keyof FaceDetectionMode;
  faceDetectionLandmarks?: keyof FaceDetectionLandmarks;
  faceDetectionClassifications?: keyof FaceDetectionClassifications;

  // -- ANDROID ONLY PROPS
  /** Android only */
  onTextRecognized?(response: { textBlocks: TrackedTextFeature[] }): void;
  /** Android only */
  ratio?: string;
  /** Android only */
  permissionDialogTitle?: string;
  /** Android only */
  permissionDialogMessage?: string;
  /** Android only */
  playSoundOnCapture?: boolean;

  // -- IOS ONLY PROPS
  defaultVideoQuality?: keyof VideoQuality;
}

interface Point<T = number> {
  x: T;
  y: T;
}

interface Size<T = number> {
  width: T;
  height: T;
}

interface Barcode {
  data: string;
  type: string;
}

interface Face {
  faceID?: number;
  bounds: {
    size: Size;
    origin: Point;
  };
  smilingProbability?: number;
  leftEarPosition?: Point;
  rightEarPosition?: Point;
  leftEyePosition?: Point;
  leftEyeOpenProbability?: number;
  rightEyePosition?: Point;
  rightEyeOpenProbability?: number;
  leftCheekPosition?: Point;
  rightCheekPosition?: Point;
  leftMouthPosition?: Point;
  mouthPosition?: Point;
  rightMouthPosition?: Point;
  bottomMouthPosition?: Point;
  noseBasePosition?: Point;
  yawAngle?: number;
  rollAngle?: number;
}

interface TrackedTextFeature {
  type: 'block' | 'line' | 'element';
  bounds: {
    size: Size;
    origin: Point;
  };
  value: string;
  components: TrackedTextFeature[];
}

interface TakePictureOptions {
  quality?: number;
  orientation?: keyof Orientation | OrientationNumber;
  base64?: boolean;
  exif?: boolean;
  width?: number;
  mirrorImage?: boolean;
  doNotSave?: boolean;
  pauseAfterCapture?: boolean;
  usePersistentStorage?: boolean;

  /** Android only */
  skipProcessing?: boolean;
  fixOrientation?: boolean;

  /** iOS only */
  forceUpOrientation?: boolean;
}

interface TakePictureResponse {
  width: number;
  height: number;
  uri: string;
  base64?: string;
  exif?: { [name: string]: any };
  pictureOrientation: number;
  deviceOrientation: number;
}

interface RecordOptions {
  quality?: keyof VideoQuality;
  orientation?: keyof Orientation | OrientationNumber;
  maxDuration?: number;
  maxFileSize?: number;
  mute?: boolean;
  mirrorVideo?: boolean;
  path?: string;

  /** Android only */
  videoBitrate?: number;

  /** iOS only */
  codec?: keyof VideoCodec | VideoCodec[keyof VideoCodec];
}

interface RecordResponse {
  /** Path to the video saved on your app's cache directory. */
  uri: string;
  videoOrientation: number;
  deviceOrientation: number;
  /** iOS only */
  codec: VideoCodec[keyof VideoCodec];
}

export class RNCamera extends Component<RNCameraProps & ViewProperties> {
  static Constants: Constants;

  takePictureAsync(options?: TakePictureOptions): Promise<TakePictureResponse>;
  recordAsync(options?: RecordOptions): Promise<RecordResponse>;
  stopRecording(): void;
  pausePreview(): void;
  resumePreview(): void;
  getAvailablePictureSizes(): Promise<string[]>;

  /** Android only */
  getSupportedRatiosAsync(): Promise<string[]>;

  /** iOS only */
  isRecording(): Promise<boolean>;
}

interface DetectionOptions {
  mode?: keyof FaceDetectionMode;
  detectLandmarks?: keyof FaceDetectionLandmarks;
  runClassifications?: keyof FaceDetectionClassifications;
}

export class FaceDetector {
  private constructor();
  static Constants: Constants['FaceDetection'];
  static detectFacesAsync(uri: string, options?: DetectionOptions): Promise<Face[]>;
}

// -- DEPRECATED CONTENT BELOW

/**
 * @deprecated As of 1.0.0 release, RCTCamera is deprecated. Please use RNCamera for the latest fixes and improvements.
 */
export default class RCTCamera extends Component<any> {
  static constants: any;
}
