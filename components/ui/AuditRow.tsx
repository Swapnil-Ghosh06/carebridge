import React from "react";
import { UserCheck, Shield, Clock } from "lucide-react";
import { AuditLog } from "@/lib/types";

interface AuditRowProps {
  log: AuditLog;
}

export const AuditRow: React.FC<AuditRowProps> = ({ log }) => {
  return (
    <div className="flex items-center justify-between p-3.5 bg-surface-0 rounded-md border border-ink-300/30 text-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-pill bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="font-body font-semibold text-ink-900">
            {log.actor || log.actor_id}
          </div>
          <div className="font-body text-xs text-ink-500 flex items-center gap-1.5 mt-0.5">
            <span className="font-medium text-ink-700">{log.action}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-brand-indigo">
              <Shield className="w-3 h-3" />
              {log.category}
            </span>
          </div>
        </div>
      </div>
      <div className="font-data text-xs text-ink-500 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {log.at || log.created_at || "Recent"}
      </div>
    </div>
  );
};
