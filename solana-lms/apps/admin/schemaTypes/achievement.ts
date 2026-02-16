import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Achievement ID',
      type: 'string',
      description: 'Unique identifier (e.g., "first_steps")',
      validation: (Rule) => Rule.required().regex(/^[a-z_]+$/),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Single emoji',
      validation: (Rule) => Rule.required().max(2),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Progress', value: 'progress' },
          { title: 'Streaks', value: 'streaks' },
          { title: 'Skills', value: 'skills' },
          { title: 'Community', value: 'community' },
          { title: 'Special', value: 'special' },
        ],
      },
    }),
    defineField({
      name: 'requirement',
      title: 'Requirement',
      type: 'string',
      description: 'What triggers this achievement',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      icon: 'icon',
      category: 'category',
    },
    prepare({ title, icon, category }) {
      return {
        title: `${icon} ${title}`,
        subtitle: category,
      }
    },
  },
})