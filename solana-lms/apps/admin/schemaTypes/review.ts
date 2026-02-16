import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
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
      name: 'userName',
      title: 'User Name',
      type: 'string',
    }),
    defineField({
      name: 'userEmail',
      title: 'User Email',
      type: 'string',
    }),
    defineField({
      name: 'userAvatar',
      title: 'User Avatar',
      type: 'image',
      description: 'Optional: User profile picture',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'userRole',
      title: 'User Role/Title',
      type: 'string',
      description: 'e.g., "Senior Developer", "Student"',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    // ✅ ADD THESE FIELDS
    defineField({
      name: 'featured',
      title: 'Featured as Testimonial',
      type: 'boolean',
      description: 'Show this review on homepage and marketing pages',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      description: 'Display order for featured reviews (lower = higher priority)',
      hidden: ({ parent }) => !parent?.featured,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review',
      type: 'boolean',
      description: 'User completed the course',
      initialValue: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      userName: 'userName',
      userEmail: 'userEmail',
      rating: 'rating',
      content: 'content',
      featured: 'featured',
    },
    prepare({ userName, userEmail, rating, content, featured }) {
      const stars = '⭐'.repeat(rating)
      const featuredIcon = featured ? '🌟 ' : ''
      return {
        title: `${featuredIcon}${userName || userEmail}`,
        subtitle: `${stars} - ${content?.substring(0, 50) || 'No comment'}`,
      }
    },
  },
})