'use client';

import React from 'react';
import { Stethoscope, CalendarCheck, Clock, Sparkles } from 'lucide-react';
import { Card } from './Card';
import { GoalItem } from './GoalItem';
import { Locale, t } from '@/lib/i18n';

export interface DoctorNoteReminder {
  medicine: string;
  time: string;
  instruction: string;
}

export interface DoctorNoteGoal {
  id: string;
  category: string;
  target: string;
  by?: string;
  isCompleted?: boolean;
}

export interface DoctorNoteCardProps {
  noteDate: string;
  reminders?: DoctorNoteReminder[];
  goals?: DoctorNoteGoal[];
  followUpDate?: string | null;
  isLoading?: boolean;
  onGoalComplete?: (goalId: string) => void;
  locale?: Locale;
  className?: string;
}

export const DoctorNoteCard: React.FC<DoctorNoteCardProps> = ({
  noteDate,
  reminders = [],
  goals = [],
  followUpDate,
  isLoading = false,
  onGoalComplete,
  locale = 'hi',
  className = '',
}) => {
  return (
    <Card
      className={`bg-white rounded-2xl shadow-card border border-slate-100 border-l-[3px] border-l-teal-600 p-5 sm:p-6 space-y-5 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-[18px] text-navy-900 leading-tight">
                {t('doctor_note.from_doctor', locale)}
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-body font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200/60">
                <Sparkles className="w-3 h-3 text-teal-500" />
                {t('doctor_note.new_plan', locale)}
              </span>
            </div>
            <p className="font-body text-[13px] text-slate-500 mt-0.5">
              {noteDate}
            </p>
          </div>
        </div>
      </div>

      {/* Reminders section */}
      {reminders.length > 0 && (
        <div className="space-y-2.5">
          <p className="font-body font-medium text-[13px] text-slate-500 uppercase tracking-wider">
            {t('doctor_note.reminders_title', locale)}
          </p>
          <div className="space-y-2">
            {reminders.map((reminder, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 gap-2"
              >
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-data font-semibold text-[14px] text-navy-900">
                    {reminder.medicine}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100/80 text-teal-800 font-data text-[11px] font-medium tracking-tight">
                    <Clock className="w-3 h-3 text-teal-600" />
                    {reminder.time}
                  </span>
                </div>
                <p className="font-body text-[16px] text-slate-700 leading-snug">
                  {reminder.instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals section */}
      {goals.length > 0 && (
        <div className="space-y-2.5">
          <p className="font-body font-medium text-[13px] text-slate-500 uppercase tracking-wider">
            {t('doctor_note.goals_title', locale)}
          </p>
          <div className="space-y-2.5">
            {goals.map((goal) => (
              <GoalItem
                key={goal.id}
                id={goal.id}
                category={goal.category}
                target={goal.target}
                by={goal.by}
                isCompleted={goal.isCompleted}
                onComplete={onGoalComplete}
                disabled={isLoading}
              />
            ))}
          </div>
        </div>
      )}

      {/* Follow-up Date */}
      {followUpDate && (
        <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600 shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <p className="font-body text-[16px] text-slate-700 leading-snug">
            <span className="font-medium text-navy-900">
              {t('doctor_note.follow_up', locale)}:
            </span>{' '}
            {followUpDate}
          </p>
        </div>
      )}
    </Card>
  );
};
