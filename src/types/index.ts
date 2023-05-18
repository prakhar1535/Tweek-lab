export type Phase =
  | 'runUp'
  | 'jump'
  | 'backFootContact'
  | 'frontFootContact'
  | 'release';

export interface RunUpProps {
  phase: 'runUp';
  parameter: 'strideSpeedAtLastStep' | 'maximumRunUpSpeed';
}

export interface JumpProps {
  phase: 'jump';
  parameter: 'strideSpeed' | 'jumpTime' | 'forwardBend' | 'groundContactTime';
}

export interface BackFootContactProps {
  phase: 'backFootContact';
  parameter:
    | 'strideSpeed'
    | 'groundContactTime'
    | 'hipShoulderSeparation'
    | 'forwardBend'
    | 'leadingArmPosition'
    | 'backfootLandingDirection'
    | 'frontThighAngle'
    | 'backFootKneeAngle'
    | 'shinLeadAngle'
    | 'centreOfMassPosition'
    | 'backFootKneeAngleDuringFlight'
    | 'backFootKneeCollapse';
}

export interface FrontFootContactProps {
  phase: 'frontFootContact';
  parameter:
    | 'strideSpeed'
    | 'forwardBend'
    | 'groundContactTime'
    | 'bowlingArmPosition'
    | 'hipShoulderSeparation'
    | 'leadingArmPosition'
    | 'backFootFrontFootContactAngle'
    | 'frontFootKneeCollapse'
    | 'strideAngle';
}

export interface ReleaseProps {
  phase: 'release';
  parameter: 'forwardBend' | 'lateralBend' | 'elbowFlexion';
}

export type ParameterProps =
  | RunUpProps['parameter']
  | JumpProps['parameter']
  | BackFootContactProps['parameter']
  | FrontFootContactProps['parameter']
  | ReleaseProps['parameter'];

export interface BallSpeedTrendFilterProps {
  startDate: Date;
  endDate: Date;
  ballSpeedRange: {
    min: number;
    max: number;
  };
  heightRange: {
    min: number;
    max: number;
  };
  weightRange: {
    min: number;
    max: number;
  };
  ageRange: {
    min: number;
    max: number;
  };
  action: {
    hipDominant: boolean;
    kneeDominant: boolean;
    inBetweener: boolean;
  };
  handedness: {
    left: boolean;
    right: boolean;
  };
}

export interface Player {
  id: any;
  name: string;
  ballSpeed: number;
  runUp: number;
  jump: number;
  bfc: number;
  ffc: number;
  release: number;
  dob: string;
  height: number;
  weight: number;
  handedness: string;
  bowlingAction: string;
  topSpeed: number;
  sessions: number;
  ballsBowled: number;
  image: string;
}
