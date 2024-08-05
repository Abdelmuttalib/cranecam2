import { cn } from "@/lib/cn";

export function CompareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("text-white", className)}
    >
      <path d="m20 4.01-5-.003V6h5v12h-5v2h5a2.006 2.006 0 0 0 2-2V6a1.997 1.997 0 0 0-2-1.99Z"></path>
      <path d="m4 18 5-7V4.003L4 4a2.006 2.006 0 0 0-2 2v12a2.006 2.006 0 0 0 2 2h5v-2H4Z"></path>
      <path d="M13 21h-2v2h2v-2Z"></path>
      <path d="M13 20h-2v1h2v-1Z"></path>
      <path d="M13 2h-2v2.005h2V2Z"></path>
      <path d="M13 4.005h-2V20h2V4.005Z"></path>
      <path d="M15 18h5l-5-7v7Z"></path>
    </svg>
  );
}

export function LineIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <path d="M19 2a3.003 3.003 0 0 0-3 3c.003.458.112.91.319 1.319l-.026-.026-10 10 .026.026A2.962 2.962 0 0 0 5 16a3 3 0 1 0 3 3 2.963 2.963 0 0 0-.319-1.319l.026.026 10-10-.026-.026c.41.207.86.316 1.319.319a3 3 0 1 0 0-6ZM5 20a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM19 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
    </svg>
  );
}

export function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <path d="M20 16.184V7.816A2.992 2.992 0 1 0 16.184 4H7.816A2.993 2.993 0 1 0 4 7.816v8.368A2.992 2.992 0 1 0 7.816 20h8.368A2.993 2.993 0 1 0 20 16.184ZM16.184 18H7.816A2.995 2.995 0 0 0 6 16.184V7.816A2.996 2.996 0 0 0 7.816 6h8.368A2.997 2.997 0 0 0 18 7.816v8.368A2.996 2.996 0 0 0 16.184 18ZM19 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm14 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
    </svg>
  );
}

export function CircleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <path d="M19.5 9.05a9 9 0 1 0 0 5.9 3 3 0 0 0 0-5.9ZM19 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-8 6a7 7 0 1 1 6.5-9.58 3 3 0 0 0 0 5.16A7 7 0 0 1 11 19Z"></path>
    </svg>
  );
}

export function PointIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <path d="M12 2a6.995 6.995 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a6.993 6.993 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"></path>
    </svg>
  );
}

export function DistanceIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-grid-2x2 h-[22px] w-[22px]", className)}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 12h18" />
      <path d="M12 3v18" />
    </svg>
  );
}

export function LayersIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="m12 18.54-7.38-5.73L3 14.07l9 7 9-7-1.63-1.27L12 18.54ZM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16Z"></path>
    </svg>
  );
}

export function VolumeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M12 2a10 10 0 0 0-7 17.1v4.9a1 1 0 0 0 1.5.9l5-3.57V2Zm0 18a8 8 0 0 1-5-14.1v9.6l5 3.57V20Z"></path>
    </svg>
  );
}

export function OutputObjectIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="m13 17.2 4-2.31v-3.58l-4 2.31v3.58Z"></path>
      <path d="m7 14.89 4 2.31v-3.58L7 11v3.89Z"></path>
      <path d="m7 9 5 3 5-3-5-3-5 3Z"></path>
      <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm7 13.91-7 3.94-7-3.94V8.09l7-3.94 7 3.94v7.82Z"></path>
    </svg>
  );
}

export function PointCloudIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M6.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-3-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9-6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-3 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm3-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-3-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-3-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"></path>
    </svg>
  );
}

export function IfcIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="m9 21.21 1.2-.7 1.81 1 1.8-1 1.21.7-2.1 1.21a1.76 1.76 0 0 1-.9.2 1.89 1.89 0 0 1-.91-.2L9 21.21Z"></path>
      <path d="M3 17.72.87 16.5a.58.58 0 0 1-.35-.5.57.57 0 0 1 .34-.52L3 14.25l1.21.69-1.8 1L4.18 17 3 17.72Z"></path>
      <path d="m21 14.28 2.11 1.22a.58.58 0 0 1 .35.52.57.57 0 0 1-.34.52L21 17.75l-1.21-.69 1.8-1-1.81-1 1.2-.69"></path>
      <path d="m18.23 5.59-5.48-3.18a1.58 1.58 0 0 0-1.5 0L5.77 5.59A1.5 1.5 0 0 0 5 6.91v6.32a1.5 1.5 0 0 0 .77 1.32l5.48 3.18a1.29 1.29 0 0 0 1.5 0l5.48-3.18a1.5 1.5 0 0 0 .77-1.32V6.91a1.5 1.5 0 0 0-.77-1.32ZM11 15.25 7 13V8.36l4 2.3v4.59Zm1-6.33L8 6.63l4-2.35 4 2.35-4 2.29Zm5 4-4 2.3v-4.56l4-2.3v4.56Z"></path>
    </svg>
  );
}

// Orthomosaic
export function PlyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M11 2H5l3 3 3-3Z"></path>
      <path d="M14 11V3a1 1 0 0 0-1-1L9 6l5 5Z"></path>
      <path d="M7 6 3 2a1 1 0 0 0-1 1v8l3-3 2-2Z"></path>
      <path d="M2 13a1 1 0 0 0 1 1h6l-4-4-3 3Z"></path>
      <path d="m6 9 5 5h2a1 1 0 0 0 1-1L8 7 6 9Z"></path>
    </svg>
  );
}

export function AnnotationIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M13 2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2l3 3 3-3h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"></path>
    </svg>
  );
}

export function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M19.432 12.98c.044-.325.068-.652.07-.98a7.796 7.796 0 0 0-.07-.98l2.11-1.65a.505.505 0 0 0 .12-.64l-2-3.46a.502.502 0 0 0-.61-.22l-2.49 1a7.305 7.305 0 0 0-1.69-.98l-.38-2.65a.487.487 0 0 0-.49-.42h-4a.488.488 0 0 0-.49.42l-.38 2.65a7.683 7.683 0 0 0-1.69.98l-2.49-1a.488.488 0 0 0-.61.22l-2 3.46a.493.493 0 0 0 .12.64l2.11 1.65a7.93 7.93 0 0 0-.07.98c.003.328.027.655.07.98l-2.11 1.65a.505.505 0 0 0-.12.64l2 3.46a.503.503 0 0 0 .61.22l2.49-1c.517.4 1.086.73 1.69.98l.38 2.65a.488.488 0 0 0 .49.42h4a.487.487 0 0 0 .49-.42l.38-2.65a7.688 7.688 0 0 0 1.69-.98l2.49 1a.488.488 0 0 0 .61-.22l2-3.46a.505.505 0 0 0-.12-.64l-2.11-1.65Zm-7.43 2.52a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"></path>
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={cn("h-5 w-5", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4Zm0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1Z"></path>
    </svg>
  );
}

export function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      fill="currentColor"
      className={cn("h-[22px] w-[22px]", className)}
    >
      <path d="M3 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6H3v6Zm11-9h-3.5l-1-1h-3l-1 1H2v2h12V3Z"></path>
    </svg>
  );
}
