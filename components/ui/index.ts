/**
 * components/ui barrel export (owner: Swapin)
 * Import all UI primitives from here.
 */

export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "./Card";
export type { CardProps, CardSectionProps } from "./Card";

export { RiskBadge } from "./RiskBadge";
export type { RiskBadgeProps, RiskBand } from "./RiskBadge";

export { StatTile } from "./StatTile";
export type { StatTileProps, TrendDirection } from "./StatTile";

export { PatientRow } from "./PatientRow";
export type { PatientRowProps, PatientRowData } from "./PatientRow";

export { ReasonList } from "./ReasonList";
export type { ReasonListProps, RiskReason } from "./ReasonList";

export { MedicineCard } from "./MedicineCard";
export type { MedicineCardProps, MedicineStatus } from "./MedicineCard";

export { AlertItem } from "./AlertItem";
export type { AlertItemProps, AlertLevel } from "./AlertItem";

export { TrendChart } from "./TrendChart";
export type { TrendChartProps, DataPoint, ThresholdConfig } from "./TrendChart";

export { Toast } from "./Toast";
export type { ToastProps, ToastType } from "./Toast";

export {
  Illustration,
  ElderlyPhoneArt,
  DoctorTabletArt,
  FamilyCallArt,
  HeroSceneArt,
} from "./Illustration";
export type { IllustrationProps, IllustrationName } from "./Illustration";

export { VoiceButton } from "./VoiceButton";
export type { VoiceButtonProps, VoiceState, VoiceLanguage } from "./VoiceButton";

export { BriefPanel } from "./BriefPanel";
export type { BriefPanelProps, BriefData } from "./BriefPanel";

export { ConsentToggle } from "./ConsentToggle";
export type { ConsentToggleProps, ConsentCategory } from "./ConsentToggle";

export { AuditRow } from "./AuditRow";
export type { AuditRowProps } from "./AuditRow";

export { EmptyState } from "./EmptyState";
export type { EmptyStateProps } from "./EmptyState";

export { Skeleton } from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";
