import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Lecture } from '../../types';
import { useAuthStore } from '../../store/authStore';

interface LectureModalProps {
  lecture: Lecture;
  onClose: () => void;
  onEnroll?: () => void;
  onUnenroll?: () => void;
}

export const LectureModal: React.FC<LectureModalProps> = ({
  lecture,
  onClose,
  onEnroll,
  onUnenroll,
}) => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const isEnrolled = lecture.enrolledStudents.includes(user?.id || '');
  const isStudent = user?.role === 'student';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{lecture.title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">{lecture.description}</p>
          
          <div className="text-sm">
            <p>{t('lectures.startTime')}: {lecture.startTime}</p>
            <p>{t('lectures.endTime')}: {lecture.endTime}</p>
            <p>{t('lectures.enrolled')}: {lecture.enrolledStudents.length} / {lecture.maxStudents}</p>
          </div>

          {isStudent && (
            <div className="flex justify-end pt-4">
              {isEnrolled ? (
                <button
                  onClick={onUnenroll}
                  className="btn-secondary"
                >
                  {t('lectures.unenroll')}
                </button>
              ) : (
                <button
                  onClick={onEnroll}
                  className="btn-primary"
                  disabled={lecture.enrolledStudents.length >= lecture.maxStudents}
                >
                  {t('lectures.enroll')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};