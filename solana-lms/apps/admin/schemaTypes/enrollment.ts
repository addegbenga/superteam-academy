import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'enrollment',
  title: 'Enrollment',
  type: 'document',
  fields: [
    defineField({
      name: 'courseId',
      title: 'Course ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
    }),
    defineField({
      name: 'enrolledAt',
      title: 'Enrolled At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'completed',
      title: 'Completed',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
    }),
    defineField({
      name: 'progress',
      title: 'Progress',
      type: 'object',
      fields: [
        {
          name: 'completedLessons',
          type: 'array',
          of: [{ type: 'string' }],
          title: 'Completed Lessons',
        },
        {
          name: 'completionPercentage',
          type: 'number',
          title: 'Completion %',
        },
      ],
    }),
    defineField({
      name: 'lastActivityAt',
      title: 'Last Activity',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      userId: 'userId',
      userEmail: 'userEmail',
      completed: 'completed',
      completion: 'progress.completionPercentage',
    },
    prepare({ userId, userEmail, completed, completion }) {
      return {
        title: userEmail || userId,
        subtitle: completed
          ? '✅ Completed'
          : `📊 ${completion || 0}% complete`,
      }
    },
  },
})